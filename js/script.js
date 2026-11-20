"use strict";

var CONTACT_EMAIL = "loliva@hawk.illinoistech.edu";

function showQuestions() {
  alert("If you have questions, contact me at:\n" + CONTACT_EMAIL);
}

function setupQuestionsButton() {
  var button = document.getElementById("questions-button");
  if (button) {
    button.addEventListener("click", showQuestions);
  }
}

var valveMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1c1c1c" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#111111" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#333333" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f26b21" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#a8440f" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#262626" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1f2a1f" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#f26b21" }] }
];

function initMap() {
  var mapDiv = document.getElementById("map");
  if (!mapDiv || typeof google === "undefined") {
    return;
  }

  var valve = { lat: 47.6139, lng: -122.1948 };

  var map = new google.maps.Map(mapDiv, {
    center: valve,
    zoom: 15,
    mapTypeId: "roadmap",
    styles: valveMapStyles
  });

  var marker = new google.maps.Marker({
    position: valve,
    map: map,
    title: "Valve Corporation"
  });

  var infoWindow = new google.maps.InfoWindow({
    content: "<strong>Valve Corporation</strong><br>10400 NE 4th St, Bellevue, WA"
  });
  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });

  map.addListener("click", function (event) {
    var clicked = new google.maps.Marker({
      position: event.latLng,
      map: map
    });
    var coords = event.latLng.lat().toFixed(4) + ", " + event.latLng.lng().toFixed(4);
    var clickedInfo = new google.maps.InfoWindow({
      content: "You dropped a pin at<br>" + coords
    });
    clickedInfo.open(map, clicked);
    clicked.addListener("click", function () {
      clickedInfo.open(map, clicked);
    });
  });
}

function mapAuthFailed() {
  var status = document.getElementById("map-status");
  if (status) {
    status.textContent = "The map could not load. The API key may be restricted for this site.";
  }
}

window.initMap = initMap;
window.gm_authFailure = mapAuthFailed;
document.addEventListener("DOMContentLoaded", setupQuestionsButton);