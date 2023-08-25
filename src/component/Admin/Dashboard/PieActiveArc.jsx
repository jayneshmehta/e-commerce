import * as React from 'react';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import { GetOrders } from '../AllStates';


export default function PieActiveArc() {
  const orders = GetOrders();
  var q1 = 0;
  var q2 = 0;
  var q3 = 0;
  var q4 = 0;
  var q5 = 0;
  var q6 = 0;
  var q7 = 0;
  orders.forEach(element => {
    var data = element.status;
    if (data == 'In process') {
      q1++;
    } else if (data == 'Pending') {
      q2++;
    } else if (data == 'Ready for dispatch') {
      q3++;
    } else if (data == 'Dispatched') {
      q4++;
    } else if (data == 'Out for Delivery') {
      q5++;
    } else if (data == 'Delivered') {
      q6++;
    } else if (data == 'Cancelled') {
      q7++;
    }
  });
  const data = [
    { id: 0, value: q1, label: ' In process ' },
    { id: 0, value: q2, label: ' Pending' },
    { id: 0, value: q3, label: ' Ready for dispatch' },
    { id: 1, value: q4, label: 'Dispatched' },
    { id: 2, value: q5, label: 'Out for delivery' },
    { id: 2, value: q6, label: 'Delivered' },
    { id: 2, value: q7, label: 'Cancelled' },
  ];

  return (
    <PieChart
      colors={['yellow', '#4545e2ab', '#8b8b8bab', '#8bcc00', '#f47a37cf', '#3eb07b', 'red']}
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
          label: 'status of orders',
        },
      ]}
      sx={{
        [`& .${pieArcClasses.faded}`]: {
          fill: 'gray',
        },
      }}
      height={200}
    />
  );
}