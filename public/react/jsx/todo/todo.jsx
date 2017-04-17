import React from 'react';
import PropTypes from 'prop-types';
//noinspection JSUnresolvedVariable
import IconEdit from '../../icons/edit.svg'
//noinspection JSUnresolvedVariable
import IconDelete from '../../icons/delete.svg'

/**
 * A single todo message.
 */
class Todo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.todo = props.todo;
        this.save = props.save;
        this.remove = props.remove;

        this.state = {
            isEditing: false,
            isComplete: this.todo.isComplete,
            text: this.todo.text
        }
    }

    /**
     * When the component is updated and we are editing then we want to focus on the input.
     */
    componentDidUpdate(){
        if (this.state.isEditing) {
            this.input.focus();
        }
    }

    /**
     * Toggle the isEditing state value.
     */
    toggleEdit() {
        this.setState({
            isEditing: !this.state.isEditing
        });
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

    /**
     * Submit the todo message when the enter key is pressed.
     *
     * @param {KeyboardEvent} event - DOM key press event
     */
    handleKeyPress(event) {
        // Save the todo message on enter
        if (event.key === 'Enter') {
            this._saveTodo();
        }
        // On escape we toggle off the edit state and reset the input value
        else if (event.key === 'Escape') {
            this.setState({
                isEditing: false,
                text: this.todo.text
            });
        }
    }

    /**
     * Update the isComplete flag for the todo message and save the change.
     *
     * @param {Event} event - DOM change event
     */
    handleCheck(event) {
        // Call the change function to update the state value
        this.handleChange(event);

        this.todo.isComplete = event.target.checked;

        // Save the updated todo
        this.save(this.todo)
    }

    /**
     * Call the provided method to save the updated todo message.
     *
     * @private
     */
    _saveTodo() {
        this.todo.text = this.state.text;

        // Save the updated todo then toggle off the edit state
        this.save(this.todo)
            .then(this.toggleEdit.bind(this));
    }

    render() {
        let result = null;

        // Render an input when we are editing
        if (this.state.isEditing) {
            result =
                <li>
                    <input type="text" name="text" ref={(input) => this.input = input} value={this.state.text} onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyPress.bind(this)} />
                </li>;
        }
        // Otherwise render the todo item
        else {
            result =
                <li>
                    <input type="checkbox" name="isComplete" checked={this.state.isComplete} onChange={this.handleCheck.bind(this)}/>
                    <span className="text">{this.todo.text}</span>
                    <a href="javascript:" onClick={this.toggleEdit.bind(this)}><IconEdit/></a>
                    <a href="javascript:" onClick={() => this.remove(this.todo.id)}><IconDelete/></a>
                </li>;
        }

        return result;
    }
}

// Define property data types for Todo
//noinspection JSUnresolvedVariable
Todo.propTypes = {
    todo: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
};

export default Todo;