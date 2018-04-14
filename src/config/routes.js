import {Scene, Router, ActionConst, Stack, Modal, Tabs} from 'react-native-router-flux';

import React from 'react';
import {
    StatusBar,
    Text,
    View,
    StyleSheet,
    PixelRatio,
} from 'react-native';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/containers/Welcome';
import Register from '../modules/auth/containers/Register';
import CompleteProfile from '../modules/auth/containers/CompleteProfile';
import Login from '../modules/auth/containers/Login';
import ForgotPassword from '../modules/auth/containers/ForgotPassword';
import Profile from '../modules/profile/containers/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

//Import Store, actions
import {store} from '../redux/store'
import {checkLoginStatus} from "../modules/auth/actions";

import {color, navTitleStyle} from "../styles/theme";
import EventForm from "../modules/event/containers/EventForm";
import Events from "../modules/event/containers/Events/Events";

class TabIcon extends React.Component {
    constructor() {
        super();

    }

    render() {
        const tabColor = this.props.focused
            ? color.tab_active : color.tab_inactive;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center'
            }}>
                <Icon color={tabColor} style={{height: 18, width: 18}} name={this.props.iconName || "circle"}
                      size={18}/>
            </View>
        );
    }
}

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>;

        return (
            <Router>

                <Scene key="root" hideNavBar
                       navigationBarStyle={{backgroundColor: "#fff"}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.black}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                    </Stack>

                    <Scene key="Main" initial={this.state.isLoggedIn} default="Profile" tabs={true}
                           activeTintColor={color.tab_active} inactiveTintColor={color.tab_inactive}>
                        <Scene key="Events" component={Events} iconName="tags"
                               icon={({focused}) => <TabIcon focused={focused} iconName="ios-planet"/>}
                               title="Feed"
                               initial={true}
                               type={ActionConst.REPLACE}/>
                        <Scene key="Event" component={EventForm}
                               icon={({focused}) => <TabIcon focused={focused} iconName="ios-planet"/>}
                               title="My Events"
                               type={ActionConst.REPLACE}/>
                        <Scene key="Profile" component={Profile} title="Profile" type={ActionConst.REPLACE}/>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}
