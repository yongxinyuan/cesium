import BoundingRectangle from "../Core/BoundingRectangle.js";
import Check from "../Core/Check.js";
import Color from "../Core/Color.js";
import combine from "../Core/combine.js";
import createGuid from "../Core/createGuid.js";
import defaultValue from "../Core/defaultValue.js";
import defined from "../Core/defined.js";
import destroyObject from "../Core/destroyObject.js";
import DeveloperError from "../Core/DeveloperError.js";
import PixelFormat from "../Core/PixelFormat.js";
import Resource from "../Core/Resource.js";
import PassState from "../Renderer/PassState.js";
import PixelDatatype from "../Renderer/PixelDatatype.js";
import RenderState from "../Renderer/RenderState.js";
import Sampler from "../Renderer/Sampler.js";
import ShaderSource from "../Renderer/ShaderSource.js";
import Texture from "../Renderer/Texture.js";
import TextureMagnificationFilter from "../Renderer/TextureMagnificationFilter.js";
import TextureMinificationFilter from "../Renderer/TextureMinificationFilter.js";
import TextureWrap from "../Renderer/TextureWrap.js";
import when from "../ThirdParty/when.js";
import PostProcessStageSampleMode from "./PostProcessStageSampleMode.js";

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
function PostProcessStage(options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);
  var fragmentShader = options.fragmentShader;
  var textureScale = defaultValue(options.textureScale, 1.0);
  var pixelFormat = defaultValue(options.pixelFormat, PixelFormat.RGBA);

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
    PixelDatatype.UNSIGNED_BYTE
  );
  this._clearColor = defaultValue(options.clearColor, Color.BLACK);

  this._uniformMap = undefined;
  this._command = undefined;

  this._colorTexture = undefined;
  this._depthTexture = undefined;
  this._idTexture = undefined;

  this._actualUniforms = {};
  this._dirtyUniforms = [];
  this._texturesToRelease = [];
  this._texturesToCreate = [];
  this._texturePromise = undefined;

  var passState = new PassState();
  passState.scissorTest = {
    enabled: true,
    rectangle: defined(options.scissorRectangle)
      ? BoundingRectangle.clone(options.scissorRectangle)
      : new BoundingRectangle(),
  };
  this._passState = passState;

  this._ready = false;

  var name = options.name;
  if (!defined(name)) {
    name = createGuid();
  }
  this._name = name;

  this._logDepthChanged = undefined;
  this._useLogDepth = undefined;

  this._selectedIdTexture = undefined;
  this._selected = undefined;
  this._selectedShadow = undefined;
  this._parentSelected = undefined;
  this._parentSelectedShadow = undefined;
  this._combinedSelected = undefined;
  this._combinedSelectedShadow = undefined;
  this._selectedLength = 0;
  this._parentSelectedLength = 0;
  this._selectedDirty = true;

  // set by PostProcessStageCollection
  this._textureCache = undefined;
  this._index = undefined;

  /**
   * Whether or not to execute this post-process stage when ready.
   *
   * @type {Boolean}
   */
  this.enabled = true;
  this._enabled = true;
}

