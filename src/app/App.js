import React, { Component } from 'react';
import Estilos from './Estilos';
import Home from './Home';
import Login from './Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

class App extends Component {
    render() {
        let token = localStorage.getItem('token');
        return (
            <div>
                <Router>
                    {
                        token ?
                            <div>
                                <Route exact path={'/'} component={Estilos} />
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