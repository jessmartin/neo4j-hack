
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set(0, 0, 200);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();






d3.json('county.json', function(data) {
  var counties = topojson.feature(data, data.objects.county);
  var projection = d3.geo.mercator();
  var features = counties.features;

  console.log('features', features);


  features.forEach(function(feature) {
    var coordinates = feature.geometry.coordinates[0];
    if (!coordinates) {
      return;
    }
    var polygon = coordinates[0];


    var geometry = new THREE.Geometry();
    polygon.forEach(function(coords) {
      var point = projection(coords);

      geometry.vertices.push(new THREE.Vector3(point[0], point[1], 0))
    });

    var material = new THREE.LineBasicMaterial({ color: 0xffffff });
    var line = new THREE.Line(geometry, material);
    scene.add(line);

  });

  renderer.render(scene, camera);


  console.log(projection([-80, 40]));

  // var generator = d3.geo.path().projection(d3.geo.mercator());

  // var result = generator(counties);

  // console.log('result', result);

  

})