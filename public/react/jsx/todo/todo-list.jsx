import React from 'react';
import Todo from './todo';

/**
 * Render a list of todo messages.
 */
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.todos = props.todos;
        this.remove = props.remove;
    }

    /**
     * We need to listen for whenever the props change, so we can redefine the list of todos.
     *
     * @param {Object} props - The new props that are coming into this component
     */
    componentWillReceiveProps(props) {
        this.todos = props.todos;
    }

    render() {
        // Map through the todos
        const todoNode = this.todos.map(todo =>
            (<Todo todo={todo} key={todo.id} remove={this.remove}/>)
        );

        return (
            <ul className="todo-list">{todoNode}</ul>
        );
    }
}

export default TodoList;