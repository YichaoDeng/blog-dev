"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "ValidityState";

exports.is = value => {
  return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new globalObject.TypeError(`${context} is not of type 'ValidityState'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["ValidityState"].prototype;
  }

  return Object.create(proto);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = (globalObject, newTarget) => {
  const wrapper = makeWrapper(globalObject, newTarget);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class ValidityState {
    constructor() {
      throw new globalObject.TypeError("Illegal constructor");
    }

    get valueMissing() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get valueMissing' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["valueMissing"];
    }

    get typeMismatch() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get typeMismatch' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["typeMismatch"];
    }

    get patternMismatch() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get patternMismatch' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["patternMismatch"];
    }

    get tooLong() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get tooLong' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["tooLong"];
    }

    get tooShort() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get tooShort' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["tooShort"];
    }

    get rangeUnderflow() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get rangeUnderflow' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["rangeUnderflow"];
    }

    get rangeOverflow() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get rangeOverflow' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["rangeOverflow"];
    }

    get stepMismatch() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get stepMismatch' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["stepMismatch"];
    }

    get badInput() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get badInput' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["badInput"];
    }

    get customError() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get customError' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["customError"];
    }

    get valid() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get valid' called on an object that is not a valid instance of ValidityState."
        );
      }

      return esValue[implSymbol]["valid"];
    }
  }
  Object.defineProperties(ValidityState.prototype, {
    valueMissing: { enumerable: true },
    typeMismatch: { enumerable: true },
    patternMismatch: { enumerable: true },
    tooLong: { enumerable: true },
    tooShort: { enumerable: true },
    rangeUnderflow: { enumerable: true },
    rangeOverflow: { enumerable: true },
    stepMismatch: { enumerable: true },
    badInput: { enumerable: true },
    customError: { enumerable: true },
    valid: { enumerable: true },
    [Symbol.toStringTag]: { value: "ValidityState", configurable: true }
  });
  ctorRegistry[interfaceName] = ValidityState;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: ValidityState
  });
};

const Impl = require("../constraint-validation/ValidityState-impl.js");
