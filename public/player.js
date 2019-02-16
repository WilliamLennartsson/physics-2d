function Player(context, x, y) {
    this.playersize = 20;
    this.context = context;
    this.body = Bodies.rectangle(x, y, this.playersize, this.playersize);
    this.isDead = false;
}

Player.prototype.update = function(){
    return false;
}

Player.prototype.show = function(){
    const pos = this.body.position;
    this.context.fillRect(pos.x, pos.y, this.playersize, this.playersize);
}