import React, {Component} from 'react';
import Modal from 'react-modal';
import './App.css';

const customStyles = {
    content : {
      top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', background:"black"
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
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            usuarioVisit: {}
        });
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

    EnviarSolicitud(){
        let token = this.props.token;
        const date = new Date();
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const anio = date.getFullYear();
        const fecha = dia+"/"+mes+"/"+anio;
        fetch(`/solicitudes`, {
            method: 'POST',
            body: JSON.stringify({
                        fecha: fecha,
                        idEmisor: this.props.usuario._id,
                        nombreEmisor: this.props.usuario.nombre,
                        apellidoEmisor: this.props.usuario.apellido,
                        aceptado: false,
                        idReceptor: this.state.usuarioVisit._id
            }),
            headers: {
                token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ 
                usuarioVisit: {}
            });
        })
        .catch(err => console.error(err));
    }

    render(){
        const usuarios = this.state.people.filter(usuario => !(usuario._id === this.props.usuario._id))
        return(
            <div>
                <div className="card letrablanca border m-2 bg-transparent">
                    <div className="card-header">
                       USUARIOS DISPONIBLES 
                    </div>
                    <div className="card-body">
                        <ul className="Menutweet">
                            {
                                usuarios && usuarios.map((user, key) => 
                                <li key={key}>
                                    <div className="row m-2">
                                        <div className="col">
                                            <button type="submit" onClick={this.openModal.bind(this, user._id)} className="btn btn-primary bg-danger">{user.nombre} {user.apellido}</button>
                                            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} 
                                                    onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">
                                                <div className="card letrablanca border m-2 bg-transparent">
                                                    <div className="card-header">
                                                        Perfil de Usuario
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-7">
                                                                <form onClick={this.EnviarSolicitud.bind(this)}>
                                                                    <div className="form-group">
                                                                        
                                                                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" disabled
                                                                                defaultValue={this.state.usuarioVisit.nombre}/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        
                                                                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" disabled
                                                                                defaultValue={this.state.usuarioVisit.apellido}/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <button type="submit" className="btn btn-primary bg-info">Solicitud</button>
                                                                            </div>
                                                                            <div className="col">
                                                                                <button className="btn btn-danger" onClick={this.closeModal}>Cancelar</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="col-5">
                                                                <img style={{height:"20vh"}} src="data:image/jpeg;base64,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" />
                                                            </div>
                                                        </div>
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