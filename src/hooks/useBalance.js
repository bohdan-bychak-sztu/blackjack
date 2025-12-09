import {useEffect, useState} from "react";

export default function useBalance(initialBalance = 1000) {
    const [balance, setBalance] = useState(initialBalance);

    useEffect(() => {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const activePlayer = players.find(player => player.active);
        if (activePlayer) {
            setBalance(activePlayer.balance !== undefined ? activePlayer.balance : initialBalance);
        }
    }, [initialBalance]);

    useEffect(() => {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        const updatedPlayers = players.map(player => {
            if (player.active) {
                return { ...player, balance };
            }
            return player;
        });
        console.log('Balance updated in useBalance:', balance);
        localStorage.setItem('players', JSON.stringify(updatedPlayers));
    }, [balance]);

    const updateBalance = (amount) => {
        setBalance((prevBalance) => prevBalance + amount);
    };

    const resetBalance = () => {
        setBalance(initialBalance);
    };

    return { balance, updateBalance, resetBalance };
}