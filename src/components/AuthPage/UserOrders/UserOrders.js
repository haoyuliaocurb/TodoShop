import { React } from 'react';
import OrderCard from './OrderCard';
import StyledUserOrders from '../../../styles/AuthPage/UserOrder/StyledUserOrders';

const UserOrders = () => {
  return (
    <StyledUserOrders>
      <div className="orderTypeBar">
        <button className="selected" type="button">
          全部
        </button>
        <button type="button">待付款</button>
        <button type="button">待出貨</button>
        <button type="button">待收貨</button>
        <button type="button">完成</button>
        <button type="button">不成立</button>
      </div>
      <div className="OrderCardsContainer">
        {Array.from({ length: 3 }).map(() => (
          <OrderCard />
        ))}
      </div>
    </StyledUserOrders>
  );
};

export default UserOrders;
