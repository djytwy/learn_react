const log_time = () => {
    return async (ctx,next) => {
        const start = Date.now()
        await next()
        const response_time = (Date.now() - start)
        console.log(`响应时间：${response_time / 1000} s`)
    }
}

module.exports = log_time