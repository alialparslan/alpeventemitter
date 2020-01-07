const EventEmitter = require('./index');

function dumpState(e){
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
    let node = e.runInAnyEvent;
    console.log("Global:" + (node.lastNode ? ' (lastNode id:'+node.lastNode.id+')' : ''))
    while(node){
        let prevID = node.prev ? node.prev.id : '-';
        let nextID = node.next ? node.next.id : '-';
        console.log(`  id:${node.id}, prev:${prevID}, next:${nextID}`);
        node = node.next;
    }
    console.log()
    Object.keys(e.runByEvent).forEach( event => {
        let node = e.runByEvent[event];
        console.log("For event:"+event + (node.lastNode ? ' (lastNode id:'+node.lastNode.id+')' : ''))
        while(node){
            let prevID = node.prev ? node.prev.id : '-';
            let nextID = node.next ? node.next.id : '-';
            console.log(`  id:${node.id}, prev:${prevID}, next:${nextID}`);
            node = node.next
        }
    });
    console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
    console.log()
}

const tests = {};

tests.test1 = function(e){
    let testStr = '';
    !e && (e = new EventEmitter());
    let ons = []
    ons.push(e.on('a', () => { testStr += 'a'}))
    ons.push(e.on(['a'], () => {testStr += '_a'}))
    ons.push(e.on(['b'], () => {testStr += 'b'}))
    ons.push(e.on('b', () => {testStr += '_b'}))
    e.emit('a');
    e.emit('b');
    ons.forEach(o => o());
    return testStr == 'a_ab_b';
}

tests.test2 = function(){
    e = new EventEmitter();
    if(!this.test1(e)) return false;
    if(!this.test1(e)) return false;
    if(!this.test1(e)) return false;
    return true;
}

tests.test3 = function(){
    let testStr = ''
    e = new EventEmitter();
    e.once("a", (data, event) => {testStr += data+event})
    e.emit('a',1)
    e.emit('a',2)
    e.emit('a',3)
    if(testStr != '1a') return false
    return true
}

Object.keys(tests).forEach( test => {
    let failed = 0;
    let passed = 0;
    if(tests[test]()){
        passed++;
        console.log(test, "passed.");
    }else{
        failed++;
        console.log(test, "failed!");
    }
})
