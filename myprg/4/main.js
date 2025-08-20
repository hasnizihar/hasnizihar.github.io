let list = ["Rock","Paper","Scissor"];
var main = document.getElementById('main')
var ncard = document.getElementById('namecard')
var  scuser = document.getElementById('scuser')
var btns = document.getElementById('btns')
var popup = document.getElementById('popup')
var scb = 0
var scu = 0
var times = 0

$(window).on("load",function()
{
$(".loader-wrapper").fadeOut("slow");
});

function entername(){
    console.log('pass')
    var username = document.getElementById('username')
    console.log(username.value)
    if(username.value==''){
        username.value='User1'
    }
    scuser.textContent =username.value
    ncard.style.display = 'none'
    console.log('pass3')
    main.style.display = 'flex'
    main.classList.add('slid')
    console.log('pass4')

}
function cls(){
    // scr.textContent = '0-0'
    popup.style.display ='none'
    
    main.classList.add('slid') 
    var scr = document.getElementById('scr') 
    
    scb = 0
    scu = 0
    times = 0
    scr.textContent = `${scu}-${scb}`
    main.style.display = 'flex'
    popup.classList.remove('slid') ;

}

function check(x){
    btns.style.display= 'none'
    var scr = document.getElementById('scr')
    scr.classList.remove('blink') ;
    var status = document.getElementById('status')
    status.style.display ='none'
    var resbot = document.getElementById('resbot')
    var resuser = document.getElementById('resuser')
    resuser.classList.remove('blink') ;
    resbot.classList.remove('blink') ;
    var y = list[(Math.floor(Math.random() * list.length))]
    times+=1
    function xwon(){
        scu+=1
    }
    function ywon(){
        scb+=1
    }
    if (x==y){
        times-=1
        status.textContent = 'Draw'
    }else if(x=="Rock" && y=="Paper"){
        ywon()
        status.textContent = 'Loss'
    }else if(x=="Rock" && y=="Scissor"){
        xwon()
        status.textContent = 'Win'
    }else if(x=="Scissor" && y=="Paper"){
        xwon()
        status.textContent = 'Win'
    }else if(x=="Scissor" && y=="Rock"){
        ywon()
        status.textContent = 'Loss'
    }else if(x=="Paper" && y=="Rock"){
        xwon()
        status.textContent = 'Win'
    }else if(x=="Paper" && y=="Scissor"){
        ywon()
        status.textContent = 'Loss'
    }
    // if(x==y){
    //     console.log('win')
    //     console.log(x)
    //     console.log(y)
    //     scu+=1
    //     status.textContent = 'Win'
    //     ["Rock","Paper","Rock"]
    // }else if(x=="Rock" && y=="Paper"){
    //     console.log('Loss')
    //     console.log(x)
    //     console.log(y)
    //     scb+=1
    //     status.textContent = 'Loss'
    // }else if(x=="Rock" && y=="Scissor")



    var t3 = document.getElementById('t3')
    function dis3(){
        t3.style.display= 'block';
        t3.classList.add('blink') ;
    }
    var t2 = document.getElementById('t2')
    function dis2(){
        t3.style.display= 'none';
        t2.style.display= 'block';
        t2.classList.add('blink') ;
    }
    var t1 = document.getElementById('t1')
    function dis1(){
        t2.style.display= 'none';
        t1.style.display= 'block';
        t1.classList.add('blink') ;
    }
    var scr = document.getElementById('scr')
    function dis0(){
        t1.style.display= 'none';
        status.style.display ='block'
        status.classList.add('blink') ;
        // var scr = document.getElementById('scr')
        scr.textContent = `${scu}-${scb}`
        scr.classList.add('blink') ;
        resuser.textContent = x
        resuser.classList.add('blink') ;
        resbot.textContent = y
        resbot.classList.add('blink') ;
        btns.style.display= 'flex'
    }
    
    setTimeout(dis3,0)
    setTimeout(dis2,1000)
    setTimeout(dis1,2000)
    setTimeout(dis0,3000)
    function twin(){
        // scr.textContent = '0-0'
        main.style.display = 'none'
        popup.classList.add('slid') ;
        popup.style.display= 'flex'
        main.classList.remove('slid')
        document.getElementById('msg1').textContent = 'Congratulations'
        document.getElementById('msg2').textContent = 'You Won The Game'
    }
    function tloss(){
        // scr.textContent = '0-0'
        main.style.display = 'none'
        popup.classList.add('slid') ;
        popup.style.display= 'flex'
        main.classList.remove('slid')
        document.getElementById('msg1').textContent = 'Oops'
        document.getElementById('msg2').textContent = 'Game Over'
    }
    if(times==3){
        if(scu>scb){
            console.log('twin')
            setTimeout(twin,4500)
        }else{
            console.log('tloss')
            setTimeout(tloss,4500)
        }
    }

}