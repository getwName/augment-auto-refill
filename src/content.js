
// 检查当前URL是否匹配目标页面
function checkUrl() {
  const currentUrl = window.location.href;

  // 检查不同的页面状态
  if (currentUrl.includes('login.augmentcode.com/u/login/identifier')) {
    console.log('Augment续杯: 检测到邮箱输入页面');

    // 页面加载完成后立即显示验证提示
    setTimeout(() => {
      showInitialVerificationPrompt();
    }, 2000);

    // 检查续杯按钮是否已存在
    if (!document.querySelector('.refill-button-added')) {
      addRefillButton();
    }
  } else if (currentUrl.includes('login.augmentcode.com') || currentUrl.includes('auth.augmentcode.com')) {
    console.log('Augment续杯: 检测到认证页面，检查页面状态...');
    handleAuthPage();
  }
}

// 处理认证页面的不同状态（参考油猴脚本逻辑）
function handleAuthPage() {
  console.log('Augment续杯: 开始检查页面状态...');

  // 检查当前页面状态
  const emailInput = document.querySelector('input[name="username"]');
  const codeInput = document.querySelector('input[name="code"]');
  const termsCheckbox = document.querySelector('#terms-of-service-checkbox');

  if (emailInput) {
    console.log('Augment续杯: 检测到邮箱输入页面');
    // 邮箱输入页面已经在主函数中处理
    return;
  } else if (codeInput) {
    console.log('Augment续杯: 检测到验证码输入页面，自动执行验证码填写...');
    // 避免重复执行
    if (!codeInput.hasAttribute('data-auto-filled')) {
      codeInput.setAttribute('data-auto-filled', 'true');
      fillVerificationCode();
    }
    return;
  } else if (termsCheckbox) {
    console.log('Augment续杯: 检测到服务条款页面，自动勾选同意框...');
    // 避免重复执行
    if (!termsCheckbox.hasAttribute('data-auto-processed')) {
      termsCheckbox.setAttribute('data-auto-processed', 'true');
      completeRegistration();
    }
    return;
  } else {
    console.log('Augment续杯: 无法识别当前页面状态（油猴脚本模式）');
    // 油猴脚本模式：不处理未识别的页面状态
  }
}

// 等待元素出现（参考油猴脚本）
async function waitForElement(selector, timeout = 10000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return null;
}

// 油猴脚本策略：不等待验证复选框，直接绕过
async function waitForVerifyCheckbox() {
  console.log('Augment续杯: 油猴脚本模式 - 跳过验证复选框检测');
  // 核心策略：不查找、不等待任何验证复选框
  // 直接返回null，让后续逻辑跳过验证处理
  return null;
}

// 油猴脚本核心策略：完全跳过人机验证检测
async function checkAndClickVerifyHuman() {
  console.log('Augment续杯: 油猴脚本模式 - 绕过人机验证，直接提交');
  // 核心策略：不检测、不等待、不处理任何验证框
  // 利用时间窗口在验证加载前完成提交
  return true;
}



// 备用的fillEmail函数
async function fillEmailLikeUserScript() {
  logger.log('执行备用fillEmail逻辑');

  const continueBtn = await waitForElement('button[type="submit"]');
  if (continueBtn && !continueBtn.disabled) {
    continueBtn.click();
    logger.log('备用方案：点击Continue按钮', 'success');
    return true;
  }

  return false;
}

// 填写验证码（完全参考油猴脚本逻辑）
async function fillVerificationCode() {
  const code = await getVerificationCodeWithRetry();
  if (!code) {
    logger.log('未能获取验证码', 'error');
    return false;
  }

  const codeInput = await waitForElement('input[name="code"]');
  if (!codeInput) {
    logger.log('未找到验证码输入框', 'error');
    return false;
  }

  // 填写验证码
  codeInput.value = code;
  codeInput.dispatchEvent(new Event('input', { bubbles: true }));
  logger.log('验证码已自动填入: ' + code, 'success');

  // 点击继续按钮
  const continueBtn = await waitForElement('button[type="submit"]');
  if (!continueBtn) {
    logger.log('未找到继续按钮', 'error');
    return false;
  }

  continueBtn.click();
  logger.log('自动点击继续按钮', 'success');
  return true;
}

