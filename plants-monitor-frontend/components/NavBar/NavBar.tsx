import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './NavBar.module.css';

type NavItem = {
    id: string;
    label: string;
    href: string;
};

export const NavBar: React.FunctionComponent = () => {
    const router = useRouter();

    const isSelected = (navItem: NavItem) => router.pathname === navItem.href;

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
            {navItems.map((navItem) => (
                <div key={navItem.id}>
                    <Link href={navItem.href}>
                        <a className={styles.navItem}>{navItem.label}</a>
                    </Link>
                    {isSelected(navItem) && <div className={styles.navItemUnderline} />}
                </div>
            ))}
        </div>
    );
};
