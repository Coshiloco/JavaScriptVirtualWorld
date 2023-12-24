class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        
        /*Aquí, se inicializa la propiedad zoom de la clase con un valor de 1. 
        En gráficos y visualización, el zoom se utiliza para acercar o alejar la vista. 
        Un valor de zoom de 1 generalmente significa una visualización a escala 1:1, sin acercamiento ni alejamiento. */
        this.zoom = 1;
        
        /*Definimos un offset para cuando pulsemos con la rueda del raton que depslazemos con un drag and drop 
        y el zoom s enos desplaze hacia donde nosotros queremos*/
        this.offset = new Point(0, 0);
        
        // Para hacer todos los calculos creamos un objeto que contenga el punto donde empieza , el punto donde termina ese drag es decir donde quieres parar de hacer zoom
        // la distancia que se calcula que es el offset y si esta activo o no 
        
        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        };
        
        this.#addEventListeners();
    }
    
    // Como al alejar el zoom se nos esta perdiendo la informacion del raton pro tanto el segmento se esta pintando mal
    getMouse(evt) {
        // Como hemos aplicado zoom los valores del mause cambian por lo tanto hay que ajustarlos
        return new Point(
            /*Este código es importante en aplicaciones donde el lienzo ha sido escalado para implementar funcionalidades de zoom. 
            Sin este ajuste, las acciones del usuario en el lienzo (como hacer clic en un punto para dibujar o seleccionar algo) 
            no se corresponderían con las coordenadas esperadas después del zoom. 
            Al multiplicar las coordenadas del evento por el factor de zoom, garantizas que las acciones del usuario se interpreten correctamente en el espacio transformado. */
            evt.offsetX * this.zoom,
            evt.offsetY * this.zoom
        );
    }
    
    #addEventListeners() {
        /*El evento que estás manejando en esa línea de código es mousewheel. 
        Este es un tipo de evento en 
        JavaScript que se dispara cuando el usuario gira la rueda del ratón (mouse wheel) sobre un elemento, en este caso, sobre el lienzo (canvas). */
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
    }
    
    #handleMouseWheel(evt) {
        
        /* Math.sign(evt.deltaY) se utiliza para determinar la dirección del giro de la rueda del ratón. 
        El método Math.sign() devuelve -1 si el número es negativo, 1 si es positivo, y 0 si es cero. */
        const dir = Math.sign(evt.deltaY);
        
        
        /*En resumen, este código ajusta el nivel de zoom en tu aplicación basándose en la interacción del usuario con la rueda del ratón. 
        Utiliza un paso de zoom (step) para controlar cuánto cambia el zoom con cada movimiento de la rueda 
        y restringe este valor a un rango específico para evitar que el zoom sea demasiado alto o demasiado bajo. 
        Estas son prácticas comunes en la implementación de funcionalidades de zoom en interfaces gráficas. */
        const step = 0.1;
        
        this.zoom += dir * step;
        
        this.zoom = Math.max(1, Math.min(5, this.zoom));
    }
}