Object.defineProperties(PostProcessStage.prototype, {
  /**
   * Determines if this post-process stage is ready to be executed. A stage is only executed when both <code>ready</code>
   * and {@link PostProcessStage#enabled} are <code>true</code>. A stage will not be ready while it is waiting on textures
   * to load.
   *
   * @memberof PostProcessStage.prototype
   * @type {Boolean}
   * @readonly
   */
  ready: {
    get: function () {
      return this._ready;
    },
  },
  /**
   * The unique name of this post-process stage for reference by other stages in a {@link PostProcessStageComposite}.
   *
   * @memberof PostProcessStage.prototype
   * @type {String}
   * @readonly
   */
  name: {
    get: function () {
      return this._name;
    },
  },
  /**
   * The fragment shader to use when execute this post-process stage.
   * <p>
   * The shader must contain a sampler uniform declaration for <code>colorTexture</code>, <code>depthTexture</code>,
   * or both.
   * </p>
   * <p>
   * The shader must contain a <code>vec2</code> varying declaration for <code>v_textureCoordinates</code> for sampling
   * the texture uniforms.
   * </p>
   *
   * @memberof PostProcessStage.prototype
   * @type {String}
   * @readonly
   */
  fragmentShader: {
    get: function () {
      return this._fragmentShader;
    },
  },
  /**
   * An object whose properties are used to set the uniforms of the fragment shader.
   * <p>
   * The object property values can be either a constant or a function. The function will be called
   * each frame before the post-process stage is executed.
   * </p>
   * <p>
   * A constant value can also be a URI to an image, a data URI, or an HTML element that can be used as a texture, such as HTMLImageElement or HTMLCanvasElement.
   * </p>
   * <p>
   * If this post-process stage is part of a {@link PostProcessStageComposite} that does not execute in series, the constant value can also be
   * the name of another stage in a composite. This will set the uniform to the output texture the stage with that name.
   * </p>
   *
   * @memberof PostProcessStage.prototype
   * @type {Object}
   * @readonly
   */
  uniforms: {
    get: function () {
      return this._uniforms;
    },
  },
  /**
   * A number in the range (0.0, 1.0] used to scale the output texture dimensions. A scale of 1.0 will render this post-process stage to a texture the size of the viewport.
   *
   * @memberof PostProcessStage.prototype
   * @type {Number}
   * @readonly
   */
  textureScale: {
    get: function () {
      return this._textureScale;
    },
  },
  /**
   * Whether or not to force the output texture dimensions to be both equal powers of two. The power of two will be the next power of two of the minimum of the dimensions.
   *
   * @memberof PostProcessStage.prototype
   * @type {Number}
   * @readonly
   */
  forcePowerOfTwo: {
    get: function () {
      return this._forcePowerOfTwo;
    },
  },
  /**
   * How to sample the input color texture.
   *
   * @memberof PostProcessStage.prototype
   * @type {PostProcessStageSampleMode}
   * @readonly
   */
  sampleMode: {
    get: function () {
      return this._sampleMode;
    },
  },
  /**
   * The color pixel format of the output texture.
   *
   * @memberof PostProcessStage.prototype
   * @type {PixelFormat}
   * @readonly
   */
  pixelFormat: {
    get: function () {
      return this._pixelFormat;
    },
  },
  /**
   * The pixel data type of the output texture.
   *
   * @memberof PostProcessStage.prototype
   * @type {PixelDatatype}
   * @readonly
   */
  pixelDatatype: {
    get: function () {
      return this._pixelDatatype;
    },
  },
  /**
   * The color to clear the output texture to.
   *
   * @memberof PostProcessStage.prototype
   * @type {Color}
   * @readonly
   */
  clearColor: {
    get: function () {
      return this._clearColor;
    },
  },
  /**
   * The {@link BoundingRectangle} to use for the scissor test. A default bounding rectangle will disable the scissor test.
   *
   * @memberof PostProcessStage.prototype
   * @type {BoundingRectangle}
   * @readonly
   */
  scissorRectangle: {
    get: function () {
      return this._passState.scissorTest.rectangle;
    },
  },
  /**
   * A reference to the texture written to when executing this post process stage.
   *
   * @memberof PostProcessStage.prototype
   * @type {Texture}
   * @readonly
   * @private
   */
  outputTexture: {
    get: function () {
      if (defined(this._textureCache)) {
        var framebuffer = this._textureCache.getFramebuffer(this._name);
        if (defined(framebuffer)) {
          return framebuffer.getColorTexture(0);
        }
      }
      return undefined;
    },
  },
  /**
   * The features selected for applying the post-process.
   * <p>
   * In the fragment shader, use <code>czm_selected</code> to determine whether or not to apply the post-process
   * stage to that fragment. For example:
   * <code>
   * if (czm_selected(v_textureCoordinates)) {
   *     // apply post-process stage
   * } else {
   *     gl_FragColor = texture2D(colorTexture, v_textureCordinates);
   * }
   * </code>
   * </p>
   *
   * @memberof PostProcessStage.prototype
   * @type {Array}
   */
  selected: {
    get: function () {
      return this._selected;
    },
    set: function (value) {
      this._selected = value;
    },
  },
  /**
   * @private
   */
  parentSelected: {
    get: function () {
      return this._parentSelected;
    },
    set: function (value) {
      this._parentSelected = value;
    },
  },
});

var depthTextureRegex = /uniform\s+sampler2D\s+depthTexture/g;

