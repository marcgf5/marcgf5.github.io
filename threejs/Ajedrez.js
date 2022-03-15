
var renderer, scene, camera, ajedrez;
var cameraControls;
var angulo = -0.01;

init();
loadAjedrez();
render();

function init()
{
  var directional = new THREE.DirectionalLight(0xffffff, 1);
  var directional2 = new THREE.DirectionalLight(0xffffff, 1);
  var spotlight = new THREE.SpotLight(0xffffff);
  var ambiental = new THREE.AmbientLight(0xFFFBBF);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( new THREE.Color(0xFFFFFF) );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById('container').appendChild( renderer.domElement );

  scene = new THREE.Scene();

  var aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera( 50, aspectRatio , 0.1, 100 );
  camera.position.set( 10, 15, 5 );

  cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
  cameraControls.target.set( 0, 0, 0 );

  directional.position.set(10,10,0);
  directional2.position.set(-10,10,0);
  spotlight.position.set(100,1000,100);
  spotlight.castShadow = true;
  

  scene.add(directional);
  scene.add(directional2);
  //scene.add(spotlight);
  //scene.add(ambiental);

  window.addEventListener('resize', updateAspectRatio );
  
}


function loadAjedrez()
{
  var entorno = [ "images/posx.jpg" , "images/negx.jpg",
                    "images/posy.jpg" , "images/negy.jpg",
                    "images/posz.jpg" , "images/negz.jpg"];
    var texEsfera = new THREE.CubeTextureLoader().load( entorno );
    var shader = THREE.ShaderLib.cube;
    shader.uniforms.tCube.value = texEsfera;

    var matSkybox = new THREE.ShaderMaterial( {
                        vertexShader: shader.vertexShader,
                        fragmentShader: shader.fragmentShader,
                        uniforms: shader.uniforms,
                        depthWrite: false,
                        side: THREE.BackSide
    } );

    var skybox = new THREE.Mesh( new THREE.CubeGeometry(300,300,300), matSkybox );
    skybox.name = 'skybox';
    scene.add(skybox);

  var textureLoader = new THREE.TextureLoader();

  var whiteMap = textureLoader.load('images/whitewood.jpg');
  var blackMap = textureLoader.load('images/brownwood.jpg');

  var whiteMaterial = new THREE.MeshPhongMaterial({map: whiteMap});
  var blackMaterial = new THREE.MeshLambertMaterial({map: blackMap});

  var loader = new THREE.ObjectLoader();
  loader.load('models/chess/chessboard.json', function(tablero) {
    tablero.position.y = 0;
    tablero.scale.set(1,1,1);
    tablero.traverse(function(node) {
      if (node.isMesh) {
        node.receiveShadow = true;
        node.castShadow = true;
      }
    });

    loader.load('models/chess/king.json', function(whiteking) {
      whiteking.position.set(7,-1,1);
      whiteking.rotation.set(1.5,0,0);
      whiteking.material = whiteMaterial;
      tablero.add(whiteking);
      whiteking.traverse(function(node) {
        if (node.isMesh) {
          node.receiveShadow = true;
          node.castShadow = true;
        }
      });
    });
    loader.load('models/chess/queen.json', function(whitequeen) {
      whitequeen.position.set(7,1,1);
      whitequeen.rotation.set(1.5,0,0);
      whitequeen.material = whiteMaterial;
      tablero.add(whitequeen);
      whitequeen.traverse(function(node) {
        if (node.isMesh) {
          node.receiveShadow = true;
          node.castShadow = true;
        }
      });
    });
    loader.load('models/chess/bishop.json', function(whitebishop) {
      whitebishop.position.set(7,3,1);
      whitebishop.rotation.set(1.5,0,0);
      whitebishop.material = whiteMaterial;
      tablero.add(whitebishop);
    });
    loader.load('models/chess/bishop.json', function(whitebishop) {
      whitebishop.position.set(7,-3,1);
      whitebishop.rotation.set(1.5,0,0);
      whitebishop.material = whiteMaterial;
      tablero.add(whitebishop);
    });
    loader.load('models/chess/knight.json', function(whiteknight) {
      whiteknight.position.set(7,-5,1);
      whiteknight.material = whiteMaterial;
      whiteknight.scale.set(45,45,45);
      whiteknight.rotation.set(1.5,0,3);
      tablero.add(whiteknight);
    });
    loader.load('models/chess/knight.json', function(whiteknight) {
      whiteknight.position.set(7,5,1);
      whiteknight.material = whiteMaterial;
      whiteknight.scale.set(45,45,45);
      whiteknight.rotation.set(1.5,0,3);
      tablero.add(whiteknight);
    });
    loader.load('models/chess/rook.json', function(whiterook) {
      whiterook.position.set(7,-7,1);
      whiterook.material = whiteMaterial;
      whiterook.scale.set(45,45,45);
      whiteking.rotation.set(1.5,0,0);
      tablero.add(whiterook);
    });
    loader.load('models/chess/rook.json', function(whiterook) {
      whiterook.position.set(7,7,1);
      whiterook.material = whiteMaterial;
      whiterook.scale.set(45,45,45);
      whiteking.rotation.set(1.5,0,0);
      tablero.add(whiterook);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,7,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.5,0,0);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,5,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.5,0,0);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,3,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.5,0,0);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,1,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.5,0,0);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,-1,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.5,0,0);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,-3,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.5,0,0);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,-5,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.5,0,0);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,-7,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.5,0,0);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/king.json', function(orangeking) {
      orangeking.material = blackMaterial;
      orangeking.scale.set(0.75,0.75,0.75);
      orangeking.rotation.set(1.5,0,0);
      orangeking.position.set(-7,-1,1);
      tablero.add(orangeking);
    });
    loader.load('models/chess/queen.json', function(orangequeen) {
      orangequeen.material = blackMaterial;
      orangequeen.scale.set(0.75,0.75,0.75);
      orangequeen.rotation.set(1.5,0,0);
      orangequeen.position.set(-7,1,1);
      tablero.add(orangequeen);
    });
    loader.load('models/chess/bishop.json', function(orangebishop) {
      orangebishop.material = blackMaterial;
      orangebishop.scale.set(0.75,0.75,0.75);
      orangebishop.rotation.set(1.5,0,0);
      orangebishop.position.set(-7,3,1);
      tablero.add(orangebishop);
    });
    loader.load('models/chess/bishop.json', function(orangebishop) {
      orangebishop.material = blackMaterial;
      orangebishop.scale.set(0.75,0.75,0.75);
      orangebishop.rotation.set(1.5,0,0);
      orangebishop.position.set(-7,-3,1);
      tablero.add(orangebishop);
    });
    loader.load('models/chess/knight.json', function(orangeknight) {
      orangeknight.material = blackMaterial;
      orangeknight.scale.set(45,45,45);
      orangeknight.rotation.set(1.5,0,0);
      orangeknight.position.set(-7,-5,1);
      tablero.add(orangeknight);
    });
    loader.load('models/chess/knight.json', function(orangeknight) {
      orangeknight.material = blackMaterial;
      orangeknight.scale.set(45,45,45);
      orangeknight.rotation.set(1.5,0,0);
      orangeknight.position.set(-7,5,1);
      tablero.add(orangeknight);
    });
    loader.load('models/chess/rook.json', function(orangerook) {
      orangerook.material = blackMaterial;
      orangerook.scale.set(45,45,45);
      orangerook.rotation.set(1.5,0,0);
      orangerook.position.set(-7,-7,1);
      tablero.add(orangerook);
    });
    loader.load('models/chess/rook.json', function(orangerook) {
      orangerook.material = blackMaterial;
      orangerook.scale.set(45,45,45);
      orangerook.rotation.set(1.5,0,0);
      orangerook.position.set(-7,7,1);
      tablero.add(orangerook);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.5,0,0);
      pawn.position.set(-5,7,1);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.5,0,0);
      pawn.position.set(-5,5,1);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.5,0,0);
      pawn.position.set(-5,3,1);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.5,0,0);
      pawn.position.set(-5,1,1);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.5,0,0);
      pawn.position.set(-5,-1,1);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.5,0,0);
      pawn.position.set(-5,-3,1);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.5,0,0);
      pawn.position.set(-5,-5,1);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.5,0,0);
      pawn.position.set(-5,-7,1);
      tablero.add(pawn);
    });
    scene.add(tablero);
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