function chunk(arr, size) {
  return Array.from({"length": Math.ceil(arr.length / size)}, (value, index) => arr.slice(index * size, index * size + size));
}

module.exports = {
  chunk
};

