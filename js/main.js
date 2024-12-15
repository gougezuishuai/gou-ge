// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const downloadButton = document.getElementById('downloadButton');
    const androidDownload = document.getElementById('androidDownload');
    const backToTopButton = document.getElementById('backToTop');
    const navbar = document.querySelector('.navbar');

    // APK下载配置
    const APK_CONFIG = {
        url: 'https://gitee.com/gouge123/elderly-app/releases/download/v1.0.0/base.apk',
        version: '1.0.0',
        size: '38', // 请更新为实际APK大小
        minAndroidVersion: '6.0'
    };

    // 处理下载功能
    function handleDownload(e) {
        e.preventDefault();

        // 直接跳转到 Gitee 发行版页面
        window.open(APK_CONFIG.url, '_blank');

        // 显示下载提示
        showDownloadTip();
    }

    // 显示下载提示
    function showDownloadTip() {
        const tip = document.createElement('div');
        tip.className = 'download-tip';
        tip.innerHTML = `
            <div class="tip-content">
                <i class="fas fa-info-circle"></i>
                <p>正在跳转到下载页面，请在新页面中点击下载按钮</p>
                <button class="close-tip">我知道了</button>
            </div>
        `;

        document.body.appendChild(tip);

        tip.querySelector('.close-tip').addEventListener('click', () => {
            document.body.removeChild(tip);
        });

        // 3秒后自动关闭
        setTimeout(() => {
            if (document.body.contains(tip)) {
                document.body.removeChild(tip);
            }
        }, 3000);
    }

    // 添加下载按钮事件监听
    downloadButton.addEventListener('click', handleDownload);
    androidDownload.addEventListener('click', handleDownload);

    // 检测设备类型
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // 返回顶部按钮
    window.addEventListener('scroll', function() {
        // 显示/隐藏返回顶部按钮
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        // 导航栏滚动效果
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 返回顶部功能
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 检查Android版本兼容性
    function checkAndroidCompatibility() {
        if (/Android/i.test(navigator.userAgent)) {
            const androidVersion = parseFloat(navigator.userAgent.match(/Android\s+([\d.]+)/)[1]);
            const minVersion = parseFloat(APK_CONFIG.minAndroidVersion);

            if (androidVersion < minVersion) {
                alert(`当前Android版本过低，需要Android ${APK_CONFIG.minAndroidVersion} 或以上版本`);
                return false;
            }
        }
        return true;
    }

    // 添加截图预览功能
    document.querySelectorAll('.screenshot-item img').forEach(img => {
        img.addEventListener('click', function() {
            showImagePreview(this.src);
        });
    });

    // 图片预览功能
    function showImagePreview(src) {
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = `
            <div class="preview-content">
                <img src="${src}" alt="预览图">
                <button class="close-preview">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(preview);

        // 添加关闭预览事件
        preview.addEventListener('click', function(e) {
            if (e.target === preview || e.target.closest('.close-preview')) {
                document.body.removeChild(preview);
            }
        });
    }

    // 更新页面版本信息
    function updateVersionInfo() {
        const versionInfo = document.querySelector('.version-info');
        if (versionInfo) {
            versionInfo.textContent = `最新版本: ${APK_CONFIG.version}`;
        }

        const fileInfo = document.querySelector('.file-info');
        if (fileInfo) {
            fileInfo.textContent = `文件大小: ${APK_CONFIG.size} MB`;
        }
    }

    // 显示更新提示
    function showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>发现新版本 ${APK_CONFIG.version}，建议更新！</span>
                <button class="close-notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // 添加关闭通知事件
        notification.querySelector('.close-notification').addEventListener('click', () => {
            document.body.removeChild(notification);
        });

        // 5秒后自动关闭
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
    }

    // 初始化
    function init() {
        updateVersionInfo();

        // 检查是否需要显示更新提示
        if (localStorage.getItem('lastVisit')) {
            const lastVisit = new Date(localStorage.getItem('lastVisit'));
            const now = new Date();

            // 如果距离上次访问超过7天，显示更新提示
            if ((now - lastVisit) / (1000 * 60 * 60 * 24) > 7) {
                showUpdateNotification();
            }
        }

        // 更新访问时间
        localStorage.setItem('lastVisit', new Date().toISOString());
    }

    // 初始化
    init();
});