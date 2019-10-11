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
    10000,
  );
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });

  private player: Sphere;
  private playerDefenseTop: Brick;
  private playerDefenseBottom: Brick;
  private playerDefenseLeft: Brick;
  private playerDefenseRight: Brick;

  private opponent: Sphere;
  private opponentDefenseTop: Brick;
  private opponentDefenseBottom: Brick;
  private opponentDefenseLeft: Brick;
  private opponentDefenseRight: Brick;

  constructor() {
    // Create player
    const brickSize = 8;
    this.player = new Sphere(10, new Color("rgb(255,0,255)"));
    this.playerDefenseTop = new Brick(brickSize, new Color("rgb(255,0,0)"));
    this.playerDefenseBottom = new Brick(brickSize, new Color("rgb(255,0,0)"));
    this.playerDefenseRight = new Brick(brickSize, new Color("rgb(255,0,0)"));
    this.playerDefenseLeft = new Brick(brickSize, new Color("rgb(255,0,0)"));
    // Position opponent
    const playerPos = 50;
    this.player.position.set(playerPos, 0, 0);
    this.playerDefenseTop.position.set(playerPos, 10, 0);
    this.playerDefenseBottom.position.set(playerPos, -10, 0);
    this.playerDefenseLeft.position.set(playerPos, 0, 10);
    this.playerDefenseRight.position.set(playerPos, 0, -10);
    // Add to scene
    this.scene.add(this.player);
    this.scene.add(this.playerDefenseTop);
    this.scene.add(this.playerDefenseBottom);
    this.scene.add(this.playerDefenseLeft);
    this.scene.add(this.playerDefenseRight);

    // Opponent
    this.opponent = new Sphere(10, new Color("rgb(255,0,255)"));
    this.opponentDefenseTop = new Brick(brickSize, new Color("rgb(255,0,0)"));
    this.opponentDefenseBottom = new Brick(
      brickSize,
      new Color("rgb(255,0,0)"),
    );
    this.opponentDefenseRight = new Brick(brickSize, new Color("rgb(255,0,0)"));
    this.opponentDefenseLeft = new Brick(brickSize, new Color("rgb(255,0,0)"));
    // Position opponent
    const opponentPos = -50;
    this.opponent.position.set(opponentPos, 0, 0);
    this.opponentDefenseTop.position.set(opponentPos, 10, 0);
    this.opponentDefenseTop.position.set(opponentPos, 10, 0);
    this.opponentDefenseBottom.position.set(opponentPos, -10, 0);
    this.opponentDefenseLeft.position.set(opponentPos, 0, 10);
    this.opponentDefenseRight.position.set(opponentPos, 0, -10);
    // Add to scene
    this.scene.add(this.opponent);
    this.scene.add(this.opponentDefenseTop);
    this.scene.add(this.opponentDefenseBottom);
    this.scene.add(this.opponentDefenseLeft);
    this.scene.add(this.opponentDefenseRight);

    // Add torus for line direction
    const xTorus = new Torus(50, new Color("rgb(255,255,0)"));
    const yTorus = new Torus(50, new Color("rgb(255,255,0)"));
    this.scene.add(xTorus);
    yTorus.rotateX(0.5 * Math.PI);
    this.scene.add(yTorus);

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
