import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const CargaDatos = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            setError('Por favor selecciona un archivo.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'array' });

            // Seleccionar la primera hoja del archivo Excel
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            jsonData.shift();  // Eliminar la primera fila (cabecera)

            // Función para convertir la fecha en formato 'día/mes/año' a 'año-mes-día'
            const convertirFecha = (fecha) => {
                if (fecha) {
                    const partesFecha = fecha.split('/');  // 'día/mes/año'
                    if (partesFecha.length === 3) {
                        // Convertimos al formato 'año-mes-día' ('YYYY-MM-DD')
                        return `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
                    }
                }
                return null;  // Si no hay fecha, devolver null o valor por defecto
            };

            // Extraer los datos relevantes y convertir las fechas
            const evidencias = jsonData.map(row => {
                let fechaInfraccion = row[12];  // Suponiendo que la fecha de infracción está en la columna 12

                // Convertir la fecha al formato 'año-mes-día'
                fechaInfraccion = convertirFecha(fechaInfraccion);

                return {
                    operador: row[11],
                    usuario_registro: row[18],
                    distrito: row[4],
                    codigo_infraccion: row[2],
                    descripcion_infraccion: "xd",  // Asumí que "xd" es un placeholder
                    id_evidencia: row[0],
                    estado: row[6],
                    fecha_infraccion: fechaInfraccion,  // Fecha convertida correctamente
                };
            });
            console.log("preubita",evidencias);

            // Enviar los datos al backend
            try {
                const response = await fetch('http://localhost:8000/api/evidencias', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ evidencias }),
                });

                if (response.ok) {
                    console.log("Respuesta exitosa:", await response.json());
                    alert('Evidencias cargadas correctamente');
                } else {
                    const errorData = await response.json();
                    setError('Hubo un error al cargar las evidencias.');
                    console.error("Error:", errorData);
                }
            } catch (err) {
                setError('Error al enviar los datos.');
                console.log("Error:", err);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <h2>Cargar Evidencias desde Excel</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Cargar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CargaDatos;
