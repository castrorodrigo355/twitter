import React, { Component } from 'react';
import './App.css';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            dni: ''
        }
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        console.log(value, name);
        this.setState({
          [name]: value
        });
    }

    login(){
        console.log(this.state);
        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(result => result.json())
            .then(token => {
                console.log(token);
                localStorage.setItem('token', token);
                window.location.href = "/";
            })
    };

    render(){
        return (
            <div className="App">
                <div className="row">
                    <div className="col-4">

                    </div>
                    <div className="col-4 alert alert-danger d-flex justify-content-center align-items-center">
                        <form onSubmit={this.login.bind(this)} className="form">
                            <div className="form-group form-check">
                                <h4><span className="badge badge-pill badge-info">Ingresar</span></h4>
                            </div>
                            <div className="form-group">
                                    <input type="email" name="email" className="form-control" placeholder="Email" 
                                        onChange={this.handleInputChange.bind(this)} value={this.state.email}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="dni" className="form-control" placeholder="Dni" 
                                        onChange={this.handleInputChange.bind(this)} value={this.state.dni}/>
                            </div>
                            <div className="form-group form-check">
                                <button type="submit" className="btn btn-primary bg-info">Aceptar</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-4">

                    </div>
                </div>
            </div>
        )
    }
}

export default Login;