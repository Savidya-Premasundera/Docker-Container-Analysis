const express = require('express');
const axios = require('axios');
const { execSync } = require('child_process');

const app = express();
const port = 8199;

function getSystemDetails() {
  const ipAddress = execSync('hostname -I').toString().trim();
  const processes = execSync('ps -ax').toString();
  const diskSpace = execSync('df -h /').toString();
  const uptime = execSync('cat /proc/uptime | awk \'{print $1}\'').toString().trim();

  return {
    ip_address: ipAddress,
    processes: processes,
    disk_space: diskSpace,
    uptime: uptime
  };
}

function formatServiceDetails(serviceName, info) {
  return {
    [serviceName]: {
      "IP Address": info.ip_address,
      "List of Running Processes": info.processes,
      "Available Disk Space": info.disk_space,
      "Time Since Last Boot": `${parseFloat(info.uptime).toFixed(2)} seconds`
    }
  };
}

app.get('/api/request', async (req, res) => {

  const service1Info = getSystemDetails();

  try {
    const service2Response = await axios.get('http://service2:5000');
    const service2Info = service2Response.data;

    const formattedService1 = formatServiceDetails("Service1", service1Info);
    const formattedService2 = formatServiceDetails("Service2", service2Info);
    res.json({
      ...formattedService1,
      ...formattedService2
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (error) {
    res.status(500).json({ error: 'Error contacting Service2', details: error.message });
  }
});

app.post('/api/stop', async (req, res) => {
  try {
    execSync('/app/docker_stop.sh');
    res.send({ message: 'Services stopped successfully.' });
  } catch (error) {
    console.error(`Error executing stop script: ${error}`);
    res.status(500).send({ error: 'Failed to stop services.' });
  }
});

app.listen(port, () => {
  console.log(`Service1: http://localhost:${port}`);
});
