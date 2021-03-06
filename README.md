# Skate Life

##Description
Skate Life is an Android app that allows skaters to connect with one another and explore nearby skateparks.
[Link to Skate Life's Backend Repo](https://github.com/yago580/skate-life-backend)

Download the app from the [Google Play Store](https://play.google.com/store/apps/details?id=com.skate_life.mobile_test).
##Technologies Used
  * Backend: Rails-API, ActiveRecord, PostgreSQL, Firebase
  * Frontend: Apache Cordova, Javascript, jQuery & jQuery Mobile, Slick.js, HTML, CSS
  * Others: Google Maps API, Google OAuth, Postman, Heroku, PhoneGap Build


From the beginning, we knew that the only way skaters would use our app was if it was mobile. Skate Life allows users to simply open up their phone, and connect with other users to start skating. PhoneGap Build and Apache Cordova allowed us to quickly spin up a mobile app without having to write it out in Java. This also led to us building a fully decoupled app.  We implemented a Rails-API back-end, which allowed us to store and serve up user and skatepark data to our client. As a result, we were able to build our views without worrying about how our backend was structured, which ultimately helped us solidify our knowledge of client-side JavaScript and jQuery. We also utilized Firebase to provide users with a real-time chat client and the ability to see other users as they appear on the app's map.

##User Stories
  * A user can login using their gmail account.
  * A user can use the app as an anonymous user.
  * A user can explore an extensive collection of skateparks within the area.
  * A user can choose to attend or leave a skatepark.
  * A user can interact/chat with other users currently viewing the same skatepark.
  * A user can center the map based on their geolocation.
  * A user can navigate across the map and reposition the map to center around their geolocation.
  * A user can navigate across the map and reposition the map to center around their marker location.
  * A user can see the number of skaters currently attending a skatepark.
  * A user can favorite a skatepark.
  * A user can view their favorite skateparks.
  * A user can shred.

##Challenges We Faced
  * Mobile hybridization
  * Managing asynchronous requests & promises
  * jQuery mobile quirks/bugs
  * Manipulating the Slick.js carousel
  * Unbinding event listeners for the skatepark chat feature
  * Rendering the map efficiently

##Next Steps
  * Facilitate one-to-one communication between our users.
  * Improve performance by optimizing geolocation processes
  * Implement a resizable geofence
  * Facilitate friendships between users
  * iOS deployment
  * Multimedia steam
  * Improve accuracy and comprehensiveness of skatepark data

##The Team
  * Team Lead: Chris Scott
  * Team Members: Harvey Ngo, Shahab Amin, Ian Harris

##Run Skate Life Locally:
Via the Command Line
  1. Clone the repo - 'git clone https://github.com/hdngo/skate-life-client.git'
  2. Throw up a server by running 'python -m SimpleHTTPServer'
