import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import UsuarioProfile from './UsuarioProfile';
import Tweets from './Tweets';
import People from './People';
import Solicitudes from './Solicitudes';
import FormAddTweet from './FormAddTweet';
import './App.css';

class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            usuarioLogueado: {},
            token: null
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const id = decoded.id;
        this.obtenerUser(token, id);
    }

    obtenerUser(token, id){
        fetch(`/usuarios/${id}`, {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(usuarioLogueado => {
            this.setState({usuarioLogueado, token})
        })
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div className="App">
                <div className="row">
                    <div className="col-1"> 
                    </div>
                    <div className="col-2 columna1">
                        <UsuarioProfile usuario={this.state.usuarioLogueado}
                                        token={this.state.token}/>
                        <FormAddTweet   usuario={this.state.usuarioLogueado}
                                        token={this.state.token}/>
                        <People usuario={this.state.usuarioLogueado}
                                token={this.state.token}/>
                    </div>
                    <div className="col-8 columna2">
                        <Solicitudes usuario={this.state.usuarioLogueado}
                                     token={this.state.token}/>
                        <Tweets usuario={this.state.usuarioLogueado}
                                token={this.state.token}/>
                    </div>
                    <div className="col-1">
                    </div>
                </div>
            </div> 
        );
    }
}

export default Home;