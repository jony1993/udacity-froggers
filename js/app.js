'use strict'

//Gobal Object for the score counter
var score = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //set enemy initial location
    this.x = x;
    this.y = y;

    //set the enemy speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //update enemy location
    this.x += this.speed * dt;

    //if out of screen back to start position
    if (this.x >= 505) {
        this.x = 0;
    }

    //handle collosion with the player
    if (player.x >= this.x - 40 && player.x <= this.x + 40 && player.y >= this.y - 40 && player.y <= this.y + 40) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    //load image by setting this.sprites to an appropriate image
    this.sprite = 'images/char-boy.png';

    //Set The Player initial location
    this.x = 200;
    this.y = 400;

};

//Update Method for the Player
Player.prototype.update = function() {

    // /left
    if (this.key === 'left' && this.x > 0) {
        this.x = this.x - 100;
    }

    //right
    if (this.key === 'right' && this.x != 400) {
        this.x = this.x + 100;
    }

    //down
    if (this.key === 'down' && this.y != 400) {
        this.y = this.y + 90;
    }

    //up
    if (this.key === 'up') {
        this.y = this.y - 90;
    }

    this.key = null;

    //If on water, reset and increase score
    if (this.y < 25) {
        this.reset();
        score++;
        document.getElementById("score").innerHTML = score;
    }

};

//Render Method for the Player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The handleInput method, which should receive user input, allowesKeys and move the player according to that input
Player.prototype.handleInput = function(e) {
    this.key = e;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//all Enemies
var allEnemies = [new Enemy(-100, 60, 70), new Enemy(-100, 140, 100), new Enemy(-100, 220, 200)];

//new Player
var player = new Player();


//Global reset Method
//Reset player to the beginning position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

    //empty Alleenemys
    allEnemies.length = 0;
    allEnemies= [new Enemy(-100, 60, 70), new Enemy(-100, 140, 100), new Enemy(-100, 220, 200)];

};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});