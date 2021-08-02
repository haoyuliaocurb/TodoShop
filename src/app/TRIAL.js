/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { React, useEffect } from 'react';
import { firestore } from '../utils/firebase/firebase-services';

const PRODUCT_KEY = '2mS9J1zTXPXX604zb4ik';
const PRODUCT_DATA = {
  images:[
    'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FA129D9ECD300B0F2B961DC5F9DCABF42544CBC00.jpeg?alt=media&token=f84481be-e936-4d71-b93a-b57efe8f95d5',
  ],
  name: '花王 KAO 洗髮精兒童專用 (750ml/瓶)',
  price: 109,
  sid: 'ZcpPQBq3Sji2xHcD79g0',
};

const PRODUCTS_DATA = {
  '2mS9J1zTXPXX604zb4ik': {
    images:[
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FA129D9ECD300B0F2B961DC5F9DCABF42544CBC00.jpeg?alt=media&token=f84481be-e936-4d71-b93a-b57efe8f95d5',
    ],
    name: '花王 KAO 洗髮精兒童專用 (750ml/瓶)',
    price: 109,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健 嬰幼童與母親',
  },
  '7c8f8Ab6OQFVpGaAxzCj': {
    delivery: [0, 2],
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F9D84A6FE4D47730FB45B68EDF54888C80C79CF74.jpeg?alt=media&token=ed985593-8fa1-42c6-82be-76bdf1fdda1a',
    ],
    name: '淨世代環保抽取式衛生紙100抽x12包x6串/箱',
    price: 600,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '居家生活',
  },
  'CLuaEILOo0NGuBHpaP6V': {
    images:[
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F9D1A2174AB-SP-8702915.jpeg?alt=media&token=7f6bfad5-1855-414e-a8a9-9020c2d51f82',
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F6625C7B3C1-SP-8702915.jpeg?alt=media&token=4a55e40d-c5fb-4504-ae34-d0d259f9e07e',
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F5EBF8FDD39-SP-8702915.jpeg?alt=media&token=87232920-97c4-42b7-8630-146c2853ab60',
    ],
    name: 'BeniBear邦尼熊復古酒紅條紋抽取式衛生紙100抽8包6袋',
    price: 489,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活 文創商品',
  },
  'ENMagTFwTJgEaqCk4bzj': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FCB77C7CF92C69BC6743D92D6725317E1BEAEAC82.jpeg?alt=media&token=ba1a7d6a-60de-4107-a462-8d5a91ca2a78',
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F141BC2544577C12836173E571A42DC82DA5A793A.jpeg?alt=media&token=34ebbe51-e710-4ebc-b1af-6d0f5e09bf33',
    ],
    name: '我的心機 黑珍珠絲光潤白黑面膜8入',
    price: 299,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
  },
  'FgFiYn1pAYkV2gLxNSJh': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FD80BB6A390-SP-7136469.jpeg?alt=media&token=544c4d35-d6b9-47cc-a39f-25205f8b208b',
    ],
    name: 'KOSE高絲 雪肌精化妝水100ml+雪肌精乳液33ml*3',
    price: 425,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
  },
  'HyiZa79unVEQY197SEre': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F50433a3f60-Gd-7779186.jpeg?alt=media&token=6198fc9a-0245-47d0-8658-0a5d71988c59',
    ],
    name: 'DOVE 多芬 潤澤水嫩洗面乳 100G',
    price: 79,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
  },
  'IsnfDRNJcPGWezEgQ266': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F95BA62049F-SP-6610873.jpeg?alt=media&token=c5cda39a-75d1-4483-b33f-929f599a8fb4',
    ],
    name: 'Combi 康貝和草極潤嬰兒保濕乳液 plus-250ml',
    price: 288,
    sid: 'gRIyvKUAGdMnhRzgg9RGw5tB22z2',
    categories: '美妝保健 嬰幼童與母親',
  },
  'LH6uNAwmJMWgpQOwqySz': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Ff68de51af6-Gd-7772841.jpeg?alt=media&token=e97605af-2bb4-4a1d-8733-fdd83771483d',
    ],
    name: "MEN'S Biore 痘痘調理洗面乳 100g",
    price: 119,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
  },
  'NYUjT2vn7uKuMw02BUYT': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Fp0704206325320-item-2c47xf4x0600x0600-m.jpeg?alt=media&token=0ea188c8-a646-4363-a509-e4eb7fd9c7b3',
    ],
    name: '茶樹莊園 茶樹／茶樹檸檬 超濃縮洗碗精(500g)',
    price: 69,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '居家生活',
  },
  'SWUNApoWStoWaW7RP4hh': {
    delivery: [0, 10, 11],
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F7C9EAB399A-SP-7033611.jpeg?alt=media&token=c174d228-1b92-4038-8bd3-a2716f856e9c',
    ],
    name: '春風柔膚感抽取式衛生紙 110抽x24包x3串/箱',
    price: 829,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活',
  },
  'SeFCJJMAzLXBxbJ2MdI1': {
    delivery: [0, 10, 11],
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FC9F4A74390-Gd-5619164.jpeg?alt=media&token=57a3e234-48ff-4eef-8361-d39252b101f3',
    ],
    name: '蒲公英環保抽取衛生紙100抽x72包',
    price: 659,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活',
  },
  'SiQ8ExzVc2VzXs4jCXA0': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Fc138509e58-Gd-8141862.jpeg?alt=media&token=d02bebdd-c1b2-4d7d-aee0-e238a6692b6d',
    ],
    name: '春風抽取式廚房紙巾一秒抽 120抽x3包x8串/箱',
    price: 670,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活',
  },
  'SnnWbfqOFz0Z5CIMdglT': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FACD8F56CF47ABA0FC576123A596B5CB16CC1C87D.jpg?alt=media&token=56195a96-17fb-4c6d-9bd7-85ecdad42445',
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FA83E0F310755133A5AB524A5CC7B3AB9E8ACBF76.jpeg?alt=media&token=1c1bcd78-b565-4e22-83e0-a19168636b3b',
    ],
    name: 'GUM 牙周護理牙線',
    price: 119,
    sid: 'pj7AqtHHv2TUjKeNiaY1',
    type: [
      {
        imageIdx: 0,
        tag: '含蠟膨脹型',
      },
      {
        imageIdx: 1,
        price: 139,
        tag: '含蠟滑順型',
      },
    ],
    categories: '美妝保健',
  },
  'WstK2EjRmnTBp8fGHNtR': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F570DF569BF-SP-8426012.jpeg?alt=media&token=4c7eac54-62f5-4d3a-ac6a-5e97abf87073',
    ],
    name: 'KOSE 高絲 雪肌精乳液45mlX2',
    price: 348,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
  },
  'aOHwl9peu1BQI7Bq7Kt0': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F02E714D1EB-Gd-7396189.jpeg?alt=media&token=6c2a83cb-7de9-490a-a8a5-c7ace08efa8a',
    ],
    name: '刷樂扁線牙線棒(薄荷味)600支入',
    price: 199,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '美妝保健',
  },
  'hzLK7rDYOAIQWx5C5OkI': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FF613DAB9DB-Product-12612396.jpeg?alt=media&token=1566dfdf-1f2c-4077-acab-115ba05ff950',
    ],
    name: '得意連續抽取式花紋衛生紙100抽 x70包/箱',
    price: 659,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活',
  },
  'l43uxe5pY1Accmi6OPqW': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F1F5E49FDDE-SP-8221369.jpeg?alt=media&token=e366b746-cc25-4f3f-914d-7fc9957f1e22',
    ],
    name: '百齡Smiling 護牙周到漱口水超級護齦W-綠茶薄荷750ml',
    price: 149,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
  },
  'rnMzEpgykhBfNWOmsNFd': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FE80F38B88B-SP-8895718.jpeg?alt=media&token=f074a102-6f7c-4a52-ab6c-632975cd06d1',
    ],
    name: '樂扣樂扣 純淨抗菌保鮮盒 600ML (長方/淺灰)',
    price: 289,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活',
  },
  'uym9FbUNRTPpE11GRTwk': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FEA12DF5694-Product-22905621.jpeg?alt=media&token=d9aa4352-6a72-45f3-a573-ecd16acd9dd9',
    ],
    name: '五月花厚棒抽取式衛生紙90抽x10包/袋',
    price: 229,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '居家生活',
  },
};

