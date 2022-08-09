/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    if (arguments.length === 0) return undefined;

    const result = Object.fromEntries(Object.entries(obj).map(item => item.reverse()));

    return result;
}
