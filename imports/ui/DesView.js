import React from 'react';
import BigNumber from 'bignumber.js';

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

    decrypt() {
        console.log("lala")
        this.setState(prevState => ({ result: prevState.input }))
    }   
    
    encrypt() {
        console.log("lolo")
        this.setState(prevState => ({ result: prevState.input }))
    }

    
    generateKey = () => this.setState({ key: BigNumber.random().times(10e16).toString(16) })

    render() {
        return (
            <div className="ui form">
                <div className="field">
                    <input onChange={this.handleInputChange} name="input" type="text" placeholder="Inserta aquí tu texto..."/>
                </div>

                <div className="field">
                    <input value={this.state.key} onChange={this.handleInputChange} name="key" type="text" placeholder="Inserta aquí tu llave..."/>
                </div>

                <div className="ui fluid buttons">
                    <button onClick={this.encrypt} className="ui blue button">Encriptar</button>
                    <div className="or" data-text="o"></div>
                    <button onClick={this.decrypt} className="ui positive button">Desencriptar</button>
                </div>
                <br/>
                <br/>
                <div onClick={this.generateKey} className="ui fluid button">Generar una llave aleatoria</div>

                <h3 className="ui header">Tu resultado es:</h3>
                <h4 className="ui header">{this.state.result}</h4>
            </div>
        );
    }
}

export default DesView;