// 同意服务条款并完成注册（参考油猴脚本逻辑）
async function completeRegistration() {
  const checkbox = await waitForElement('input[type="checkbox"]');
  if (checkbox) {
    checkbox.click();
    logger.log('已自动勾选服务条款同意框', 'success');
  }

  const signupBtn = await waitForElement('button[type="button"]');
  if (!signupBtn) {
    logger.log('未找到注册按钮', 'error');
    return false;
  }

  signupBtn.click();
  logger.log('注册流程完成！', 'success');
  return true;
}

// 根据文本查找按钮的辅助函数
function findButtonByText(textArray) {
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    const buttonText = button.textContent.toLowerCase().trim();
    for (const text of textArray) {
      if (buttonText.includes(text.toLowerCase())) {
        return button;
      }
    }
  }
  return null;
}

// 添加续杯按钮
function addRefillButton() {
  // 等待原始按钮加载
  const checkExist = setInterval(() => {
    const originalButton = document.querySelector('button[name="action"][value="default"]');

    if (originalButton && !document.querySelector('.refill-button-added')) {
      clearInterval(checkExist);

      // 创建续杯按钮
      const refillButton = document.createElement('button');
      refillButton.type = 'button';
      refillButton.textContent = '续杯';
      refillButton.className = 'refill-button-added'; // 添加特殊类名用于检测

      // 复制原始按钮的样式类
      originalButton.classList.forEach(className => {
        refillButton.classList.add(className);
      });

      // 添加点击事件
      refillButton.addEventListener('click', handleRefill);

      // 将按钮插入到原始按钮后面
      originalButton.parentNode.insertBefore(refillButton, originalButton.nextSibling);
      // 设置标志，表示按钮已添加
      buttonAdded = true;
      console.log('Augment续杯: 续杯按钮已添加');
    }
  }, 500);
}

// 处理续杯按钮点击 - 用户协助验证模式
async function handleRefill() {
  logger.log('启动续杯流程', 'step');

  try {
    await waitForPageReady();
    showUserVerificationPrompt();
    await waitForUserVerificationComplete();
  } catch (error) {
    logger.log('续杯流程出错: ' + error.message, 'error');
    await fallbackStrategy();
  }
}

// 页面加载时显示初始验证提示
function showInitialVerificationPrompt() {
  // 检查是否已经显示过提示
  if (document.getElementById('augment-initial-prompt')) {
    return;
  }

  logger.log('显示操作提示', 'step');

  // 创建提示框
  const promptDiv = document.createElement('div');
  promptDiv.id = 'augment-initial-prompt';
  promptDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 350px;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
  `;

  promptDiv.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <div style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; margin-right: 10px; animation: pulse 2s infinite;"></div>
      <strong style="font-size: 16px;">🚀 Augment自动续杯工具</strong>
    </div>
    <div style="margin-bottom: 15px; font-weight: 500;">
      检测到Augment登录页面！
    </div>
    <div style="margin-bottom: 15px;">
      <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 10px;">
        <div style="font-weight: 500; margin-bottom: 5px;">📋 操作步骤：</div>
        <div style="font-size: 13px; line-height: 1.4;">
          1️⃣ 先完成页面上的验证（点击"我不是机器人"等）<br>
          2️⃣ 然后点击"续杯"按钮开始自动注册
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 12px; opacity: 0.8;">💡 验证码部分将自动处理</div>
      <button id="close-initial-prompt" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">知道了</button>
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
    </style>
  `;

  document.body.appendChild(promptDiv);

  // 添加关闭按钮事件
  const closeBtn = document.getElementById('close-initial-prompt');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      promptDiv.remove();
    });
  }

  // 10秒后自动移除
  setTimeout(() => {
    if (document.getElementById('augment-initial-prompt')) {
      promptDiv.remove();
    }
  }, 10000);
}

// 显示用户验证提示（续杯按钮点击后）
function showUserVerificationPrompt() {
  logger.log('等待用户完成验证', 'step');

  // 创建提示框
  const promptDiv = document.createElement('div');
  promptDiv.id = 'augment-verification-prompt';
  promptDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 320px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
  `;

  promptDiv.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
      <div style="width: 8px; height: 8px; background: #4ade80; border-radius: 50%; margin-right: 10px; animation: pulse 2s infinite;"></div>
      <strong style="font-size: 16px;">🎯 Augment自动续杯工具</strong>
    </div>
    <div style="margin-bottom: 15px;">
      请手动完成页面上的验证（如Cloudflare验证框），完成后插件将自动继续执行邮箱填写和验证码处理。
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 6px; font-size: 12px;">
      💡 提示：通常需要点击"我不是机器人"复选框或完成图片验证
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    </style>
  `;

  document.body.appendChild(promptDiv);

  // 5秒后添加闪烁效果提醒用户
  setTimeout(() => {
    if (document.getElementById('augment-verification-prompt')) {
      promptDiv.style.animation = 'shake 0.5s ease-in-out infinite alternate';
      promptDiv.style.setProperty('--shake', `
        @keyframes shake {
          0% { transform: translateX(0); }
          100% { transform: translateX(5px); }
        }
      `);
    }
  }, 5000);
}

