import React, {Component} from 'react';
import Modal from 'react-modal';
import './App.css';

const customStyles = {
    content : {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)'
    }
};

class CommentUser extends Component {

    constructor() {
        super();
        this.state = {
            comentario: '',
            modalIsOpen: false // ----------- ver
        };
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openModal(comentario) {
        this.setState({
            modalIsOpen: true,
            comentario
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

    deleteComentario(idComentario){
        let token = localStorage.getItem('token');
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
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        console.log(value, name);
        this.setState({
          [name]: value
        });
    }

    actualizarComentario(idComentario){
        let token = localStorage.getItem('token');
        fetch(`/comentarios/${idComentario}`, {
            method: 'PUT',
            body: JSON.stringify({comentario: this.state.comentario}),
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
    
    render(){
        const {usuario, tweet, coment, i} = this.props.informacion;
        return(
            <div className="App">
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
                        <button type="submit" className="btn btn-primary bg-alert">Like</button>
                        <button type="submit" onClick={this.openModal.bind(this, coment.comentario)} className="btn btn-primary bg-info">Edit</button>
                            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} 
                                    onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                                <h2 ref={subtitle => this.subtitle = subtitle}>Actualizar Comentario</h2>
                                <form onSubmit={this.actualizarComentario.bind(this, coment._id)}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <input type="text" className="form-control" name="comentario" 
                                                    defaultValue={this.state.comentario} 
                                                    onChange={this.handleInputChange.bind(this)} placeholder="Comentario..."/>
                                        </div>
                                        <div className="form-group form-check">
                                            <button type="submit" className="btn btn-primary bg-info">Aceptar</button>
                                            <button className="btn btn-danger" onClick={this.closeModal}>Cancelar</button>
                                        </div>
                                    </div>
                                </form>
                            </Modal>
                        <button type="submit" onClick={this.deleteComentario.bind(this, coment._id)} className="btn btn-primary bg-danger">Delete</button>
                    </div>
                </div>
            </div> 
        );
    }
}

export default CommentUser;