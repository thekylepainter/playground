import React from 'react';
import Form from './form';

// Base style for the form component
require('../../sass/form.scss');

/**
 * Application class to initialise the Form component.
 */
class FormApp extends React.Component{
    constructor(props) {
        super(props);
    }

    /**
     * Empty method stub for submitting a form.
     */
    handleSubmit() {}

    render() {
        return (
            <div>
                <h1>Forms</h1>
                <p className="lead">Provides standard behaviour when validating and submitting forms.</p>

                <div className="component-container form">
                    <Form submit={this.handleSubmit.bind(this)} />
                </div>
            </div>
        );
    }
}

export default FormApp;