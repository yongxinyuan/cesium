import Check from "@/Core/Check";
import defaultValue from "@/Core/defaultValue";
import defined from "@/Core/defined";

/**
 * A color, specified using red, green, blue, and alpha values,
 * which range from <code>0</code> (no intensity) to <code>1.0</code> (full intensity).
 * @param {Number} [red=1.0] The red component.
 * @param {Number} [green=1.0] The green component.
 * @param {Number} [blue=1.0] The blue component.
 * @param {Number} [alpha=1.0] The alpha component.
 *
 * @constructor
 * @alias Color
 *
 * @see Packable
 */
class Color {
  /**
   * The red component.
   * @type {Number}
   * @default 1.0
   */
  red: number;
  /**
   * The green component.
   * @type {Number}
   * @default 1.0
   */
  green: number;
  /**
   * The blue component.
   * @type {Number}
   * @default 1.0
   */
  blue: number;
  /**
   * The alpha component.
   * @type {Number}
   * @default 1.0
   */
  alpha: number;

  constructor(red?: number, green?: number, blue?: number, alpha?: number) {
    this.red = defaultValue(red, 1.0);
    this.green = defaultValue(green, 1.0);
    this.blue = defaultValue(blue, 1.0);
    this.alpha = defaultValue(alpha, 1.0);
  }

  /**
   * Creates a Color instance from a CSS color value.
   *
   * @param {String} color The CSS color value in #rgb, #rgba, #rrggbb, #rrggbbaa, rgb(), rgba(), hsl(), or hsla() format.
   * @param {Color} [result] The object to store the result in, if undefined a new instance will be created.
   * @returns {Color} The color object, or undefined if the string was not a valid CSS color.
   *
   *
   * @example
   * var cesiumBlue = Cesium.Color.fromCssColorString('#67ADDF');
   * var green = Cesium.Color.fromCssColorString('green');
   *
   * @see {@link http://www.w3.org/TR/css3-color|CSS color values}
   */
  static fromCssColorString(color: string, result: Color) {
    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.string("color", color);
    //>>includeEnd('debug');

    if (!defined(result)) {
      result = new Color();
    }

    // Remove all whitespaces from the color string
    color = color.replace(/\s/g, "");

    var namedColor = Color[color.toUpperCase()];
    if (defined(namedColor)) {
      Color.clone(namedColor, result);
      return result;
    }

    var matches = rgbaMatcher.exec(color);
    if (matches !== null) {
      result.red = parseInt(matches[1], 16) / 15;
      result.green = parseInt(matches[2], 16) / 15.0;
      result.blue = parseInt(matches[3], 16) / 15.0;
      result.alpha = parseInt(defaultValue(matches[4], "f"), 16) / 15.0;
      return result;
    }

    matches = rrggbbaaMatcher.exec(color);
    if (matches !== null) {
      result.red = parseInt(matches[1], 16) / 255.0;
      result.green = parseInt(matches[2], 16) / 255.0;
      result.blue = parseInt(matches[3], 16) / 255.0;
      result.alpha = parseInt(defaultValue(matches[4], "ff"), 16) / 255.0;
      return result;
    }

    matches = rgbParenthesesMatcher.exec(color);
    if (matches !== null) {
      result.red =
        parseFloat(matches[1]) /
        ("%" === matches[1].substr(-1) ? 100.0 : 255.0);
      result.green =
        parseFloat(matches[2]) /
        ("%" === matches[2].substr(-1) ? 100.0 : 255.0);
      result.blue =
        parseFloat(matches[3]) /
        ("%" === matches[3].substr(-1) ? 100.0 : 255.0);
      result.alpha = parseFloat(defaultValue(matches[4], "1.0"));
      return result;
    }

    matches = hslParenthesesMatcher.exec(color);
    if (matches !== null) {
      return Color.fromHsl(
        parseFloat(matches[1]) / 360.0,
        parseFloat(matches[2]) / 100.0,
        parseFloat(matches[3]) / 100.0,
        parseFloat(defaultValue(matches[4], "1.0")),
        result
      );
    }

    result = undefined;
    return result;
  }
}

export default Color;
