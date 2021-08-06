import { React } from 'react';
import { useHistory } from 'react-router-dom';
import StyledOrderCard from '../../../styles/AuthPage/UserOrder/StyledOrderCard';
// eslint-disable-next-line no-unused-vars
import ProductGroupByStore from '../../PaymentPage/ProductGroupByStore';

// eslint-disable-next-line no-unused-vars
const TEST_ORDER_DATA = {
  orderPriceSum: 1328,
  purchaserInfo: {
    email: 'jeffery84115@gmail',
    name: '廖浩宇',
    phoneNumber: '0958155898',
  },
  status: 1,
  uid: 'kqXYsHFzzTN0DGlBqFdyafGtU052',
  orderId: '3kQyb943mbk9bv57uNs5',
  orderProducts: [
    {
      sid: 'ZcpPQBq3Sji2xHcD79g0',
      storeName: '漢文生活百貨',
      products: [
        {
          amount: 1,
          pid: 'IsnfDRNJcPGWezEgQ266',
          name: 'Combi 康貝和草極潤嬰兒保濕乳液 plus-250ml',
          price: 288,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F95BA62049F-SP-6610873.jpeg?alt=media&token=c5cda39a-75d1-4483-b33f-929f599a8fb4',
          ],
        },
        {
          amount: 1,
          pid: 'LH6uNAwmJMWgpQOwqySz',
          name: "MEN'S Biore 痘痘調理洗面乳 100g",
          price: 119,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2Ff68de51af6-Gd-7772841.jpeg?alt=media&token=e97605af-2bb4-4a1d-8733-fdd83771483d',
          ],
        },
        {
          amount: 1,
          pid: 'l43uxe5pY1Accmi6OPqW',
          name: '百齡Smiling 護牙周到漱口水超級護齦W-綠茶薄荷750ml',
          price: 149,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2F1F5E49FDDE-SP-8221369.jpeg?alt=media&token=e366b746-cc25-4f3f-914d-7fc9957f1e22',
          ],
        },
        {
          amount: 1,
          pid: '2mS9J1zTXPXX604zb4ik',
          name: '花王 KAO 洗髮精兒童專用 (750ml/瓶)',
          price: 109,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FA129D9ECD300B0F2B961DC5F9DCABF42544CBC00.jpeg?alt=media&token=f84481be-e936-4d71-b93a-b57efe8f95d5',
          ],
        },
        {
          amount: 1,
          pid: 'FgFiYn1pAYkV2gLxNSJh',
          name: 'KOSE高絲 雪肌精化妝水100ml+雪肌精乳液33ml*3',
          price: 425,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FD80BB6A390-SP-7136469.jpeg?alt=media&token=544c4d35-d6b9-47cc-a39f-25205f8b208b',
          ],
        },
      ],
    },
    {
      sid: 'pj7AqtHHv2TUjKeNiaY1',
      storeName: 'KK商城',
      products: [
        {
          amount: 2,
          pid: 'SnnWbfqOFz0Z5CIMdglT',
          name: 'GUM 牙周護理牙線',
          price: 119,
          images: [
            'https://firebasestorage.googleapis.com/v0/b/todoshop-5fd25.appspot.com/o/productsImages%2FACD8F56CF47ABA0FC576123A596B5CB16CC1C87D.jpg?alt=media&token=56195a96-17fb-4c6d-9bd7-85ecdad42445',
          ],
        },
      ],
    },
  ],
};

const ButtonPayment = ({ orderId }) => {
  const history = useHistory();
  const handelButtonClick = (orderIdValue) => {
    // console.log('orderIdValue:', orderIdValue);
    history.push(`/payment/${orderIdValue}`);
  };
  return (
    <button
      className="ButtonPayment"
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        handelButtonClick(orderId);
      }}
    >
      付款去
    </button>
  );
};

const OrderCard = ({ orderData, showModolMessageFunctionDev }) => {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const { orderId, orderPriceSum, purchaserInfo, orderProducts, status } = orderData;
  const getButtonSet = (statusValue) => {
    switch (statusValue) {
      case 1:
        return <span />;
      default:
        return (
          <div className="ButtonSet">
            <ButtonPayment orderId={orderId} />
          </div>
        );
    }
  };
  return (
    <StyledOrderCard onClick={showModolMessageFunctionDev}>
      <div className="block orderInfo">
        <div className="title">
          <h3>訂單資訊</h3>
        </div>
        <div className="column">
          <p>
            <span className="columnName">訂單編號</span>
            <span className="columnData">{orderId}</span>
          </p>
        </div>
        <div className="column">
          <p>
            <span className="columnName">訂單金額</span>
            <span className="columnData">
              <span>$</span>
              <span>{!orderPriceSum ? 0 : orderPriceSum}</span>
            </span>
          </p>
        </div>
      </div>
      <div className="block orderProductsInfo">
        <div className="title">
          <h3>商品資訊</h3>
        </div>
        {!orderData || !orderData.orderProducts ? (
          <div />
        ) : (
          orderData.orderProducts.map((eachStoreProductsData) => {
            // eslint-disable-next-line prettier/prettier
            return <ProductGroupByStore visibility={orderData} eachCartData={eachStoreProductsData} />;
          })
        )}
      </div>
      {getButtonSet(status)}
      <div className="paddingButtom" />
    </StyledOrderCard>
  );
};

export default OrderCard;
