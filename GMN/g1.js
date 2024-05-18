var uguessnum = document.getElementById('guessnum')
var cguessnum = document.getElementById('cguessnum')
var result = document.getElementById('result')
var wins = document.getElementById('scorew')
var losses = document.getElementById('scorel')
var win = 0
var loss = 0

function check()
{   if (win == 5){
    alert("You win! The game is over.")
    window.location.reload();
}   else if (loss ==10){
    alert("You lose! The game is over.")
    window.location.reload();
}   else{
        var randomnum = Math.floor(Math.random()*10)+1
        var enternum = uguessnum.value
        if (enternum!=''){
            if (enternum == randomnum)
                {
                    console.log('right')
                    console.log(randomnum)
                    console.log(enternum)
                    result.textContent='You Are Right'
                    win = win + 1
                    wins.textContent='Win : '+win
                    cguessnum.textContent=randomnum

                }
                else{
                    console.log('wrong')
                    console.log(randomnum)
                    console.log(enternum)
                    result.textContent='You Are Wrong'
                    loss = loss + 1
                    losses.textContent='Loss : '+loss
                    cguessnum.textContent=randomnum

                }
        }else{
            alert('Enter a Number Between 1 to 10')
        }
}
}
