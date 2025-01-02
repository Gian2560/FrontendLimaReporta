import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DistritoSelect = () => {
    const [distritos, setDistritos] = useState([]);
    const [selectedDistrito, setSelectedDistrito] = useState('');
    const [reportes, setReportes] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Eficiencia',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });

    // Fetch distritos
    useEffect(() => {
        const fetchDistritos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/reportes/distritos');
                const data = await response.json();
                setDistritos(data);
            } catch (error) {
                console.error('Error al obtener los distritos:', error);
            }
        };

        fetchDistritos();
    }, []);

    // Handle distrito change
    const handleDistritoChange = async (event) => {
        const distritoId = event.target.value;
        setSelectedDistrito(distritoId);

        // Fetch eficiencia de operadores para el distrito seleccionado
        try {
            const response = await fetch(`http://localhost:8000/api/reporte/eficiencia/${distritoId}`);
            const data = await response.json();
            console.log('Datos obtenidos:', data);

            // Verificar que la data sea un array y ordenarla por eficiencia de mayor a menor
            const reportesArray = Array.isArray(data) ? data : Object.values(data);

            // Ordenar los operadores por eficiencia de mayor a menor
            const sortedReportes = reportesArray.sort((a, b) => b.eficiencia - a.eficiencia);

            setReportes(sortedReportes);

            // Actualizar chartData
            setChartData({
                labels: sortedReportes.map((operador) => operador.nombre),
                datasets: [
                    {
                        label: 'Eficiencia',
                        data: sortedReportes.map((operador) => operador.eficiencia),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error al obtener el reporte de eficiencia:', error);
        }
    };

    return (
        <div>
            <h2>Selecciona un Distrito</h2>
            <select onChange={handleDistritoChange} value={selectedDistrito}>
                <option value="">Selecciona un distrito</option>
                {distritos.map((distrito) => (
                    <option key={distrito.id} value={distrito.id}>
                        {distrito.nombre}
                    </option>
                ))}
            </select>

            {reportes.length > 0 && (
                <div>
                    <h3>Reporte de Eficiencia de los Operadores</h3>
                    <Bar data={chartData} />
                </div>
            )}
        </div>
    );
};

export default DistritoSelect;