// 等待用户完成验证
async function waitForUserVerificationComplete() {
  logger.log('监听验证状态', 'step');

  const maxWait = 120000; // 最多等待2分钟
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    // 检查页面是否有可操作的邮箱输入框
    const emailInput = document.querySelector('input[name="username"]');
    if (emailInput && emailInput.offsetParent !== null && !emailInput.disabled) {
      // 检查是否还有验证相关的元素
      const challengeFrame = document.querySelector('iframe[src*="challenges.cloudflare.com"]');
      const challengeDiv = document.querySelector('div[class*="cf-challenge"]');

      if (!challengeFrame && !challengeDiv) {
        logger.log('验证完成，开始自动填写', 'success');

        // 移除提示框
        const promptDiv = document.getElementById('augment-verification-prompt');
        if (promptDiv) {
          promptDiv.remove();
        }

        // 显示成功提示
        showSuccessNotification();

        // 开始自动填写流程
        await executeAutoFillProcess();
        return;
      }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  logger.log('验证等待超时，尝试继续执行', 'warning');
  await executeAutoFillProcess();
}

// 显示成功通知
function showSuccessNotification() {
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
  `;

  successDiv.innerHTML = `
    <div style="display: flex; align-items: center;">
      <span style="font-size: 20px; margin-right: 10px;">✅</span>
      <div>
        <strong>验证完成！</strong><br>
        <span style="font-size: 12px; opacity: 0.9;">正在自动填写邮箱和处理验证码...</span>
      </div>
    </div>
  `;

  document.body.appendChild(successDiv);

  // 3秒后自动移除
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv);
    }
  }, 3000);
}

// 执行自动填写流程
async function executeAutoFillProcess() {
  logger.log('执行自动填写流程', 'step');

  try {
    // 模拟人类行为
    await simulateHumanBehavior();

    // 执行邮箱填写
    const success = await fillEmailAdvanced();
    if (success) {
      logger.log('邮箱填写成功', 'success');
      startMainProcess();
    } else {
      logger.log('尝试备用填写方式', 'warning');
      const simpleSuccess = await fillEmailSimple();
      if (simpleSuccess) {
        logger.log('✅ 简单填写成功', 'success');
        startMainProcess();
      } else {
        logger.log('❌ 自动填写失败，请手动填写邮箱', 'error');
        // 显示手动填写提示
        showManualFillPrompt();
        // 仍然启动监听，等待用户手动填写后自动处理验证码
        startMainProcess();
      }
    }
  } catch (error) {
    logger.log('❌ 自动填写流程出错: ' + error.message, 'error');
    await fallbackStrategy();
  }
}

// 显示手动填写提示
function showManualFillPrompt() {
  const manualDiv = document.createElement('div');
  manualDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
  `;

  manualDiv.innerHTML = `
    <div style="display: flex; align-items: center;">
      <span style="font-size: 20px; margin-right: 10px;">✋</span>
      <div>
        <strong>需要手动填写</strong><br>
        <span style="font-size: 12px; opacity: 0.9;">请手动填写邮箱，验证码部分将自动处理</span>
      </div>
    </div>
  `;

  document.body.appendChild(manualDiv);

  // 8秒后自动移除
  setTimeout(() => {
    if (manualDiv.parentNode) {
      manualDiv.parentNode.removeChild(manualDiv);
    }
  }, 8000);
}

// 等待页面完全加载和验证系统初始化
async function waitForPageReady() {
  logger.log('🔄 等待页面完全加载...');

  // 等待DOM完全加载
  if (document.readyState !== 'complete') {
    await new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });
  }

  // 等待表单元素出现
  const maxWait = 10000;
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    const emailInput = document.querySelector('input[name="username"]');
    const submitBtn = document.querySelector('button[type="submit"]');

    if (emailInput && submitBtn) {
      logger.log('✅ 页面加载完成，表单元素已就绪');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  logger.log('✅ 页面加载完成（可能仍在加载表单）');
}

