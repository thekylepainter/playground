import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
    render () {
        return (
            <blockquote>
                <p>Placeholder react component</p>
            </blockquote>
        );
    }
}


render(<App/>, document.getElementById('root'));