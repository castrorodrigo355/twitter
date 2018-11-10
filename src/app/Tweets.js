import React, {Component} from 'react';
import Modal from 'react-modal';
import ComentariosTweet from './ComentariosTweet';
import './App.css';

const customStyles = {
    content : {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',position:'fixed'
    }
};

//Modal.setAppElement('body')

class Tweets extends Component {

    constructor() {
        super();
        this.state = {
            tweets: [],
            modalIsOpen: false, // ----------- ver
            idTweetUpdate:"",
            descripcionUpdate: "",
            comentario: ""
        };
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.obtenerTweets();
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openModal(tweet) {
        this.setState({
            modalIsOpen: true,
            idTweetUpdate: tweet._id,
            descripcionUpdate: tweet.descripcion
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        console.log(value, name);
        this.setState({
          [name]: value
        });
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

    actualizarTweet(idTweet){
        let token = this.props.token;
        fetch(`/tweets/${idTweet}`, {
            method: 'PUT',
            body: JSON.stringify({descripcion: this.state.descripcionUpdate}),
            headers: {
                token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                modalIsOpen: false,
                descripcionUpdate: ''
            });
        })
        .catch(err => console.error(err));
    }
    
    render() {
        return (
            <div>
                <ul className="Menutweet" id="elemento">
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
                                                            <button type="submit" onClick={this.openModal.bind(this, tweet)} className="btn btn-primary bg-info">Edit</button>
                                                            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} 
                                                                    onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                                                                <h2 ref={subtitle => this.subtitle = subtitle}>Actualizar Tweet</h2>
                                                                <form onSubmit={this.actualizarTweet.bind(this, this.state.idTweetUpdate)}>
                                                                    <div className="form-row">
                                                                        <div className="form-group col-md-6">
                                                                            <input type="text" className="form-control" name="descripcionUpdate" 
                                                                                    defaultValue={this.state.descripcionUpdate} 
                                                                                    onChange={this.handleInputChange.bind(this)} placeholder="Descripcion..."/>
                                                                        </div>
                                                                        <div className="form-group form-check">
                                                                            <button type="submit" className="btn btn-primary bg-info">Aceptar</button>
                                                                            <button className="btn btn-danger" onClick={this.closeModal}>Cancelar</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </Modal>
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
                                        <ComentariosTweet token={this.props.token}
                                                          usuario={this.props.usuario}
                                                          tweet={tweet}
                                                          key={key}/>
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