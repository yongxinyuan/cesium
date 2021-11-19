import WebGLConstants from "@/Core/WebGLConstants";

export enum EnumPixelFormat {
  /**
   * A pixel format containing a depth value.
   *
   * @type {Number}
   * @constant
   */
  DEPTH_COMPONENT = WebGLConstants.DEPTH_COMPONENT,

  /**
   * A pixel format containing a depth and stencil value, most often used with {@link PixelDatatype.UNSIGNED_INT_24_8}.
   *
   * @type {Number}
   * @constant
   */
  DEPTH_STENCIL = WebGLConstants.DEPTH_STENCIL,

  /**
   * A pixel format containing an alpha channel.
   *
   * @type {Number}
   * @constant
   */
  ALPHA = WebGLConstants.ALPHA,

  /**
   * A pixel format containing red, green, and blue channels.
   *
   * @type {Number}
   * @constant
   */
  RGB = WebGLConstants.RGB,

  /**
   * A pixel format containing red, green, blue, and alpha channels.
   *
   * @type {Number}
   * @constant
   */
  RGBA = WebGLConstants.RGBA,

  /**
   * A pixel format containing a luminance (intensity) channel.
   *
   * @type {Number}
   * @constant
   */
  LUMINANCE = WebGLConstants.LUMINANCE,

  /**
   * A pixel format containing luminance (intensity) and alpha channels.
   *
   * @type {Number}
   * @constant
   */
  LUMINANCE_ALPHA = WebGLConstants.LUMINANCE_ALPHA,

  /**
   * A pixel format containing red, green, and blue channels that is DXT1 compressed.
   *
   * @type {Number}
   * @constant
   */
  RGB_DXT1 = WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,

  /**
   * A pixel format containing red, green, blue, and alpha channels that is DXT1 compressed.
   *
   * @type {Number}
   * @constant
   */
  RGBA_DXT1 = WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,

  /**
   * A pixel format containing red, green, blue, and alpha channels that is DXT3 compressed.
   *
   * @type {Number}
   * @constant
   */
  RGBA_DXT3 = WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,

  /**
   * A pixel format containing red, green, blue, and alpha channels that is DXT5 compressed.
   *
   * @type {Number}
   * @constant
   */
  RGBA_DXT5 = WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,

  /**
   * A pixel format containing red, green, and blue channels that is PVR 4bpp compressed.
   *
   * @type {Number}
   * @constant
   */
  RGB_PVRTC_4BPPV1 = WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,

  /**
   * A pixel format containing red, green, and blue channels that is PVR 2bpp compressed.
   *
   * @type {Number}
   * @constant
   */
  RGB_PVRTC_2BPPV1 = WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,

  /**
   * A pixel format containing red, green, blue, and alpha channels that is PVR 4bpp compressed.
   *
   * @type {Number}
   * @constant
   */
  RGBA_PVRTC_4BPPV1 = WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,

  /**
   * A pixel format containing red, green, blue, and alpha channels that is PVR 2bpp compressed.
   *
   * @type {Number}
   * @constant
   */
  RGBA_PVRTC_2BPPV1 = WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,

  /**
   * A pixel format containing red, green, blue, and alpha channels that is ASTC compressed.
   *
   * @type {Number}
   * @constant
   */
  RGBA_ASTC = WebGLConstants.COMPRESSED_RGBA_ASTC_4x4_WEBGL,

  /**
   * A pixel format containing red, green, and blue channels that is ETC1 compressed.
   *
   * @type {Number}
   * @constant
   */
  RGB_ETC1 = WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,

  /**
   * A pixel format containing red, green, and blue channels that is ETC2 compressed.
   *
   * @type {Number}
   * @constant
   */
  RGB8_ETC2 = WebGLConstants.COMPRESSED_RGB8_ETC2,

  /**
   * A pixel format containing red, green, blue, and alpha channels that is ETC2 compressed.
   *
   * @type {Number}
   * @constant
   */
  RGBA8_ETC2_EAC = WebGLConstants.COMPRESSED_RGBA8_ETC2_EAC,

  /**
   * A pixel format containing red, green, blue, and alpha channels that is BC7 compressed.
   *
   * @type {Number}
   * @constant
   */
  RGBA_BC7 = WebGLConstants.COMPRESSED_RGBA_BPTC_UNORM,
}

class PixelFormat {
  /**
   * @private
   */
  static isColorFormat(pixelFormat: unknown): boolean {
    return (
      pixelFormat === EnumPixelFormat.ALPHA ||
      pixelFormat === EnumPixelFormat.RGB ||
      pixelFormat === EnumPixelFormat.RGBA ||
      pixelFormat === EnumPixelFormat.LUMINANCE ||
      pixelFormat === EnumPixelFormat.LUMINANCE_ALPHA
    );
  }
}

export default PixelFormat;
