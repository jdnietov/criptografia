import React from 'react';
import BigNumber from 'bignumber.js';
import apiDES from '../crypto-des/apiDES.js';

class DesView extends React.Component {
    constructor() {
        super();

        this.state = {
            input: '',
            result: '',
            key: '',
            checking: false,
            exists: {
                input: false,
                result: false,
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputCh = this.handleInputCh.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
    }

    componentDidMount() {
        BigNumber.config({ CRYPTO: true, DECIMAL_PLACES: 16 });
    }

    handleInputChange(e) {
        this.setState({ input: e.target.value });
    }

    handleInputCh(e) {
        this.setState({ key: e.target.value });
    }

    decrypt() {
        //let myKey = "hola1234"
        console.log(this.state.key);
        console.log(this.state.input);
        this.setState(prevState => ({ result: apiDES.getParams(this.state.input, this.state.key, false) }))
    }

    encrypt() {
        console.log(this.state.key);
        console.log(this.state.input);
        //let myKey = "hola1234"
        this.setState(prevState => ({ result: apiDES.getParams(this.state.input, this.state.key, true) }))
    }


    generateKey = () => this.setState({ key: BigNumber.random().times(10e16).toString(16) });

    render() {
        return (
            <div className="ui form">
                <h2 className="ui header">Encripción DES</h2>
                <div className="field">
                    <input onChange={this.handleInputChange} name="input" type="text" placeholder="Inserta aquí tu texto..."/>
                </div>

                <div className="field">
                    <input onChange={this.handleInputCh} name="key" type="text" placeholder="Inserta aquí tu llave..."/>
                </div>

                <div className="ui fluid buttons">
                    <button onClick={this.encrypt} className="ui blue button">Encriptar</button>
                    <div className="or" data-text="o"></div>
                    <button onClick={this.decrypt} className="ui positive button">Desencriptar</button>
                </div>
                <br/>
                <br/>
                <div onClick={this.generateKey} className="ui fluid button">Generar una llave aleatoria</div>

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
        );
    }
}

export default DesView;
