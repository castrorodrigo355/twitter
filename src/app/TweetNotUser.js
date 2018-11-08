import React, {Component} from 'react';
import './App.css';

class TweetNotUser extends Component {
    
    render(){
        const {tweet, key} = this.props.informacion;
        return(
            <div className="card border-success mb-3 bg-transparent border-success">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <p className="card-text">{tweet.fecha}</p>
                        </div>
                        <div className="col">
                            <p className="card-text">{tweet.titulo}</p>
                        </div>
                        <div className="col">
                            <p className="card-text">{tweet.likes}</p>
                        </div>                                        
                    </div>
                </div>
                <div className="card-body text-success">
                    <div className="row">
                        <div className="col">
                            <p className="card-text">{tweet.descripcion}</p>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <button type="submit" className="btn btn-primary bg-alert">Retweet</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default TweetNotUser;