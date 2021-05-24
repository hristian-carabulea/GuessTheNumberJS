//Game variables. 
var mysteryNumber = Math.floor(Math.random() * 1000); // Set upper limit.
    var numberOfGuessesAllowed = 20;
    var guessesRemaining = numberOfGuessesAllowed; // set number of maximum guesses allowed
    var playersGuess = 0;
    console.log(mysteryNumber);

    var guessesMade = 0;
    var gameState = "";
    var gameWon = false;

    //The input and output fields
    var input = document.querySelector("#input");
    var output = document.querySelector("#output");

    //The button
    var button = document.querySelector("button");
    button.style.cursor = "pointer";
    button.addEventListener("click", clickHandler, false);

    //Listen for enter key presses
    window.addEventListener("keydown", keydownHandler, false);

    ///////////////////////////////////////////
    function keydownHandler(event) // if the enter key was used call validateInput
    {
      if(event.keyCode === 13)
      {
        validateInput();
      }
    }
    ///////////////////////////////////////////
    function clickHandler() // if mouse click was used call validateInput
    {
      validateInput(); 
    }

    function validateInput() ///////////////////////////////////////////
    {
      playersGuess = parseInt(input.value);
      
      //If you're worried about infinity, use this:
      //!isNaN(playersGuess) && isFinite(playersGuess);
      if(isNaN(playersGuess))
      {
        output.innerHTML = "Please enter a number.";
      }
      else
      {
        playGame();
      }
    }

    function playGame() ///////////////////////////////////////////
    {
      guessesRemaining = guessesRemaining - 1;
      guessesMade = guessesMade + 1;
      gameState 
        = " Guess: " + guessesMade 
        + ", Remaining: " + guessesRemaining;
      
      playersGuess = parseInt(input.value);

      if(playersGuess > mysteryNumber)
      {
        output.innerHTML = "That's too high." + gameState;
        
        //Check for the end of the game
        if (guessesRemaining < 1)
        {
          endGame();
        }
      }
      else if(playersGuess < mysteryNumber)
      {
        output.innerHTML = "That's too low." + gameState;
        
        //Check for the end of the game
        if (guessesRemaining < 1)
        {
          endGame();
        }
      }
      else if(playersGuess === mysteryNumber)
      {
        gameWon = true;
        endGame();
      }
    }

    function endGame() ///////////////////////////////////////////
    {
      if (gameWon)
      {
        output.innerHTML
          = "Yes, the correct number is " + mysteryNumber + "!" + "<br>" 
          + "It only took you " + guessesMade + " guesses." + "<br>" + "Refresh the page to play again!";
      }
      else
      {
        output.innerHTML
          = "No more guesses left!" + "<br>" 
          + "The number was: " + mysteryNumber + "." + "<br>" + "Refresh the page to play again!";
      }

      //Disable the button
      button.removeEventListener("click", clickHandler, false);
      button.disabled = true;
      
      //Disable the enter key
      window.removeEventListener("keydown", keydownHandler, false);
      
      //Disable the input field
      input.disabled = true;
    }