/**
 * @private
 */
PostProcessStage.prototype._isSupported = function (context) {
  // 片元着色器没有用到深度纹理或者上下文有深度纹理？
  // 主要检测是否支持深度纹理
  return !depthTextureRegex.test(this._fragmentShader) || context.depthTexture;
};

/**
 * 获取 uniform 值的 getter 和 setter
 */
function getUniformValueGetterAndSetter(stage, uniforms, name) {
  // 记录当前值
  var currentValue = uniforms[name];
  // 如果当前值是字符串、canvas 元素、image 元素、ImageData，说明是脏数据
  if (
    typeof currentValue === "string" ||
    currentValue instanceof HTMLCanvasElement ||
    currentValue instanceof HTMLImageElement ||
    currentValue instanceof HTMLVideoElement ||
    currentValue instanceof ImageData
  ) {
    stage._dirtyUniforms.push(name);
  }

  return {
    get: function () {
      return uniforms[name];
    },
    set: function (value) {
      var currentValue = uniforms[name];
      uniforms[name] = value;

      var actualUniforms = stage._actualUniforms;
      var actualValue = actualUniforms[name];
      if (
        defined(actualValue) &&
        actualValue !== currentValue &&
        actualValue instanceof Texture &&
        !defined(stage._textureCache.getStageByName(name))
      ) {
        stage._texturesToRelease.push(actualValue);
        delete actualUniforms[name];
        delete actualUniforms[name + "Dimensions"];
      }

      if (currentValue instanceof Texture) {
        stage._texturesToRelease.push(currentValue);
      }

      if (
        typeof value === "string" ||
        value instanceof HTMLCanvasElement ||
        value instanceof HTMLImageElement ||
        value instanceof HTMLVideoElement ||
        value instanceof ImageData
      ) {
        stage._dirtyUniforms.push(name);
      } else {
        actualUniforms[name] = value;
      }
    },
  };
}

function getUniformMapFunction(stage, name) {
  return function () {
    var value = stage._actualUniforms[name];
    if (typeof value === "function") {
      return value();
    }
    return value;
  };
}

function getUniformMapDimensionsFunction(uniformMap, name) {
  return function () {
    var texture = uniformMap[name]();
    if (defined(texture)) {
      return texture.dimensions;
    }
    return undefined;
  };
}

/**
 * 创建 uniform 映射
 */
function createUniformMap(stage) {
  // 如果已经有 uniform 映射，不需要重复处理
  if (defined(stage._uniformMap)) {
    return;
  }

  // 遍历设置的 uniforms 对象的属性
  //
  var uniformMap = {};
  var newUniforms = {};
  var uniforms = stage._uniforms;
  var actualUniforms = stage._actualUniforms;
  for (var name in uniforms) {
    if (uniforms.hasOwnProperty(name)) {
      // 值不是函数的处理方式
      if (typeof uniforms[name] !== "function") {
        // 记录包装的 uniform 获取函数
        uniformMap[name] = getUniformMapFunction(stage, name);
        // 设置 getter 和 setter
        newUniforms[name] = getUniformValueGetterAndSetter(
          stage,
          uniforms,
          name
        );
      }
      // 值是函数
      else {
        uniformMap[name] = uniforms[name];
        newUniforms[name] = uniforms[name];
      }

      // 记录实际的值
      actualUniforms[name] = uniforms[name];

      // 执行获取值
      // 如果这个值是这些种类，记录尺寸
      var value = uniformMap[name]();
      if (
        typeof value === "string" ||
        value instanceof Texture ||
        value instanceof HTMLImageElement ||
        value instanceof HTMLCanvasElement ||
        value instanceof HTMLVideoElement
      ) {
        uniformMap[name + "Dimensions"] = getUniformMapDimensionsFunction(
          uniformMap,
          name
        );
      }
    }
  }

  // 重写 stage._unifroms 属性，变成响应式的
  stage._uniforms = {};
  Object.defineProperties(stage._uniforms, newUniforms);

  // 组合一些内置的纹理
  stage._uniformMap = combine(uniformMap, {
    colorTexture: function () {
      return stage._colorTexture;
    },
    colorTextureDimensions: function () {
      return stage._colorTexture.dimensions;
    },
    depthTexture: function () {
      return stage._depthTexture;
    },
    depthTextureDimensions: function () {
      return stage._depthTexture.dimensions;
    },
    czm_idTexture: function () {
      return stage._idTexture;
    },
    czm_selectedIdTexture: function () {
      return stage._selectedIdTexture;
    },
    czm_selectedIdTextureStep: function () {
      return 1.0 / stage._selectedIdTexture.width;
    },
  });
}

