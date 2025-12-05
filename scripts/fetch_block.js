const https = require('https');
const fs = require('fs');
const path = require('path');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function getBeijingTime() {
  const now = new Date();
  const beijingOffset = 8 * 60;
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (beijingOffset * 60000));
}

function getBeijingDate(beijingTime = getBeijingTime()) {
  return {
    date: beijingTime.toISOString().split('T')[0],
    year: beijingTime.getFullYear(),
    month: String(beijingTime.getMonth() + 1).padStart(2, '0'),
    day: String(beijingTime.getDate()).padStart(2, '0')
  };
}

function extractLuckyNumbers(blockHash) {
  const digits = blockHash.replace(/\D/g, '');
  const reversedDigits = digits.split('').reverse().join('');
  
  return {
    lucky3: reversedDigits.slice(0, 3).padStart(3, '0'),
    lucky6: reversedDigits.slice(0, 6).padStart(6, '0')
  };
}

async function fetchBlockData() {
  console.log('Fetching Bitcoin block data...');
  
  const beijingTime = getBeijingTime();
  const { year, month, day, date } = getBeijingDate(beijingTime);
  const noonBeijing = new Date(`${year}-${month}-${day}T12:00:00+08:00`);
  const noonTimestamp = Math.floor(noonBeijing.getTime() / 1000);
  
  if (beijingTime.getTime() < noonBeijing.getTime()) {
    throw new Error('Beijing noon has not occurred yet. Please run after 12:00 (UTC+8).');
  }
  
  console.log(`Looking for last block before Beijing noon (timestamp: ${noonTimestamp})`);
  
  const MAX_BLOCK_BATCHES = 500;
  let requestCount = 0;
  
  let blocks = await httpsGet('https://blockstream.info/api/blocks');
  requestCount += 1;
  
  if (!Array.isArray(blocks) || blocks.length === 0) {
    throw new Error('Unable to retrieve blocks from Blockstream API');
  }
  
  let targetBlock = blocks.find(block => block.timestamp < noonTimestamp);
  
  while (!targetBlock && requestCount < MAX_BLOCK_BATCHES) {
    const lastBlock = blocks[blocks.length - 1];
    if (!lastBlock || typeof lastBlock.height !== 'number' || lastBlock.height <= 0) {
      break;
    }
  
    const nextHeight = lastBlock.height - 1;
    console.log(`No block before noon in current batch. Fetching older blocks starting from height ${nextHeight}...`);
    
    blocks = await httpsGet(`https://blockstream.info/api/blocks/${nextHeight}`);
    requestCount += 1;
    
    if (!Array.isArray(blocks) || blocks.length === 0) {
      break;
    }
    
    targetBlock = blocks.find(block => block.timestamp < noonTimestamp);
  }
  
  if (!targetBlock) {
    throw new Error('No block found before Beijing noon time');
  }
  
  console.log(`Found block: ${targetBlock.id}`);
  console.log(`Block height: ${targetBlock.height}`);
  console.log(`Block timestamp: ${targetBlock.timestamp} (${new Date(targetBlock.timestamp * 1000).toISOString()})`);
  
  const { lucky3, lucky6 } = extractLuckyNumbers(targetBlock.id);
  
  const result = {
    date: date,
    block_height: targetBlock.height,
    block_hash: targetBlock.id,
    block_timestamp: targetBlock.timestamp,
    lucky3: lucky3,
    lucky6: lucky6,
    generated_at: new Date().toISOString()
  };
  
  console.log(`Lucky 3: ${lucky3}`);
  console.log(`Lucky 6: ${lucky6}`);
  
  return result;
}

function saveData(data) {
  const dataDir = path.join(__dirname, '..', 'data');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const dailyFile = path.join(dataDir, `${data.date}.json`);
  fs.writeFileSync(dailyFile, JSON.stringify(data, null, 2));
  console.log(`Saved daily data to ${dailyFile}`);
  
  const historyFile = path.join(dataDir, 'history.json');
  let history = [];
  
  if (fs.existsSync(historyFile)) {
    history = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));
  }
  
  const existingIndex = history.findIndex(item => item.date === data.date);
  if (existingIndex >= 0) {
    history[existingIndex] = data;
  } else {
    history.push(data);
  }
  
  history.sort((a, b) => b.date.localeCompare(a.date));
  
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
  console.log(`Updated history file with ${history.length} entries`);
}

async function main() {
  try {
    const data = await fetchBlockData();
    saveData(data);
    console.log('✓ Success!');
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

main();
