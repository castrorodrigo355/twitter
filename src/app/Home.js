import React, {Component} from 'react';
// import Usuarios from './Usuarios';
// import VuelosUsuario from './VuelosUsuario';
import Tweets from './Tweets';
// import ModalView from './ModalView';
import './App.css';

class Home extends Component {  
    
    render(){
        return(
            <div className="App">
                Bienvenido a Home
                <Tweets/>
                {/* <div className="row">
                    <Usuarios/>
                </div>
                <div className="row">
                    <FormVuelosUsuario/>
                </div>
                <div className="row">
                    <VuelosUsuario/>
                </div> */}
                
            </div> 
        );
    }
}
export default Home;