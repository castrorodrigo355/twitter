import React, {Component} from 'react';
import './App.css';

class FormAddTweet extends Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            descripcion: ''
        };
    }

    handleInputChange(e) {
        const {value, name} = e.target;
        this.setState({
          [name]: value
        });
    }

    agregarTweet(){
        let token = this.props.token;
        const date = new Date();
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const anio = date.getFullYear();
        const fecha = dia+"/"+mes+"/"+anio;
        fetch(`/tweets`, {
            method: 'POST',
            body: JSON.stringify({
                        nombre: this.props.usuario.nombre,
                        apellido: this.props.usuario.apellido,
                        fecha: fecha,
                        descripcion: this.state.descripcion,
                        usuarioId: this.props.usuario._id
            }),
            headers: {
                token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({ descripcion: ''});
        })
        .catch(err => console.error(err));
    }

    render(){
        return(
            <div>
                <div className="card letrablanca border m-2 bg-transparent">
                    <div className="card-header">
                        QUE DESEA TWEETEAR ?
                    </div>
                    <div className="card-body text-success">
                        <form onSubmit={this.agregarTweet.bind(this)}>
                            <div className="form-row m-2">
                                <input type="text" className="form-control" name="descripcion" 
                                        onChange={this.handleInputChange.bind(this)} value={this.state.descripcion} placeholder="Descripcion"/>
                            </div>
                            <div className="form-row m-2">
                                <button type="submit" className="btn btn-primary bg-info">Twittear</button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div> 
        );
    }
}

export default FormAddTweet;