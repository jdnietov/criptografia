import React from 'react';

class DesView extends React.Component {
    constructor() {
        super();

        this.state = {
            input: '',
            result: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
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

    render() {
        return (
            <div>
                <h2 className="ui header">Encripción DES</h2>

                <div className="ui form">
                    <div className="field">
                        <input onChange={this.handleInputChange} name="input" type="text" placeholder="Inserta aquí tu texto..."/>
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

export default DesView;