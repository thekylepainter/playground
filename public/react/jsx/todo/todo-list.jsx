import React from 'react';
import Todo from './todo';

/**
 * Render a list of todo messages.
 */
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.remove = props.remove;

        this.state = {
            todos: props.todos
        }
    }

    /**
     * We need to listen for whenver the props change, so we can explicitly tell this component
     * to set a new state, which will in effect re-render the component
     *
     * @param props The new props that are coming into this component
     */
    componentWillReceiveProps(props) {
        this.setState({todos: props.todos});
    }

    render() {
        // Map through the todos
        const todoNode = this.state.todos.map((todo, index) => {
            return (<Todo todo={todo} key={index} remove={this.remove}/>)
        });

        return (
            <ul className="todo-list">{todoNode}</ul>
        );
    }
}

export default TodoList;