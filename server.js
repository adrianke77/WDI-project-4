require('dotenv').config()
var webpack = require('webpack')
var config = require('./webpack.config')
var express = require('express')
var stormpath = require('express-stormpath')
var webpackDevMiddleware = require('webpack-dev-middleware')

const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/picTaggr-test'
)

mongoose.Promise = global.Promise

var app = express()

var compiler = webpack(config)

var bodyParser = require('body-parser')

var path = require('path')

// create mongoose UserImage model with no schema
const UserStoreSchema = new mongoose.Schema({}, { strict: false })
const UserStore = mongoose.model('UserStore', UserStoreSchema)

// webpack intercepts requests and serves bundle.js
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
)

app.use(function (req, res, next) {
  // gives information on requests hitting server
  next()
})

// initialise Stormpath
app.use(
  stormpath.init(app, {
    apiKey: {
      id: process.env.STORMPATH_ID,
      secret: process.env.STORMPATH_SECRET
    },
    application: {
      href: process.env.STORMPATH_APP_HREF
    },
    web: {
      produces: ['application/json']
    }
  })
)

// authorization handling by Stormpath
app.post('/me', bodyParser.json(), stormpath.loginRequired, function (req, res) {
  function writeError (message) {
    res.status(400)
    res.json({ message: message, status: 400 })
    res.end()
  }

  function saveAccount () {
    req.user.givenName = req.body.givenName
    req.user.surname = req.body.surname
    req.user.email = req.body.email

    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message)
      }
      res.end()
    })
  }

  if (req.body.password) {
    var application = req.app.get('stormpathApplication')

    application.authenticateAccount(
      {
        username: req.user.username,
        password: req.body.existingPassword
      },
      function (err) {
        if (err) {
          return writeError(
            'The existing password that you entered was incorrect.'
          )
        }

        req.user.password = req.body.password

        saveAccount()
      }
    )
  } else {
    saveAccount()
  }
})

// UNPROTECTED ROUTE!!!
// need to get React Stormpath API to provide auth token, currently API does not provide
app.post('/userStore', bodyParser.json(), function (req, res) {
  console.log('create/update route triggered on backend')
  let email = req.body.userData.stormpathUserData.email
  UserStore.findOne(
    {
      'userData.stormpathUserData.email': email
    },
    (err, userStore) => {
      if (userStore) {
        let updatedUserStore = new UserStore(req.body)
        updatedUserStore.save()
        userStore.remove()
        res.json({ message: 'userdata updated' })
      } else {
        UserStore.create(
          req.body,
          (err, newUser => {
            res.json({ message: 'new user created' })
          })
        )
      }
    }
  )
})

app.post('/userStore/restore', bodyParser.json(), function (req, res) {
  console.log('restore data route triggered ')
  let email = req.body.email
  UserStore.findOne(
    {
      'userData.stormpathUserData.email': email
    },
    (err, userStore) => {
      res.json(userStore) // sends null value in json if no user found
    })
})

// serve the SPA to any route that is not above
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

// start listening when stormpath reports ready
app.on('stormpath.ready', function () {
  console.log('stormpath ready')
  app.listen(process.env.PORT || 3000, 'localhost', function (err) {
    if (err) {
      return console.error(err)
    }
    console.log('Listening at http://localhost:3000')
  })
})
