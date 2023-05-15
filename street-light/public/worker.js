// let i = 0;
// while (i<1000000000){
//     i++;
// }
// postMessage(i);

let chartInstance = null;

function updateChart(value) {
  if (chartInstance) {
    const now = new Date().toLocaleTimeString('en-US', { hour12: false });
    chartInstance.data.labels.push(now);
    chartInstance.data.datasets[0].data.push(value);

    if (chartInstance.data.labels.length > 100) {
      chartInstance.data.labels.shift();
      chartInstance.data.datasets[0].data.shift();
    }

    chartInstance.update({
      preservation: true,
    });
  }
}

function collectData() {
  setInterval(() => {
    const value = Math.floor(Math.random() * 100);
    updateChart(value);
  }, 1000);
}

addEventListener('message', (event) => {
  if (event.data.type === 'INIT') {
    chartInstance = event.data.chartInstance;
    collectData();
  }
});
