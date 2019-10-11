import { Color, Mesh, MeshLambertMaterial, TorusGeometry } from "three";

export class Torus extends Mesh {
  constructor(size: number, color: Color) {
    super();
    this.geometry = new TorusGeometry(size, 1, 16, 100);
    this.material = new MeshLambertMaterial({ color: 0xffff00 });
  }
}
