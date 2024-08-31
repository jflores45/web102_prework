/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        
        // Create a new div element
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        
        // Set the inner HTML using a template literal
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
        `;
        
        // Append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalBackers.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    // Filter games with pledged amount less than goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
    // Add unfunded games to the page
    addGamesToPage(unfundedGames);
    
    console.log(unfundedGames.length); // Log the number of unfunded games
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    
    // Filter games with pledged amount greater than or equal to goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    
    // Add funded games to the page
    addGamesToPage(fundedGames);
    
    console.log(fundedGames.length); // Log the number of funded games
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    
    // Add all games to the page
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Select buttons

// Add event listeners
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = `We have raised a total of $${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games. ${numUnfundedGames} game${numUnfundedGames === 1 ? ' is' : 's are'} still unfunded.`;

// create a new DOM element containing the template string and append it to the description container
const descriptionParagraph = document.createElement('p');
descriptionParagraph.innerHTML = unfundedGamesString;
descriptionContainer.appendChild(descriptionParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Grab the container elements
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games by pledged amount in descending order
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Use destructuring to get the top 2 games
const [topGame, secondTopGame, ...rest] = sortedGames;

// Create and append the top game element
const topGameElement = document.createElement("p");
topGameElement.textContent = topGame.name;
firstGameContainer.appendChild(topGameElement);

// Create and append the second top game element
const secondTopGameElement = document.createElement("p");
secondTopGameElement.textContent = secondTopGame.name;
secondGameContainer.appendChild(secondTopGameElement);
