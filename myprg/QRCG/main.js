
var urltxt = document.getElementById('urltxt')
var qrimg = document.getElementById('qrimg')
var imgbox = document.getElementById('imgbox')
var dow = document.getElementById('dow')


function genqr(){
    if (urltxt.value==''){
        alert('Please enter a URL')
    }else{
        imgbox.classList.add('show')
        console.log(urltxt.value)
        qrimg.src = 'https://api.qrserver.com/v1/create-qr-code/?data='+urltxt.value+'&margin=10&format=jpg';
        console.log(qrimg)
        dow.style.display = 'block'

    }



}
function down(){

    var qrimg = document.getElementById('qrimg')
    // const qrmag = document.getElementById('qrCode');
    const qrURL = qrimg.src;
    const link = document.createElement('a');
    link.href = qrURL;
    link.download = 'qrcode.png';
    link.target = '_blank'
    imgbox.appendChild(link);
    link.click();
    // document.body.removeChild(link);
}