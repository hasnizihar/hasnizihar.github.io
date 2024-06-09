$(window).on("load",function()
{
$(".loader-wrapper").fadeOut("slow");
});

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav a");
    console.log(navLinks)
    const sections = document.querySelectorAll("section");
    console.log(sections)

    window.addEventListener("scroll", () => {
        let current = "";
        console.log('pass1')
        sections.forEach(section => {
            console.log('pass2')

            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });
        console.log('pass20')

        navLinks.forEach(link => {
            link.classList.remove("light");
            console.log('pass5')

            if (link.getAttribute("href").includes(current)) {
                link.classList.add("light");
            }
        });
    });
});


let sections = document.querySelectorAll('section')
var wdli = document.getElementById('wdli')
var gdli = document.getElementById('gdli')
var prli = document.getElementById('prli')
var adli = document.getElementById('adli')
var pfli = document.getElementById('pfli')
var skdis = document.getElementById('sk-dis')

window.onbeforeunload = function () {
    window.scrollTo(0,0);
};

document.getElementById('wdinp').checked = true;

if (document.getElementById('wdinp').checked) {
    console.log('pass')
    // document.getElementById('wdinp').checked = false;
    document.getElementById('gdinp').checked = false;
    gdli.style.display = 'none'
    document.getElementById('prinp').checked = false;
    prli.style.display = 'none'
    document.getElementById('adinp').checked = false;
    adli.style.display = 'none'
    document.getElementById('pfinp').checked = false;
    pfli.style.display = 'none'
    if (window.matchMedia("(max-width: 600px)").matches) {
        // If media query matches
        wdli.style.display = 'block';
        wdli.classList.add('down');
    }else {
        skdis.appendChild(wdli)
        wdli.style.display = 'block'
        wdli.classList.add('down');
    }

} else {
    console.log('fail')
    wdli.classList.remove('down');
    wdli.style.display = 'none';
    
}

// window.onscroll = () => {
//     console.log('killed')
//     sections.forEach((sec) => {
//         let top = window.scrollY;
//         let offset = sec.offsetTop - 800;
//         let height = sec.offsetHeight;

//         if (top >= offset && top < offset + height){
//             sec.classList.add('active');
//         } else {
//             sec.classList.remove('active');
//         }
//     })
// }

let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction(),sliding()};

 function sliding(){
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 600;
        let height = sec.offsetHeight;

        if (top >= offset && top < offset + height){
            sec.classList.remove('opp');
            sec.classList.add('active');
        } else {
            // sec.classList.remove('active');
        }
    })
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }

}
// var nar1 = document.getElementById('nav1')
// function lig(){
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
//         console.log('killed')

//         nav1.classList.add('light')
//       }
// }
// scripts.js


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function togwd(){
    console.log(document.getElementById('wdinp').checked)
    if (document.getElementById('wdinp').checked) {
        console.log('pass')
        // document.getElementById('wdinp').checked = false;
        document.getElementById('gdinp').checked = false;
        gdli.style.display = 'none'
        document.getElementById('prinp').checked = false;
        prli.style.display = 'none'
        document.getElementById('adinp').checked = false;
        adli.style.display = 'none'
        document.getElementById('pfinp').checked = false;
        pfli.style.display = 'none'
        if (window.matchMedia("(max-width: 600px)").matches) {
            // If media query matches
            wdli.style.display = 'block';
            wdli.classList.add('down');
        }else {
            skdis.appendChild(wdli)
            wdli.style.display = 'block'
            wdli.classList.add('down');
        }

    } else {
        console.log('fail')
        wdli.classList.remove('down');
        wdli.style.display = 'none';
        
    }
}

