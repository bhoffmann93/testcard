import * as THREE from 'three';
import vertexShader from '../glsl/testcard.vert';
import fragmentShader from '../glsl/testcard.frag';

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uDelta: { value: 0 },
    uResolution: {
      value: new THREE.Vector2(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio,
      ),
    },
    uSpeed: { value: 1.0 },
  },
  vertexShader,
  fragmentShader,
  depthTest: false,
  depthWrite: false,
});

const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
scene.add(quad);

const clock = new THREE.Clock();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.uResolution.value.set(
    window.innerWidth * window.devicePixelRatio,
    window.innerHeight * window.devicePixelRatio,
  );
});

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  material.uniforms.uTime.value += delta;
  material.uniforms.uDelta.value = delta;

  renderer.render(scene, camera);
}

animate();
