import React, {Component} from 'react';
import Collapsible from 'react-collapsible';
// import ModalView from './ModalView';
import './App.css';

class Accordion extends Component {  
    constructor(){
        super();
        this.state = {
            valores: [1,2,3,4,5],
            nombres: ["rodrigo","fernado","giovani"]
        }
    }
    render(){
        return(
            <div className="App">
                <table className="table table-bordered table-striped rounded">
                        <thead>
                            <tr className="alert alert-danger">
                                <th scope="col"><h4 className="font-italic">titulo</h4></th>
                            </tr>
                        </thead>
                        {this.state.valores.map((valor, i) => {
                            return(
                                <tbody className="alert alert-dark" key={i}>
                                    {
                                    <tr>
                                        <td>
                                            <Collapsible trigger={valor}>
                                                <ul className="Menu">
                                                    {
                                                        this.state.nombres && this.state.nombres.map((nombre, key) => 
                                                        <li key={key}>{nombre}</li>
                                                        )
                                                    }
                                                </ul>
                                            </Collapsible>
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
export default Accordion;