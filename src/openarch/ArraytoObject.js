Array.prototype.toObject = function (key, val) {
    const r = {};
    this.forEach(function (o) {
        r[key(o)] = val(o);
    });
    return r;
}