/**
 * 创建绘制命令
 */
function createDrawCommand(stage, context) {
  if (
    defined(stage._command) &&
    !stage._logDepthChanged &&
    !stage._selectedDirty
  ) {
    return;
  }

  var fs = stage._fragmentShader;
  if (defined(stage._selectedIdTexture)) {
    var width = stage._selectedIdTexture.width;

    fs = fs.replace(/varying\s+vec2\s+v_textureCoordinates;/g, "");
    fs =
      "#define CZM_SELECTED_FEATURE \n" +
      "uniform sampler2D czm_idTexture; \n" +
      "uniform sampler2D czm_selectedIdTexture; \n" +
      "uniform float czm_selectedIdTextureStep; \n" +
      "varying vec2 v_textureCoordinates; \n" +
      "bool czm_selected(vec2 offset) \n" +
      "{ \n" +
      "    bool selected = false;\n" +
      "    vec4 id = texture2D(czm_idTexture, v_textureCoordinates + offset); \n" +
      "    for (int i = 0; i < " +
      width +
      "; ++i) \n" +
      "    { \n" +
      "        vec4 selectedId = texture2D(czm_selectedIdTexture, vec2((float(i) + 0.5) * czm_selectedIdTextureStep, 0.5)); \n" +
      "        if (all(equal(id, selectedId))) \n" +
      "        { \n" +
      "            return true; \n" +
      "        } \n" +
      "    } \n" +
      "    return false; \n" +
      "} \n\n" +
      "bool czm_selected() \n" +
      "{ \n" +
      "    return czm_selected(vec2(0.0)); \n" +
      "} \n\n" +
      fs;
  }

  var fragmentShader = new ShaderSource({
    defines: [stage._useLogDepth ? "LOG_DEPTH" : ""],
    sources: [fs],
  });
  stage._command = context.createViewportQuadCommand(fragmentShader, {
    uniformMap: stage._uniformMap,
    owner: stage,
  });
}

function createSampler(stage) {
  var mode = stage._sampleMode;

  var minFilter;
  var magFilter;

  if (mode === PostProcessStageSampleMode.LINEAR) {
    minFilter = TextureMinificationFilter.LINEAR;
    magFilter = TextureMagnificationFilter.LINEAR;
  } else {
    minFilter = TextureMinificationFilter.NEAREST;
    magFilter = TextureMagnificationFilter.NEAREST;
  }

  var sampler = stage._sampler;
  if (
    !defined(sampler) ||
    sampler.minificationFilter !== minFilter ||
    sampler.magnificationFilter !== magFilter
  ) {
    stage._sampler = new Sampler({
      wrapS: TextureWrap.CLAMP_TO_EDGE,
      wrapT: TextureWrap.CLAMP_TO_EDGE,
      minificationFilter: minFilter,
      magnificationFilter: magFilter,
    });
  }
}

function createLoadImageFunction(stage, name) {
  return function (image) {
    stage._texturesToCreate.push({
      name: name,
      source: image,
    });
  };
}

function createStageOutputTextureFunction(stage, name) {
  return function () {
    return stage._textureCache.getOutputTexture(name);
  };
}

/**
 * 创建 uniforms 对应的纹理
 */
