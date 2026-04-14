import { co2 } from '@tgwf/co2';

const co2Emission = new co2({ model: 'swd' });

export const carbonMiddleware = (req, res, next) => {

  console.log(`📡 Request received: ${req.method} ${req.originalUrl}`);

  let requestSize = 0;
 
  if (req.headers['content-length']) {
    requestSize = parseInt(req.headers['content-length'], 10);
  }

  let responseSize = 0;
  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk, encoding, callback) {
    if (chunk) {
      responseSize += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk, encoding);
    }
    return originalWrite.call(res, chunk, encoding, callback);
  };

  res.end = function (chunk, encoding, callback) {
    if (chunk) {
      responseSize += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk, encoding);
    }

    const totalBytes = requestSize + responseSize;
    const emissions = co2Emission.perByte(totalBytes, false);

    
    console.log(`-----------------------------------`);
    console.log(`🌿 ECO REPORT GENERATED`);
    console.log(`🔗 URL: ${req.originalUrl}`);
    console.log(`📦 Data Transfer: ${totalBytes} bytes`);
    console.log(`🌍 CO2 Emitted: ${emissions.toFixed(6)} grams`);
    console.log(`-----------------------------------`);

    return originalEnd.call(res, chunk, encoding, callback);
  };

  next();
};