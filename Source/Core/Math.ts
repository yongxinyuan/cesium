import MersenneTwister from "../ThirdParty/mersenne-twister.js";
import Check from "./Check";
import defaultValue from "./defaultValue";
import defined from "./defined";
import DeveloperError from "./DeveloperError";

/**
 * Math functions.
 *
 * @exports CesiumMath
 * @alias Math
 */
class CesiumMath {
  /**
   * 0.1
   * @type {Number}
   * @constant
   */
  static get EPSILON1(): number {
    return 0.1;
  }

  /**
   * 0.01
   * @type {Number}
   * @constant
   */
  static get EPSILON2(): number {
    return 0.01;
  }

  /**
   * 0.001
   * @type {Number}
   * @constant
   */
  static get EPSILON3(): number {
    return 0.001;
  }

  /**
   * 0.0001
   * @type {Number}
   * @constant
   */
  static get EPSILON4(): number {
    return 0.0001;
  }

  /**
   * 0.00001
   * @type {Number}
   * @constant
   */
  static get EPSILON5(): number {
    return 0.00001;
  }

  static get EPSILON6(): number {
    return 0.000001;
  }
}
