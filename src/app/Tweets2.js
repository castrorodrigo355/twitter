import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import jwt_decode from 'jwt-decode';
import Modal from 'react-modal';
import './App.css';

const customStyles = {
    content : {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)'
    }
};

class Tweets2 extends Component {

    constructor() {
        super();
        this.state = {
            tweets: [],
            modalIsOpen: false,
            token: null,
            comentario: '',
            descripcion: '',
            usuarioId: '',
            usuarioLogueado: null,
            tweetId: ''
        };
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.obtenerTweets()
        this.obtenerUser()
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openModal(i) {
        this.setState({
            modalIsOpen: true,
            tweetId: this.state.tweets[i]._id,
            descripcion: this.state.tweets[i].descripcion,
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

    obtenerTweets(){
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        const id = decoded.id;
        fetch('/tweets', {
            method: 'GET',
            headers: {
                token
            }
        })
        .then(response => response.json())
        .then(tweets => {
            this.setState({
                usuarioId: id,
                tweets: tweets})
        })
        .catch(err => console.log(err));
    }

    obtenerUser(){
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        const id = decoded.id;
        fetch(`/usuarios/${id}`, {
            method: 'GET',
            headers: {
                token
            }
        })
        .then(response => response.json())
        .then(usuarioLogueado => {
            this.setState({usuarioLogueado})
            console.log(usuarioLogueado)
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
            body: JSON.stringify({nombre: this.state.usuarioLogueado.nombre,
                                  apellido: this.state.usuarioLogueado.apellido,
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
            this.setState({
                comentario: ''});
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

    retweetear(tweet){
        console.log(tweet)
    }

    deleteTweet(idTweet){
        let token = localStorage.getItem('token');
        fetch(`/tweets/${idTweet}`, {
            method: 'DELETE',
            headers: {
                token
            }
        })
        .then(res => res.json())
        .then(data => {
                console.log(data);
        });
        this.obtenerTweets();
    }

    deleteComentario(idTweet, idComentario){
        let token = localStorage.getItem('token');
        fetch(`/tweets/${idTweet}/comentarios/${idComentario}`, {
            method: 'DELETE',
            headers: {
                token
            }
        })
        .then(res => res.json())
        .then(data => {
                console.log(data);
        });
        this.obtenerTweets();
    }

    actualizarTweet(){
        let token = localStorage.getItem('token');
        fetch(`/tweets/${this.state.tweetId}`, {
            method: 'PUT',
            body: JSON.stringify({descripcion: this.state.descripcion}),
            headers: {
                token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                modalIsOpen: false,
                tweetId: '',
                descripcion: ''
            });
        })
        .catch(err => console.error(err));
    }
    
    render() {
        return (
            <div className="App">
                <ul>
                    {
                        this.state.tweets && this.state.tweets.map((tweet, key) => 
                        <li key={key}>
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
                                            <p className="card-text">{tweet.likes}</p>
                                        </div>
                                        {
                                            this.state.usuarioId === tweet.usuario ?
                                            <div className="col">
                                                <button type="submit" onClick={this.retweetear.bind(this, tweet)} className="btn btn-primary bg-alert">Retweet</button>
                                                <button type="submit" onClick={this.openModal.bind(this, key)} className="btn btn-primary bg-info">Edit</button>
                                                    <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} 
                                                            onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                                                        <h2 ref={subtitle => this.subtitle = subtitle}>Actualizar Tweet</h2>
                                                        <form onSubmit={this.actualizarTweet.bind(this)}>
                                                            <div className="form-row">
                                                                <div className="form-group col-md-6">
                                                                    <input type="text" className="form-control" name="descripcion" 
                                                                            defaultValue={this.state.descripcion} 
                                                                            onChange={this.handleInputChange.bind(this)} placeholder="Descripcion..."/>
                                                                </div>
                                                                <div className="form-group form-check">
                                                                    <button type="submit" className="btn btn-primary bg-info">Aceptar</button>
                                                                    <button className="btn btn-danger" onClick={this.closeModal}>Cancelar</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </Modal>
                                                <button type="submit" onClick={this.deleteTweet.bind(this, tweet._id)} className="btn btn-primary bg-danger">Delete</button>
                                            </div> 
                                            :
                                            <div className="col">
                                            <button type="submit" onClick={this.retweetear.bind(this, tweet)} className="btn btn-primary bg-alert">Retweet</button>
                                        </div>
                                        }
                                        
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
                                    <Collapsible trigger="Comentarios">
                                    <ul>
                                        {
                                            tweet.comentarios.map((coment, i) => 
                                                <li key={i}>
                                                    {
                                                        this.state.usuarioId === coment.autor ?
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
                                                                <button type="submit" onClick={this.deleteComentario.bind(this, tweet._id, coment._id)} className="btn btn-primary bg-danger">Delete</button>
                                                            </div>
                                                        </div>
                                                        :
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
                                                            </div>
                                                        </div>
                                                    }
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

export default Tweets2;