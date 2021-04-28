// 实现on和emit方法
// 创建对象
let eventEmitter = {}

// 缓存列表，存放event和fn
eventEmitter.list = {}

// 订阅
eventEmitter.on = function (event, fn) {
    let _this = this
    (_this.list[event] || (_this.list[event] = [])).push(fn)
}

eventEmitter.emit = function () {
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
}

function user1(content) {
    console.log("用户1订阅了：", content)
}

function user2(content) {
    console.log("用户2订阅了：", content)
}

// 订阅
eventEmitter.on("article", user1)
eventEmitter.on("article", user2)

eventEmitter.emit("article", "Javascript 发布-订阅模式")
