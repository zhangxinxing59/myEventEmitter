// 实现on和emit方法
// 补充once和off方法
// 创建对象
let eventEmitter = {
    list = {},
    on(event, fn) {
        let _this = this
        (_this.list[event] || (_this.list[event] = [])).push(fn)
        return _this
    },

    once(event, fn) {
        let _this = this
        function on() {
            _this.off(event, on)
            fn.apply(_this, arguments)
        }
        on.fn = fn
        _this.on(event, on)
        return _this
    },

    off(event, fn) {
        let _this = this
        let fns = _this.list[event]
        if(!fns) return false
        if(!fn) {
            fns && (fns.length = 0)
        } else {
            let cb
            for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
                cd = fns[i]
                if(cb === fn || cb.fn === fn) {
                    fns.splice(i, 1)
                    break
                }
            }
        }
        return _this
    },

    emit () {
        let _this = this
        // 第一个参数是对应的event值，直接用数组的shift方法取出
        let event = [].shift.call(arguments),
            fns = [..._this.list[event]]
        if(!fns || fns.length === 0) {
            return false
        }
        // 遍历event值对应的缓存列表，依次执行fn
        fns.forEach(fn => {
            fn.apply(_this, arguments)
        })
        return _this
    },

}


function user1 (content) {
    console.log('用户1订阅了:', content);
}

function user2 (content) {
    console.log('用户2订阅了:', content);
}

function user3 (content) {
    console.log('用户3订阅了:', content);
}

function user4 (content) {
    console.log('用户4订阅了:', content);
}

// 订阅
eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

// 取消user2方法的订阅
eventEmitter.off('article1', user2);

eventEmitter.once('article2', user4)

// 发布
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');

// eventEmitter.on('article1', user3).emit('article1', 'test111');

/*
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户4订阅了: Javascript 观察者模式
*/
