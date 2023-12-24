class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        
        /*Aquí, se inicializa la propiedad zoom de la clase con un valor de 1. 
        En gráficos y visualización, el zoom se utiliza para acercar o alejar la vista. 
        Un valor de zoom de 1 generalmente significa una visualización a escala 1:1, sin acercamiento ni alejamiento. */
        this.zoom = 1;
        
        // Tomamos el punto del centro de lo que es el canvas
        this.center = new Point(this.canvas.width / 2, this.canvas.height / 2);
        
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
    
    // Para que se perciba el movimiento cuando estas haciendo el drag and drop con el raton
    getOffset() {
        return add(this.offset, this.drag.offset);
    }
    
    
    #addEventListeners() {
        /*El evento que estás manejando en esa línea de código es mousewheel. 
        Este es un tipo de evento en 
        JavaScript que se dispara cuando el usuario gira la rueda del ratón (mouse wheel) sobre un elemento, en este caso, sobre el lienzo (canvas). */
        this.canvas.addEventListener("mousewheel", this.#handleMouseWheel.bind(this));
        // Evento que escucha el botn del medio del raton
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        // Escuchamos el movimiento del raton
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        //se desencadena cuando un usuario suelta un botón del ratón después de haberlo presionado.
        this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
    }
    
    
    #handleMouseDown(evt) {
        // Para cuando pulsemos el boton del medio del raton el comando es 1
        if (evt.button == 1) {
            // La posicion de inicio es en la que en encuentra el raton
            this.drag.start = this.getMouse(evt);
            // Activamos el drag con la flag que hemos creado
            this.drag.active = true;  
        }
    }
    
    #handleMouseMove(evt) {
        // si esta activo el drag la posicion final tambien sera al del raton que es a donde nos dirgimos
        if (this.drag.active) {
            // La posicion final es la del raton
            this.drag.end = this.getMouse(evt);
            // Calculamos la distancia entre el punto de inicio y el final
            this.drag.offset = subtract(this.drag.end, this.drag.start);
            /*this.drag.offset = subtract(this.drag.end, this.drag.start);
            Aquí, se calcula la distancia de arrastre (drag offset) 
            como la diferencia entre la posición final del cursor (this.drag.end) y la posición inicial (this.drag.start).
            Esto se hace utilizando una función subtract que toma dos puntos y devuelve un nuevo punto que representa la diferencia vectorial entre ellos. */
        }
    }
    
    #handleMouseUp(evt) {
        // Si esta activo el drag and drop
        if (this.drag.active) {
            /*if (this.drag.active) { this.offset = add(this.offset, this.drag.offset); ... }
            Dentro de una condición que verifica si el arrastre está activo (this.drag.active), 
            se actualiza el offset global del objeto. Este offset se ajusta sumando el desplazamiento de arrastre al offset existente.
            La función add toma dos puntos y devuelve un nuevo punto que es la suma vectorial de ambos, 
            esencialmente actualizando la posición del contenido que se está arrastrando. */
            this.offset = add(this.offset, this.drag.offset);
            // Reseteamos el drag a como estaba como valor inicial
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            };
        }
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