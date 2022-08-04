/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
 export function sortStrings(arr, param = 'asc') {
    const newArr = [...arr];

    const sorted = (a, b) => a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper', sensitivity: 'case'});

    return newArr.sort( (a, b) => param === 'asc' ? sorted(a, b) : sorted(b, a) );
}