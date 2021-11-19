import Check from "@/Core/Check";
import defaultValue from "@/Core/defaultValue";
import DeveloperError from "@/Core/DeveloperError";
import PixelFormat, { EnumPixelFormat } from "@/Core/PixelFormat";
import { EnumPixelDatatype } from "@/Renderer/PixelDatatype";
import PostProcessStageSampleMode from "@/Scene/PostProcessStageSampleMode";

export interface PostProcessStageConstructor {
  fragmentShader: string;
  textureScale: number;
  pixelFormat: EnumPixelFormat;
  uniforms: Record<string, any>;
  forcePowerOfTwo?: boolean;
  sampleMode: PostProcessStageSampleMode;
  pixelDatatype: EnumPixelDatatype;
}

/**
 * Runs a post-process stage on either the texture rendered by the scene or the output of a previous post-process stage.
 *
 * 运行一个后期处理阶段，在场景渲染的纹理，或者上一个后期处理阶段输出的纹理。
 *
 * @alias PostProcessStage
 * @constructor
 *
 * @param {Object} options An object with the following properties:
 * @param {String} options.fragmentShader
 * The fragment shader to use.
 * The default <code>sampler2D</code> uniforms are <code>colorTexture</code> and <code>depthTexture</code>.
 * The color texture is the output of rendering the scene or the previous stage.
 * The depth texture is the output from rendering the scene.
 * The shader should contain one or both uniforms.
 * There is also a <code>vec2</code> varying named <code>v_textureCoordinates</code> that can be used to sample the textures.
 *
 * 默认 sampler2D 类型的 uniform 是 colorTexture 和 depthTexture。
 * colorTexture 是颜色纹理。
 * depthTexture 是深度纹理。
 * 片元着色器应该至少包含一个。
 * 也有一个 vec2 类型的 varying 是v_textureCoordinates 用来提取纹理。
 *
 * @param {Object} [options.uniforms]
 * An object whose properties will be used to set the shaders uniforms.
 * The properties can be constant values or a function.
 * A constant value can also be a URI, data URI, or HTML element to use as a texture.
 *
 * 一个对象，属性将用来设置片元着色器的 uniform。
 * 属性可以是常量值或一个函数。
 * 常量值可以是 URI、 数据 URI、 或者 HTML 元素当作一个纹理。
 *
 * @param {Number} [options.textureScale=1.0]
 * A number in the range (0.0, 1.0] used to scale the texture dimensions.
 * A scale of 1.0 will render this post-process stage  to a texture the size of the viewport.
 *
 * 0.0 到 1.0 区间的数字，用来缩放纹理尺寸。
 * 1.0 将后期处理阶段输出纹理按照视口尺寸渲染。
 *
 * @param {Boolean} [options.forcePowerOfTwo=false]
 * Whether or not to force the texture dimensions to be both equal powers of two.
 * The power of two will be the next power of two of the minimum of the dimensions.
 *
 * 是否强制纹理尺寸是 2 的次方。
 * 2 的幂将是下一个尺寸最小的幂？？
 *
 * @param {PostProcessStageSampleMode} [options.sampleMode=PostProcessStageSampleMode.NEAREST]
 * How to sample the input color texture.
 *
 * 如何提取输入颜色纹理？
 *
 * @param {PixelFormat} [options.pixelFormat=PixelFormat.RGBA]
 * The color pixel format of the output texture.
 *
 * 输出纹理的颜色像素格式。
 *
 * @param {PixelDatatype} [options.pixelDatatype=PixelDatatype.UNSIGNED_BYTE]
 * The pixel data type of the output texture.
 *
 * 输出颜色纹理的像素数据类型。
 *
 * @param {Color} [options.clearColor=Color.BLACK]
 * The color to clear the output texture to.
 *
 * 输出纹理清除颜色缓冲区的颜色值。
 *
 * @param {BoundingRectangle} [options.scissorRectangle]
 * The rectangle to use for the scissor test.
 *
 * 裁剪测试的矩形。
 *
 * @param {String} [options.name=createGuid()]
 * The unique name of this post-process stage for reference by other stages in a composite.
 * If a name is not supplied, a GUID will be generated.
 *
 * 唯一的后期处理阶段名称，用来在混合其他后期处理阶段时标记。
 * 如果没有提供名称，将生成一个 GUID。
 *
 * @property { string } _fragmentShader 片源着色器代码
 * @property { object } _uniforms 片元着色器接收的 uniform 变量对象
 * @property { number } _textureScale 输出纹理的缩放比例
 * @property { boolean } _forcePowerOfTwo 尺寸是否限制为 2 的幂
 * @property { string } _sampleMode 纹理采样模式
 * @property { string } _pixelFormat 像素格式，默认 rgba
 * @property { string } _pixelDatatype 像素颜色值数据类型，无符号
 * @property { string } _clearColor 输出纹理清除颜色缓冲区的颜色值
 * @property { number } _depthTexture 输出纹理清除深度缓冲区的值
 * @property { any } _idTexture 不知道干啥的
 * @property { object } _uniformMap uniform 变量对象
 *
 * @exception {DeveloperError} options.textureScale must be greater than 0.0 and less than or equal to 1.0.
 * @exception {DeveloperError} options.pixelFormat must be a color format.
 * @exception {DeveloperError} When options.pixelDatatype is FLOAT, this WebGL implementation must support the OES_texture_float extension.  Check context.floatingPointTexture.
 *
 * @see PostProcessStageComposite
 *
 * @example
 * // Simple stage to change the color
 * var fs =
 *     'uniform sampler2D colorTexture;\n' +
 *     'varying vec2 v_textureCoordinates;\n' +
 *     'uniform float scale;\n' +
 *     'uniform vec3 offset;\n' +
 *     'void main() {\n' +
 *     '    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
 *     '    gl_FragColor = vec4(color.rgb * scale + offset, 1.0);\n' +
 *     '}\n';
 * scene.postProcessStages.add(new Cesium.PostProcessStage({
 *     fragmentShader : fs,
 *     uniforms : {
 *         scale : 1.1,
 *         offset : function() {
 *             return new Cesium.Cartesian3(0.1, 0.2, 0.3);
 *         }
 *     }
 * }));
 *
 * @example
 * // Simple stage to change the color of what is selected.
 * // If czm_selected returns true, the current fragment belongs to geometry in the selected array.
 * var fs =
 *     'uniform sampler2D colorTexture;\n' +
 *     'varying vec2 v_textureCoordinates;\n' +
 *     'uniform vec4 highlight;\n' +
 *     'void main() {\n' +
 *     '    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
 *     '    if (czm_selected()) {\n' +
 *     '        vec3 highlighted = highlight.a * highlight.rgb + (1.0 - highlight.a) * color.rgb;\n' +
 *     '        gl_FragColor = vec4(highlighted, 1.0);\n' +
 *     '    } else { \n' +
 *     '        gl_FragColor = color;\n' +
 *     '    }\n' +
 *     '}\n';
 * var stage = scene.postProcessStages.add(new Cesium.PostProcessStage({
 *     fragmentShader : fs,
 *     uniforms : {
 *         highlight : function() {
 *             return new Cesium.Color(1.0, 0.0, 0.0, 0.5);
 *         }
 *     }
 * }));
 * stage.selected = [cesium3DTileFeature];
 */
