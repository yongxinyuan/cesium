import MersenneTwister from "@/ThirdParty/mersenne-twister.js";
import Check from "@/Core/Check";
import defaultValue from "@/Core/defaultValue";
import defined from "@/Core/defined";
import DeveloperError from "@/Core/DeveloperError";

const factorials = [1];

let randomNumberGenerator = new MersenneTwister();

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

  /**
   * 0.000001
   * @type {Number}
   * @constant
   */
  static get EPSILON6(): number {
    return 0.000001;
  }

  /**
   * 0.0000001
   * @type {Number}
   * @constant
   */
  static get EPSILON7(): number {
    return 0.0000001;
  }

  /**
   * 0.00000001
   * @type {Number}
   * @constant
   */
  static get EPSILON8(): number {
    return 0.00000001;
  }

  /**
   * 0.000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON9(): number {
    return 0.000000001;
  }

  /**
   * 0.0000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON10(): number {
    return 0.0000000001;
  }

  /**
   * 0.00000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON11(): number {
    return 0.00000000001;
  }

  /**
   * 0.000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON12(): number {
    return 0.000000000001;
  }

  /**
   * 0.0000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON13(): number {
    return 0.0000000000001;
  }

  /**
   * 0.00000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON14(): number {
    return 0.00000000000001;
  }

  /**
   * 0.000000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON15(): number {
    return 0.000000000000001;
  }

  /**
   * 0.0000000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON16(): number {
    return 0.0000000000000001;
  }

  /**
   * 0.00000000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON17(): number {
    return 0.00000000000000001;
  }

  /**
   * 0.000000000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON18(): number {
    return 0.000000000000000001;
  }

  /**
   * 0.0000000000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON19(): number {
    return 0.0000000000000000001;
  }

  /**
   * 0.00000000000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON20(): number {
    return 0.00000000000000000001;
  }

  /**
   * 0.000000000000000000001
   * @type {Number}
   * @constant
   */
  static get EPSILON21(): number {
    return 0.000000000000000000001;
  }

  /**
   * The gravitational parameter of the Earth in meters cubed
   * per second squared as defined by the WGS84 model: 3.986004418e14
   *
   * 地球的重力参数，单位是立方米/秒方，由WGS84模型定义
   *
   * @type {Number}
   * @constant
   */
  static get GRAVITATIONALPARAMETER(): number {
    return 3.986004418e14;
  }

  /**
   * Radius of the sun in meters: 6.955e8
   *
   * 太阳的半径，单位是米
   *
   * @type {Number}
   * @constant
   */
  static get SOLAR_RADIUS(): number {
    return 6.955e8;
  }

  /**
   * The mean radius of the moon, according to the "Report of the IAU/IAG Working Group on
   * Cartographic Coordinates and Rotational Elements of the Planets and satellites: 2000",
   * Celestial Mechanics 82: 83-110, 2002.
   *
   * 月球的平均半径
   *
   * @type {Number}
   * @constant
   */
  static get LUNAR_RADIUS(): number {
    return 1737400.0;
  }

  /**
   * 64 * 1024
   * @type {Number}
   * @constant
   */
  static get SIXTY_FOUR_KILOBYTES(): number {
    return 64 * 1024;
  }

  /**
   * 4 * 1024 * 1024 * 1024
   * @type {Number}
   * @constant
   */
  static get FOUR_GIGABYTES(): number {
    return 4 * 1024 * 1024 * 1024;
  }

  /**
   * Returns the sign of the value; 1 if the value is positive, -1 if the value is
   * negative, or 0 if the value is 0.
   *
   * @function
   * @param {Number} value The value to return the sign of.
   * @returns {Number} The sign of value.
   */
  // eslint-disable-next-line es/no-math-sign
  static sign(value: unknown): number {
    if (Math.sign) {
      return Math.sign(value as number);
    }

    value = +Number(value); // coerce to number

    if (value === 0 || value !== value) {
      // zero or NaN
      return value as number;
    }
    return (value as number) > 0 ? 1 : -1;
  }

  /**
   * Returns 1.0 if the given value is positive or zero, and -1.0 if it is negative.
   * This is similar to {@link CesiumMath#sign} except that returns 1.0 instead of
   * 0.0 when the input value is 0.0.
   * @param {Number} value The value to return the sign of.
   * @returns {Number} The sign of value.
   */
  static signNotZero(value: number): number {
    return value < 0.0 ? -1.0 : 1.0;
  }

  /**
   * Converts a scalar value in the range [-1.0, 1.0] to a SNORM in the range [0, rangeMaximum]
   * @param {Number} value The scalar value in the range [-1.0, 1.0]
   * @param {Number} [rangeMaximum=255] The maximum value in the mapped range, 255 by default.
   * @returns {Number} A SNORM value, where 0 maps to -1.0 and rangeMaximum maps to 1.0.
   *
   * @see CesiumMath.fromSNorm
   */
  static toSNorm(value: number, rangeMaximum: number): number {
    rangeMaximum = defaultValue(rangeMaximum, 255);
    return Math.round(
      (CesiumMath.clamp(value, -1.0, 1.0) * 0.5 + 0.5) * rangeMaximum
    );
  }

  /**
   * Converts a SNORM value in the range [0, rangeMaximum] to a scalar in the range [-1.0, 1.0].
   * @param {Number} value SNORM value in the range [0, rangeMaximum]
   * @param {Number} [rangeMaximum=255] The maximum value in the SNORM range, 255 by default.
   * @returns {Number} Scalar in the range [-1.0, 1.0].
   *
   * @see CesiumMath.toSNorm
   */
  static fromSNorm(value: number, rangeMaximum: number): number {
    rangeMaximum = defaultValue(rangeMaximum, 255);
    return (
      (CesiumMath.clamp(value, 0.0, rangeMaximum) / rangeMaximum) * 2.0 - 1.0
    );
  }

  /**
   * Converts a scalar value in the range [rangeMinimum, rangeMaximum] to a scalar in the range [0.0, 1.0]
   * @param {Number} value The scalar value in the range [rangeMinimum, rangeMaximum]
   * @param {Number} rangeMinimum The minimum value in the mapped range.
   * @param {Number} rangeMaximum The maximum value in the mapped range.
   * @returns {Number} A scalar value, where rangeMinimum maps to 0.0 and rangeMaximum maps to 1.0.
   */
  static normalize(
    value: number,
    rangeMinimum: number,
    rangeMaximum: number
  ): number {
    rangeMaximum = Math.max(rangeMaximum - rangeMinimum, 0.0);
    return rangeMaximum === 0.0
      ? 0.0
      : CesiumMath.clamp((value - rangeMinimum) / rangeMaximum, 0.0, 1.0);
  }

  /**
   * Returns the hyperbolic sine of a number.
   * The hyperbolic sine of <em>value</em> is defined to be
   * (<em>e<sup>x</sup>&nbsp;-&nbsp;e<sup>-x</sup></em>)/2.0
   * where <i>e</i> is Euler's number, approximately 2.71828183.
   *
   * <p>Special cases:
   *   <ul>
   *     <li>If the argument is NaN, then the result is NaN.</li>
   *
   *     <li>If the argument is infinite, then the result is an infinity
   *     with the same sign as the argument.</li>
   *
   *     <li>If the argument is zero, then the result is a zero with the
   *     same sign as the argument.</li>
   *   </ul>
   *</p>
   *
   * @function
   * @param {Number} value The number whose hyperbolic sine is to be returned.
   * @returns {Number} The hyperbolic sine of <code>value</code>.
   */
  // eslint-disable-next-line es/no-math-sinh
  static sinh(value: number): number {
    return Math.sinh
      ? Math.sinh(value)
      : (Math.exp(value) - Math.exp(-value)) / 2.0;
  }

  /**
   * Returns the hyperbolic cosine of a number.
   * The hyperbolic cosine of <strong>value</strong> is defined to be
   * (<em>e<sup>x</sup>&nbsp;+&nbsp;e<sup>-x</sup></em>)/2.0
   * where <i>e</i> is Euler's number, approximately 2.71828183.
   *
   * <p>Special cases:
   *   <ul>
   *     <li>If the argument is NaN, then the result is NaN.</li>
   *
   *     <li>If the argument is infinite, then the result is positive infinity.</li>
   *
   *     <li>If the argument is zero, then the result is 1.0.</li>
   *   </ul>
   *</p>
   *
   * @function
   * @param {Number} value The number whose hyperbolic cosine is to be returned.
   * @returns {Number} The hyperbolic cosine of <code>value</code>.
   */
  // eslint-disable-next-line es/no-math-cosh
  static cosh(value: number): number {
    return Math.cosh
      ? Math.cosh(value)
      : (Math.exp(value) + Math.exp(-value)) / 2.0;
  }

  /**
   * Computes the linear interpolation of two values.
   *
   * @param {Number} p The start value to interpolate.
   * @param {Number} q The end value to interpolate.
   * @param {Number} time The time of interpolation generally in the range <code>[0.0, 1.0]</code>.
   * @returns {Number} The linearly interpolated value.
   *
   * @example
   * var n = Cesium.Math.lerp(0.0, 2.0, 0.5); // returns 1.0
   */
  static lerp(p: number, q: number, time: number): number {
    return (1.0 - time) * p + time * q;
  }

  /**
   * pi
   *
   * @type {Number}
   * @constant
   */
  static get PI(): number {
    return Math.PI;
  }

  /**
   * 1/pi
   *
   * @type {Number}
   * @constant
   */
  static get ONE_OVER_PI(): number {
    return 1.0 / Math.PI;
  }

  /**
   * pi/2
   *
   * @type {Number}
   * @constant
   */
  static get PI_OVER_TWO(): number {
    return Math.PI / 2.0;
  }

  /**
   * pi/3
   *
   * @type {Number}
   * @constant
   */
  static get PI_OVER_THREE(): number {
    return Math.PI / 3.0;
  }

  /**
   * pi/4
   *
   * @type {Number}
   * @constant
   */
  static get PI_OVER_FOUR(): number {
    return Math.PI / 4.0;
  }

  /**
   * pi/6
   *
   * @type {Number}
   * @constant
   */
  static get PI_OVER_SIX(): number {
    return Math.PI / 6.0;
  }

  /**
   * 3pi/2
   *
   * @type {Number}
   * @constant
   */
  static get THREE_PI_OVER_TWO(): number {
    return (3.0 * Math.PI) / 2.0;
  }

  /**
   * 2pi
   *
   * @type {Number}
   * @constant
   */
  static get TWO_PI(): number {
    return 2.0 * Math.PI;
  }

  /**
   * 1/2pi
   *
   * @type {Number}
   * @constant
   */
  static get ONE_OVER_TWO_PI(): number {
    return 1.0 / (2.0 * Math.PI);
  }

  /**
   * The number of radians in a degree.
   *
   * @type {Number}
   * @constant
   */
  static get RADIANS_PER_DEGREE(): number {
    return Math.PI / 180.0;
  }

  /**
   * The number of degrees in a radian.
   *
   * @type {Number}
   * @constant
   */
  static get DEGREES_PER_RADIAN(): number {
    return 180.0 / Math.PI;
  }

  /**
   * The number of radians in an arc second.
   *
   * @type {Number}
   * @constant
   */
  static get RADIANS_PER_ARCSECOND(): number {
    return CesiumMath.RADIANS_PER_DEGREE / 3600.0;
  }

  /**
   * Converts degrees to radians.
   * @param {Number} degrees The angle to convert in degrees.
   * @returns {Number} The corresponding angle in radians.
   */
  static toRadians(degrees: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(degrees)) {
      throw new DeveloperError("degrees is required.");
    }
    //>>includeEnd('debug');
    return degrees * CesiumMath.RADIANS_PER_DEGREE;
  }

  /**
   * Converts radians to degrees.
   * @param {Number} radians The angle to convert in radians.
   * @returns {Number} The corresponding angle in degrees.
   */
  static toDegrees(radians: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(radians)) {
      throw new DeveloperError("radians is required.");
    }
    //>>includeEnd('debug');
    return radians * CesiumMath.DEGREES_PER_RADIAN;
  }

  /**
   * Converts a longitude value, in radians, to the range [<code>-Math.PI</code>, <code>Math.PI</code>).
   *
   * @param {Number} angle The longitude value, in radians, to convert to the range [<code>-Math.PI</code>, <code>Math.PI</code>).
   * @returns {Number} The equivalent longitude value in the range [<code>-Math.PI</code>, <code>Math.PI</code>).
   *
   * @example
   * // Convert 270 degrees to -90 degrees longitude
   * var longitude = Cesium.Math.convertLongitudeRange(Cesium.Math.toRadians(270.0));
   */
  static convertLongitudeRange(angle: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(angle)) {
      throw new DeveloperError("angle is required.");
    }
    //>>includeEnd('debug');
    var twoPi = CesiumMath.TWO_PI;

    var simplified = angle - Math.floor(angle / twoPi) * twoPi;

    if (simplified < -Math.PI) {
      return simplified + twoPi;
    }
    if (simplified >= Math.PI) {
      return simplified - twoPi;
    }

    return simplified;
  }

  /**
   * Convenience function that clamps a latitude value, in radians, to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
   * Useful for sanitizing data before use in objects requiring correct range.
   *
   * @param {Number} angle The latitude value, in radians, to clamp to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
   * @returns {Number} The latitude value clamped to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
   *
   * @example
   * // Clamp 108 degrees latitude to 90 degrees latitude
   * var latitude = Cesium.Math.clampToLatitudeRange(Cesium.Math.toRadians(108.0));
   */
  static clampToLatitudeRange(angle: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(angle)) {
      throw new DeveloperError("angle is required.");
    }
    //>>includeEnd('debug');

    return CesiumMath.clamp(
      angle,
      -1 * CesiumMath.PI_OVER_TWO,
      CesiumMath.PI_OVER_TWO
    );
  }

  /**
   * Produces an angle in the range -Pi <= angle <= Pi which is equivalent to the provided angle.
   *
   * @param {Number} angle in radians
   * @returns {Number} The angle in the range [<code>-CesiumMath.PI</code>, <code>CesiumMath.PI</code>].
   */
  static negativePiToPi(angle: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(angle)) {
      throw new DeveloperError("angle is required.");
    }
    //>>includeEnd('debug');
    if (angle >= -CesiumMath.PI && angle <= CesiumMath.PI) {
      // Early exit if the input is already inside the range. This avoids
      // unnecessary math which could introduce floating point error.
      return angle;
    }
    return CesiumMath.zeroToTwoPi(angle + CesiumMath.PI) - CesiumMath.PI;
  }

  /**
   * Produces an angle in the range 0 <= angle <= 2Pi which is equivalent to the provided angle.
   *
   * @param {Number} angle in radians
   * @returns {Number} The angle in the range [0, <code>CesiumMath.TWO_PI</code>].
   */
  static zeroToTwoPi(angle: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(angle)) {
      throw new DeveloperError("angle is required.");
    }
    //>>includeEnd('debug');
    if (angle >= 0 && angle <= CesiumMath.TWO_PI) {
      // Early exit if the input is already inside the range. This avoids
      // unnecessary math which could introduce floating point error.
      return angle;
    }
    var mod = CesiumMath.mod(angle, CesiumMath.TWO_PI);
    if (
      Math.abs(mod) < CesiumMath.EPSILON14 &&
      Math.abs(angle) > CesiumMath.EPSILON14
    ) {
      return CesiumMath.TWO_PI;
    }
    return mod;
  }

  /**
   * The modulo operation that also works for negative dividends.
   *
   * @param {Number} m The dividend.
   * @param {Number} n The divisor.
   * @returns {Number} The remainder.
   */
  static mod(m: number, n: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(m)) {
      throw new DeveloperError("m is required.");
    }
    if (!defined(n)) {
      throw new DeveloperError("n is required.");
    }
    if (n === 0.0) {
      throw new DeveloperError("divisor cannot be 0.");
    }
    //>>includeEnd('debug');
    if (
      CesiumMath.sign(m) === CesiumMath.sign(n) &&
      Math.abs(m) < Math.abs(n)
    ) {
      // Early exit if the input does not need to be modded. This avoids
      // unnecessary math which could introduce floating point error.
      return m;
    }

    return ((m % n) + n) % n;
  }

  /**
   * Determines if two values are equal using an absolute or relative tolerance test. This is useful
   * to avoid problems due to roundoff error when comparing floating-point values directly. The values are
   * first compared using an absolute tolerance test. If that fails, a relative tolerance test is performed.
   * Use this test if you are unsure of the magnitudes of left and right.
   *
   * @param {Number} left The first value to compare.
   * @param {Number} right The other value to compare.
   * @param {Number} [relativeEpsilon=0] The maximum inclusive delta between <code>left</code> and <code>right</code> for the relative tolerance test.
   * @param {Number} [absoluteEpsilon=relativeEpsilon] The maximum inclusive delta between <code>left</code> and <code>right</code> for the absolute tolerance test.
   * @returns {Boolean} <code>true</code> if the values are equal within the epsilon; otherwise, <code>false</code>.
   *
   * @example
   * var a = Cesium.Math.equalsEpsilon(0.0, 0.01, Cesium.Math.EPSILON2); // true
   * var b = Cesium.Math.equalsEpsilon(0.0, 0.1, Cesium.Math.EPSILON2);  // false
   * var c = Cesium.Math.equalsEpsilon(3699175.1634344, 3699175.2, Cesium.Math.EPSILON7); // true
   * var d = Cesium.Math.equalsEpsilon(3699175.1634344, 3699175.2, Cesium.Math.EPSILON9); // false
   */
  static equalsEpsilon(
    left: number,
    right: number,
    relativeEpsilon: number,
    absoluteEpsilon: number
  ): boolean {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(left)) {
      throw new DeveloperError("left is required.");
    }
    if (!defined(right)) {
      throw new DeveloperError("right is required.");
    }
    //>>includeEnd('debug');

    relativeEpsilon = defaultValue(relativeEpsilon, 0.0);
    absoluteEpsilon = defaultValue(absoluteEpsilon, relativeEpsilon);
    var absDiff = Math.abs(left - right);
    return (
      absDiff <= absoluteEpsilon ||
      absDiff <= relativeEpsilon * Math.max(Math.abs(left), Math.abs(right))
    );
  }

  /**
   * Determines if the left value is less than the right value. If the two values are within
   * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns false.
   *
   * @param {Number} left The first number to compare.
   * @param {Number} right The second number to compare.
   * @param {Number} absoluteEpsilon The absolute epsilon to use in comparison.
   * @returns {Boolean} <code>true</code> if <code>left</code> is less than <code>right</code> by more than
   *          <code>absoluteEpsilon<code>. <code>false</code> if <code>left</code> is greater or if the two
   *          values are nearly equal.
   */
  static lessThan(
    left: number,
    right: number,
    absoluteEpsilon: number
  ): boolean {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(left)) {
      throw new DeveloperError("first is required.");
    }
    if (!defined(right)) {
      throw new DeveloperError("second is required.");
    }
    if (!defined(absoluteEpsilon)) {
      throw new DeveloperError("absoluteEpsilon is required.");
    }
    //>>includeEnd('debug');
    return left - right < -absoluteEpsilon;
  }

  /**
   * Determines if the left value is less than or equal to the right value. If the two values are within
   * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns true.
   *
   * @param {Number} left The first number to compare.
   * @param {Number} right The second number to compare.
   * @param {Number} absoluteEpsilon The absolute epsilon to use in comparison.
   * @returns {Boolean} <code>true</code> if <code>left</code> is less than <code>right</code> or if the
   *          the values are nearly equal.
   */
  static lessThanOrEquals(
    left: number,
    right: number,
    absoluteEpsilon: number
  ): boolean {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(left)) {
      throw new DeveloperError("first is required.");
    }
    if (!defined(right)) {
      throw new DeveloperError("second is required.");
    }
    if (!defined(absoluteEpsilon)) {
      throw new DeveloperError("absoluteEpsilon is required.");
    }
    //>>includeEnd('debug');
    return left - right < absoluteEpsilon;
  }

  /**
   * Determines if the left value is greater the right value. If the two values are within
   * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns false.
   *
   * @param {Number} left The first number to compare.
   * @param {Number} right The second number to compare.
   * @param {Number} absoluteEpsilon The absolute epsilon to use in comparison.
   * @returns {Boolean} <code>true</code> if <code>left</code> is greater than <code>right</code> by more than
   *          <code>absoluteEpsilon<code>. <code>false</code> if <code>left</code> is less or if the two
   *          values are nearly equal.
   */
  static greaterThan(
    left: number,
    right: number,
    absoluteEpsilon: number
  ): boolean {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(left)) {
      throw new DeveloperError("first is required.");
    }
    if (!defined(right)) {
      throw new DeveloperError("second is required.");
    }
    if (!defined(absoluteEpsilon)) {
      throw new DeveloperError("absoluteEpsilon is required.");
    }
    //>>includeEnd('debug');
    return left - right > absoluteEpsilon;
  }

  /**
   * Determines if the left value is greater than or equal to the right value. If the two values are within
   * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns true.
   *
   * @param {Number} left The first number to compare.
   * @param {Number} right The second number to compare.
   * @param {Number} absoluteEpsilon The absolute epsilon to use in comparison.
   * @returns {Boolean} <code>true</code> if <code>left</code> is greater than <code>right</code> or if the
   *          the values are nearly equal.
   */
  static greaterThanOrEquals(
    left: number,
    right: number,
    absoluteEpsilon: number
  ): boolean {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(left)) {
      throw new DeveloperError("first is required.");
    }
    if (!defined(right)) {
      throw new DeveloperError("second is required.");
    }
    if (!defined(absoluteEpsilon)) {
      throw new DeveloperError("absoluteEpsilon is required.");
    }
    //>>includeEnd('debug');
    return left - right > -absoluteEpsilon;
  }

  /**
   * Computes the factorial of the provided number.
   *
   * @param {Number} n The number whose factorial is to be computed.
   * @returns {Number} The factorial of the provided number or undefined if the number is less than 0.
   *
   * @exception {DeveloperError} A number greater than or equal to 0 is required.
   *
   *
   * @example
   * //Compute 7!, which is equal to 5040
   * var computedFactorial = Cesium.Math.factorial(7);
   *
   * @see {@link http://en.wikipedia.org/wiki/Factorial|Factorial on Wikipedia}
   */
  static factorial(n: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (typeof n !== "number" || n < 0) {
      throw new DeveloperError(
        "A number greater than or equal to 0 is required."
      );
    }
    //>>includeEnd('debug');

    var length = factorials.length;
    if (n >= length) {
      var sum = factorials[length - 1];
      for (var i = length; i <= n; i++) {
        var next = sum * i;
        factorials.push(next);
        sum = next;
      }
    }
    return factorials[n];
  }

  /**
   * Increments a number with a wrapping to a minimum value if the number exceeds the maximum value.
   *
   * @param {Number} [n] The number to be incremented.
   * @param {Number} [maximumValue] The maximum incremented value before rolling over to the minimum value.
   * @param {Number} [minimumValue=0.0] The number reset to after the maximum value has been exceeded.
   * @returns {Number} The incremented number.
   *
   * @exception {DeveloperError} Maximum value must be greater than minimum value.
   *
   * @example
   * var n = Cesium.Math.incrementWrap(5, 10, 0); // returns 6
   * var n = Cesium.Math.incrementWrap(10, 10, 0); // returns 0
   */
  static incrementWrap(n: number, maximumValue: number, minimumValue: number) {
    minimumValue = defaultValue(minimumValue, 0.0);

    //>>includeStart('debug', pragmas.debug);
    if (!defined(n)) {
      throw new DeveloperError("n is required.");
    }
    if (maximumValue <= minimumValue) {
      throw new DeveloperError(
        "maximumValue must be greater than minimumValue."
      );
    }
    //>>includeEnd('debug');

    ++n;
    if (n > maximumValue) {
      n = minimumValue;
    }
    return n;
  }

  /**
   * Determines if a non-negative integer is a power of two.
   * The maximum allowed input is (2^32)-1 due to 32-bit bitwise operator limitation in Javascript.
   *
   * @param {Number} n The integer to test in the range [0, (2^32)-1].
   * @returns {Boolean} <code>true</code> if the number if a power of two; otherwise, <code>false</code>.
   *
   * @exception {DeveloperError} A number between 0 and (2^32)-1 is required.
   *
   * @example
   * var t = Cesium.Math.isPowerOfTwo(16); // true
   * var f = Cesium.Math.isPowerOfTwo(20); // false
   */
  static isPowerOfTwo(n: number): boolean {
    //>>includeStart('debug', pragmas.debug);
    if (typeof n !== "number" || n < 0 || n > 4294967295) {
      throw new DeveloperError("A number between 0 and (2^32)-1 is required.");
    }
    //>>includeEnd('debug');

    return n !== 0 && (n & (n - 1)) === 0;
  }

  /**
   * Computes the next power-of-two integer greater than or equal to the provided non-negative integer.
   * The maximum allowed input is 2^31 due to 32-bit bitwise operator limitation in Javascript.
   *
   * @param {Number} n The integer to test in the range [0, 2^31].
   * @returns {Number} The next power-of-two integer.
   *
   * @exception {DeveloperError} A number between 0 and 2^31 is required.
   *
   * @example
   * var n = Cesium.Math.nextPowerOfTwo(29); // 32
   * var m = Cesium.Math.nextPowerOfTwo(32); // 32
   */
  static nextPowerOfTwo(n: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (typeof n !== "number" || n < 0 || n > 2147483648) {
      throw new DeveloperError("A number between 0 and 2^31 is required.");
    }
    //>>includeEnd('debug');

    // From http://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
    --n;
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    ++n;

    return n;
  }

  /**
   * Computes the previous power-of-two integer less than or equal to the provided non-negative integer.
   * The maximum allowed input is (2^32)-1 due to 32-bit bitwise operator limitation in Javascript.
   *
   * @param {Number} n The integer to test in the range [0, (2^32)-1].
   * @returns {Number} The previous power-of-two integer.
   *
   * @exception {DeveloperError} A number between 0 and (2^32)-1 is required.
   *
   * @example
   * var n = Cesium.Math.previousPowerOfTwo(29); // 16
   * var m = Cesium.Math.previousPowerOfTwo(32); // 32
   */
  static previousPowerOfTwo(n: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (typeof n !== "number" || n < 0 || n > 4294967295) {
      throw new DeveloperError("A number between 0 and (2^32)-1 is required.");
    }
    //>>includeEnd('debug');

    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    n |= n >> 32;

    // The previous bitwise operations implicitly convert to signed 32-bit. Use `>>>` to convert to unsigned
    n = (n >>> 0) - (n >>> 1);

    return n;
  }

  /**
   * Constraint a value to lie between two values.
   *
   * @param {Number} value The value to constrain.
   * @param {Number} min The minimum value.
   * @param {Number} max The maximum value.
   * @returns {Number} The value clamped so that min <= value <= max.
   */
  static clamp(value: number, min: number, max: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(value)) {
      throw new DeveloperError("value is required");
    }
    if (!defined(min)) {
      throw new DeveloperError("min is required.");
    }
    if (!defined(max)) {
      throw new DeveloperError("max is required.");
    }
    //>>includeEnd('debug');
    return value < min ? min : value > max ? max : value;
  }

  /**
   * Sets the seed used by the random number generator
   * in {@link CesiumMath#nextRandomNumber}.
   *
   * @param {Number} seed An integer used as the seed.
   */
  static setRandomNumberSeed(seed: number): void {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(seed)) {
      throw new DeveloperError("seed is required.");
    }
    //>>includeEnd('debug');

    randomNumberGenerator = new MersenneTwister(seed);
  }

  /**
   * Generates a random floating point number in the range of [0.0, 1.0)
   * using a Mersenne twister.
   *
   * @returns {Number} A random number in the range of [0.0, 1.0).
   *
   * @see CesiumMath.setRandomNumberSeed
   * @see {@link http://en.wikipedia.org/wiki/Mersenne_twister|Mersenne twister on Wikipedia}
   */
  static nextRandomNumber(): number {
    return randomNumberGenerator.random();
  }

  /**
   * Generates a random number between two numbers.
   *
   * @param {Number} min The minimum value.
   * @param {Number} max The maximum value.
   * @returns {Number} A random number between the min and max.
   */
  static randomBetween(min: number, max: number): number {
    return CesiumMath.nextRandomNumber() * (max - min) + min;
  }

  /**
   * Computes <code>Math.acos(value)</code>, but first clamps <code>value</code> to the range [-1.0, 1.0]
   * so that the function will never return NaN.
   *
   * @param {Number} value The value for which to compute acos.
   * @returns {Number} The acos of the value if the value is in the range [-1.0, 1.0], or the acos of -1.0 or 1.0,
   *          whichever is closer, if the value is outside the range.
   */
  static acosClamped(value: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(value)) {
      throw new DeveloperError("value is required.");
    }
    //>>includeEnd('debug');
    return Math.acos(CesiumMath.clamp(value, -1.0, 1.0));
  }

  /**
   * Computes <code>Math.asin(value)</code>, but first clamps <code>value</code> to the range [-1.0, 1.0]
   * so that the function will never return NaN.
   *
   * @param {Number} value The value for which to compute asin.
   * @returns {Number} The asin of the value if the value is in the range [-1.0, 1.0], or the asin of -1.0 or 1.0,
   *          whichever is closer, if the value is outside the range.
   */
  static asinClamped(value: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(value)) {
      throw new DeveloperError("value is required.");
    }
    //>>includeEnd('debug');
    return Math.asin(CesiumMath.clamp(value, -1.0, 1.0));
  }

  /**
   * Finds the chord length between two points given the circle's radius and the angle between the points.
   *
   * @param {Number} angle The angle between the two points.
   * @param {Number} radius The radius of the circle.
   * @returns {Number} The chord length.
   */
  static chordLength(angle: number, radius: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(angle)) {
      throw new DeveloperError("angle is required.");
    }
    if (!defined(radius)) {
      throw new DeveloperError("radius is required.");
    }
    //>>includeEnd('debug');
    return 2.0 * radius * Math.sin(angle * 0.5);
  }

  /**
   * Finds the logarithm of a number to a base.
   *
   * @param {Number} number The number.
   * @param {Number} base The base.
   * @returns {Number} The result.
   */
  static logBase(number: number, base: number): number {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(number)) {
      throw new DeveloperError("number is required.");
    }
    if (!defined(base)) {
      throw new DeveloperError("base is required.");
    }
    //>>includeEnd('debug');
    return Math.log(number) / Math.log(base);
  }

  /**
   * Finds the cube root of a number.
   * Returns NaN if <code>number</code> is not provided.
   *
   * @function
   * @param {Number} [number] The number.
   * @returns {Number} The result.
   */
  // eslint-disable-next-line es/no-math-cbrt
  static cbrt(number: number): number {
    if (Math.cbrt) {
      return Math.cbrt(number);
    }

    var result = Math.pow(Math.abs(number), 1.0 / 3.0);
    return number < 0.0 ? -result : result;
  }

  /**
   * Finds the base 2 logarithm of a number.
   *
   * @function
   * @param {Number} number The number.
   * @returns {Number} The result.
   */
  // eslint-disable-next-line es/no-math-log2
  static log2(number: number): number {
    return Math.log2 ? Math.log2(number) : Math.log(number) * Math.LOG2E;
  }

  /**
   * @private
   */
  static fog(distanceToCamera: number, density: number): number {
    var scalar = distanceToCamera * density;
    return 1.0 - Math.exp(-(scalar * scalar));
  }

  /**
   * Computes a fast approximation of Atan for input in the range [-1, 1].
   *
   * Based on Michal Drobot's approximation from ShaderFastLibs,
   * which in turn is based on "Efficient approximations for the arctangent function,"
   * Rajan, S. Sichun Wang Inkol, R. Joyal, A., May 2006.
   * Adapted from ShaderFastLibs under MIT License.
   *
   * @param {Number} x An input number in the range [-1, 1]
   * @returns {Number} An approximation of atan(x)
   */
  static fastApproximateAtan(x: number): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.number("x", x);
    //>>includeEnd('debug');

    return x * (-0.1784 * Math.abs(x) - 0.0663 * x * x + 1.0301);
  }

  /**
   * Computes a fast approximation of Atan2(x, y) for arbitrary input scalars.
   *
   * Range reduction math based on nvidia's cg reference implementation: http://developer.download.nvidia.com/cg/atan2.html
   *
   * @param {Number} x An input number that isn't zero if y is zero.
   * @param {Number} y An input number that isn't zero if x is zero.
   * @returns {Number} An approximation of atan2(x, y)
   */
  static fastApproximateAtan2(x: number, y: number): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.number("x", x);
    Check.typeOf.number("y", y);
    //>>includeEnd('debug');

    // atan approximations are usually only reliable over [-1, 1]
    // So reduce the range by flipping whether x or y is on top based on which is bigger.
    var opposite;
    var adjacent;
    var t = Math.abs(x); // t used as swap and atan result.
    opposite = Math.abs(y);
    adjacent = Math.max(t, opposite);
    opposite = Math.min(t, opposite);

    var oppositeOverAdjacent = opposite / adjacent;
    //>>includeStart('debug', pragmas.debug);
    if (isNaN(oppositeOverAdjacent)) {
      throw new DeveloperError("either x or y must be nonzero");
    }
    //>>includeEnd('debug');
    t = CesiumMath.fastApproximateAtan(oppositeOverAdjacent);

    // Undo range reduction
    t = Math.abs(y) > Math.abs(x) ? CesiumMath.PI_OVER_TWO - t : t;
    t = x < 0.0 ? CesiumMath.PI - t : t;
    t = y < 0.0 ? -t : t;
    return t;
  }
}

export default CesiumMath;
