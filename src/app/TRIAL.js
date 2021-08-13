/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect, memo } from 'react';
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
    introduction: '產品純淨呵護，讓秀髮潔淨更健康，能溫和洗淨，使髮絲柔順不打結。專為兒童設計，配方溫和不易刺激，給秀髮溫柔呵護，潔淨舒爽。採用植物精華－天然蘋果萃取精華，溫柔輕甜的蘋果香讓每次洗髮成為身心放鬆的享受。',
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
    introduction: '淨世代100%採用再生紙製成，珍惜資源愛護地球。製程採用高溫殺菌消毒，紙張乾淨衛生，且採用風力發電潔淨能源生產，榮獲環保標章肯定。本產品易於水中分散，可投入馬桶。',
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
    introduction: 'BeniBear邦尼熊復古酒紅條紋抽取式衛生紙，可愛復古配色包裝，為居家增添俏皮氛圍！經高溫殺菌處理，不含螢光劑，潔淨柔順，獲得消費者高度肯定，使用好安心。親膚好觸感，不傷害細嫩肌膚。柔軟、蓬鬆、強韌，觸手可及的日用消耗品，當然要為自己和家人選擇最好的！',
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
    introduction: '極上美肌，吸出黑注入白！黑面膜加入的黑纖維有效承載濃潤精華液，幫助精華液導入肌膚層，有效吸附毛孔髒汙清潔肌膚並同時保養帶給肌膚光透水嫩。產品功能特色包含：充滿海洋精華的黑珍珠蘊含胺基酸、珍珠蛋白及微量元素保持肌膚水分及彈性散發宛如珍珠般璀璨迷人的亮麗光澤；黑布膜為多纖維微孔結構更貼近毛孔有效吸附髒汙恢復乾淨肌膚；黑部膜質地輕盈敷觸柔軟剪裁更貼合臉部輪廓完美釋放精華液；無添加Paraben防腐劑、酒精、礦物油。使用時，將臉部清潔後，打開面膜平貼於臉上輕按各處使其完全服貼。靜待15-20分鐘後取下面膜，可視個人情況進行清洗或輕拍吸收。',
  },
  'FgFiYn1pAYkV2gLxNSJh': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FD80BB6A390-SP-7136469.jpeg?alt=media&token=544c4d35-d6b9-47cc-a39f-25205f8b208b',
    ],
    name: 'KOSE高絲 雪肌精化妝水100ml+雪肌精乳液33ml*3',
    price: 425,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
    introduction: 'KOSE高絲特惠組，包含雪肌精化妝水100ml+雪肌精乳液33ml*3，此組商品為本公司大量採購有償取得商品，特優惠價格回饋，保留專櫃出品原貌，無外盒及封膜，然因商品包裝上有贈品字樣，為免消費者疑惑,特此說明！',
  },
  'HyiZa79unVEQY197SEre': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F50433a3f60-Gd-7779186.jpeg?alt=media&token=6198fc9a-0245-47d0-8658-0a5d71988c59',
    ],
    name: 'DOVE 多芬 潤澤水嫩洗面乳 100G',
    price: 79,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
    introduction: '日本熱銷! 每5秒賣出1瓶！注入高度保濕美容精華液，潔淨同時滋潤保濕，肌膚變得水潤飽滿。蘊含NutriumMoisture保濕美容精華液，能深入滲透徹底保濕，幫助肌膚保水。產品帶有清新花果香，喚醒肌膚一整天的活力，使用時溫和潔淨，綿密泡沫輕柔帶走髒汙。',
  },
  'IsnfDRNJcPGWezEgQ266': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F95BA62049F-SP-6610873.jpeg?alt=media&token=c5cda39a-75d1-4483-b33f-929f599a8fb4',
    ],
    name: 'Combi 康貝和草極潤嬰兒保濕乳液 plus-250ml',
    price: 288,
    sid: 'gRIyvKUAGdMnhRzgg9RGw5tB22z2',
    categories: '美妝保健 嬰幼童與母親',
    introduction: '產品獨特草本配方：沖繩蘆薈富含多醣體及醣蛋白，可補充肌膚水份，形成保濕膜；沖繩秋葵富含多種氨基酸，補充肌膚養份；日本紫根、艾草、蜜桃葉、櫻花葉可舒緩肌膚不適感，預防因乾燥而引起的皮膚癢。無Paraben，無色素，無酒 精，無石油系成份，提供柔嫩肌膚無添加的保護力。',
  },
  'LH6uNAwmJMWgpQOwqySz': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Ff68de51af6-Gd-7772841.jpeg?alt=media&token=e97605af-2bb4-4a1d-8733-fdd83771483d',
    ],
    name: "MEN'S Biore 痘痘調理洗面乳 100g",
    price: 119,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
    introduction: '產品抗菌淨痘、溫和潔淨，扺抗細菌滋長。有效調理易長青春痘膚質，預防痘痘生成，使肌膚健康潔淨，恢復自然光采。產品帶有品味麝香，展現個性男人味。',
  },
  'NYUjT2vn7uKuMw02BUYT': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Fp0704206325320-item-2c47xf4x0600x0600-m.jpeg?alt=media&token=0ea188c8-a646-4363-a509-e4eb7fd9c7b3',
    ],
    name: '茶樹莊園 茶樹／茶樹檸檬 超濃縮洗碗精(500g)',
    price: 69,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '居家生活',
    introduction: '產品添加澳洲茶樹精油，創新超濃縮環保油切因子，快速潔淨0油漬。環境友善成分，生物分解度達95%，中性配方不傷手，成分安心洗得放心！',
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
    introduction: '產品包裝為療癒的極地動物包裝，陪伴您日常使用。紙張具超細柔壓花，觸感超柔膚，使用100%原生紙漿，不含螢光劑。適量使用後可衝入馬桶，易分散不堵塞。',
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
    introduction: '產品100%再生紙漿，不含雙酚A，友善環境並榮獲環保標章、碳標籤認證、FSC三重認證。製程中使用400度高溫殺菌，紙張潔淨不漂白。紙張易分解，可直接丟棄馬桶不堵塞。',
  },
  'SiQ8ExzVc2VzXs4jCXA0': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Fc138509e58-Gd-8141862.jpeg?alt=media&token=d02bebdd-c1b2-4d7d-aee0-e238a6692b6d',
    ],
    name: '春風抽取式廚房紙巾一秒抽 120抽x3包x8串/箱',
    price: 670,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活',
    introduction: '產品獨家外袋包覆，張張乾淨安心，單手抽取超便利。特殊包裝使得一包可抵兩捲廚紙，魔法大空間。100%原生紙漿製造，首創HACCP食品級驗證，使您安心使用紙張接觸生熟食。',
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
    introduction: '產品獨家技術，纖維在牙縫中遇到唾液等水分後膨脹，增加與牙齒的接觸面，幫助更有效的清除牙縫處的牙菌斑，同時牙線觸感柔軟，不易傷害牙齦，。此外，窗口式牙線盒包裝，牙線的剩餘量可以一目瞭然。使用時，請以兩手的中指纏繞40cm牙線，並留取大約15cm的牙線在兩指之間，分別以兩手的大拇指和食指抓取1-2cm牙線，用牙線在齒縫間輕柔的前後移動。',
  },
  'WstK2EjRmnTBp8fGHNtR': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F570DF569BF-SP-8426012.jpeg?alt=media&token=4c7eac54-62f5-4d3a-ac6a-5e97abf87073',
    ],
    name: 'KOSE 高絲 雪肌精乳液45mlX2',
    price: 348,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
    introduction: '產品深入肌膚深層美白、潤澤，創造柔嫩與彈力感的雪白肌膚。獨特的「保濕均衡聚合物」能因應季節與膚質，夏天（多濕）時水嫩保養，冬季（乾燥）時潤澤呵護。此外，產品能有效抑制黑色素的生成，防止因日曬形成黑斑，並全面防止肌膚乾燥、粗燥。使用時請按壓噴嘴1至2回的量，均勻地點延展於全臉。',
  },
  'aOHwl9peu1BQI7Bq7Kt0': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F02E714D1EB-Gd-7396189.jpeg?alt=media&token=6c2a83cb-7de9-490a-a8a5-c7ace08efa8a',
    ],
    name: '刷樂扁線牙線棒(薄荷味)600支入',
    price: 199,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '美妝保健',
    introduction: '產品使用200條平行纖維棉線，扁線加寬設計，易吸附齒垢、牙菌膜，提升潔牙效率，預防齲齒、減少牙周問題發生。寬扁纖維設計，適合一般牙縫、牙縫較大者使用。產品為台灣製造，更經過SGS檢驗合格 無塑化劑、無雙酚A、無螢光劑，品質安全，讓您安心入口清潔齒縫。',
  },
  'hzLK7rDYOAIQWx5C5OkI': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FF613DAB9DB-Product-12612396.jpeg?alt=media&token=1566dfdf-1f2c-4077-acab-115ba05ff950',
    ],
    name: '得意連續抽取式花紋衛生紙100抽 x70包/箱',
    price: 659,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活',
    introduction: '產品獨家交織技術，柔軟度升級。紙張不染色，不含螢光劑，不含有害化學物質，製程中400度高溫殺菌處理，五重保證實在真安心。本衛生紙可安心丟入馬桶，能迅速分散於水中。',
  },
  'l43uxe5pY1Accmi6OPqW': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F1F5E49FDDE-SP-8221369.jpeg?alt=media&token=e366b746-cc25-4f3f-914d-7fc9957f1e22',
    ],
    name: '百齡Smiling 護牙周到漱口水超級護齦W-綠茶薄荷750ml',
    price: 149,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '美妝保健',
    introduction: '產品獨家成分，無酒精、溫和不刺激，並降低牙周病發生率，減少牙齦問題發生率：ASP+有效去除牙周病菌、GAC深層修護牙齦問題。帶有沁涼薄荷香，舒適宜人，幫助預防改善口腔異味！',
  },
  'rnMzEpgykhBfNWOmsNFd': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FE80F38B88B-SP-8895718.jpeg?alt=media&token=f074a102-6f7c-4a52-ab6c-632975cd06d1',
    ],
    name: '樂扣樂扣 純淨抗菌保鮮盒 600ML (長方/淺灰)',
    price: 289,
    sid: 'TMkP20NeQYklf4pcFyAZ',
    categories: '居家生活',
    introduction: '產品不含環境賀爾蒙、塑化劑。採用獨家技術，空心矽膠的防水圈、4面環扣結構，使產品密實不外漏！上蓋密封矽膠圈可拆洗，此外，矽膠條可有效抗菌高達99.9%！',
  },
  'uym9FbUNRTPpE11GRTwk': {
    images: [
      'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FEA12DF5694-Product-22905621.jpeg?alt=media&token=d9aa4352-6a72-45f3-a573-ecd16acd9dd9',
    ],
    name: '五月花厚棒抽取式衛生紙90抽x10包/袋',
    price: 229,
    sid: 'ZcpPQBq3Sji2xHcD79g0',
    categories: '居家生活',
    introduction: '超乎想像的厚實滑順感！產品使用專利立體技術，氣旋絨織工藝，革命性一抽搞定，安心不透手。紙張可丟入馬桶，敬請安心使用。',
  },
};
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

