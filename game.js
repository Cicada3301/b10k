function b10k() {
    function Level(map) {
        this.map = map;
        this.size = this.map.length;
        //this.no = levels.length;
    }
    Level.prototype.construct = function (container) {
        container.innerHTML = '';
        for (var row = 0; row < this.size; ++row) {
            container.innerHTML += '<tr id=row' + row + '></tr>';
            var currentRow = document.getElementById('row' + row);
            for (var col = 0; col < this.size; ++col) {
                var addition = 'id="player"';
                switch (this.map[row][col]) {
                    case 0: addition = ''; break;
                    case 1: addition = 'class="wall ';
                        var sides=['top-right ', 'bottom-right ', 'bottom-left ', 'top-left'];
                        if (this.map[row + 1]) if(this.map[row+1][col]===1) sides[1] = sides[2] = '';
                        if (this.map[row - 1]) if (this.map[row - 1][col] === 1) sides[0] = sides[3] = '';
                        if (this.map[row][col + 1] === 1) sides[0] = sides[1] = '';
                        if (this.map[row][col - 1] === 1) sides[2] = sides[3] = '';
                        addition += sides[0] + sides[1] + sides[2] + sides[3] + '"';
                        break;
                    case 2: addition = 'id="goal"';
                }
                currentRow.innerHTML += '<td ' + addition + ' style="top:' + (row * (40/this.size)+2.5) + 'vw; left:' + (col * (40/this.size)+2.5) + 'vw"></td>';
            }
        }
    }
    var levels = [
        new Level([
            [1, 0, 0, 1, 0, 1, 2, 0, 0, 1],
            [0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
            [0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
            [0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
            [0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
            [0, 1, 1, 0, 1, 0, 0, 1, 0, 1]
            ])
    ];
    levels[0].construct(document.getElementById('map'));
};
b10k();