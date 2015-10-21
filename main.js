
var renderer = new THREE.WebGLRenderer();
var height = window.innerHeight;
renderer.setSize( window.innerWidth, height);
document.body.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );

var x = 170;
var y = -70;

camera.position.set(x, y-200, 400);
camera.lookAt(new THREE.Vector3(x, y, 0));

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


    var shape = new THREE.Shape();

    polygon.forEach(function(coords, i) {
      var point = projection(coords);

      if (i == 0) {
        shape.moveTo(point[0], -1*point[1], 0);
      } else {
        shape.lineTo(point[0], -1*point[1], 0);
      }
    });

    // var material = new THREE.LineBasicMaterial({ color: 0xffffff });

    material = new THREE.MeshBasicMaterial( { color: 0xF0C400, side: THREE.DoubleSide } );

    // var geometry = new THREE.ShapeGeometry(shape);
    var geometry = new THREE.ExtrudeGeometry(shape, { amount: 10 });

    mesh = new THREE.Mesh( geometry, material );

    scene.add(mesh);

    // var line = new THREE.Line(geometry, material);
    // scene.add(line);

    // var shape = new THREE.ExtrudeGeometry(geometry, { amount: 20 });
    // scene.add(shape);

  });

  renderer.render(scene, camera);


  console.log(projection([-80, 40]));

  // var generator = d3.geo.path().projection(d3.geo.mercator());

  // var result = generator(counties);

  // console.log('result', result);

  

})