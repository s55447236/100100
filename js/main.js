// 菜单控制
const menuBtn = document.getElementById('menuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const menuLinks = document.querySelectorAll('.menu-nav a');

// 切换菜单显示状态
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    dropdownMenu.classList.toggle('active');
});

// 点击菜单链接时关闭菜单
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        dropdownMenu.classList.remove('active');
    });
});

// 点击页面其他地方关闭菜单
document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        dropdownMenu.classList.remove('active');
    }
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.webkitBackdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.webkitBackdropFilter = 'none';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 联系表单提交
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };
        
        // 这里可以添加表单验证逻辑
        
        // 模拟表单提交
        alert('感谢您的留言！我们会尽快与您联系。');
        this.reset();
    });
}

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// 添加滚动动画
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.work-item, .service-item, .partner-item').forEach(item => {
    observer.observe(item);
});

// 合作伙伴滚动效果
const partnerTrack = document.querySelector('.partner-track');
if (partnerTrack) {
    // 触摸设备滚动暂停
    partnerTrack.addEventListener('touchstart', () => {
        partnerTrack.style.animationPlayState = 'paused';
    });

    partnerTrack.addEventListener('touchend', () => {
        partnerTrack.style.animationPlayState = 'running';
    });

    // 动态调整滚动速度
    const adjustScrollSpeed = () => {
        const width = window.innerWidth;
        let duration = '50s'; // 默认速度

        if (width < 768) {
            duration = '20s'; // 移动端速度更快
        }

        partnerTrack.style.animationDuration = duration;
    };

    // 初始化速度
    adjustScrollSpeed();

    // 窗口大小改变时调整速度
    window.addEventListener('resize', adjustScrollSpeed);
}

// 流程步骤交互
const processSteps = document.querySelectorAll('.process-item');

// 默认展开第一个步骤
processSteps[0].classList.add('active');

// 为每个步骤添加鼠标进入事件
processSteps.forEach(step => {
    step.addEventListener('mouseenter', () => {
        // 关闭所有步骤
        processSteps.forEach(s => s.classList.remove('active'));
        // 展开当前步骤
        step.classList.add('active');
    });
});

// Particles.js配置
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#000"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.2,
                "random": false
            },
            "size": {
                "value": 5,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#000000",
                "opacity": 0.1,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "top-left",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}); 