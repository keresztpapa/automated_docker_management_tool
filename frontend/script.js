const canvas = document.getElementById("memory");
const ctx = canvas.getContext("2d");

setInterval( function(){
    fetch('/cpu', {method: 'POST'}).then((res) =>{
        if(res.ok) return res.json();
        throw new Error('Request failed');
    }).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}, 5000);



ctx.moveTo(100, 0);
ctx.lineTo(100, 250);
ctx.stroke();