function updateUniformTextures(stage, context) {
  var i;
  var texture;
  var name;

  // 销毁要释放的纹理资源
  var texturesToRelease = stage._texturesToRelease;
  var length = texturesToRelease.length;
  for (i = 0; i < length; ++i) {
    texture = texturesToRelease[i];
    texture = texture && texture.destroy();
  }
  texturesToRelease.length = 0;

  // 创建要创建的纹理
  var texturesToCreate = stage._texturesToCreate;
  length = texturesToCreate.length;
  for (i = 0; i < length; ++i) {
    var textureToCreate = texturesToCreate[i];
    name = textureToCreate.name;
    var source = textureToCreate.source;
    stage._actualUniforms[name] = new Texture({
      context: context,
      source: source,
    });
  }
  texturesToCreate.length = 0;

  // 有变化的纹理
  var dirtyUniforms = stage._dirtyUniforms;
  if (dirtyUniforms.length === 0 && !defined(stage._texturePromise)) {
    stage._ready = true;
    return;
  }

  if (dirtyUniforms.length === 0 || defined(stage._texturePromise)) {
    return;
  }

  // 处理异步加载图片
  length = dirtyUniforms.length;
  var uniforms = stage._uniforms;
  var promises = [];
  for (i = 0; i < length; ++i) {
    name = dirtyUniforms[i];
    var stageNameUrlOrImage = uniforms[name];
    var stageWithName = stage._textureCache.getStageByName(stageNameUrlOrImage);
    if (defined(stageWithName)) {
      stage._actualUniforms[name] = createStageOutputTextureFunction(
        stage,
        stageNameUrlOrImage
      );
    } else if (typeof stageNameUrlOrImage === "string") {
      var resource = new Resource({
        url: stageNameUrlOrImage,
      });

      promises.push(
        resource.fetchImage().then(createLoadImageFunction(stage, name))
      );
    } else {
      stage._texturesToCreate.push({
        name: name,
        source: stageNameUrlOrImage,
      });
    }
  }

  dirtyUniforms.length = 0;

  if (promises.length > 0) {
    stage._ready = false;
    stage._texturePromise = when.all(promises).then(function () {
      stage._ready = true;
      stage._texturePromise = undefined;
    });
  } else {
    stage._ready = true;
  }
}

/**
 * 释放资源
 *
 * @param {*} stage
 * @returns
 */
function releaseResources(stage) {
  // 销毁命令中的着色器程序
  if (defined(stage._command)) {
    stage._command.shaderProgram =
      stage._command.shaderProgram && stage._command.shaderProgram.destroy();
    stage._command = undefined;
  }

  // 销毁选中的纹理
  stage._selectedIdTexture =
    stage._selectedIdTexture && stage._selectedIdTexture.destroy();

  // 没有纹理缓存，不处理
  var textureCache = stage._textureCache;
  if (!defined(textureCache)) {
    return;
  }

  // 销毁纹理
  var uniforms = stage._uniforms;
  var actualUniforms = stage._actualUniforms;
  for (var name in actualUniforms) {
    if (actualUniforms.hasOwnProperty(name)) {
      if (actualUniforms[name] instanceof Texture) {
        if (!defined(textureCache.getStageByName(uniforms[name]))) {
          actualUniforms[name].destroy();
        }
        stage._dirtyUniforms.push(name);
      }
    }
  }
}

/**
 * 选中的纹理是否发生变化
 */
function isSelectedTextureDirty(stage) {
  // 记录选中瓦片数量
  var length = defined(stage._selected) ? stage._selected.length : 0;
  // 父选中瓦片数量？
  var parentLength = defined(stage._parentSelected) ? stage._parentSelected : 0;
  // 如何判断发生变化？
  // 1. 选中的和选中副本不一致
  // 2. 当前选中的数量和上一帧选中数量不同
  // 3. 父元素选中的和选中副本不一致
  // 4. 父元素当前选中数量和上一帧父元素选中数量不同
  var dirty =
    stage._selected !== stage._selectedShadow ||
    length !== stage._selectedLength;
  dirty =
    dirty ||
    stage._parentSelected !== stage._parentSelectedShadow ||
    parentLength !== stage._parentSelectedLength;

  // 组合选中的瓦片
  if (defined(stage._selected) && defined(stage._parentSelected)) {
    stage._combinedSelected = stage._selected.concat(stage._parentSelected);
  } else if (defined(stage._parentSelected)) {
    stage._combinedSelected = stage._parentSelected;
  } else {
    stage._combinedSelected = stage._selected;
  }

  // 选中瓦片没有更新并且具有组合选中瓦片
  if (!dirty && defined(stage._combinedSelected)) {
    // 如果没有定义组合瓦片副本，说明有更新？
    if (!defined(stage._combinedSelectedShadow)) {
      return true;
    }

    // 组合选中瓦片长度
    // 遍历组合选中瓦片和组合选中瓦片数组
    // 如果有有不一致的说明有更新
    length = stage._combinedSelected.length;
    for (var i = 0; i < length; ++i) {
      if (stage._combinedSelected[i] !== stage._combinedSelectedShadow[i]) {
        return true;
      }
    }
  }
  return dirty;
}

