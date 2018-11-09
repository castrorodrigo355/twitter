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
            usuarioLogueado: {},
            people: [],
            modalIsOpen: false, // ----------- ver
        };
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    obtenerUser(id){
        const token = localStorage.getItem('token');
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

    obtenerPeople(){
        const token = localStorage.getItem('token');
        fetch('/usuarios', {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(people => {
            this.setState({people})
        })
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div className="App">
                <div className="card">
                    <div className="card-header">
                       USUARIOS DISPONIBLES 
                    </div>
                    <div className="card-body">
                        <ul className="Menutweet">
                            {
                                this.state.people && this.state.people.map((user, key) => 
                                <li key={key}>
                                    {user.nombre} - {user. apellido}
                                    <button type="submit" onClick={this.openModal.bind(this, user._id)} className="btn btn-primary bg-danger">Visit</button>
                                    <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} 
                                            onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                                        <h2 ref={subtitle => this.subtitle = subtitle}>Perfil de usuario</h2>
                                        <div className="card">
                                            <div className="card-header">
                                                {this.state.usuarioLogueado._id}
                                            </div>
                                            <div className="card-body">
                                                {this.state.usuarioLogueado.email} - {this.state.usuarioLogueado.dni}
                                            </div>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-primary bg-primary">Enviar Solicitud</button>
                                            </div>
                                        </div>
                                    </Modal>
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