/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const arr = path.split('.');

    return (obj) => {
        let newObj = obj;

        for (let fild of arr) {
            if (typeof newObj[fild] === 'object') {
                newObj = newObj[fild];
            } else {
                return newObj[fild] ?? undefined;
            };
        };
    };
}
const product = {
    category: {
      title: "Goods"
    }
}
  
const getter = createGetter('category.title');
  
console.log(getter(product));