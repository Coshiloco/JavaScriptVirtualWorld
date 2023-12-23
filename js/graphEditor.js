class GraphEditor {

    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
        
        this.ctx = this.canvas.getContext("2d");
        
        // Para ver inicializamos si un punto esta seleccionado 
        this.selected = null;
        
        // Para ver inicializamos si un punto esta seleccionado sobre otro es decir que el que hemos pulsado ya estaba pintado
        this.hovered = null;
        
        // Para que cuando se deslice el raton haga drag and drop
        this.dragging = false;
        
        // Inicializamos el punto del raton
        this.mause = null;
        
        // Para lso eventos de escucha del raton se hace asi 
        this.#addEventListeners();
    }
    
    #addEventListeners() {
        /*En resumen, this.#handleMouseDown.bind(this) se utiliza para asegurar que, cuando #handleMouseDown se use como manejador de eventos, 
        pueda acceder y modificar las propiedades y métodos del objeto de la clase correctamente, manteniendo 
        el contexto deseado de this. Esto es una práctica común en JavaScript para manejar problemas de contexto, especialmente en clases y manejadores de eventos. */
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        // Para cuando se mueve el raton 
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));    
        // Para evitar que salaga el menu al pulsar el boton derecho del raton
        this.canvas.addEventListener("contextmenu", (evt) => {
            evt.preventDefault();
        });
        // Para cuando soltamos el click del raton capturamos ese evento y desactivamos el dragging
        this.canvas.addEventListener("mouseup", (evt) => {
            this.dragging = false;
        });
    }
    
    // Metodo privado para manejar el mausemove 
    
    #handleMouseMove(evt) {
        // Obtener la posicion del raton cuandp estas pulsando
        this.mause = new Point(evt.offsetX, evt.offsetY);
        // Para saber si el punto que hemos pulsado esta en el grafo
        this.hovered = getNearestPoint(this.mause, this.graph.points, 10);
        // Pillamos la posicion del dragging y si le pasamso las coordenadas del punto al punto que esta seleccionado
        if (this.dragging == true) {
            this.selected.x = this.mause.x;
            this.selected.y = this.mause.y;
        }
    }
    
    // Para optimizar el codigo vamos a crear un metodo privado que maneje el mouseDown y reducir el codigo
    #handleMouseDown(evt) {
        // El codigo asocido para el boton derecho del raton es el 2
        if (evt.button == 2) {
            // Mejorando la logica lo que vamos ha hacer es que si esta seleccionado lo que hacemos es que el ultimo punto marcado 
            // Se de seleccione poniendolo a null 
            if (this.selected) {
                // Lo deseleccionamos
                this.selected = null;
            } else if (this.hovered) {
                // Si estamos sobrevolando o encima de un punto lo borramos
                this.#removePoint(this.hovered);
            }
        }
        
        // La logica de aqui es para si pulsa el boton izquierdo del raton que es el comando 0
        
        if (evt.button == 0) {
            // Si efectivamente ya estaba pintado decimos que el seleccionado es el que hemos pulsado
            if (this.hovered) {
                //Lo que estamos haciendo aqui es conectar el punto que esta seleccionado con el que estamos posicionados en la misma posicion
                // De tal manera que si pulsamos en un punto que ya esta pintado se conecta con el punto que esta seleccionado
                this.#select(this.hovered);
                // Para cuando das click al siguiente punto que se active el drag and drop
                this.dragging = true;
                return;
            }
            // Una vez tenemos la poscion del raton ya generamso el nuevo punto y lo dibujamos
            this.graph.addPoint(this.mause);
            // Para añadir un segmento de manera dinamica entre dos puntos necesitamos conocer dos cosas primero el que esta seleccionado y el anterior al seleccionado
            // Reprensetando el mause como al posicion de nuestro raton formada por las coordenadas x e y y el seleccionado como el previo a ese
            this.#select(this.mause);
            // Funcino que implementa el seleccionar un punto
            // Para que desaparezca el punto de hovered tambien y visualmente quede mejor
            this.hovered = this.mause;
        }
    }
    
    // Para optimizar y evitar la duplicacion de codigo vamos a crear un metodo privado que se encargue de seleccionar un punto
    #select(point) {
            if (this.selected) {
                this.graph.tryAddSegment(new Segment(this.selected, this.hovered));    
            }
            this.selected = point;
    }
    
    // Meotdo privado que resetee tanto el hovered como el seleccionado una vez se borra
    #removePoint(point) {
        //Borramos el punto y resetamos el seleccionado y el hover
        this.graph.removePoint(point);
        // Si el punto que hemos borrado es el seleccionado lo resetamos
        if (this.selected == point) {
            this.selected = null;
        }
        this.hovered = null;
    }    
    
    display() {
        this.graph.draw(this.ctx);
        // Si esta un punto seleccioando lo dibujamos pero con propiedades diferentes
        if (this.hovered) {
            // Lo dibujamos con el contorno para saber cual es el punto mas cercano lo rellenamos
            this.hovered.draw(this.ctx, {fill: true});
        }
        if (this.selected) {
            // Dibujamos el segmento si se une lo dibujemos 
            /**
             * El término "intent" en este contexto parece referirse a la "intención" o el "objetivo" de la acción de dibujo. 
            Si el cursor está sobre un punto existente (this.hovered), el intento es dibujar un segmento desde el punto seleccionado hasta este punto sobrevolado. 
            Si el cursor no está sobre un punto existente, 
            el intento cambia a dibujar un segmento desde el punto seleccionado hasta donde se encuentra actualmente el ratón. 
            Esto proporciona una retroalimentación visual inmediata al usuario sobre dónde se colocará 
            el segmento si decide conectar el punto seleccionado con su ubicación actual.
             */
            const intent = this.hovered ? this.hovered : this.mause;
            // Lo dibujamos hipoteticamente al punto al que estaria unido
            
            /**
                Lo que significa al linea de dash es la siguiente 
                
                El uso de un patrón de línea discontinua proporciona una clara indicación de que esta línea es temporal o hipotética,
                diferenciándola de otros elementos más permanentes en el lienzo. 
                Esta técnica es común en interfaces gráficas donde se requiere dar retroalimentación visual al usuario durante acciones como 
                trazar, conectar puntos, o previsualizar movimientos.
            */
            new Segment(this.selected, intent).draw(this.ctx, { dash: [3,3] });
            // Lo dibujamos con el contorno
            this.selected.draw(this.ctx, {outline: true});
        }
    }
    
    
    
}