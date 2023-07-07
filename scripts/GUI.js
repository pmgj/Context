import Context from "./Context.js";
import EndOfGame from "./EndOfGame.js";

class GUI {
    constructor() {
        this.game = null;
        this.format = new Intl.NumberFormat('en-us', { minimumFractionDigits: 3 });
        this.tbody = document.querySelector("tbody");
    }
    startGame() {
        this.game = new Context(10);
        onkeyup = this.play.bind(this);
    }
    play(evt) {
        let input = document.querySelector("input[type='text']");
        let word = input.value;
        if (evt.key !== 'Enter' || !word) {
            return;
        }
        input.value = "";
        let obj = this.game.play(word);
        this.addWordToTable(word, obj.distance);
        switch (obj.endOfGame) {
            case EndOfGame.LOSE:
                alert(`You lose!`);
                this.addWordToTable(obj.secretWord, 1);
                this.gameOver();
                break;
            case EndOfGame.WIN:
                alert(`You win!`);
                this.gameOver();
                break;
            case EndOfGame.NONE:
                break;
        }
    }
    gameOver() {
        onkeyup = undefined;
        setTimeout(() => {
            this.tbody.innerHTML = "";
            this.startGame();
        }, 5000);
    }
    addWordToTable(word, distance) {
        let tr = this.tbody.insertRow();
        let td = tr.insertCell();
        td.textContent = word;
        td = tr.insertCell();
        td.textContent = this.format.format(distance);
        td.style.background = `linear-gradient(to right, var(--${distance < 0.33 ? 'red' : distance < 0.66 ? 'yellow' : 'green'}) ${distance * 100}%, hsl(240, 40%, 60%, 0.9) 0%)`;
        this.sortTable();
    }
    sortTable() {
        let rows, switching, i, x, y, shouldSwitch;
        switching = true;
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = this.tbody.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 0; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[1].textContent;
                y = rows[i + 1].getElementsByTagName("TD")[1].textContent;
                // Check if the two rows should switch place:
                if (+x < +y) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}

let gui = new GUI();
gui.startGame();