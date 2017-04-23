import React from 'react';
import PropTypes from 'prop-types';
import FormControl from './form-control';
import {RequiredValidator} from './validator';

/**
 * React component class to render a form which exposes a API which can be used when validating and submitting the form.
 *
 * @typedef Form
 */
class Form extends React.PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            firstName: ""
        };

        this.submit = props.submit;
        this.controls = new Map();
        this._submittedClass = 'form-submitted';

        // Bind the classes context to our prototyped functions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerControl = this.registerControl.bind(this);
    }

    /**
     * Update the state value when the input changes.
     *
     * @param {Event} event - DOM change event
     */
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // If the change event was fired for a registered form control then we should validate it
        if (this.controls.has(name)) {
            this.controls.get(name).validate();
        }

        // Set the state
        this.setState({
            [name]: value
        });
    }

    /**
     * Check the validity of the form before submitting. If the form is invalid then we want to focus on this first
     * invalid {@link FormControl}, otherwise call the provided submit function.
     *
     * @param {Event} event - DOM submit event
     */
    handleSubmit(event) {
        // Prevent default submit action
        event.preventDefault();

        // Add the submitted class to the form
        this.form.classList.add(this._submittedClass);

        // Find the first invalid form control
        let invalidControl = this._findFirstInvalidControl();

        // If the form is invalid, focus then control and exit out
        if (invalidControl !== null) {
            invalidControl.ref.focus();
            return;
        }

        // If the form is valid then submit
        this.submit();
    }

    /**
     * Register the provided DOM element as a form control. Registering a DOM element as a form control will add it into
     * the validation pipeline. Whenever the value of the element changes, all validators defined for the control will
     * be run to determine if the form is valid for submission.
     *
     * @param {FormControlElement|null} ref - DOM element to register
     */
    registerControl(ref) {
        // This value will be null when the component is unmounted
        if (ref === null) { return; }

        let control = new FormControl(ref);

        this.controls.set(ref.name, control);
        Form.registerAttributeValidators(control);

        // Validate the initial control state
        control.validate();
    }

    /**
     * Return the first form control which is invalid. If there are no invalid controls then {@code null} will be
     * returned.
     *
     * @return {FormControl|null}
     * @private
     */
    _findFirstInvalidControl() {
        for (let control of this.controls.values()) {
            if (!control.isValid()) {
                return control;
            }
        }

        return null;
    }

    /**
     * Register validators for a form control if certain attributes are specified on the element.
     *
     * @param {FormControl} control - Form control to register
     * @static
     */
    static registerAttributeValidators(control) {
        let ref = control.ref;

        if (ref.required) {
            control.validators.push(new RequiredValidator());
        }
    }

    render() {
        return (
            <form ref={(form) => this.form = form} onSubmit={this.handleSubmit} noValidate>
                <div className="form-row">
                    <div className="form-col col-2">
                        <label>
                            Title
                            <select name="title" required ref={this.registerControl} value={this.state.title} onChange={this.handleChange}>
                                <option value="">Select</option>
                                <option value="0">Mr.</option>
                                <option value="1">Mrs.</option>
                                <option value="2">Miss</option>
                                <option value="3">Ms.</option>
                                <option value="4">Dr.</option>
                                <option value="5">Prof.</option>
                                <option value="6">Rev.</option>
                            </select>
                        </label>
                    </div>

                    <div className="form-col col-5">
                        <label>
                            First Name
                            <input type="text" name="firstName" required ref={this.registerControl} value={this.state.firstName} onChange={this.handleChange}/>
                        </label>
                    </div>

                    <div className="form-col col-5">
                        <label>
                            Last Name
                            <input type="text" />
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-col col-6">
                        <label>
                            Email
                            <input type="text" />
                        </label>
                    </div>
                    <div className="form-col col-6">
                        <label>
                            Phone
                            <input type="text" />
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-col align-right">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        );
    }
}

// Define property data types for Form
//noinspection JSUnresolvedVariable
Form.propTypes = {
    submit: PropTypes.func.isRequired
};

export default Form;