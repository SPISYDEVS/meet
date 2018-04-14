import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as event } from "../../index"
const { createEvent } = event;

import Form from "../../../../components/Form"
import {isEmpty, validate} from '../../utils/validate'

const fields = [
    {
        key: 'title',
        label: "Title",
        placeholder: "Title",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        multiline: false,
        type: "text"
    },
    {
        key: 'description',
        label: "Description",
        placeholder: "Description",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        multiline: true,
        type: "text"
    },
];

const error = {
    general: "",
    title: ""
};

class EventForm extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        this.props.createEvent(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        Actions.Main()
    }

    onError(error) {
        let errObj = this.state.error;
        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }

    render() {
        return (
            <Form fields={fields}
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={"SUBMIT"}
                  error={this.state.error}
                  validate={validate}/>
        );
    }
}

export default connect(null, { createEvent })(EventForm);