// 检测并等待Cloudflare验证完成 - 优化版
async function waitForCloudflareReady() {
  logger.log('🛡️ 检测Cloudflare验证状态...');

  const maxWait = 15000; // 减少等待时间到15秒
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    // 方法1：检查是否有邮箱输入框（说明页面已准备好）
    const emailInput = document.querySelector('input[name="username"]');
    if (emailInput && emailInput.offsetParent !== null) {
      logger.log('✅ 检测到邮箱输入框，页面准备就绪');
      return true;
    }

    // 方法2：检查是否有Cloudflare挑战相关元素
    const challengeFrame = document.querySelector('iframe[src*="challenges.cloudflare.com"]');
    const challengeDiv = document.querySelector('div[class*="cf-challenge"]');
    const loadingDiv = document.querySelector('div[class*="loading"]');

    // 方法3：检查页面内容是否包含正常的登录表单
    const bodyText = document.body.textContent.toLowerCase();
    const hasNormalContent = bodyText.includes('email') || bodyText.includes('continue') || bodyText.includes('sign');

    if (!challengeFrame && !challengeDiv && !loadingDiv && hasNormalContent) {
      logger.log('✅ Cloudflare验证通过，页面内容正常');
      return true;
    }

    // 方法4：检查网络请求是否完成（通过performance API）
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0];
      if (navEntry.loadEventEnd > 0) {
        logger.log('✅ 页面加载事件完成，尝试继续');
        // 额外等待一点时间确保所有脚本执行完成
        await new Promise(resolve => setTimeout(resolve, 2000));
        return true;
      }
    }

    logger.log('⏳ 等待Cloudflare验证完成...');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  logger.log('⚠️ Cloudflare验证等待超时，强制继续执行');
  return false;
}

// 模拟人类行为
async function simulateHumanBehavior() {
  logger.log('🎭 模拟人类行为...');

  // 模拟鼠标移动
  const mouseMoveEvent = new MouseEvent('mousemove', {
    bubbles: true,
    clientX: Math.random() * window.innerWidth,
    clientY: Math.random() * window.innerHeight
  });
  document.dispatchEvent(mouseMoveEvent);

  // 随机延迟
  const delay = 500 + Math.random() * 1000;
  await new Promise(resolve => setTimeout(resolve, delay));

  logger.log('✅ 人类行为模拟完成');
}

// 强制执行绕过 - 当Cloudflare验证卡住时
async function forceExecuteBypass() {
  logger.log('⚡ 执行强制绕过策略...');

  try {
    // 尝试直接查找并操作邮箱输入框
    const emailInput = document.querySelector('input[name="username"]') ||
                       document.querySelector('input[type="email"]') ||
                       document.querySelector('input[placeholder*="email"]') ||
                       document.querySelector('input[placeholder*="Email"]');

    if (emailInput) {
      logger.log('🎯 找到邮箱输入框，执行强制填写...');

      const email = await generateEmail();

      // 强制显示输入框（如果被隐藏）
      emailInput.style.display = 'block';
      emailInput.style.visibility = 'visible';
      emailInput.style.opacity = '1';

      // 移除可能的disabled属性
      emailInput.removeAttribute('disabled');
      emailInput.removeAttribute('readonly');

      // 填写邮箱
      emailInput.value = email;
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      emailInput.dispatchEvent(new Event('change', { bubbles: true }));

      logger.log('📧 强制填写邮箱: ' + email);

      // 查找并点击提交按钮
      await new Promise(resolve => setTimeout(resolve, 500));

      const submitBtn = document.querySelector('button[type="submit"]') ||
                       document.querySelector('button[name="action"]') ||
                       document.querySelector('input[type="submit"]') ||
                       document.querySelector('button:contains("Continue")') ||
                       document.querySelector('button:contains("继续")');

      if (submitBtn) {
        // 强制启用按钮
        submitBtn.removeAttribute('disabled');
        submitBtn.style.pointerEvents = 'auto';

        submitBtn.click();
        logger.log('🚀 强制点击提交按钮');
        return true;
      } else {
        logger.log('❌ 未找到提交按钮');
        return false;
      }
    } else {
      logger.log('❌ 未找到邮箱输入框');
      return false;
    }
  } catch (error) {
    logger.log('❌ 强制执行出错: ' + error.message, 'error');
    return false;
  }
}

