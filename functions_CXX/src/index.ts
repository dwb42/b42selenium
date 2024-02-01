/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// admin.initializeApp();

// export const getLovePoem = functions.https.onRequest((request, response) => {
//   const promise = admin.firestore().doc("lovepoems/1").get();
//  const p2 = promise.then((snapshot) => {
//     const data = snapshot.data();
//     response.send(data);
//   });
//   p2.catch((error) => {
//     //handle error
//     console.log(error);
//     response.status(500).send(error);

// });
