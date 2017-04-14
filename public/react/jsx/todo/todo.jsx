import React from 'react';
import IconEdit from '../../icons/edit.svg'
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
            value: this.todo.text
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
        this.setState({value: event.target.value});
    }

    /**
     * Submit the todo message when the enter key is pressed.
     *
     * @param {Event} event - DOM key press event
     */
    handleKeyPress(event) {
        // Save the todo message on enter
        //noinspection JSUnresolvedVariable
        if (event.key === 'Enter') {
            this._saveTodo();
        }
        // On escape we toggle off the edit state and reset the input value
        //noinspection JSUnresolvedVariable
        else if (event.key === 'Escape') {
            this.setState({
                isEditing: false,
                value: this.todo.text
            });
        }
    }

    /**
     * Call the provided method to save the updated todo message.
     *
     * @private
     */
    _saveTodo() {
        this.todo.text = this.state.value;

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
                    <input type="text" ref={(input) => this.input = input} value={this.state.value} onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyPress.bind(this)} />
                </li>;
        }
        // Otherwise render the todo item
        else {
            result =
                <li>
                    <span className="text">{this.todo.text}</span>
                    <a href="javascript:" onClick={this.toggleEdit.bind(this)}><IconEdit/></a>
                    <a href="javascript:" onClick={() => this.remove(this.todo.id)}><IconDelete/></a>
                </li>;
        }

        return result;
    }
}

export default Todo;