/**
 * Base class for a {@link FormControl} validator.
 *
 * @typedef Validator
 */
class Validator {
    /**
     * Construct a new {@link Validator} with the provided validation key.
     *
     * @param {string} key - Validation key to use
     */
    constructor(key) {
        // Throw an error if key isn't provided
        if (!(typeof(key) === 'string' || key instanceof String)) {
            throw new TypeError("A key string must be provided");
        }

        // Throw an error if a validate function isn't defined
        if (!(typeof(this.validate) === 'function' || this.validate instanceof Function)) {
            throw new TypeError("A validate function must be provided");
        }

        this.key = key;
    }
}

/**
 * Represents a regex pattern validator for a field in a form. This will test the value of a {@link FormControl} to
 * determine if it matches the defined regex pattern.
 *
 * @typedef PatternValidator
 */
class PatternValidator extends Validator {
    /**
     * Construct a new {@link PatternValidator} with the provided validation key and regex pattern to test.
     *
     * @param {string} key - Validation key to use
     * @param {string} pattern - String to convert into a regex pattern
     */
    constructor(key = 'pattern', pattern) {
        super(key);
        this.regexPattern = new RegExp(pattern);

        // Bind the classes context to our prototyped functions
        this.validate = this.validate.bind(this);
    }

    /**
     * Test whether provided value matches the regex pattern. If the value matches then it is considered valid.
     *
     * @param {string} value - Value to test from a {@link FormControl}
     * @return {boolean}
     */
    validate(value) {
        return this.regexPattern.test(value);
    }
}

/**
 * Represents a validator for a required field in a form. If the field is empty or whitespace it is considered invalid.
 *
 * @typedef RequiredValidator
 */
class RequiredValidator extends PatternValidator {
    /**
     * Construct a new {@link RequiredValidator}.
     */
    constructor() {
        super('required', /\S/);
    }
}

export {Validator, PatternValidator, RequiredValidator};