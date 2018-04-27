import {Scene, Router, ActionConst, Stack, Modal, Tabs, Actions} from 'react-native-router-flux';

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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Import Store, actions
import {store} from '../redux/store'
import {checkLoginStatus} from "../modules/auth/actions";

import {color, navTitleStyle} from "../styles/theme";
import EventForm from "../modules/event/containers/EventForm";
import Events from "../modules/event/containers/Events";
import Home from "../modules/home/containers/Home";
import EditProfile from "../modules/profile/containers/EditProfile/EditProfile";
import Search from "../modules/home/components/Search/Search";

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
                <Icon color={tabColor} style={{height: 24, width: 24}} name={this.props.iconName || "bomb"}
                      size={24}/>
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
                       navigationBarStyle={{backgroundColor: color.main}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.black}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                    </Stack>

                    <Scene key="Main" initial={this.state.isLoggedIn} default="Feed" tabs={true}
                           activeTintColor={color.tab_active} inactiveTintColor={color.tab_inactive}>

                        <Scene key="FeedScreen"
                               component={Home}
                               icon={({focused}) => <TabIcon focused={focused} iconName="search-web"/>}
                               title="Explore"
                               navBar={Search}
                               type={ActionConst.REPLACE}/>

                        <Scene key="EventScreen" default="Events" title="My Events"
                               icon={({focused}) => <TabIcon focused={focused} iconName="book-open"/>}>
                            <Scene key="Events"
                                   component={Events}
                                   title="Events"
                                   renderRightButton={<Icon name="plus" color={color.main} style={{paddingRight: 8}}
                                                            size={32} onPress={() => Actions.push('EventForm')}/>}
                                   type={ActionConst.REPLACE}/>
                            <Scene key="EventForm"
                                   component={EventForm}
                                   title="Create an Event"
                                   type={ActionConst.REPLACE}/>
                        </Scene>

                        <Scene key="ProfileScreen" default="Events" title="My Events"
                               icon={({focused}) => <TabIcon focused={focused} iconName="account"/>}>

                            <Scene key="Profile"
                                   component={Profile}
                                   title={null}
                                   renderRightButton={<Icon name="pencil" color={color.main} style={{paddingRight: 8}}
                                                            size={32} onPress={() => Actions.push('EditProfile')}/>}
                                   type={ActionConst.REPLACE}/>

                            <Scene key="EditProfile"
                                   component={EditProfile}
                                   title="Edit Profile"
                                   type={ActionConst.REPLACE}/>

                        </Scene>

                    </Scene>
                </Scene>
            </Router>
        )
    }
}
