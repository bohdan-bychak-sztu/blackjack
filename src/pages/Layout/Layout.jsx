import React from "react";
import {Link, NavLink, Outlet} from "react-router";
import styles from './Layout.module.css';

export default function Layout() {
    return (
        <div className={styles["app-container"]}>
            <header className={styles["header"]}>
                <NavLink to={"/start"} className={styles["home-link"]}><img src="/icons/home_icon.png" alt="home"/></NavLink>
                🃏 Blackjack
                <Link to={"/about"} className={styles["about-link"]}>Info</Link>
            </header>
            <main className={styles["main"]}>
                <Outlet />
            </main>
            <footer className={styles["footer"]}>© 2025 Blackjack Demo</footer>
        </div>
    );
}
