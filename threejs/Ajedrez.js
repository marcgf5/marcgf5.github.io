
var renderer, scene, camera, ajedrez;
var cameraControls;
var angulo = -0.01;

init();
loadAjedrez();
render();

function init()
{
  var direccional = new THREE.DirectionalLight(0xFFFFFF);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( new THREE.Color(0xFFFFFF) );
  document.getElementById('container').appendChild( renderer.domElement );

  scene = new THREE.Scene();

  var aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera( 50, aspectRatio , 0.1, 100 );
  camera.position.set( 1, 1.5, 2 );

  cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
  cameraControls.target.set( 0, 0, 0 );

  direccional.position.set(5,10,7.5);
  scene.add(direccional);

  window.addEventListener('resize', updateAspectRatio );
  
}


function loadAjedrez()
{
  var loader = new THREE.ObjectLoader();
  loader.load('models/chess/chess.json', function(object) {
    object.position.y = 0;
    object.scale.set(0.001,0.001,0.001);
    scene.add(object);
  }, function(err)
  {
    console.log(err.message);
  });

  scene.add(new THREE.AxesHelper(3) );
}

function updateAspectRatio()
{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function update()
{
  // Cambios para actualizar la camara segun mvto del raton
  cameraControls.update();

  // Movimiento propio del cubo
}

function render()
{
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}