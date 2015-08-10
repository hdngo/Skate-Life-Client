var ref = new Firebase("https://skatelife.firebaseio.com");
var userData;

baseURL = 'https://skate-life-backend.herokuapp.com/';

$(function() {
  authenticatUser();
  // buildUserProfile();
});

var authenticatUser = function() {
  $('.login-btn').on('click', function(event){
    event.preventDefault();

    googleOauth().then(function(authData) {
      googleData = authData;
      var gString = JSON.stringify(authData);
      window.localStorage.setItem('googleData', gString);
      $.mobile.changePage('#main-map-page');
      buildUserProfile();
    });
    // .dispatchEvent(event);
  });
}

var buildUserProfile = function() {
  userData = JSON.parse(window.localStorage.getItem('googleData'));
  var firstName = userData.google.displayName.split(' ')[0];
  $('.username').text('Welcome ' + firstName);
  $('.welcome-header').text('Welcome ' + firstName);
  // $('.login-btn').parent().remove();
  // $("#main-map-page").prepend($('<img>').attr("src", userData.google.profileImageURL))
}

$(document).on("pageinit", '#main-map-page',function(){
  // alert("the next page is loading");
  console.log(baseURL);
  var path = baseURL + 'api/skateparks/';
  $.ajax({
    url: path,
    method: 'get',
    dataType: 'json'
  })
  .done(function(response){
    console.log('done')
    $.each(response, function(index, skatepark){
      $('.skateparks').append(
        $('<li>').append(
          $('<a>')
            .addClass('skatepark-link')
            .attr('href', path+ skatepark.id)
            // .attr('id', park.name)
            .text(skatepark.name)));
    $('.back-btn').parent().hide()

    })
  })
  .fail(function(response){
    console.log('fail')
  })

});


$(document).on("click", ".skatepark-link", function(e){
  e.preventDefault();
  console.log(e.target.href)
  var path = e.target.href
  $.ajax({
    url: path,
    method: 'get',
    dataType: 'json'
  })
  .done(function(response){
    console.log(response)
    if(response.name.includes("skatepark")){
      response.name
    }
    else{
      response.name = response.name + " skatepark"
    }
    $('#skatepark-page .skatepark-name').text(response.name.toUpperCase());
    $('#skatepark-page .ui-content .skatepark-page').html('<h1>'+response.name+'</h1><p>Address: '+response.address+'</p><p>Favorited: '+response.fav_count+'</p><img src="https://maps.googleapis.com/maps/api/streetview?size=300x100&location='+response.lat+','+response.long+'&fov=70&heading=235&pitch=0"/>'
      )


    $.mobile.changePage('#skatepark-page');
  })
  .fail(function(response){
    console.log("failure")
  })
})

// BEGIN BUILDING MAP

//set default location to madagascar
var latitude = -17.201472;
var longitude = 46.977282;

//begin map
var dbc = new google.maps.LatLng(latitude, longitude)

var MY_MAPTYPE_ID = 'custom_style';

function initializeMap(){

  //begin custom color options
  var featureOpts = [
    {
      stylers: [
        {hue: '#F2A516'},
        {visibility: 'simplified'},
        {gamma: 0.8},
        {weight: 0.5}
      ]
    },
    {
      featureType: 'water',
      stylers: [
        {color: '#2E2D2A'}
      ]
    }
  ];
  //end custom color options

  var mapProp = {
    center:dbc,
    zoom:15,
    panControl:false,
    zoomControl:true,
    zoomControlOptions: {
      style:google.maps.ZoomControlStyle.LARGE,
    },
    mapTypeControl:false,
    scaleControl:false,
    streetViewControl:true,
    overviewMapControl:false,
    rotateControl:false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  // actually Build the map
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  //custom color segment//
  var styledMapOptions = {
    name: 'Custom Style'
  };
  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
  map.mapTypes.set(MY_MAPTYPE_ID, customMapType)
  //end custom color segment//
  //set your location marker to be where your current location is
  var marker = new google.maps.Marker({
    url:"#login-page",
    position:dbc,
  })

  marker.setMap(map)

  //this makes it so when we click on a marker, it redirects us to the marker's url
  google.maps.event.addListener(marker, 'click', function(){
    window.location.href = marker.url;
  })

  map.setTilt(0);


  $.ajax({
    url: baseURL + 'api/skateparks',
    type: 'get',
    dataType: 'json'
  })


// var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

  .done(function(response) {
    $.each(response, function(index, skatepark) {
      // debugger
      // console.log(skatepark.lat);

      if (skatepark.lat[0] === '-') {
        var latParsed = skatepark.lat.substr(1);
        var lat = parseFloat(skatepark.lat);
      } else {
        var lat = parseFloat(skatepark.lat);
      }

      if (skatepark.long[0] === '-') {
        var lonParsed = skatepark.long.substr(1);
        var lon = parseFloat(skatepark.long);
      } else {
        var lon = parseFloat(skatepark.long);
      }

      // debugger
      console.log(lat, lon);

      var infowindow = new google.maps.InfoWindow({
           content: '<p>'+skatepark.name+'</p><p>'+skatepark.address+'</p><a class="skatepark-link" href='+baseURL+'api/skateparks/'+skatepark.id+'>check it</a><p><img src="https://maps.googleapis.com/maps/api/streetview?size=300x100&location='+lat+','+lon+'&fov=70&heading=235&pitch=0"/></p>'
      });

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lon),
        title: skatepark.name
      });
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

      console.log(marker);
      marker.setMap(map);
    });
  })

  .fail(function(response) {

  });

}

var onSuccess = function(position){
	// alert('Latitude: '          + position.coords.latitude          + '\n' +
	//          'Longitude: '         + position.coords.longitude         + '\n' +
	//          'Altitude: '          + position.coords.altitude          + '\n' +
	//          'Accuracy: '          + position.coords.accuracy          + '\n' +
	//          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	//          'Heading: '           + position.coords.heading           + '\n' +
	//          'Speed: '             + position.coords.speed             + '\n' +
	//          'Timestamp: '         + position.timestamp                + '\n');
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	dbc = new google.maps.LatLng(latitude, longitude)


	initializeMap();
}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){

	navigator.geolocation.getCurrentPosition(onSuccess, onError)

}

onDeviceReady();

google.maps.event.addDomListener(window, 'load', initializeMap);

//end google map

// authentication below

var googleOauth = function() {
  var promise = new Promise(function(resolve, reject) {
    ref.authWithOAuthPopup('google', function(error, authData) {
      if (error) {
        alert('login failed!');
        reject(error);
      } else {
        resolve(authData);
      }
    });
  });
  return promise;
}

$(document).on('click', '.favorite-button', function(){
  console.log("aww yiss")
})



// before PANEL open event
$(document).on("panelbeforeopen", "#favoritesPanel", function(event, ui){
  // hit the route that goes to the user's favorites and append list items to show the favorite parks
  var path = baseURL + 'api/users/1/favorites'
  //modify path later to grab current user's user id
  $.ajax({
    url: path,
    method: 'get',
    dataType: 'json'
  })
  .done(function(response){
    console.log("hey harvey")

    // <li><a href="#">Default is right arrow</a></li>
    $.each(response, function(index, favorite){
      $('.favorites').prepend('<li><a href="#">'+favorite.name+'</a></li>')
    })
    $('.favorites').listview('refresh')
  })
  .fail(function(response){
    console.log("bye harvey")
  })
})


$(document).on("click", "#logout", function() {
  signOut();
});

var signOut = function() {
  localStorage.clear();
  userData = "";
  $.mobile.changePage('#login-page')
}
