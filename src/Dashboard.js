import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Importa il file CSS

function PeschereccioDashboard() {
    // Stato per i dati (uguale a prima)
    const [meteoData, setMeteoData] = useState({
        temperatura: 18.5,
        umidita: 65,
        vento: { velocita: 12, direzione: 'NE' },
        descrizione: 'Parzialmente nuvoloso'
    });

    const [carburanteData, setCarburanteData] = useState({
        diesel: 1.38,
        updated: '12 Marzo 2025, 10:30'
    });

    const [pescatoData, setPescatoData] = useState([
        { tipo: 'Naselli', quantita: 120, unita: 'kg', prezzo: 18 },
        { tipo: 'Sgombri', quantita: 85, unita: 'kg', prezzo: 6.20 },
        { tipo: 'Orate', quantita: 45, unita: 'kg', prezzo: 12.80 },
        { tipo: 'Spigole', quantita: 38, unita: 'kg', prezzo: 14.50 },
        { tipo: 'Totani', quantita: 25, unita: 'kg', prezzo: 9.30 }
    ]);

    const [manutenzioneData, setManutenzioneData] = useState([
        { componente: 'Motore principale', ultimaData: '15/02/2025', prossimaData: '15/05/2025', stato: 'Buono' },
        { componente: 'Generatore', ultimaData: '01/03/2025', prossimaData: '01/06/2025', stato: 'Ottimo' },
        { componente: 'Attrezzatura di pesca', ultimaData: '05/03/2025', prossimaData: '05/04/2025', stato: 'Da controllare' },
        { componente: 'Carena', ultimaData: '10/01/2025', prossimaData: '10/07/2025', stato: 'Buono' }
    ]);

    const [currentTime, setCurrentTime] = useState(new Date());

    // Effetti per l'aggiornamento dell'ora e dei dati meteo
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const variazione = (Math.random() - 0.5) * 0.2;
            const variazioneVento = (Math.random() - 0.5) * 0.5;

            setMeteoData(prev => ({
                ...prev,
                temperatura: +(prev.temperatura + variazione).toFixed(1),
                umidita: Math.min(100, Math.max(30, Math.round(prev.umidita + variazione * 5))),
                vento: {
                    ...prev.vento,
                    velocita: +(prev.vento.velocita + variazioneVento).toFixed(1)
                }
            }));
        }, 10000);

        return () => clearInterval(timer);
    }, []);

    // Calcolo totale vendita pesce
    const calcolaTotalePescato = () => {
        return pescatoData.reduce((acc, item) => acc + (item.quantita * item.prezzo), 0).toFixed(2);
    };

    // Formattazione ora
    const formatTime = (date) => {
        return date.toLocaleTimeString('it-IT');
    };

    // Formattazione data
    const formatDate = (date) => {
        return date.toLocaleDateString('it-IT', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Funzione per determinare la classe di stato
    const getStatusClass = (stato) => {
        switch(stato) {
            case 'Ottimo':
                return 'status-optimal';
            case 'Buono':
                return 'status-good';
            default:
                return 'status-warning';
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Dashboard Peschereccio - Porto di Imperia</h1>
                <div className="dashboard-date-time">
                    <p className="dashboard-date">{formatDate(currentTime)}</p>
                    <p className="dashboard-time">{formatTime(currentTime)}</p>
                </div>
            </header>

            <div className="grid-container">
                {/* Sezione Meteo */}
                <div className="section">
                    <h2 className="section-title">Meteo Imperia</h2>

                    <div className="inner-grid">
                        <div className="data-card">
                            <p className="data-label">Temperatura</p>
                            <p className="data-value">{meteoData.temperatura}°C</p>
                        </div>

                        <div className="data-card">
                            <p className="data-label">Umidita'</p>
                            <p className="data-value">{meteoData.umidita}%</p>
                        </div>

                        <div className="data-card full-width">
                            <p className="data-label">Vento</p>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p className="data-value" style={{ marginRight: '0.5rem' }}>{meteoData.vento.velocita} km/h</p>
                                <p className="data-unit">{meteoData.vento.direzione}</p>
                            </div>
                        </div>

                        <div className="data-card full-width">
                            <p className="data-label">Condizioni</p>
                            <p className="data-value-medium">{meteoData.descrizione}</p>
                        </div>
                    </div>
                </div>

                {/* Sezione Carburante */}
                <div className="section">
                    <h2 className="section-title">Carburante Imperia</h2>

                    <div style={{ marginBottom: '1rem' }}>
                        <div className="fuel-card">
                            <p className="data-label">Prezzo Diesel</p>
                            <p className="fuel-price">{carburanteData.diesel} €/L</p>
                        </div>
                    </div>

                    <div className="cost-calculator">
                        <h3 className="cost-title">Calcolo Costi</h3>
                        <div className="cost-grid">
                            <div>
                                <p className="data-label">100 Litri</p>
                                <p style={{ fontWeight: 'bold' }}>{(carburanteData.diesel * 100).toFixed(2)} €</p>
                            </div>
                            <div>
                                <p className="data-label">500 Litri</p>
                                <p style={{ fontWeight: 'bold' }}>{(carburanteData.diesel * 500).toFixed(2)} €</p>
                            </div>
                            <div>
                                <p className="data-label">1000 Litri</p>
                                <p style={{ fontWeight: 'bold' }}>{(carburanteData.diesel * 1000).toFixed(2)} €</p>
                            </div>
                        </div>
                    </div>

                    <p className="fuel-updated">Aggiornato: {carburanteData.updated}</p>
                </div>
            </div>

            {/* Sezione Pescato del Giorno */}
            <div className="section" style={{ marginTop: '1.5rem' }}>
                <h2 className="section-title">Pescato del Giorno</h2>

                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Tipo</th>
                            <th className="text-right">Quantità</th>
                            <th className="text-right">Prezzo (€/kg)</th>
                            <th className="text-right">Totale (€)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pescatoData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "striped" : ""}>
                                <td>{item.tipo}</td>
                                <td className="text-right">{item.quantita} {item.unita}</td>
                                <td className="text-right">{item.prezzo.toFixed(2)}</td>
                                <td className="text-right" style={{ fontWeight: '500' }}>{(item.quantita * item.prezzo).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3" className="text-right" style={{ fontWeight: '700' }}>Totale Vendita</td>
                            <td className="text-right" style={{ fontWeight: '700' }}>{calcolaTotalePescato()} €</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="catch-summary">
                    <div className="daily-sales">
                        <p className="data-label">Vendita Odierna</p>
                        <p className="sales-value">{calcolaTotalePescato()} €</p>
                    </div>

                    <div className="total-catch">
                        <p className="data-label">Totale Pescato</p>
                        <p className="catch-value">
                            {pescatoData.reduce((acc, item) => acc + item.quantita, 0)} kg
                        </p>
                    </div>
                </div>
            </div>

            {/* Sezione Manutenzione Barca */}
            <div className="section" style={{ marginTop: '1.5rem' }}>
                <h2 className="section-title">Manutenzione Barca</h2>

                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Componente</th>
                            <th className="text-center">Ultima Manutenzione</th>
                            <th className="text-center">Prossima Manutenzione</th>
                            <th className="text-center">Stato</th>
                        </tr>
                        </thead>
                        <tbody>
                        {manutenzioneData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "striped" : ""}>
                                <td>{item.componente}</td>
                                <td className="text-center">{item.ultimaData}</td>
                                <td className="text-center">{item.prossimaData}</td>
                                <td className="text-center">
                    <span className={`status-badge ${getStatusClass(item.stato)}`}>
                      {item.stato}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <h3 className="cost-title">Prossime Manutenzioni</h3>
                    <div className="cost-calculator">
                        <ul className="maintenance-list">
                            {manutenzioneData
                                .sort((a, b) => {
                                    const dateA = new Date(a.prossimaData.split('/').reverse().join('-'));
                                    const dateB = new Date(b.prossimaData.split('/').reverse().join('-'));
                                    return dateA - dateB;
                                })
                                .map((item, index) => (
                                    <li key={index} className="maintenance-item">
                                        <div className="maintenance-flex">
                                            <div>
                                                <span style={{ fontWeight: '500' }}>{item.componente}</span>
                                                <p className="maintenance-info">Stato: {item.stato}</p>
                                            </div>
                                            <div className="maintenance-date">
                                                <span>{item.prossimaData}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                                .slice(0, 3)
                            }
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sezione Informazioni Marittime */}
            <div className="section" style={{ marginTop: '1.5rem' }}>
                <h2 className="section-title">Condizioni Mare</h2>

                <div className="inner-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                    <div className="data-card">
                        <p className="data-label">Stato del Mare</p>
                        <p className="data-value-medium">Poco mosso</p>
                    </div>

                    <div className="data-card">
                        <p className="data-label">Altezza Onde</p>
                        <p className="data-value-medium">0.8m</p>
                    </div>

                    <div className="data-card">
                        <p className="data-label">Temperatura Acqua</p>
                        <p className="data-value-medium">16.2°C</p>
                    </div>
                </div>
            </div>

            <footer className="dashboard-footer">
                <p>Dashboard Peschereccio v1.0 | Porto di Imperia</p>
            </footer>
        </div>
    );
};

export default PeschereccioDashboard;