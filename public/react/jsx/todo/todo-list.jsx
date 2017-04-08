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

    render() {
        // Map through the todos
        const todoNode = this.todos.map((todo) => {
            return (<Todo todo={todo} key={todo.id} remove={this.remove}/>)
        });

        return (
            <ul className="todo-list">{todoNode}</ul>
        );
    }
}

export default TodoList;