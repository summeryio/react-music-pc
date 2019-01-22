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

// 格式化时间戳成 年-月-日
export function formatDateYMD(timestamp) {
    let ts = timestamp || new Date().getTime()
    let year = new Date(ts).getFullYear()
    let month = new Date(ts).getMonth() + 1 > 9 ? new Date(ts).getMonth() + 1 : '0' + (new Date(ts).getMonth() + 1)
    let day = new Date(ts).getDate() > 9 ? new Date(ts).getDate() : '0' + new Date(ts).getDate()

    return year + '-' + month + '-' + day
}

// 格式化时间戳成 月-日
export function formatDate(timestamp) {
    let ts = timestamp || new Date().getTime()
    let month = new Date(ts).getMonth() + 1 > 9 ? new Date(ts).getMonth() + 1 : '0' + (new Date(ts).getMonth() + 1)
    let day = new Date(ts).getDate() > 9 ? new Date(ts).getDate() : '0' + new Date(ts).getDate()

    return month + '月' + day + '日'
}

// 格式化时间戳成 时-分
export function formatDateHM(timestamp) {
    let ts = timestamp
    let min = new Date(ts).getMinutes() > 9 ? new Date(ts).getMinutes() : '0' + (new Date(ts).getMinutes())
    let sed = new Date(ts).getSeconds() > 9 ? new Date(ts).getSeconds() : '0' + new Date(ts).getSeconds()

    return min + ':' + sed
}

/**
 * 格式化评论日期
 * @param {时间戳} ts 
 */
export function formatCommentDate(ts) {
    let getDate = new Date(ts)
    let year = getDate.getFullYear()
    let month = getDate.getMonth() + 1
    let day = getDate.getDate()
    let hour = getDate.getHours() > 9 ? getDate.getHours() : '0' + getDate.getHours()
    let min = getDate.getMinutes() > 9 ? getDate.getMinutes() : '0' + getDate.getMinutes()
    
    if (isThisYear(ts)) { // 今年
        if (isYestday(ts) || isToday(ts)) { // 今天||昨天
            if (isYestday(ts)) { // 昨天
                return '昨天' + hour + ':' + min
            } else { // 今天
                if (isHour(ts)) { // 一小时内
                    if (isMinute(ts)) { // 一分钟内
                        return '刚刚'
                    } else {
                        let minLeft = new Date(new Date().getTime() - ts).getMinutes()
                        
                        return minLeft + '分钟前'
                    }
                } else {
                    return hour + ':' + min
                }
            }
        } else {
            return month + '月' + day + '日' + hour + ':' + min
        }
    } else {
        return year + '年' + month + '月' + day + '日'
    }

    function isThisYear(timestamp) {
        return new Date(timestamp).getFullYear() === new Date().getFullYear()
    }
    
    function isYestday(timestamp) {
        let nowDate = new Date()
        let todayTamp = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime()
        let yestdayTamp = new Date(todayTamp - 24*3600*1000).getTime();
    
        return timestamp < todayTamp && yestdayTamp <= timestamp
    }
    
    function isToday(timestamp) {
        let nowDate = new Date()
        let todayTamp = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()).getTime()
        let nowTamp = new Date().getTime()
    
        return timestamp >= todayTamp && timestamp < nowTamp
    }
    
    function isHour(timestamp) {
        let nowTamp = new Date().getTime()
    
        return nowTamp - timestamp < 3600000
    }
    
    function isMinute(timestamp) {
        let nowTamp = new Date().getTime()
    
        return nowTamp - timestamp < 60000
    }
}


// 将字符串中的换行符替换
export function formatStringLine(str) {
    return str.replace(/\n/g, '<br />')
}