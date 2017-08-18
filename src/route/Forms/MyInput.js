import React from "react";
import Formsy from "formsy-react";

@Formsy.Decorator()
export default class MyInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pristine: true
        };
        this.onBlur = this.onBlur.bind(this);
    }

    onBlur() {
        if (this.state.pristine) {
            this.setState({
                pristine: false
            });
        }
    }

    renderErrors() {
        let errorMessages = [];
        if (!this.state.pristine) {
            errorMessages = this.props.getErrorMessages();
            if (this.props.showRequired()) {
                errorMessages = this.props.validationErrors.isRequired;
            }
        }

        if (errorMessages && errorMessages.length <= 0) {
            return null;
        }

        return <ul>{errorMessages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
    }

    render() {
        let className = '';
        if (!this.state.pristine) {
            className = this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null;
        }

        return (
            <div>
                <span>{this.props.label} {this.props.isRequired() ? '*' : null}</span>
                <input
                    className={className}
                    value={this.props.getValue()}
                    onChange={(e) => this.props.setValue(e.target.value)} onBlur={this.onBlur}/>
                {this.renderErrors()}
            </div>
        );
    }
}