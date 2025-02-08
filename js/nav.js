// 导航栏功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取导航栏容器
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    // 加载导航栏内容
    fetch('components/nav.html')
        .then(response => response.text())
        .then(html => {
            // 插入导航栏HTML
            navContainer.innerHTML = html;
            
            // 等待DOM更新后再初始化菜单
            requestAnimationFrame(() => {
                initializeMenu();
            });
        })
        .catch(error => console.error('Error loading navigation:', error));
});

// 初始化菜单功能
function initializeMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const navbar = document.querySelector('.navbar');
    
    if (!menuBtn || !dropdownMenu || !navbar) {
        console.error('Menu elements not found');
        return;
    }

    let isMenuOpen = false;

    // 菜单按钮点击事件
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // ESC键关闭菜单
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // 点击菜单外部关闭菜单
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            toggleMenu();
        }
    });

    // 切换菜单状态
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        dropdownMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // 更新菜单按钮文本
        const menuText = menuBtn.querySelector('.menu-text');
        if (menuText) {
            menuText.textContent = isMenuOpen ? '关闭' : '菜单';
        }
    }

    // 滚动时改变导航栏背景
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.backgroundColor = '#fff';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });
} 