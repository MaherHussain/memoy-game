
const urls = ["https://picsum.photos/id/0/5000/3333", "https://picsum.photos/id/1/5000/3333", "https://picsum.photos/id/2/5000/3333",
    "https://picsum.photos/id/3/5000/3333", "https://picsum.photos/id/4/5000/3333", "https://picsum.photos/id/4/5000/3333",
    "https://picsum.photos/id/5/5000/3333", "https://picsum.photos/id/6/5000/3333", "https://picsum.photos/id/7/5000/3333",
    "https://picsum.photos/id/8/5000/3333", "https://picsum.photos/id/9/5000/3333", "https://picsum.photos/id/10/5000/3333",
    "https://picsum.photos/id/11/5000/3333", "https://picsum.photos/id/12/5000/3333", "https://picsum.photos/id/14/5000/3333",
    "https://picsum.photos/id/15/5000/3333", "https://picsum.photos/id/16/5000/3333", "https://picsum.photos/id/17/5000/3333",
    "https://picsum.photos/id/18/5000/3333", "https://picsum.photos/id/19/5000/3333", "https://picsum.photos/id/20/5000/3333",
    "https://picsum.photos/id/21/5000/3333", "https://picsum.photos/id/22/5000/3333", "https://picsum.photos/id/23/5000/3333",
    "https://picsum.photos/id/24/5000/3333", "https://picsum.photos/id/25/5000/3333", "https://picsum.photos/id/26/5000/3333",
    "https://picsum.photos/id/27/5000/3333", "https://picsum.photos/id/28/5000/3333", "https://picsum.photos/id/29/5000/3333"

]


const pictures = [
    {
        id: 1,
        name: 'Nature Scene',
        flipped: false,
    },
    {
        id: 2,
        name: 'Cityscape',
        flipped: false
    },
    {
        id: 3,
        name: 'Abstract Artwork',
        flipped: false,
    },
    {
        id: 4,
        name: 'Beach Sunset',
        flipped: false,

    },
    {
        id: 5,
        name: 'Mountain View',
        flipped: false,
    },
    {
        id: 6,
        name: 'Wildlife Safari',
        flipped: false,
    },

];

const container = document.querySelector('#container');
const duration = 800
const startDiv = document.querySelector('.start')
const startBtn = document.querySelector('.startBtn');
const player = document.querySelector('.player-name span');
const triescounter = document.querySelector('.tries span')
let tries = 0
let sec = 0;
const result = document.querySelector('.result')
const maxTriescontainer = document.querySelector('.max-tries')
let myInterVal;
const maxTries = 10
let playerName = '';

const setImageUrlProperty = () => {
    shuffleArray(urls)
    pictures.forEach(item => {
        const randomIndex = Math.floor(Math.random() * urls.length - 1)
        console.log(randomIndex)
        item.imageUrl = urls[randomIndex]
        // Remove the selected URL to prevent duplicates (if needed)
        urls.splice(randomIndex, 1);
    })

}

setImageUrlProperty()
function dublicateArray(array) {

    let newArr = [...array];

    array.forEach((item, index) => {

        const newItem = {
            id: array.length + index + 1,
            name: item.name,
            imageUrl: item.imageUrl,
            flipped: item.flipped

        }
        newArr.push(newItem);
    })


    return newArr;

}

const doublicatedArr = dublicateArray(pictures)

// shuffling the array 
function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}
const shuffledArr = shuffleArray(doublicatedArr)



startBtn.addEventListener('click', () => {
    startDiv.classList.add('hide')
    playerName = prompt('Please Enter you name')

    playerName ? player.innerHTML = playerName : player.innerHTML = 'Unknown'

    const cards = document.querySelectorAll('.card');

    Object.values(cards).forEach(card => {
        setTimeout(() => {
            card.classList.add('flipped')
        }, 1000)

        setTimeout(() => {
            card.classList.remove('flipped')


        }, 5000)
    })

    startTimer()

})

