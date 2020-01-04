module.exports = class{
    // Event parentEmitter is provided than every event will be also emitted to parentEmitter
    constructor(parentEmitter){
        if(parentEmitter && !parentEmitter.emit) throw "parentEmitter has to be an EventEmitter";
        this.parentEmitter = parentEmitter;
        this.events = {};
        this.globals = [];
    }

    // If second parameter is not given first one has to be callback and it will run on any event.
    // If event parameter is an array then it will add cb to all members of array
    on(event, cb){
        if(!cb){
            cb = event;
            event = false;
        }
        cb.____emit = true;
        cb.off = function(){this.____emit = false;};
        if(!event) this.globals.push(cb);
        if(Array.isArray(event)){
            event.forEach( e => {
                if(!this.events[e]) this.events[e] = [];
                this.events[e].push(cb);
            });
        }else{
            if(!this.events[event]) this.events[event] = [];
            this.events[event].push(cb);
        }
    }

    emit(event, data){
        this.parentEmitter && this.parentEmitter.emit(event, data)
        let cbs = this.events[event]
        if(cbs){
            cbs.forEach( (cb,i) => {
                if(!cb.____emit){
                    cbs.splice(i, 1);
                    return;
                }
                cb(data, event);
            })
        }
        this.globals.forEach( (cb,i) => {
            if(!cb.____emit){
                this.globals.splice(i, 1);
                return;
            }
            cb(data, event);
        });
    }
}