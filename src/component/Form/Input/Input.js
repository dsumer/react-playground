import React from "react";
import PropTypes from "prop-types";
import autoBind from "auto-bind";

function Input(WrappedComponent) {
    class Input extends React.Component {
        constructor(props, context) {
            super(props, context);

            this.state = {
                value: props.value,
                pristine: true,
                errors: []
            };

            autoBind(this);
        }

        componentWillMount() {
            this.context._reactForm.attach(this);
        }

        getName() {
            return this.props.name;
        }

        hasName(name) {
            return this.props.name === name;
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
            const isTouchedOnChange = this.context._reactForm.enableTouchedOnChange;
            if (isTouchedOnChange && this.isPristine()) {
                this.setState({
                    pristine: false
                });
            }

            this.setState({
                value: value
            }, () => {
                this.context._reactForm.validate(this);
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

        async validate() {
            return new Promise((resolve) => {
                let valid = this.state.value === 'asd';
                if (valid) {
                    this.setState({
                        errors: []
                    });
                } else {
                    this.setState({
                        errors: ['not asd!']
                    });
                }

                resolve(valid);
            });
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
    Input.propTypes = {
        name: PropTypes.string.isRequired
    };
    Input.contextTypes = {
        _reactForm: PropTypes.object
    };
    return Input;
}

export default Input;