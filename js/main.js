$(document).ready(function(){

    $("#main_modal").modal();

    $('#game_select').on('click',function() {
        //alert($(this).val());
        console.log($(this).val());
    });

});

$(document).on("change","select",function(){
    $("option[value=" + this.value + "]", this)
        .attr("selected", true).siblings()
        .removeAttr("selected")
});

// input 20, 2x20, 3x20
function throwDart() {
    var input = document.getElementById("d_input").value;

    var value = input.split('x');

    var multiplier = value[0];
    var field = value[1];

    if (field === undefined) {
        field = value[0];
        multiplier = 1;
    }

    if ((field < 21 || field == 25 || field == 50) && multiplier < 4) {
        DartBoard.throwDart("test", field, multiplier, this);
    }
}

// Creates Scoreboard UI and returns players names as Array
function createScoreboard(points, players) {

    var names = Array();

    for (var i = 0; i < players.length; i++) {
        names.push(players.item(i).id);
        var col = document.createElement("div");
        col.className = "col-sm-" + Math.max(4, Math.floor(12/players.length));
        document.getElementById("game_players").appendChild(col);
        var div = document.createElement("div");
        div.id = "player_" + i;
        div.className = "player-score";
        var h = document.createElement("H2"); // Create the H1 element
        var t = document.createTextNode(players.item(i).id); // Create a text element
        h.appendChild(t);
        div.appendChild(h);
        var h = document.createElement("H1"); // Create the H1 element
        var t = document.createTextNode(points); // Create a text element
        h.appendChild(t);
        div.appendChild(h);
        col.appendChild(div);
    }

    return names;
}

function startGame() {

    var gameSelect = document.getElementById("game_select");
    var gameType = gameSelect.options[gameSelect.selectedIndex].value;
    var gamePoints = gameSelect.options[gameSelect.selectedIndex].innerHTML;
    var players = document.getElementById("players").getElementsByTagName("li");

    // get players
    var names = createScoreboard(gamePoints,players);

    game = new Game_01(names, gameType);

    $("#main_modal").modal('hide');


    game.updateView = function() {

        for (var i = 0; i < players.length; i++) {
            names.push(players.item(i).id);
            var id = "player_" + i;
            var playerDisplay = document.getElementById(id);
            playerDisplay.getElementsByTagName("h1")[0].innerHTML = gamePoints - this.playerScoreByIndex(i);
            if(this.playerTurn == i) {
                playerDisplay.style.borderBottom = '5px solid #3ece0d';
            }
            else {
                playerDisplay.style.borderBottom = '0px';
            }
        }

        var round = document.getElementById("round");
        round.innerHTML = this.round;
        var darts = document.getElementById("darts");
        darts.innerHTML = 3- this.numberOfDartsThrown();

        if(this.winner != undefined) {
            alert(this.winner + ' wins!');
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