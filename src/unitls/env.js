export const getEnv = (key) => {
    const value = import.meta.env[key]
    if (!value) {
        throw new Error(`环境变量 ${key} 未定义`)
    }
    return value
}