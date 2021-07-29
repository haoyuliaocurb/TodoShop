const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const algoliasearch = require("algoliasearch");

const ALGOLIA_ID = functions.config().algolia.appid;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.adminkey;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const createToAlgolia = (object, indexName) => {
  const index = client.initIndex(indexName);
  return new Promise((resolve, reject) => {
    index.saveObject(object)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
  });
};

exports.createProductToAlgolia = functions
    .firestore
    .document("/products/{pid}")
    .onCreate((event) => {
      const objectIDArr = event.ref.path.split("/");
      const objectID = objectIDArr[objectIDArr.length - 1];

      const data = {
        ...event.data(),
        objectID: objectID,
      };

      createToAlgolia(data, "products")
          .then((res) => console.log("SUCCESS ALGOLIA product ADD", res))
          .catch((err) => console.log("ERROR ALGOLIA product ADD", err));
    });

const updateToAlgolia = (object, indexName) => {
  const index = client.initIndex(indexName);
  return new Promise((resolve, reject) => {
    index.partialUpdateObject(object)
        .then((res) => {
          console.log("res GOOD edit product");
          return resolve(res);
        })
        .catch((err) => {
          console.log("err BAD edit product", err);
          return reject(err);
        });
  });
};

exports.updateProductToAlgolia = functions
    .firestore
    .document("/products/{pid}")
    .onUpdate((event) => {
      // const objectIDArr = event.after.ref.path.split("/");
      // const objectID = objectIDArr[objectIDArr.length - 1];
      const data= {
        ...event.after.data(),
      };

      return updateToAlgolia(data, "products")
          .then((res) => console.log("SUCCESS ALGOLIA product EDIT", res))
          .catch((err) => console.log("ERROR ALGOLIA product  EDIT", err));
    });

const deleteFromAlgolia = (objectID, indexName) => {
  const index = client.initIndex(indexName);
  return new Promise((resolve, reject) => {
    index.deleteObject(objectID)
        .then((res) => {
          console.log("res GOOD delete product" );
          return resolve(res);
        })
        .catch((err) => {
          console.log("err BAD delete product", err);
          return reject(err);
        });
  });
};

exports.deleteProductFromAlgolia = functions
    .firestore
    .document("/products/{pid}")
    .onDelete((event) => {
      const objectIDArr = event.ref.path.split("/");
      const objectID = objectIDArr[objectIDArr.length - 1];

      return deleteFromAlgolia(objectID, "product")
          .then((res) => console.log("SUCCESS ALGOLIA product REMOVE"))
          .catch((err) => console.log("ERROR ALGOLIA product REMOVE", err));
    });

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin.firestore().collection("messages")
//       .add({original: original});
//   // Send back a message that we"ve successfully written the message
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });

// exports.makeUppercase = functions
//     .firestore.document("/messages/{documentId}")
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Firestore.
//       const original = snap.data().original;

//       // Access the parameter `{documentId}` with `context.params`
//       functions
//           .logger.log("Uppercasing", context.params.documentId, original);

//       const uppercase = original.toUpperCase();

//       return snap.ref.set({uppercase}, {merge: true});
//     });

exports.helloWorld = (req, res) => {
  console.log("I am a log entry!");
  console.error("I am an error!");
  res.end();
};
