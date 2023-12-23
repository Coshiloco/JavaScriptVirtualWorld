class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    equals(point) {
        return this.x == point.x && this.y == point.y;
    }
    
    draw(ctx, {size = 18, color = "black", outline = false, fill = false} = {}) {
    
        // Calculamos el radio 
        const rad = size / 2;
        // inicia una nueva ruta o resetea la actual para comenzar a dibujar en el lienzo.
        ctx.beginPath();
        // establece el color del relleno para el punto
        ctx.fillStyle = color;
        // crea un arco/círculo. Los parámetros son: x, y, radio, angulo inicial, angulo final( Para crear el circulo completo es decir desde el 0 hasta hacer la circunferencia completa)
        ctx.arc(this.x, this.y, rad, 0, 2 * Math.PI);
        // rellena el círculo con el color especificado.
        ctx.fill();
        
        if (outline) {
            // inicia una nueva ruta o resetea la actual para comenzar a dibujar en el lienzo.
            ctx.beginPath();
            // establece el grosor del contorno para el punto
            ctx.lineWidth = 2;
            // establece el color del contorno para el punto
            ctx.strokeStyle = "yellow";
            // crea un arco/círculo. Los parámetros son: x, y, radio, angulo inicial, angulo final( Para crear el circulo completo es decir desde el 0 hasta hacer la circunferencia completa)
            ctx.arc(this.x, this.y, rad * 0.6, 0, 2 * Math.PI);
            // Lo añadimos un super borde amarillo
            ctx.stroke();
        }
        // Para cuando estamos con el threshold es decir no se pued eponer el punto debido a la distancia limite
        if (fill) {
            console.log("Entra por aqui");
            // inicia una nueva ruta o resetea la actual para comenzar a dibujar en el lienzo.
            ctx.beginPath();
            // crea un arco/círculo. Los parámetros son: x, y, radio, angulo inicial, angulo final( Para crear el circulo completo es decir desde el 0 hasta hacer la circunferencia completa)
            ctx.arc(this.x, this.y, rad * 0.4, 0, 2 * Math.PI);
            // establece el color del contorno para el punto
            ctx.fillStyle = "yellow";
            // Lo rellenamos
            ctx.fill();
        }
        
    }
}