import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import jwt_decode from 'jwt-decode';
import './App.css';

class ComentariosTweet extends Component {

    constructor() {
        super();
        this.state = {
            comentarios: [],
            comentario: ""
        };
    }

    componentDidMount(){
        this.obtenerComentarios();
    }

    obtenerComentarios(){
        const idTweet = this.props.informacion.tweet._id;
        const token = localStorage.getItem('token');
        fetch(`/comentarios/${idTweet}`, {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(comentarios => {
            this.setState({comentarios})
        })
        .catch(err => console.log(err));
    }

    comentarTweet(usuario, tweet){
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        const id = decoded.id;
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
            this.setState({
                comentario: ''});
        })
        .catch(err => console.error(err));
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        this.setState({
          [name]: value
        });
    }

    // retweetear(tweet){
    //     console.log(tweet)
    // }

    // deleteComentario(idTweet, idComentario){
    //     let token = localStorage.getItem('token');
    //     fetch(`/tweets/${idTweet}/comentarios/${idComentario}`, {
    //         method: 'DELETE',
    //         headers: {
    //             token
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //             console.log(data);
    //     });
    //     this.obtenerTweets();
    // }
    
    render(){
        const {usuario, tweet} = this.props.informacion;
        return(
            <div className="App">
                <Collapsible trigger="Comentarios">
                <ul>
                    {
                        this.state.comentarios.map((coment, i) => 
                            <li key={i}>
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col">
                                                <p className="card-text">{coment.nombre}</p>
                                            </div>
                                            <div className="col">
                                                <p className="card-text">{coment.apellido}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{coment.comentario}</h5>
                                        <button type="submit" className="btn btn-primary bg-info">Like</button>
                                        <button type="submit" className="btn btn-primary bg-danger">Delete</button>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
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
                </Collapsible>
            </div> 
        );
    }
}
export default ComentariosTweet;