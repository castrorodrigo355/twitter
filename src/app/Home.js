import React, {Component} from 'react';
import Usuario from './Usuario';
import Tweets from './Tweets';
import FormAddTweet from './FormAddTweet';
// import ModalView from './ModalView';
import './App.css';

class Home extends Component {  
    
    render(){
        return(
            <div className="App">
                <div className="row">
                    <div className="col">
                        <div className="Header">
                        <p className="card-text">sekfsefmksemfksmfkmefkeks</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 columna1">
                        <Usuario/>
                        <FormAddTweet/>
                    </div>
                    <div className="col-9 columna2">
                        <Tweets/>
                    </div>
                </div>  
            </div> 
        );
    }
}
export default Home;