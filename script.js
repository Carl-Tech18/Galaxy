const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Galaxy particle system
const count = 20000;
const geometry = new THREE.BufferGeometry();
const pos = new Float32Array(count * 3);
const col = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  const i3 = i * 3;
  const arm = i % 3;
  const t = Math.random();
  const radius = t * 50;
  const angle = t * Math.PI * 5 + arm * (2 * Math.PI / 3);

  const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
  const y = (Math.random() - 0.5) * 5;
  const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;

  pos[i3] = x;
  pos[i3 + 1] = y;
  pos[i3 + 2] = z;

  const hue = (radius / 50) * 360;
  const color = new THREE.Color(`hsl(${hue}, 100%, 70%)`);
  col[i3] = color.r;
  col[i3 + 1] = color.g;
  col[i3 + 2] = color.b;
}

geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
geometry.setAttribute("color", new THREE.BufferAttribute(col, 3));

// Load glow texture
const sprite = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");

const material = new THREE.PointsMaterial({
  size: 0.6,
  vertexColors: true,
  map: sprite,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  sizeAttenuation: true, // Depth effect
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0015;
  controls.update();
  renderer.render(scene, camera);
}
animate();
