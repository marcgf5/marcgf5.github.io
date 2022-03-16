
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
  camera.position.set( 10, 10, 0 );

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
  renderer.domElement.addEventListener('dblclick', movimientoPiezas);
  
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
      this.whitequeen = whitequeen;
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
      orangeknight.rotation.set(1.55,3,0);
      orangeknight.position.set(-7,-5,1);
      orangeknight.name = 'blackknight1';
      this.blackknight1 = orangeknight;
      shadowsReady(orangeknight);
      tablero.add(orangeknight);
    });
    loader.load('models/chess/knight.json', function(orangeknight) {
      orangeknight.material = blackMaterial;
      orangeknight.scale.set(45,45,45);
      orangeknight.rotation.set(1.55,3,0);
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
  TWEEN.update();
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
      console.log(interseccion);
      switch(interseccion[0].object.name){
        case 'whitepawn1':
          moveWP1.start();
          console.log('Animacion');
          break;
        case 'whitepawn2':
          moveWP2.start();
          console.log('Animacion');
          break;
        case 'whitepawn3':
          moveWP3.start();
          console.log('Animacion');
          break;
        case 'whitepawn4':
          moveWP4.start();
          console.log('Animacion');
          break;
        case 'whitepawn5':
          moveWP5.start();
          console.log('Animacion');
          break;
        case 'whitepawn6':
          moveWP6.start();
          console.log('Animacion');
          break;
        case 'whitepawn7':
          moveWP7.start();
          console.log('Animacion');
          break;
        case 'whitepawn8':
          moveWP8.start();
          console.log('Animacion');
          break;
        case 'whiterook1':
          moveWR1.start();
          console.log('Animacion');
          break;
        case 'whiterook2':
          moveWR2.start();
          console.log('Animacion');
          break;
        case 'whiteknight1':
          moveWKn1.start();
          console.log('Animacion');
          break;
        case 'whiteknight2':
          moveWKn2.start();
          console.log('Animacion');
          break;
        case 'whitebishop1':
          moveWB1.start();
          console.log('Animacion');
          break;
        case 'whitebishop2':
          moveWB2.start();
          console.log('Animacion');
          break;
        case 'whitequeen':
          moveWQ.start();
          console.log('Animacion');
          break;
        case 'whiteking':
          moveWKi.start();
          console.log('Animacion');
          break;
        case 'blackpawn1':
          moveBP1.start();
          console.log('Animacion');
          break;
        case 'blackpawn2':
          moveBP2.start();
          console.log('Animacion');
          break;
        case 'blackpawn3':
          moveBP3.start();
          console.log('Animacion');
          break;
        case 'blackpawn4':
          moveBP4.start();
          console.log('Animacion');
          break;
        case 'blackpawn5':
          moveBP5.start();
          console.log('Animacion');
          break;
        case 'blackpawn6':
          moveBP6.start();
          console.log('Animacion');
          break;
        case 'blackpawn7':
          moveBP7.start();
          console.log('Animacion');
          break;
        case 'blackpawn8':
          moveBP8.start();
          console.log('Animacion');
          break;
        case 'blackrook1':
          moveBR1.start();
          console.log('Animacion');
          break;
        case 'blackrook2':
          moveBR2.start();
          console.log('Animacion');
          break;
        case 'blackknight1':
          moveBKn1.start();
          console.log('Animacion');
          break;
        case 'blackknight2':
          moveBKn2.start();
          console.log('Animacion');
          break;
        case 'blackbishop1':
          moveBB1.start();
          console.log('Animacion');
          break;
        case 'blackbishop2':
          moveBB2.start();
          console.log('Animacion');
          break;
        case 'blackqueen':
          moveBQ.start();
          console.log('Animacion');
          break;
        case 'blackking':
          moveBKi.start();
          console.log('Animacion');
          break;
      }
  }
}

