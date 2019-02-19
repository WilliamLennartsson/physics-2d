window.document.onload = function(e){
    //setUp();
    //console.log(spawnPlayer(200, 200));
}

// document.addEventListener('didload', handleOnLoad);

document.addEventListener('click', handleOnClick);


// function mouseOver(e){
    //     console.log(e)
    // }
    
    
    
//document.addEventListener('mousemove', handleOnClick);
// canvas.addEventListener('mouseover', mouseOver);
function createPlayer(){
    let player = new Player(context);
}

function handleOnClick(e){
    const px = e.clientX;
    const py = e.clientY;
    explode(px, py, 100);
}

let vertices, bounds, hits;
function explode(x, y, r){
    if(!running){
        newGame();
    }
    const points = getCirclePoints({x, y}, r, Vector)
    
    body = Bodies.circle(x, y, r);
    vertices = Vertices.create(points, body);
    bounds = Bounds.create(vertices);
    hits = Query.region(bodies, bounds)

    hits.map(hit => {
        particles.map(p => {
            if (hit.id === p.id){
                if (p.type == ParticleTypes.Danger){
                    console.log("you dead")
                    running = false;
                    return
                } else {
                    score++;
                    p.lifespan = 0;
                    p.wasMutated = false;
                    p.isMutating = false;
                    p.wasHitByPlayer = true;
                }
                // World.remove(engine.world, p.body)
                // particles.splice(j, 1)
                // bodies.splice(j, 1)
            }
        })
    })
    const explosion = new Explosion(x, y, r, context)
    explosions.push(explosion);
}

setUp();