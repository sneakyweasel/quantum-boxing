// import OrbitControls from 'orbit-controls-es6';
import {
  BufferGeometry,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
  Line,
  LineBasicMaterial,
  Path,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  Points
} from "three";
import THREE = require("three");
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Brick } from "./brick";
import { Sphere } from "./sphere";
import { Torus } from "./torus";

export class App {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    10000
  );
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement
  });
  // private particles: Points;

  private player: Sphere;
  private playerLeft: Brick;
  private playerRight: Brick;

  private gateH: Brick;
  private gateX: Brick;

  constructor() {
    // this.scene.fog = new THREE.FogExp2( 0x000000, 0.003 );

    // Create player
    const brickSize = 8;
    this.player = new Sphere(10, new Color("rgb(255,0,255)"));
    this.playerLeft = new Brick(brickSize, new Color("rgb(255,0,0)"));
    this.playerRight = new Brick(brickSize, new Color("rgb(255,0,0)"));
    // Position opponent
    const playerPos = 0;
    this.player.position.set(playerPos, 0, 0);
    this.playerLeft.position.set(playerPos, 0, 10);
    this.playerRight.position.set(playerPos, 0, -10);
    // Add to scene
    this.scene.add(this.player);
    this.scene.add(this.playerLeft);
    this.scene.add(this.playerRight);

    // Add torus for line direction
    const xTorus = new Torus(25, new Color("rgb(255,255,0)"));
    this.scene.add(xTorus);

    // Path indicator
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const geometryL = new THREE.Geometry();
    geometryL.vertices.push(new THREE.Vector3(0, 0, 20));
    geometryL.vertices.push(new THREE.Vector3(-300, 0, 20));
    const lineL = new THREE.Line(geometryL, material);
    this.scene.add(lineL);

    const geometryR = new THREE.Geometry();
    geometryR.vertices.push(new THREE.Vector3(0, 0, -20));
    geometryR.vertices.push(new THREE.Vector3(-300, 0, -20));
    // geometry.vertices.push(new THREE.Vector3(10, 0, 0));
    const lineR = new THREE.Line(geometryR, material);
    this.scene.add(lineR);

    // Gate block
    this.gateH = new Brick(brickSize, new Color("rgb(0,255,0)"));
    this.gateX = new Brick(brickSize, new Color("rgb(0,255,255)"));
    // Position
    this.gateH.position.set(-300, 0, 20);
    this.gateX.position.set(-300, 0, -20);
    // Add to scene
    this.scene.add(this.gateH);
    this.scene.add(this.gateX);


    // Particle system
    // const vertices = [];
    // for (let i = 0; i < 1000; i++) {
    //   const x = Math.random() * 2000 - 1000;
    //   const y = Math.random() * 2000 - 1000;
    //   const z = Math.random() * 2000 - 1000;
    //   vertices.push(x, y, z);
    // }
    // const geometry = new THREE.BufferGeometry();
    // geometry.addAttribute(
    //   "position",
    //   new THREE.Float32BufferAttribute(vertices, 3)
    // );
    // const materials = new THREE.PointsMaterial({
    //   blending: THREE.AdditiveBlending,
    //   depthTest: false,
    //   size: 5,
    //   transparent: true,
    // });
    // materials.color.setHSL(1.0, 0.2, 0.5);
    // this.particles = new THREE.Points(geometry, materials);
    // this.scene.add(this.particles);

    // Main camera and renderer
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color("rgb(0,0,0)"));

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Hemisphere light
    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);
    const hemiLightHelper = new HemisphereLightHelper(hemiLight, 10);
    this.scene.add(hemiLightHelper);

    // Directional light
    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(20);
    this.scene.add(dirLight);
    dirLight.castShadow = true;
    const dirLightHeper = new DirectionalLightHelper(dirLight, 10);
    this.scene.add(dirLightHeper);

    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());

    this.adjustCanvasSize();

    this.gateH.translateX(1);
    this.gateX.translateX(1);

    // Animation opponent
    // this.opponentDefenseTop.rotateZ(0.02);
    // this.opponentDefenseBottom.rotateZ(-0.02);
    // this.opponentDefenseRight.rotateY(0.02);
    // this.opponentDefenseLeft.rotateY(-0.02);
    // // Animation player
    // this.playerDefenseTop.rotateZ(-0.02);
    // this.playerDefenseBottom.rotateZ(0.02);
    // this.playerDefenseRight.rotateY(-0.02);
    // this.playerDefenseLeft.rotateY(0.02);
  }
}
