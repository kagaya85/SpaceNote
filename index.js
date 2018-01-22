function setLocation(){
	if (navigator.geolocation && map != null) 
	{
		console.log("1");
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log("2");
			var pos_google = 
			{
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			pos = transformFromWGSToGCJ(pos_google.lng,pos_google.lat);
			heading = position.coords.heading;
			heading = map.getHeading();
			console.log(position.coords);
			console.log(pos);
			console.log(heading);
			map.setCenter(pos);

		}, function() {
			console.log("3");
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} 
	else if(map)
	{
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
	else
	{
		console.log("map is null");
	}
}


function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 20,
		center: {lat: 62.323907, lng: -150.109291},
		mapTypeId: 'satellite',
		gestureHandling: 'none',
		tilt: 45,
		heading: 180,
	});


	//Set Locationg Loop//
	var set_locate=self.setInterval("setLocation()",50)

	// The photograph is courtesy of the U.S. Geological Survey.
	var srcImage = 'https://developers.google.com/maps/documentation/javascript/';
	srcImage += 'examples/full/images/talkeetna.png';


	//loactation search
	var pos;
	var heading;

	if (navigator.geolocation) 
	{
		console.log("1");
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log("2");
			var pos_google = 
			{
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			pos = transformFromWGSToGCJ(pos_google.lng,pos_google.lat);
			heading = position.coords.haeding; 

			console.log("success");
			console.log(pos);
			map.setCenter(pos);
			map.setHeading(heading);

			var bounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(pos.lat, pos.lng),
				new google.maps.LatLng(pos.lat, pos.lng));

			overlay = new USGSOverlay(bounds, "helloworld", map);

		}, function() {
			console.log("3");
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} 
	else 
	{
		 // Browser doesn't support Geolocation
		 handleLocationError(false, infoWindow, map.getCenter());
		}



}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	console.log("error");

	console.log(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');

}

/** @constructor */
function USGSOverlay(bounds, content, map) {

	// Now initialize all properties.
	this.bounds_ = bounds;
	this.map_ = map;

	// Define a property to hold the image's div. We'll
	// actually create this div upon receipt of the onAdd()
	// method so we'll leave it null for now.
	this.div_ = null;

	var div = document.createElement('div');
	div.style.border = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';

	// Create the img element and attach it to the div.
	var text = document.createElement('h1');
	text.innerHTML = content;
	text.style.color = 'white';

	div.appendChild(text);

	this.div_ = div;



	// Explicitly call setMap on this overlay
	this.setMap(map);
}

	/**
* onAdd is called when the map's panes are ready and the overlay has been
* added to the map.
*/
USGSOverlay.prototype.onAdd = function() 
{

// Add the element to the "overlayImage" pane.
var panes = this.getPanes();
panes.overlayImage.appendChild(this.div_);
};

USGSOverlay.prototype.draw = function() 
{

// We use the south-west and north-east
// coordinates of the overlay to peg it to the correct position and size.
// To do this, we need to retrieve the projection from the overlay.
var overlayProjection = this.getProjection();

// Retrieve the south-west and north-east coordinates of this overlay
// in LatLngs and convert them to pixel coordinates.
// We'll use these coordinates to resize the div.
var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

// Resize the image's div to fit the indicated dimensions.
var div = this.div_;
div.style.left = sw.x + 'px';
div.style.top = ne.y + 'px';
div.style.width = (ne.x - sw.x) + 'px';
div.style.height = (sw.y - ne.y) + 'px';
};

USGSOverlay.prototype.onRemove = function() 
{
this.div_.parentNode.removeChild(this.div_);
};

// Set the visibility to 'hidden' or 'visible'.
USGSOverlay.prototype.hide = function() 
{
	if (this.div_) {
	 // The visibility property must be a string enclosed in quotes.
	 this.div_.style.visibility = 'hidden';
	}
};

USGSOverlay.prototype.show = function() 
{
	if (this.div_) {
		this.div_.style.visibility = 'visible';
	}
};

USGSOverlay.prototype.toggle = function() 
{
	if (this.div_) {
		if (this.div_.style.visibility === 'hidden') 
		{
			this.show();
		} 
		else 
		{
			this.hide();
		}
	}
};

// Detach the map from the DOM via toggleDOM().
// Note that if we later reattach the map, it will be visible again,
// because the containing <div> is recreated in the overlay's onAdd() method.
USGSOverlay.prototype.toggleDOM = function() 
{
	if (this.getMap()) {
	 // Note: setMap(null) calls OverlayView.onRemove()
	 this.setMap(null);
	} 
	else 
	{
		this.setMap(this.map_);
	}
};