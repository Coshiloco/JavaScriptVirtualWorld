// Funcion para obtener el punto mas cercano y que no lo puedas pintar 
function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
    // Claro establcemos la distancia minima el maximo entre el numero establecido n cualquiera y n que hemos establecido + 1
    /*Para calcular un valor minimo en un conjunto lo que estamos estableciendo es el numero mas grande 
    para asi reducirlo d emanera progresiva a medida que encuentras valores en el conjunto , asegurandote por otro lado 
    que va a entrar eb la primera iteracion del bucle*/
    let minDist = Number.MAX_SAFE_INTEGER;
    // Establecemos el punto que va a ser el mas cercano
    let nearest = null;
    for (const point of points) {
        // Calculos la distancia entre el punto y el punto que le pasamos
        /*La distancia euclidiana es un concepto matematico que se establce por medio del teorema de Pitagoras es el cual lo utilizamos para calcular la distancia
        entre dos puntos en un plano cartesiano bidimensional en este caso entre el punto actual (point) y la ubicacion dada (loc)*/
        const dist = distance(point, loc);
        // Si la distancia calculada es menor que la distancia minima significa que es el punto mas cercano
        /* En la primera iteravion para el algoritmo de bsuqueda ebntrara porque la distancia maxima siempre sera mayor en l primera vuelta que la diustancia calculada 
        con lo que una vez entrada establecemos el prinmer punto el mas cercano por lo tanto para ir reduciendo la busqueda establcemos 
        el valor de la distancia minima como ese punto con lo que el mas cercano a ese momento tambien asi de forma constante 
        reducimos los posibles valores cercanos del conjunto*/
        /*
        Esta lógica asegura que aunque un punto pueda ser el más cercano hasta el momento, 
        no se seleccionará si está más lejos que el límite establecido por threshold.
        */
        if (dist < minDist && dist < threshold) {
            minDist = dist;
            nearest = point;
        }
    }
    return nearest;
}

// FUncion para calcular la distancia entre dos puntos dados el punto puesto y el deseado
function distance(p1, p2) {
    // Calculo de la distancia en linea recta entre dos puntos 
    // Calculamos la distancia entre los dos puntos
    
    /*Partimso de la base que en un plano cartesiano con dos dimensiones x e y x siendo las ordenadas e y siendo las abcisas 
    podemos entablecer la distancia de esos dos puntos en linea recta como la hipotenusa del teorema de PItagoras de la la raiz de la suma 
    de sus cuadrados de los catetos de manera que de manera que es afuncion lo facilita */
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}