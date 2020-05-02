(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('прошла 1 секунда');
})();

const unused = 2323;

console.log(unused);

class Util {
    static id = Date.now()
}

console.log('Util id', Util.id);

import('lodash').then(() => {
    console.log(_.random(0, 42, true));
})