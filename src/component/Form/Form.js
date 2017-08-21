import React from "react";

export default class Form extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {

    }

    render() {
        const {children, ...otherProps} = this.props;

        return (
            <form {...otherProps} onSubmit={this.onSubmit}>
                {children}
            </form>
        );
    }
}