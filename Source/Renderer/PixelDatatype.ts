import WebGLConstants from "@/Core/WebGLConstants";

/**
 * The data type of a pixel.
 *
 * @enum {Number}
 * @see PostProcessStage
 */
export enum EnumPixelDatatype {
  UNSIGNED_BYTE = WebGLConstants.UNSIGNED_BYTE,
  UNSIGNED_SHORT = WebGLConstants.UNSIGNED_SHORT,
  UNSIGNED_INT = WebGLConstants.UNSIGNED_INT,
  FLOAT = WebGLConstants.FLOAT,
  HALF_FLOAT = WebGLConstants.HALF_FLOAT_OES,
  UNSIGNED_INT_24_8 = WebGLConstants.UNSIGNED_INT_24_8,
  UNSIGNED_SHORT_4_4_4_4 = WebGLConstants.UNSIGNED_SHORT_4_4_4_4,
  UNSIGNED_SHORT_5_5_5_1 = WebGLConstants.UNSIGNED_SHORT_5_5_5_1,
  UNSIGNED_SHORT_5_6_5 = WebGLConstants.UNSIGNED_SHORT_5_6_5,
}
