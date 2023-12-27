class Graph{
    constructor(points=[],segments=[]){
        this.points=points
        this.segments=segments
    }

    addPoint(point){
        this.points.push(point)
    }
    containsPoint(point){
        return this.points.find((p)=>{p.equals(point)})
    }
    tryAddPoint(point){
        if(!this.containsPoint(point)){
            this.addPoint(point)
            return true
        }
        return false
    }
    removePoint(point){
        const segs=this.getSegmentswithPoint(point)
        for(const seg of segs){
            this.removeSegment(seg)
        }
        this.points.splice(this.points.indexOf(point),1)
        
    }

    addSegment(seg){
        this.segments.push(seg)
    }
    containsSegment(seg){
        this.segments.find((s)=>{return s.equals(seg)})
    }
    tryAddSegment(seg){
        if(!this.containsSegment(seg)){
            this.addSegment(seg)
            return true
        }
        return false
    }
    getSegmentswithPoint(point){
        const segs=[]
        console.log(this.segments);
        for(const seg of this.segments){
            if(seg.includes(point)){
                console.log(seg);
                segs.push(seg)
            }
        }
        console.log(segs)
        return segs
    }
    removeSegment(seg){
        this.segments.splice(this.segments.indexOf(seg),1)
    }

    dispose(){
        this.segments.length=0
        this.points.length=0
    }

    draw(ctx){
        for(const point of this.points){
            point.draw(ctx)
        }
        for(const seg of this.segments){
            seg.draw(ctx)
        }
    }

}