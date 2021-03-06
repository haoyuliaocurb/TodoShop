const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const algoliasearch = require("algoliasearch");
const express = require("express");
const cors = require("cors");
// const https = require("https");
const axios = require("axios");

const ALGOLIA_ID = functions.config().algolia.appid;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.adminkey;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const ALGOLIA_SEARCH_ONLY_API_KEY = functions.config().algolia.searchonlykey;
const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_ONLY_API_KEY);

const app = express();
// app.use(cors({origin: true}));
app.use(cors());
app.post("/searchProducts", async (req, res) =>{
  const {searchStr, page} = req.body;
  const option = !req.body.option ? null : req.body.option;
  const getParams = () => {
    const newParams = {
      hitsPerPage: !((option) && (option.hitsPerPage)) ? (
        12
      ) : (
        option.hitsPerPage
      ),
      page,
    };
    if (option) {
      if (option.filter) {
        let filterStr = "";
        if (option.filter.range) {
          const rangeData = option.filter.range;
          const rangeKeyArray = Object.keys(rangeData);
          if (rangeKeyArray.length) {
            rangeKeyArray.forEach((key) => {
              const [min, max] = rangeData[key];
              if (min && max) {
                filterStr = filterStr
                    .concat(` AND (${key} <= ${max} AND ${key} >= ${min})`);
              }
              if (min && !max) {
                filterStr = filterStr.concat(` AND (${key} >= ${min})`);
              }
              if (!min && max) {
                // console.log('filterStr: ', filterStr);
                filterStr = filterStr.concat(` AND (${key} <= ${max})`);
              }
            });
          }
        }
        if (option.filter.facet) {
          const facetData = option.filter.facet;
          const facetKeyArray = Object.keys(facetData);
          if (facetKeyArray.length) {
            facetKeyArray.forEach((key) => {
              const convertedFacetArray = typeof facetData[key] === "string" ? (
                [facetData[key]]
              ) : (
                facetData[key]
              );
              let eachFacetStr = "";
              console.log("convertedFacetArray: ", convertedFacetArray);
              const isNumValue = typeof convertedFacetArray[0] !== "number" ? (
                0
              ) : (
                1
              );
              if (isNumValue) {
                convertedFacetArray.forEach((target) => {
                  eachFacetStr = eachFacetStr.concat(` OR ${key} = ${target}`);
                });
              } else {
                convertedFacetArray.forEach((target) => {
                  eachFacetStr = eachFacetStr.concat(` OR ${key}: ${target}`);
                });
              }
              eachFacetStr = eachFacetStr.replace(/^ OR /, "");
              filterStr = filterStr.concat(` AND (${eachFacetStr})`);
            });
          }
        }
        filterStr = filterStr.replace(/^ AND /, "");
        newParams.filters = filterStr;
      }
    }
    return newParams;
  };
  const params = getParams();

  let searchIndex = "products";
  if ((option) && (option.sort)) {
    const sortData = option.sort;
    const sortKeyArray = Object.keys(sortData);
    if (sortKeyArray.length) {
      const attri = sortKeyArray[0];
      const isSortDesc = !sortData[attri] ? "asc" : "desc";
      searchIndex = `${searchIndex}_${attri}_${isSortDesc}`;
    }
  }
  searchClient.initIndex(searchIndex)
      .search(searchStr, params)
      .then(({hits}) => {
        res.send(hits);
        return;
      })
      .catch((err) => {
        res.send([]);
      });
});
const getTapPayRequestMaterial = (reqValue) => {
  const {phoneNumber, name, email, priceSum} = reqValue.body;
  const tapPayRequestMaterial = {
    "body": {
      "prime":
        "test_3a2fb2b7e892b914a03c95dd4dd5dc7970c908df67a49527c0a648b2bc9",
      "partner_key":
        "partner_c4LGHUS1P9TeTSm53cblCCjVws22XInlCuCNR5AomcwM0N1AKqUnBMeP",
      "merchant_id": "haoyuliaocurb_CTBC",
      "amount": String(priceSum),
      "details": "e-commerce",
      "order_number": `OrderNumber${Date.now()}`,
      "bank_transaction_id": `B${Date.now()}`,
      "cardholder": {
        "phone_number": phoneNumber,
        "name": name,
        "email": email,
        "zip_code": "",
        "address": "",
        "national_id": "",
      },
      "remember": true,
    },
  };
  return tapPayRequestMaterial;
};

