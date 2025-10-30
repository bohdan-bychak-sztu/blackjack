import {useState} from "react";
import {calculatePoints} from "../utils/GameUtil.js";

export default function useHand(initialHand = []) {
    const [hand, setHand] = useState([...initialHand]);

    const addCard = (card) => {
        setHand((prevHand) => [...prevHand, card]);
    };

    const clearHand = () => {
        setHand([]);
    };

    const points = calculatePoints(hand);

    return { hand, addCard, clearHand, points, setHand };
}