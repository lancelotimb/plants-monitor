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

    return (
        <div className={styles.homePageContainer}>
            <NavBar />
            <div className={styles.widgetsContainer}>
                {lastMeasurement?.value.map((valuePoint, index) => (
                    <SensorTile key={index} sensorLabel="Plant Name" currentValue={valuePoint} />
                ))}
            </div>
        </div>
    );
};
