import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
import jwt_decode from 'jwt-decode';
import CommentUser from './CommentUser';
import CommentNotUser from './CommentNotUser';
import FormAddComment from './FormAddComment';
import './App.css';

class ComentariosTweet extends Component {

    constructor() {
        super();
        this.state = {
            comentarios: []
        };
    }

    componentDidMount(){
        const idTweet = this.props.informacion.tweet._id;
        const token = localStorage.getItem('token');
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

    // retweetear(tweet){
    //     console.log(tweet)
    // }
    
    render(){
        const {usuario, tweet} = this.props.informacion;
        return(
            <div className="App">
                <Collapsible trigger="Comentarios">
                <div className="row">
                    <ul className="Menu">
                        {
                            this.state.comentarios.map((coment, i) => 
                                <li key={i}>
                                    {
                                        usuario._id === coment.usuarioId ?
                                        <CommentUser informacion={{usuario, tweet, coment, i}}/>  
                                        :
                                        <CommentNotUser informacion={{usuario, tweet, coment, i}}/>
                                    }
                                    
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className="row">
                    <FormAddComment informacion={{usuario, tweet}}/>
                </div>
                </Collapsible>
            </div> 
        );
    }
}

export default ComentariosTweet;