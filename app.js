const express = require('express');
const fs = require('fs');
const app = express();
const ExpressError = require('./expressError');


const {
  convertAndValidateNumsArray,
  findMean,
  findMedian,
  findMode
} = require('./helpers');


function sendResponse(req, res, data) {
  const accept = req.headers.accept || 'application/json';

  if (accept.includes('text/html')) {
    let html = `<h1>Operation: ${data.operation}</h1>`;
    if (data.operation === 'all') {
      html += `<p>Mean: ${data.mean}</p><p>Median: ${data.median}</p><p>Mode: ${data.mode}</p>`;
    } else {
      html += `<p>Value: ${data.value}</p>`;
    }
    return res.send(html);
  } else {
    return res.json(data);
  }
}


function saveResult(result) {
  const dataToSave = { ...result, timestamp: new Date().toISOString() };
  fs.writeFileSync('results.json', JSON.stringify(dataToSave, null, 2));
}


function parseNums(req, res, next) {
  if (!req.query.nums) {
    throw new ExpressError('nums are required.', 400);
  }
  const numsAsStrings = req.query.nums.split(',');
  const nums = convertAndValidateNumsArray(numsAsStrings);
  if (nums instanceof Error) {
    throw new ExpressError(`${numsAsStrings[nums.indexOf(NaN)]} is not a number.`, 400);
  }
  req.nums = nums;
  next();
}

app.get('/mean', parseNums, (req, res, next) => {
  const value = findMean(req.nums);
  const result = { operation: 'mean', value };

  if (req.query.save === 'true') saveResult(result);

  sendResponse(req, res, result);
});

app.get('/median', parseNums, (req, res, next) => {
  const value = findMedian(req.nums);
  const result = { operation: 'median', value };

  if (req.query.save === 'true') saveResult(result);

  sendResponse(req, res, result);
});

app.get('/mode', parseNums, (req, res, next) => {
  const value = findMode(req.nums);
  const result = { operation: 'mode', value };

  if (req.query.save === 'true') saveResult(result);

  sendResponse(req, res, result);
});

app.get('/all', parseNums, (req, res, next) => {
  const mean = findMean(req.nums);
  const median = findMedian(req.nums);
  const mode = findMode(req.nums);
  const result = { operation: 'all', mean, median, mode };

  if (req.query.save === 'true') saveResult(result);

  sendResponse(req, res, result);
});


app.use((req, res, next) => {
  const err = new ExpressError('Not Found', 404);
  next(err);
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    status: err.status || 500
  });
});

app.listen(3000, () => {
  console.log('Server starting on port 3000');
});
