import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
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
            token: null
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
                                                this.state.valores && this.state.valores.map((valor, key) => 
                                                <li key={key}>{valor}</li>
                                                )
                                            }
                                        </ul>
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