let map = L.map('map');

let lamin = 26.3978980576;

let lomin = 80.0884245137;
let lamax = 30.4227169866;
let lomax = 88.1748043151;

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
// realtime.addTo(map);



// map.setView([40,-3],6);


//for marker clusters

// //data to visualize
// let addressPoints = [  [55.6667,12.5833,1,'80'],[56,10,1,'83'],[40.4086,-3.6922,1,'94'],[19.4342,-99.1386,1,'94'],[39.9881,-0.0435,1,'65'],[46.0965,-64.7976,1,'98'],[40,-4,1,'38'],[19.4285,-99.1277,1,'60'],[40.4776,-3.7392,1,'102'],[-27.5047,152.979,1,'80'],[-30.9546,-58.7833,1,'68'],[39.9875,-0.0392,1,'45'],[39.9875,-0.0392,1,'58'],[40,-4,1,'89'],[39.9875,-0.0392,1,'55'],[37.387,-5.9501,1,'94'],[41.9902,-7.8674,1,'97'],[39.9875,-0.0392,1,'90'],[38.8833,-6.9667,1,'107'],[39.9875,-0.0392,1,'61'],[41.85,-87.65,1,'55'],[-30.9546,-58.7833,1,'85'],[39.9881,-0.0435,1,'23'],[39.9875,-0.0392,1,'58'],[-30.9546,-58.7833,1,'75'],[39.9881,-0.0435,1,'45'],[39.4667,-0.3667,1,'63'],[39.4667,-0.3667,1,'47'],[39.4667,-0.3667,1,'108'],[39.9881,-0.0435,1,'72'],[39.9875,-0.0392,1,'92'],[39.9875,-0.0392,1,'95'],[39.4667,-0.3667,1,'86'],[39.9881,-0.0435,1,'48'],[41.85,-87.65,1,'70'],[39.9875,-0.0392,1,'59'],[-30.9546,-58.7833,1,'56'],[-30.9546,-58.7833,1,'68'],[39.9875,-0.0392,1,'47'],[39.9875,-0.0392,1,'44'],[39.9875,-0.0392,1,'55'],[9.9189,-84.1399,1,'68'],[39.9875,-0.0392,1,'48'],[39.9875,-0.0392,1,'36'],[39.9875,-0.0392,1,'76'],[39.9875,-0.0392,1,'78'],[39.9875,-0.0392,1,'74'],[39.9875,-0.0392,1,'60'],[39.9881,-0.0435,1,'60'],[39.9881,-0.0435,1,'66'],[39.9881,-0.0435,1,'78'],[40,-4,1,'47'],[-30.9546,-58.7833,1,'58'],[43.3333,-2.8667,1,'80'],[19.4285,-99.1277,1,'31'],[38.3452,-0.4815,1,'97'],[41.6498,-0.9199,1,'77'],[37.999,-97.0133,1,'77'],[37.999,-97.0133,1,'100'],[9.9283,-84.0507,1,'75'],[39.9881,-0.0435,1,'100'],[19.4285,-99.1277,1,'67'],[51.05,-0.3333,1,'50'],[39.9875,-0.0392,1,'58'],[38.9674,-0.1816,1,'36'],[-30.9546,-58.7833,1,'76'],[-30.9546,-58.7833,1,'86'],[39.9875,-0.0392,1,'64'],[39.9875,-0.0392,1,'54'],[39.9875,-0.0392,1,'79'],[39.6833,-0.2667,1,'60'],[6.2681,100.422,1,'36'],[6.2681,100.422,1,'66'],[-33.8615,151.206,1,'70'],[-33.8615,151.206,1,'69'],[19.4342,-99.1386,1,'57'],[43.2609,-2.9388,1,'102'],[43.2609,-2.9388,1,'112'],[39.9875,-0.0392,1,'60'],[38.715,0.0498,1,'69'],[38.715,0.0498,1,'36'],[43.2609,-2.9388,1,'110'],[43.2609,-2.9388,1,'115'],[43.2609,-2.9388,1,'113'],[43.2609,-2.9388,1,'113'],[19.4285,-99.1277,1,'78'],[-30.9546,-58.7833,1,'66'],[40,-4,1,'64'],[40,-4,1,'63'],[39.9875,-0.0392,1,'55']  ];

// //marker cluster variable
let clusters = new L.MarkerClusterGroup();

// let markerList = [];

// addressPoints.forEach(addressPoint => {
//     markerList.push(L.marker(L.latLng(addressPoint[0],addressPoint[1])))
// });

// clusters.addLayers(markerList);

// map.addLayer(clusters);

//for realtime from Devdatta Tengshe https://gist.github.com/devdattaT/41aa886a74c904671b2c26a2c0c0a959
realtime.on('update', function (e) {
    map.fitBounds(realtime.getBounds(), {
        maxZoom: 8
    });
    
    const popupContent = function (fId) {        
        let feature = e.features[fId];
        return `<h3>Origin: ${feature.properties[2]}</h3>
        <h3>Altitude:${feature.properties[7]} m</h3>
        <h3>Velocity: ${feature.properties[9]} m/s</h3>`;
    };
    // const bindFeaturePopup = function (fId) {
    //     let realTimeLayer = realtime.getLayer(fId);

    //     // .bindPopup(popupContent(fId));
    // };
    // const updateFeaturePopup = function (fId) {
            // realtime.getLayer(fId).setIcon = planeIcon;
            // realtime.getLayer(fId).rotationAngle = realtime.getLayer(fId).properties;

    //     realtime.getLayer(fId).getPopup().setContent(popupContent(fId));
    // };

    // map.fitBounds(realtime.getBounds(), {
    //     maxZoom: 3
    // });

    // Object.keys(e.enter).forEach(bindFeaturePopup);
    // Object.keys(e.update).forEach(updateFeaturePopup);
    Object.keys(e.enter).forEach(id => {
        // debugger;
        let layer = realtime.getLayer(id);
        let coordinates = [layer.feature.geometry.coordinates[1],layer.feature.geometry.coordinates[0]];
        let marker = L.marker(coordinates,{
            icon: planeIcon,
            rotationAngle: layer.feature.properties[10]
        }).addTo(map);
        marker.bindPopup(popupContent(id));
    });

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