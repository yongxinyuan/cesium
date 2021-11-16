import defaultValue from "../../Core/defaultValue.js";
import LightingModel from "./LightingModel.js";

/**
 * Options for configuring the {@link LightingPipelineStage}
 *
 * 配置 `LightingPipelineStage` 的参数
 *
 * @param {Object} options
 * An object containing the following options
 * 包含如下参数的对象
 * @param {LightingModel} [options.lightingModel=LightingModel.UNLIT]
 * The lighting model to use
 * 使用的灯光模型
 *
 * @alias ModelLightingOptions
 * @constructor
 *
 * @private
 */
export default function ModelLightingOptions(options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);

  /**
   * The lighting model to use, such as UNLIT or PBR. This is determined by
   * the primitive's material.
   *
   * 使用灯光模型，如 `UNLIT` 或者 `PBR`。
   * 由图元的材质决定。
   *
   * @type {LightingModel}
   *
   * @private
   */
  this.lightingModel = defaultValue(options.lightingModel, LightingModel.UNLIT);
}
