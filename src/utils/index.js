function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor(first, second) {
  return [
    getRandomNumber(first[0], second[0]),
    getRandomNumber(first[1], second[1]),
    getRandomNumber(first[2], second[2])
  ];
}

/**
 * Accepts a triplet array and returns array of halfway points
 * @param {array} first
 * @param {array} second
 */
// function combineTwoColors(first, second) {
//   return [
//     (first[0] + second[0]) / 2,
//     (first[1] + second[1]) / 2,
//     (first[2] + second[2]) / 2
//   ];
// }

export { getRandomInt, getRandomColor };
