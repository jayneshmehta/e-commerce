import { LineChart } from '@mui/x-charts'
import React from 'react'
import { GetOrders } from '../AllStates';

export default function Salesgraph() {
    const orders = GetOrders();
    var m1 = 0;
    var m2 = 0;
    var m3 = 0;
    var m4 = 0;
    var m5 = 0;
    var m6 = 0;
    var m7 = 0;
    var m8 = 0;
    var m9 = 0;
    var m10 = 0;
    var m11 = 0;
    var m12 = 0;
    orders.forEach(element => {
        var date = new Date(element.created_at);
        if ((date.getMonth() + 1) == 1 ) {
            m1++;
        } else if ((date.getMonth() + 1) == 2) {
            m2++;
        } else if ((date.getMonth() + 1) == 3) {
            m3++;
        } else if ((date.getMonth() + 1) == 4) {
            m4++;
        } else if ((date.getMonth() + 1) == 5) {
            m5++;
        } else if ((date.getMonth() + 1) == 6) {
            m6++;
        } else if ((date.getMonth() + 1) == 7) {
            m7++;
        } else if ((date.getMonth() + 1) == 8) {
            m8++;
        } else if ((date.getMonth() + 1) == 9) {
            m9++;
        } else if ((date.getMonth() + 1) == 10) {
            m10++;
        } else if ((date.getMonth() + 1) == 11) {
            m11++;
        } else if ((date.getMonth() + 1) == 12) {
            m12++;
        }

    });
    return (
        <div>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
                series={[
                    {
                        data: [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12],
                    },
                ]}
                width={500}
                height={300}
            />
        </div>
    )
}
