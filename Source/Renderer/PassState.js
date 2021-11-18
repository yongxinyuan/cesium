/**
 * The state for a particular rendering pass.  This is used to supplement the state
 * in a command being executed.
 *
 * 特定渲染阶段的状态。
 * 这是用来补充要执行的命令的状态。
 *
 * @private
 * @constructor
 */
function PassState(context) {
  /**
   * The context used to execute commands for this pass.
   *
   * 这个阶段执行命令的上下文。
   *
   * @type {Context}
   */
  this.context = context;

  /**
   * The framebuffer to render to.  This framebuffer is used unless a {@link DrawCommand}
   * or {@link ClearCommand} explicitly define a framebuffer, which is used for off-screen
   * rendering.
   *
   * 渲染的帧缓冲区。
   * 默认使用这个帧缓冲区，除非 DrawCommand 或者 ClearCommand 明确定义了用于离屏渲染的帧缓冲区。
   *
   * @type {Framebuffer}
   * @default undefined
   */
  this.framebuffer = undefined;

  /**
   * When defined, this overrides the blending property of a {@link DrawCommand}'s render state.
   * This is used to, for example, to allow the renderer to turn off blending during the picking pass.
   * <p>
   * When this is <code>undefined</code>, the {@link DrawCommand}'s property is used.
   * </p>
   *
   * 如果定义了该属性，将覆盖 DrawCommand 的渲染状态的 blending 属性。
   * 这个用来，例如允许渲染器在选择阶段关闭混合。
   * 当未定义该属性时，使用 DrawCommand 的属性。
   *
   * @type {Boolean}
   * @default undefined
   */
  this.blendingEnabled = undefined;

  /**
   * When defined, this overrides the scissor test property of a {@link DrawCommand}'s render state.
   * This is used to, for example, to allow the renderer to scissor out the pick region during the picking pass.
   * <p>
   * When this is <code>undefined</code>, the {@link DrawCommand}'s property is used.
   * </p>
   *
   * 如果定义了该属性，将覆盖 DrawCommand 的渲染状态的剪裁测试属性。
   * 这个用来，例如允许渲染器在选择阶段关闭混合。
   * 当未定义该属性时，使用 DrawCommand 的属性。
   *
   * @type {Object}
   * @default undefined
   */
  this.scissorTest = undefined;

  /**
   * The viewport used when one is not defined by a {@link DrawCommand}'s render state.
   *
   * 当 DrawCommand 的渲染状态未定义 viewport属性时使用
   *
   * @type {BoundingRectangle}
   * @default undefined
   */
  this.viewport = undefined;
}
export default PassState;
