import React from "react";
import Formsy from 'formsy-react';
import MyInput from './MyInput';

import './Forms.css';

class Forms extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false
        };

        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.submit = this.submit.bind(this);
    }

    enableButton() {
        this.setState({
            canSubmit: true
        });
    }

    disableButton() {
        this.setState({
            canSubmit: false
        });
    }

    submit(model) {
        console.log("Submit: ", model);
    }

    render() {
        return (
            <div>
                <h1>Form Validation</h1>
                <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                    <MyInput name="email"
                             label="Email"
                             value=""
                             validations={{
                                 isEmail: true,
                                 maxLength: 50
                             }}
                             validationErrors={{
                                 isEmail: 'You have to type valid email',
                                 maxLength: 'You can not type in more than 50 characters',
                                 isRequired: 'Your email address is required'
                             }}
                             required/>
                    <MyInput name="email_confirm"
                             label="Email bestätigen"
                             value=""
                             validations={{
                                 equalsField: 'email'
                             }}
                             validationErrors={{
                                 equalsField: 'Please type in your email correctly'
                             }}
                             required/>
                    <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </Formsy.Form>
            </div>
        );
    }
}

export default Forms;
