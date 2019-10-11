
import { Color, Mesh, MeshLambertMaterial, SphereGeometry } from "three";

export class Sphere extends Mesh {
  constructor(size: number, color: Color) {
    super();
    this.geometry = new SphereGeometry(size, 32, 32);
    this.material = new MeshLambertMaterial({ color });
  }
}
