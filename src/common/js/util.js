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

export function formatDate(timestamp) {
    let ts = timestamp || new Date().getTime()
    let month = new Date(ts).getMonth() + 1 > 9 ? new Date(ts).getMonth() + 1 : '0' + new Date(ts).getMonth() + 1
    let day = new Date(ts).getDate() > 9 ? new Date(ts).getDate() : '0' + new Date(ts).getDate()

    return month + '月' + day + '日'
}