/**
 * 创建选中瓦片纹理
 */
function createSelectedTexture(stage, context) {
  // 如果选中瓦片没有发生变化，不处理
  if (!stage._selectedDirty) {
    return;
  }

  // 确认销毁 _selectedIdTexture
  stage._selectedIdTexture =
    stage._selectedIdTexture && stage._selectedIdTexture.destroy();
  stage._selectedIdTexture = undefined;

  // 如果没有设置选中的组合瓦片
  // 不处理
  var features = stage._combinedSelected;
  if (!defined(features)) {
    return;
  }

  var i;
  var feature;

  // 遍历所有瓦片
  // 根据 feature.pickIds 和 feature.pickId 统计所需瓦片的数量
  var textureLength = 0;
  var length = features.length;
  for (i = 0; i < length; ++i) {
    feature = features[i];
    if (defined(feature.pickIds)) {
      textureLength += feature.pickIds.length;
    } else if (defined(feature.pickId)) {
      ++textureLength;
    }
  }

  // 如果既没有选中的瓦片，也没有选中的id
  if (length === 0 || textureLength === 0) {
    // max pick id is reserved
    // 保留最大数量选中的id
    var empty = new Uint8Array(4);
    empty[0] = 255;
    empty[1] = 255;
    empty[2] = 255;
    empty[3] = 255;

    // 选中id纹理创建一个 1*1 白色的空白纹理
    stage._selectedIdTexture = new Texture({
      context: context,
      pixelFormat: PixelFormat.RGBA,
      pixelDatatype: PixelDatatype.UNSIGNED_BYTE,
      source: {
        arrayBufferView: empty,
        width: 1,
        height: 1,
      },
      sampler: Sampler.NEAREST,
    });
    return;
  }

  // 将选中的颜色按顺序收集到一个数组里
  var pickColor;
  var offset = 0;
  var ids = new Uint8Array(textureLength * 4);
  for (i = 0; i < length; ++i) {
    feature = features[i];
    if (defined(feature.pickIds)) {
      var pickIds = feature.pickIds;
      var pickIdsLength = pickIds.length;
      for (var j = 0; j < pickIdsLength; ++j) {
        pickColor = pickIds[j].color;
        ids[offset] = Color.floatToByte(pickColor.red);
        ids[offset + 1] = Color.floatToByte(pickColor.green);
        ids[offset + 2] = Color.floatToByte(pickColor.blue);
        ids[offset + 3] = Color.floatToByte(pickColor.alpha);
        offset += 4;
      }
    } else if (defined(feature.pickId)) {
      pickColor = feature.pickId.color;
      ids[offset] = Color.floatToByte(pickColor.red);
      ids[offset + 1] = Color.floatToByte(pickColor.green);
      ids[offset + 2] = Color.floatToByte(pickColor.blue);
      ids[offset + 3] = Color.floatToByte(pickColor.alpha);
      offset += 4;
    }
  }

  // selected 创建一个宽度是纹理数量，高度是1的纹理中
  stage._selectedIdTexture = new Texture({
    context: context,
    pixelFormat: PixelFormat.RGBA,
    pixelDatatype: PixelDatatype.UNSIGNED_BYTE,
    source: {
      arrayBufferView: ids,
      width: textureLength,
      height: 1,
    },
    sampler: Sampler.NEAREST,
  });
}

/**
 * A function that will be called before execute. Used to create WebGL resources and load any textures.
 *
 * 后期处理阶段执行之前执行的函数。
 * 用于创建 WebGL 资源和加载任何纹理。
 *
 * @param {Context} context
 * The context.
 *
 * 运行上下文。
 *
 * @param {Boolean} useLogDepth
 * Whether the scene uses a logarithmic depth buffer.
 *
 * 场景是否使用对数深度缓冲区。
 *
 * @private
 */
