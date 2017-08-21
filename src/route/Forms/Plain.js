import React from "react";
import Form from "../../component/Form/Form";
import CustomInput from "./CustomInput";

export default class Plain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            canSubmit: false
        };
    }

    render() {
        return (
            <div className="plain">
                <Form>
                    <CustomInput name="email"
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
                    <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </Form>
            </div>
        );
    }
}