const Child = ({ index }) => {
  console.log('render Child', 'index: ', index);
  useEffect(() => {
    return () => {
      console.log(`Child ${index} unmount`);
    };
  }, []);  
  return <p>{index}</p>;
};

const TRIAL = () => {

  console.log('render TRIAL');
  const [state, setState] = useState([1, 2, 3]);
  useEffect(() => {
    setTimeout(() => {
      setState([0, 1]);
    }, 1000);
  }, []);
  // useEffect(() => {
  //   const req = {
  //     body: {
  //       phoneNumber: '0958155898',
  //       name: 'haoyuliao',
  //       email: 'haoyuliaocurb@gmail.com',
  //       priceSum: 1000,
  //     },
  //   };
  //   const getTapPayRequestMaterial = (reqValue) => {
  //     const {phoneNumber, name, email, priceSum} = reqValue.body;
  //     const tapPayRequestMaterial = {
  //       "body": {
  //         "prime":
  //           "test_3a2fb2b7e892b914a03c95dd4dd5dc7970c908df67a49527c0a648b2bc9",
  //         "partner_key":
  //           "partner_c4LGHUS1P9TeTSm53cblCCjVws22XInlCuCNR5AomcwM0N1AKqUnBMeP",
  //         "merchant_id": "haoyuliaocurb_CTBC",
  //         "amount": String(priceSum),
  //         "details": "e-commerce",
  //         "order_number": `orderNumber${Date.now()}`,
  //         "bank_transaction_id": `bankTransactionId${Date.now()}`,
  //         "cardholder": {
  //           "phone_number": phoneNumber,
  //           "name": name,
  //           "email": email,
  //           "zip_code": "",
  //           "address": "",
  //           "national_id": "",
  //         },
  //         "remember": true,
  //       },
  //     };
  //     return tapPayRequestMaterial;
  //   };
  //   const trial = getTapPayRequestMaterial(req);
  //   console.log('trial: ', trial);
  //   console.log('JSON:', JSON.parse(JSON.stringify(trial)));
  // });

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
  return (
    <div>
      {state.map((value) => <Child index={value} />)}
    </div>
  );
};

export default TRIAL;
