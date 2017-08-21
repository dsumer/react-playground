import React from "react";
import PropTypes from "prop-types";
import autoBind from "auto-bind";

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.inputs = [];
        this.valid = false;
        this.validatingInputs = [];

        autoBind(this);
    }

    getChildContext() {
        return {
            _reactForm: {
                enableTouchedOnChange: this.props.enableTouchedOnChange,
                attach: this.attachInput,
                validate: this.validateInput
            }
        };
    }

    componentDidMount() {
        this.validate();
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit(this.getValues());
        }

        if (this.isValid()) {
            this.onValidSubmit();
        } else {
            this.onInvalidSubmit();
        }

        return false;
    }

    onValidSubmit() {
        if (this.props.onValidSubmit) {
            this.props.onValidSubmit(this.getValues());
        }
    }

    onInvalidSubmit() {
        if (this.props.onInvalidSubmit) {
            this.props.onInvalidSubmit(this.getValues());
        }
    }

    isValidating() {
        return this.validatingInputs.length > 0;
    }

    isValid() {
        return this.valid && !this.isValidating();
    }

    attachInput(newInput) {
        if (this.inputs.some((input) => input.hasName(newInput.getName()))) {
            throw new Error(`There already exists an input with the name "${newInput.getName()}"`);
        }

        this.inputs.push(newInput);
    }

    validate() {
        this.valid = false;
        this.validatingInputs.push(...this.inputs.map((input) => input.getName()));
        this.onInvalid();

        this.startValidation();
    }

    validateInput(input) {
        // TODO: add all dependent inputs
        this.validatingInputs.push(input.getName());
        this.valid = false;
        this.onInvalid();

        this.startValidation();
    }

    async startValidation() {
        let allValid = true;
        let validatingInputs = this.validatingInputs.map((inputName) => this.inputs.find((input) => input.hasName(inputName)));
        for (let input of validatingInputs) {
            const valid = await input.validate();
            if (!valid) {
                allValid = false;
            }
            this.validatingInputs.splice(this.validatingInputs.indexOf(input.getName()), 1);
        }

        this.validationFinished(allValid);
    }

    validationFinished(valid) {
        if (!this.isValidating()) {
            this.valid = valid;
            if (valid) {
                this.onValid();
            } else {
                this.onInvalid();
            }
        }
    }

    onValid() {
        if (this.props.onValid) {
            this.props.onValid(this.getValues());
        }
    }

    onInvalid() {
        if (this.props.onInvalid) {
            this.props.onInvalid(this.getValues(), this.isValidating());
        }
    }

    getValues() {
        let values = {};

        for (let input of this.inputs) {
            values[input.getName()] = input.getValue();
        }

        return values;
    }

    render() {
        const {children, className} = this.props;

        const formProps = {
            className
        };

        return (
            <form {...formProps} onSubmit={this.onSubmit}>
                {children}
            </form>
        );
    }
}
Form.propTypes = {
    onSubmit: PropTypes.func,
    onValidSubmit: PropTypes.func,
    onInvalidSubmit: PropTypes.func,
    onValid: PropTypes.func,
    onInvalid: PropTypes.func,
    enableTouchedOnChange: PropTypes.bool
};
Form.defaultProps = {
    enableTouchedOnChange: false
};
Form.childContextTypes = {
    _reactForm: PropTypes.object
};