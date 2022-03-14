
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

  var whiteMap = textureLoader.load('images/whitemarble.jpg');
  var blackMap = textureLoader.load('images/blackmarble.jpeg');

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

    loader.load('models/chess/whiteking.json', function(whiteking) {
      //var whitekingadd = new THREE.Mesh( whiteking, whiteMaterial );
      whiteking.position.set(7,-1,1);
      whiteking.material = whiteMaterial;
      tablero.add(whiteking);
      whiteking.traverse(function(node) {
        if (node.isMesh) {
          node.receiveShadow = true;
          node.castShadow = true;
        }
      });
    });
    loader.load('models/chess/whitequeen.json', function(whitequeen) {
      whitequeen.position.set(7,1,1);
      tablero.add(whitequeen);
      whitequeen.traverse(function(node) {
        if (node.isMesh) {
          node.receiveShadow = true;
          node.castShadow = true;
        }
      });
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
      whiteknight.rotation.set(0,0,3);
      tablero.add(whiteknight);
    });
    loader.load('models/chess/whiteknight.json', function(whiteknight) {
      whiteknight.position.set(7,5,1);
      whiteknight.rotation.set(0,0,3);
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
    loader.load('models/chess/orangeking.json', function(orangeking) {
      orangeking.position.set(-7,-1,1);
      orangeking.material = blackMaterial;
      tablero.add(orangeking);
    });
    loader.load('models/chess/orangequeen.json', function(orangequeen) {
      orangequeen.position.set(-7,1,1);
      tablero.add(orangequeen);
    });
    loader.load('models/chess/orangebishop.json', function(orangebishop) {
      orangebishop.position.set(-7,3,1);
      tablero.add(orangebishop);
    });
    loader.load('models/chess/orangebishop.json', function(orangebishop) {
      orangebishop.position.set(-7,-3,1);
      tablero.add(orangebishop);
    });
    loader.load('models/chess/orangeknight.json', function(orangeknight) {
      orangeknight.position.set(-7,-5,1);
      tablero.add(orangeknight);
    });
    loader.load('models/chess/orangeknight.json', function(orangeknight) {
      orangeknight.position.set(-7,5,1);
      tablero.add(orangeknight);
    });
    loader.load('models/chess/orangerook.json', function(orangerook) {
      orangerook.position.set(-7,-7,1);
      tablero.add(orangerook);
    });
    loader.load('models/chess/orangerook.json', function(orangerook) {
      orangerook.position.set(-7,7,1);
      tablero.add(orangerook);
    });
    loader.load('models/chess/orangepawn.json', function(orangepawn) {
      orangepawn.position.set(-5,7,1);
      tablero.add(orangepawn);
    });
    loader.load('models/chess/orangepawn.json', function(orangepawn) {
      orangepawn.position.set(-5,5,1);
      tablero.add(orangepawn);
    });
    loader.load('models/chess/orangepawn.json', function(orangepawn) {
      orangepawn.position.set(-5,3,1);
      tablero.add(orangepawn);
    });
    loader.load('models/chess/orangepawn.json', function(orangepawn) {
      orangepawn.position.set(-5,1,1);
      tablero.add(orangepawn);
    });
    loader.load('models/chess/orangepawn.json', function(orangepawn) {
      orangepawn.position.set(-5,-1,1);
      tablero.add(orangepawn);
    });
    loader.load('models/chess/orangepawn.json', function(orangepawn) {
      orangepawn.position.set(-5,-3,1);
      tablero.add(orangepawn);
    });
    loader.load('models/chess/orangepawn.json', function(orangepawn) {
      orangepawn.position.set(-5,-5,1);
      tablero.add(orangepawn);
    });
    loader.load('models/chess/orangepawn.json', function(orangepawn) {
      orangepawn.position.set(-5,-7,1);
      tablero.add(orangepawn);
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