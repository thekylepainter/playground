import React from 'react';
require('../../sass/todo.scss');

/**
 * A single todo message.
 */
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.todo = props.todo;
        this.remove = props.remove;
    }

    render() {
        // Each Todo
        return (
            <li onClick={() => this.remove(this.todo.id)}>{this.todo.text}</li>
        );
    }
}

export default Todo;