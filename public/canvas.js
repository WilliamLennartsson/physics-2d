
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
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
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
const worldObjects = [particles, playforms, players];

let tick = 0;
// Game loop
function draw(){
    context.clearRect(0, 0, WIDTH, HEIGHT)

    worldObjects.forEach(list => {
        list.map(object => {
            object.show();
        })
    })
    
    // particles.map(particle => {        
    //     particle.show();
    // })

    // platforms.map(platform => {
    //     platform.show();
    // })

    // players.map(player => {
    //     player.show();
    // })

    if (tick % 10 == 0){
        var x = event.clientX;   
        var y = event.clientY;
        spawnParticle(x, y)

    }

    Engine.update(engine);
    tick += 1;
    requestAnimationFrame(draw);
}



// World object functions

function spawnPlatform(x, y, w, h){
    let p = new Platform(context, x, y, w, h);
    World.add(engine.world, p.body);
    platforms.push(p);
    return p;
}

function spawnParticle(x, y){
    let p = new Particle(context, x, y, 20);
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
    spawnPlatform(0, h - 20, w, 20);
    spawnPlatform(0, 20, w, 20);
    spawnPlatform(0, 20, 20, h);
    spawnPlatform(w - 20, 20, 20, h);
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



