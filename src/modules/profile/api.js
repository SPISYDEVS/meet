import { auth, database, provider } from "../../config/firebase";

//Create the user object in realtime database
export function editUser (user, callback) {
    database.ref('users').child(user.uid).update({ ...user })
        .then(() => callback(true, null, null))
        .catch((error) => callback(false, null, {message: error}));
}