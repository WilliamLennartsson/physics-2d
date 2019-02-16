
let canvas, context, WIDTH, HEIGHT;

var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Vector = Matter.Vector,
Body = Matter.Body;

const engine = Engine.create();
// Set up..
function setUp(){
    HEIGHT = window.innerHeight - 30;
    WIDTH = window.innerWidth - 30;
    canvas = document.getElementById("gameScreen");
    context = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    createBounds(WIDTH, HEIGHT);

    requestAnimationFrame(draw);
}

// WolrdObjects
const particles = [];
const platforms = [];
const players = [];
const worldObjects = [particles, platforms, players];

let tick = 0;
// Game loop
function draw(){
    context.clearRect(0, 0, WIDTH, HEIGHT)
    context.fillStyle = '#f0ece2';
    worldObjects.forEach(list => {
        list.map((object, index) => {
            object.show();
            object.update();
            if(object.isDead){
                list.splice(index, 1)
                World.remove(engine.world, object.body)
            }
        })
    })
    Engine.update(engine);
    update();
    tick ++;
    requestAnimationFrame(draw);
}

function update(){

    if (tick % 30 == 0){
        // let gX = engine.world.gravity.x
        // let gY = engine.world.gravity.y
        // let newY = gY !== 1 ? 1 : -1
        // let newX = gX >= 1 ? -1 : gX += 0.3
        // {x: newX, y: newY}
        const randomGravity = { x:(Math.random() * 2) - 1, y: (Math.random() * 2) - 1 }
        engine.world.gravity = randomGravity;
    } else if (tick > 1000000) tick = 0

    if (tick % 10 == 0){
        spawnRandomParticle()
    }


}

// World object functions

function spawnPlatform(x, y, w, h){
    let p = new Platform(context, x, y, w, h);
    World.add(engine.world, p.body);
    platforms.push(p);
    return p;
}

function spawnParticle(x, y, type = ParticleTypes.Medium){
    let p = new Particle(context, x, y, type);
    World.add(engine.world, p.body);
    particles.push(p);
    return p;
}

function spawnPlayer(x, y){
    let player = new Player(context, x, y);
    World.add(engine.world, player.body)
    players.push(player);
    return player;
}

function createBounds(w, h){
    //Map bound platforms
    spawnPlatform(0, h - 5, w, 5); // Bottom
    spawnPlatform(0, 5, w, 5); // Top
    spawnPlatform(0, 5, 5, h); // Left
    spawnPlatform(w - 5, 5, 5, h); // Right
}

function spawnRandomParticle(){
    const rx = (Math.random() * WIDTH - (WIDTH/5)) + (WIDTH/5)
    const ry = (Math.random() * HEIGHT - (WIDTH/5)) + (WIDTH/5)
    spawnParticle(rx, ry, randomParticleType())
}

function randomParticleType(){
    const floor = Math.floor(100); 
    const r = Math.random() * floor;
    if (r > 0 && r < 20){ // 1 - 20
        return ParticleTypes.Small
    } else if (r > 20 && r < 40){ // 20 - 40
        return ParticleTypes.Medium
    } if (r > 40 && r < 60){ // 40 - 60
        return ParticleTypes.Large
    } if (r > 60 && r < 80) { // 
        return ParticleTypes.Danger
    }
}







// // create an engine

// // create two boxes and a ground
// Bodies.rectangle()
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(450, 50, 80, 80);
// var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// // add all of the bodies to the world
// World.add(engine.world, [boxA, boxB, ground]);

// // run the engine
// Engine.run(engine);


// run the renderer
// function spawnBlock(x, y){
//     var circle = Bodies.circle(x, y, 80);
    
    
//     Body.applyForce(circle, pos, 1)
// }

// document.addEventListener('onLoad')





// let scene, context;
// let pRadius, pHeight, WIDTH, HEIGHT;
// window.onload = function(e){ 
//     setUp();
// }

// let p;

// const setUp = () => {
//     scene = document.getElementById("scene");
//     context = scene.getContext("2d");
//     p = new Particle(0, 0, context)
//     HEIGHT = scene.height
//     WIDTH = scene.width
//     pRadius = WIDTH / 20
//     console.log(HEIGHT, WIDTH)
    
//     console.log(p.x, p.y)
//     window.requestAnimationFrame(loop)
// }

// function loop(){
//     context.clearRect(0, 0, WIDTH, HEIGHT)

//     p.show();
//     p.update();
//     window.requestAnimationFrame(loop)
// }

// // -- PARTICLE --

// function Particle(x, y, context) {
//     this.x = x
//     this.y = y

//     this.show = function(){
//         context.fillStyle = "#FF0000";
//         context.strokeRect(this.x, this.y, pRadius, pRadius)

//     }

//     this.update = function(){
//         this.x += 1;
//         this.y += 1;
//     }
// }



