import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
    render() {
        let token = localStorage.getItem('token');
        return (
            <div className="App">
                <Router>
                    {
                        token ?
                            <div>
                                <Route exact path={'/'} component={Home} />
                            </div>
                            :
                            <div>
                                <Login/>
                            </div>
                    }
                </Router>
            </div>
        );
    }
}
export default App;