app.use(cors());
app.post("/orders", async (reqOrder, resOreder) => {
  const tapPayRequestMaterial = getTapPayRequestMaterial(reqOrder);
  const data = JSON.stringify(tapPayRequestMaterial.body);
  const tapPayConfig = axios.create({
    baseURL: "https://sandbox.tappaysdk.com",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":
        "partner_c4LGHUS1P9TeTSm53cblCCjVws22XInlCuCNR5AomcwM0N1AKqUnBMeP",
    },
  });
  const postTapPay =
    (dataValue) => tapPayConfig.post("/tpc/payment/pay-by-prime", dataValue);
  const tapPaySrcResponse = await postTapPay(data);
  const tapPayResponse = tapPaySrcResponse.data;
  resOreder.send(tapPayResponse);
  // resOreder.send(tapPayResponse);
  // resOreder.json(JSON.stringify({a: "a"}));
  // const data = new TextEncoder().encode(
  //     JSON.stringify(tapPayRequestMaterial.body)
  // );
  // functions.logger.log("hello");
  // const options = {
  //   hostname: "sandbox.tappaysdk.com",
  //   port: 443,
  //   path: "/tpc/payment/pay-by-prime",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Content-Length": data.length,
  //     "x-api-key":
  //       "partner_c4LGHUS1P9TeTSm53cblCCjVws22XInlCuCNR5AomcwM0N1AKqUnBMeP",
  //   },
  // };

  // const reqTapPay = https.request(options, (resTapPay) => {
  //   functions.logger.log(`statusCode: ${resTapPay.statusCode}`);
  //   resTapPay.on("data", (d) => {
  //     functions.logger.log(`data: ${d}`);
  //     // process.stdout.write(d);
  //     resOreder.json(JSON.stringify(d));
  //   });
  // });
  // reqTapPay.on("error", (error) => {
  //   functions.logger.error(error);
  // });
  // reqTapPay.end();
});

app.post("/account", async (reqAccount, resAccount) => {
  const data = reqAccount.body;
  functions.logger.log("data: ", data);
  const accountConfig = axios.create({
    baseURL: "https://hexschool-tutorial.herokuapp.com/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const postAccount =
    (dataValue) => accountConfig.post("/signup", accountConfig);
  postAccount(data).then((srcApiRes) => {
    const apiRes = srcApiRes.data;
    functions.logger.log("apiRes: ", apiRes);
    resAccount.send(apiRes);
  });
});

exports.widgets = functions.https.onRequest(app);

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
        pid: objectID,
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
          console.log("err BAD edit products", err);
          return reject(err);
        });
  });
};

exports.updateProductToAlgolia = functions
    .firestore
    .document("/products/{pid}")
    .onUpdate((event) => {
      const objectIDArr = event.after.ref.path.split("/");
      const objectID = objectIDArr[objectIDArr.length - 1];
      const data= {
        ...event.after.data(),
        pid: objectID,
        objectID: objectID,
      };

      // functions.logger.log("data:", data);

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

      return deleteFromAlgolia(objectID, "products")
          .then((res) => console.log("SUCCESS ALGOLIA product REMOVE"))
          .catch((err) => console.log("ERROR ALGOLIA product REMOVE", err));
    });

exports.helloWorld = (req, res) => {
  console.log("I am a log entry!");
  console.error("I am an error!");
  res.end();
};
