const state = {
    view:{
         squares: document.querySelectorAll(".square"),
         enemy: document.querySelector(".enemy"),
         timeLeft:document.querySelector("#time-left"),
         score:document.querySelector("#score"),
         lives: document.querySelector("#lives")
    },
    values:{
        gamerVelocity: 1000,
        hitPosition: 0,
        result:0,
        currentTime: 60,
        life:3,
    },
    actions:{
        timerId:setInterval(randomSquare, 1000),
        countDownTimerId:setInterval(countDown, 1000),

    }
};

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0 || state.values.life <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert(`Game Over! O seu resultado foi: ${state.values.result}`)
        state.values.life = 'x' + 3
        state.view.lives.textContent = state.values.life
    }
}

function playSound(audioName){
let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function addListinerHitBox(){  //ouvir a açao 
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result ++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound('hit')
                

            }else{
                switch (state.values.life){
                    case 3: state.values.life --
                            state.view.lives.textContent = 'x' + state.values.life
                            break
                    case 2 : state.values.life --
                             state.view.lives.textContent = 'x' + state.values.life
                             break
                    case 1: state.values.life --
                            state.view.lives.textContent = 'x' + state.values.life
                            break  
                }
            }
        })
    })

}

function initialize(){  //funçao principal (inicia)
    addListinerHitBox()

}

initialize()
