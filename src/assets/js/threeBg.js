import * as THREE from "three";
import images from "./images";
const container = document.querySelector(".three_bg");
const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGL1Renderer(
    { antialias: true,}
);
renderer.setSize(window.innerWidth,window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(4,3,20,15);
const material = new THREE.MeshBasicMaterial({
   
    map:loader.load(images.bg1),
    wireframe: true,
});

const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh);

camera.position.z = 5


const count = geometry.attributes.position.count;
const clock = new THREE.Clock();


function animate(){

    const time = clock.getElapsedTime();

    for(let i = 0; i < count; i++)
    {
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);
    
    
    
    geometry.attributes.position.setZ(i,-y * time * 0.5);
  


    geometry.computeVertexNormals();

    geometry.attributes.position.needsUpdate = true;

    }


    requestAnimationFrame(animate);
 

    renderer.render(scene,camera);
}


animate();
