var map;
var markers = [];

   function Control(controlDiv, map) {

        google.maps.event.addDomListener(zoomin, 'click', function() {
          var currentZoom = map.getZoom();
          if (currentZoom != 21) {
            map.setZoom (currentZoom + 1)
          }
        });

        google.maps.event.addDomListener(zoomout, 'click', function() {
          var currentZoom = map.getZoom();
          if (currentZoom != 0) {
            map.setZoom (currentZoom - 1)
          }
        });

        google.maps.event.addDomListener(godown, 'click', function() {
          var currentPosition = map.getCenter();
          var latitude = currentPosition.lat();
          var longitude = currentPosition.lng();
          map.setCenter ({lat: (latitude - 0.001), lng: longitude});
        });

        google.maps.event.addDomListener(goup, 'click', function() {
          var currentPosition = map.getCenter();
          var latitude = currentPosition.lat();
          var longitude = currentPosition.lng();

          map.setCenter ({lat: (latitude + 0.001), lng: longitude});
        });

        google.maps.event.addDomListener(goleft, 'click', function() {
          var currentPosition = map.getCenter();
          var latitude = currentPosition.lat();
          var longitude = currentPosition.lng();
          map.setCenter ({lat: latitude, lng: (longitude- 0.001)});
        });

        google.maps.event.addDomListener(goright, 'click', function() {
          var currentPosition = map.getCenter();
          var latitude = currentPosition.lat();
          var longitude = currentPosition.lng();
          map.setCenter ({lat: latitude, lng: longitude+ 0.001});
        });

        google.maps.event.addListener(map, 'click', function(event) {
          var longlat = event.latLng;
          console.log(longlat);
          var lat = longlat.lat();
          var long = longlat.lng()
          placeMarker(longlat, lat, long);
          console.log(lat);
          console.log(long);
        });


        var deleteM = document.getElementById('delete');
        deleteM.addEventListener('click', function(event) {
          deleteMarkers();
        });


        var lovisaPlace = document.getElementById('lovisas');
        var vilmasPlace = document.getElementById('vilmas');
        var kthPlace = document.getElementById('kth');

        lovisaPlace.addEventListener('click', function(event) {
          var lovisasInfo = "Här brukar Lovisa hänga!";
          placeFavMarker(map, {lat: 48.879213, lng: 2.309312}, "Lovisa hangs here", lovisasInfo);
        });

        vilmasPlace.addEventListener('click', function(event) {
          var vilmasInfo = "Här bor Vilma!";

          placeFavMarker(map, {lat: 59.35024615971273, lng: 18.058984491787896}, "Vilmas place", vilmasInfo);
        });

        kthPlace.addEventListener('click', function(event) {
          var kthInfo = "Här går Lovisa och Vilma i skolan";

          placeFavMarker(map, {lat: 59.3498092, lng: 18.0684758}, "KTH", kthInfo);
        });

      }


    function placeFavMarker(map, position, label, info) {
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: true,
        label: {
          text: label,
          color: "#000000",
        }
      });
      
      map.setCenter (position);
      var infowindow = new google.maps.InfoWindow({
        content: info
      });

      marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
      });


    }


    function placeMarker(position, lat, lng) {
      
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: true,
        label: {
          text: "Position: " + lat + ", " + lng,
          color: "#000000",
        }
      });

      markers.push(marker);

      google.maps.event.addListener(marker, "dragend", function(event) {
        var longlat = event.latLng;
        var lati = longlat.lat();
        var long = longlat.lng()
        console.log(lati);
        console.log(long);
        var label = this.getLabel();
        label.text="Position: " + lati + ", " + long;
        this.setLabel(label);
      });

    }


    function deleteMarkers(){

      for(i=0; i<markers.length; i++){
        markers[i].setMap(null);
      }
    }


    function labelingFav(marker) {
      var input = document.getElementById('inputField');
      var submit = document.getElementById("submit")

      submit.addEventListener("click", function(event){
        event.preventDefault();
        var label = marker.getLabel();
        label.text=input.value;
        marker.setLabel(label);
        document.getElementById('inputField').value = '';
      });
      favList.push(marker);
      console.log(favList);
    }


      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 59.3498092, lng: 18.0684758},
          zoom: 16,
          mapTypeId: 'roadmap',
          heading: 90,
          tilt: 45,
          disableDefaultUI: true,
          disableAutoPan: true,
          scrollwheel: false,
          draggable: false,

        });

        var zoomControlDiv = document.createElement('div');
        var zoomControl = new Control(zoomControlDiv, map);

      }
