/**
 * 基于 Promise 实现的 nextTick 函数
 * @param {Function} callback - 待异步执行的回调函数
 * @returns {Promise} 返回一个 Promise（可选）
 */
export function nextTick(callback?: () => void): Promise<void> {
    // 创建一个立即 resolved 的 Promise
    const p = Promise.resolve();

    // 返回一个新的 Promise，用于包裹回调执行
    return new Promise<void>((resolve) => {
        // 将回调放入微任务队列
        p.then(() => {
            if (typeof callback === 'function') {
                callback();
            }
            resolve(); // 回调执行完毕后 resolve
        });
    });
}