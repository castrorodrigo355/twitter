import React, {Component} from 'react';
import './App.css';

class Solicitudes extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            solicitudes: [],
            usuario: {}
        };
    }

    componentDidMount() {
        this.obtenerSolicitudes();
    }

    obtenerSolicitudes(){
        const token = localStorage.getItem('token');
        fetch(`/solicitudes`, {
            method: 'GET',
            headers: {token}
        })
        .then(response => response.json())
        .then(solicitudes => {
            this.setState({solicitudes})
        })
        .catch(err => console.log(err));
    }

    rechazarSolicitud(idSolicitud){
        let token = this.props.token;
        fetch(`/solicitudes/${idSolicitud}`, {
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
        this.obtenerSolicitudes();
    }

    render(){
        const misSolicitudes = this.state.solicitudes.filter(solicitud => solicitud.idReceptor === this.props.usuario._id);
        return(
            <div>
                <ul className="Menutweet" id="elemento">
                    {
                        misSolicitudes && misSolicitudes.map((solicitud, key) => 
                        <li key={key}>
                            {
                                <div className="card letrablanca border m-2 bg-transparent">
                                    <div className="card-header">
                                        {solicitud.nombreEmisor} - {solicitud.apellidoEmisor} - 
                                        <button type="submit" className="btn btn-primary bg-alert">Aceptar</button>
                                        <button type="submit" onClick={this.rechazarSolicitud.bind(this, solicitud._id)} 
                                                className="btn btn-primary bg-danger">Rechazar</button>
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

export default Solicitudes;