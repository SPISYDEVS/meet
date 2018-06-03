import {Cache} from "react-native-cache";
import {AsyncStorage} from 'react-native';
import {database} from './firebase';


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


// Wrapper around Cache
class ImagesCacheWithListener {
    constructor(options) {
        this.cache = new Cache(options);

        // Stores keys of images that will eventually be set
        this.imagesCacheQueue = {};
        this.listeners = {
            'keySet': {}
        };
    }

    setItem(key, value, callback) {
        // Enqueue the image key into the queue to signify that the
        // image will be cached
        let imagesCacheQueue = this.imagesCacheQueue;
        let listeners = this.listeners;

        this.cache.setItem(key, value, function(err) {
            callback(err);

            if (listeners['keySet'][key] !== undefined) {
                for (let listenerFunc of listeners['keySet'][key]) {
                    listenerFunc(key, value);
                }

                delete listeners['keySet'][key];
            }

            delete imagesCacheQueue[key];
        });
    };


    removeItem(key, callback) {
        this.cache.removeItem(key, callback);
    }


    getItem(key, callback) {
        this.cache.getItem(key, callback);
    }


    peekItem(key, callback) {
        this.cache.peekItem(key, callback);
    }


    enqueueKey(key) {
        this.imagesCacheQueue[key] = true;
    }


    isKeyInQueue(key) {
        return this.imagesCacheQueue[key] !== undefined;
    }


    clearAll(callback) {
        this.cache.clearAll(callback);
    }


    on(key, type, callback) {
        switch (type) {
            case 'keySet':
                if (this.listeners[type][key] === undefined) {
                    this.listeners[type][key] = [];
                }
                this.listeners[type][key].push(callback);
                break;
            default:
                break;

        }
    }
}


export const cache = new ImagesCacheWithListener({
    namespace: "profilePictures",
    policy: {
        maxEntries: 100
    },
    backend: AsyncStorage
});
