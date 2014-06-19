﻿function b10k() {
    var player,
        boardSide = 40,
        boardMargin = 2.5;
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
    Player.prototype.move = function (dir) {
        var nextBlock =  this.map[this.y + dir.y]? this.map[this.y+dir.y][this.x + dir.x]:undefined;
        if (nextBlock !== undefined&&nextBlock!==1) {
            this.x += dir.x;
            this.y += dir.y
            this.move(dir);
        } else {
            this.render();
        }
    }
    Player.prototype.render = function () {
        this.el.style.left = '' + ((this.x * (boardSide / this.map.length) + boardMargin) + 'vw');
        this.el.style.top = '' + ((this.y * (boardSide / this.map.length) + boardMargin) + 'vw');
    }
    Level.prototype.play = function () {
        this.render(document.getElementById('map'))
        this.adjustElements();
    }
    Level.prototype.adjustElements = function () {
        var player = document.getElementById('player');
        player.style.setProperty('width', (boardSide/2 / this.size) + 'vw');
        player.style.setProperty('height', (boardSide/2 / this.size) + 'vw');
        player.style.setProperty('margin', (boardSide/4 / this.size) + 'vw');
        var goal = document.getElementById('goal');
        goal.style.setProperty('width', (boardSide/2 / this.size) + 'vw');
        goal.style.setProperty('height', (boardSide/2 / this.size) + 'vw');
        goal.style.setProperty('margin', (boardSide/4 / this.size) + 'vw');
    }
    Level.prototype.render = function (container) {
        container.innerHTML = '';
        for (var row = 0; row < this.size; ++row) {
            container.innerHTML += '<tr id=row' + row + '></tr>';
            var currentRow = document.getElementById('row' + row);
            for (var col = 0; col < this.size; ++col) {
                var addition = '';
                switch (this.map[row][col]) {
                    case 1: addition = 'class="wall ';
                        var sides=['top-right ', 'bottom-right ', 'bottom-left ', 'top-left'];
                        if (this.map[row + 1]) { if (this.map[row + 1][col] === 1) sides[1] = sides[2] = ''; }
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
                currentRow.innerHTML += '<td ' + addition + ' style="top:' + (row * (boardSide / this.size) + boardMargin) + 'vw; left:' + (col * (boardSide / this.size) + boardMargin) + 'vw; width:' + (boardSide / this.size) + 'vw; height:' + (boardSide / this.size) + 'vw"></td>';
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
            case 37: player.move({x:-1, y:0}); break;
            case 38: player.move({x:0, y:-1}); break;
            case 39: player.move({x:1, y:0}); break;
            case 40: player.move({x:0, y:1}); break;
            default: isKey = false;
        }
        if (isKey) {
            e.preventDefault();
        }

    })
};
b10k();