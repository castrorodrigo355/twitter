import React, {Component} from 'react';
import './App.css';

class CommentNotUser extends Component {
    
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
                    </div>
                </div>
            </div> 
        );
    }
}

export default CommentNotUser;