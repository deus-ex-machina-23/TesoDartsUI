$(document).ready(function(){

    $("#main_modal").modal();

});

function throwDart() {
    var input = document.getElementById("d_input").value;

    var value = input.split('x');

    var field = value[0];
    var multiplier = value[1] === undefined ? 1 : value[1];

    if (field < 21 && multiplier < 4) {
        DartBoard.throwDart("test", field, multiplier, this);
    }
}

function startGame() {

    // get players
    var players = document.getElementById("players").getElementsByTagName("li");
    //alert(players.);

    var names = Array();

    for (var i = 0; i < players.length; i++) {
        names.push(players.item(i).id);
        var col = document.createElement("div");
        col.className = "col-sm-" + Math.floor(12/players.length);
        document.getElementById("game_players").appendChild(col);
        var div = document.createElement("div");
        div.id = "player_" + i;
        var h = document.createElement("H1"); // Create the H1 element
        var t = document.createTextNode(players.item(i).id); // Create a text element
        h.appendChild(t);
        div.appendChild(h);
        var h = document.createElement("H1"); // Create the H1 element
        var t = document.createTextNode("301"); // Create a text element
        h.appendChild(t);
        div.appendChild(h);
        col.appendChild(div);
    }

    game = new Game_01(names, 3);

    $("#main_modal").modal('hide');


    game.updateView = function() {

        for (var i = 0; i < players.length; i++) {
            names.push(players.item(i).id);
            var id = "player_" + i;
            playerDisplay = document.getElementById(id);
            playerDisplay.getElementsByTagName("h1")[1].innerHTML = 301 - this.playerScoreByIndex(i);
            if(this.playerTurn == i) {
                playerDisplay.style.backgroundColor = 'green';
            }
            else {
                playerDisplay.style.backgroundColor = 'transparent';
            }
        }

        if(this.winner != undefined) {
            alert('Player Number' + this.winner + 1 + ' wins!');
        }

    }
    // start

}

/// ADD PLAYER UI

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("p_input").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.id = inputValue;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("players").appendChild(li);
    }
    document.getElementById("p_input").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}