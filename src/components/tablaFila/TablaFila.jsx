import './TablaFila.css';

import React from 'react';
import AccionOpciones from '../accionOpciones/AccionOpciones';
import FilaCelda from '../filaCelda/FilaCelda';

const TablaFila = ({ data, accion, style = "primary", columnas }) => {
    const fila_primary = style === "primary" ? "fila-primary" : "fila-secondary";

    if (!data) {
        console.error('data es undefined o null:', data);
        return null;  // Evita renderizar si data no es válido
    }

    //console.log(Object.values(data));
    //console.log(columnas);

    return (
        <div className={'fila' + " " + fila_primary}>
            {Object.keys(data).map((key, index) => {
                const columna = columnas[key];
                //console.log(key);
                if (columna && columna.mostrar) {
                    if (columna.component) {
                        return (
                            <FilaCelda
                                key={index}
                                value={data[key]}
                                component={columna.component}
                                style={columna.style || ""} // Aplicar el estilo si está definido
                            />
                        );
                    } else {
                        return (
                            <FilaCelda
                                key={index}
                                value={data[key]}
                                style={columna.style || ""} // Aplicar el estilo si está definido
                            />
                        );
                    }


                }
                return null; // No renderizar si 'mostrar' es false

                /*<FilaCelda key={index} value={value} />*/
            })}

            {
                accion &&
                <div className='value-celda'>
                    {React.cloneElement(accion, {data: data})}
                </div>
            }

        </div>
    )
}

export default TablaFila;