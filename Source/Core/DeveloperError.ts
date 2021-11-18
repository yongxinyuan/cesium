import defined from "./defined";

/**
 * Constructs an exception object that is thrown due to a developer error, e.g., invalid argument,
 * argument out of range, etc.  This exception should only be thrown during development;
 * it usually indicates a bug in the calling code.  This exception should never be
 * caught; instead the calling code should strive not to generate it.
 * <br /><br />
 * On the other hand, a {@link RuntimeError} indicates an exception that may
 * be thrown at runtime, e.g., out of memory, that the calling code should be prepared
 * to catch.
 *
 * @alias DeveloperError
 * @constructor
 * @extends Error
 *
 * @param {String} [message] The error message for this exception.
 *
 * @see RuntimeError
 */
export default class DeveloperError extends Error {
  /**
   * 'DeveloperError' indicating that this exception was thrown due to a developer error.
   * @type {String}
   * @readonly
   */
  public name: string;

  /**
   * The explanation for why this exception was thrown.
   * @type {String}
   * @readonly
   */
  public message: string;

  /**
   * The stack trace of this exception, if available.
   * @type {String}
   * @readonly
   */
  public stack: string;

  constructor(message: string) {
    super();

    this.name = "DeveloperError";
    this.message = message;

    // Browsers such as IE don't have a stack property until you actually throw the error.
    let stack;

    try {
      throw new Error();
    } catch (e: any) {
      stack = e.stack;
    }

    this.stack = stack;
  }

  toString(): string {
    let str = this.name + ": " + this.message;

    if (defined(this.stack)) {
      str += "\n" + this.stack.toString();
    }

    return str;
  }

  static throwInstantiationError() {
    throw new DeveloperError(
      "This function defines an interface and should not be called directly."
    );
  }
}
