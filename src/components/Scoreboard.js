import './Scoreboard.css';

export default function Scoreboard({ score, highScore, title, animate }) {

    return (
        <div className='scoreboard'>
            <h2>Current score: {score}</h2>
            <h1 className={animate ? 'flashTitle' : ''}>{title} Crush</h1>
            <h1 className={animate ? 'flashTitle' : ''} id='h1-shadow'>{title} Crush</h1>
            <h2>High Score: {highScore}</h2>
        </div >
    )
}