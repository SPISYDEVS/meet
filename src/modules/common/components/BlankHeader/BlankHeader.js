import React from 'react';
import PropTypes from 'prop-types';
import Date from "react-native-datepicker";
import moment from "moment";
import styles from "./styles";

class BlankHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {options, onDateChange, value} = this.props;

    }
}

BlankHeader.propTypes = {
    options: PropTypes.object,
    onDateChange: PropTypes.func.isRequired
};

export default BlankHeader;