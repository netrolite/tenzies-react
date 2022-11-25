import {nanoid} from "nanoid"

// if shortenMillisec is true, returns milliseconds as a 2-digit number. Otherwise, as a 3-digit number
function formatTimeElapsed(millisecElapsed) {
    const min = Math.floor(millisecElapsed / 60000);
    const sec = Math.floor((millisecElapsed - min * 60000) / 1000);
    const ms = millisecElapsed - min * 60000 - sec * 1000;

    const time = {min: min, sec: sec, ms: ms};

    for (let timeUnit of Object.keys(time)) {
        const len = time[timeUnit].toString().length
        if (len < 2 || (timeUnit === "ms" && len < 3)) {
            const newVal = "0" + time[timeUnit].toString();
            time[timeUnit] = newVal;
        }
    }

    return time;
}

// toggled by an invisible button
function triggerWin(setWon, millisec) {
    setWon(true);
    // if bestTime doesn't exist, or its value is greater than milliseconds passed, or its type is undefined
    if (!localStorage.getItem("bestTime")
    || localStorage.getItem("bestTime") > millisec) {
        localStorage.setItem("bestTime", millisec);
    }
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
    setDice(prev => prev.map(item => (
        item.id === id ? {...item, isFrozen: !item.isFrozen} : {...item}
    )))
}

function generateNum(n) {
    let newN = Math.ceil(Math.random() * 6);
    if(newN === n) return generateNum(n);
    return newN;
}

function updateDice(setDice) {
    setDice(prev => (
        prev.map(item => {
        if(!item.isFrozen) {
            let newValue = generateNum(item.value);
            return {...item, value: newValue};
        };
        return {...item};
        })
    ))
}

// separate function for updating dice on spacebar press
// triggered "Roll" button when used the same function
function updateDiceSpacebar(setDice) {
    setDice(prev => (
        prev.map(item => {
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

function resetGame(setWon, setDice, setMilliseconds) {
    setWon(false);
    setDice(generateDice());
    setMilliseconds(0);
}

export {
    formatTimeElapsed,
    triggerWin,
    generateDice,
    toggleDie,
    updateDice,
    updateDiceSpacebar,
    resetGame
}
