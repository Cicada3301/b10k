var sides = parseInt(prompt('sides?'));
var map = [];
var table = document.getElementById('container');
for (var i = 0; i < sides; ++i) {
    table.innerHTML += '<tr id="' + i + '"></tr>';
    map.push([]);
    var tr = document.getElementById(''+i);
    for (var j = 0; j < sides; ++j) {
        tr.innerHTML += '<td id="' + i + '-' + j + '" onclick="progress('+i+', '+j+')" class=air></td>';
        map[i].push(0);
    }
}
var mapEl = document.getElementById('map');
var values = ['air', 'wall', 'goal', 'player'];
function progress(x, y) {
    var el = document.getElementById(x + '-' + y);
    var value = map[x][y];
    el.classList.remove(values[value]);
    ++map[x][y];
    map[x][y] %= 4;
    value = map[x][y];
    el.classList.add(values[value]);
    var encodedMap = new Array(sides);
    for (var i = 0; i < map.length; ++i) encodedMap[i] = map[i].join('');
    mapEl.innerHTML=encodedMap.join('');
}