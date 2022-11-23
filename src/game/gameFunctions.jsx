import {nanoid} from "nanoid"

// toggled by an invisible button
function triggerWin(setWon) {
    setWon(true);
}

function generateDice() {
    let newDice = [];
    for (let i = 0; i < 64; i++) {
        newDice.push({
        id: nanoid(),
        isFrozen: false,
        value: Math.ceil(Math.random() * 6)
        })
    }
    return newDice;
}

function toggleDie(id, setDice) {
    setDice(prevState => prevState.map(item => (
        item.id === id ? {...item, isFrozen: !item.isFrozen} : {...item}
    )))
}

function updateDice(setDice) {
    setDice(prevState => (
        prevState.map(item => {
        if(!item.isFrozen) {
            let newValue = generateNum(item.value);
            return {...item, value: newValue};
        };
        return {...item};
        })
    ))

    function generateNum(n) {
        let newN = Math.ceil(Math.random() * 6);
        if(newN === n) return generateNum(n);
        return newN;
    }
}

function resetGame(setWon, setDice) {
    setWon(false);
    setDice(generateDice());
}

export {
    triggerWin,
    generateDice,
    toggleDie,
    updateDice,
    resetGame
}