PostProcessStage.prototype.update = function (context, useLogDepth) {
  // 不使用的时候释放资源
  // this.enabled = false
  // this._enabled = true;
  // 说明 enabled 状态从启用变成禁用
  if (this.enabled !== this._enabled && !this.enabled) {
    releaseResources(this);
  }

  // 同步 enabled 状态
  this._enabled = this.enabled;

  // 确定不使用，不处理
  if (!this._enabled) {
    return;
  }

  // 记录是否使用对数深度缓冲区发生改变
  this._logDepthChanged = useLogDepth !== this._useLogDepth;
  // 更新是否使用对数深度缓冲区
  this._useLogDepth = useLogDepth;

  // 选中的纹理是否发生变化
  this._selectedDirty = isSelectedTextureDirty(this);

  // 更新当前帧状态
  this._selectedShadow = this._selected;
  this._parentSelectedShadow = this._parentSelected;
  this._combinedSelectedShadow = this._combinedSelected;
  this._selectedLength = defined(this._selected) ? this._selected.length : 0;
  this._parentSelectedLength = defined(this._parentSelected)
    ? this._parentSelected.length
    : 0;

  // 创建选中瓦片纹理
  createSelectedTexture(this, context);
  // 创建 uniform 映射
  createUniformMap(this);
  // 更新 uniform 对应的纹理
  updateUniformTextures(this, context);
  // 创建绘制命令
  createDrawCommand(this, context);
  // 创建取样器
  createSampler(this);

  this._selectedDirty = false;

  if (!this._ready) {
    return;
  }

  var framebuffer = this._textureCache.getFramebuffer(this._name);
  this._command.framebuffer = framebuffer;

  if (!defined(framebuffer)) {
    return;
  }

  var colorTexture = framebuffer.getColorTexture(0);
  var renderState;
  if (
    colorTexture.width !== context.drawingBufferWidth ||
    colorTexture.height !== context.drawingBufferHeight
  ) {
    renderState = this._renderState;
    if (
      !defined(renderState) ||
      colorTexture.width !== renderState.viewport.width ||
      colorTexture.height !== renderState.viewport.height
    ) {
      this._renderState = RenderState.fromCache({
        viewport: new BoundingRectangle(
          0,
          0,
          colorTexture.width,
          colorTexture.height
        ),
      });
    }
  }

  this._command.renderState = renderState;
};

/**
 * Executes the post-process stage. The color texture is the texture rendered to by the scene or from the previous stage.
 * @param {Context} context The context.
 * @param {Texture} colorTexture The input color texture.
 * @param {Texture} depthTexture The input depth texture.
 * @param {Texture} idTexture The id texture.
 * @private
 */
PostProcessStage.prototype.execute = function (
  context,
  colorTexture,
  depthTexture,
  idTexture
) {
  if (
    !defined(this._command) ||
    !defined(this._command.framebuffer) ||
    !this._ready ||
    !this._enabled
  ) {
    return;
  }

  this._colorTexture = colorTexture;
  this._depthTexture = depthTexture;
  this._idTexture = idTexture;

  if (!Sampler.equals(this._colorTexture.sampler, this._sampler)) {
    this._colorTexture.sampler = this._sampler;
  }

  var passState =
    this.scissorRectangle.width > 0 && this.scissorRectangle.height > 0
      ? this._passState
      : undefined;
  if (defined(passState)) {
    passState.context = context;
  }

  this._command.execute(context, passState);
};

/**
 * Returns true if this object was destroyed; otherwise, false.
 * <p>
 * If this object was destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
 * </p>
 *
 * 如果这个对象已经销毁，返回 true，否则返回 false。
 * 如果这个对象销毁了，就不应该使用它。
 * 执行任何 isDestroyed() 以外的函数将导致异常。
 *
 * @returns {Boolean} <code>true</code> if this object was destroyed; otherwise, <code>false</code>.
 *
 * @see PostProcessStage#destroy
 */
PostProcessStage.prototype.isDestroyed = function () {
  return false;
};

/**
 * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
 * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
 * <p>
 * Once an object is destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
 * assign the return value (<code>undefined</code>) to the object as done in the example.
 * </p>
 *
 * 销毁这个对象持有的 WebGL 资源。
 * 销毁一个对象允许确定性的释放 WebGL 资源。
 * 取而代之，依赖垃圾收集器销毁这个对象。
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 * @see PostProcessStage#isDestroyed
 */
PostProcessStage.prototype.destroy = function () {
  releaseResources(this);
  return destroyObject(this);
};
export default PostProcessStage;
