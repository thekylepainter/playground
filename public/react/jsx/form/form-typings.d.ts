/**
 * Array of {@link Validator}.
 */
type Validators<T extends Validator> = [T];

/**
 * Interface for a form control which can be either an input, select or text area element.
 */
interface FormControlElement extends HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement {}

/**
 * React component class to render a form which exposes a API which can be used when validating and submitting the form.
 */
declare class Form {
    constructor(props: Object);
    handleChange(event: Event);
    handleSubmit(event: Event);
    registerControl(ref: FormControlElement | null);
    _findFirstInvalidControl() : FormControl | null;
    static registerAttributeValidators(control: FormControl);

    /**
     * Function to call when submitting the form which is provided when instantiating for {@link Form} component.
     */
    submit();

    /**
     * Map of {@link FormControl} which are registered within the form.
     */
    controls: Map;

    /**
     * Class to apply when the form is submitted.
     */
    _submittedClass: string;
}

/**
 * Represent an element within a html form and provides an API to validate the current state of a form control.
 */
declare class FormControl {
    constructor(ref: FormControlElement);
    validate();

    /**
     * Reference to the HTML form control element the control is linked to.
     */
    ref: FormControlElement;

    /**
     * Array of validators which will be called as a pipeline to validate the form control state.
     */
    validators: Validators;

    /**
     * Map of all the validation errors for the current form control. The key of the error map is the key of the failed
     * {@link Validator}.
     */
    errors: {string, boolean};

    /**
     * Class to apply for invalid form controls.
     */
    _invalidClass: string;
}

/**
 * Base class for a {@link FormControl} validator.
 */
declare abstract class Validator {
    constructor(key: string);
    abstract validate(value: string);

    /**
     * The name to be used to represent the current {@link Validator} in a {@link FormControl} instance.
     */
    key: string;
}

/**
 * Represents a regex pattern validator for a field in a form. This will test the value of a {@link FormControl} to
 * determine if it matches the defined regex pattern.
 */
declare class PatternValidator extends Validator {
    constructor(key: string, pattern: string);
    validate(value: string);

    /**
     * Regular expression which should be tested against the value of a {@link FormControl} to determine if it is valid.
     * If the provided value string matches then regular expression then it is considered valid.
     */
    regexPattern: RegExp;
}

/**
 * Represents a validator for a required field in a form. If the field is empty or whitespace it is considered invalid.
 */
declare class RequiredValidator extends PatternValidator, Validator {
    constructor();
}
