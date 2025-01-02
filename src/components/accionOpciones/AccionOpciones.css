import './AccionOpciones.css';

import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AccionOpciones = ({ data ,opciones, handleEditProp, handleDeleteProp, handleVerProp }) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleEdit = () => {
        console.log('Editar');
        console.log(data)
        handleClose(); // Cierra el menú después de seleccionar la opción

        handleEditProp(data);
    };

    const handleDelete = () => {
        console.log('Eliminar');
        handleClose(); // Cierra el menú después de seleccionar la opción

        handleDeleteProp(data);
    };
  
    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton aria-label="more" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            {/* Menú desplegable con opciones */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5, // Ajusta la altura del menú
                        width: '150px',
                    },
                }}
            >
                {/* Opción de Editar */}
                <MenuItem onClick={handleEdit}>Editar</MenuItem>
                {/* Opción de Eliminar */}
                <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
            </Menu>
        </>
    )
}


export default AccionOpciones;