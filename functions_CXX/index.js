/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");


// const cors = require("cors")({origin: "http://localhost:3000", "https://lovepoem.b42.io"});
const cors = require("cors")({origin: "*"});


exports.openaigptcall = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    // const sampleJson = {"key1":"value1","key2":"value2"};

    // const apiResponse = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    const prompt = request.body.prompt;
    // response.status(200).send(prompt);
    // const prompt = "say hello!!!";

    try {
      const apiResponse = await fetch(
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
      const data = await apiResponse.json();
      response.status(200).send(data);
    } catch (error) {
      console.error("Error in fetching from OpenAI: ", error);
      response.status(500).send(error);
    }
  });
});


// exports.openaigptcall = functions.https.onRequest( (request, response) => {
//   cors(request, response, () => {
// fetch(
//     `https://api.openai.com/v1/chat/completions`,
//     {
//         body: JSON.stringify({
//             "model": "gpt-3.5-turbo",
//             "messages": [{ "role": "user", "content": "say hello!!!" }],
//             "temperature": 0,
//             "max_tokens": 20,
//         }),
//         method: "POST",
//         headers: {
//             "content-type": "application/json",
//             "Authorization": "Bearer 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",
//         },
//     },
// )
//         .then(response => response.json())
//     .then(json => {
//       console.log(json);
//       response.send(json);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       response.status(500).send(error);
//     });
//   });
// });
