import defined from "./defined";
import DeveloperError from "./DeveloperError";

const getUndefinedErrorMessage = (name: string): string => {
  return name + " is required, actual value was undefined";
};

const getFailedTypeErrorMessage = (
  actual: string,
  expected: string,
  name: string
): string => {
  return (
    "Expected " +
    name +
    " to be typeof " +
    expected +
    ", actual typeof was " +
    actual
  );
};

/**
 * Throws if test is not defined
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value that is to be checked
 * @exception {DeveloperError} test must be defined
 */
const CheckDefined = (name: string, test: unknown): void => {
  if (!defined(test)) {
    throw new DeveloperError(getUndefinedErrorMessage(name));
  }
};

/**
 * Throws if test is not typeof 'function'
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @exception {DeveloperError} test must be typeof 'function'
 */
const CheckTypeOfFunc = (name: string, test: unknown): void => {
  if (typeof test !== "function") {
    throw new DeveloperError(
      getFailedTypeErrorMessage(typeof test, "function", name)
    );
  }
};

/**
 * Throws if test is not typeof 'string'
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @exception {DeveloperError} test must be typeof 'string'
 */
const CheckTypeOfString = (name: string, test: unknown): void => {
  if (typeof test !== "string") {
    throw new DeveloperError(
      getFailedTypeErrorMessage(typeof test, "string", name)
    );
  }
};

/**
 * Throws if test is not typeof 'number'
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @exception {DeveloperError} test must be typeof 'number'
 */
const CheckTypeOfNumber = (name: string, test: unknown): void => {
  if (typeof test !== "number") {
    throw new DeveloperError(
      getFailedTypeErrorMessage(typeof test, "number", name)
    );
  }
};

/**
 * Throws if test is not typeof 'number' and less than limit
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @param {Number} limit The limit value to compare against
 * @exception {DeveloperError} test must be typeof 'number' and less than limit
 */
CheckTypeOfNumber.lessThan = (
  name: string,
  test: unknown,
  limit: number
): void => {
  CheckTypeOfNumber(name, test);
  if ((test as number) >= limit) {
    throw new DeveloperError(
      "Expected " +
        name +
        " to be less than " +
        limit +
        ", actual value was " +
        test
    );
  }
};

/**
 * Throws if test is not typeof 'number' and less than or equal to limit
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @param {Number} limit The limit value to compare against
 * @exception {DeveloperError} test must be typeof 'number' and less than or equal to limit
 */
CheckTypeOfNumber.lessThanOrEquals = (
  name: string,
  test: unknown,
  limit: number
): void => {
  CheckTypeOfNumber(name, test);
  if ((test as number) > limit) {
    throw new DeveloperError(
      "Expected " +
        name +
        " to be less than or equal to " +
        limit +
        ", actual value was " +
        test
    );
  }
};

/**
 * Throws if test is not typeof 'number' and greater than limit
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @param {Number} limit The limit value to compare against
 * @exception {DeveloperError} test must be typeof 'number' and greater than limit
 */
CheckTypeOfNumber.greaterThan = (
  name: string,
  test: unknown,
  limit: number
): void => {
  CheckTypeOfNumber(name, test);
  if ((test as number) <= limit) {
    throw new DeveloperError(
      "Expected " +
        name +
        " to be greater than " +
        limit +
        ", actual value was " +
        test
    );
  }
};

/**
 * Throws if test is not typeof 'number' and greater than or equal to limit
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @param {Number} limit The limit value to compare against
 * @exception {DeveloperError} test must be typeof 'number' and greater than or equal to limit
 */
CheckTypeOfNumber.greaterThanOrEquals = (
  name: string,
  test: unknown,
  limit: number
): void => {
  CheckTypeOfNumber(name, test);
  if ((test as number) < limit) {
    throw new DeveloperError(
      "Expected " +
        name +
        " to be greater than or equal to " +
        limit +
        ", actual value was " +
        test
    );
  }
};

/**
 * Throws if test1 and test2 is not typeof 'number' and not equal in value
 *
 * @param {String} name1 The name of the first variable being tested
 * @param {String} name2 The name of the second variable being tested against
 * @param {*} test1 The value to test
 * @param {*} test2 The value to test against
 * @exception {DeveloperError} test1 and test2 should be type of 'number' and be equal in value
 */
CheckTypeOfNumber.equals = (
  name1: string,
  name2: string,
  test1: unknown,
  test2: unknown
): void => {
  CheckTypeOfNumber(name1, test1);
  CheckTypeOfNumber(name2, test2);
  if ((test1 as number) !== (test2 as number)) {
    throw new DeveloperError(
      name1 +
        " must be equal to " +
        name2 +
        ", the actual values are " +
        test1 +
        " and " +
        test2
    );
  }
};

/**
 * Throws if test is not typeof 'object'
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @exception {DeveloperError} test must be typeof 'object'
 */
const CheckTypeOfObject = (name: string, test: unknown): void => {
  if (typeof test !== "object") {
    throw new DeveloperError(
      getFailedTypeErrorMessage(typeof test, "object", name)
    );
  }
};

/**
 * Throws if test is not typeof 'boolean'
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @exception {DeveloperError} test must be typeof 'boolean'
 */
const CheckTypeOfBool = (name: string, test: unknown): void => {
  if (typeof test !== "boolean") {
    throw new DeveloperError(
      getFailedTypeErrorMessage(typeof test, "boolean", name)
    );
  }
};

/**
 * Throws if test is not typeof 'bigint'
 *
 * @param {String} name The name of the variable being tested
 * @param {*} test The value to test
 * @exception {DeveloperError} test must be typeof 'bigint'
 */
const CheckTypeOfBigint = (name: string, test: unknown): void => {
  if (typeof test !== "bigint") {
    throw new DeveloperError(
      getFailedTypeErrorMessage(typeof test, "bigint", name)
    );
  }
};

/**
 * Contains functions for checking that supplied arguments are of a specified type
 * or meet specified conditions
 * @private
 */
const Check = {
  defined: CheckDefined,
  /**
   * Contains type checking functions, all using the typeof operator
   */
  typeOf: {
    func: CheckTypeOfFunc,
    string: CheckTypeOfString,
    number: CheckTypeOfNumber,
    object: CheckTypeOfObject,
    bool: CheckTypeOfBool,
    bigint: CheckTypeOfBigint,
  },
};

export default Check;
