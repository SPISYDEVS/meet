import {Cache} from "react-native-cache";
import {AsyncStorage} from 'react-native';

export const cache = new Cache({
    namespace: "profilePictures",
    policy: {
        maxEntries: 100
    },
    backend: AsyncStorage
});