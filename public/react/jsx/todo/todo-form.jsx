import React from 'react';
import PropTypes from 'prop-types';
//noinspection JSUnresolvedVariable
import IconAdd from '../../icons/add.svg'

/**
 * Allow a user to write a message and add it to the list of todos.
 */
class TodoForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.addTodo = props.addTodo;
        this.state = {value: ''};
    }

    /**
     * Focus on the text input.
     */
    focus() {
        this.input.focus();
    }

    /**
     * Update the state value when the input changes.
     *
     * @param {Event} event - DOM change event
     */
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    /**
     * Add the message when clicking the add button.
     */
    handleClick() {
        this._submitTodo();

        // Refocus on the input
        this.focus();
    }

    /**
     * Submit the todo message when the enter key is pressed.
     *
     * @param {Event} event - DOM key press event
     */
    handleKeyPress(event) {
        //noinspection JSUnresolvedVariable
        if (event.key === 'Enter') {
            this._submitTodo();
        }
    }

    /**
     * Call the provided method to add the message to the list of todos.
     *
     * @private
     */
    _submitTodo() {
        this.addTodo(this.state.value);
        this.setState({value: ''});
    }

    render() {
        return (
            <div className="todo-form">
                <input type="text" ref={(input) => this.input = input} value={this.state.value} onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyPress.bind(this)} />
                <a href="javascript:" onClick={this.handleClick.bind(this)}><IconAdd/></a>
            </div>
        );
    }
}

// Define property data types for TodoForm
//noinspection JSUnresolvedVariable
TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default TodoForm;