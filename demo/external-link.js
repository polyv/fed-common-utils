import {
  LinkType,
  LinkJumpWay,
  navigateToLink,
  formatLink,
  isAndroid,
  isIOS,
  isWeixin,
  isWorkWeixin,
  isPcMiniProgram,
  isMobile
} from '@/external-link';

// 日志输出函数
function log(message) {
  const logElement = document.getElementById('demo-log');
  if (logElement) {
    const div = document.createElement('div');
    div.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logElement.appendChild(div);
    logElement.scrollTop = logElement.scrollHeight;
  }
  console.log(message);
}

// 模拟环境配置
function setupMockEnvironment() {
  // 模拟保利威 Webview 桥接器
  window.mockPlvWebviewBridge = {
    sendData: (type, data) => {
      log(`🔗 PlvWebview Bridge 调用: ${type}`);
      log(`📊 数据: ${JSON.stringify(data, null, 2)}`);
    }
  };

  // 模拟微信 SDK
  window.mockWxSdk = {
    miniProgram: {
      navigateTo: ({ url }) => {
        log(`🔥 微信小程序跳转: ${url}`);
        alert(`微信小程序跳转: ${url}`);
      }
    }
  };
}

// 创建模拟的链接打开处理器
function createMockOpenLink() {
  return (url, jumpWay) => {
    log(`🌍 链接打开: ${url}`);
    log(`📖 跳转方式: ${jumpWay}`);

    switch (jumpWay) {
      case LinkJumpWay.NewWindow:
        if (confirm(`是否在新窗口打开: ${url}?`)) {
          window.open(url, '_blank', 'noopener=yes');
        }
        break;
      case LinkJumpWay.CurrentWindow:
        if (confirm(`是否在当前窗口打开: ${url}? (这将离开当前页面)`)) {
          window.location.href = url;
        }
        break;
      case LinkJumpWay.PopUp:
        alert(`弹窗打开: ${url}`);
        break;
      default:
        window.open(url, '_blank', 'noopener=yes');
    }
  };
}

// 模拟环境检测和处理器
function mockIsPlvWebview() {
  const isPlv = Math.random() > 0.5;
  log(`🎥 保利威 Webview 环境检测: ${isPlv}`);
  return isPlv;
}

async function mockGetPlvWebviewBridge() {
  await new Promise(resolve => setTimeout(resolve, 100));
  log('🔗 获取保利威 Webview 桥接器');
  return window.mockPlvWebviewBridge;
}

function mockGetPlvWebviewSmallWindowSize() {
  return { width: 120, height: 200 };
}

async function mockIsWxMiniProgramEnv() {
  await new Promise(resolve => setTimeout(resolve, 50));
  const isWxMini = isWeixin && Math.random() > 0.7;
  log(`🔍 微信小程序环境检测: ${isWxMini}`);
  return isWxMini;
}

function mockToWxMiniProgram(link) {
  log(`🔥 执行微信小程序跳转: ${link}`);
  window.mockWxSdk.miniProgram.navigateTo({ url: link });
}

