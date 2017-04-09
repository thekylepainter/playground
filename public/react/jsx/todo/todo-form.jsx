import React from 'react';
import IconRemove from '../../icons/add.svg'

/**
 * Allow a user to write a message and add it to the list of todos.
 */
class TodoForm extends React.Component {
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
        if (event.key === 'Enter') {
            this._submitTodo();
        }
    }

    /**
     * Call the provided method to add the message to the list of todos.
     * @private
     */
    _submitTodo() {
        this.addTodo(this.state.value);
        this.setState({value: ''});
    }

    render() {
        return (
            <div className="todo-form">
                <input type="text" ref={(input) => this.input = input} value={this.state.value} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
                <IconRemove onClick={this.handleClick.bind(this)} />
            </div>
        );
    }
}

export default TodoForm;