function Platform(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w*2, h*2);
    this.body.isStatic = true;
    this.isDead = false;
}

Platform.prototype.update = function(){
}

Platform.prototype.show = function(context){
    const pos = this.body.position;
    context.fillStyle = "#f3d34d";
    context.fillRect(pos.x, pos.y, this.w, this.h);
}