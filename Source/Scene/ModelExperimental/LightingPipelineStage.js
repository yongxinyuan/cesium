import ShaderDestination from "../../Renderer/ShaderDestination.js";
import LightingStageFS from "../../Shaders/ModelExperimental/LightingStageFS.js";
import LightingModel from "./LightingModel.js";

/**
 * The lighting pipeline stage is responsible for taking a material and rendering
 * it with a lighting model such as physically based rendering (PBR) or unlit
 * shading
 *
 * 灯光渲染阶段负责选择一个材质，使用类似基于物理渲染（PBR）或者没有灯光的阴影的灯光模型渲染这个材质。
 *
 * @namespace LightingPipelineStage
 *
 * @private
 */
var LightingPipelineStage = {};
LightingPipelineStage.name = "LightingPipelineStage"; // Helps with debugging

/**
 * Process a primitive. This modifies the following parts of the render
 * resources:
 * <ul>
 *   <li>modifies the shader to include the lighting stage</li>
 * </ul>
 *
 * 处理一个图元。这将修改渲染资源的如下部分。
 * 1. 修改着色器来包含灯光阶段
 *
 * @param {PrimitiveRenderResources} renderResources
 * The render resources for the primitive
 * 图元的渲染资源
 * @param {ModelComponents.Primitive} primitive
 * The primitive to be rendered
 * 要渲染的图元
 *
 * @private
 */
LightingPipelineStage.process = function (renderResources, primitive) {
  var lightingOptions = renderResources.lightingOptions;
  var shaderBuilder = renderResources.shaderBuilder;

  // The lighting model is always set by the material. However, custom shaders
  // can override this.

  // 灯光模型总是通过材质设置。然而，自定义着色器可以覆盖它。
  var lightingModel = lightingOptions.lightingModel;

  if (lightingModel === LightingModel.PBR) {
    shaderBuilder.addDefine(
      "LIGHTING_PBR",
      undefined,
      ShaderDestination.FRAGMENT
    );
  } else {
    shaderBuilder.addDefine(
      "LIGHTING_UNLIT",
      undefined,
      ShaderDestination.FRAGMENT
    );
  }

  shaderBuilder.addFragmentLines([LightingStageFS]);
};

export default LightingPipelineStage;
