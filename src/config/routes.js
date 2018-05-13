import {ActionConst, Actions, Router, Scene, Stack} from 'react-native-router-flux';

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
import EventSearch from "../modules/home/containers/EventSearch/EventSearch";
import Settings from "../modules/profile/containers/Settings/Settings";

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
                <Icon color={tabColor} type='material-community' containerStyle={{height: 24, width: 24}} name={this.props.iconName || "bomb"} size={24}/>
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
                       navigationBarStyle={{backgroundColor: color.background, borderBottomWidth: 0}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.accent_dark}>

                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                    </Stack>

                    <Scene key="EventDetails"
                           clone
                           title={null}
                           hideNavBar
                           component={EventDetails}
                           type={ActionConst.REPLACE}/>

                    <Scene key="SomeonesProfile"
                           clone
                           title={null}
                           component={SomeonesProfile}
                           type={ActionConst.REPLACE}/>

                    <Scene key="Main" initial={this.state.isLoggedIn} default="Feed" tabs={true}
                           activeTintColor={color.tab_active} inactiveTintColor={color.tab_inactive}
                           tabBarStyle={{backgroundColor: color.black}}
                           tabBarPosition="bottom">

                        <Scene key="FeedScreen" default="Feed" title="Explore"
                               icon={({focused}) => <TabIcon focused={focused} iconName="search-web"/>}>

                            <Scene key="Feed"
                                   component={Feed}
                                   navBar={Search}
                                   type={ActionConst.REPLACE}/>

                            <Scene key="EventSearch"
                                   component={EventSearch}
                                   hideNavBar
                                   type={ActionConst.REPLACE}/>

                        </Scene>

                        <Scene key="EventScreen" default="Events" title="My Events"
                               icon={({focused}) => <TabIcon focused={focused} iconName="book-open"/>}>
                            <Scene key="Events"
                                   component={Events}
                                   title="Events"
                                   renderRightButton={<Icon type='material-community' name="plus"
                                                            color={color.text}
                                                            containerStyle={{paddingRight: 8}}
                                                            size={36} onPress={() => Actions.push('EventForm')}/>}
                                   type={ActionConst.REPLACE}/>
                            <Scene key="EventForm"
                                   component={EventForm}
                                   title="Create an Event"
                                   type={ActionConst.REPLACE}/>

                        </Scene>

                        <Scene key="ProfileScreen" default="Events" title="Profile"
                               icon={({focused}) => <TabIcon focused={focused} iconName="account"/>}>

                            <Scene key="Profile"
                                   component={Profile}
                                   title={null}
                                   renderRightButton={<View style={{flexDirection: 'row'}}>
                                       <Icon name="pencil" type='material-community' color={color.accent_dark}
                                             size={32}
                                             containerStyle={{paddingRight: 8}}
                                             onPress={() => Actions.push('EditProfile')}/>
                                       <Icon name="cog" type='entypo' color={color.accent_dark}
                                             size={32}
                                             containerStyle={{paddingRight: 8}}
                                             onPress={() => Actions.push('Settings')}/>

                                   </View>}
                                   type={ActionConst.REPLACE}/>

                            <Scene key="EditProfile"
                                   component={EditProfile}
                                   title="Edit Profile"
                                   type={ActionConst.REPLACE}/>

                            <Scene key="Settings"
                                   component={Settings}
                                   title="Settings"
                                   type={ActionConst.REPLACE}/>

                        </Scene>

                    </Scene>
                </Scene>
            </Router>
        )
    }
}
