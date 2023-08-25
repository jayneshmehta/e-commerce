import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { GetOrders } from '../AllStates';
import { ChartsXAxis } from '@mui/x-charts';

export default function OrderedGraph() {
    const orders = GetOrders();
    var q1 = 0;
    var q2 = 0;
    var q3 = 0;
    var q4 = 0;
    orders.forEach(element => {
        var date = new Date(element.created_at);
        if ((date.getMonth() + 1) >= 1 && (date.getMonth() + 1) <= 3) {
            q1++;
        } else if ((date.getMonth() + 1) >= 4 && (date.getMonth() + 1) <= 6) {
            q2++;
        } else if ((date.getMonth() + 1) >= 7 && (date.getMonth() + 1) <= 9) {
            q3++;
        } else if ((date.getMonth() + 1) >= 9 && (date.getMonth() + 1) <= 12) {
            q4++;
        }
    });

    return (
        <>
            <BarChart
                xAxis={[
                    {
                        id: 'Orders',
                        data: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
                        scaleType: 'band',
                        label: 'orders for 2023'
                    },
                ]}
                series={[
                    {
                        data: [q1, q2, q3, q4],
                    },
                ]}
                width={500}
                height={300}
            />
            {/* <ChartsXAxis label="Years" position="bottom" axisId="Orders" /> */}
        </>
    )
}
