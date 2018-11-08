import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import TweetUser from './TweetUser';
import TweetNotUser from './TweetNotUser';
import './App.css';

class Tweets extends Component {

    constructor() {
        super();
        this.state = {
            usuarioLogueado: {},
            tweets: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const id = decoded.id;
        this.obtenerTweets(token)
        this.obtenerUser(token, id)
    }

    obtenerTweets(token){
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

    obtenerUser(token, id){
        fetch(`/usuarios/${id}`, {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(usuarioLogueado => {
            this.setState({usuarioLogueado})
        })
        .catch(err => console.log(err));
    }
    
    render() {
        const usuario = this.state.usuarioLogueado
        return (
            <div className="App">
                <ul className="Menutweet">
                    {
                        this.state.tweets && this.state.tweets.map((tweet, key) => 
                        <li key={key}>
                            {
                                this.state.usuarioLogueado._id === tweet.usuarioId ?
                                <TweetUser informacion={{usuario, tweet, key}}/>  
                                :
                                <TweetNotUser informacion={{usuario, tweet, key}}/>
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