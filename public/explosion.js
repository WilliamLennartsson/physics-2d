function Explosion(x, y, maxR, context, color){
    this.alpha = 0.3
    this.color = color ? color : `rgba(${200}, ${140}, ${130}, ${this.alpha})`
    this.x = x;
    this.y = y;
    this.lifespan = 20;
    this.radius = maxR;
    this.maxRadius = maxR;
    this.isDead = false;
    this.context = context;
    this.spawnSize = 5
}

Explosion.prototype.show = function(){
    if (this.radius < 0) return
    const context = this.context
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

Explosion.prototype.update = function(){
    this.lifespan -= 1;
    if (this.lifespan <= 0){
        this.isDead = true;
    } else {
        this.radius -= this.maxRadius / this.lifespan - 2
    }
    // this.radius = this.maxRadius - (this.lifespan / 2) + this.spawnSize
}
