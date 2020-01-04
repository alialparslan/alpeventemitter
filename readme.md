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
let instance = new Hello();
instance.on("emits", (message,event) => {console.log(message);});
let callback = function(message){
	console.log("I receive everything:", message);
}
instance.on(callback);
setTimeout( () => {
	callback.off(); // This cb function will be deregistered.
	// Note that if you registerd same callback to another emitter it will also deregister it.
	//If you are calling off on a callback, never register it to another alpeventemitter instance, there are multiple scenerios how things may go wrong.
},1300);
```