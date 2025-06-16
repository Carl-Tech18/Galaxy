const canvas = document.querySelector("#canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.z = 150;

const renderer = new THREE.WebGLRenderer({ canvas, antialias:true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const count = 20000;
const geom = new THREE.BufferGeometry();
const pos = new Float32Array(count*3);
const col = new Float32Array(count*3);

for (let i=0; i<count; i++) {
  const i3 = i*3;
  const radius = Math.random()*80;
  const arm = i % 5;
  const angle = radius * 0.3 + arm * (2*Math.PI/5);
  const offset = radius * 0.4;

  pos[i3]   = Math.cos(angle)*radius + (Math.random()-0.5)*offset;
  pos[i3+1] = (Math.random()-0.5)*30;
  pos[i3+2] = Math.sin(angle)*radius + (Math.random()-0.5)*offset;

  const hue = (radius / 80) * 360;
  const c = new THREE.Color(`hsl(${hue},80%,60%)`);
  col[i3] = c.r; col[i3+1] = c.g; col[i3+2] = c.b;
}

geom.setAttribute("position", new THREE.BufferAttribute(pos,3));
geom.setAttribute("color", new THREE.BufferAttribute(col,3));

const sprite = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");

const mat = new THREE.PointsMaterial({
  size: 1.2,
  vertexColors: true,
  map: sprite,
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false,
  sizeAttenuation: true
});

const galaxy = new THREE.Points(geom, mat);
scene.add(galaxy);

window.addEventListener("resize", ()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  galaxy.rotation.y += 0.001;
  controls.update();
  camera.position.x = Math.sin(Date.now() * 0.0001) * 150;
camera.position.z = Math.cos(Date.now() * 0.0001) * 150;
camera.lookAt(scene.position);
  
  renderer.render(scene, camera);
}
animate();
