var currentLocation;

var getCurrentLocation = function(options) {
  var deferred = $.Deferred();

  navigator.geolocation.getCurrentPosition(
    deferred.resolve, 
    deferred.reject, 
    options);

  return deferred.promise();
};

var redirectToLoginPage = function(){
  var deferred = $.Deferred();
  $.mobile.changePage('#login-page')
  return deferred.promise();
}

var setCurrentUserPosition = function(position) {

  currentLocation = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );
  console.log('current location set');
  redirectToLoginPage();
};


var setDefaultUserPosition = function() {
  currentLocation = new google.maps.LatLng(37.8717, -122.2728);
}


var onError = function() {
  alert('code: '    + error.code    + '\n' + 
        'message: ' + error.message + '\n');
}


var addLocationButtons = function() {
  var homeControlDiv = document.createElement('div');
  var homeControl = new LocationButton(homeControlDiv, map, 'Cursor');

  var currentLocationCtrlDiv = document.createElement('div');
  var currentLocationControl = new LocationButton(currentLocationCtrlDiv, map, 'My Location');
  
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(currentLocationCtrlDiv);
}


function LocationButton(controlDiv, map, buttonText) {
  controlDiv.style.padding = '5px';
  
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#FFAD33';
  controlUI.style.color = 'black';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'location button';
  controlUI.className = "location-btn";
  controlDiv.appendChild(controlUI);

  var controlText = document.createElement('div');
  controlText.style.fontFamily = 'Roboto', 'sans-serif';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight ='4px';
  controlText.innerHTML = '<p>'+buttonText+'</p>';
  controlUI.appendChild(controlText);


  google.maps.event.addDomListener(controlUI, 'click', function () {
    if (buttonText === 'Cursor') {
      map.panTo(currentUser.marker.position);
    } else {
      map.panTo(currentLocation);
      currentUser.marker.setPosition(currentLocation);
    }
  });

}
