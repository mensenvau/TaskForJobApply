function RandomValue() {
    return Math.random().toString() + new Date().getTime().toString() + Math.random().toString();
}

module.exports = RandomValue