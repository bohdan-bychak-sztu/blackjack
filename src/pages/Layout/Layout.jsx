import React, {useState} from "react";
import {Link, NavLink, Outlet} from "react-router";
import styles from './Layout.module.css';
import Modal from "../../components/Modal/Modal.jsx";

export default function Layout() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles["app-container"]}>
            <header className={styles["header"]}>
                <NavLink to={"/start"} className={styles["home-link"]}><img src="/icons/home_icon.png" alt="home" loading="lazy" /></NavLink>
                🃏 Blackjack
                <span className={styles.button} onClick={() => setIsOpen(true)}><img src="/icons/info_icon.png" alt="info" loading="lazy" /></span>
                <Modal isOpen={isOpen} title="How to play Blackjack" onClose={() => setIsOpen(false)}>
                    <p>The goal of Blackjack is to beat the dealer by having a hand total closer to 21 without exceeding it.
                        Cards 2 through 10 are worth their face value, Jacks, Queens, and Kings are all worth 10, and an Ace can
                        count as either 1 or 11. You start by placing a bet and receiving two cards. The dealer also receives
                        two cards, one face up and one face down. If your initial two cards total 21 (a Blackjack), you win 3:2
                        immediately unless the dealer also has Blackjack, which is a tie, or "Push." If you don't have
                        Blackjack, you must decide whether to Hit (take another card), or Stand (keep your current total). You
                        may also have options like Double Down (double your bet and take only one more card) or Split (separate
                        a pair into two hands). If your hand total exceeds 21, you Bust and lose your bet immediately. Once all
                        players have finished their actions, the dealer reveals their face-down card and must follow strict
                        rules: they typically must hit until their total is 17 or more, and then stand. Finally, hands are
                        compared: you win even money (1:1) if your hand total is higher than the dealer's or if the dealer
                        busts. You lose if the dealer's total is higher than yours, and you push if you tie.</p>
                </Modal>
            </header>
            <main className={styles["main"]}>
                <Outlet />
            </main>
            <footer className={styles["footer"]}>© 2025 Blackjack Demo</footer>
        </div>
    );
}
