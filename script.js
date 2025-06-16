const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 150;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("galaxyCanvas"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Galaxy particles
const particles = 15000;
const geometry = new THREE.BufferGeometry();
const positions = [];
const colors = [];

for (let i = 0; i < particles; i++) {
  const radius = Math.random() * 80;
  const angle = radius * 0.15 + (i % 6) * Math.PI / 3;
  const spiralOffset = radius * 0.4;

  const x = radius * Math.cos(angle) + (Math.random() - 0.5) * spiralOffset;
  const y = (Math.random() - 0.5) * 30;
  const z = radius * Math.sin(angle) + (Math.random() - 0.5) * spiralOffset;

  positions.push(x, y, z);

  const color = new THREE.Color(`hsl(${(i / particles) * 360}, 100%, 50%)`);
  colors.push(color.r, color.g, color.b);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 0.5,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false
});

const galaxy = new THREE.Points(geometry, material);
scene.add(galaxy);

// Animate
function animate() {
  requestAnimationFrame(animate);
  galaxy.rotation.y += 0.0015;
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
