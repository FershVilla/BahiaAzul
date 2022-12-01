function initMap() {
    var options = {
        center: { lat: 10.18561, lng: -84.39076 },
        zoom: 11
    }

    map = new google.maps.Map(document.getElementById("map"), options)

    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function error() {
    window.alert("Solicitud para acceder a la ubicación fallo");
}

function success(position) {
    let crd = position.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();

    directionsRenderer.setMap(map);
    
    const selectedMode = "DRIVING";
    directionsService
        .route({

            origin: { lat: crd.latitude, lng: crd.longitude },
            destination: { lat: 10.18561, lng: -84.39076 },//Tienda
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: selectedMode,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
}