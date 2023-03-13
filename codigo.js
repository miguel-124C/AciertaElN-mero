/*Data*/
let numTry = 0;

let time = 20;
let tryPermitted = 5;
let rangeNumber = 100;

let numRandom;
let numCronometro
let win = false;
/**---------------------------- */
/*Objetos del Dom*/
const main = document.getElementById("main");
const btnOptions = document.querySelector(".btn-options");
const containerOptions = document.querySelector(".container-options");
const options = document.querySelector(".options");
const listOptions = document.querySelectorAll(".list-options");

const btnStartGame = document.querySelector(".btn-start-game");
/*--------------------------------------------------*/


btnOptions.addEventListener("click",menuOptions);
options.addEventListener("submit",saveDataGame);
btnStartGame.addEventListener("click",startGame);


listOptions.forEach(data=>{
    for (const element of data.children) {
        element.addEventListener("click",()=>{
            const e = element;
            element.classList.add("select");
            for (const i of data.children) {
                if(e != i){
                    if(i.classList.contains("select")){
                        i.classList.remove("select");
                    }
                }
            }
        });
    }
});

/*Inicio Menu bars*/
function menuOptions(){
    if(containerOptions.classList.contains("options-active")){
        containerOptions.classList.remove("options-active");
        containerOptions.classList.add("options-desactive");
    }else{
        containerOptions.classList.add("options-active");
        containerOptions.classList.remove("options-desactive");
    }
}
/*Fin Menu bars*/

/*Inicio form*/
function saveDataGame(e){
    e.preventDefault();
    menuOptions();
    setDataGame();
}
function setDataGame(){
    const dataGame = document.querySelectorAll(".data-game");
    dataGame.forEach(datos=>{
        if(datos.classList.contains("select")){
            if(datos.classList.contains("time-game"))time = datos.textContent;
            if(datos.classList.contains("try-permitted"))tryPermitted = datos.textContent;
            if(datos.classList.contains("range-number"))rangeNumber = datos.textContent.split("-")[1];
        }
    });
    document.querySelector(".description").textContent = `Adivina el número del 1 al ${rangeNumber}`;
    console.log(`el tiempo limite es: ${time} los intentos: ${tryPermitted} el rango es: ${rangeNumber}`);
}
/*Fin form*/

/*Start game*/
function startGame(){
    numRandom = Math.floor(Math.random()*rangeNumber);
    main.innerHTML = `  
    <div id="game">
        <div class="num-aleatorio">
            <div class="num-oculto num-front">?</div>
            <div class="num-oculto num-back">${numRandom}</div>
            <span class="cronometro">${time}</span>
        </div>
        <div class="num-input">
            <form id="form-number">
                <input type="number" id="number-user">
                <input type="submit" id="submit-number">
                <span>Intentos: ${numTry}</span>
            </form>
        </div>
        <div class="num-alert">

        </div>
    </div>`;
    const formNumber = document.getElementById("form-number");
    const numberUser = document.getElementById("number-user");
    numberUser.focus();
    formNumber.querySelector("input[type='submit']").addEventListener("click",comprobarNumber);
    iniciarCronometro();
}
function comprobarNumber(e){
    e.preventDefault(); 
    const formNumber = document.getElementById("form-number");
    const numberUser = document.getElementById("number-user");
    numberUser.focus();
    const messageAlert = document.querySelector(".num-alert");
    if(numTry < tryPermitted){
        if(numberUser.value != ""){
            numTry++;
            formNumber.lastElementChild.textContent = `Intentos: ${numTry}/${tryPermitted}`;
            if(numberUser.value == numRandom){win=true;  endGame();}
            else if(numberUser.value > numRandom){
                messageAlert.textContent = "El numero es menor al que ingreso";
            }else{
                messageAlert.textContent = "El numero es mayor al que ingreso";
            }
            if(numTry == tryPermitted)endGame("Numero de intentos sobrepasados");
        }
    }
    formNumber.reset();
}
function iniciarCronometro(){
    const cronometro = document.querySelector(".cronometro");
    numCronometro = setInterval(() => {
        time--
        cronometro.textContent = time;
        if(time == 0)endGame("Tiempo acabado");
    }, 1000);
}
function endGame(message){
    clearInterval(numCronometro);
    const numberUser = document.getElementById("number-user");
    numberUser.disabled = "true";
    const numFront = document.querySelector(".num-front");
    const numBack = document.querySelector(".num-back");

    numFront.style.animation = "mostrarFront forwards 1.5s";
    numBack.style.animation = "mostrarBack forwards 1.5s";

    const messageAlert = document.querySelector(".num-alert");
    if(win) messageAlert.textContent = "Ganaste";
    else messageAlert.textContent = message;
    messageAlert.innerHTML += `
    <span class="play-again">
        <button class="btn-again">Volver a jugar</button>
    </span>`;

    document.querySelector(".btn-again").addEventListener("click",playAgain);
}
function playAgain(){
    window.location.href = window.location.href;
}
/*End game*/