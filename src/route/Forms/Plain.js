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

    render() {
        let customInput = null;
        if (this.state.showEmail2) {
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
                <input type="checkbox" checked={this.state.showEmail2} onChange={this.changeEmail2} /> Show Email2
                <Form onSubmit={this.submit}
                      onValidSubmit={this.validSubmit}
                      onInvalidSubmit={this.invalidSubmit}
                      onValid={this.onValid}
                      onInvalid={this.onInvalid}>
                    <CustomInput name="email"
                                 label="Email"
                                 value=""
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
                    {customInput}
                    <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </Form>
            </div>
        );
    }
}