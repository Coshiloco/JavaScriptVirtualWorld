class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        
        /*Aquí, se inicializa la propiedad zoom de la clase con un valor de 1. 
        En gráficos y visualización, el zoom se utiliza para acercar o alejar la vista. 
        Un valor de zoom de 1 generalmente significa una visualización a escala 1:1, sin acercamiento ni alejamiento. */
        this.zoom = 1;
        
        this.#addEventListeners();
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
        
        
        
        
        console.log(` el zom cuando entra al metodo es ${this.zoom}`);
    }
}