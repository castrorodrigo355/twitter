import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import TweetUser from './TweetUser';
import TweetNotUser from './TweetNotUser';
import './App.css';

class Tweets extends Component {

    constructor() {
        super();
        this.state = {
            tweets: []
        };
    }

    componentDidMount() {
        this.obtenerTweets();
    }

    obtenerTweets(){
        const token = this.props.token
        fetch('/tweets', {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(tweets => {
            this.setState({tweets})
        })
        .catch(err => console.log(err));
    }

    deleteTweet(idTweet){
        let token = this.props.token;
        fetch(`/tweets/${idTweet}`, {
            method: 'DELETE',
            headers: {
                token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }   
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)   // Uncaught (in promise) SyntaxError: Unexpected end of JSON input at eval (Tweets.js:83)
        });
        this.obtenerTweets()
    }
    
    render() {
        return (
            <div>
                <ul className="Menutweet">
                    {
                        this.state.tweets && this.state.tweets.map((tweet, key) => 
                        <li key={key}>
                            {
                                <div className="card letrablanca border m-2 bg-transparent">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="row">
                                                    <div className="col">
                                                        <p className="card-text">{tweet.nombre}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="card-text">{tweet.apellido}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="card-text">{tweet.fecha}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                {
                                                    tweet.usuarioId === this.props.usuario._id ?
                                                    <div className="row">
                                                        <div className="col">
                                                            <button type="submit" className="btn btn-primary bg-alert">Retweet</button>
                                                        </div>
                                                        <div className="col">
                                                            <button type="submit" className="btn btn-primary bg-secondary">Like</button>
                                                        </div>
                                                        <div className="col">
                                                            <button type="submit" className="btn btn-primary bg-info">Edit</button>
                                                        </div>
                                                        <div className="col">
                                                            <button type="submit" onClick={this.deleteTweet.bind(this, tweet._id)} className="btn btn-primary bg-danger">Delete</button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="row">
                                                        <div className="col">
                                                            <button type="submit" className="btn btn-primary bg-alert">Retweet</button>
                                                        </div>
                                                        <div className="col">
                                                            <button type="submit" className="btn btn-primary bg-secondary">Like</button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{tweet.descripcion}</p>
                                    </div>
                                    <div className="card-footer">
                                        ksfksñenfksñnnsek
                                    </div>
                                </div>
                            }
                        </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Tweets;