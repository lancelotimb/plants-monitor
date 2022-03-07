import { API_ROUTE_ADD_COMMAND } from 'lib/constants/api-routes';
import * as React from 'react';
import { NavBar } from 'components/NavBar';
import { SensorTile } from 'components/SensorTile';
import { useHumidityMeasurements } from 'lib/api/humidity-measurements';

import styles from './HomePage.module.css';

export const HomePage: React.FunctionComponent = () => {
    const { measurements, isLoading, isError } = useHumidityMeasurements();

    if (isError) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    const lastMeasurement = measurements?.at(-1);

    const activatePump = (pumpId: string) => {
        fetch(API_ROUTE_ADD_COMMAND, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: 'ACTIVATE_PUMP_' + pumpId + '_2000' }),
        });
    };

    return (
        <div className={styles.homePageContainer}>
            <NavBar />
            <div className={styles.widgetsContainer}>
                {lastMeasurement?.value.map((valuePoint, index) => (
                    <SensorTile key={index} sensorLabel="Plant Name" currentValue={valuePoint} />
                ))}
                <button onClick={() => activatePump('A')}>PUMP A</button>
                <button onClick={() => activatePump('B')}>PUMP B</button>
                <button onClick={() => activatePump('C')}>PUMP C</button>
                <button onClick={() => activatePump('D')}>PUMP D</button>
            </div>
        </div>
    );
};
