const {
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray,
} = require("./helpers");

describe("#findMean", function () {
  it("finds the mean of an empty array", function () {
    expect(findMean([])).toEqual(0);
  });

  it("finds the mean of an array of numbers", function () {
    expect(findMean([1, -1, 4, 2])).toEqual(1.5);
  });
});

describe("#findMedian", function () {
  it("finds the median of an even set", function () {
    expect(findMedian([1, -1, 4, 2])).toEqual(1.5);
  });

  it("finds the median of an odd set", function () {
    expect(findMedian([1, -1, 4])).toEqual(1);
  });
});

describe("#findMode", function () {
  it("finds the mode of an array", function () {
    expect(findMode([1, 1, 1, 2, 2, 3])).toEqual(1);
  });

  it("finds the mode with negative numbers", function () {
    expect(findMode([-1, -1, 0, 0, 0, 2])).toEqual(0);
  });
});

describe("#convertAndValidateNumsArray", function () {
  it("converts an array of strings to numbers", function () {
    expect(convertAndValidateNumsArray(["1", "2", "3"])).toEqual([1, 2, 3]);
  });

  it("throws an error when an invalid number is included", function () {
    expect(() => convertAndValidateNumsArray(["1", "foo", "3"])).toThrow(
      "foo is not a number."
    );
  });

  it("handles decimals correctly", function () {
    expect(convertAndValidateNumsArray(["1.5", "2.5"])).toEqual([1.5, 2.5]);
  });
});
