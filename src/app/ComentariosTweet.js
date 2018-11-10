import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import Modal from 'react-modal';
import './App.css';

const customStyles = {
    content : {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)'
    }
};

class ComentariosTweet extends Component {

    constructor() {
        super();
        this.state = {
            comentarios: [],
            comentario: "",
            modalIsOpen: false,
            idComentUpdate:"",
            comentarioUpdate: "",
        };
    }

    componentDidMount(){
        this.obtenerComentarios();
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openModal(coment) {
        this.setState({
            modalIsOpen: true,
            idComentUpdate: coment._id,
            comentarioUpdate: coment.comentario
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

    obtenerComentarios(){
        const idTweet = this.props.tweet._id;
        const token = this.props.token
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

    handleInputChange(e) {
        const {value, name} = e.target;
        this.setState({
          [name]: value
        });
    }

    comentarTweet(token, usuario, tweet){
        // console.log(tweet)
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

    // retweetear(tweet){
    //     console.log(tweet)
    // }

    deleteComentario(idComentario){
        let token = this.props.token;
        fetch(`/comentarios/${idComentario}`, {
            method: 'DELETE',
            headers: {
                token
            }
        })
        .then(res => res.json())
        .then(data => {
                console.log(data);
        });
        this.obtenerComentarios()
    }

    actualizarComentario(idComentario){
        let token = this.props.token;
        fetch(`/comentarios/${idComentario}`, {
            method: 'PUT',
            body: JSON.stringify({comentario: this.state.comentarioUpdate}),
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
                comentarioUpdate: ''
            });
        })
        .catch(err => console.error(err));
    }
    
    render(){
        const {token, usuario, tweet} = this.props
        return(
            <div>
                <Collapsible trigger="Comentarios">
                <ul className="Menu">
                        {
                            this.state.comentarios.map((coment, i) => 
                                <li key={i}>
                                    {
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
                                                <p className="card-text">{coment.comentario}</p>
                                            </div>
                                            <div className="card-footer">
                                                {
                                                    coment.usuarioId === usuario._id ?
                                                    <div className="row">
                                                        <div className="col">
                                                            <button type="submit" className="btn btn-primary bg-alert">Retweet</button>
                                                        </div>
                                                        <div className="col">
                                                            <button type="submit" className="btn btn-primary bg-secondary">Like</button>
                                                        </div>
                                                        <div className="col">
                                                        <button type="submit" onClick={this.openModal.bind(this, coment)} className="btn btn-primary bg-info">Edit</button>
                                                        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} 
                                                                    onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                                                                <h2 ref={subtitle => this.subtitle = subtitle}>Actualizar Tweet</h2>
                                                                <form onSubmit={this.actualizarComentario.bind(this, this.state.idComentUpdate)}>
                                                                    <div className="form-row">
                                                                        <div className="form-group col-md-6">
                                                                            <input type="text" className="form-control" name="comentarioUpdate" 
                                                                                    defaultValue={this.state.comentarioUpdate} 
                                                                                    onChange={this.handleInputChange.bind(this)} placeholder="Comentario..."/>
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
                                                        <button type="submit" onClick={this.deleteComentario.bind(this, coment._id)} className="btn btn-primary bg-danger">Delete</button>
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
                                    }
                                    
                                </li>
                            )
                        }
                        <form >
                            <div onClick={this.comentarTweet.bind(this, token, usuario, tweet)} className="form-row">
                                <div className="form-group col-md-4">   
                                    <input type="text" className="form-control" name="comentario" 
                                            onChange={this.handleInputChange.bind(this)} value={this.state.comentario} placeholder="Comentario..."/>
                                </div>
                                <div className="form-group form-check">
                                    <button type="submit" className="btn btn-primary bg-info">Comentar</button>
                                </div>
                            </div>
                        </form>
                    </ul>
                </Collapsible>
            </div> 
        );
    }
}

export default ComentariosTweet;