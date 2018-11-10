import React, {Component} from 'react';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';
import ComentariosTweet from './ComentariosTweet';
import './App.css';

const customStyles = {
    content : {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)'
    }
};

class TweetUser extends Component {

    constructor() {
        super();
        this.state = {
            descripcion: '',
            modalIsOpen: false, // ----------- ver
            likes: []
        };
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        this.obtenerlikes();

    }

    obtenerlikes(){
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

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openModal(descripcion) {
        this.setState({
            modalIsOpen: true,
            descripcion
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

    deleteTweet(idTweet){
        let token = localStorage.getItem('token');
        fetch(`/tweets/${idTweet}`, {
            method: 'DELETE',
            headers: {
                token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
        this.props.onObtenerTweets();
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        console.log(value, name);
        this.setState({
          [name]: value
        });
    }

    actualizarTweet(idTweet){
        let token = localStorage.getItem('token');
        fetch(`/tweets/${idTweet}`, {
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
            this.setState({
                modalIsOpen: false,
                descripcion: ''
            });
        })
        .catch(err => console.error(err));
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
            // console.log(data);
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
                                <div className="row">
                                    {
                                        bool ?
                                        <button type="submit" onClick={this.likearTweet.bind(this, tweet._id)} className="btn btn-primary bg-secondary" disabled>Like</button>
                                        :
                                        <button type="submit" onClick={this.likearTweet.bind(this, tweet._id)} className="btn btn-primary bg-secondary">Like</button>
                                    }
                                    
                                    <button type="submit" className="btn btn-primary bg-alert">Retweet</button>
                                    <button type="submit" onClick={this.openModal.bind(this, tweet.descripcion)} className="btn btn-primary bg-info">Edit</button>
                                        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} 
                                                onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                                            <h2 ref={subtitle => this.subtitle = subtitle}>Actualizar Tweet</h2>
                                            <form onSubmit={this.actualizarTweet.bind(this, tweet._id)}>
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

export default TweetUser;