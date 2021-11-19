import Check from "@/Core/Check";
import defaultValue from "@/Core/defaultValue";
import defined from "@/Core/defined";
import DeveloperError from "@/Core/DeveloperError";
import CesiumMath from "@/Core/Math";

/**
 * A 3D Cartesian point.
 * @alias Cartesian3
 * @constructor
 *
 * @param {Number} [x=0.0] The X component.
 * @param {Number} [y=0.0] The Y component.
 * @param {Number} [z=0.0] The Z component.
 *
 * @see Cartesian2
 * @see Cartesian4
 * @see Packable
 */
class Cartesian3 {
  /**
   * The X component.
   * @type {Number}
   * @default 0.0
   */
  x: number;
  /**
   * The Y component.
   * @type {Number}
   * @default 0.0
   */
  y: number;
  /**
   * The Z component.
   * @type {Number}
   * @default 0.0
   */
  z: number;

  constructor(x?: number, y?: number, z?: number) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
    this.z = defaultValue(z, 0.0);
  }
}

export default Cartesian3;
