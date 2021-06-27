const supportTypes = ['number', 'boolean', 'string', 'null', 'object']

/**
 * 实现JSON.stringify
 * @param {*} obj 
 */
function stringify(obj) {
    const type = typeof obj;
    if (!supportTypes.includes(type)) return undefined;
    if (type === 'string') return `\"${obj}\"`;
    if (type !== 'object' || obj === null) return `${obj}`;
    if (Array.isArray(obj)) {
        const arr = obj.map((val) => supportTypes.includes(typeof val) ? stringify(val) : 'null')
        return `[${arr.toString()}]`
    }
    const res = []
    for (const key in obj) {
        const valueType = typeof obj[key];
        if (!supportTypes.includes(valueType)) continue;
        res.push(`"${key}":${stringify(obj[key])}`)
    }
    return `{${res.join(',')}}`
}

/**
 * 实现JSON.parse
 * @param {s} string 
 */
function parse(string) {
    const fn = new Function(`return ${string}`);
    return fn();
}

module.exports = {
    stringify,
    parse
}