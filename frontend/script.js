function draw() {
    fetch('/cpu', {method: 'POST'}).then((res) =>{
        if(res.ok) return res.json();
        throw new Error('Request failed');
        }).then((data) => {

            const canvas = document.getElementById("memory");
            const ctx = canvas.getContext("2d");
            let x = 0;
            const y = canvas.height;
            const arr_data = [];
            const maxDataPoints = canvas.width;

            console.log(data);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            arr_data.push(data);
            if (arr_data.length > maxDataPoints) {
                arr_data.shift();
            }

            ctx.beginPath();
            ctx.moveTo(x, y - arr_data[0] * y);
            for (let i = 1; i < arr_data.length; i++) {
                x += 1;
                ctx.lineTo(x, y - arr_data[i] * y);
            }
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.stroke();

            if (x > canvas.width) {
                x = 0;
            }

            //requestAnimationFrame(draw);
            draw();
    }).catch((error) => {
        console.log(error);
    });
}


function container_list(){
    fetch("/get_containers", {method: 'POST'}).then((res) =>{
        if(res.ok) return res.json();
        throw new Error('Request failed');

    }).then((data) => {
        let table = document.getElementById("c_list");
        console.log(data);
        
        let row = table.insertRow(); 
        
        for (const property in data) {
            let cell = row.insertCell();
            cell.innerHTML = `${data[property]}`;
        }
    
    }).catch((error) => {
        console.log(error);
    });
}

draw();
container_list();

/*
setInterval( function(){
    fetch('/cpu', {method: 'POST'}).then((res) =>{
        if(res.ok) return res.json();
        throw new Error('Request failed');
    }).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}, 500);
*/