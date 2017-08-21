import React from "react";
import Input from "../../component/Form/Input/Input";

@Input
export default class CustomInput extends React.Component {

    renderErrors() {
        let errorMessages = [];
        if (!this.props.isPristine()) {
            errorMessages = this.props.getErrorMessages();
        }

        if (!errorMessages || errorMessages.length <= 0) {
            return null;
        }
        if (typeof errorMessages === 'string') {
            return <ul><li>{errorMessages}</li></ul>;
        }

        return <ul>{errorMessages.map((message, i) => <li key={i}>{message}</li>)}</ul>;
    }

    render() {
        let className = '';
        if (!this.props.isPristine()) {
            className = this.props.isValid() ? null : 'error';
        }

        return (
            <div>
                <span>{this.props.label} {this.props.isRequired() ? '*' : null}</span>
                <input
                    className={className}
                    value={this.props.getValue()}
                    onChange={(e) => this.props.setValue(e.target.value)} onBlur={this.props.onBlur}/>
                {this.renderErrors()}
            </div>
        );
    }
}