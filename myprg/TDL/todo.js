
var text = document.getElementById('todo')
var ul = document.getElementById('list-cont')
var donebtn = document.querySelectorAll('.donebtn') 
var disp = document.getElementById('disp')
$(window).on("load",function()
{
$(".loader-wrapper").fadeOut("slow");
});
if (text.value==''){
    disp.style.display= 'none'
}

function add(){
    var listitem = document.createElement('li')
    // var head = document.createElement('h3')
    // console.log(head)
    // head.textContent = text.value
    // console.log(head)
    if (text.value==''){
        alert('Please enter a task')
    }else {
    listitem.innerHTML =
    `<h3>${text.value}</h3>
    <button onclick='edit(event)' id='editbtn' class='ebtn'></button>
    <button onclick='done(event)' id='donebtn'class='dbtn'></button>
    <button onclick='del(event)'class='dele'></button> `;
    ul.append(listitem)
    }
}
function del(event){
    event.target.parentElement.remove()
}
function edit(event){
    event.target.closest('li').querySelector('h3').contentEditable = true
    // event.target.closest('h3').contentEditable = true
    // event.target.parentElement.contentEditable = true
    console.log(event.target.closest('li').querySelector('h3'))
    event.target.style.display= 'none'
    // var ebtn = event.target.parentElement.querySelectorAll('button')
    // ebtn[0].style.display= 'none'
    // var dbtn = event.target.closest('li').querySelectorAll('button')
    // dbtn[1].style.display= 'block'

    var btn = event.target.closest('li').querySelectorAll('button')
    btn[0].style.display= 'none'
    btn[1].style.display= 'block'
}
function done(){
    event.target.closest('li').querySelector('h3').contentEditable = false

    // event.target.parentElement.contentEditable = false
    // event.target.style.display= 'none'
    // var ebtn = event.target.parentElement.querySelectorAll('button')
    // ebtn[0].style.display= 'block'

    var btn = event.target.closest('li').querySelectorAll('button')
    btn[0].style.display= 'block'
    btn[0].style.backgroundImage = 'url(pencil.png)';
    btn[1].style.display= 'none'
 
}
function dps(){
    if (text.value==''){
        disp.style.display= 'none'
    }else{
    disp.style.display= 'block'
    }
    disp.textContent = text.value


}