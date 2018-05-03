import { auth, database, provider, storage } from "../../config/firebase";


//Create the user object in realtime database
export function editUser (user, callback) {
    console.log('updating');
    database.ref('users').child(user.uid).update({...user})
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}


export async function uploadFile (blob) {
    let user = auth.currentUser;
    let filename = user.uid + "_profile";

    let ref = storage.ref(filename);
    ref.put(blob);
}