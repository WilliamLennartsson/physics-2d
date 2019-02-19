function getCirclePoints(pos, r, Vector){
    // console.log( "point",pos)
    const vert = [];
    var step = 2 * Math.PI / 7;
    for(var i = 0; i < 2*Math.PI; i += step){
        var x = pos.x + r * Math.cos(i);
        var y = pos.y - r * Math.sin(i);  
        const newV = Vector.create(x, y)
        vert.push(newV)
    }
    return vert;    
}
