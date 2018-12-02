import React from 'react';
import Saes from '../crypto/saes';
import { RSA } from '../crypto/rsa';

class SaesView extends React.Component {
    constructor() {
        super();

        this.state = {
            cryptosystem: {},
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

    componentDidMount() {
        this.setState({ cryptosystem: RSA.cryptosystem() })
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({ [name]: value, exists: {...prevState.exists, [name]: value.length > 0 } }));
    }

    decrypt() {
        if(this.state.exists.input && this.state.exists.keyword) {
            Meteor.call('fetchKey', this.state.keyword, (error, result) => {
                if(error)   console.error(error);
                this.setState(prevState => ({ result: Saes.decrypt(prevState.input, result.rows[0]) }))
            });
        }
    }

    encrypt() {
        if(this.state.exists.input && this.state.exists.keyword) {
            const { input, keyword, cryptosystem } = this.state;
            const { e, d, n } = cryptosystem;
            const messageHash = RSA.encrypt(input, d, n);
            const keywordHash = RSA.encrypt(keyword, d, n);
            const key = {e, n};
            console.log(input, keyword, key, messageHash, keywordHash);
            Meteor.call('encryptSaesFromServer', input, keyword, key, messageHash, keywordHash, (error, result) => {
                if(error)   console.error(error);
                if(result.message)  console.error(result.message);
                console.log(result);
                this.setState({ result });
            })
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
                        <button onClick={this.encrypt} className="ui blue button">Encriptar</button>
                        <div className="or" data-text="o"></div>
                        <button onClick={this.decrypt} className="ui positive button">Desencriptar</button>
                    </div>

                    {(() => {
                        if(this.state.result.length !== 0)
                            return (
                                <div className="ui segment">
                                    <h3 className="ui header">Tu resultado es:</h3>
                                    <p>{this.state.result}</p>
                                </div>
                            );
                    })()}
                </div>
            </div>
        );
    }
}

export default SaesView;
