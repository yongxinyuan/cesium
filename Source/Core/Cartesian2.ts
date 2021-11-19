import Check from "@/Core/Check";
import defaultValue from "@/Core/defaultValue";
import defined from "@/Core/defined";
import DeveloperError from "@/Core/DeveloperError";
import CesiumMath from "@/Core/Math";

/**
 * A 2D Cartesian point.
 * @alias Cartesian2
 * @constructor
 *
 * @param {Number} [x=0.0] The X component.
 * @param {Number} [y=0.0] The Y component.
 *
 * @see Cartesian3
 * @see Cartesian4
 * @see Packable
 */
class Cartesian2 {
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

  constructor(x?: number, y?: number) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
  }

  /**
   * Duplicates this Cartesian2 instance.
   *
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   */
  clone(result: Cartesian2): Cartesian2 | undefined {
    return Cartesian2.clone(this, result);
  }

  /**
   * Compares this Cartesian against the provided Cartesian componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartesian2} [right] The right hand side Cartesian.
   * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
   */
  equals(right: Cartesian2): boolean {
    return Cartesian2.equals(this, right);
  }

  /**
   * Compares this Cartesian against the provided Cartesian componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Cartesian2} [right] The right hand side Cartesian.
   * @param {Number} [relativeEpsilon=0] The relative epsilon tolerance to use for equality testing.
   * @param {Number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
   * @returns {Boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
   */
  equalsEpsilon(
    right: Cartesian2,
    relativeEpsilon: number,
    absoluteEpsilon: number
  ): boolean {
    return Cartesian2.equalsEpsilon(
      this,
      right,
      relativeEpsilon,
      absoluteEpsilon
    );
  }

  /**
   * Creates a string representing this Cartesian in the format '(x, y)'.
   *
   * @returns {String} A string representing the provided Cartesian in the format '(x, y)'.
   */
  toString(): string {
    return "(" + this.x + ", " + this.y + ")";
  }

  /**
   * Creates a Cartesian2 instance from x and y coordinates.
   *
   * @param {Number} x The x coordinate.
   * @param {Number} y The y coordinate.
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   */
  static fromElements(x: number, y: number, result: Cartesian2): Cartesian2 {
    if (!defined(result)) {
      return new Cartesian2(x, y);
    }

    result.x = x;
    result.y = y;
    return result;
  }

  /**
   * Duplicates a Cartesian2 instance.
   *
   * @param {Cartesian2} cartesian The Cartesian to duplicate.
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided. (Returns undefined if cartesian is undefined)
   */
  static clone(
    cartesian: Cartesian2,
    result: Cartesian2
  ): Cartesian2 | undefined {
    if (!defined(cartesian)) {
      return undefined;
    }
    if (!defined(result)) {
      return new Cartesian2(cartesian.x, cartesian.y);
    }

    result.x = cartesian.x;
    result.y = cartesian.y;
    return result;
  }

  /**
   * Creates a Cartesian2 instance from an existing Cartesian3.  This simply takes the
   * x and y properties of the Cartesian3 and drops z.
   * @function
   *
   * @param {Cartesian3} cartesian The Cartesian3 instance to create a Cartesian2 instance from.
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   */
  static fromCartesian3 = Cartesian2.clone;

  /**
   * Creates a Cartesian2 instance from an existing Cartesian4.  This simply takes the
   * x and y properties of the Cartesian4 and drops z and w.
   * @function
   *
   * @param {Cartesian4} cartesian The Cartesian4 instance to create a Cartesian2 instance from.
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   */
  static fromCartesian4 = Cartesian2.clone;

  /**
   * The number of elements used to pack the object into an array.
   * @type {Number}
   */
  static get packedLength(): number {
    return 2;
  }

  /**
   * Stores the provided instance into the provided array.
   *
   * @param {Cartesian2} value The value to pack.
   * @param {Number[]} array The array to pack into.
   * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {Number[]} The array that was packed into
   */
  static pack(
    value: Cartesian2,
    array: Array<number>,
    startingIndex: number
  ): Array<number> {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("value", value);
    Check.defined("array", array);
    //>>includeEnd('debug');

    startingIndex = defaultValue(startingIndex, 0);

    array[startingIndex++] = value.x;
    array[startingIndex] = value.y;

    return array;
  }

  /**
   * Retrieves an instance from a packed array.
   *
   * @param {Number[]} array The packed array.
   * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {Cartesian2} [result] The object into which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   */
  static unpack(
    array: Array<number>,
    startingIndex: number,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.defined("array", array);
    //>>includeEnd('debug');

    startingIndex = defaultValue(startingIndex, 0);

    if (!defined(result)) {
      result = new Cartesian2();
    }
    result.x = array[startingIndex++];
    result.y = array[startingIndex];
    return result;
  }

  /**
   * Flattens an array of Cartesian2s into and array of components.
   * @param {Cartesian2[]} array The array of cartesians to pack.
   * @param {Number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 2 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 2) elements.
   *
   * @returns {Number[]} The packed array.
   */
  static packArray(
    array: Array<Cartesian2>,
    result: Array<number>
  ): Array<number> {
    //>>includeStart('debug', pragmas.debug);
    Check.defined("array", array);
    //>>includeEnd('debug');

    var length = array.length;
    var resultLength = length * 2;
    if (!defined(result)) {
      result = new Array(resultLength);
    } else if (
      !Array.isArray(result) &&
      (result as ArrayLike<number>).length !== resultLength
    ) {
      throw new DeveloperError(
        "If result is a typed array, it must have exactly array.length * 2 elements"
      );
    } else if (result.length !== resultLength) {
      result.length = resultLength;
    }

    for (var i = 0; i < length; ++i) {
      Cartesian2.pack(array[i], result, i * 2);
    }
    return result;
  }

  /**
   * Unpacks an array of cartesian components into and array of Cartesian2s.
   *
   * @param {Number[]} array The array of components to unpack.
   * @param {Cartesian2[]} [result] The array onto which to store the result.
   * @returns {Cartesian2[]} The unpacked array.
   */
  static unpackArray(
    array: Array<number>,
    result: Array<Cartesian2>
  ): Array<Cartesian2> {
    //>>includeStart('debug', pragmas.debug);
    Check.defined("array", array);
    Check.typeOf.number.greaterThanOrEquals("array.length", array.length, 2);
    if (array.length % 2 !== 0) {
      throw new DeveloperError("array length must be a multiple of 2.");
    }
    //>>includeEnd('debug');

    var length = array.length;
    if (!defined(result)) {
      result = new Array(length / 2);
    } else {
      result.length = length / 2;
    }

    for (var i = 0; i < length; i += 2) {
      var index = i / 2;
      result[index] = Cartesian2.unpack(array, i, result[index]);
    }
    return result;
  }

  /**
   * Creates a Cartesian2 from two consecutive elements in an array.
   * @function
   *
   * @param {Number[]} array The array whose two consecutive elements correspond to the x and y components, respectively.
   * @param {Number} [startingIndex=0] The offset into the array of the first element, which corresponds to the x component.
   * @param {Cartesian2} [result] The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
   *
   * @example
   * // Create a Cartesian2 with (1.0, 2.0)
   * var v = [1.0, 2.0];
   * var p = Cesium.Cartesian2.fromArray(v);
   *
   * // Create a Cartesian2 with (1.0, 2.0) using an offset into an array
   * var v2 = [0.0, 0.0, 1.0, 2.0];
   * var p2 = Cesium.Cartesian2.fromArray(v2, 2);
   */
  static fromArray = Cartesian2.unpack;

  /**
   * Computes the value of the maximum component for the supplied Cartesian.
   *
   * @param {Cartesian2} cartesian The cartesian to use.
   * @returns {Number} The value of the maximum component.
   */
  static maximumComponent(cartesian: Cartesian2): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    //>>includeEnd('debug');

    return Math.max(cartesian.x, cartesian.y);
  }

  /**
   * Computes the value of the minimum component for the supplied Cartesian.
   *
   * @param {Cartesian2} cartesian The cartesian to use.
   * @returns {Number} The value of the minimum component.
   */
  static minimumComponent(cartesian: Cartesian2): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    //>>includeEnd('debug');

    return Math.min(cartesian.x, cartesian.y);
  }

  /**
   * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
   *
   * @param {Cartesian2} first A cartesian to compare.
   * @param {Cartesian2} second A cartesian to compare.
   * @param {Cartesian2} result The object into which to store the result.
   * @returns {Cartesian2} A cartesian with the minimum components.
   */
  static minimumByComponent(
    first: Cartesian2,
    second: Cartesian2,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("first", first);
    Check.typeOf.object("second", second);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = Math.min(first.x, second.x);
    result.y = Math.min(first.y, second.y);

    return result;
  }

  /**
   * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
   *
   * @param {Cartesian2} first A cartesian to compare.
   * @param {Cartesian2} second A cartesian to compare.
   * @param {Cartesian2} result The object into which to store the result.
   * @returns {Cartesian2} A cartesian with the maximum components.
   */
  static maximumByComponent(
    first: Cartesian2,
    second: Cartesian2,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("first", first);
    Check.typeOf.object("second", second);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = Math.max(first.x, second.x);
    result.y = Math.max(first.y, second.y);
    return result;
  }

  /**
   * Computes the provided Cartesian's squared magnitude.
   *
   * 计算指定笛卡尔坐标的平方数值。这里也就是面积
   *
   * @param {Cartesian2} cartesian The Cartesian instance whose squared magnitude is to be computed.
   * @returns {Number} The squared magnitude.
   */
  static magnitudeSquared(cartesian: Cartesian2): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    //>>includeEnd('debug');

    return cartesian.x * cartesian.x + cartesian.y * cartesian.y;
  }

  /**
   * Computes the Cartesian's magnitude (length).
   *
   * 计算笛卡尔坐标的长度，根据三角函数计算斜边的长度。
   *
   * @param {Cartesian2} cartesian The Cartesian instance whose magnitude is to be computed.
   * @returns {Number} The magnitude.
   */
  static magnitude(cartesian: Cartesian2): number {
    return Math.sqrt(Cartesian2.magnitudeSquared(cartesian));
  }

  /**
   * 用于临时存储计算结果
   */
  static readonly _distanceScratch = new Cartesian2();

  /**
   * Computes the distance between two points.
   *
   * @param {Cartesian2} left The first point to compute the distance from.
   * @param {Cartesian2} right The second point to compute the distance to.
   * @returns {Number} The distance between two points.
   *
   * @example
   * // Returns 1.0
   * var d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(2.0, 0.0));
   */
  static distance(left: Cartesian2, right: Cartesian2): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    //>>includeEnd('debug');

    Cartesian2.subtract(left, right, Cartesian2._distanceScratch);
    return Cartesian2.magnitude(Cartesian2._distanceScratch);
  }

  /**
   * Computes the squared distance between two points.  Comparing squared distances
   * using this function is more efficient than comparing distances using {@link Cartesian2#distance}.
   *
   * @param {Cartesian2} left The first point to compute the distance from.
   * @param {Cartesian2} right The second point to compute the distance to.
   * @returns {Number} The distance between two points.
   *
   * @example
   * // Returns 4.0, not 2.0
   * var d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(3.0, 0.0));
   */
  static distanceSquared(left: Cartesian2, right: Cartesian2): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    //>>includeEnd('debug');

    Cartesian2.subtract(left, right, Cartesian2._distanceScratch);
    return Cartesian2.magnitudeSquared(Cartesian2._distanceScratch);
  }

  /**
   * Computes the normalized form of the supplied Cartesian.
   *
   * @param {Cartesian2} cartesian The Cartesian to be normalized.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static normalize(cartesian: Cartesian2, result: Cartesian2): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    var magnitude = Cartesian2.magnitude(cartesian);

    result.x = cartesian.x / magnitude;
    result.y = cartesian.y / magnitude;

    //>>includeStart('debug', pragmas.debug);
    if (isNaN(result.x) || isNaN(result.y)) {
      throw new DeveloperError("normalized result is not a number");
    }
    //>>includeEnd('debug');

    return result;
  }

  /**
   * Computes the dot (scalar) product of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @returns {Number} The dot product.
   */
  static dot(left: Cartesian2, right: Cartesian2): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    //>>includeEnd('debug');

    return left.x * right.x + left.y * right.y;
  }

  /**
   * Computes the magnitude of the cross product that would result from implicitly setting the Z coordinate of the input vectors to 0
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @returns {Number} The cross product.
   */
  static cross(left: Cartesian2, right: Cartesian2): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    //>>includeEnd('debug');

    return left.x * right.y - left.y * right.x;
  }

  /**
   * Computes the componentwise product of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static multiplyComponents(
    left: Cartesian2,
    right: Cartesian2,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = left.x * right.x;
    result.y = left.y * right.y;
    return result;
  }

  /**
   * Computes the componentwise quotient of two Cartesians.
   *
   * 计算两个二维笛卡尔坐标的分量系数
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static divideComponents(
    left: Cartesian2,
    right: Cartesian2,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = left.x / right.x;
    result.y = left.y / right.y;
    return result;
  }

  /**
   * Computes the componentwise sum of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static add(
    left: Cartesian2,
    right: Cartesian2,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = left.x + right.x;
    result.y = left.y + right.y;
    return result;
  }

  /**
   * Computes the componentwise difference of two Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static subtract(
    left: Cartesian2,
    right: Cartesian2,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = left.x - right.x;
    result.y = left.y - right.y;
    return result;
  }

  /**
   * Multiplies the provided Cartesian componentwise by the provided scalar.
   *
   * @param {Cartesian2} cartesian The Cartesian to be scaled.
   * @param {Number} scalar The scalar to multiply with.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static multiplyByScalar(
    cartesian: Cartesian2,
    scalar: number,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    Check.typeOf.number("scalar", scalar);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = cartesian.x * scalar;
    result.y = cartesian.y * scalar;
    return result;
  }

  /**
   * Divides the provided Cartesian componentwise by the provided scalar.
   *
   * @param {Cartesian2} cartesian The Cartesian to be divided.
   * @param {Number} scalar The scalar to divide by.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static divideByScalar(
    cartesian: Cartesian2,
    scalar: number,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    Check.typeOf.number("scalar", scalar);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = cartesian.x / scalar;
    result.y = cartesian.y / scalar;
    return result;
  }

  /**
   * Negates the provided Cartesian.
   *
   * @param {Cartesian2} cartesian The Cartesian to be negated.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static negate(cartesian: Cartesian2, result: Cartesian2): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = -cartesian.x;
    result.y = -cartesian.y;
    return result;
  }

  /**
   * Computes the absolute value of the provided Cartesian.
   *
   * @param {Cartesian2} cartesian The Cartesian whose absolute value is to be computed.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static abs(cartesian: Cartesian2, result: Cartesian2): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    result.x = Math.abs(cartesian.x);
    result.y = Math.abs(cartesian.y);
    return result;
  }

  /**
   * 临时存储
   */
  static readonly _lerpScratch = new Cartesian2();

  /**
   * Computes the linear interpolation or extrapolation at t using the provided cartesians.
   *
   * @param {Cartesian2} start The value corresponding to t at 0.0.
   * @param {Cartesian2} end The value corresponding to t at 1.0.
   * @param {Number} t The point along t at which to interpolate.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The modified result parameter.
   */
  static lerp(
    start: Cartesian2,
    end: Cartesian2,
    t: number,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("start", start);
    Check.typeOf.object("end", end);
    Check.typeOf.number("t", t);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    Cartesian2.multiplyByScalar(end, t, Cartesian2._lerpScratch);
    result = Cartesian2.multiplyByScalar(start, 1.0 - t, result);
    return Cartesian2.add(Cartesian2._lerpScratch, result, result);
  }

  /**
   * 临时存储
   */
  static readonly _angleBetweenScratch = new Cartesian2();
  static readonly _angleBetweenScratch2 = new Cartesian2();

  /**
   * Returns the angle, in radians, between the provided Cartesians.
   *
   * @param {Cartesian2} left The first Cartesian.
   * @param {Cartesian2} right The second Cartesian.
   * @returns {Number} The angle between the Cartesians.
   */
  static angleBetween(left: Cartesian2, right: Cartesian2): number {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("left", left);
    Check.typeOf.object("right", right);
    //>>includeEnd('debug');

    Cartesian2.normalize(left, Cartesian2._angleBetweenScratch);
    Cartesian2.normalize(right, Cartesian2._angleBetweenScratch2);
    return CesiumMath.acosClamped(
      Cartesian2.dot(
        Cartesian2._angleBetweenScratch,
        Cartesian2._angleBetweenScratch2
      )
    );
  }

  /**
   * 临时存储
   */
  static readonly _mostOrthogonalAxisScratch = new Cartesian2();

  /**
   * Returns the axis that is most orthogonal to the provided Cartesian.
   *
   * @param {Cartesian2} cartesian The Cartesian on which to find the most orthogonal axis.
   * @param {Cartesian2} result The object onto which to store the result.
   * @returns {Cartesian2} The most orthogonal axis.
   */
  static mostOrthogonalAxis(
    cartesian: Cartesian2,
    result: Cartesian2
  ): Cartesian2 {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.object("cartesian", cartesian);
    Check.typeOf.object("result", result);
    //>>includeEnd('debug');

    var f = Cartesian2.normalize(
      cartesian,
      Cartesian2._mostOrthogonalAxisScratch
    );
    Cartesian2.abs(f, f);

    if (f.x <= f.y) {
      result = Cartesian2.clone(Cartesian2.UNIT_X, result) as Cartesian2;
    } else {
      result = Cartesian2.clone(Cartesian2.UNIT_Y, result) as Cartesian2;
    }

    return result;
  }

  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they are equal, <code>false</code> otherwise.
   *
   * @param {Cartesian2} [left] The first Cartesian.
   * @param {Cartesian2} [right] The second Cartesian.
   * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
   */
  static equals(left: Cartesian2, right: Cartesian2): boolean {
    return (
      left === right ||
      (defined(left) &&
        defined(right) &&
        left.x === right.x &&
        left.y === right.y)
    );
  }

  /**
   * @private
   */
  static equalsArray(
    cartesian: Cartesian2,
    array: Array<number>,
    offset: number
  ): boolean {
    return cartesian.x === array[offset] && cartesian.y === array[offset + 1];
  }

  /**
   * Compares the provided Cartesians componentwise and returns
   * <code>true</code> if they pass an absolute or relative tolerance test,
   * <code>false</code> otherwise.
   *
   * @param {Cartesian2} [left] The first Cartesian.
   * @param {Cartesian2} [right] The second Cartesian.
   * @param {Number} [relativeEpsilon=0] The relative epsilon tolerance to use for equality testing.
   * @param {Number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
   * @returns {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
   */
  static equalsEpsilon(
    left: Cartesian2,
    right: Cartesian2,
    relativeEpsilon: number,
    absoluteEpsilon: number
  ): boolean {
    return (
      left === right ||
      (defined(left) &&
        defined(right) &&
        CesiumMath.equalsEpsilon(
          left.x,
          right.x,
          relativeEpsilon,
          absoluteEpsilon
        ) &&
        CesiumMath.equalsEpsilon(
          left.y,
          right.y,
          relativeEpsilon,
          absoluteEpsilon
        ))
    );
  }

  /**
   * An immutable Cartesian2 instance initialized to (0.0, 0.0).
   *
   * @type {Cartesian2}
   * @constant
   */
  static readonly ZERO = new Cartesian2();

  /**
   * An immutable Cartesian2 instance initialized to (1.0, 1.0).
   *
   * @type {Cartesian2}
   * @constant
   */
  static readonly ONE = new Cartesian2(1.0, 1.0);

  /**
   * An immutable Cartesian2 instance initialized to (1.0, 0.0).
   *
   * @type {Cartesian2}
   * @constant
   */
  static readonly UNIT_X = new Cartesian2(1.0, 0.0);

  /**
   * An immutable Cartesian2 instance initialized to (0.0, 1.0).
   *
   * @type {Cartesian2}
   * @constant
   */
  static readonly UNIT_Y = new Cartesian2(0.0, 1.0);
}

export default Cartesian2;
