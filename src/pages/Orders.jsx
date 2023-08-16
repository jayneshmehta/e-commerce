import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import OrdersGroupCard from '../component/Orders/OrdersGroupCard';
import TrackOrderModal from '../component/Orders/TrackOrderModal';
import EmptyOrderlist from '../component/Orders/EmptyOrderlist';

export default function Orders({ userdata }) {
  const [allOrders, setallOrders] = useState([])
  const [ordersByGroupId, setordersByGroupId] = useState([])
  async function getOrders() {
    try {
      var baseURL = `http://192.168.101.102/api/getOrdersByUser-${userdata.id}`;
      await axios.get(baseURL)
        .then(response => {
          setallOrders(response.data);
        }).catch(
          (error) => {
            let message = error.response.data.message;
          }
        )
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    setordersByGroupId([...new Set(allOrders.map(item => item.orderGroupId))]);
  }, [allOrders]);
  return (
    allOrders.length < 1 ? < EmptyOrderlist /> :
      <div className='container mt-5'>
        <TrackOrderModal />
        {
          ordersByGroupId.map((items, index) => {
            return <OrdersGroupCard groupId={items} key={index} />;
          })
        }
      </div>
  )
}