const TRIAL = () => {
  const startToSearch = async (searchStr, page, option) => {
    return new Promise((resolve, reject) => {
      const getBody = () => {
        const newBody = { searchStr, };
        newBody.page = !page ? 0 : page;
        if (option) {
          newBody.option = option;
        }
        return JSON.stringify(newBody);
      };
      fetch('https://us-central1-todoshop-5fd25.cloudfunctions.net/widgets/searchProducts', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: getBody(),
      })
      .then((res) => res.json()).then((searchResult) => {
        if(Array.length !== 0){
            console.log(searchResult)
        }
      });
    });
  };

  useEffect(() => {
    // Array.from({length: 1}).forEach((value, index) => {
    //   startToSearch('得意 衛生紙', index);
    // });
    // startToSearch('得意 衛生紙', 0)
    // .then(() => { startToSearch('得意 衛生紙', 1); });
    // const option = {
    //   filter: {
    //     // range: {
    //     //   price: [500, 600],
    //     // },
    //     facet: {
    //       price: [489, 659],
    //     }
    //   },
    //   sort: {
    //     price: 1,
    //   },
    // };
    // startToSearch('衛生紙', 0, option)
    // .then(() => { startToSearch('得意 衛生紙', 1); });
  }, []);

  useEffect(() => {
    // const array = Object.keys(PRODUCTS_DATA);
    // array.forEach((key) => {
    //   firestore.collection('products').doc(key).set(PRODUCTS_DATA[key]);
    // });

    // firestore.collection('products').doc(PRODUCT_KEY).set(PRODUCT_DATA)
    // .then(() => { console.log('true') });
    
    // firestore.collection('products').doc(PRODUCT_KEY).update({ price: 109 })
    // .then(() => { console.log('true') });

    // firestore.collection('products').doc(PRODUCT_KEY).delete()
    // .then(() => { console.log('true') });

    // firestore.collection('products').get()
    // .then((query) => { console.log('query.size: ', query.size) })

    // firestore
    //   .collection('products')
    //   .where('sid', '==', 'gRIyvKUAGdMnhRzgg9RGw5tB22z2')
    //   .get()
    //   .then((query) => {
    //     query.forEach((docQuery) => {
    //       const data = docQuery.data();
    //       console.log('data: ', data);
    //     });
    //   });
  }, []);
  return <div />;
};

export default TRIAL;