// 高级填写逻辑 - 应对现代验证系统
async function fillEmailAdvanced() {
  logger.log('🎯 执行高级邮箱填写逻辑...');

  const email = await generateEmail();
  logger.log('📧 使用邮箱: ' + email);

  // 等待邮箱输入框，增加重试机制
  const emailInput = await waitForElementWithRetry('input[name="username"]', 3);
  if (!emailInput) {
    logger.log('❌ 未找到邮箱输入框', 'error');
    return false;
  }

  logger.log('📝 找到邮箱输入框，开始高级填写...');

  // 模拟真实用户输入行为
  emailInput.focus();
  await new Promise(resolve => setTimeout(resolve, 100));

  // 逐字符输入模拟
  for (let i = 0; i < email.length; i++) {
    emailInput.value = email.substring(0, i + 1);
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
  }

  // 触发失焦事件
  emailInput.blur();
  await new Promise(resolve => setTimeout(resolve, 200));

  // 等待并点击继续按钮
  const continueBtn = await waitForElementWithRetry('button[type="submit"]', 3);
  if (!continueBtn) {
    logger.log('❌ 未找到继续按钮', 'error');
    return false;
  }

  // 模拟鼠标悬停和点击
  continueBtn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  await new Promise(resolve => setTimeout(resolve, 100));

  continueBtn.click();
  logger.log('✅ 高级填写完成');
  return true;
}

// 带重试的元素等待
async function waitForElementWithRetry(selector, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const element = await waitForElement(selector, 5000);
    if (element) return element;

    logger.log(`⚠️ 第${i + 1}次查找${selector}失败，重试中...`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return null;
}

// 智能重试机制
async function retryWithDifferentStrategy() {
  logger.log('🔄 启动智能重试机制...');

  // 策略1：等待更长时间后重试
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    const success = await fillEmailSimple();
    if (success) {
      logger.log('✅ 重试成功！', 'success');
      startMainProcess();
      return;
    }
  } catch (error) {
    logger.log('❌ 重试失败: ' + error.message, 'error');
  }

  // 策略2：刷新页面后重试
  logger.log('🔄 尝试刷新页面重试...');
  window.location.reload();
}

// 简化填写策略（备用）
async function fillEmailSimple() {
  logger.log('🔄 尝试简单填写方式...');

  try {
    const email = await generateEmail();
    const emailInput = await waitForElement('input[name="username"]', 3000);
    if (!emailInput) {
      logger.log('❌ 未找到邮箱输入框');
      return false;
    }

    emailInput.value = email;
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    logger.log('📧 简单填写邮箱: ' + email);

    const continueBtn = await waitForElement('button[type="submit"]', 3000);
    if (!continueBtn) {
      logger.log('❌ 未找到提交按钮');
      return false;
    }

    continueBtn.click();
    logger.log('🚀 简单方式点击提交按钮');
    return true;
  } catch (error) {
    logger.log('❌ 简单填写出错: ' + error.message, 'error');
    return false;
  }
}

