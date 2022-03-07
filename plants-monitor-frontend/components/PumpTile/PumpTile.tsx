import { API_ROUTE_ADD_COMMAND } from 'lib/constants/api-routes';
import * as React from 'react';

import styles from './PumpTile.module.css';

export interface PumpTileProps {
    pumpId: string;
}

export const PumpTile: React.FunctionComponent<PumpTileProps> = ({ pumpId }) => {
    const activatePump = () => {
        fetch(API_ROUTE_ADD_COMMAND, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: 'ACTIVATE_PUMP_' + pumpId + '_6000' }),
        });
    };

    return (
        <div className={styles.pumpTile} onClick={activatePump}>
            <div className={styles.title}>Pump {pumpId}</div>
            <div className={styles.value}>
                <span>Launch 6s</span>
            </div>
        </div>
    );
};
