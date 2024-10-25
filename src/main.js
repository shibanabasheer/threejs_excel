import * as THREE from 'three';
import { parseExcel } from './app';

// Initialize Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 20, 100);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

// Render loop
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();

// Function to draw the 3D Model
const drawModel = (data) => {
    // Data is an array of coordinates from Excel [Number, X, Y, Z]
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];

    data.forEach((row) => {
        const [number, x, y, z] = row;
        points.push(new THREE.Vector3(x, y, z));
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
};

// Handle file input
document.getElementById('loadData').addEventListener('click', () => {
    const fileInput = document.getElementById('upload').files[0];
    if (fileInput) {
        parseExcel(fileInput).then((data) => {
            drawModel(data);
        });
    } else {
        alert('Please select an Excel file');
    }
});
