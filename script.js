// Code goes here

$(document).ready(function(){
  
  var scene, camera, renderer;
  //Lebar & panjang canvas layar
  var width = 1920;
  var height = 1080;
  

  function init(){
    scene = new THREE.Scene();
    // set:
    // Field of view
    // Aspect ratio - width of the element divided by the height
    // Near and far clipping ends
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xc3b8a3 );
    renderer.setSize( width, height ); //set the size of the model - more is more tasking for the browser
    document.body.appendChild( renderer.domElement ); //create the canvas

    // Cylinder luar
    // 5 lebar lingkaran atas
    // 5 lebar lingkaran bawah
    // 300 panjang tabung
    // banyak segment atas
    // banyak segment bawah
    // mesh lambert = tampilan selimut tabung 
    var cylinderGeometry = new THREE.CylinderGeometry( 5, 5, 300, 32,32,false );
    var cylinderMesh = new THREE.Mesh( cylinderGeometry, new THREE.MeshLambertMaterial() );
    // variabel yang nanti akan digunakan untuk menggabungkan 2 tabung
    var cylinder_bsp = new ThreeBSP (cylinderMesh);
    // Cylinder dalam
    // 3.5 lebar lingkaran atas
    // 3.5 lebar lingkaran bawah
    // 300 panjang tabung
    // banyak segment atas
    // banyak segment bawah
    // mesh lambert = tampilan selimut tabung 
    cylinderGeometry = new THREE.CylinderGeometry( 4, 4, 300, 32,32,false );
    cylinderMesh = new THREE.Mesh( cylinderGeometry, new THREE.MeshLambertMaterial() );
    // variabel yang nanti akan digunakan untuk menggabungkan 2 tabung
    var cylinder_bsp_sub = new ThreeBSP (cylinderMesh);
    // menggabungkan tabung luar dengan tabung dalam
		var subtract_bsp = cylinder_bsp.subtract( cylinder_bsp_sub );
    // menambahkan shading dan texture tabung
		var result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading, map: THREE.ImageUtils.loadTexture('assets/silver-metal-texture.jpg') }) );
		
		result.geometry.computeVertexNormals();
		result.position.set(0,0,0);
		scene.add( result );
    
    // set camera and controls
    // set posisi camera x,y,z
    camera.position.set(0,250,150); //move camera a bit
    // menambahkan orbit kontrol pada kamera
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    
    // Light
    // create a point light
    var pointLight =
      new THREE.PointLight(0xFFFFFF);
    
    // set its position
    pointLight.position = camera.position; //light will follow the camera
    
    // add light to the scene
    scene.add(pointLight);
  }
  
  init();
  animate();
  
  function animate() 
  {
    requestAnimationFrame( animate );
  	render();		
  	update();
  }

function update()
{
	controls.update();
}

function render() 
{	
	renderer.render( scene, camera );
}
})
