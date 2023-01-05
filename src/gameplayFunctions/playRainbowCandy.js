export default function playRainbowCandy(exportVariables) {
    const {
        blank,
        boardWidth,
        boardHeight,
        itemIcons,
        itemGrid,
        itemBeingDragged,
        itemBeingDraggedOver,
        score,
        setItemGrid,
        setItemBeingDragged,
        setScore,
    } = exportVariables;

    // If rainbow icon is played on top of another rainbow icon, clear the whole board and tally the score
    if ((itemBeingDragged.img === itemBeingDraggedOver.img) &&
        (itemBeingDragged.img === itemIcons.fourInRowIcon.img || itemBeingDraggedOver.img === itemIcons.fourInRowIcon.img)
    ) {
        let oldScore = new Number(score);

        let newGrid = new Array(boardHeight * boardWidth);
        newGrid.fill({ img: blank })

        const newScore = oldScore + boardHeight * boardWidth;

        setItemBeingDragged({ idx: -1 })
        setScore(newScore)
        return setItemGrid(newGrid)
    }

    // If rainbow icon is played on a basic icon (or vis versa) clear the rainbow icon AND all matching basic icons on the board
    function onlyOneRainbowCandy(one, theOther) {
        if (one.img === itemIcons.fourInRowIcon.img) {
            let gridCopy = Array.from(itemGrid);
            let oldScore = new Number(score);

            let newGrid = gridCopy.map((item, idx) => {
                if (item.img === theOther.img || theOther.idx === idx) {
                    return { img: blank }
                }
                return item
            })

            const newScore = newGrid.reduce((acc, cur) => {
                if (cur.img === blank) acc++
                return acc
            }, oldScore);

            setItemBeingDragged({ idx: -1 })
            setScore(newScore)
            return setItemGrid(newGrid)
        }
    }
    onlyOneRainbowCandy(itemBeingDragged, itemBeingDraggedOver)
    onlyOneRainbowCandy(itemBeingDraggedOver, itemBeingDragged)
}