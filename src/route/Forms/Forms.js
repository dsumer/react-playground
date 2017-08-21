import React from "react";
import Formsy from "formsy-react";
import MyInput from "./MyInput";
import Plain from "./Plain";

import "./Forms.css";

class Forms extends React.Component {

    constructor(props) {
        super(props);

        this.form = null;
        this.state = {
            canSubmit: false
        };

        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.validate = this.validate.bind(this);
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

    validate(values) {
        if (values.post) {
            window.fetch('https://jsonplaceholder.typicode.com/posts/' + values.post).then((response) => {
                response.json().then((data) => {
                    if (data.userId) {
                        this.form.updateInputsWithError({
                            post: null
                        });
                    } else {
                        this.form.updateInputsWithError({
                            post: 'No UserId!'
                        });
                    }
                    this.form.validateForm();
                });
            });
        }
    }

    submit(model) {
        console.log("Submit: ", model);
    }

    render() {
        return (
            <div>
                <h1>Form Validation</h1>
                <Plain />
                <Formsy.Form onValidSubmit={this.submit}
                             onValid={this.enableButton}
                             onInvalid={this.disableButton}
                             onChange={this.validate}
                             ref={(form) => {
                                 this.form = form;
                             }}>
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
                             }}/>
                    <MyInput name="post"
                             label="Post"
                             value=""
                             validationErrors={{
                                 isRequired: 'Your Post is required'
                             }}
                             required/>
                    <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </Formsy.Form>
            </div>
        );
    }
}

export default Forms;
