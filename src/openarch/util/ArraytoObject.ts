export { };

declare global {
  interface Array<T> {
    toObject<U>(key: (t: T) => string, val: (t: T) => U): { [s: string]: U };
  }
}

/* 
 * Maps an array to an object providing a mapping functions for keys and values.
 */
Array.prototype.toObject = function <T, U>(this: T[], key: (t: T) => string, val: (t: T) => U): { [s: string]: U } {
  const r: { [s: string]: U } = {};
  this.forEach(t => {
    r[key(t)] = val(t);
  });
  return r;
}
