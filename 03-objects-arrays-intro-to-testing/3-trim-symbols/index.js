/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    let newStr = '';
    let promStr = string[0];

    for (let i = 1; i <= string.length; i++) {
        if(string[i] === promStr[promStr.length - 1]) {
            promStr += string[i];
            console.log(promStr)
        } else {
            newStr += promStr.slice(0, size);
            promStr = string[i]
        }
    }

    return newStr;
}
