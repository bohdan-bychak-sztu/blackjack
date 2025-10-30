import React from "react";
import {Link} from "react-router";
import styles from './Startpage.module.css';

export default function StartPage() {
    return (
        <div>
            <h2>Welcome to Blackjack</h2>
            <p>Try to get as close to 21 as possible without going over!</p>
            <Link className={styles['link']} to={"/game"}>Start Game</Link>
        </div>
    );
}
