function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor(minMax) {
  return [
    getRandomNumber(minMax[0][0], minMax[0][1]),
    getRandomNumber(minMax[1][0], minMax[1][1]),
    getRandomNumber(minMax[2][0], minMax[2][1])
  ];
}

export default getRandomColor;
