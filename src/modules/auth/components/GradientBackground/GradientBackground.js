import React from 'react';
import {color} from "../../../../styles/theme";
import {LinearGradient} from "expo";
import {SafeAreaView, Text, View} from "react-native";

const backgroundGradient = [color.welcome_gradient1, color.welcome_gradient2, color.welcome_gradient3, color.welcome_gradient4, color.welcome_gradient5, color.welcome_gradient6, color.welcome_gradient7];
const DIRECTION_MAGNITUDE = 0.04;

class GradientBackground extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0.5,
            direction: DIRECTION_MAGNITUDE,
            background: [color.welcome_gradient1, color.welcome_gradient7],
        }
    }

    componentDidMount() {
        setInterval(() => {

            let count = this.state.count + this.state.direction;
            let direction = this.state.direction;

            //handle oscillation
            if (count > 1 - DIRECTION_MAGNITUDE) {
                direction = -DIRECTION_MAGNITUDE;
                count = 1;
            } else if (count < DIRECTION_MAGNITUDE) {
                direction = DIRECTION_MAGNITUDE;
                count = 0;
            }

            this.setState({
                count: count,
                direction: direction,
            });
        }, 100);
    }

    render() {

        const start = this.state.count;

        // const background = backgroundGradient.slice(index, backgroundGradient.length).concat(backgroundGradient.slice(0, index));

        return (
                <LinearGradient colors={this.state.background}
                                style={{flex: 1}}
                                start={{x: start}}>
                    {this.props.children}
                </LinearGradient>
        );
    }
}


export default GradientBackground;