function updateAnimation(){
  moveWP1 = new TWEEN.Tween(whitepawn1.position).
                               to( {x : whitepawn1.position.x - 2}, 500);
  moveWP1.easing( TWEEN.Easing.Bounce.Out );
  moveWP1.interpolation( TWEEN.Interpolation.Bezier );
  moveWP2 = new TWEEN.Tween(whitepawn2.position).
                               to( {x : whitepawn2.position.x - 2}, 500);
  moveWP2.easing( TWEEN.Easing.Bounce.Out );
  moveWP2.interpolation( TWEEN.Interpolation.Bezier );
  moveWP3 = new TWEEN.Tween(whitepawn3.position).
                               to( {x : whitepawn3.position.x - 2}, 500);
  moveWP3.easing( TWEEN.Easing.Bounce.Out );
  moveWP3.interpolation( TWEEN.Interpolation.Bezier );
  moveWP4 = new TWEEN.Tween(whitepawn4.position).
                               to( {x : whitepawn4.position.x - 2}, 500);
  moveWP4.easing( TWEEN.Easing.Bounce.Out );
  moveWP4.interpolation( TWEEN.Interpolation.Bezier );
  moveWP5 = new TWEEN.Tween(whitepawn5.position).
                               to( {x : whitepawn5.position.x - 2}, 500);
  moveWP5.easing( TWEEN.Easing.Bounce.Out );
  moveWP5.interpolation( TWEEN.Interpolation.Bezier );
  moveWP6 = new TWEEN.Tween(whitepawn6.position).
                               to( {x : whitepawn6.position.x - 2}, 500);
  moveWP6.easing( TWEEN.Easing.Bounce.Out );
  moveWP6.interpolation( TWEEN.Interpolation.Bezier );
  moveWP7 = new TWEEN.Tween(whitepawn7.position).
                               to( {x : whitepawn7.position.x - 2}, 500);
  moveWP7.easing( TWEEN.Easing.Bounce.Out );
  moveWP7.interpolation( TWEEN.Interpolation.Bezier );
  moveWP8 = new TWEEN.Tween(whitepawn8.position).
                               to( {x : whitepawn8.position.x - 2}, 500);
  moveWP8.easing( TWEEN.Easing.Bounce.Out );
  moveWP8.interpolation( TWEEN.Interpolation.Bezier );
  moveWR1 = new TWEEN.Tween(whiterook1.position).
                               to( {x : whiterook1.position.x - 2}, 500);
  moveWR1.easing( TWEEN.Easing.Bounce.Out );
  moveWR1.interpolation( TWEEN.Interpolation.Bezier );
  moveWR2 = new TWEEN.Tween(whiterook2.position).
                               to( {x : whiterook2.position.x - 2}, 500);
  moveWR2.easing( TWEEN.Easing.Bounce.Out );
  moveWR2.interpolation( TWEEN.Interpolation.Bezier );
  moveWB1 = new TWEEN.Tween(whitebishop1.position).
                               to( {x : whitebishop1.position.x - 2}, 500);
  moveWB1.easing( TWEEN.Easing.Bounce.Out );
  moveWB1.interpolation( TWEEN.Interpolation.Bezier );
  moveWB2 = new TWEEN.Tween(whitebishop2.position).
                               to( {x : whitebishop2.position.x - 2}, 500);
  moveWB2.easing( TWEEN.Easing.Bounce.Out );
  moveWB2.interpolation( TWEEN.Interpolation.Bezier );
  moveWKn1 = new TWEEN.Tween(whiteknight1.position).
                               to( {x : whiteknight1.position.x - 2}, 500);
  moveWKn1.easing( TWEEN.Easing.Bounce.Out );
  moveWKn1.interpolation( TWEEN.Interpolation.Bezier );
  moveWKn2 = new TWEEN.Tween(whiteknight2.position).
                               to( {x : whiteknight2.position.x - 2}, 500);
  moveWKn2.easing( TWEEN.Easing.Bounce.Out );
  moveWKn2.interpolation( TWEEN.Interpolation.Bezier );
  moveWQ = new TWEEN.Tween(whitequeen.position).
                               to( {x : whitequeen.position.x - 2}, 500);
  moveWQ.easing( TWEEN.Easing.Bounce.Out );
  moveWQ.interpolation( TWEEN.Interpolation.Bezier );
  moveWKi = new TWEEN.Tween(whiteking.position).
                               to( {x : whiteking.position.x - 2}, 500);
  moveWKi.easing( TWEEN.Easing.Bounce.Out );
  moveWKi.interpolation( TWEEN.Interpolation.Bezier );
  moveBP1 = new TWEEN.Tween(blackpawn1.position).
                               to( {x : blackpawn1.position.x + 2}, 500);
  moveBP1.easing( TWEEN.Easing.Bounce.Out );
  moveBP1.interpolation( TWEEN.Interpolation.Bezier );
  moveBP2 = new TWEEN.Tween(blackpawn2.position).
                               to( {x : blackpawn2.position.x + 2}, 500);
  moveBP2.easing( TWEEN.Easing.Bounce.Out );
  moveBP2.interpolation( TWEEN.Interpolation.Bezier );
  moveBP3 = new TWEEN.Tween(blackpawn3.position).
                               to( {x : blackpawn3.position.x + 2}, 500);
  moveBP3.easing( TWEEN.Easing.Bounce.Out );
  moveBP3.interpolation( TWEEN.Interpolation.Bezier );
  moveBP4 = new TWEEN.Tween(blackpawn4.position).
                               to( {x : blackpawn4.position.x + 2}, 500);
  moveBP4.easing( TWEEN.Easing.Bounce.Out );
  moveBP4.interpolation( TWEEN.Interpolation.Bezier );
  moveBP5 = new TWEEN.Tween(blackpawn5.position).
                               to( {x : blackpawn5.position.x + 2}, 500);
  moveBP5.easing( TWEEN.Easing.Bounce.Out );
  moveBP5.interpolation( TWEEN.Interpolation.Bezier );
  moveBP6 = new TWEEN.Tween(blackpawn6.position).
                               to( {x : blackpawn6.position.x + 2}, 500);
  moveBP6.easing( TWEEN.Easing.Bounce.Out );
  moveBP6.interpolation( TWEEN.Interpolation.Bezier );
  moveBP7 = new TWEEN.Tween(blackpawn7.position).
                               to( {x : blackpawn7.position.x + 2}, 500);
  moveBP7.easing( TWEEN.Easing.Bounce.Out );
  moveBP7.interpolation( TWEEN.Interpolation.Bezier );
  moveBP8 = new TWEEN.Tween(blackpawn8.position).
                               to( {x : blackpawn8.position.x + 2}, 500);
  moveBP8.easing( TWEEN.Easing.Bounce.Out );
  moveBP8.interpolation( TWEEN.Interpolation.Bezier );
  moveBR1 = new TWEEN.Tween(blackrook1.position).
                               to( {x : blackrook1.position.x + 2}, 500);
  moveBR1.easing( TWEEN.Easing.Bounce.Out );
  moveBR1.interpolation( TWEEN.Interpolation.Bezier );
  moveBR2 = new TWEEN.Tween(blackrook2.position).
                               to( {x : blackrook2.position.x + 2}, 500);
  moveBR2.easing( TWEEN.Easing.Bounce.Out );
  moveBR2.interpolation( TWEEN.Interpolation.Bezier );
  moveBB1 = new TWEEN.Tween(blackbishop1.position).
                               to( {x : blackbishop1.position.x + 2}, 500);
  moveBB1.easing( TWEEN.Easing.Bounce.Out );
  moveBB1.interpolation( TWEEN.Interpolation.Bezier );
  moveBB2 = new TWEEN.Tween(blackbishop2.position).
                               to( {x : blackbishop2.position.x + 2}, 500);
  moveBB2.easing( TWEEN.Easing.Bounce.Out );
  moveBB2.interpolation( TWEEN.Interpolation.Bezier );
  moveBKn1 = new TWEEN.Tween(blackknight1.position).
                               to( {x : blackknight1.position.x + 2}, 500);
  moveBKn1.easing( TWEEN.Easing.Bounce.Out );
  moveBKn1.interpolation( TWEEN.Interpolation.Bezier );
  moveBKn2 = new TWEEN.Tween(blackknight2.position).
                               to( {x : blackknight2.position.x + 2}, 500);
  moveBKn2.easing( TWEEN.Easing.Bounce.Out );
  moveBKn2.interpolation( TWEEN.Interpolation.Bezier );
  moveBQ = new TWEEN.Tween(blackqueen.position).
                               to( {x : blackqueen.position.x + 2}, 500);
  moveBQ.easing( TWEEN.Easing.Bounce.Out );
  moveBQ.interpolation( TWEEN.Interpolation.Bezier );
  moveBKi = new TWEEN.Tween(blackking.position).
                               to( {x : blackking.position.x + 2}, 500);
  moveBKi.easing( TWEEN.Easing.Bounce.Out );
  moveBKi.interpolation( TWEEN.Interpolation.Bezier );
}

function render()
{
	requestAnimationFrame( render );
	update();
	renderer.render( scene, camera );
}