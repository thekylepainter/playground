import React from 'react';
import {render} from 'react-dom';
import TodoForm from './todo-form';
import TodoList from './todo-list';

require('../../sass/todo.scss');

/**
 * @typedef {Object} Todo - Represents a object to be displayed in a list of todo items
 * @property {string} id - Identifier for the todo item
 * @property {string} text - Text to display for the todo item
 * @property {boolean} isComplete - Flag to mark a todo item as completed
 * @property {Number} createdAt - Timestamp when the todo item was created as a number
 */

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
     * @return {Promise}
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
        return fetch(this.apiUrl, request)
            .then(res => res.json())
            .then(data => {
                let todos = [...this.state.data, data];
                // Update state
                this.setState({data: todos.sort(TodoApp._sortData)});
            });
    }

    /**
     * Remove the todo message matching the provided id.
     *
     * @param {String} id - Id of the todo to remove
     * @return {Promise}
     */
    handleRemove(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter(todo => todo.id !== id);

        //noinspection JSUnresolvedFunction
        return fetch(this.apiUrl + '/' + id, {method: 'delete'})
            .then(() => {
                // Update state with filter
                this.setState({data: remainder});
            });

    }

    /**
     * Save the provided todo message.
     *
     * @param {Todo} todoToSave - Todo message to save
     * @return {Promise}
     */
    handleSave(todoToSave) {
        // Create a request object to post our todo message
        let request = {
            method: 'put',
            body: JSON.stringify(todoToSave),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        //noinspection JSUnresolvedFunction
        return fetch(this.apiUrl + '/' + todoToSave.id, request)
            .then(res => res.json())
            .then(data => {
                let todos = this.state.data.map(function(todo) {
                    return todo.id === data.id ? data : todo;
                });

                // Update state
                this.setState({data: todos.sort(TodoApp._sortData)});
            });
    }

    /**
     * Fetch todos from our mock api and update the state.
     *
     * @private
     */
    _getData() {
        //noinspection JSUnresolvedFunction
        fetch(this.apiUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({data: data.sort(TodoApp._sortData)});
            });
    }

    /**
     * Sorting function for a list of todo messages. Incomplete todo's should show before complete ones, sorting on
     * created time by default.
     *
     * @param {Todo} a - Todo message
     * @param {Todo} b - Todo message
     * @return {number}
     * @private
     */
    static _sortData(a, b) {
        if (a.isComplete && !b.isComplete) {
            return 1
        } else if (!a.isComplete && b.isComplete) {
            return -1;
        } else {
            return a.createdAt - b.createdAt;
        }
    }

    render() {
        return (
            <div className="todo-container">
                <TodoForm addTodo={this.addTodo.bind(this)} />
                <TodoList todos={this.state.data} save={this.handleSave.bind(this)} remove={this.handleRemove.bind(this)}/>
            </div>
        );
    }
}

render(<TodoApp />, document.getElementById('root'));