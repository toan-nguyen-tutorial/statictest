const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

let ledState = 'off'; // Trạng thái đèn LED mặc định
let currentServoAngle = 90; // Góc servo mặc định
let currentTemperature = 25; // Nhiệt độ mặc định, cần cập nhật bằng giá trị thực từ cảm biến

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API để phục vụ trang HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API để điều khiển đèn LED
app.get('/led', (req, res) => {
  res.send(ledState);
});

app.get('/led/:state', (req, res) => {
  const state = req.params.state;
  if (state === 'on' || state === 'off') {
    ledState = state;
    console.log(`Đèn LED đã được chuyển sang ${state}`);
    res.send(`Đèn LED đã được chuyển sang ${state}`);
  } else {
    res.status(400).send('Yêu cầu không hợp lệ');
  }
});

// API để điều khiển servo
app.get('/servo', (req, res) => {
  res.send(currentServoAngle.toString()); // Gửi góc servo hiện tại
});

app.get('/servo/:position', (req, res) => {
  const position = parseInt(req.params.position);
  
  if (position >= 0 && position <= 180) {
    currentServoAngle = position; // Cập nhật góc servo
    console.log(`Servo đã được đặt ở vị trí ${position} độ`);
    res.send(`Servo đã được đặt ở vị trí ${position} độ`);
  } else {
    res.status(400).send('Vị trí không hợp lệ');
  }
});

// API để trả về nhiệt độ từ cảm biến LM35
app.get('/temperature', (req, res) => {
  // Tạm thời trả về nhiệt độ giả định, cần thay thế bằng dữ liệu thực từ cảm biến
  console.log(`Nhiệt độ hiện tại là ${currentTemperature} °C`);
  res.send(currentTemperature.toString());
});

// Giả lập cập nhật nhiệt độ mỗi 10 giây (thay vì có cảm biến thực)
setInterval(() => {
  // Tạm thời cập nhật nhiệt độ ngẫu nhiên để mô phỏng dữ liệu
  currentTemperature = (Math.random() * 15 + 20).toFixed(2); // Nhiệt độ trong khoảng 20°C - 35°C
}, 10000);

app.listen(port, () => {
  console.log(`Server đang chạy tại http://192.168.1.6:${port}`);
});
