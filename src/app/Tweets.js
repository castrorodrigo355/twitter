import React, {Component} from 'react';
// import Usuarios from './Usuarios';
// import VuelosUsuario from './VuelosUsuario';
// import ModalView from './ModalView';
import './App.css';

class Tweets extends Component {

    constructor() {
        super();
        this.state = {
            tweets: [],
            token: null
        };
    }

    componentDidMount() {
        this.obtenerTweets()
    }

    obtenerTweets(){
        let token = localStorage.getItem('token');
        fetch('/tweets', {
            method: 'GET',
            headers: {
                token
            }
        })
            .then(response => response.json())
            .then(tweets => {
                this.setState({tweets})
            })
            .catch(err => console.log(err));
    }
    
    render() {
        return (
            <div className="App">
                <table className="table table-bordered table-striped rounded">
                        <thead>
                            <tr className="alert alert-danger">
                            <th scope="col"><h4 className="font-italic">titulo</h4></th>
                            <th scope="col"><h4 className="font-italic">fecha</h4></th>
                            <th scope="col"><h4 className="font-italic">descripcion</h4></th>
                            <th scope="col"><h4 className="font-italic">likes</h4></th>
                            <th scope="col"><h4 className="font-italic">Opciones</h4></th>
                            </tr>
                        </thead>
                        {this.state.tweets.map((tw, i) => {
                            return(
                                <tbody className="alert alert-dark" key={i}>
                                    {
                                    <tr>
                                    <td>{tw.titulo}</td>
                                    <td>{tw.fecha}</td>
                                    <td>{tw.descripcion}</td>
                                    <td>{tw.likes}</td>
                                    <td>
                                        <div className="form-row">
                                        <div className="col">
                                            <h6><button className = "badge badge-pill badge-info">Edit</button></h6>
                                        </div>
                                        <div className="col">
                                            <h6><button className = "badge badge-pill btn btn-danger">Delete</button></h6>
                                        </div>
                                        </div>  
                                    </td>
                                    </tr>  
                                    }        
                                </tbody>
                            )          
                            })
                        }
                </table>
            </div>
        );
    }
}
export default Tweets;