import React, {Component} from 'react';
import Usuario from './Usuario';
import Tweets from './Tweets';
// import ModalView from './ModalView';
import './App.css';

class Home extends Component {  
    
    render(){
        return(
            <div className="App">
                Bienvenido a Home
                <div className="row">
                    <div className="col-3">
                        <Usuario/>
                    </div>
                    <div className="col-9">
                        <Tweets/>
                    </div>
                </div>  
            </div> 
        );
    }
}
export default Home;