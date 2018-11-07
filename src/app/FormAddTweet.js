import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
// import ModalView from './ModalView';
import './App.css';

class FormAddTweet extends Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            descripcion: ''
        };
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        //console.log(value, name);
        this.setState({
          [name]: value
        });
    }

    agregarTweet(){
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        const id = decoded.id;
        const date = new Date();
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const anio = date.getFullYear();
        const fecha = dia+"/"+mes+"/"+anio;
        fetch(`/tweets`, {
            method: 'POST',
            body: JSON.stringify({
                        titulo: this.state.titulo,
                        fecha: fecha,
                        descripcion: this.state.descripcion,
                        likes: 0,
                        comentarios: [],
                        usuarioId: id
            }),
            headers: {
                token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            //window.M.toast({html: 'Task Saved'});
            this.setState({titulo: '', descripcion: ''});
        })
        .catch(err => console.error(err));
    }

    render(){
        return(
            <div className="App">
                <div className="card border-success mb-3">
                    <div className="card-header">
                        QUE ESTAS PENSANDO TWEETEAR ???
                    </div>
                    <div className="card-body text-success">
                        <form onSubmit={this.agregarTweet.bind(this)}>
                            <div className="form-row">
                                <input type="text" className="form-control" name="titulo" 
                                        onChange={this.handleInputChange.bind(this)} value={this.state.titulo} placeholder="Titulo"/>
                            </div>
                            <div className="form-row">
                                <input type="text" className="form-control" name="descripcion" 
                                        onChange={this.handleInputChange.bind(this)} value={this.state.descripcion} placeholder="Descripcion"/>
                            </div>
                                <div className="form-group form-check">
                                    <button type="submit" className="btn btn-primary bg-info">Twittear</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div> 
        );
    }
}

export default FormAddTweet;