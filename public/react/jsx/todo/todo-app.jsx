import React from 'react';
import {render} from 'react-dom';
import TodoForm from './todo-form';
import TodoList from './todo-list';

let id = 0;

/**
 * Application class to initialise the Todo component.
 */
class TodoApp extends React.Component{
    constructor(props){
        // Pass props to parent class
        super(props);
        // Set initial state
        this.state = {
            data: []
        }
    }

    /**
     * Create a todo object for the provided value and add it to the list of todos.
     *
     * @param {string} val - Todo message
     */
    addTodo(val){
        // Assemble data
        const todo = {text: val, id: id++};
        // Update data
        this.state.data.push(todo);
        // Update state
        this.setState({data: this.state.data});
    }

    /**
     * Remove the todo message matching the provided id.
     *
     * @param {Number} id - Id of the todo to remove
     */
    handleRemove(id){
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if(todo.id !== id) return todo;
        });

        // Update state with filter
        this.setState({data: remainder});
    }

    render(){
        return (
            <div className="todo-container">
                <TodoForm addTodo={this.addTodo.bind(this)} />
                <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)}/>
            </div>
        );
    }
}

render(<TodoApp />, document.getElementById('root'));