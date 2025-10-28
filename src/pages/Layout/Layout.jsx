import React from "react";
import {Outlet} from "react-router";
import styles from './Layout.module.css';

export default function Layout() {
    return (
        <div className={styles["app-container"]}>
            <header className={styles["header"]}>🃏 Blackjack</header>
            <main className={styles["main"]}>
                <Outlet />
            </main>
            <footer className={styles["footer"]}>© 2025 Blackjack Demo</footer>
        </div>
    );
}