// Function to create card elements
function createCardElement(picture) {
    const card = document.createElement("div");
    card.classList.add("card");


    const front = document.createElement("div");
    front.classList.add("front");


    const back = document.createElement("div");
    const backImage = document.createElement("img");

    back.classList.add("back");
    backImage.classList.add("back-img");
    backImage.src = picture.imageUrl;
    card.dataset.img = picture.name


    card.appendChild(front);
    card.appendChild(back);
    back.appendChild(backImage)


    // Event listener to flip the card when clicked
    card.addEventListener("click", function () {
        if (picture.flipped && card.classList.contains("is-match")) {
            return
        }

        if (!picture.flipped) {
            console.log('clicked1')
            card.classList.add("flipped");
            picture.flipped = true

        }
        /* else {
            console.log('clicked2')
           
        } */
        picture.flipped = false;
        const cards = document.querySelectorAll('.card');
        const allFillepedCards = Object.values(cards).filter(card => card.classList.contains('flipped'));

        if (allFillepedCards.length === 2) {

            checkIfMatch(allFillepedCards[0], allFillepedCards[1])

        }


    });


    return card;
}

function displayCards(array) {
    array.forEach(picture => {
        const card = createCardElement(picture);
        container.appendChild(card);
    });
}

// Call function to display cards

window.onload = function () {
    const maxTriesText = document.createElement('p')
    maxTriesText.innerHTML = `Max tries is ${maxTries} times`
    maxTriescontainer.appendChild(maxTriesText)

    displayCards(shuffledArr);
}



function timer(val) { return val > 9 ? val : "0" + val; }

function startTimer() {

    setTimeout(() => {
        myInterVal = setInterval(function () {
            document.getElementById("seconds").innerHTML = timer(++sec % 60);
            document.getElementById("minutes").innerHTML = timer(parseInt(sec / 60, 10));
        }, 1000);
    }, 6000)
}



function playAgain() {
    result.classList.add('hide')

    tries = 0;
    triescounter.innerHTML = tries;
    clearInterval(myInterVal)

    sec = 0;
    result.innerHTML = ''
    document.getElementById("seconds").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";

    const shuffledArr = shuffleArray(doublicatedArr);


    const cards = document.querySelectorAll('.card')

    Object.values(cards).forEach(card => {
        if (card.classList.contains('is-match')) {
            card.classList.remove('is-match')
        }
    })

    Object.values(cards).forEach((card, index) => {
        const backImage = card.querySelector('.back-img');
        backImage.src = shuffledArr[index].imageUrl;
        card.dataset.img = shuffledArr[index].name;
    });

    Object.values(cards).forEach(card => {

        card.classList.add('flipped')
        setTimeout(() => {
            card.classList.remove('flipped')


        }, 5000)
    })


    startTimer()

}




function stopClicking() {
    container.classList.add('stop-clicking')
    setTimeout(() => { container.classList.remove('stop-clicking') }, duration)
}

function checkIfMatch(firstCard, secondCard) {

    if (firstCard.getAttribute('data-img') === secondCard.getAttribute('data-img')) {

        firstCard.classList.remove('flipped')
        secondCard.classList.remove('flipped')
        firstCard.classList.add('is-match')
        secondCard.classList.add('is-match')


    } else {

        setTimeout(() => {
            firstCard.classList.remove('flipped')
            secondCard.classList.remove('flipped')
            tries++
            triescounter.innerHTML = tries


        }, duration)

    }

    setTimeout(() => {
        stopGame()
    }, duration)


}

function stopGame() {

    if (tries === maxTries) {
        clearInterval(myInterVal);
        const gameOver = document.createElement('p')
        const playAgainBtn = document.createElement('button')
        playAgainBtn.classList.add('btn', 'play-again-btn')
        playAgainBtn.innerHTML = 'Play Again'
        playAgainBtn.addEventListener("click", playAgain)
        gameOver.innerHTML = 'Unfortunately,<br> You have been reached the max times of tries, refresh the browser or click the button to play again'
        result.appendChild(gameOver)
        result.appendChild(playAgainBtn)
        result.classList.remove('hide')
    }

    const time = (document.querySelector('.timer').innerText).split(':')


    let cards = document.querySelectorAll('.card')
    let allMatchedCards = Object.values(cards).filter(card => card.classList.contains('is-match'));


    if (allMatchedCards.length === shuffledArr.length) {
        clearInterval(myInterVal);
        const gameWin = document.createElement('p')
        const playAgainBtn = document.createElement('button')
        playAgainBtn.classList.add('btn', 'play-again-btn')
        playAgainBtn.innerHTML = 'Play Again'
        playAgainBtn.addEventListener("click", playAgain)
        gameWin.innerHTML = Number(time[0]) > 0 ? `You win <br> You did it in ${time[0]} minutes and ${time[1]} seconds` : `You win <br> You did it in  ${time[1]} seconds`
        result.appendChild(gameWin)
        result.appendChild(playAgainBtn)
        result.classList.remove('hide')
    }
}

