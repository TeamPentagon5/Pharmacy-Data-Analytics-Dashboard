// MedicineDemandChart.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

function MedicineDemandChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/orders/medicine-demand')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error('Error fetching demand data:', err);
            });
    }, []);

    return (
        <div className="demand_chart_container" style={{ height: 400, marginTop: '30px' }}>
            <h3>Medicine Demand Chart</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MedicineDemandChart;
