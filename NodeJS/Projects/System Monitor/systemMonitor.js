import os from 'node:os';
import fs from 'node:fs';
import axios from 'axios';
import 'dotenv/config';

// Check if the webhook is undefined
if (!process.env.DISCORD_WEBHOOK_URL) {
  console.error("Discord webhook url is not declared");
  console.log("Check your env variables");
  process.exit(1);
}

const ALERT_THRESHOLD = process.env.ALERT_THRESHOLD || 90;
const CHECK_INTERVAL_MS = process.env.CHECK_INTERVAL_MS  || 1000 * 60 * 5;

function estimatePercRam() {
  const totalRam = os.totalmem() / 1024; // Bytes -> KyloBytes
  let freeRam = os.freemem() / 1024; // Bytes -> KB
  if (os.platform() == 'linux') {
    const memoryText = fs.readFileSync('/proc/meminfo', 'utf-8');
    const lines = memoryText.split("\n");
    lines.forEach(line => {
      if (line.includes("MemAvailable:")) {        
        let dataRam = line.trim().split(":")[1].replace("kB", ""); // remove whitespaces -> splitting and getting the 2 value -> removing kB
        freeRam = parseInt(dataRam);
      }
    })
  }
  const usedRam = totalRam - freeRam;
  const percUsedRam = usedRam / totalRam * 100;
  return percUsedRam;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function takeSnapshot(cpus) {
  return cpus.map(cpu => {
    const values = Object.values(cpu.times);
    const total = values.reduce((t, v) => t + v, 0);
    const idle = cpu.times['idle'];
    
    return {total, idle};
  })

}

async function estimateCPUs() {

  const firstSnapshot = takeSnapshot(os.cpus());
  await sleep(1000)
  const secondSnapshot = takeSnapshot(os.cpus());

  const deltaUsage = firstSnapshot.map((item, index) => {
    const idleDelta = secondSnapshot[index].idle - item.idle;
    const totalDelta = secondSnapshot[index].total - item.total;
    const coreUsage = ( 1 - idleDelta / totalDelta ) * 100;

    return { coreUsage };
  })

  const averageUsage = deltaUsage.reduce((accumulator, core) => core.coreUsage + accumulator, 0) / deltaUsage.length;

  return averageUsage;
}

async function checkThresholds() {
  const ram = estimatePercRam();
  const cpu = await estimateCPUs();
  const alertRam = ram >= ALERT_THRESHOLD;
  const alertCPU = cpu >= ALERT_THRESHOLD;

  if (alertRam && alertCPU) {
    await sendAlert(`**Critical System Alert**\nMemory and CPU Exceeded!\nRAM: ${ram.toFixed(2)}%\nCPU: ${cpu.toFixed(2)}%`);
  } else if (alertRam) {
    await sendAlert(`**Memory Pressure**\nRAM usage: ${ram.toFixed(2)}%`);
  } else if (alertCPU) {
    await sendAlert(`**CPU Load High**\nCPU usage: ${cpu.toFixed(2)}%`);
  }
}

async function sendAlert(message) {
  try {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, { content: message });
    console.log(`[${new Date().toISOString()}] Alert Sent`);
    } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending alert:`, error.message);
  }
}

async function startsMonitor() {
  await checkThresholds();
  setTimeout(startsMonitor, CHECK_INTERVAL_MS);
}

startsMonitor();