import defaultValue from "@/Core/defaultValue";

/**
 * A bounding rectangle given by a corner, width and height.
 * @alias BoundingRectangle
 * @constructor
 *
 * @param {Number} [x=0.0] The x coordinate of the rectangle.
 * @param {Number} [y=0.0] The y coordinate of the rectangle.
 * @param {Number} [width=0.0] The width of the rectangle.
 * @param {Number} [height=0.0] The height of the rectangle.
 *
 * @see BoundingSphere
 * @see Packable
 */
class BoundingRectangle {
  /**
   * The x coordinate of the rectangle.
   * @type {Number}
   * @default 0.0
   */
  x: number;
  /**
   * The y coordinate of the rectangle.
   * @type {Number}
   * @default 0.0
   */
  y: number;
  /**
   * The width of the rectangle.
   * @type {Number}
   * @default 0.0
   */
  width: number;
  /**
   * The height of the rectangle.
   * @type {Number}
   * @default 0.0
   */
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = defaultValue(x, 0.0);
    this.y = defaultValue(y, 0.0);
    this.width = defaultValue(width, 0.0);
    this.height = defaultValue(height, 0.0);
  }
}

export default BoundingRectangle;
