/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");

const cors = require("cors")({origin: true});

// const corsOptions = {
//   origin: true,
//   methods: "POST",
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
// };


exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello, wedemaasdfnn!");
});

// exports.openaigptcall = functions.https.onRequest(async (request, response) => {
exports.openaigptcall = functions.https.onRequest((request, response) => {
  cors()(request, response, async () => {
    try {
      const prompt = request.body.prompt;
      // const prompt = "what is the meaning of life?";

      // const prompt = request.query.prompt;


      const fetchResponse = await fetch(
          `https://api.openai.com/v1/chat/completions`,
          {
            body: JSON.stringify({
              "model": "gpt-3.5-turbo",
              "messages": [{"role": "user", "content": prompt}],
              "temperature": 0,
              "max_tokens": 250,
            }),
            method: "POST",
            headers: {
              "content-type": "application/json",
              "Authorization": "Bearer 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",
            },
          },
      );

      const apiResponse = await fetchResponse.json();
      response.status(200).send(apiResponse);
    } catch (error) {
      console.error("Error in fetching from OpenAI: ", error);
      response.status(500).send(error);
    }
  });
});


//     try {
//         const generatedPrompt = request.body.generatedPrompt; // Assuming generatedPrompt comes from the request body

//         const fetchResponse = await fetch(
//             `https://api.openai.com/v1/chat/completions`,
//             {
//                 body: JSON.stringify({
//                     "model": "gpt-3.5-turbo",
//                     "messages": [{ "role": "user", "content": generatedPrompt }],
//                     "temperature": 0,
//                     "max_tokens": 50
//                 }),
//                 method: "POST",
//                 headers: {
//                     "content-type": "application/json",
//                     Authorization: "Bearer YOUR_API_KEY_HERE", // Replace with your actual API key
//                 },
//             }
//         );

//         const apiResponse = await fetchResponse.json();
//         response.status(200).send(apiResponse);

//     } catch (error) {
//         console.error("Error in fetching from OpenAI: ", error);
//         response.status(500).send(error);
//     }
// });


// sample access firestore
const admin = require("firebase-admin");
admin.initializeApp();

exports.getLovePoem = functions.https.onRequest((request, response) => {
  // get id from params
  const id = request.query.id;

  const promise = admin.firestore().doc(`lovepoems/${id}`).get();

  const p2 = promise.then((snapshot) => {
    const data = snapshot.data();
    console.log(data);
    response.send(data);
  });

  p2.catch((error) => {
    console.log(error);
    response.status(500).send(error);
  });
});


// const fetch = require("fetch");

// exports.accessPrivateAPI = functions.https.onCall(async () => {
//   try {
//     const response = await fetch(
//         `https://api.openai.com/v1/chat/completions`,
//         {
//           body: JSON.stringify({
//             "model": "gpt-3.5-turbo",
//             "messages": [{"role": "user", "content": "Tell a joke"}],
//             "temperature": 0,
//             "max_tokens": 50,
//           }),
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//             // eslint-disable-next-line no-console
//             "Authorization": "Bearer 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",
//           },
//         },
//     );
//     return response.data;
//   } catch (error) {
//     return {error: error.message};
//   }
// });
