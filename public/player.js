function Player(context, x, y) {
    this.playersize = 20;
    this.context = context;
    this.body = Bodies.rectangle(x, y, this.playersize, this.playersize);
}

Player.prototype.show = function(){
    const pos = this.body.position;
    this.context.fillRect(pos.x, pos.y, this.playersize, this.playersize);
}