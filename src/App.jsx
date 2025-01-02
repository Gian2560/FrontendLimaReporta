import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CargaDatos from '../src/pages/CargaDatos'; // El componente que creaste para cargar el Excel
import Home from '../src/pages/CargaDatos'; // Un componente para la página principal (puedes crear este como un placeholder)
import Reporte from '../src/pages/Reporte'; // El componente que creaste para cargar el Excel

function App() {
    return (
        <Router>
            <div>
                <h1>Bienvenido a la aplicación de gestión de evidencias</h1>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Inicio</a>
                        </li>
                        <li>
                            <a href="/cargar-evidencias">Cargar Evidencias</a>
                        </li>
                        <li>
                            <a href="/reporte">Reporte</a>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cargar-evidencias" element={<CargaDatos />} />
                    <Route path="/reporte" element={<Reporte />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
