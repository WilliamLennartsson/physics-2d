const ParticleTypes = Object.freeze({
    Small: {
        size: 10,
        lifespan: 50,
        color: `rgb(${248}, ${169}, ${120})`,
        innerColor:  `rgba(${248}, ${169}, ${120}, 0.5)`,
        lineWidth: 5,
    }, 
    Medium: {
        size: 15,
        lifespan: 30,
        color: `rgb(${220}, ${214}, ${140})`,
        innerColor: `rgba(${220}, ${214}, ${140}, 0.5)`,
        lineWidth: 7,
    },
    Large: {
        size: 25,
        lifespan: 30,
        color: `rgb(${164}, ${246}, ${165})`,
        innerColor: `rgba(${164}, ${246}, ${165}, 0.5)`,
        lineWidth: 10,
    },
    Danger: {
        size: 20,
        lifespan: 30,
        color: `rgb(${246}, ${135}, ${135})`,
        innerColor: `rgba(${246}, ${135}, ${135}, 0.5)`,
        lineWidth: 15,
    }
})


function Particle(context, x, y, type = ParticleTypes.Medium){

    this.body = Bodies.circle(x, y, type.size * 2);
    this.context = context;
    this.lifespan = type.lifespan;
    this.isDead = false;
    this.wasSplit = false;
    this.type = type

    // const r = Math.floor(Math.random() * 255);
    // const g = Math.floor(Math.random() * 255);
    // const b = Math.floor(Math.random() * 255);
    // const colorValue = `rgb(${r}, ${g}, ${b})`
}

Particle.prototype.update = function(){
    if (this.lifespan <= 0){
        this.body.circleRadius -= 0.3;
        if (this.body.circleRadius <= 1){
            this.isDead = true;
        }
    } else {
        this.lifespan -= 0.3;
    }
}

Particle.prototype.show = function(){
    const pos = this.body.position;
    const type = this.type
    const context = this.context;
    

    context.beginPath();
    context.arc(pos.x, pos.y, this.body.circleRadius, 0, 2 * Math.PI);
    context.closePath();
    context.lineWidth = type.lineWidth;
    context.fillStyle = type.innerColor;
    context.strokeStyle = type.color;
    context.stroke();
    context.fill();
}

Particle.prototype.getRGBA = function(){
    //console.log(this.type.color)
    const color = this.type.color;
    const newColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`
}