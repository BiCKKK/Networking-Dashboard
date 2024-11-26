// src/components/TrafficGraph.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const TrafficGraph = ({ deviceId, timeRange }) => {
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Bandwidth (bytes/sec)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    });

    const [loading, setLoading] = useState(true);

    const fetchMonitoringData = async () => {
        try {
            setLoading(true);

            const response = await axios.get('localhost:5050/api/monitoring_data', {
                params: { device_id: deviceId, limit: 50 },
            });

            const monitoringData = response.data;

            const labels = monitoringData.map((item) =>
                new Date(item.timestamp).toLocaleTimeString()
            );
            const data = monitoringData.map((item) => item.bandwidth);

            setGraphData((prev) => ({
                ...prev,
                labels,
                datasets: [
                    {
                        ...prev.datasets[0],
                        data,
                    },
                ],
            }));

            setLoading(false);
        } catch (error) {
            console.error('Error fetching monitoring data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMonitoringData();
        const interval = setInterval(fetchMonitoringData, 5000); // Fetch data every 5 seconds
        return () => clearInterval(interval);
    }, [deviceId, timeRange]);

    return (
        <div>
            {loading ? (
                <p>Loading traffic data...</p>
            ) : (
                <Line
                    data={graphData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Time',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Bandwidth (bytes/sec)',
                                },
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default TrafficGraph;

