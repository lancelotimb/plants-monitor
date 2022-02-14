import { useLastDhtMeasurement } from 'lib/api/last-dht-measurement';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';
import humidityIcon from 'public/icons/humidity.png';
import thermometerIcon from 'public/icons/thermometer.png';

import styles from './NavBar.module.css';

type NavItem = {
    id: string;
    label: string;
    href: string;
};

export const NavBar: React.FunctionComponent = () => {
    const { dhtMeasurement } = useLastDhtMeasurement();
    const router = useRouter();

    const isNavItemSelected = (navItem: NavItem) => router.pathname === navItem.href;

    const navItems = [
        {
            id: 'home-page',
            label: 'Home',
            href: '/',
        },
        {
            id: 'settings',
            label: 'Settings',
            href: '/settings',
        },
    ];

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLeft}>
                {navItems.map((navItem) => {
                    const isSelected = isNavItemSelected(navItem);
                    return (
                        <div key={navItem.id}>
                            <Link href={navItem.href}>
                                <a
                                    className={classNames(styles.navItem, {
                                        [styles.navItemSelected]: isSelected,
                                    })}
                                >
                                    {navItem.label}
                                </a>
                            </Link>
                            {isSelected && <div className={styles.navItemUnderline} />}
                        </div>
                    );
                })}
            </div>
            {dhtMeasurement ? (
                <div className={styles.navbarRight}>
                    <div className={styles.navbarRightItem}>
                        <Image src={humidityIcon} alt="Humidity" height={20} width={20} />
                        <span>{dhtMeasurement.humidity} %</span>
                    </div>
                    <div className={styles.navbarRightItem}>
                        <Image src={thermometerIcon} alt="Thermometer" height={20} width={20} />
                        <span>{dhtMeasurement.temperature} °C</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