class PostProcessStage {
  private _fragmentShader: string;
  private _uniforms: Record<string, any>;
  private _textureScale: number;
  private _forcePowerOfTwo: boolean;
  private _sampleMode: PostProcessStageSampleMode;
  private _pixelFormat: EnumPixelFormat;
  private _pixelDatatype: EnumPixelDatatype;

  constructor(options: PostProcessStageConstructor) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);

    const fragmentShader = options.fragmentShader;
    const textureScale = defaultValue(options.textureScale, 1.0);
    const pixelFormat = defaultValue(options.pixelFormat, EnumPixelFormat.RGBA);

    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.string("options.fragmentShader", fragmentShader);
    Check.typeOf.number.greaterThan("options.textureScale", textureScale, 0.0);
    Check.typeOf.number.lessThanOrEquals(
      "options.textureScale",
      textureScale,
      1.0
    );
    if (!PixelFormat.isColorFormat(pixelFormat)) {
      throw new DeveloperError("options.pixelFormat must be a color format.");
    }
    //>>includeEnd('debug');

    this._fragmentShader = fragmentShader;
    this._uniforms = options.uniforms;
    this._textureScale = textureScale;
    this._forcePowerOfTwo = defaultValue(options.forcePowerOfTwo, false);
    this._sampleMode = defaultValue(
      options.sampleMode,
      PostProcessStageSampleMode.NEAREST
    );
    this._pixelFormat = pixelFormat;
    this._pixelDatatype = defaultValue(
      options.pixelDatatype,
      EnumPixelDatatype.UNSIGNED_BYTE
    );
    this._clearColor = defaultValue(options.clearColor, Color.BLACK);
  }
}

export default PostProcessStage;
