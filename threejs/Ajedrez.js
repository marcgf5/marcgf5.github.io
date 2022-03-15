
var renderer, scene, camera, ajedrez;
var cameraControls;
var angulo = -0.01;
var ball;
var subiendo = true;
var whitepawn1, whitepawn2, whitepawn3, whitepawn4, whitepawn5, whitepawn6, whitepawn7, whitepawn8;
var whitebishop1, whitebishop2, whiteknight1, whiteknight2, whiterook1, whiterook2, whiteking, whitequeen;
var blackpawn1, blackpawn2, blackpawn3, blackpawn4, blackpawn5, blackpawn6, blackpawn7, blackpawn8;
var blackbishop1, blackbishop2, blackknight1, blackknight2, blackrook1, blackrook2, blackking, blackqueen;
var moveWP1, moveWP2, moveWP3, moveWP4, moveWP5, moveWP6, moveWP7, moveWP8;
var moveWB1, moveWB2, moveWKn1, moveWKn2, moveWR1, moveWR2, moveWKi, moveWQ;
var moveBP1, moveBP2, moveBP3, moveBP4, moveBP5, moveBP6, moveBP7, moveBP8;
var moveBB1, moveBB2, moveBKn1, moveBKn2, moveBR1, moveBR2, moveBKi, moveBQ;

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
  camera = new THREE.PerspectiveCamera( 50, aspectRatio , 0.1, 300 );
  camera.position.set( 10, 25, 5 );

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

    var skybox = new THREE.Mesh( new THREE.CubeGeometry(1000,1000,1000), matSkybox );
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
    shadowsReady(tablero);

    loader.load('models/chess/king.json', function(whiteking) {
      whiteking.position.set(7,-1,1);
      whiteking.scale.set(0.75,0.75,0.75);
      whiteking.rotation.set(1.55,0,0);
      whiteking.material = whiteMaterial;
      whiteking.name = 'whiteking';
      this.whiteking = whiteking;
      shadowsReady(whiteking);
      tablero.add(whiteking);
    });
    loader.load('models/chess/queen.json', function(whitequeen) {
      whitequeen.position.set(7,1,1);
      whitequeen.rotation.set(1.55,0,0);
      whitequeen.scale.set(0.75,0.75,0.75);
      whitequeen.material = whiteMaterial;
      whitequeen.name = 'whitequeen';
      this.whitequeen = 'whitequeen';
      shadowsReady(whitequeen);
      tablero.add(whitequeen);
    });
    loader.load('models/chess/bishop.json', function(whitebishop) {
      whitebishop.position.set(7,3,1);
      whitebishop.rotation.set(1.55,0,0);
      whitebishop.scale.set(0.75,0.75,0.75);
      whitebishop.material = whiteMaterial;
      whitebishop.name = 'whitebishop1';
      this.whitebishop1 = whitebishop;
      shadowsReady(whitebishop);
      tablero.add(whitebishop);
    });
    loader.load('models/chess/bishop.json', function(whitebishop) {
      whitebishop.position.set(7,-3,1);
      whitebishop.rotation.set(1.55,0,0);
      whitebishop.scale.set(0.75,0.75,0.75);
      whitebishop.material = whiteMaterial;
      whitebishop.name = 'whitebishop2';
      this.whitebishop2 = whitebishop;
      shadowsReady(whitebishop);
      tablero.add(whitebishop);
    });
    loader.load('models/chess/knight.json', function(whiteknight) {
      whiteknight.position.set(7,-5,1);
      whiteknight.material = whiteMaterial;
      whiteknight.scale.set(45,45,45);
      whiteknight.rotation.set(1.55,0,0);
      whiteknight.name = 'whiteknight1';
      this.whiteknight1 = whiteknight;
      shadowsReady(whiteknight);
      tablero.add(whiteknight);
    });
    loader.load('models/chess/knight.json', function(whiteknight) {
      whiteknight.position.set(7,5,1);
      whiteknight.material = whiteMaterial;
      whiteknight.scale.set(45,45,45);
      whiteknight.rotation.set(1.55,0,0);
      whiteknight.name = 'whiteknight2';
      this.whiteknight2 = whiteknight;
      shadowsReady(whiteknight);
      tablero.add(whiteknight);
    });
    loader.load('models/chess/rook.json', function(whiterook) {
      whiterook.position.set(7,-7,1);
      whiterook.material = whiteMaterial;
      whiterook.scale.set(45,45,45);
      whiterook.rotation.set(1.55,0,0);
      whiterook.name = 'whiterook1';
      this.whiterook1 = whiterook;
      shadowsReady(whiterook);
      tablero.add(whiterook);
    });
    loader.load('models/chess/rook.json', function(whiterook) {
      whiterook.position.set(7,7,1);
      whiterook.material = whiteMaterial;
      whiterook.scale.set(45,45,45);
      whiterook.rotation.set(1.55,0,0);
      whiterook.name = 'whiterook2';
      this.whiterook2 = whiterook;
      shadowsReady(whiterook);
      tablero.add(whiterook);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,7,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.55,0,0);
      whitepawn.name = 'whitepawn1';
      this.whitepawn1 = whitepawn;
      shadowsReady(whitepawn);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,5,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.55,0,0);
      whitepawn.name = 'whitepawn2';
      this.whitepawn2 = whitepawn;
      shadowsReady(whitepawn);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,3,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.55,0,0);
      whitepawn.name = 'whitepawn3';
      this.whitepawn3 = whitepawn;
      shadowsReady(whitepawn);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,1,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.55,0,0);
      whitepawn.name = 'whitepawn4';
      this.whitepawn4 = whitepawn;
      shadowsReady(whitepawn);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,-1,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.55,0,0);
      whitepawn.name = 'whitepawn5';
      this.whitepawn5 = whitepawn;
      shadowsReady(whitepawn);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,-3,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.55,0,0);
      whitepawn.name = 'whitepawn6';
      this.whitepawn6 = whitepawn;
      shadowsReady(whitepawn);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,-5,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.55,0,0);
      whitepawn.name = 'whitepawn7';
      this.whitepawn7 = whitepawn;
      shadowsReady(whitepawn);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/pawn.json', function(whitepawn) {
      whitepawn.position.set(5,-7,1);
      whitepawn.material = whiteMaterial;
      whitepawn.scale.set(45,45,45);
      whitepawn.rotation.set(1.55,0,0);
      whitepawn.name = 'whitepawn8';
      this.whitepawn8 = whitepawn;
      shadowsReady(whitepawn);
      tablero.add(whitepawn);
    });
    loader.load('models/chess/king.json', function(orangeking) {
      orangeking.material = blackMaterial;
      orangeking.scale.set(0.75,0.75,0.75);
      orangeking.rotation.set(1.55,0,0);
      orangeking.position.set(-7,-1,1);
      orangeking.name = 'blackking';
      this.blackking = orangeking;
      shadowsReady(orangeking);
      tablero.add(orangeking);
    });
    loader.load('models/chess/queen.json', function(orangequeen) {
      orangequeen.material = blackMaterial;
      orangequeen.scale.set(0.75,0.75,0.75);
      orangequeen.rotation.set(1.55,0,0);
      orangequeen.position.set(-7,1,1);
      orangequeen.name = 'blackqueen';
      this.blackqueen = orangequeen;
      shadowsReady(orangequeen);
      tablero.add(orangequeen);
    });
    loader.load('models/chess/bishop.json', function(orangebishop) {
      orangebishop.material = blackMaterial;
      orangebishop.scale.set(0.75,0.75,0.75);
      orangebishop.rotation.set(1.55,0,0);
      orangebishop.position.set(-7,3,1);
      orangebishop.name = 'blackbishop1';
      this.blackbishop1 = orangebishop;
      shadowsReady(orangebishop);
      tablero.add(orangebishop);
    });
    loader.load('models/chess/bishop.json', function(orangebishop) {
      orangebishop.material = blackMaterial;
      orangebishop.scale.set(0.75,0.75,0.75);
      orangebishop.rotation.set(1.55,0,0);
      orangebishop.position.set(-7,-3,1);
      orangebishop.name = 'blackbishop2';
      this.blackbishop2 = orangebishop;
      shadowsReady(orangebishop);
      tablero.add(orangebishop);
    });
    loader.load('models/chess/knight.json', function(orangeknight) {
      orangeknight.material = blackMaterial;
      orangeknight.scale.set(45,45,45);
      orangeknight.rotation.set(1.55,0,0);
      orangeknight.position.set(-7,-5,1);
      orangeknight.name = 'blackknight1';
      this.blackknight1 = orangeknight;
      shadowsReady(orangeknight);
      tablero.add(orangeknight);
    });
    loader.load('models/chess/knight.json', function(orangeknight) {
      orangeknight.material = blackMaterial;
      orangeknight.scale.set(45,45,45);
      orangeknight.rotation.set(1.55,0,0);
      orangeknight.position.set(-7,5,1);
      orangeknight.name = 'blackknight2';
      this.blackknight2 = orangeknight;
      shadowsReady(orangeknight);
      tablero.add(orangeknight);
    });
    loader.load('models/chess/rook.json', function(orangerook) {
      orangerook.material = blackMaterial;
      orangerook.scale.set(45,45,45);
      orangerook.rotation.set(1.55,0,0);
      orangerook.position.set(-7,-7,1);
      orangerook.name = 'blackrook1';
      this.blackrook1 = orangerook;
      shadowsReady(orangerook);
      tablero.add(orangerook);
    });
    loader.load('models/chess/rook.json', function(orangerook) {
      orangerook.material = blackMaterial;
      orangerook.scale.set(45,45,45);
      orangerook.rotation.set(1.55,0,0);
      orangerook.position.set(-7,7,1);
      orangerook.name = 'blackrook2';
      this.blackrook2 = orangerook;
      shadowsReady(orangerook);
      tablero.add(orangerook);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.55,0,0);
      pawn.position.set(-5,7,1);
      pawn.name = 'blackpawn1';
      this.blackpawn1 = pawn;
      shadowsReady(pawn);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.55,0,0);
      pawn.position.set(-5,5,1);
      pawn.name = 'blackpawn2';
      this.blackpawn2 = pawn;
      shadowsReady(pawn);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.55,0,0);
      pawn.position.set(-5,3,1);
      pawn.name = 'blackpawn3';
      this.blackpawn3 = pawn;
      shadowsReady(pawn);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.55,0,0);
      pawn.position.set(-5,1,1);
      pawn.name = 'blackpawn4';
      this.blackpawn4 = pawn;
      shadowsReady(pawn);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.55,0,0);
      pawn.position.set(-5,-1,1);
      pawn.name = 'blackpawn5';
      this.blackpawn5 = pawn;
      shadowsReady(pawn);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.55,0,0);
      pawn.position.set(-5,-3,1);
      pawn.name = 'blackpawn6';
      this.blackpawn6 = pawn;
      shadowsReady(pawn);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.55,0,0);
      pawn.position.set(-5,-5,1);
      pawn.name = 'blackpawn7';
      this.blackpawn7 = pawn;
      shadowsReady(pawn);
      tablero.add(pawn);
    });
    loader.load('models/chess/pawn.json', function(pawn) {
      pawn.material = blackMaterial;
      pawn.scale.set(45,45,45);
      pawn.rotation.set(1.55,0,0);
      pawn.position.set(-5,-7,1);
      pawn.name = 'blackpawn8';
      this.blackpawn8 = pawn;
      shadowsReady(pawn);
      tablero.add(pawn);
    });
    scene.add(tablero);

    loader.load('models/chess/umbrella.json', function(umbrella){
      umbrella.position.set(-150,-150,-150);
      scene.add(umbrella);
    });
  }, function(err)
  {
    console.log(err.message);
  });
  var texturaBola = new THREE.TextureLoader().load("images/beachball.png");
    var geoBola = new THREE.SphereGeometry( 1, 30, 30 );
    var ballMaterial = new THREE.MeshPhongMaterial( {map: texturaBola } );
    ball = new THREE.Mesh( geoBola, ballMaterial);
    ball.position.set(80,-35,40);
    ball.scale.set(5,5,5);
    scene.add(ball);
  //scene.add(new THREE.AxesHelper(3) );
}

