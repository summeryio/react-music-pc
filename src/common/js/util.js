/**
 * 
 * @param {要拆分的数组} arr 
 * @param {拆分的数组中length} len 
 */
export function splitArray(arr, len) {
    let result = []

    for (let i = 0; i < arr.length; i += len) {
        result.push(arr.slice(i, i + len))
    }

    return result
}