// DOM 事件绑定
document.addEventListener('DOMContentLoaded', () => {
  setupMockEnvironment();

  const openLink = createMockOpenLink();

  // 显示环境信息
  log('🌍 环境信息初始化:');
  log(`- Android: ${isAndroid}`);
  log(`- iOS: ${isIOS}`);
  log(`- 微信: ${isWeixin}`);
  log(`- 企业微信: ${isWorkWeixin}`);
  log(`- PC微信小程序: ${isPcMiniProgram}`);
  log(`- 移动端: ${isMobile}`);

  // 通用链接跳转测试
  document.getElementById('btn-normal-new')?.addEventListener('click', () => {
    log('🌍 测试通用链接 - 新窗口打开');
    navigateToLink({
      linkData: {
        linkType: LinkType.Normal,
        jumpWay: LinkJumpWay.NewWindow,
        link: 'https://www.baidu.com',
        pcLink: '',
        mobileLink: '',
        mobileAppLink: '',
        androidLink: '',
        iosLink: '',
        otherLink: '',
        wxMiniprogramOriginalId: '',
        wxMiniprogramAppId: '',
        wxMiniprogramLink: ''
      },
      openLink
    });
  });

  document.getElementById('btn-normal-current')?.addEventListener('click', () => {
    log('🌍 测试通用链接 - 当前窗口打开');
    navigateToLink({
      linkData: {
        linkType: LinkType.Normal,
        jumpWay: LinkJumpWay.CurrentWindow,
        link: 'https://www.baidu.com',
        pcLink: '',
        mobileLink: '',
        mobileAppLink: '',
        androidLink: '',
        iosLink: '',
        otherLink: '',
        wxMiniprogramOriginalId: '',
        wxMiniprogramAppId: '',
        wxMiniprogramLink: ''
      },
      openLink
    });
  });

  document.getElementById('btn-normal-popup')?.addEventListener('click', () => {
    log('🌍 测试通用链接 - 弹窗打开');
    navigateToLink({
      linkData: {
        linkType: LinkType.Normal,
        jumpWay: LinkJumpWay.PopUp,
        link: 'https://www.baidu.com',
        pcLink: '',
        mobileLink: '',
        mobileAppLink: '',
        androidLink: '',
        iosLink: '',
        otherLink: '',
        wxMiniprogramOriginalId: '',
        wxMiniprogramAppId: '',
        wxMiniprogramLink: ''
      },
      openLink
    });
  });

  // 多平台跳转测试
  document.getElementById('btn-multi-platform')?.addEventListener('click', () => {
    log('🌈 测试多平台跳转');
    navigateToLink({
      linkData: {
        linkType: LinkType.MultiPlatform,
        jumpWay: LinkJumpWay.NewWindow,
        link: '',
        pcLink: 'https://www.google.com',
        mobileLink: 'https://m.baidu.com',
        mobileAppLink: 'https://m.baidu.com/app',
        androidLink: '',
        iosLink: '',
        otherLink: '',
        wxMiniprogramOriginalId: 'gh_123456789',
        wxMiniprogramAppId: 'wx1234567890',
        wxMiniprogramLink: '/pages/index/index?param=test'
      },
      openLink,
      isWxMiniProgramEnv: mockIsWxMiniProgramEnv,
      toWxMiniProgram: mockToWxMiniProgram
    });
  });

  // 原生 App 跳转测试
  document.getElementById('btn-native')?.addEventListener('click', () => {
    log('📱 测试原生 App 跳转');

    // 临时模拟原生环境
    if (isAndroid) {
      window.AndroidNative = {
        toPointMall: (params) => {
          log(`✅ Android Native 调用成功: ${params}`);
          alert(`Android Native 调用: ${params}`);
        }
      };
    } else {
      window.webkit = {
        messageHandlers: {
          gotoPointsMall: {
            postMessage: (params) => {
              log(`✅ iOS Native 调用成功: ${params}`);
              alert(`iOS Native 调用: ${params}`);
            }
          }
        }
      };
    }

    navigateToLink({
      linkData: {
        linkType: LinkType.Native,
        jumpWay: LinkJumpWay.NewWindow,
        link: '',
        pcLink: '',
        mobileLink: '',
        mobileAppLink: '',
        androidLink: 'https://android.example.com',
        iosLink: 'https://ios.example.com',
        otherLink: 'https://other.example.com',
        wxMiniprogramOriginalId: '',
        wxMiniprogramAppId: '',
        wxMiniprogramLink: ''
      },
      openLink
    });
  });

  // 保利威 Webview 跳转测试
  document.getElementById('btn-plv-webview')?.addEventListener('click', () => {
    log('🎥 测试保利威 Webview 跳转');
    navigateToLink({
      linkData: {
        linkType: LinkType.MultiPlatform,
        jumpWay: LinkJumpWay.NewWindow,
        link: 'https://example.com',
        pcLink: 'https://www.google.com',
        mobileLink: 'https://m.baidu.com',
        mobileAppLink: 'https://m.baidu.com/app',
        androidLink: '',
        iosLink: '',
        otherLink: '',
        wxMiniprogramOriginalId: 'gh_123456789',
        wxMiniprogramAppId: 'wx1234567890',
        wxMiniprogramLink: '/pages/index/index'
      },
      openLink,
      isPlvWebview: mockIsPlvWebview,
      getPlvWebviewBridge: mockGetPlvWebviewBridge,
      getPlvWebviewSmallWindowSize: mockGetPlvWebviewSmallWindowSize
    });
  });

  // 链接格式化测试
  document.getElementById('btn-format-link')?.addEventListener('click', () => {
    log('🔧 测试链接格式化');

    const originalUrl = 'https://example.com/path';

    const formattedUrl = formatLink(originalUrl, () => ({
      timestamp: Date.now(),
      source: 'demo',
      test: 'true',
      customParam: 'customValue',
      userId: '12345'
    }));

    log(`📎 原始链接: ${originalUrl}`);
    log(`✨ 格式化后: ${formattedUrl}`);
    alert(`链接格式化结果:\n\n原始: ${originalUrl}\n\n格式化: ${formattedUrl}`);
  });

  // 清空日志按钮
  document.getElementById('btn-clear-log')?.addEventListener('click', () => {
    const logElement = document.getElementById('demo-log');
    if (logElement) {
      logElement.innerHTML = '<div><strong>🧹 日志已清空</strong></div>';
    }
  });
});
