import React from 'react';
import Saes from '../crypto/saes';

class SaesView extends React.Component {
    constructor() {
        super();

        this.state = {
            input: '',
            keyword: '',
            result: '',
            exists: {
                input: false,
                keyword: false,
                result: false
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({ [name]: value, exists: {...prevState.exists, [name]: value.length > 0 } }));
    }

    decrypt() {
        this.setState(prevState => ({ result: Saes.decrypt(prevState.input) }))
    }   
    
    encrypt() {
        if(this.state.exists.input && this.state.exists.keyword) {
            Meteor.call('fetchKey', this.state.keyword, (error, result) => {
                if(error)   console.error(error);
                this.setState(prevState => ({ result: Saes.encrypt(prevState.input, result.rows[0]) }))
            });
        }
    }

    render() {
        return (
            <div>
                <h2 className="ui header">Encripción SAES</h2>

                <div className="ui form">
                    <div className="field">
                        <input onChange={this.handleInputChange} name="input" type="text" placeholder="Inserta aquí tu texto..."/>
                    </div>

                    <div className="field">
                        <input onChange={this.handleInputChange} name="keyword" type="text" placeholder="Inserta aquí tu palabra clave..."/>
                    </div>

                    <div className="ui fluid buttons">
                        <button onClick={this.encrypt} className="ui button">Encriptar</button>
                        <div className="or" data-text="o"></div>
                        <button onClick={this.decrypt} className="ui positive button">Desencriptar</button>
                    </div>

                    <h3 className="ui header">Tu resultado es:</h3>
                    <h4 className="ui header">{this.state.result}</h4>
                </div>
            </div>
        );
    }
}

export default SaesView;