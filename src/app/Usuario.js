import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
// import logo from './logo.svg';
// import ModalView from './ModalView';
import './App.css';

class Usuario extends Component {

    constructor() {
        super();
        this.state = {
            token: null,
            usuario: {},
            valores: [1,2,3,4,5]
        };
    }
    
    componentDidMount() {
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        const id = decoded.id;
        fetch(`/usuarios/${id}`, {
            method: 'GET',
            headers: {
                token
            }
        })
            .then(response => response.json())
            .then(usuario => {
                this.setState({usuario})
                //console.log(this.state.usuario)
            })
            .catch(err => console.log(err));

        
    }

    render(){
        const usuario = this.state.usuario;
        return(
            
            <div className="App">
                <div className="card border-success mb-3">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <p className="card-text">DATOS DEL USUARIO</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body text-success">
                        <div className="row">
                            <div className="col">
                                <p className="card-text">{usuario.nombre}</p>
                            </div>
                            <div className="col">
                                <p className="card-text">{usuario.apellido}</p>
                            </div>
                            <div className="col">
                                <p className="card-text">{usuario.email}</p>
                            </div>
                        </div>
                        <div className="row">
                            <p className="card-text">{usuario._id}</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col">
                                <p className="card-text">{usuario.dni}</p>
                            </div>
                            <div className="col">
                                <p className="card-text">{usuario.celular}</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </div> 
        );
    }
}

export default Usuario;