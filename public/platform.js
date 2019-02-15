function Platform(context, x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, w*2, h*2);
    this.body.isStatic = true;
    this.context = context;
}

Platform.prototype.show = function(){
    const pos = this.body.position;
    this.context.fillRect(pos.x, pos.y, this.w, this.h);
}