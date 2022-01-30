import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './SensorTile.module.css';

export interface SensorTileProps {
    sensorLabel: string;
    currentValue: number;
}

export const SensorTile: React.FunctionComponent<SensorTileProps> = ({
    sensorLabel,
    currentValue,
}) => {
    return (
        <div className={styles.sensorTile}>
            <div className={styles.title}>{sensorLabel}</div>
            <div className={styles.value}>
                <span>{currentValue}%</span>
            </div>
        </div>
    );
};
