import React from 'react';
import PropTypes from 'prop-types';
import Date from "react-native-datepicker";

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {options, onDateChange, value} = this.props;

        return (
            <Date
                style={{width: 200}}
                date={value}
                mode="date"
                placeholder="select date"
                // format={dateOption.format !== undefined ? dateOption.format : "YYYY-MM-DD"}
                format="YYYY-MM-DD"
                minDate="2010-01-01"
                maxDate="2060-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 18
                    }
                    // ... You can check the source to find the other keys.
                }}
                onDateChange={onDateChange}
                {...options}
            />
        );
    }
}

DatePicker.propTypes = {
    options: PropTypes.object,
    onDateChange: PropTypes.func.isRequired
};

export default DatePicker;