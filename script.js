const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Galaxy Geometry
const galaxyGeometry = new THREE.BufferGeometry();
const particleCount = 10000;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3;
  const radius = Math.random() * 5;
  const angle = Math.random() * Math.PI * 2;
  const spiral = radius * 0.3;

  positions[i3] = Math.cos(angle + spiral) * radius;
  positions[i3 + 1] = (Math.random() - 0.5) * 1.5;
  positions[i3 + 2] = Math.sin(angle + spiral) * radius;

  const color = new THREE.Color(`hsl(${(i / particleCount) * 360}, 100%, 70%)`);
  colors[i3] = color.r;
  colors[i3 + 1] = color.g;
  colors[i3 + 2] = color.b;
}

galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const galaxyMaterial = new THREE.PointsMaterial({
  size: 0.03,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  transparent: true,
});

const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

camera.position.z = 6;

function animate() {
  requestAnimationFrame(animate);
  galaxy.rotation.y += 0.0015;
  galaxy.rotation.x += 0.0005;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
