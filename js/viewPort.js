class viewPort{
    constructor(canvas){
        this.canvas=canvas
        this.ctx=canvas.getContext('2d')
        this.#addEventListeners()
    }

    #addEventListeners(){
        this.canvas.addEventListener("mousewheel",this.#handleMouseWheel.bind(this))
    }


    #handleMouseWheel(evt){
        console.log(evt.deltaY)
    }
}