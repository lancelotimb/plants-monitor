import * as React from 'react';
import { NavBar } from 'components/NavBar';
import { SensorTile } from 'components/SensorTile';
import { useHumidityMeasurements } from 'lib/api/humidity-measurements';
import { PumpTile } from 'components/PumpTile';
import { useHumiditySensors } from 'lib/api/humidity-sensors';

import styles from './HomePage.module.css';

export const HomePage: React.FunctionComponent = () => {
    const { measurements, isLoading, isError } = useHumidityMeasurements();
    const { sensors } = useHumiditySensors();

    if (isError) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    const lastMeasurement = measurements?.at(-1);

    const pumpIds = ['A', 'B', 'C', 'D'];

    return (
        <div className={styles.homePageContainer}>
            <NavBar />
            <div className={styles.widgetsContainer}>
                {lastMeasurement?.value.map((valuePoint, index) => (
                    <SensorTile key={index} sensorLabel="Plant Name" currentValue={valuePoint} />
                ))}
                {pumpIds.map((pumpId) => (
                    <PumpTile pumpId={pumpId} key={pumpId} />
                ))}
                {sensors?.map((sensor) => (
                    <div key={sensor.id}>{sensor.label}</div>
                ))}
            </div>
        </div>
    );
};