// 最后的备用方案
async function fallbackStrategy() {
  logger.log('🆘 执行最后的备用方案...');

  // 显示用户提示
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ff6b6b;
    color: white;
    padding: 15px;
    border-radius: 8px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    max-width: 300px;
  `;
  notification.textContent = '自动填写失败，请手动填写邮箱后点击继续。验证码部分仍会自动处理。';
  document.body.appendChild(notification);

  // 5秒后移除提示
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);

  // 启动监听，等待用户手动操作后自动处理后续步骤
  startMainProcess();
}

// 生成注册邮箱（统一函数，兼容旧版本调用）
function generateRandomEmail() {
  return generateEmail();
}

// 创建一个标志，用于跟踪按钮是否已添加
let buttonAdded = false;

// 使用防抖函数来限制checkUrl的调用频率
function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// 防抖处理的checkUrl函数
const debouncedCheckUrl = debounce(checkUrl, 300);

// 在页面变化时检查URL，持续监听以处理不同页面状态
const observer = new MutationObserver(() => {
  debouncedCheckUrl();
});

// 使用更精确的配置来观察DOM变化
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});

// 初始检查
setTimeout(checkUrl, 500);

// 移除旧的验证监听器，完全采用油猴脚本逻辑

// 主函数（完全复制油猴脚本逻辑）
async function main() {
  // 只在注册页面运行
  if (!window.location.href.includes('login.augmentcode.com') &&
      !window.location.href.includes('auth.augmentcode.com')) {
    return;
  }

  logger.log('开始自动注册流程...');

  // 检查当前页面状态
  const emailInput = document.querySelector('input[name="username"]');
  const codeInput = document.querySelector('input[name="code"]');
  const termsCheckbox = document.querySelector('#terms-of-service-checkbox');

  if (emailInput) {
    logger.log('检测到邮箱输入页面');
    // 油猴脚本模式：显示注册按钮，等待用户手动触发
    // 不自动执行，保持与油猴脚本一致的行为
    return;
  } else if (codeInput) {
    logger.log('检测到验证码输入页面，自动执行验证码填写...');
    try {
      if (await fillVerificationCode()) {
        logger.log('验证码填写完成，完成注册...', 'success');
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (await completeRegistration()) {
          logger.log('注册流程完成！', 'success');
        }
      }
    } catch (error) {
      logger.log('填写验证码过程出错: ' + error, 'error');
    }
  } else if (termsCheckbox) {
    logger.log('检测到服务条款页面，自动勾选同意框...');
    try {
      if (!termsCheckbox.checked) {
        termsCheckbox.click();
        logger.log('已自动勾选服务条款同意框', 'success');
      }

      // 查找并点击注册按钮
      const signupBtn = await waitForElement('button[type="button"]');
      if (signupBtn) {
        signupBtn.click();
        logger.log('点击注册按钮完成', 'success');
      }
    } catch (error) {
      logger.log('勾选服务条款过程出错: ' + error, 'error');
    }
  } else {
    logger.log('无法识别当前页面状态', 'warning');
  }
}

// 启动主函数（参考油猴脚本）
setTimeout(() => {
  main().catch(error => console.error('Augment续杯: 脚本启动出错:', error));
}, 1000);

// ==================== 油猴脚本核心函数 ====================

// 优化的日志输出系统
const logger = {
  log: function(message, type = 'info') {
    const prefix = `🔧 Augment续杯:`;

    switch(type) {
      case 'error':
        console.error(`${prefix} ❌ ${message}`);
        break;
      case 'success':
        console.log(`${prefix} ✅ ${message}`);
        break;
      case 'warning':
        console.warn(`${prefix} ⚠️ ${message}`);
        break;
      case 'step':
        console.log(`${prefix} 🔄 ${message}`);
        break;
      default:
        console.log(`${prefix} ${message}`);
    }
  }
};

// 简化的generateEmail函数 - 只按设置的位数生成随机字符
function generateEmail() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['emailDomain', 'randomLength'], function(data) {
      if (!data.emailDomain) {
        reject(new Error('未设置邮箱域名'));
        return;
      }

      // 获取随机长度设置，默认为10位
      const length = parseInt(data.randomLength) || 10;

      // 生成指定位数的随机字符串
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomPrefix = '';

      for (let i = 0; i < length; i++) {
        randomPrefix += characters.charAt(Math.floor(Math.random() * characters.length));
      }

      const email = randomPrefix + data.emailDomain;
      logger.log('生成邮箱: ' + email + ' (前缀长度: ' + length + '位)');

      // 保存到localStorage供后续使用
      localStorage.setItem('augment_email', email);

      resolve(email);
    });
  });
}

// ==================== 调试功能 ====================

/**
 * 调试页面状态
 */
function debugPageState() {
  console.log('🔍 Augment续杯: 页面状态调试');
  console.log('当前URL:', window.location.href);

  // 检查表单元素
  const form = document.querySelector('form');
  if (form) {
    console.log('📝 找到表单:', form);
    console.log('表单action:', form.action);
    console.log('表单method:', form.method);
  }

  // 检查邮箱输入框
  const emailInput = document.querySelector('input[name="username"]');
  if (emailInput) {
    console.log('📧 找到邮箱输入框:', emailInput);
    console.log('输入框类型:', emailInput.type);
    console.log('输入框值:', emailInput.value);
    console.log('输入框是否禁用:', emailInput.disabled);
  }

  // 检查提交按钮
  const submitButton = document.querySelector('button[name="action"][value="default"]');
  if (submitButton) {
    console.log('🔘 找到提交按钮:', submitButton);
    console.log('按钮文本:', submitButton.textContent);
    console.log('按钮是否禁用:', submitButton.disabled);
    console.log('按钮类型:', submitButton.type);
  }

  // 检查隐藏字段
  const hiddenInputs = document.querySelectorAll('input[type="hidden"]');
  if (hiddenInputs.length > 0) {
    console.log('🔒 找到隐藏字段:');
    hiddenInputs.forEach(input => {
      console.log(`  ${input.name}: ${input.value}`);
    });
  }
}

// ==================== 验证码自动获取功能 ====================

// 全局变量存储临时邮箱配置
let TEMP_MAIL_CONFIG = {
  username: "",
  emailExtension: "",
  epin: ""
};

// 验证码获取配置
const VERIFICATION_CONFIG = {
  maxRetries: 8,           // 最大重试次数
  retryInterval: 4000,     // 重试间隔（毫秒）
  codeRegex: /(?<![a-zA-Z@.])\b\d{6}\b/  // 6位数字验证码正则
};

/**
 * 初始化临时邮箱配置（使用新的配置结构）
 */
function initTempMailConfig() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['tempMailUsername', 'tempMailExtension', 'tempMailEpin'], function(data) {
      if (!data.tempMailUsername || !data.tempMailExtension || !data.tempMailEpin) {
        reject(new Error('未完整配置临时邮箱信息，请在扩展设置中配置用户名、后缀和PIN码'));
        return;
      }

      TEMP_MAIL_CONFIG.username = data.tempMailUsername.trim();
      TEMP_MAIL_CONFIG.emailExtension = data.tempMailExtension.trim();
      TEMP_MAIL_CONFIG.epin = data.tempMailEpin.trim();

      // 确保邮箱后缀以@开头
      if (!TEMP_MAIL_CONFIG.emailExtension.startsWith('@')) {
        TEMP_MAIL_CONFIG.emailExtension = '@' + TEMP_MAIL_CONFIG.emailExtension;
      }

      console.log('📧 Augment续杯: 临时邮箱配置已加载:', {
        username: TEMP_MAIL_CONFIG.username,
        emailExtension: TEMP_MAIL_CONFIG.emailExtension,
        epin: TEMP_MAIL_CONFIG.epin
      });
      resolve(TEMP_MAIL_CONFIG);
    });
  });
}



/**
 * 获取验证码（带重试机制）- 完全参考油猴脚本逻辑
 */
async function getVerificationCodeWithRetry(maxRetries = 5, retryInterval = 3000) {
  // 首先初始化临时邮箱配置
  await initTempMailConfig();
  console.log('✅ Augment续杯: 临时邮箱配置初始化成功');

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    console.log(`🔄 Augment续杯: 尝试获取验证码 (第 ${attempt + 1}/${maxRetries} 次)...`);

    try {
      const code = await getLatestMailCode();
      if (code) {
        console.log('✅ Augment续杯: 成功获取验证码:', code);
        return code;
      }

      if (attempt < maxRetries - 1) {
        console.log(`⏳ Augment续杯: 未获取到验证码，${retryInterval/1000}秒后重试...`);
        await new Promise(resolve => setTimeout(resolve, retryInterval));
      }
    } catch (error) {
      console.error('❌ Augment续杯: 获取验证码出错:', error);
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, retryInterval));
      }
    }
  }

  throw new Error(`经过 ${maxRetries} 次尝试后仍未获取到验证码。`);
}

/**
 * 获取最新邮件中的验证码（通过background script处理API请求）
 */
async function getLatestMailCode() {
  return new Promise((resolve) => {
    // 通过background script获取邮件列表
    chrome.runtime.sendMessage({
      action: 'getMailList',
      data: {
        username: TEMP_MAIL_CONFIG.username,
        emailExtension: TEMP_MAIL_CONFIG.emailExtension,
        epin: TEMP_MAIL_CONFIG.epin
      }
    }, async (response) => {
      if (!response.success) {
        console.error('❌ Augment续杯: 获取邮件列表失败:', response.error);
        resolve(null);
        return;
      }

      const mailListData = response.data;
      if (!mailListData.result || !mailListData.first_id) {
        console.log('📭 Augment续杯: 暂无新邮件');
        resolve(null);
        return;
      }

      const firstId = mailListData.first_id;
      console.log('📧 Augment续杯: 找到新邮件，ID:', firstId);

      // 通过background script获取邮件详情
      chrome.runtime.sendMessage({
        action: 'getMailDetail',
        data: {
          username: TEMP_MAIL_CONFIG.username,
          emailExtension: TEMP_MAIL_CONFIG.emailExtension,
          epin: TEMP_MAIL_CONFIG.epin,
          firstId: firstId
        }
      }, async (detailResponse) => {
        if (!detailResponse.success) {
          console.error('❌ Augment续杯: 获取邮件详情失败:', detailResponse.error);
          resolve(null);
          return;
        }

        const mailDetailData = detailResponse.data;
        if (!mailDetailData.result) {
          console.log('❌ Augment续杯: 获取邮件详情失败');
          resolve(null);
          return;
        }

        const mailText = mailDetailData.text || "";
        const mailSubject = mailDetailData.subject || "";

        console.log('📧 Augment续杯: 找到邮件主题:', mailSubject);

        const code = extractVerificationCode(mailText);

        // 获取到验证码后，尝试删除邮件
        if (code) {
          console.log('🎉 Augment续杯: 成功提取验证码:', code);
          try {
            await deleteEmail(firstId);
          } catch (deleteError) {
            console.warn('⚠️ Augment续杯: 删除邮件失败，但不影响验证码获取:', deleteError);
          }
        } else {
          console.log('❌ Augment续杯: 未在邮件中找到验证码');
        }

        resolve(code);
      });
    });
  });
}

/**
 * 从邮件文本中提取验证码
 */
function extractVerificationCode(mailText) {
  const codeMatch = mailText.match(VERIFICATION_CONFIG.codeRegex);
  return codeMatch ? codeMatch[0] : null;
}

/**
 * 删除邮件（通过background script处理）
 */
async function deleteEmail(firstId) {
  return new Promise((resolve) => {
    const maxRetries = 5;
    let retryCount = 0;

    function tryDelete() {
      chrome.runtime.sendMessage({
        action: 'deleteEmail',
        data: {
          username: TEMP_MAIL_CONFIG.username,
          emailExtension: TEMP_MAIL_CONFIG.emailExtension,
          epin: TEMP_MAIL_CONFIG.epin,
          firstId: firstId
        }
      }, (response) => {
        if (response.success && response.data.result === true) {
          console.log('🗑️ Augment续杯: 邮件删除成功');
          resolve(true);
          return;
        }

        // 如果还有重试次数，继续尝试
        if (retryCount < maxRetries - 1) {
          retryCount++;
          console.log(`🗑️ Augment续杯: 删除邮件失败，正在重试 (${retryCount}/${maxRetries})...`);
          setTimeout(tryDelete, 500);
        } else {
          console.log('🗑️ Augment续杯: 删除邮件失败，已达到最大重试次数');
          resolve(false);
        }
      });
    }

    tryDelete();
  });
}

/**
 * 睡眠函数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 启动主流程监听 - 专注于验证码和服务条款页面
 */
async function startMainProcess() {
  logger.log('🔄 启动后续流程监听（验证码 → 服务条款）...');

  // 设置监听器，检查页面状态变化
  const checkInterval = setInterval(async () => {
    try {
      // 只在注册页面运行
      if (!window.location.href.includes('login.augmentcode.com') &&
          !window.location.href.includes('auth.augmentcode.com')) {
        clearInterval(checkInterval);
        logger.log('页面已离开注册流程，停止监听');
        return;
      }

      // 检查验证码输入页面
      const codeInput = document.querySelector('input[name="code"]');
      if (codeInput && !codeInput.hasAttribute('data-auto-filled')) {
        logger.log('📱 检测到验证码输入页面，自动执行验证码填写...');
        codeInput.setAttribute('data-auto-filled', 'true');
        clearInterval(checkInterval);

        try {
          if (await fillVerificationCode()) {
            logger.log('验证码填写完成，等待下一页面...', 'success');
            // 重新启动监听，等待服务条款页面
            setTimeout(() => startMainProcess(), 2000);
          }
        } catch (error) {
          logger.log('填写验证码过程出错: ' + error.message, 'error');
        }
        return;
      }

      // 检查服务条款页面
      const termsCheckbox = document.querySelector('#terms-of-service-checkbox');
      if (termsCheckbox && !termsCheckbox.hasAttribute('data-auto-processed')) {
        logger.log('📋 检测到服务条款页面，自动勾选同意框...');
        termsCheckbox.setAttribute('data-auto-processed', 'true');
        clearInterval(checkInterval);

        try {
          if (await completeRegistration()) {
            logger.log('🎉 注册流程完成！', 'success');
          }
        } catch (error) {
          logger.log('勾选服务条款过程出错: ' + error.message, 'error');
        }
        return;
      }

    } catch (error) {
      logger.log('主流程监听出错: ' + error.message, 'error');
    }
  }, 1000); // 每秒检查一次

  // 10分钟后自动停止监听
  setTimeout(() => {
    clearInterval(checkInterval);
    logger.log('主流程监听超时，自动停止', 'warning');
  }, 600000);
}


