console.log('Lets explore');




// function initMap(){
// 	var options = {
// 		zoom: 9,
// 		center: {lat:-17.715316,lng:178.0650 }
// 	}

// 	var map = new 
// 	google.maps.Map(document.getElementById('map'),options);
// }


// $('#map').hide();

$(document).ready(function(){
  $('#submit').click(function(){
    $('#map').show();
    var place=document.getElementById('place').value;
    var duration = document.getElementById('duration').value;
    console.log(place,duration);
    initMap(place,duration);
  });


});



var locations = [
  {
    name : "Nabua Squatters Community",
    place: "Suva",
    distance : "5.6 Km",
    travelDuration: 19,
    lat: -18.119185,
    long: 178.452695
  },
  {
    name : "Fiji Museum",
    place: "Suva",
    distance : "23.5 Km",
    travelDuration: 40,
    lat: -18.149781,
    long: 178.425798
  },
  {
    name : "Fiji National Blood Service",
    place: "Suva",
    distance : "1.6 Km",
    travelDuration: 7,
    lat: -18.134978,
    long: 178.435046
  },
  {
    name : "Golf Course",
    place: "Suva",
    distance : "5.6 Km",
    travelDuration: 17,
    lat: -18.127123,
    long: 178.464641
  },
  {
    name : "Vitogo Parade",
    place: "Lautoka",
    distance : "40.2 km",
    travelDuration: 52,
    lat: -17.605340,
    long: 177.452296
  },
  {
    name : "Bavadra Rd",
    place: "Lautoka",
    distance : "17.5 km",
    travelDuration: 26,
    lat: -17.632013,
    long: 177.454289
  }
]



/*
	1) First make a config.json
	2) create the apiKey object array
	3) Link Json file to your html index
	4) set the myKey variable like below
	5) Dynamically add the script containing your key to index
*/
// apiKey = '[{"key" : "your key goes here"}]';

var script = document.createElement('script');


var myKey = JSON.parse(apiKey);
console.log(myKey[0].key);



script.src = 'https://maps.googleapis.com/maps/api/js?key='+ myKey[0].key +'';
document.getElementsByTagName('body')[0].appendChild(script);


function initMap(p,d){
  console.log(p,d);

 var oldwindow;
 var center;
  //center coordinates
  if (p === "Suva") {
   center = {lat: -17.985384, lng: 178.423431};

  } else if (p === "Lautoka"){
    center = {lat: -17.718284, lng: 177.439951};
  }
 
  //map object
  var map = new google.maps.Map(
      document.getElementById('map'), {
      zoom:10,
      center: center,
    });


  for ( var i = 0; i<locations.length; i++){
      console.log(p,typeof(p), d, typeof(d));
      console.log(locations[i].place, typeof(locations[i].place));
      console.log(locations[i].travelDuration, typeof(locations[i].travelDuration));
      console.log(locations[i].place === p);
      console.log(locations[i].travelDuration <= d);

      if (locations[i].place === p && locations[i].travelDuration <= d){
      //create content dynamically
      var content = '<div class="bg-primary h4" id="' + locations[i].id + '">' +
      '<h5> '+ locations[i].name + '</h5>' +
      '<h6>'+ locations[i].place + '</h6>' +
      '<h6>Distance: '+ locations[i].distance + '</h6>'+
      '<h6>Duration: '+ locations[i].travelDuration + ' min</h6>' +
      '<h6> from the nearest i-site visitor\'s information center</h6>'+
      '</div>';

      // create infowindow
      var infowindow = new google.maps.InfoWindow({
        content : content
      });

      //position to add marker
      var position = {lat:locations[i].lat , lng:locations[i].long };

      //crete marker
      var marker = new google.maps.Marker({
        position : position,
        map : map
      });

      newWindow(marker, infowindow);
  
      function newWindow(newMarker, newInfowindow){
   
        newMarker.addListener('click', function(){
          if (oldwindow){
            oldwindow.close();
          }
          newInfowindow.open(map, newMarker);
          oldwindow=newInfowindow;
           
        });//end of addListener
      }//end of newwindow function


     }
    }//end of for

}//end of initMap

