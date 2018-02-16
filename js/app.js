// Enemies our player must avoid
var Enemy = function(x, y) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 100 + 50;

};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// НАХУЙ МНЕ ДТ И ЧТО С НИМ ДЕЛАТЬ
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Check if enemies went over picture - then spawn them
    // at start (x = -150) and give them new random movement speed
    if (this.x < 505) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -150;
        this.speed = Math.random() * 100 + 50;
    };

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function() {
    for (var i=0; i < allEnemies.length; i++){
        debugger;

        if (((allEnemies[i].x + 50 >= this.x && allEnemies[i].x + 50 <= this.x + 50)
            && (allEnemies[i].y <= this.y + 80 && allEnemies[i].y >= this.y))
            || ((allEnemies[i].x <= this.x + 50 && allEnemies[i].x >= this.x)
            && (allEnemies[i].y <= this.y + 80 && allEnemies[i].y >= this.y)))
         {
            alert('You lose!');
            player.reset();
        }
    }
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode){
    switch(keyCode) {
        case 'left':
            if (this.x > 40) {
                this.x = this.x - 101;
            }
            break;
        case 'up':
            this.y = this.y - 80;
            if (this.y < -10) {
                alert('You win!');
                player.reset();
            }
            break;
        case 'right':
            if (this.x < 360) {
                this.x = this.x + 101;
            }
            break;
        case 'down':
            if (this.y < 350) {
                this.y = this.y + 80;
            }
            break;
    }
};
// After reaching water or crashing - reset player
// location on start position (x = 200, y = 380)
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
}


// New player
var player = new Player(202, 385);
// New Enemies
var enemy1 = new Enemy(-150, 65);
var enemy2 = new Enemy(-150, 145);
var enemy3 = new Enemy(-150, 225);

// Array of enemies
var allEnemies = [enemy1, enemy2, enemy3];

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
