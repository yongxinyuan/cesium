import defaultValue from "./defaultValue.js";
import DeveloperError from "./DeveloperError.js";

function returnTrue() {
  return true;
}

/**
 * Destroys an object.  Each of the object's functions, including functions in its prototype,
 * is replaced with a function that throws a {@link DeveloperError}, except for the object's
 * <code>isDestroyed</code> function, which is set to a function that returns <code>true</code>.
 * The object's properties are removed with <code>delete</code>.
 * <br /><br />
 * This function is used by objects that hold native resources, e.g., WebGL resources, which
 * need to be explicitly released.  Client code calls an object's <code>destroy</code> function,
 * which then releases the native resource and calls <code>destroyObject</code> to put itself
 * in a destroyed state.
 *
 * 销毁一个对象。
 * 对象的每个方法，包括原型链方法，都将被替换成抛出异常的函数，
 * 除了 isDestroyed 函数，被设置成返回 true 的函数。
 * 对象的属性使用 delete 删除。
 *
 * 这个函数被持有原生资源的对象使用，比如需要明确释放的 WebGL 资源。
 * 客户端代码调用一个对象的 destroy 函数，然后释放原生资源，
 * 然后执行 destroyObject 函数，将它自己修改成销毁状态。
 *
 * @function
 *
 * @param {Object} object
 * The object to destroy.
 *
 * 要销毁的对象。
 *
 * @param {String} [message]
 * The message to include in the exception that is thrown if
 * a destroyed object's function is called.
 *
 * 一个销毁的对象的函数被执行时，异常信息包含的信息。
 *
 *
 * @example
 * // How a texture would destroy itself.
 * this.destroy = function () {
 *     _gl.deleteTexture(_texture);
 *     return Cesium.destroyObject(this);
 * };
 *
 * @see DeveloperError
 */
function destroyObject(object, message) {
  message = defaultValue(
    message,
    "This object was destroyed, i.e., destroy() was called."
  );

  function throwOnDestroyed() {
    //>>includeStart('debug', pragmas.debug);
    throw new DeveloperError(message);
    //>>includeEnd('debug');
  }

  for (var key in object) {
    if (typeof object[key] === "function") {
      object[key] = throwOnDestroyed;
    }
  }

  object.isDestroyed = returnTrue;

  return undefined;
}
export default destroyObject;
