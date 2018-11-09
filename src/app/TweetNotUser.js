import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import ComentariosTweet from './ComentariosTweet';
import './App.css';

class TweetNotUser extends Component {

    constructor() {
        super();
        this.state = {
            likes: []
        };
    }

    componentDidMount(){
        const idTweet = this.props.informacion.tweet._id;
        const token = localStorage.getItem('token');
        fetch(`/likes/${idTweet}`, {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(likes => {
            this.setState({likes})
        })
        .catch(err => console.log(err));
    }

    likearTweet(idTweet){
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        const id = decoded.id;
        const date = new Date();
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const anio = date.getFullYear();
        const fecha = dia+"/"+mes+"/"+anio;
        fetch(`/likes`, {
            method: 'POST',
            body: JSON.stringify({
                        fecha: fecha,
                        tweetId: idTweet,
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
        })
        .catch(err => console.error(err));
    }
    
    render(){
        const {usuario, tweet, key} = this.props.informacion;
        var usuariosIdLike = this.state.likes.map(elem => elem.usuarioId);
        var bool = usuariosIdLike.includes(usuario._id);
        return(
            <div className="App">
                <div className="card border-success mb-3 bg-transparent border-success">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <p className="card-text">{tweet.fecha}</p>
                            </div>
                            <div className="col">
                                <p className="card-text">{tweet.titulo}</p>
                            </div>
                            <div className="col">
                                <p className="card-text">{this.state.likes.length}</p>
                            </div>
                            <div className="col">
                                    {
                                        bool ?
                                        <button type="submit" onClick={this.likearTweet.bind(this, tweet._id)} className="btn btn-primary bg-secondary" disabled>Like</button>
                                        :
                                        <button type="submit" onClick={this.likearTweet.bind(this, tweet._id)} className="btn btn-primary bg-secondary">Like</button>
                                    }
                            <button type="submit" className="btn btn-primary bg-alert">Retweet</button>
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
                    <div className="card-footer">
                        <ComentariosTweet informacion={{usuario, tweet}}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default TweetNotUser;