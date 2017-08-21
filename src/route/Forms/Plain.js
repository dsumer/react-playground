import React from "react";
import Form from "../../component/Form/Form";
import CustomInput from "./CustomInput";
import autoBind from "auto-bind";

export default class Plain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false,
            showEmail2: true
        };

        autoBind(this);
    }

    submit(values) {
        console.log('onSubmit', values);
    }

    validSubmit(values) {
        console.log('onValidSubmit', values);
    }

    invalidSubmit(values) {
        console.log('onInvalidSubmit', values);
    }

    onValid(values) {
        console.log('onValid', values);
        this.setState({
            canSubmit: true
        });
    }

    onInvalid(values, validating) {
        console.log('onInvalid', values, validating);
        this.setState({
            canSubmit: false
        });
    }

    changeEmail2(event) {
        this.setState({
            showEmail2: event.target.checked
        });
    }

    asyncPostValidator(values, value) {
        return new Promise((resolve) => {
            if (!value) {
                resolve(true);
                return;
            }
            if (values.email == 'störtpost') {
                resolve(false);
                return;
            }

            window.fetch('https://jsonplaceholder.typicode.com/posts/' + value).then((response) => {
                response.json().then((data) => {
                    if (data.userId) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        });
    }

    render() {
        let customInput = null
        let equalsFields = ['email'];
        if (this.state.showEmail2) {
            equalsFields.push('email2');
            customInput = <CustomInput name="email2"
                                       label="Email2"
                                       value=""
                                       validations={{
                                           isRequired: true,
                                       }}
                                       validationErrors={{
                                           isRequired: 'Your email2 address is required'
                                       }}/>;
        }

        return (
            <div className="plain">
                <input type="checkbox" checked={this.state.showEmail2} onChange={this.changeEmail2}/> Show Email2
                <Form onSubmit={this.submit}
                      onValidSubmit={this.validSubmit}
                      onInvalidSubmit={this.invalidSubmit}
                      onValid={this.onValid}
                      onInvalid={this.onInvalid}>
                    <CustomInput name="email"
                                 label="Email"
                                 value="a"
                                 validations={{
                                     isRequired: true,
                                     isEmail: true,
                                     maxLength: 50,
                                     equals: "asd"
                                 }}
                                 validationErrors={{
                                     isEmail: 'You have to type valid email',
                                     maxLength: 'You can not type in more than 50 characters',
                                     isRequired: 'Your email address is required'
                                 }}/>
                    <CustomInput name="email_confirm"
                                 label="Email bestätigen"
                                 value=""
                                 validations={{
                                     equalsFields: equalsFields
                                 }}
                                 validationErrors={{
                                     equalsFields: 'Please type in your email correctly'
                                 }}/>
                    {customInput}
                    <CustomInput name="post"
                                 label="Post"
                                 value=""
                                 dependencies={['email']}
                                 validations={{
                                     hasPostId: this.asyncPostValidator
                                 }}
                                 validationErrors={{
                                     hasPostId: 'No PostId!'
                                 }}
                                 required/>
                    <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </Form>
            </div>
        );
    }
}