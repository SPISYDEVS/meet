import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as event} from "../../index"

const {createEvent} = event;

import Form from "../../../../components/Form"
import {isEmpty, validate} from '../../utils/validate'
import {View} from "react-native";
import styles, {indicatorStyles} from "./styles";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import StepIndicator from "react-native-step-indicator";
import {ViewPager} from 'rn-viewpager';
import moment from "moment";

class EventForm extends React.Component {
    constructor() {
        super();

        const forms = [{
            key: 'general',
            fields: [
                {
                    key: 'title',
                    label: "Title",
                    placeholder: "Title",
                    autoFocus: false,
                    secureTextEntry: false,
                    value: "",
                    multiline: false,
                    type: "text",
                    input: "text"
                },
                {
                    key: 'description',
                    label: "Description",
                    placeholder: "Description",
                    autoFocus: false,
                    secureTextEntry: false,
                    value: "",
                    multiline: true,
                    type: "text",
                    input: "text"
                },
                {
                    key: 'date',
                    value: moment(),
                    options: {
                        format: 'MMMM Do YYYY, h:mm a',
                        minuteInterval: 5,
                        mode: 'datetime',
                    },
                    type: 'date',
                    input: "date"
                }
            ],
            error: {
                general: "",
                title: "",
                description: "",
                date: ""
            }
        }, {
            key: 'invites',
            fields: [
                {
                    key: 'name',
                    label: "Name",
                    placeholder: "Name",
                    autoFocus: false,
                    secureTextEntry: false,
                    value: "",
                    multiline: false,
                    type: "text",
                    input: "text"
                },
            ],
            error: {
                general: "",
                name: "",
            }
        }];

        this.state = this.createState(forms);

        //bind functions
        this.setToTab = this.setToTab.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    createState = (forms) => {
        const state = {};

        forms.forEach((form) => {
            state[form.key] = form;
        });

        state['currentPage'] = 0;

        return state;
    };

    setToTab(tabKey) {
        const state = {...this.state};
        state.buttons = [];

        this.state.buttons.forEach((button) => {
            state.buttons.push({
                title: button.title,
                callback: this.setToTab.bind(this),
                selected: button.title === tabKey
            })
        });
        this.setState(state);
    }

    onSubmit = (data) => {
        const nextPage = this.state.currentPage + 1;
        this.toPage(nextPage);
    };

    toPage = (page) => {
        this.setState({currentPage: page});
        this.viewPager.setPage(page);
    };

    onSuccess() {
        Actions.Main()
    };

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

    componentWillReceiveProps(nextProps, nextState) {
        if (nextState.currentPage !== this.state.currentPage) {
            if (this.viewPager) {
                this.viewPager.setPage(nextState.currentPage)
            }
        }
    }

    renderViewPagerPage = (page) => {

        const form = this.state[page];

        console.log(form);
        return (
            <View key={form.key}>
                <Form fields={form.fields}
                      showLabel={false}
                      onSubmit={this.onSubmit}
                      buttonTitle={"NEXT"}
                      error={this.state[form.key].error}
                      validate={validate}/>
            </View>
        )
    };

    renderStepIndicator = params => {
        const {position} = params;

        return (<MaterialIcon {...getStepIndicatorIconConfig(params)}
                              onPress={position < this.state.currentPage ? () => this.toPage(position) : () => {
                              }}/>);
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.stepIndicator}>
                    <StepIndicator renderStepIndicator={this.renderStepIndicator} customStyles={indicatorStyles}
                                   currentPosition={this.state.currentPage}
                                   labels={["Cart", "Delivery Address", "Order Summary", "Payment Method", "Track"]}/>
                </View>
                <ViewPager
                    style={styles.viewPager}
                    ref={(viewPager) => {
                        this.viewPager = viewPager
                    }}
                    onPageSelected={(page) => {
                        this.setState({currentPage: page.position})
                    }}
                    scrollEnabled={false}
                    horizontalScroll={false}
                >
                    {PAGES.map((page) => this.renderViewPagerPage(page))}
                </ViewPager>

            </View>
        );
    }
}

const PAGES = ['general', 'invites'];

const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
        name: 'feed',
        color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
        size: 18,
    };
    switch (position) {
        case 0: {
            iconConfig.name = 'shopping-cart';
            break;
        }
        case 1: {
            iconConfig.name = 'location-on';
            break;
        }
        case 2: {
            iconConfig.name = 'assessment';
            break;
        }
        case 3: {
            iconConfig.name = 'payment';
            break;
        }
        case 4: {
            iconConfig.name = 'track-changes';
            break;
        }
        default: {
            break;
        }
    }
    return iconConfig;
};


export default connect(null, {createEvent})(EventForm);
