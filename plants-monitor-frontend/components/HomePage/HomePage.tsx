import { useEnrichedHumidityMeasurements } from 'lib/hooks/use-enriched-humidity-measurements';
import * as React from 'react';
import { NavBar } from 'components/NavBar';
import { SensorTile } from 'components/SensorTile';
import { PumpTile } from 'components/PumpTile';

import styles from './HomePage.module.css';

const REFRESH_INTERVAL = 5000;

export const HomePage: React.FunctionComponent = () => {
    const { sensorsWithData, isLoading, isError } =
        useEnrichedHumidityMeasurements(REFRESH_INTERVAL);

    if (isError) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    const pumpIds = ['A', 'B', 'C', 'D'];

    return (
        <div className={styles.homePageContainer}>
            <NavBar />
            <div className={styles.widgetsContainer}>
                {sensorsWithData?.map((sensor, index) => (
                    <SensorTile
                        key={index}
                        sensorLabel={sensor.label}
                        currentValue={sensor.lastMeasurement?.value || 0}
                    />
                ))}
                {pumpIds.map((pumpId) => (
                    <PumpTile pumpId={pumpId} key={pumpId} />
                ))}
            </div>
        </div>
    );
};
