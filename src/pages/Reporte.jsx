// src/Reportes/ReporteOperadores.js

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import DistritoSelect from '../components/DistritoSelect';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ReporteOperadores = () => {
    const [reportes, setReportes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/reportes/eficiencia-operador')
            .then(response => response.json())
            .then(data => setReportes(data));
    }, []);

    const chartData = {
        labels: reportes.map(report => report.nombre),
        datasets: [
            {
                label: 'Eficiencia (%)',
                data: reportes.map(report => report.eficiencia),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div>
            <h2>Reporte de Eficiencia de Operadores</h2>
            <DistritoSelect></DistritoSelect>
            <Line data={chartData} />
            
        </div>
    );
};

export default ReporteOperadores;