function shadowsReady(object){
  object.traverse(function(node) {
      node.receiveShadow = true;
      node.castShadow = true;
  });
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

  // Movimiento propio de la bola
  if(ball.position.y <= -35){
    subiendo = true;
  }else if(ball.position.y >= 0){
    subiendo = false;
  }

  if(subiendo){
    ball.position.y = ball.position.y + parseFloat(0.5);
  }else{
    ball.position.y = ball.position.y - parseFloat(0.3);
  }

  updateAnimation();
}

function movimientoPiezas(event){
  var x = event.clientX;
  var y = event.clientY;

  // Normalizar al espacio de 2x2 centrado
  x = x * 2/window.innerWidth - 1;
  y = -y * 2/window.innerHeight + 1;

  // Construir el rayo que pasa por el punto de vista y el punto x,y
  var rayo = new THREE.Raycaster();
  rayo.setFromCamera( new THREE.Vector2(x,y), camera);

  // Calcular interseccion con objetos de la escena
  var interseccion = rayo.intersectObjects( scene.children, true );
  if( interseccion.length > 0){
      // Ver si es el soldado
      switch(interseccion[0].object.name){
        case 'whitepawn1':
          moveWP1.start();
          break;
      }
  }
}

function updateAnimation(){
  moveWP1 = new TWEEN.Tween(whitepawn1.position.x).
                               to( whitepawn1.position.x + 2);
  salto.easing( TWEEN.Easing.Bounce.Out );
                               salto.interpolation( TWEEN.Interpolation.Bezier );
}

function render()
{
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}