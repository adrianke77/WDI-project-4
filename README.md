# PicTaggr

A web application for automatically adding tags to all of the user's images in Dropbox, allowing searching for images by tag text. 

Tag text can be modified for custom tags; tags are saved in the backend and restored upon next login. Syncing with Dropbox can be done at any time and adds new images while removing images no longer in Dropbox.

## Getting Started

Git clone this repo to a new directory in your bash, then run

```
npm install
```

First start your MongoDB server locally (```mongod``` or otherwise) so that the server can access it.

To start the app server, run

```
npm start
```

You can access the app in a browser on localhost:3000 after the console reports that the server has started listening.

### How to Use

Follow the links in the app to create an account, then press connect to Dropbox.

The app will redirect you to Dropbox where you can authorize the app to access your Dropbox contents.

The app will then download your images asynchronously, and obtain tags for loaded images using Google Vision label detection functionality.

## Live Version

The app is deployed live on [Heroku](https://pictaggr.herokuapp.com/).

## Built With

* [jQuery](http://jquery.com/) - jQuery slim is used to support Bootstrap 4
* [Bootstrap 4]()
* [React]()
* [Redux]()
* [Express]()
* [Stormpath]() - not advised at this time as the Stormpath React API is not able to provide auth tokens that are needed to pass Stormpath Express middleware in the backend; apparently due to different versions being available for React and Express APIs
* [Masonry for React]() - the animations for card movements when added/removed

## Things Learnt

* How to sequence the task of loading an image card. componentDidUpdate on each card checks for blob being not loaded, and fires an action to get it from Dropbox if so; if tags are not loaded and image is loaded it does likewise to get labels from Google Vision. 

* How to manage AJAX requests in Redux actions. To avoid new requests for the same item while request is in progress, Redux state needs to store a flag noting if a request is ongoing. The function call then conditionally makes a new request only if the request flag is false.

* How to avoid saving to backend too frequently. The dispatch that resets the flag for backend save completion only activates after a two second timeout; this prevents new saves until two seconds after the previous save.

* How to display blob image data as an image in html:
```<img src={window.URL.createObjectURL(<image blob>)}/>```

* How to convert blobs to base64 string for passing to Google Vision: use fileReader to convert to base64, then strip off the start containing the MIME type and 'base64,', then send to Google Vision.
