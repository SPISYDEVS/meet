import {ActionConst, Actions, Lightbox, Overlay, Router, Scene, Stack} from 'react-native-router-flux';

import React from 'react';
import {View} from 'react-native';

//Splash Component
import Splash from '../modules/common/components/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/containers/Welcome';
import Register from '../modules/auth/containers/Register';
import CompleteProfile from '../modules/auth/containers/CompleteProfile';
import Login from '../modules/auth/containers/Login';
import ForgotPassword from '../modules/auth/containers/ForgotPassword';
import Profile from '../modules/profile/containers/Profile';
import {Icon} from 'react-native-elements';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

//Import Store, actions
import {store} from '../redux/store'
import {checkLoginStatus} from '../network/firebase/auth/actions';

import {color, navTitleStyle} from "../styles/theme";
import EventForm from "../modules/event/containers/EventForm";
import Events from "../modules/event/containers/MyEvents";
import Feed from "../modules/home/containers/Feed";
import EditProfile from "../modules/profile/containers/EditProfile/EditProfile";
import Search from "../modules/home/components/Search/Search";
import EventDetails from "../modules/event/containers/EventDetails/EventDetails";
import SomeonesProfile from "../modules/people/containers/SomeonesProfile/SomeonesProfile";
import EventSearch from "../modules/home/containers/ExploreSearch/ExploreSearch";
import Settings from "../modules/profile/containers/Settings/Settings";
import HomeScreen from "../modules/home/containers/HomeScreen/HomeScreen";
import GradientBackground from "../modules/auth/components/GradientBackground/GradientBackground";
import EventComments from "../modules/event/containers/EventComments/EventComments";

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
                <Icon color={tabColor} type='material-community' containerStyle={{height: 30, width: 30}}
                      name={this.props.iconName || "bomb"} size={30}/>
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

    onEnter = () => {
        // Actions.replace('Home');
        Actions.refresh({action: new Date().getTime()});
    };

    render() {
        if (!this.state.isReady)
            return <Splash/>;

        return (


            <Router sceneStyle={{backgroundColor: color.background}}>

                <Scene key="root" hideNavBar
                       navigationBarStyle={{backgroundColor: color.background, borderBottomWidth: 0}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.accent_dark}>

                    <Stack modal key="Auth" initial={!this.state.isLoggedIn} hideNavBar duration={500}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} />
                        <Scene key="Register" component={Register} title="Register" />
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" />
                        <Scene key="Login" component={Login} title="Login" />
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password" />
                    </Stack>

                    <Scene key="EventDetails"
                           clone
                           title={null}
                           hideNavBar
                           component={EventDetails}
                           type={ActionConst.REPLACE}/>

                    <Scene key="EditEvent"
                           clone
                           hideTabBar
                           title={null}
                           component={EventForm}
                           hideNavBar
                           type={ActionConst.REPLACE}/>

                    <Scene key="EventComments"
                           clone
                           title={null}
                           hideTabBar
                           component={EventComments}
                           hideNavBar
                           type={ActionConst.REPLACE}/>

                    <Scene key="SomeonesProfile"
                           clone
                           hideNavBar
                           title={null}
                           component={SomeonesProfile}
                           type={ActionConst.REPLACE}/>

                    <Scene key="Main" initial={this.state.isLoggedIn} default="Feed" showLabel={false} tabs={true}
                           activeTintColor={color.tab_active} inactiveTintColor={color.tab_inactive}
                           tabBarStyle={{backgroundColor: color.background}}
                           tabBarPosition="bottom">

                        <Scene key="HomeScreen" initial="Home"
                               backToInitial
                               icon={({focused}) => <TabIcon focused={focused} iconName="search-web"/>}
                        >

                            <Scene key="Home"
                                   title={null}
                                   component={HomeScreen}
                                   hideNavBar
                                   type={ActionConst.REPLACE}
                            />

                        </Scene>

                        <Scene key="EventScreen" default="Events"
                               backToInitial
                               icon={({focused}) => <TabIcon focused={focused} iconName="book-open"/>}>
                            <Scene key="Events"
                                   component={Events}
                                   title="Events"
                                   hideNavBar
                                   type={ActionConst.REPLACE}/>
                            <Scene key="EventForm"
                                   component={EventForm}
                                   hideNavBar
                                   hideTabBar
                                   title="Create an Event"
                                   type={ActionConst.REPLACE}/>

                        </Scene>

                        <Scene key="ProfileScreen" default="Events"
                               backToInitial
                               icon={({focused}) => <TabIcon focused={focused} iconName="account"/>}>

                            <Scene key="Profile"
                                   component={Profile}
                                   title={null}
                                   hideNavBar
                                   type={ActionConst.REPLACE}/>

                            <Scene key="EditProfile"
                                   component={EditProfile}
                                   hideNavBar
                                   title="Edit Profile"
                                   type={ActionConst.REPLACE}/>

                            <Scene key="Settings"
                                   component={Settings}
                                   hideNavBar
                                   title="Settings"
                                   type={ActionConst.REPLACE}/>

                        </Scene>

                    </Scene>
                </Scene>
            </Router>
        )
    }
}
