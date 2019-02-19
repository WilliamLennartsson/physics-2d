
function Particle(x, y, type = ParticleTypes.Medium, Body){
    this.Body = Body;
    this.lifespan = type.lifespan;
    this.isDead = false;
    this.splitIndex = 1;
    this.type = type
    this.body = Bodies.circle(x, y, type.size);
    this.id = this.body.id
    this.wasSplit = false;
    this.wasHitByPlayer = false;
    this.wasMutated = Math.random() > 0.7 ? true : false
    this.mutationDuration = 120;
    // const r = Math.floor(Math.random() * 255);
    // const g = Math.floor(Math.random() * 255);
    // const b = Math.floor(Math.random() * 255);
    // const colorValue = `rgb(${r}, ${g}, ${b})`
}

Particle.prototype.update = function(){
    if (this.lifespan <= 0 && !this.isMutating){
        if(this.type == ParticleTypes.Small){
            if(this.wasMutated){
                this.wasMutated = false;
                this.isMutating = true;
                return;
            } else if (this.body.circleRadius <= 1.3){
                this.isDead = true;
            }
            this.body.circleRadius -= 0.6;

        } else {
            this.lifespan = this.type.lifespan
            this.wasSplit = true;
        }
    } else {
        this.lifespan -= 0.3;
        this.body.circleRadius += 0.05
    }
}

Particle.prototype.show = function(context){
    const pos = this.body.position;
    const type = this.type    
    
    context.beginPath();
    context.arc(pos.x, pos.y, this.body.circleRadius, 0, 2 * Math.PI);
    context.closePath();
    context.lineWidth = type.lineWidth;
    context.fillStyle = type.innerColor;
    context.strokeStyle = type.color;
    context.stroke();
    context.fill();
    if(this.isMutating){
        if(this.mutationDuration <= 0){
            this.mutate();
            this.isMutating = false;
        } else {
            this.spark(context,pos, type);
        }
        this.mutationDuration --;
    }
}

Particle.prototype.mutate = function(){
    this.type = ParticleTypes.Danger
    Body.set(this.body, {circleRadius: this.type.size })
    this.lifespan = this.type.lifespan
}

Particle.prototype.getRGBA = function(){
    const color = this.type.color;
    return `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`
}

Particle.prototype.spark = function(context, pos, type){
    context.fillStyle = "rgba(255, 0, 0, 0.3)"
    for(let i = 0; i < 3; i++){
        const x = pos.x + (Math.random() * type.size) - type.size
        const y = pos.y + (Math.random() * type.size) - type.size
        context.fillRect(x, y, 10, 10)
    }

}

const ParticleTypes = Object.freeze({
    Small: {
        name: "SMALL",
        size: 12,
        lifespan: 43,
        color: `rgb(${248}, ${169}, ${120})`,
        innerColor:  `rgba(${248}, ${169}, ${120}, 0.5)`,
        lineWidth: 5,
    }, 
    Medium: {
        name: "MEDIUM",
        size: 20,
        lifespan: 35,
        color: `rgb(${220}, ${214}, ${140})`,
        innerColor: `rgba(${220}, ${214}, ${140}, 0.5)`,
        lineWidth: 7,
    },
    Large: {
        name: "LARGE",
        size: 32,
        lifespan: 50,
        color: `rgb(${164}, ${246}, ${165})`,
        innerColor: `rgba(${164}, ${246}, ${165}, 0.5)`,
        lineWidth: 10,
    },
    Danger: {
        name: "DANGER",
        size: 25,
        lifespan: 30,
        color: `rgb(${246}, ${135}, ${135})`,
        innerColor: `rgba(${246}, ${135}, ${135}, 0.5)`,
        lineWidth: 13,
    }
})

const smallRange = 45, // Ranges for generating random type 
    mediumRange = 60,
    largeRange = 75,
    dangerRange = 100;

function randomParticleType(){
    const floor = Math.floor(100); 
    const r = Math.random() * floor;
    if (r > 0 && r < smallRange){ 
        return ParticleTypes.Small
    } else if (r > smallRange && r < mediumRange){
        return ParticleTypes.Medium
    } if (r > mediumRange && r < largeRange){
        return ParticleTypes.Large
    } if (r > largeRange && r < dangerRange) {
        return ParticleTypes.Danger
    } else {
        return ParticleTypes.Danger
    }
}

function nextParticleType(type){
    const { Small, Medium, Large, Danger } = ParticleTypes
    switch(type){
        case Small: 
            return Small;
        case Medium:
            return Small;
        case Large:
            return Medium;
        case Danger:
            return Large;
        default:
            return Large;
    }
}