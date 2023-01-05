import { useEffect, useState } from 'react';
import './index.css';
import { candies, mammals, seaCreatures, birds } from './items';
import blank from './images/special-icons/blank.png'

import Scoreboard from './components/Scoreboard';
import SettingsBar from './components/SettingsBar';

import playRainbowCandy from './gameplayFunctions/playRainbowCandy'
import moveDownOne from './gameplayFunctions/moveDownOne'
import { checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree } from './gameplayFunctions/checkBasicMatches'

function App() {
    const [boardWidth, setBoardWidth] = useState(8);
    const [boardHeight, setBoardHeight] = useState(8);
    const [itemIcons, setItemIcons] = useState(candies);
    const [itemGrid, setItemGrid] = useState(genStartingItems(itemIcons, boardHeight, boardWidth));
    const [itemBeingDragged, setItemBeingDragged] = useState({ idx: -1 });
    const [itemBeingDraggedOver, setItemBeingDraggedOver] = useState({ idx: -1 });
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [animateTitle, setAnimateTitle] = useState(true);
    const [popup, setPopup] = useState(null);

    let skipNumbersRowThree = [];
    let skipNumbersRowFour = [];
    for (let i = boardWidth - 3; i < boardWidth * boardHeight; i = i + boardWidth) {
        skipNumbersRowFour.push(i)
    }
    for (let i = boardWidth - 2; i < boardWidth * boardHeight; i = i + boardWidth) {
        skipNumbersRowThree.push(i)
        skipNumbersRowFour.push(i)
    }
    for (let i = boardWidth - 1; i < boardWidth * boardHeight; i = i + boardWidth) {
        skipNumbersRowThree.push(i)
        skipNumbersRowFour.push(i)
    }

    function genBoardDimension(length) {
        let w = [];
        for (let i = 0; i < length; i++) { w.push('1fr') }
        return w.join(' ')
    }

    function genWidth() {
        return `calc(${boardWidth}/${boardHeight} * 70vh)`
    }
    function genHeight() {
        return `minmax(calc(${boardHeight}/${boardWidth} * 70vh), 70vh)`
    }

    const gameGridStyles = {
        background: 'rgba(255,255,255,0.7)',
        padding: '1rem',
        borderRadius: '10px',
        width: genWidth(),
        height: genHeight(),
        display: 'grid',
        maxWidth: '90vw',
        zIndex: '3',
        gridTemplateColumns: genBoardDimension(boardWidth),
        gridTemplateRows: genBoardDimension(boardHeight),
    }

    const exportVariables = {
        skipNumbersRowFour,
        skipNumbersRowThree,
        blank,
        boardWidth,
        boardHeight,
        skipNumbersRowFour,
        skipNumbersRowThree,
        itemIcons,
        itemGrid,
        itemBeingDragged,
        itemBeingDraggedOver,
        score,
        setItemIcons,
        setItemGrid,
        setItemBeingDragged,
        setItemBeingDraggedOver,
        setScore,
    }

    function genStartingItems({ basicIcons }, h, w) {
        let startingItems = [];
        for (let i = 0; i < w * h; i++) {
            let randItem = basicIcons[Math.floor(Math.random() * basicIcons.length)];
            startingItems.push(randItem);
        }
        return startingItems
    }

    useEffect(() => {
        const timer = setInterval(() => {
            checkColumnOfFour(exportVariables)
            checkRowOfFour(exportVariables)
            checkColumnOfThree(exportVariables)
            checkRowOfThree(exportVariables)
            moveDownOne(exportVariables)
            setItemGrid([...itemGrid])
        }, 200)
        return () => clearInterval(timer)
    }, [itemGrid, checkColumnOfFour, checkColumnOfThree, checkRowOfFour, checkRowOfThree, moveDownOne])

    //CHECK AND UPDATE HIGHSCORE
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            window.localStorage.setItem('item_crush_high_score', JSON.stringify(highScore))
        }
    }, [score])

    useEffect(() => {
        const data = window.localStorage.getItem('item_crush_high_score');
        if (data) return setHighScore(JSON.parse(data));
    }, [])

    // DRAG AND DROP ITEMS
    function handleDragStart(e) {
        setTimeout(() => {
            e.target.className += ' hold';
        }, 0);
        setItemBeingDraggedOver({
            idx: parseInt(e.target.getAttribute('data-id')),
            img: e.target.getAttribute('src')
        })
    }

    function handleDragEnter(e) {
        e.preventDefault()
        if (e.target != itemBeingDragged.idx) {
            setItemBeingDragged({
                idx: parseInt(e.target.getAttribute('data-id')),
                img: e.target.getAttribute('src')
            });
        }
    }

    function handleDragEnd(e) {
        e.target.className = 'item';

        // If the Dragged piece is Dragged Over a piece to the left, up, right, or down, it is valid.
        const validMoves = [itemBeingDraggedOver.idx - 1, itemBeingDraggedOver.idx - boardWidth, itemBeingDraggedOver.idx + 1, itemBeingDraggedOver.idx + boardWidth];
        const validMove = validMoves.includes(itemBeingDragged.idx);

        if (validMove) {
            // Swap the peices and check for matches.
            itemGrid[itemBeingDraggedOver.idx] = { img: itemBeingDragged.img };
            itemGrid[itemBeingDragged.idx] = { img: itemBeingDraggedOver.img };

            playRainbowCandy(exportVariables)
            const isAColumnOfFour = checkColumnOfFour(exportVariables);
            const isARowOfFour = checkRowOfFour(exportVariables);
            const isARowOfThree = checkRowOfThree(exportVariables);
            const isAColumnOfThree = checkColumnOfThree(exportVariables);

            // If no matches, switch the pieces back.
            if (!(isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)) {
                itemGrid[itemBeingDraggedOver.idx] = { img: itemBeingDraggedOver.img };
                itemGrid[itemBeingDragged.idx] = { img: itemBeingDragged.img };
            }
        }
        setItemBeingDragged({ idx: -1 })
    }

    // Animate items when dragged over
    function setItemStyle(i) {
        if (i === itemBeingDraggedOver.idx - 1) return { translate: '100% 0' };
        if (i === itemBeingDraggedOver.idx - boardWidth) return { translate: '0 100%' };
        if (i === itemBeingDraggedOver.idx + 1) return { translate: '-100% 0' };
        if (i === itemBeingDraggedOver.idx + boardWidth) return { translate: '0 -100%' };
        return { opacity: '15%' }
    }

    //CHANGE BOARD ICONS
    function changeBoardIcons(items) {
        setItemGrid(genStartingItems(items, boardHeight, boardWidth));
        setItemIcons(items);
        setAnimateTitle(false);
        setPopup(null);
        setTimeout(() => { setAnimateTitle(true) }, 200);
        setScore(0);
    }

    // CHANGE BOARD DIMENSIONS
    function changeBoardDimensions(e) {
        e.preventDefault()
        const selectHeight = parseInt(document.getElementById('select-height').value);
        const selectWidth = parseInt(document.getElementById('selectWidth').value);
        setBoardHeight(selectHeight);
        setBoardWidth(selectWidth);
        const newGrid = genStartingItems(itemIcons, selectHeight, selectWidth);
        setItemGrid(newGrid);
        setScore(0);
        setPopup(null);
    }

    return (
        <div className="App" style={{ backgroundImage: `url(${itemIcons.backgroundImg})`, backgroundSize: 'cover' }}>
            <Scoreboard score={score} highScore={highScore} title={itemIcons.title} animate={animateTitle} />
            <div style={gameGridStyles}>
                {itemGrid.map((img, i) => {
                    return (
                        <img
                            className={img.animate ? 'item animateItem' : 'item'}
                            key={i}
                            src={img.img}
                            style={i === itemBeingDragged.idx ? setItemStyle(i) : {}}

                            data-id={i}
                            draggable={true}
                            onDragOver={e => e.preventDefault()}
                            onDragLeave={e => e.preventDefault()}
                            onDrop={e => e.preventDefault()}
                            onDragStart={handleDragStart}
                            onDragEnter={handleDragEnter}
                            onDragEnd={handleDragEnd}
                        />
                    )
                })}
            </div>

            <div className='icon-credit'>
                game icons courtesy of <a target="_blank" href="https://icons8.com">Icons8</a>
            </div>

            <SettingsBar
                changeBoardIcons={changeBoardIcons}
                changeBoardDimensions={changeBoardDimensions}
                iconOptions={{ candies, mammals, seaCreatures, birds }}
                popup={popup}
                setPopup={setPopup}
            />
        </div>
    );
}

export default App;