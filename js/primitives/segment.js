class Segment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
    
    equals(seg) {
        return this.includes(seg.p1) && this.includes(seg.p2);
    }
    
    // Metodo que ayudan porque dos puntos son iguales si tan soo uno de los dos puntos de dos segmentos ya es igual con lo cual para que ayude
    includes(point) {
        return this.p1.equals(point) || this.p2.equals(point);
    }
    
    draw(ctx, {width = 2 ,  color = "white", dash = [] } = {}) {
        //Inicia una nueva ruta o resetea la ruta actual para empezar a dibujar en el lienzo.
        ctx.beginPath();
        // Establece el ancho de la línea del segmento.
        ctx.lineWidth = width;
        //Establece el color de la línea.
        ctx.strokeStyle = color;
        ctx.setLineDash(dash);
        //Mueve el lápiz al primer punto extremo del segmento (p1) sin dibujar nada.
        ctx.moveTo(this.p1.x, this.p1.y);
        // Dibuja una línea desde el primer punto extremo (p1) hasta el segundo punto extremo (p2).
        ctx.lineTo(this.p2.x, this.p2.y);
        // Aplica el trazo, efectivamente dibujando la línea en el lienzo.
        ctx.stroke();
        ctx.setLineDash([]);
    }
}