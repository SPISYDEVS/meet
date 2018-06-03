import {Cache} from "react-native-cache";
import {AsyncStorage} from 'react-native';
import {database} from './firebase';

export const cache = new Cache({
    namespace: "profilePictures",
    policy: {
        maxEntries: 100
    },
    backend: AsyncStorage
});

database.ref('profilePictures').on('child_changed', function(profile) {
    let userId = profile.key;
    cache.removeItem(`profilePictures/${userId}`, function(err) {
    });
});

database.ref('profilePictures').on('child_removed', function(profile) {
    let userId = profile.key;
    cache.removeItem(`profilePictures/${userId}`, function(err) {
    });
});