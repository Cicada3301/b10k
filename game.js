function b10k() {
    var player;
    function Level(map) {
        this.map = map;
        this.size = this.map.length;
    }
    function Player(x, y, map, container) {
        this.x =x;
        this.y =y;
        this.map = map;
        this.container = container;
        this.el = document.getElementById('player');
        this.render();
    }
    Player.prototype.render = function () {
        this.el.style.left = '' + ((this.x * (40 / this.map.length) + 2.5) + 'vw');
        this.el.style.top = '' + ((this.y * (40 / this.map.length) + 2.5) + 'vw');
    }
    Player.prototype.moveLeft = function () {
        if (this.map[this.y][this.x - 1] === 0) {
            this.x -= 1;
            this.moveLeft();
        } else {
            this.render();
        }
    }
    Player.prototype.moveRight = function () {
        if (this.map[this.y][this.x + 1] === 0) {
            this.x += 1;
            this.moveRight();
        } else {
            this.render();
        }
    }
    Player.prototype.moveUp = function () {
        if(this.map[this.y-1]) if (this.map[this.y-1][this.x] ===0){
            this.y -= 1;
            this.moveUp();
        } else {
            this.render();
        }
    }
    Player.prototype.moveDown = function () {
        if (this.map[this.y + 1]) if (this.map[this.y + 1][this.x] === 0) {
            this.y += 1;
            this.moveDown();
        } else {
            this.render();
        }
    }
    Level.prototype.play = function () {
        this.construct(document.getElementById('map'))
        this.adjustElements();
    }
    Level.prototype.adjustElements = function () {
        var player = document.getElementById('player');
        player.style.setProperty('width', (20 / this.size) + 'vw');
        player.style.setProperty('height', (20 / this.size) + 'vw');
        player.style.setProperty('margin', (10 / this.size) + 'vw');
        var goal = document.getElementById('goal');
        goal.style.setProperty('width', (20 / this.size) + 'vw');
        goal.style.setProperty('height', (20 / this.size) + 'vw');
        goal.style.setProperty('margin', (10 / this.size) + 'vw');
    }
    Level.prototype.construct = function (container) {
        container.innerHTML = '';
        for (var row = 0; row < this.size; ++row) {
            container.innerHTML += '<tr id=row' + row + '></tr>';
            var currentRow = document.getElementById('row' + row);
            for (var col = 0; col < this.size; ++col) {
                var addition = '';
                switch (this.map[row][col]) {
                    case 1: addition = 'class="wall ';
                        var sides=['top-right ', 'bottom-right ', 'bottom-left ', 'top-left'];
                        if (this.map[row + 1]) { if (this.map[row + 1][col] === 1 || this.map[row + 1][col]) sides[1] = sides[2] = ''; }
                            else sides[1] = sides[2] = '';
                        if (this.map[row - 1]) { if (this.map[row - 1][col] === 1) sides[0] = sides[3] = ''; }
                            else sides[0] = sides[3] = '';
                        if (this.map[row][col + 1] === 1 || this.map[row][col + 1] === undefined) sides[0] = sides[1] = '';
                        if (this.map[row][col - 1] === 1 || this.map[row][col - 1] === undefined) sides[2] = sides[3] = '';
                        addition += sides[0] + sides[1] + sides[2] + sides[3] + '"';
                        break;
                    case 2: addition = 'id="goal"'; break;
                    case 3: player = new Player(col, row, this.map, document.getElementById('game')); this.map[row][col] = 0;
                }
                currentRow.innerHTML += '<td ' + addition + ' style="top:' + (row * (40 / this.size) + 2.5) + 'vw; left:' + (col * (40 / this.size) + 2.5) + 'vw; width:' + (40 / this.size) + 'vw; height:' + (40 / this.size) + 'vw"></td>';
            }
        }
    }
    var levels = [
        new Level([
            [0, 0, 0, 1, 0, 1, 2, 0, 0, 1],
            [0, 0, 1, 1, 1, 0, 1, 1, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 1, 1, 1, 0, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 0, 0 ,0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 3]
            ])
    ];
    levels[0].play();
    document.addEventListener('keydown', function (e) {
        var isKey = true;
        switch (e.keyCode) {
            case 37: player.moveLeft(); break;
            case 38: player.moveUp(); break;
            case 39: player.moveRight(); break;
            case 40: player.moveDown(); break;
            default: isKey = false;
        }
        if (isKey) {
            e.preventDefault();
        }

    })
};
b10k();