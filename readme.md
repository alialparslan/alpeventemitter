# AlpEventEmitter

**A simple and lightweight implementation of event emitter with limited functionality.**

	npm i alpeventemitter


```javascript
const EventEmitter = require('alpeventemitter');

class Hello extends EventEmitter{
	constructor(){
		super();
		setInterval(this.emitSomething.bind(this), 500);
	}
	emitSomething(){
		this.emit("says", "Hello!");
		this.emit("emits", "Something");
	}
}
let emitter = new Hello();
emitter.on("emits", (message,event) => {console.log(message);});
let callback = function(message){
	console.log("Nobody stops me:", message);
}
let funcToRemove = emitter.on(callback);

// When says event emitted callback will be removed from all events.
emitter.once(["says","emits"], message => {console.log("Once: "+message)})

// Those are also same since there is only those two events.
emitter.once(["emits","says"], message => {console.log("Once the third: "+message)})
emitter.once(message => {console.log("Once the second: "+message)})


setTimeout( () => {
    funcToRemove();
},1300);
```