import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import jwt_decode from 'jwt-decode';
// import Usuarios from './Usuarios';
// import VuelosUsuario from './VuelosUsuario';
// import ModalView from './ModalView';
import './App.css';

class Tweets extends Component {

    constructor() {
        super();
        this.state = {
            tweets: [],
            valores: [1,2,3,4,5],
            token: null,
            comentario: ''
        };
    }

    componentDidMount() {
        this.obtenerTweets()
    }

    obtenerTweets(){
        let token = localStorage.getItem('token');
        fetch('/tweets', {
            method: 'GET',
            headers: {
                token
            }
        })
            .then(response => response.json())
            .then(tweets => {
                this.setState({tweets})
            })
            .catch(err => console.log(err));
    }

    comentarTweet(idTweet){
        //alert(idTweet)
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        const id = decoded.id;
        fetch(`/tweets/${idTweet}/comentarios`, {
            method: 'POST',
            body: JSON.stringify({nombre: decoded.nombre,
                                  apellido: decoded.apellido,
                                  comentario: this.state.comentario,
                                  autor: id}),
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
            this.setState({comentario: ''});
        })
        .catch(err => console.error(err));
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        console.log(value, name);
        this.setState({
          [name]: value
        });
    }
    
    render() {
        return (
            <div className="App">
                <ul>
                    {
                        this.state.tweets && this.state.tweets.map((tweet, key) => 
                        <li key={key}>
                            <div className="card border-success mb-3">
                                <div className="card-header bg-transparent border-success">
                                    <div className="row">
                                        <div className="col">
                                            <p className="card-text">{tweet._id}</p>
                                        </div>
                                        <div className="col">
                                            <p className="card-text">{tweet.fecha}</p>
                                        </div>
                                        <div className="col">
                                            <p className="card-text">{tweet.titulo}</p>
                                        </div>
                                        <div className="col">
                                            <p className="card-text">{tweet.likes}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body text-success">
                                    <div className="row">
                                        <div className="col">
                                            <p className="card-text">{tweet.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-transparent border-success">
                                    <Collapsible trigger="Comentarios">
                                    <ul>
                                        {
                                            tweet.comentarios.map((coment, i) => 
                                                <li key={i}>
                                                    {coment.comentario}
                                                </li>
                                            )
                                        }
                                    </ul>
                                    <form onClick={this.comentarTweet.bind(this, tweet._id)}>
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
                            </div>
                        </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Tweets;