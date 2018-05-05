import {FACEBOOK_APP_ID} from "../../config/constants";


export async function facebookLogin(successCB, errorCB) {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email'],
    });

    if (type === 'success') {
        successCB(token);
    }
    else {
        errorCB(new Error('Facebook oauth login failed'));
    }
}