/**
 * Represent an element within a html form and provides an API to validate the current state of a form control.
 *
 * @typedef FormControl
 */
class FormControl {
    /**
     * Construct a new {@link FormControl} for the provided HTML form element.
     *
     * @param {FormControlElement} ref - Reference to the HTML form control element the control is linked to
     */
    constructor(ref) {
        this.ref = ref;
        this.validators = [];
        this.errors = {};
        this._invalidClass = 'form-control-invalid';

        // Bind the classes context to our prototyped functions
        this.validate = this.validate.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    /**
     * Validate the {@link FormControl}. This will run all the functions in the validators array and set the error keys
     * accordingly for all fails tests.
     */
    validate() {
        this.errors = {};
        let value = this._getValue();

        // Run the validators pipeline
        this.validators.forEach(validator => {
            // If the test fails then set the error key to true
            if (!validator.validate(value)) {
                this.errors[validator.key] = true;
            }
        });

        // Apply classes to the form control to indicate the current validation state
        this._applyValidationClasses();
    }

    /**
     * Determines if the {@link FormControl} is valid.
     *
     * @return {boolean}
     */
    isValid() {
        return Object.keys(this.errors).length === 0;
    }

    /**
     * Apply classes to the {@link FormControl} to reflect whether or not the control is invalid.
     * @private
     */
    _applyValidationClasses() {
        // Add or remove the invalid class for each validator key
        this.validators.forEach(validator => {
            if (this.errors[validator.key]) {
                this.ref.classList.add(`${this._invalidClass}-${validator.key}`);
            } else {
                this.ref.classList.remove(`${this._invalidClass}-${validator.key}`);
            }
        });

        // Add or remove the invalid class from the control
        if (this.isValid()) {
            this.ref.classList.remove(this._invalidClass);
        } else {
            this.ref.classList.add(this._invalidClass);
        }
    }

    /**
     * Retrieve the current element value from the form control.
     *
     * @return {*}
     * @private
     */
    _getValue() {
        return this.ref.type === 'checkbox' ? this.ref.checked : this.ref.value;
    }
}

export default FormControl;