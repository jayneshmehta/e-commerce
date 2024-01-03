import axios from 'axios';
import env from "react-dotenv";
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import OrdersGroupCard from '../component/Orders/OrdersGroupCard';
import TrackOrderModal from '../component/Orders/TrackOrderModal';
import EmptyOrderlist from '../component/Orders/EmptyOrderlist';
import { useSelector } from 'react-redux';

export default function Orders() {
  const userdata = useSelector((state) => state.userdata);
  const [allOrders, setallOrders] = useState([])
  const [ordersByGroupId, setordersByGroupId] = useState([])
  
  async function getOrders() {
    try {
      var token = JSON.parse(sessionStorage.getItem("token"));
      const config = { headers: { 'Authorization': 'Bearer ' + token } };
      var baseURL = `${env.API_URL}getOrdersByUser-${userdata.id}`;
      await axios.get(baseURL,config)
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
