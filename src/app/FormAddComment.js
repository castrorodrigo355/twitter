import React, {Component} from 'react';
//import jwt_decode from 'jwt-decode';
import './App.css';

class FormAddComment extends Component {

    constructor() {
        super();
        this.state = {
            comentario: ""
        };
    }

    comentarTweet(usuario, tweet){
        let token = localStorage.getItem('token');
        // var decoded = jwt_decode(token);
        // const id = decoded.id;
        fetch(`/comentarios`, {
            method: 'POST',
            body: JSON.stringify({nombre: usuario.nombre,
                                  apellido: usuario.apellido,
                                  comentario: this.state.comentario,
                                  tweetId: tweet._id,
                                  usuarioId: usuario._id}),
            headers: {
                token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({comentario: ""})
        })
        .catch(err => console.error(err));
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        this.setState({
          [name]: value
        });
    }
    
    render(){
        const {usuario, tweet} = this.props.informacion;
        return(
            <div className="App">
                <form onClick={this.comentarTweet.bind(this, usuario, tweet)}>
                    <div className="form-row">
                        <div className="form-group col-md-4">   
                            <input type="text" className="form-control" name="comentario" 
                                    onChange={this.handleInputChange.bind(this)} value={this.state.comentario} placeholder="Comentario..."/>
                        </div>
                        <div className="form-group form-check">
                            <button type="submit" className="btn btn-primary bg-info">Comentar</button>
                        </div>
                    </div>
                </form>
            </div> 
        );
    }
}

export default FormAddComment;