import React from "react";
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import onClickOutside from 'react-onclickoutside';

import './DatePicker.css';

Datetime.prototype.componentWillReceiveProps = function (nextProps) {
    let updatedState = {};
    if (nextProps.defaultValue !== this.props.defaultValue) {
        updatedState = this.getStateFromProps(nextProps);
    }
    this.setState(updatedState);
};

const DATE_FORMAT = 'DD.MM.YYYY';
const TIME_FORMAT = 'HH:mm';

@onClickOutside
class DatePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    onFocus() {
        this.setState({
            open: true
        });
    }

    onBlur() {
        const fixedValue = moment(this.props.value, DATE_FORMAT).format(DATE_FORMAT);
        if (fixedValue !== 'Invalid date') {
            this.props.onChange(fixedValue);
        }
    }

    handleClickOutside() {
        this.setState({
            open: false
        });
    }

    onChangeInput(event) {
        this.props.onChange(event.target.value);
    }

    onChange(value) {
        this.props.onChange(value.format(DATE_FORMAT));
    }

    renderPicker() {
        if (this.state.open) {
            return (
                <Datetime dateFormat={DATE_FORMAT}
                          timeFormat={false}
                          defaultValue={this.props.value}
                          strictParsing={false}
                          open={true}
                          onChange={this.onChange}
                          input={false}/>
            );
        }
    }

    render() {
        return (
            <div className="datePicker" onClick={this.onFocus}>
                <i>d</i>
                <input type="text"
                       value={this.props.value}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       onChange={this.onChangeInput}/>
                {this.renderPicker()}
            </div>
        );
    }
}

@onClickOutside
class TimePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    onFocus() {
        this.setState({
            open: true
        });
    }

    onBlur() {
        const fixedValue = moment(this.props.value, TIME_FORMAT).format(TIME_FORMAT);
        if (fixedValue !== 'Invalid date') {
            this.props.onChange(fixedValue);
        }
    }

    handleClickOutside() {
        this.setState({
            open: false
        });
    }

    onChangeInput(event) {
        this.props.onChange(event.target.value);
    }

    onChange(value) {
        this.props.onChange(value.format(TIME_FORMAT));
    }

    renderPicker() {
        if (this.state.open) {
            return (
                <Datetime dateFormat={false}
                          timeFormat={TIME_FORMAT}
                          defaultValue={this.props.value}
                          strictParsing={false}
                          open={true}
                          onChange={this.onChange}
                          input={false}/>
            );
        }
    }

    render() {
        return (
            <div className="datePicker" onClick={this.onFocus}>
                <i>t</i>
                <input type="text"
                       value={this.props.value}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       onChange={this.onChangeInput}/>
                {this.renderPicker()}
            </div>
        );
    }
}

export default class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateValue: '05.10.2017',
            timeValue: '00:00'
        };

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
    }

    onChangeDate(value) {
        this.setState({
            dateValue: value
        });
    }

    onChangeTime(value) {
        this.setState({
            timeValue: value
        });
    }

    render() {
        return <div>
            <DatePicker value={this.state.dateValue}
                        onChange={this.onChangeDate}/>
            <TimePicker value={this.state.timeValue}
                        onChange={this.onChangeTime}/>
        </div>;
    }
}