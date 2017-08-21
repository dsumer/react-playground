import React from "react";
import Form from "../../component/Form/Form";
import CustomInput from "./CustomInput";
import autoBind from "auto-bind";

export default class Plain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false
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

    render() {
        return (
            <div className="plain">
                <Form onSubmit={this.submit}
                      onValidSubmit={this.validSubmit}
                      onInvalidSubmit={this.invalidSubmit}
                      onValid={this.onValid}
                      onInvalid={this.onInvalid}>
                    <CustomInput name="email"
                                 label="Email"
                                 value="as"
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
                    <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </Form>
            </div>
        );
    }
}