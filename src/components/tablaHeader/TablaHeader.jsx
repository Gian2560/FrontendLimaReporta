import HeaderCelda from '../headerCelda/HeaderCelda';
import './TablaHeader.css';

const TablaHeader = ({ header, accion }) => {

    return (
        <div className='tabla-header-content'>
            {header.map((label, index) => (
                <HeaderCelda key={index} label={label} />
            ))}
            {
                accion &&
                <HeaderCelda label="Acción" />
            }
        </div>
    )
}

export default TablaHeader;