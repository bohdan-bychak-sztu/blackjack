import { useEffect, useState } from "react";

function useAnimatedHand(cards = []) {
    const [animatedCards, setAnimatedCards] = useState([]);
    const [removingCards, setRemovingCards] = useState([]);

    useEffect(() => {
        let timeout;

        if (cards.length > animatedCards.length) {
            timeout = setTimeout(() => {
                setAnimatedCards((prev) => [...prev, cards[prev.length]]);
            }, 300);
        } else if (cards.length < animatedCards.length) {
            const cardsToRemove = animatedCards.filter((card) => !cards.includes(card));
            setRemovingCards(cardsToRemove);

            timeout = setTimeout(() => {
                setAnimatedCards(cards);
                setRemovingCards([]);
            }, 500);
        }

        return () => clearTimeout(timeout);
    }, [cards, animatedCards]);

    return { animatedCards, removingCards };
}

export default useAnimatedHand;