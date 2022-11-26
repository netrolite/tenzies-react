import {nanoid} from "nanoid"

// if shortenMillisec is true, returns milliseconds as a 2-digit number. Otherwise, as a 3-digit number
function formatTimeElapsed(millisecElapsed) {
    // millisecElapsed is undefined, return "--"
    if(!millisecElapsed) return "--"

    const min = Math.floor(millisecElapsed / 60000);
    const sec = Math.floor((millisecElapsed - min * 60000) / 1000);
    const ms = millisecElapsed - min * 60000 - sec * 1000;

    const time = {min: min, sec: sec, ms: ms};

    for (let timeUnit of Object.keys(time)) {
        const len = time[timeUnit].toString().length
        if (len < 2) {
            const newVal = "0" + time[timeUnit].toString();
            time[timeUnit] = newVal;
        }
        else if (timeUnit === "ms" && len > 2) {
            const newVal = time[timeUnit].toString().split("");
            newVal.pop();
            time[timeUnit] = newVal.join("");
        }
    }

    return `${time.min}:${time.sec}:${time.ms}`;
}

// toggled by an invisible button
function triggerWin(setWon, millisec) {
    setWon(true);
    // if bestTime is undefined, or its value is greater than milliseconds passed
    if (!localStorage.getItem("bestTime")
    || localStorage.getItem("bestTime") > millisec) {
        localStorage.setItem("tempBestTime", millisec);
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
}

function setBestTime() {
    const temp = localStorage.getItem("tempBestTime");
    const curr = localStorage.getItem("bestTime");
    console.log(curr);
    console.log(temp);
    if (!curr || curr > temp) {
        console.log("set", temp);
        localStorage.setItem("bestTime", temp);
    }
}

function resetGame(setWon, setDice, setMilliseconds, setTarget) {
    setWon(false);
    setDice(generateDice());
    setMilliseconds(0);
    setTarget(Math.ceil(Math.random() * 6));
    setBestTime();
}

function quitToMenu(navigate) {
    setBestTime();
    navigate("/")
}

export {
    formatTimeElapsed,
    triggerWin,
    generateDice,
    toggleDie,
    updateDice,
    updateDiceSpacebar,
    resetGame,
    setBestTime,
    quitToMenu
}
