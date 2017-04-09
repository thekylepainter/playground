import React from 'react';
import {render} from 'react-dom';
import TodoForm from './todo-form';
import TodoList from './todo-list';

/**
 * Application class to initialise the Todo component.
 */
class TodoApp extends React.Component{
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: []
        };

        // Mock api url
        this.apiUrl = "http://58e8712d43e10712000e6397.mockapi.io/todos";
    }

    // Lifecycle method
    componentDidMount() {
        this._getData();
    }

    /**
     * Create a todo object for the provided value and add it to the list of todos.
     *
     * @param {string} val - Todo message
     */
    addTodo(val) {
        // Create a request object to post our todo message
        let request = {
            method: 'post',
            body: JSON.stringify({text: val}),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        //noinspection JSUnresolvedFunction
        fetch(this.apiUrl, request)
            .then(res => res.json())
            .then(data => {
                // Update state
                this.setState({data: this.state.data.concat([data])});
            });
    }

    /**
     * Remove the todo message matching the provided id.
     *
     * @param {Number} id - Id of the todo to remove
     */
    handleRemove(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if(todo.id !== id) return todo;
        });

        //noinspection JSUnresolvedFunction
        fetch(this.apiUrl, {method: 'delete'})
            .then(() => {
                // Update state with filter
                this.setState({data: remainder});
            });

    }

    /**
     * Fetch todos from our mock api and update the state.
     * @private
     */
    _getData() {
        //noinspection JSUnresolvedFunction,JSUnusedLocalSymbols
        fetch(this.apiUrl)
            .then(res => res.json())
            .then(data => {
                let todo = {text: 'Todo message'};

                // Works
                this.setState({data: [todo]});
            });
    }

    render() {
        return (
            <div className="todo-container">
                <TodoForm addTodo={this.addTodo.bind(this)} />
                <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)}/>
            </div>
        );
    }
}

render(<TodoApp />, document.getElementById('root'));