function toggd(){
    console.log(document.getElementById('gdinp').checked)
    if (document.getElementById('gdinp').checked) {
        document.getElementById('wdinp').checked = false;
        wdli.style.display = 'none';
        // document.getElementById('gdinp').checked = false;
        document.getElementById('prinp').checked = false;
        prli.style.display = 'none'
        document.getElementById('adinp').checked = false;
        adli.style.display = 'none'
        document.getElementById('pfinp').checked = false;
        pfli.style.display = 'none'
        if (window.matchMedia("(max-width: 600px)").matches) {
            // If media query matches
            gdli.style.display = 'block'
            gdli.classList.add('down');
        }else {
            skdis.appendChild(gdli)
            gdli.style.display = 'block';
            gdli.classList.add('down');
        }
    } else {
        gdli.classList.remove('down');
        gdli.style.display = 'none'
        
    }
}
function togpr(){
    console.log(document.getElementById('prinp').checked)
    if (document.getElementById('prinp').checked) {
        document.getElementById('wdinp').checked = false;
        wdli.style.display = 'none';
        document.getElementById('gdinp').checked = false;
        gdli.style.display = 'none'
        // document.getElementById('prinp').checked = false;
        document.getElementById('adinp').checked = false;
        adli.style.display = 'none'
        document.getElementById('pfinp').checked = false;
        pfli.style.display = 'none'
        if (window.matchMedia("(max-width: 600px)").matches) {
            // If media query matches
            prli.style.display = 'block'
            prli.classList.add('down');
        }else {
            skdis.appendChild(prli)
            prli.style.display = 'block'
            prli.classList.add('down');
        }

    } else {
        prli.classList.remove('down');
        prli.style.display = 'none'
        
    }
}
function togad(){
    console.log(document.getElementById('adinp').checked)
    if (document.getElementById('adinp').checked) {
        document.getElementById('wdinp').checked = false;
        wdli.style.display = 'none';
        document.getElementById('gdinp').checked = false;
        gdli.style.display = 'none'
        document.getElementById('prinp').checked = false;
        prli.style.display = 'none'
        // document.getElementById('adinp').checked = false;
        // adli.style.display = 'none'
        document.getElementById('pfinp').checked = false;
        pfli.style.display = 'none'
        if (window.matchMedia("(max-width: 600px)").matches) {
            // If media query matches
            adli.style.display = 'block'
            adli.classList.add('down');
        }else {
            skdis.appendChild(adli)
            adli.style.display = 'block'
            adli.classList.add('down');
        }

    } else {
        adli.classList.remove('down');
        adli.style.display = 'none'
        
    }
}
function togpf(){
    console.log(document.getElementById('pfinp').checked)
    if (document.getElementById('pfinp').checked) {
        document.getElementById('wdinp').checked = false;
        wdli.style.display = 'none';
        document.getElementById('gdinp').checked = false;
        gdli.style.display = 'none'
        document.getElementById('prinp').checked = false;
        prli.style.display = 'none'
        document.getElementById('adinp').checked = false;
        adli.style.display = 'none'
        // document.getElementById('pfinp').checked = false;
        if (window.matchMedia("(max-width: 600px)").matches) {
            // If media query matches
            pfli.style.display = 'block'
            pfli.classList.add('down');
        }else {
            skdis.appendChild(pfli)
            pfli.style.display = 'block'
            pfli.classList.add('down');
        }

    } else {
        pfli.classList.remove('down');
        pfli.style.display = 'none'
        
    }
}
var ccc = document.getElementById('ccc')
var popcls = document.getElementById('popcls')
var popup1 = document.getElementById('popup1')
var mainpop = document.getElementById('mainpop')
var subcon = document.getElementById('subcon')
function popup(event){
    document.body.style.overflow = 'hidden';
    popcls.style.display = 'block';
    popup1.style.display = 'block';
    ccc.style.display = 'block';
    rightbtn.style.display = 'flex'
    leftbtn.style.display = 'none'

    console.log(event.target.closest('.prg-mini').querySelectorAll('img'));
    var img = event.target.closest('.prg-mini').querySelectorAll('img');
    mainpop.innerHTML = img[0].outerHTML
    for (let i = 0; i < img.length; i++) {
        // img[i].style.display = 'block'
        console.log(img[i])
        subcon.innerHTML += img[i].outerHTML;
    }
}

function cls(){
    document.body.style.overflow = 'auto';

    console.log('pass')
    popcls.style.display = 'none';
    popup1.style.display = 'none';
    mainpop.innerHTML = ''
    subcon.innerHTML = ''
}

var leftbtn = document.getElementById('left')
function left(){
    var subcon = document.getElementById('subcon')
    var mainpop = document.getElementById('mainpop')
    var popimg = mainpop.querySelector('img')
    var sublist = subcon.querySelectorAll('img')
    for (let i = 0; i < sublist.length; i++){
        if (popimg.outerHTML === sublist[i].outerHTML){
            if (i==0){
                leftbtn.style.display = 'none';
                break  
            }else{
                rightbtn.style.display = 'flex'
                mainpop.innerHTML = sublist[i-1].outerHTML
                if (i==1){
                    leftbtn.style.display = 'none'
                }
                break
            }
        }
    } 
}  
var rightbtn = document.getElementById('right')
function right(){
    console.log('pass1')
    var subcon = document.getElementById('subcon')
    var mainpop = document.getElementById('mainpop')
    var popimg = mainpop.querySelector('img')
    var sublist = subcon.querySelectorAll('img')
    console.log('pass2')
    for (let i = 0; i < sublist.length; i++){
        if (popimg.outerHTML === sublist[i].outerHTML){
            if (i==sublist.length-1){
                rightbtn.style.display = 'none'
                break  
            }else{
                leftbtn.style.display = 'flex'
                mainpop.innerHTML = sublist[i+1].outerHTML
                if (i==sublist.length-2){
                    rightbtn.style.display = 'none'
                }
                break
            }
        }
    }
}
var temp = document.getElementById('temp')
var menu = document.getElementById('menu')
var nav = document.getElementById('nav')
function menuclick(){
    if (temp.style.display=='none'){
        menu.classList.remove('menurotre')
        nav.classList.remove('goaw')
        menu.classList.add('menurot')
        nav.classList.add('comeaw')
        temp.style.display ='block'

    }else{
        menu.classList.remove('menurot')
        nav.classList.remove('comeaw')
        menu.classList.add('menurotre')
        nav.classList.add('goaw')
        temp.style.display = 'none'
    }

    // console.log('hello')
    
    // nav.classList.add('goaw')
    // nav.style.display ='none'
    // console.log(menu,nav)

}
    // console.log(subcon.querySelectorAll('img'))
    // console.log(mainpop.querySelector('img'))




// document.getElementById('wdinp').removeAttr("checked");
// document.getElementById('gdinp').removeAttr("checked");
// document.getElementById('prinp').removeAttr("checked");
// document.getElementById('pfinp').removeAttr("checked");


    // if (window.matchMedia("(max-width: 600px)").matches) {
    //      // If media query matches
    //   document.body.style.backgroundColor = "yellow";
    // } else {
    //   document.body.style.backgroundColor = "pink";
    // }
