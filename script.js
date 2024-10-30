num_order = "7894561230";
reverse = false;
shuffled = false;
hidden = false;
l = 4;
delay = 0;

function time() {
    if (delay != 0) delay--;
}

function r(l) {
    letters = "";
    for (var ingore = 0; ingore < l; ingore++) {
        letters += Math.round(Math.random() * 9) + "";
    }
    return letters;
}

async function generate_prompt() {

    if (Math.random() > 0.4) l++;
    let reverse = Math.random() > 0.75;
    let shuffled = Math.random() < 0.6;
    let hidden = false;
    if (!shuffled) {
        hidden = Math.random() < 0.7;
    } 

    if (shuffled) shuffle()
    else {
        num_order = "7894561230";
        populate();
    }

    if (hidden) hide("button", true);
    else if (document.getElementsByClassName("button")[0].firstChild.classList.contains("hidden")) hide("button", true)

    let str;
    let n = r(l);

    if (reverse) {
        str = `Type the following number backwards:\n${n}`;
    } else {
        str = `Type the following number:\n${n}`;
    }

    document.getElementsByClassName("question")[0].innerHTML = "";
    hide_keypad();
    hide("question");

    for (let letter of str) {
        document.getElementsByClassName("question")[0].innerHTML += letter != "\n" ? letter : "<br/>";
        await sleep(!isNaN(letter) && letter != " " ? 250 : 50);
    }

    await sleep(n.length * 0.6 * 1000);
    hide_keypad();
    hide("question");

    await sleep(n.length * 1.3 * 1000);
    if (document.getElementsByClassName("current")[0].innerText == (reverse ? [...n].reverse().join("") : n)) {
        document.getElementsByClassName("current")[0].innerText = "";
        generate_prompt();
    }
    else {
        alert("Incorrect!");
        location.reload();
    }
}

function shuffle() {
    num_order = [..."7894561230"].sort(() => {return 0.5 - Math.random()}).join('');
    populate();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function populate() {
    let numbers = num_order;
    let i = 0;
    for (let row = 1; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            document.getElementsByClassName(`b${row}-${col}`)[0].firstChild.innerHTML = numbers[i];
            i++;
        }
    }

    document.getElementsByClassName("b4-1")[0].firstChild.innerHTML = numbers[i];
}

function hide_keypad() {
    document.getElementsByClassName("keypad")[0].classList.toggle("hidden");
}

function hide(elem, f = false) {
    if (f) 
        [...document.getElementsByClassName(elem)].forEach(e => e.firstChild.classList?.toggle("hidden"));
    else
        [...document.getElementsByClassName(elem)].forEach(e => e.classList.toggle("hidden"));
}

function run(ev) {
    if (delay) return
    bindings = {
        "42": "C",
        "41": "9",
        "31": "6",
        "32": "7",
        "33": "8",
        "21": "3",
        "22": "4",
        "23": "5",
        "11": "0",
        "12": "1",
        "13": "2"
    }
    let index;
    if (ev.target.className && ev.target.className != "hidden")
        index = bindings[ev.target.className.split(" ")[1][1] + ev.target.className.split(" ")[1][3]];
    else
        index = bindings[ev.target.parentElement.className.split(" ")[1][1] + ev.target.parentElement.className.split(" ")[1][3]];

    if (index === "C")
        document.getElementsByClassName("current")[0].innerHTML = "";
    else {
        document.getElementsByClassName("current")[0].innerHTML += num_order[parseInt(index)];
        delay = 30;
    }
}

populate();
[...document.getElementsByClassName("button")].forEach(e => e.onmousedown = run);
setInterval(time, 1);
