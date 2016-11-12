import Chart from 'chart.js'

const REQUEST_URL = './api/count.json';
let data = '';
let str = '';

function fetchData() {
    const loadingRef = document.querySelector('#loading');
    fetch(REQUEST_URL).then((response) => {
        return response.json();
    }).then(function(json) {
      data = json;
      loadingRef.style.display = 'none';
      loadChart(data);
    });
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function loadChart(rawData) {
    const ctxRef = document.querySelector('#data-chart');
    let labels = [];
    let counts = [];
    let colors = [];
    for(let i = 0; i <= 30; i++) {
      labels.push(rawData[i][0]);
      counts.push(rawData[i][1]);
      colors.push(getRandomColor())      
    }

    const data = {
        labels: labels,
        datasets: [{
            data: counts,
            backgroundColor: colors,
        }]
    };
    const myPieChart = new Chart(ctxRef, {
    type: 'pie',
        data: data,
    });      
}

fetchData();
