function b10k() {
    var player,
        inGame = true,
        currentLevel = 0,
        currentLevelObject,
        boardSide = 40,
        boardMargin = 2.5;
    function Level(map, name) {
        this.name = name;
        this.map = map;
        this.size = this.map.length;
    }
    function Player(x, y, level, container) {
        this.x =x;
        this.y =y;
        this.level=level;
        this.map = level.map;
        this.container = container;
        this.el = document.getElementById('player');
        this.render();
        this.nextMove =false;
        this.moving = false;
    }
    Player.prototype.handleMove = function (dir) {
        if (this.moving) {
            this.nextMove = dir;
        } else {
            this.move(dir);
        }
    };
    Player.prototype.useNextMove = function () {
        if (this.nextMove) {
            var nextMove = { x: this.nextMove.x, y: this.nextMove.y };
            this.nextMove = false;
            this.move(nextMove);
        }
    }
    Player.prototype.move = function (dir) {
        if (!inGame) return false;
        var nextBlock =  this.map[this.y + dir.y]? this.map[this.y+dir.y][this.x + dir.x]:undefined;
        if (nextBlock !== undefined && nextBlock !== 1) {
            this.moving = true;
            this.x += dir.x;
            this.y += dir.y;
            this.move(dir);
        } else {
            this.render();
            window.setTimeout(function () {
                if (player.map[player.y][player.x] === 2) player.level.win();
                player.moving = false;
                player.useNextMove();
            }, 200);
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
    Level.prototype.win = function () {
        inGame = false;
        var mask = document.getElementById('mask');
        mask.style.setProperty('opacity', '1');
        ++currentLevel;
        if (levels[currentLevel]) {
            currentLevelObject = levels[currentLevel];
            mask.innerHTML = 'Level ' + currentLevel + '<br>' + currentLevelObject.name;
            window.setTimeout(function () { currentLevelObject.play() }, 500);
            window.setTimeout(function () {
                window.setTimeout(function () {
                    mask.style.setProperty('opacity', '0');
                }, 500);
                inGame = true;
            }, 1000);
        } else {
            mask.innerHTML = 'You won the game!<br><button id="restart">Restart</button>';
            document.getElementById('restart').addEventListener('click', function () {
                window.location.href += '';
            })
        }
        document.getElementById('level').innerHTML = currentLevel + ' - ' + levels[currentLevel].name;
        player.render();
    }
    Level.prototype.adjustElements = function () {
        player.el.style.setProperty('width', (boardSide/2 / this.size) + 'vw');
        player.el.style.setProperty('height', (boardSide/2 / this.size) + 'vw');
        player.el.style.setProperty('margin', (boardSide / 4 / this.size) + 'vw');
        var goal = document.getElementById('goal');
        goal.style.setProperty('width', (boardSide/2 / this.size) + 'vw');
        goal.style.setProperty('height', (boardSide/2 / this.size) + 'vw');
        goal.style.setProperty('margin', (boardSide / 4 / this.size) + 'vw');
        
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
                    case 3: player = new Player(col, row, this, document.getElementById('game')); this.map[row][col] = 0;
                }
                currentRow.innerHTML += '<td ' + addition + ' style="top:' + (row * (boardSide / this.size) + boardMargin) + 'vw; left:' + (col * (boardSide / this.size) + boardMargin) + 'vw; width:' + (boardSide / this.size) + 'vw; height:' + (boardSide / this.size) + 'vw"></td>';
            }
        }
    }
    var levels = [
        new Level([
            [0, 2, 1],
            [1, 0, 0],
            [3, 0, 0]
        ], 'let\'s start soft'),
        new Level([
            [2, 0, 1, 3],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1]
        ], 'do not illude yourself'),
        new Level([
            [0, 1, 0, 0, 2],
            [0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0],
            [1, 0, 0, 1, 0],
            [0, 0, 3, 1, 0]
        ], 'still too easy?'),
        new Level([
            [2, 0, 1, 0, 0, 0],
            [1, 0, 0, 0, 1, 0],
            [3, 1, 0, 0, 0, 1],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0]
        ], 'not even a challenge, right?')//,
        /*new Level([
                [0,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,0,0,0,0],
                [1,1,0,0,1,1,1,3,0,0],
                [1,1,1,0,0,1‌​,2,1,0,0],
                [1,1,0,0,0,0,0,1,0,0],
                [0,1,0,0,0,0,0,0,0,1],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,‌​0,0,0,0,0,0,1,0],
                [0,0,0,1,0,0,0,0,0,0],
                [0,0,1,1,1,1,1,1,0,0]
            ],'by kendall')
        ]*/
    ];
    levels[0].play();
    document.addEventListener('keydown', function (e) {
        var isKey = true;
        switch (e.keyCode) {
            case 37: player.handleMove({x:-1, y:0}); break;
            case 38: player.handleMove({x:0, y:-1}); break;
            case 39: player.handleMove({x:1, y:0}); break;
            case 40: player.handleMove({x:0, y:1}); break;
            default: isKey = false;
        }
        if (isKey) {
            e.preventDefault();
        }

    })
    function playCustomLevel() {
        var map = prompt('insert map code');
        var mapSide = Math.sqrt(map.length, 2);
        map = map.split('');
        var decodedMap=[];
        for (var i = 0; i < map.length; ++i) {
            if (i % mapSide === 0) decodedMap.push([]);
            console.log([i, (i / mapSide) | 0, decodedMap]);
            decodedMap[(i/mapSide) | 0].push(parseInt(map[i]));
        }
        (new Level(decodedMap, 'custom level')).play();
    }
    document.getElementById('play').addEventListener('click', function () { playCustomLevel() });
    document.getElementById('restart').addEventListener('click', function () { currentLevelObject.play();})
};
b10k();