/**
 * Build a frequency counter object from an array
 * @param {Array} arr any array
 */
function createFrequencyCounter(arr) {
  return arr.reduce(function (acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

/**
 
 * @param {Array} arr any array
 */
function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}

/**

 * @param {Array} numsAsStrings array of strings
 * @returns {Array} array of numbers
 */
function convertAndValidateNumsArray(numsAsStrings) {
  let result = [];

  for (let i = 0; i < numsAsStrings.length; i++) {
    let valToNumber = Number(numsAsStrings[i]);

    if (Number.isNaN(valToNumber)) {
      throw new Error(`${numsAsStrings[i]} is not a number.`);
    }

    result.push(valToNumber);
  }

  return result;
}

function findMean(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((acc, cur) => acc + cur, 0) / nums.length;
}

function findMedian(nums) {
  nums.sort((a, b) => a - b);
  const middleIndex = Math.floor(nums.length / 2);

  if (nums.length % 2 === 0) {
    return (nums[middleIndex - 1] + nums[middleIndex]) / 2;
  } else {
    return nums[middleIndex];
  }
}

module.exports = {
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray,
};
