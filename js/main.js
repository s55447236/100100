document.addEventListener('DOMContentLoaded', function() {
    // 菜单控制
    const menuBtn = document.getElementById('menuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuLinks = document.querySelectorAll('.menu-nav a');

    console.log('Menu elements:', { menuBtn, dropdownMenu, menuLinks });

    if (menuBtn && dropdownMenu) {
        // 切换菜单显示状态
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认行为
            e.stopPropagation(); // 阻止事件冒泡
            dropdownMenu.classList.toggle('active');
            console.log('Menu toggled:', dropdownMenu.classList.contains('active'));
        });

        // 点击菜单链接时关闭菜单
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                dropdownMenu.classList.remove('active');
            });
        });

        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!dropdownMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    } else {
        console.error('Menu elements not found:', { menuBtn, dropdownMenu });
    }

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
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
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            // 如果href只是#，则不执行滚动
            if (href === '#') return;
            
            const target = document.querySelector(href);
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
    document.body.classList.add('loaded');

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

    // Particles.js配置
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#000000'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.2,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 100,
                    color: '#000000',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'top-left',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // 语言切换功能
    function updateLanguage(lang) {
        if (!['zh', 'en', 'ja'].includes(lang)) {
            console.error('不支持的语言:', lang);
            return;
        }
        
        // 保存语言偏好
        localStorage.setItem('preferred_language', lang);
        
        // 更新所有需要翻译的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                const text = i18n[lang][key];
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    // 检查文本是否包含换行符
                    if (text.includes('\n')) {
                        element.innerHTML = text.split('\n').join('<br>');
                    } else {
                        element.textContent = text;
                    }
                }
            }
        });
        
        // 更新语言切换按钮状态
        document.querySelectorAll('.language-switch a').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        // 更新 HTML lang 属性
        document.documentElement.lang = lang;
    }
    
    // 获取当前语言
    function getCurrentLanguage() {
        return localStorage.getItem('preferred_language') || 'zh';
    }
    
    // 初始化语言设置
    updateLanguage(getCurrentLanguage());
    
    // 添加语言切换事件监听
    document.querySelectorAll('.language-switch a').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = this.getAttribute('data-lang');
            updateLanguage(newLang);
        });
    });

    // 流程展开功能
    const processItems = document.querySelectorAll('.process-item');
    
    processItems.forEach(item => {
        const header = item.querySelector('.process-header');
        const content = item.querySelector('.process-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                // 关闭其他展开的项目
                processItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('expanded')) {
                        otherItem.classList.remove('expanded');
                        const otherContent = otherItem.querySelector('.process-content');
                        if (otherContent) {
                            otherContent.style.maxHeight = null;
                        }
                    }
                });

                // 切换当前项目
                const isExpanded = item.classList.contains('expanded');
                item.classList.toggle('expanded');
                
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        }
    });
}); 