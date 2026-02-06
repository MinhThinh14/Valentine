const countdownEl = document.getElementById("countdown");
const btn = document.getElementById("secretBtn");
const countdownContainer = document.getElementById("countdownContainer");

// Ngày Valentine 2026
const targetDate = new Date("2026-02-14T00:00:00").getTime();
const secretLink = "https://example.com";

// Tạo các phần tử đếm ngược
const daysEl = document.createElement('div');
const hoursEl = document.createElement('div');
const minutesEl = document.createElement('div');
const secondsEl = document.createElement('div');

daysEl.className = 'time-unit';
hoursEl.className = 'time-unit';
minutesEl.className = 'time-unit';
secondsEl.className = 'time-unit';

daysEl.innerHTML = `
    <div class="time-number" id="days">0</div>
    <div class="time-label">NGÀY</div>
`;

hoursEl.innerHTML = `
    <div class="time-number" id="hours">0</div>
    <div class="time-label">GIỜ</div>
`;

minutesEl.innerHTML = `
    <div class="time-number" id="minutes">0</div>
    <div class="time-label">PHÚT</div>
`;

secondsEl.innerHTML = `
    <div class="time-number" id="seconds">0</div>
    <div class="time-label">GIÂY</div>
`;

// Tạo container cho các đơn vị thời gian
const timeUnitsContainer = document.createElement('div');
timeUnitsContainer.className = 'time-units';
timeUnitsContainer.appendChild(daysEl);
timeUnitsContainer.appendChild(hoursEl);
timeUnitsContainer.appendChild(minutesEl);
timeUnitsContainer.appendChild(secondsEl);

// Thêm vào DOM
countdownContainer.appendChild(timeUnitsContainer);

// Cập nhật trạng thái nút
function updateButtonState(active) {
    if (active) {
        btn.classList.remove('locked');
        btn.classList.add('active');
        btn.style.cursor = 'pointer';
        btn.innerHTML = '🎁 MỞ MÓN QUÀ';
    } else {
        btn.classList.add('locked');
        btn.classList.remove('active');
        btn.style.cursor = 'not-allowed';
        btn.innerHTML = '🔒 QUÀ BÍ MẬT';
    }
}

setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        countdownEl.innerHTML = "💖 ĐÃ ĐẾN GIÂY PHÚT YÊU THƯƠNG!";
        
        // Ẩn các đơn vị thời gian
        timeUnitsContainer.style.display = 'none';
        
        // Cập nhật nút
        updateButtonState(true);
        
        btn.onclick = () => {
            // Thêm hiệu ứng chuyển trang
            btn.style.transform = 'scale(0.95)';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                window.location.href = secretLink;
            }, 300);
        };
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Cập nhật từng phần tử
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Hiệu ứng cho giây
    if (seconds % 2 === 0) {
        secondsEl.style.transform = 'translateY(-5px)';
    } else {
        secondsEl.style.transform = 'translateY(0)';
    }

    // Cập nhật nút
    updateButtonState(false);
    
    btn.onclick = () => {
        // Hiệu ứng rung nhẹ khi nhấn nút bị khóa
        btn.style.animation = 'none';
        setTimeout(() => {
            btn.style.animation = '';
        }, 100);
        
        // Hiệu ứng toast thay vì alert
        const toast = document.createElement('div');
        toast.textContent = '⏳ Chưa tới ngày Valentine đâu, kiên nhẫn chờ nhé! 💌';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 107, 139, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    };
}, 1000);

// Thêm CSS cho animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);