import React from 'react';
import {render} from 'react-dom';
import TodoApp from './todo/todo-app';
import FormApp from './form/form-app';
import {
    HashRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';

/**
 * Basic HTML component for the home page.
 */
const Home = () => (
    <div>
        <h1>React JS</h1>

        <p className="lead">Overview of my thoughts and experience with React JS.</p>
    </div>
);

/**
 * Class to initialise the application.
 */
class App extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">
                        <ul className="nav nav-sidebar">
                            <li><NavLink exact to="/" activeClassName="active">Overview</NavLink></li>
                            <li><NavLink to="/todo-list" activeClassName="active">To Do List</NavLink></li>
                            <li><NavLink to="/form" activeClassName="active">Form</NavLink></li>
                        </ul>
                    </div>

                    <div className="content col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2">
                        <Route exact path="/" component={Home}/>
                        <Route path="/todo-list" component={TodoApp}/>
                        <Route path="/form" component={FormApp}/>
                    </div>
                </div>
            </Router>
        );
    }
}

render(<App/>, document.getElementById('root'));