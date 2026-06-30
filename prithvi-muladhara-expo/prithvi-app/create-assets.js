const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ASSETS_DIR = path.join(__dirname, 'assets');
const SIZE = 1024;
const COLOR = { red: 0x0d, green: 0x0a, blue: 0x06, alpha: 0xff };
const FILES = ['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'];

function crc32(buffer) {
  let crc = 0xffffffff;

  for (let index = 0; index < buffer.length; index += 1) {
    crc ^= buffer[index];

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type, 'ascii');
  const lengthBuffer = Buffer.alloc(4);
  const crcBuffer = Buffer.alloc(4);

  lengthBuffer.writeUInt32BE(data.length, 0);
  crcBuffer.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);

  return Buffer.concat([lengthBuffer, typeBuffer, data, crcBuffer]);
}

function createPng(width, height) {
  const rowLength = width * 4 + 1;
  const raw = Buffer.alloc(rowLength * height);

  for (let y = 0; y < height; y += 1) {
    const rowStart = y * rowLength;
    raw[rowStart] = 0;

    for (let x = 0; x < width; x += 1) {
      const pixelStart = rowStart + 1 + x * 4;
      raw[pixelStart] = COLOR.red;
      raw[pixelStart + 1] = COLOR.green;
      raw[pixelStart + 2] = COLOR.blue;
      raw[pixelStart + 3] = COLOR.alpha;
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function main() {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  const png = createPng(SIZE, SIZE);

  for (const fileName of FILES) {
    const filePath = path.join(ASSETS_DIR, fileName);
    fs.writeFileSync(filePath, png);
    console.log(`created ${path.relative(__dirname, filePath)}`);
  }
}

main();
