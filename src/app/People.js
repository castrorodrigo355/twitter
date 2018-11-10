import React, {Component} from 'react';
import Modal from 'react-modal';
import './App.css';

const customStyles = {
    content : {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)'
    }
};

class People extends Component {
    
    constructor() {
        super();
        this.state = {
            usuarioVisit: {},
            people: [],
            modalIsOpen: false, // ----------- ver
        };
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.obtenerPeople()
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    openModal(idUser) {
        this.setState({
            modalIsOpen: true
        });
        this.obtenerUser(idUser)
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

    componentDidMount() {
        this.obtenerPeople()
    }

    obtenerPeople(){
        const token = localStorage.getItem('token');
        fetch(`/usuarios`, {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(people => {
            this.setState({people})
        })
        .catch(err => console.log(err));
    }

    obtenerUser(id){
        const token = localStorage.getItem('token');
        fetch(`/usuarios/${id}`, {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(usuarioVisit => {
            this.setState({usuarioVisit})
        })
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <div className="card letrablanca border m-2 bg-transparent">
                    <div className="card-header">
                       USUARIOS DISPONIBLES 
                    </div>
                    <div className="card-body">
                        <ul className="Menutweet">
                            {
                                this.state.people && this.state.people.map((user, key) => 
                                <li key={key}>
                                    <div className="row m-2">
                                        <div className="col">
                                            <button type="submit" onClick={this.openModal.bind(this, user._id)} className="btn btn-primary bg-danger">{user.nombre} {user.apellido}</button>
                                            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} 
                                                    onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                                                <h2 ref={subtitle => this.subtitle = subtitle}>Perfil de usuario</h2>
                                                <div className="card">
                                                    <div className="card-header">
                                                        {this.state.usuarioVisit._id}
                                                    </div>
                                                    <div className="card-body">
                                                        {this.state.usuarioVisit.email} - {this.state.usuarioVisit.dni}
                                                    </div>
                                                    <div className="card-footer">
                                                        <button type="submit" className="btn btn-primary bg-primary">Enviar Solicitud</button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </li>
                                )
                            }
                        </ul>
                    </div>
                </div>   
            </div>
        );
    }
}

export default People;