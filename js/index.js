let map = L.map('map');
let lamin = 34;
let lomin = -10;
let lamax = 44;
let lomax = 4;

//spain - -9.39288367353, 35.946850084, 3.03948408368, 43.7483377142
//portugl -- -9.52657060387, 36.838268541, -6.3890876937, 42.280468655

L.tileLayer('https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png').addTo(map);

//icon for the plane
planeIcon = L.icon({
    iconUrl: 'css/sharpplane.png',
    iconSize: [15, 20] // size of the icon
    // size of the shadow
    // point from which the popup should open relative to the iconAnchor
});

realtime = L.realtime(getCustomData, {
    interval: 10 * 1000
});

// //marker cluster variable
let clusters = new L.MarkerClusterGroup();

//for realtime from Devdatta Tengshe https://gist.github.com/devdattaT/41aa886a74c904671b2c26a2c0c0a959
realtime.on('update', function (e) {
    
    document.getElementById('spinner').className = "show";

    const popupContent = function (fId) {
        let feature = e.features[fId];
        return `<h3>Origin: ${feature.properties[2]}</h3>
        <h3>Altitude:${feature.properties[7]} m</h3>
        <h3>Velocity: ${feature.properties[9]} m/s</h3>`;
    };

    let markerList = [];
    Object.keys(e.enter).forEach(id => {
        let layer = realtime.getLayer(id);
        let coordinates = [layer.feature.geometry.coordinates[1], layer.feature.geometry.coordinates[0]];
        let marker = L.marker(coordinates, {
            icon: planeIcon,
            rotationAngle: layer.feature.properties[10]
        });
        marker.bindPopup(popupContent(id));
        markerList.push(marker);
    });
    clusters.addLayers(markerList);
    map.addLayer(clusters);
    map.fitBounds(realtime.getBounds(), {
        maxZoom: 8
    });
    document.getElementById('spinner').className = "hide";
});



function getCustomData(success, error) {
    let baseUrl = "https://opensky-network.org/api/states/all";
    let url = `${baseUrl}?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            // console.log(xhr.responseText);
            var res = convertToGeoJSON(xhr.responseText);

            success(res);
        } else {
            var e = new Error("HTTP Rquest")
            error(e, xhr.status);
        }
    };
    xhr.send();

    function convertToGeoJSON(input) {
        //convert input to Object, if it is of type string
        if (typeof (input) == "string") {
            input = JSON.parse(input);
        }
        var fs = {
            "type": "FeatureCollection",
            "features": []
        };
        for (var i = 0; i < input.states.length; i++) {
            // debugger;
            var ele = input.states[i];
            // debugger;
            var feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ele[5], ele[6]]
                }
            };
            feature.properties = ele;
            //set the id
            feature.properties["id"] = i;

            //check that the elements are numeric and only then insert
            if (isNumeric(ele[5]) && isNumeric(ele[6])) {
                //add this feature to the features array
                fs.features.push(feature)
            }
        }
        //return the GeoJSON FeatureCollection
        console.log(fs);
        return fs;
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

}