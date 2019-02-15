window.document.onload = function(e){
    //setUp();
    console.log(spawnPlayer(200, 200));
}

document.addEventListener('', handleOnLoad);

//document.addEventListener('click', handleOnClick);

// canvas.addEventListener('mouseover', mouseOver);

// function mouseOver(e){
//     console.log(e)
// }

function handleOnLoad(){
    console.log("dadaokd")
}

function handleOnClick(e){
    spawnParticle(e.clientX, e.clientY)
}
