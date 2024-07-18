// app.js

// Initialize the HoloJs environment
let holoJsContext = new HoloJs.Context();

holoJsContext.setJsApi('three', THREE);
holoJsContext.run('start()');

// Create the start function
function start() {
    // Setup the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    // Load the GLTF model
    const loader = new THREE.GLTFLoader();
    loader.load('https://bmg-pcl.github.io/minimodel-demo/compressed.glb', function (gltf) {
        scene.add(gltf.scene);
        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    // Set the camera position
    camera.position.z = 5;

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
