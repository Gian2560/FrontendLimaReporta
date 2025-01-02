import './Tabla.css';

import { useState } from 'react';
import { IconButton, Menu, MenuItem, TablePagination } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccionOpciones from '../accionOpciones/AccionOpciones';
import TablaHeader from '../tablaHeader/TablaHeader';
import TablaFila from '../tablaFila/TablaFila';

const Tabla = ({ header, data, style, columnas , accion, page, rowsPerPage, totalRows, setPage, setRowsPerPage }) => {
    /*
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    */

    const hayAccion = accion ? true : false;
    /*
    const displayedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };
    */
    // Cambia la página usando directamente setPage
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Cambia las filas por página usando directamente setRowsPerPage
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };    

    return (
        <div className='tabla'>
            <div className='tabla-header'>
                <TablaHeader header={header} accion={hayAccion}/>
            </div>
            <div className='tabla-filas'>
                {
                    data.map((fila, index) => (
                        <TablaFila key={index} data={fila} columnas={columnas} accion={accion} style={style}/>
                    ))
                }
            </div>
            <TablePagination
                component="div"
                count={totalRows}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
        </div>
    )
}

export default Tabla;