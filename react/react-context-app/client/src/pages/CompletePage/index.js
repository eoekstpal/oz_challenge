import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../context/OrderContext'
import axios from 'axios';

const CompletePage = ({ setStep }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderData] = useContext(OrderContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData])

  const orderCompleted = async (orderData) => {
    try {
      const response = await axios.post('http://localhost:4000/order', orderData);
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ))

  if (loading) {
    return <div>loading...</div>
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>주문 목록</h3>
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <th>number</th>
              <th>price</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
        <br/>
        <button className='rainbow rainbow-1' onClick={() => setStep(0)}>
          첫페이지로
        </button>
      </div>
    )
  }
}

export default CompletePage