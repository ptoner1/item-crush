import blueCandy from './images/candy/blue-candy.png'
import greenCandy from './images/candy/green-candy.png'
import orangeCandy from './images/candy/orange-candy.png'
import purpleCandy from './images/candy/purple-candy.png'
import redCandy from './images/candy/red-candy.png'
import yellowCandy from './images/candy/yellow-candy.png'
import rainbowCandy from './images/candy/rainbowcandy.png'
import candyBackground from './images/candy/candy-background.jpg'

import tiger from './images/mammals/tiger.png'
import deer from './images/mammals/deer.png'
import koala from './images/mammals/koala.png'
import monkey from './images/mammals/monkey.png'
import wolf from './images/mammals/wolf.png'
import trex from './images/mammals/trex.png'
import rainbowUnicorn from './images/mammals/rainbowunicorn.png'
import mountainsBackground from './images/mammals/mountains-background.jpg'

import bluefish from './images/seaCreatures/bluefish.png'
import crab from './images/seaCreatures/crab.png'
import shark from './images/seaCreatures/shark3.png'
import turtle from './images/seaCreatures/turtle.png'
import yellowfish from './images/seaCreatures/yellowfish.png'
import seahorse from './images/seaCreatures/seahorse.png'
import rainbowOctopus from './images/seaCreatures/rainbow-octopus.png'
import underwaterBackground from './images/seaCreatures/underwater-background.webp'

import chick from './images/birds/chick.png'
import dove from './images/birds/dove.png'
import flamingo from './images/birds/flamingo.png'
import owl from './images/birds/owl.png'
import parrot from './images/birds/parrot.png'
import peacock from './images/birds/peacock.png'
import rainbowDragon from './images/birds/rainbow-dragon.png'
import cloudsBackground from './images/birds/clouds-background.webp'

const candies = {
    title: 'Candy',
    backgroundImg: candyBackground,
    basicIcons: [
        { img: blueCandy },
        { img: greenCandy },
        { img: orangeCandy },
        { img: purpleCandy },
        { img: yellowCandy },
        { img: redCandy }
    ],
    fourInRowIcon: { img: rainbowCandy }
}

const mammals = {
    title: 'Land',
    backgroundImg: mountainsBackground,
    basicIcons: [
        { img: trex },
        { img: wolf },
        { img: deer },
        { img: tiger },
        { img: koala },
        { img: monkey }
    ],
    fourInRowIcon: { img: rainbowUnicorn }
}

const seaCreatures = {
    title: 'Ocean',
    backgroundImg: underwaterBackground,
    basicIcons: [
        { img: bluefish },
        { img: crab },
        { img: seahorse },
        { img: shark },
        { img: turtle },
        { img: yellowfish }
    ],
    fourInRowIcon: { img: rainbowOctopus }
}

const birds = {
    title: 'Bird',
    backgroundImg: cloudsBackground,
    basicIcons: [
        { img: chick },
        { img: dove },
        { img: flamingo },
        { img: owl },
        { img: parrot },
        { img: peacock }
    ],
    fourInRowIcon: { img: rainbowDragon }
}

export { candies, mammals, seaCreatures, birds }