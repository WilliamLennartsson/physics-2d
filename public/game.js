window.document.onload = function(e){
    //setUp();
    console.log(spawnPlayer(200, 200));
}

document.addEventListener('didload', handleOnLoad);

document.addEventListener('click', handleOnClick);


// function mouseOver(e){
    //     console.log(e)
    // }
    
    function handleOnLoad(){
        console.log("dadaokd")
    }
    
//document.addEventListener('mousemove', handleOnClick);
// canvas.addEventListener('mouseover', mouseOver);
function handleOnClick(e){
    const x = e.clientX;
    const y = e.clientY;

    
}

setUp();