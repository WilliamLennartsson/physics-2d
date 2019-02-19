
let canvas, context, WIDTH, HEIGHT;
let running = true;
let score = 0;

var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Vector = Matter.Vector,
Body = Matter.Body,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Vertices = Matter.Vertices,
Vector = Matter.Vector,
Bounds = Matter.Bounds,
Query = Matter.Query;

const engine = Engine.create();

// {  extra options
//     element: canvas,
//     constraint: {
//         render: {
//         visible: true
//         },
//         stiffness:0.8
//     }
// Set up..
function setUp(){
    
    HEIGHT = window.innerHeight - 30;
    WIDTH = window.innerWidth - 30;
    canvas = document.getElementById("gameScreen");
    context = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    physicsSetup();
    createBounds(WIDTH, HEIGHT);
    createPlayer();
    requestAnimationFrame(draw);
}

function physicsSetup(){
    
    engine.world.gravity = {x: 0, y: 0}   
}

function mouseDownEvent(){
    console.log("idja")
}

// WolrdObjects
let particles = [];
let platforms = [];
let players = [];
let explosions = [];
const worldObjects = [particles, platforms, players];
let bodies = [];

// Draw / Game loop
function draw(){
    
    context.clearRect(0, 0, WIDTH, HEIGHT)
    //context.fillStyle = '#f0ece2';
    worldObjects.forEach(list => {
        list.map((object, index) => {
            object.show(context);
            })
    })
    explosions.forEach((boom, i) => {
        if (boom.isDead){
            explosions.splice(i, 1)
        }
        boom.show(context);
        boom.update();
    })
    if (running){
        update();
        Engine.update(engine);
    }
    context.font = "30px Arial";
    context.fillText(`Score: ${score}` , 10, 50);
    requestAnimationFrame(draw);
}

function newGame(){
    score = 0;
    World.clear(engine.world, true)
    particles = [];
    bodies = [];
    running = true;
}

function increaseDifficulty(){
    spawnInterval -= 3;
    mutationRate += 0.02;
    clusterSizeCeiling += 1;
}

// Update / Game loop
let tick = 0;
let spawnInterval = 100
let gravityInterval = 100
let mutationRate = 0.2;
function update(){
    if(particles.length > 300) running = false
    worldObjects.forEach(list => {
            list.map((object, index) => {
                if(object.isDead){
                    list.splice(index, 1)
                    bodies.splice(index, 1)
                    World.remove(engine.world, object.body)
                } 
                if (object.wasSplit){
                    const pos = object.body.position,
                    type = nextParticleType(object.type);
                    particles.splice(index, 1)
                    bodies.splice(index, 1)
                    World.remove(engine.world, object.body)
                    spawnParticle(pos.x, pos.y, type);
                    let newType = Math.random() < mutationRate ? randomParticleType() : type
                    object.wasHitByPlayer ? type : newType
                    spawnParticle(pos.x, pos.y, newType);
                } 
                object.update();
            })
        })
    
    if (tick % spawnInterval == 0){
        spawnRandomParticle()
    }

    if (tick % gravityInterval == 0){
        changeGravity();
    } else if (tick > 1000000) tick = 0

    tick ++;
}

// World object functions

function spawnPlatform(x, y, w, h){
    let p = new Platform(x, y, w, h);
    World.add(engine.world, p.body);
    platforms.push(p);
    return p;
}

function spawnParticle(x, y, type = ParticleTypes.Medium){

    if (x <= 10)         x = 15;
    if (x >= WIDTH - 10) x = WIDTH - 15 ;
    if (y <= 10)         y = 15;
    if (y >= HEIGHT - 10)y = HEIGHT - 15;
    
    let p = new Particle(x, y, type, Body);
    World.add(engine.world, p.body);
    particles.push(p);
    bodies.push(p.body)
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
    spawnCluster(rx, ry);
    // if (Math.random() > 0.1){
    // } else {
    //     spawnParticle(rx, ry, randomParticleType())
    // }
}

let clusterSizeCeiling = 2;
function spawnCluster(x, y){
    // const clusterSize = Math.floor(Math.random() * clusterSizeCeiling) + 1;
    const clusterSize = Math.floor(Math.random() * clusterSizeCeiling) + 1;
    const area = 40;
    let xDiff, yDiff;
    let type = randomParticleType();
    for (let i = 0; i < clusterSize; i++){
        xDiff = (Math.random() * area) - (area/2)
        yDiff = (Math.random() * area) - (area/2)
        type = nextParticleType(type)
        spawnParticle(x + xDiff, y + yDiff, type)
    }
}


// ------------------------------



// Force functions
function changeGravity(newGravity){
    if (newGravity){
        engine.world.gravity = newGravity;
    } else {
        const gravityFactor = 0.2
        const randomGravity = {
            x:((Math.random() * 2) - 1) * gravityFactor, 
            y: ((Math.random() * 2) - 1) * gravityFactor 
        }
        engine.world.gravity = randomGravity;
    }    
}

function applyForceToParticle(p){
    //console.log(p)
    if(p.lifespan % 3 >= 1.5){
        const gravityFactor = 3
        const force = {
            x:((Math.random() * 2) - 1) * gravityFactor,
            y: ((Math.random() * 2) - 1) * gravityFactor
        }
        Body.setVelocity(p.body, force)
    }
    // Body.applyForce(p.body, p.body.position, force)
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



