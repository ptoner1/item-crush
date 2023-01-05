function checkColumnOfFour({ boardHeight, boardWidth, itemGrid, score, setScore, blank, itemIcons }) {
    for (let i = 0; i < (boardHeight - 3) * boardWidth; i++) {
        const columnOfFour = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3];
        const currentItemImg = itemGrid[i].img;
        if (columnOfFour.every(item => itemGrid[item].img === currentItemImg)) {
            if (currentItemImg != blank) {
                setScore(score => score + 4);
                columnOfFour.map((item, idx) => {
                    idx === 3 ? itemGrid[item] = itemIcons.fourInRowIcon : itemGrid[item] = { img: blank, animate: true }
                })
            }
            return true
        }
    }
}

function checkRowOfFour({ boardHeight, boardWidth, itemGrid, score, setScore, blank, skipNumbersRowFour, itemIcons }) {
    for (let i = 0; i < boardWidth * boardHeight; i++) {
        const rowOfFour = [i, i + 1, i + 2, i + 3];
        const currentItemImg = itemGrid[i].img;
        if (skipNumbersRowFour.includes(i)) continue
        if (rowOfFour.every(item => itemGrid[item].img === currentItemImg)) {
            if (currentItemImg != blank) {
                setScore(score => score + 4);
                rowOfFour.map((item, idx) => {
                    idx === 3 ? itemGrid[item] = itemIcons.fourInRowIcon : itemGrid[item] = { img: blank, animate: true }
                })
            }
            return true
        }
    }
}

function checkColumnOfThree({ boardHeight, boardWidth, itemGrid, score, setScore, blank }) {
    for (let i = 0; i < (boardHeight - 2) * boardWidth; i++) {
        const columnOfThree = [i, i + boardWidth, i + boardWidth * 2];
        const currentItemImg = itemGrid[i].img;
        if (columnOfThree.every(item => itemGrid[item].img === currentItemImg)) {
            if (currentItemImg != blank) {
                setScore(score => score + 3);
                columnOfThree.forEach(item => itemGrid[item] = { img: blank });
            }
            return true
        }
    }
}

function checkRowOfThree({ boardHeight, boardWidth, itemGrid, score, setScore, blank, skipNumbersRowThree }) {
    for (let i = 0; i < boardWidth * boardHeight; i++) {
        const rowOfThree = [i, i + 1, i + 2];
        const currentItemImg = itemGrid[i].img;
        if (skipNumbersRowThree.includes(i)) continue
        if (rowOfThree.every(item => itemGrid[item].img === currentItemImg)) {
            if (currentItemImg != blank) {
                setScore(score => score + 3);
                rowOfThree.forEach(item => itemGrid[item] = { img: blank });
            }
            return true
        }
    }
}

export { checkColumnOfFour, checkColumnOfThree, checkRowOfFour, checkRowOfThree }