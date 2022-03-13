
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
  camera.position.set( 10, 15, 5 );

  cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
  cameraControls.target.set( 0, 0, 0 );

  direccional.position.set(5,10,7.5);
  scene.add(direccional);

  window.addEventListener('resize', updateAspectRatio );
  
}


function loadAjedrez()
{
  var loader = new THREE.ObjectLoader();
  loader.load('models/chess/chessboard.json', function(tablero) {
    tablero.position.y = 0;
    tablero.scale.set(1,1,1);
    scene.add(tablero);

    loader.load('models/chess/whiteking.json', function(whiteking) {
      whiteking.position.set(7,-1,1);
      tablero.add(whiteking);
    });
    loader.load('models/chess/whitequeen.json', function(whitequeen) {
      whitequeen.position.set(7,1,1);
      tablero.add(whitequeen);
    });
    loader.load('models/chess/whitebishop.json', function(whitebishop) {
      whitebishop.position.set(7,3,1);
      tablero.add(whitebishop);
    });
    loader.load('models/chess/whitebishop.json', function(whitebishop) {
      whitebishop.position.set(7,-3,1);
      tablero.add(whitebishop);
    });
    loader.load('models/chess/whiteknight.json', function(whiteknight) {
      whiteknight.position.set(7,-5,1);
      tablero.add(whiteknight);
    });
    loader.load('models/chess/whiteknight.json', function(whiteknight) {
      whiteknight.position.set(7,5,1);
      tablero.add(whiteknight);
    });
    loader.load('models/chess/whiterook.json', function(whiterook) {
      whiterook.position.set(7,-7,1);
      tablero.add(whiterook);
    });
    loader.load('models/chess/whiterook.json', function(whiterook) {
      whiterook.position.set(7,7,1);
      tablero.add(whiterook);
    });
    loader.load('models/chess/whitepawn.json', function(whitepawn) {
      whitepawn.position.set(5,7,1);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/whitepawn.json', function(whitepawn) {
      whitepawn.position.set(5,5,1);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/whitepawn.json', function(whitepawn) {
      whitepawn.position.set(5,3,1);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/whitepawn.json', function(whitepawn) {
      whitepawn.position.set(5,1,1);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/whitepawn.json', function(whitepawn) {
      whitepawn.position.set(5,-1,1);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/whitepawn.json', function(whitepawn) {
      whitepawn.position.set(5,-3,1);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/whitepawn.json', function(whitepawn) {
      whitepawn.position.set(5,-5,1);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/whitepawn.json', function(whitepawn) {
      whitepawn.position.set(5,-7,1);
      tablero.add(whitepawn);
    });
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