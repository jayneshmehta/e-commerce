import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { GetOrders } from '../AllStates';
import { ChartsXAxis } from '@mui/x-charts';

export default function Alloversales() {
    const orders = GetOrders();
    var q1 = 0;
    var q2 = 0;
    var q3 = 0;
    var q4 = 0;
    orders.forEach(element => {
        var date = new Date(element.created_at);
        if ((date.getFullYear() ) == 2020 ) {
            q1++;
        } else if ((date.getFullYear() ) == 2021 ) {
            q2++;
        } else if ((date.getFullYear() ) == 2022 ) {
            q3++;
        } else if ((date.getFullYear() ) == 2023 ) {
            q4++;
        }
    });

    return (
        <>
            <BarChart
                xAxis={[
                    {
                        id: 'Orders',
                        data: ['2020', '2021', '2022', '2023'],
                        scaleType: 'band',
                        label: 'orders for all years'
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
