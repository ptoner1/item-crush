// if the space directly below any item is blank, set the blank item's icon to the current item's icon.
// Then, set the current item's icon to blank.

function moveDownOne({ itemIcons, boardWidth, boardHeight, itemGrid, blank }) {
    for (let i = 0; i < boardWidth * boardHeight - boardWidth; i++) {
        if ((itemGrid[i + boardWidth].img) === blank) {
            itemGrid[i + boardWidth] = { img: itemGrid[i].img, animate: true };
            itemGrid[i] = { img: blank, animate: false };
        }
    }

    // If there is a blank icon in the top row, create a random, new, basic icon for that spot.
    createItem(itemIcons)
    function createItem({ basicIcons }) {
        for (let i = 0; i < boardWidth; i++) {
            if (itemGrid[i].img === blank) {
                let randItem = basicIcons[Math.floor(Math.random() * basicIcons.length)];
                itemGrid[i] = { img: randItem.img, animate: true };
            }
        }
    }
}

export default moveDownOne