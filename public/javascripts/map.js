var lat = null;
var lng = null;

// sets your location as default
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var locationMarker = null;
    if (locationMarker){
      // return if there is a locationMarker bug
      return;
    }

    lat = position.coords["latitude"];
    lng = position.coords["longitude"];

   console.log(lat, lng);
   pubs();
  },
  function(error) {
    console.log("Error: ", error);
  },
  {
    enableHighAccuracy: true
  }
  );
}

function pubs() {
  pubnub = PUBNUB.init({
  publish_key: 'pub-c-465d2d33-bf9a-46ca-b0e8-572285b81792',
  subscribe_key: 'sub-c-96708c8a-2a7f-11e6-8bc8-0619f8945a4f'
  })

  pubnub.subscribe({
    channel: "mymaps",
    message: function(message, channel) {
      console.log(message)
      lat = message['lat'];
      lng = message['lng'];
      //custom method
      redraw();
    },
  connect: function() {console.log("PubNub Connected")}
  })
}

map = new google.maps.Map(document.getElementById('map-canvas'), {
  zoom: 15,
  center: {lat: lat, lng : lng, alt: 0}
});

map = new google.maps.Map(document.getElementById('map-canvas'), {
  zoom: 15,
  center: {lat: lat, lng : lng, alt: 0}
});

map_marker = new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});
map_marker.setMap(map);

function redraw() {
  map.setCenter({lat: lat, lng : lng, alt: 0})
  map_marker.setPosition({lat: lat, lng : lng, alt: 0});
}

message: function(message, channel) {
  console.log(message)
  lat = message['lat'];
  lng = message['lng'];
  //custom method
  redraw();
}


