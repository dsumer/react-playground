import React from "react";
import PropTypes from "prop-types";

function Input(WrappedComponent) {
    return class Input extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                value: props.value,
                pristine: true,
                errors: ['test']
            };

            this.isRequired = this.isRequired.bind(this);
            this.isPristine = this.isPristine.bind(this);
            this.isValid = this.isValid.bind(this);
            this.getValue = this.getValue.bind(this);
            this.setValue = this.setValue.bind(this);
            this.getErrorMessages = this.getErrorMessages.bind(this);
            this.onBlur = this.onBlur.bind(this);
        }

        isRequired() {
            return !!this.props.required;
        }

        isPristine() {
            return this.state.pristine;
        }

        isValid() {
            return this.state.errors.length < 1;
        }

        getValue() {
            return this.state.value;
        }

        setValue(value) {
            const isTouchedOnChange = this.props.enableTouchedOnChange;
            if (isTouchedOnChange && this.isPristine()) {
                this.setState({
                    pristine: false
                });
            }

            this.setState({
                value: value
            });
        }

        getErrorMessages() {
            return this.state.errors;
        }

        onBlur() {
            if (this.isPristine()) {
                this.setState({
                    pristine: false
                });
            }
        }

        render() {
            const props = {
                isRequired: this.isRequired,
                isPristine: this.isPristine,
                isValid: this.isValid,
                getValue: this.getValue,
                setValue: this.setValue,
                getErrorMessages: this.getErrorMessages,
                onBlur: this.onBlur,
                ...this.props
            };

            return (
                <WrappedComponent {...props}/>
            );
        }
    }
}
Input.propTypes = {
    enableTouchedOnChange: PropTypes.bool
};
Input.defaultProps = {
    enableTouchedOnChange: false
};

export default Input;