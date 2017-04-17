import React from 'react';
import PropTypes from 'prop-types';

/**
 * Render a demo form.
 */
class Form extends React.Component{
    constructor(props) {
        super(props);
        this.submit = props.submit;

        this.state = {
            title: ""
        };
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

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="form-col col-2">
                        <label>
                            Title
                            <select name="title" value={this.state.title} onChange={this.handleChange.bind(this)}>
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
                            <input type="text" />
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
                        <button type="button" className="btn btn-primary">Submit</button>
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