import React from 'react';
import PropTypes from 'prop-types';
import Date from "react-native-datepicker";
import styles from "./styles";
import {FormValidationMessage} from "react-native-elements";
import {View} from "react-native";
import {isEmpty} from '../../../event/utils/validate'
import formStyles from "../../../../styles/formStyles";

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {options, onDateChange, value} = this.props;

        return (
            <View style={styles.containerView}>
                <Date
                    style={styles.dateContainer}
                    showIcon={false}
                    date={value}
                    mode="date"
                    placeholder="select date"
                    // format={dateOption.format !== undefined ? dateOption.format : "YYYY-MM-DD"}
                    format="YYYY-MM-DD"
                    minDate="2010-01-01"
                    maxDate="2060-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={onDateChange}
                    {...options}
                />

                <FormValidationMessage labelStyle={formStyles.errorText}>
                    {this.props.error}
                </FormValidationMessage>
            </View>
        );
    }
}

DatePicker.propTypes = {
    options: PropTypes.object,
    onDateChange: PropTypes.func.isRequired,
    dateContainerStyle: PropTypes.object
};


DatePicker.defaultProps = {
    dateContainerStyle: {}
};

export default DatePicker;