class graphEditor{
    constructor(myCanvas,graph){

        this.canvas=myCanvas
        this.graph=graph
        this.ctx=this.canvas.getContext('2d')
        
        this.selected=null
        this.hovered=null

        this.dragging =false
        this.mouse=null

        this.#addEventListeners();

    }
    #addEventListeners(){
        
        this.canvas.addEventListener("mousedown",this.#handleMouseDown.bind(this))
        this.canvas.addEventListener("mousemove",this.#handleMouseMove.bind(this))
        this.canvas.addEventListener('contextmenu',(evt)=>{evt.preventDefault()})
        this.canvas.addEventListener('mouseup',(evt)=>{this.dragging=false})
        
    }
    #handleMouseDown(evt){
        if(evt.button==2){//right click
            console.log(this.hovered)
            
            if(!this.hovered){
                this.selected=null
            }
            else{
                if(this.selected){
                    this.selected=null
                }
                else{
                    this.#removePoint(this.hovered)
                }

            }
        }
        if(evt.button==0){//left click
            
        
            

            // this.hovered=getNearestPoint(mouse,this.graph.points,20)//we actually dont need this because hovered is assigned in mousemove event

            if(this.hovered){
                this.#select(this.hovered)
                this.dragging=true
                
                
                return
            }
            
            
            this.graph.addPoint(this.mouse)
            console.log(`added point ${this.mouse.x} and ${this.mouse.y}`);
            this.#select(this.mouse)
            this.hovered=this.mouse 
        }
    }

    #handleMouseMove(evt){
        this.mouse=new Point(evt.offsetX,evt.offsetY)
            if(this.dragging){
                
                this.selected.x=this.mouse.x
                this.selected.y=this.mouse.y
            }
            this.hovered=getNearestPoint(this.mouse,this.graph.points,20)
    }

    #removePoint(point){
        this.graph.removePoint(point)

        this.hovered=null
        if(this.selected==point){
            this.selected=null
        }
    }

    #select(point){
        if(this.selected){
            this.graph.tryAddSegment(new Segment(point,this.selected))
        }
        
        this.selected=point
    }
    display(){
        this.graph.draw(this.ctx)
        if(this.hovered){
            
            this.hovered.draw(this.ctx,{fill:true})
        }
        if(this.selected){
            const intent=this.hovered?this.hovered:this.mouse
            new Segment(this.selected,intent).draw(ctx)
            this.selected.draw(this.ctx,{outline:true})
        }
    }
}