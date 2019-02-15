function Particle(context, x, y, r){
    this.body = Bodies.circle(x, y, r);
    this.context = context;
}

Particle.prototype.update = function(){
    if (this.body.speed < 0.3){
        return true;
    } 
    return false;
}

Particle.prototype.show = function(){
    const pos = this.body.position;
    this.context.beginPath();
    this.context.arc(pos.x, pos.y, this.body.circleRadius, 0, 2 * Math.PI);
    this.context.stroke();
}
