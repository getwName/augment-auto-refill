// 弹出窗口脚本
document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const emailDomainInput = document.getElementById('emailDomain');
  const tempMailUsernameInput = document.getElementById('tempMailUsername');
  const tempMailExtensionInput = document.getElementById('tempMailExtension');
  const tempMailEpinInput = document.getElementById('tempMailEpin');
  const randomLengthInput = document.getElementById('randomLength');
  const saveButton = document.getElementById('saveButton');
  const getCodeButton = document.getElementById('getCodeButton');
  const verificationCodeSpan = document.getElementById('verificationCode');
  const statusMessage = document.getElementById('statusMessage');
  const link = document.querySelector('a');
  const increaseBtn = document.getElementById('increaseBtn');
  const decreaseBtn = document.getElementById('decreaseBtn');
  const currentValue = document.getElementById('currentValue');

  // 更新当前值显示
  function updateCurrentValue() {
    const value = randomLengthInput.value.trim();
    if (value) {
      currentValue.textContent = value + '位';
    } else {
      currentValue.textContent = '12位(默认)';
    }
  }

  // 从存储中加载保存的设置
  chrome.storage.sync.get(['emailDomain', 'tempMailUsername', 'tempMailExtension', 'tempMailEpin', 'randomLength'], function(result) {
    console.log('加载保存的设置:', result);

    if (result.emailDomain) {
      emailDomainInput.value = result.emailDomain;
    }

    if (result.tempMailUsername) {
      tempMailUsernameInput.value = result.tempMailUsername;
    }

    if (result.tempMailExtension) {
      tempMailExtensionInput.value = result.tempMailExtension;
    }

    if (result.tempMailEpin) {
      tempMailEpinInput.value = result.tempMailEpin;
    }

    // 设置随机字符串位数
    if (result.randomLength) {
      randomLengthInput.value = result.randomLength;
    }

    // 初始化显示当前值
    updateCurrentValue();
  });

  // 增加按钮点击事件
  increaseBtn.addEventListener('click', function() {
    const currentVal = parseInt(randomLengthInput.value) || 0;
    if (currentVal < 32) {
      randomLengthInput.value = currentVal + 1;
      updateCurrentValue();
    }
  });

  // 减少按钮点击事件
  decreaseBtn.addEventListener('click', function() {
    const currentVal = parseInt(randomLengthInput.value) || 2;
    if (currentVal > 1) {
      randomLengthInput.value = currentVal - 1;
      updateCurrentValue();
    }
  });

  // 输入框值变化事件
  randomLengthInput.addEventListener('input', updateCurrentValue);

  // 保存按钮点击事件
  saveButton.addEventListener('click', function() {
    let domain = emailDomainInput.value.trim();
    let tempMailUsername = tempMailUsernameInput.value.trim();
    let tempMailExtension = tempMailExtensionInput.value.trim();
    let tempMailEpin = tempMailEpinInput.value.trim();
    let length = randomLengthInput.value.trim();

    // 验证必填字段
    if (!domain) {
      statusMessage.textContent = '请输入注册邮箱域名';
      statusMessage.style.color = '#f44336';
      return;
    }

    if (!tempMailUsername) {
      statusMessage.textContent = '请输入临时邮箱用户名';
      statusMessage.style.color = '#f44336';
      return;
    }

    if (!tempMailExtension) {
      statusMessage.textContent = '请输入临时邮箱后缀';
      statusMessage.style.color = '#f44336';
      return;
    }

    if (!tempMailEpin) {
      statusMessage.textContent = '请输入临时邮箱PIN码';
      statusMessage.style.color = '#f44336';
      return;
    }

    // 验证域名格式
    if (!domain.startsWith('@')) {
      domain = '@' + domain;
    }

    // 验证临时邮箱后缀格式
    if (!tempMailExtension.startsWith('@')) {
      tempMailExtension = '@' + tempMailExtension;
    }

    // 验证随机字符串位数
    if (length && (isNaN(length) || parseInt(length) < 1 || parseInt(length) > 32)) {
      statusMessage.textContent = '请输入1-32之间的有效位数';
      statusMessage.style.color = '#f44336';
      return;
    }

    // 准备要保存的数据
    const dataToSave = {
      emailDomain: domain,
      tempMailUsername: tempMailUsername,
      tempMailExtension: tempMailExtension,
      tempMailEpin: tempMailEpin
    };

    // 如果用户设置了位数，则保存
    if (length) {
      dataToSave.randomLength = length;
    }

    // 保存到Chrome存储
    chrome.storage.sync.set(dataToSave, function() {
      console.log('设置已保存:', dataToSave);

      statusMessage.textContent = '设置已保存 - 临时邮箱配置完成';
      statusMessage.style.color = '#4caf50';

      // 更新显示
      updateCurrentValue();

      // 3秒后清除状态消息
      setTimeout(function() {
        statusMessage.textContent = '';
      }, 3000);
    });
  });

  // 获取验证码按钮点击事件
  getCodeButton.addEventListener('click', async function() {
    const tempMailUsername = tempMailUsernameInput.value.trim();
    const tempMailExtension = tempMailExtensionInput.value.trim();
    const tempMailEpin = tempMailEpinInput.value.trim();

    console.log('🔘 [弹窗] 获取验证码按钮被点击');
    console.log('📧 [弹窗] 临时邮箱配置:', { tempMailUsername, tempMailExtension, tempMailEpin });

    if (!tempMailUsername) {
      statusMessage.textContent = '请先配置临时邮箱用户名';
      statusMessage.style.color = '#f44336';
      console.log('❌ [弹窗] 临时邮箱用户名为空');
      return;
    }

    if (!tempMailExtension) {
      statusMessage.textContent = '请先配置临时邮箱后缀';
      statusMessage.style.color = '#f44336';
      console.log('❌ [弹窗] 临时邮箱后缀为空');
      return;
    }

    if (!tempMailEpin) {
      statusMessage.textContent = '请先配置临时邮箱PIN码';
      statusMessage.style.color = '#f44336';
      console.log('❌ [弹窗] 临时邮箱PIN码为空');
      return;
    }

    // 检查网络权限
    console.log('🔒 [弹窗] 检查扩展权限...');
    try {
      const permissions = await chrome.permissions.getAll();
      console.log('🔒 [弹窗] 当前权限:', permissions);
    } catch (error) {
      console.warn('⚠️ [弹窗] 无法获取权限信息:', error);
    }

    // 禁用按钮，显示加载状态
    getCodeButton.disabled = true;
    getCodeButton.textContent = '获取中...';
    verificationCodeSpan.style.display = 'inline-block';
    verificationCodeSpan.textContent = '获取中...';
    verificationCodeSpan.style.color = '#666';

    try {
      console.log('🔍 [弹窗] 开始获取验证码');
      console.log('📧 [弹窗] 临时邮箱配置:', { tempMailUsername, tempMailExtension, tempMailEpin });

      const code = await getVerificationCodeWithRetry(tempMailUsername, tempMailExtension, tempMailEpin);
      if (code) {
        verificationCodeSpan.textContent = code;
        verificationCodeSpan.style.color = '#1565c0';
        statusMessage.textContent = '验证码获取成功！';
        statusMessage.style.color = '#4caf50';
        console.log('🎉 [弹窗] 验证码获取成功:', code);
      } else {
        verificationCodeSpan.textContent = '未获取到';
        verificationCodeSpan.style.color = '#f44336';
        statusMessage.textContent = '未获取到验证码，请稍后重试';
        statusMessage.style.color = '#f44336';
        console.log('❌ [弹窗] 未获取到验证码');
      }
    } catch (error) {
      verificationCodeSpan.textContent = '获取失败';
      verificationCodeSpan.style.color = '#f44336';
      statusMessage.textContent = '获取验证码失败: ' + error.message;
      statusMessage.style.color = '#f44336';
      console.error('❌ [弹窗] 获取验证码失败:', error);
      console.error('❌ [弹窗] 错误堆栈:', error.stack);
    } finally {
      // 恢复按钮状态
      getCodeButton.disabled = false;
      getCodeButton.textContent = '获取验证码';

      // 3秒后清除状态消息
      setTimeout(function() {
        statusMessage.textContent = '';
      }, 3000);
    }
  });

  // 添加点击事件，在新标签页中打开链接
  if (link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      chrome.tabs.create({ url: this.href });
    });
  }
});

// ==================== 验证码获取API功能 ====================

/**
 * 带重试机制的验证码获取
 */
async function getVerificationCodeWithRetry(username, emailExtension, epin, maxRetries = 5, retryInterval = 3000) {
  console.log(`🔄 [弹窗] 开始重试机制，最多${maxRetries}次，间隔${retryInterval/1000}秒`);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`🔄 [弹窗] 尝试获取验证码 (第 ${attempt}/${maxRetries} 次)`);

    try {
      const code = await getLatestMailCode(username, emailExtension, epin);
      if (code) {
        console.log(`✅ [弹窗] 第 ${attempt} 次尝试成功获取验证码: ${code}`);
        return code;
      }

      if (attempt < maxRetries) {
        console.log(`⏳ [弹窗] 第 ${attempt} 次尝试未获取到验证码，${retryInterval/1000}秒后重试...`);
        await sleep(retryInterval);
      }
    } catch (error) {
      console.error(`❌ [弹窗] 第 ${attempt} 次尝试出错:`, error);
      console.error(`❌ [弹窗] 错误详情:`, error.message);
      if (attempt < maxRetries) {
        console.log(`⏳ [弹窗] ${retryInterval/1000}秒后重试...`);
        await sleep(retryInterval);
      }
    }
  }

  console.log(`❌ [弹窗] 经过 ${maxRetries} 次尝试后仍未获取到验证码`);
  return null;
}

/**
 * 获取最新邮件中的验证码（参考油猴脚本逻辑）
 */
async function getLatestMailCode(username, emailExtension, epin) {
  return new Promise((resolve, reject) => {
    const mailListUrl = `https://tempmail.plus/api/mails?email=${username}${emailExtension}&limit=20&epin=${epin}`;

    console.log('📬 [弹窗] 请求邮件列表URL:', mailListUrl);
    console.log('📬 [弹窗] 请求参数:', { username, emailExtension, epin });

    fetch(mailListUrl)
      .then(response => {
        console.log('🌐 [弹窗] 邮件列表响应状态:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(async mailListData => {
        console.log('📬 [弹窗] 邮件列表数据:', mailListData);

        if (!mailListData.result || !mailListData.first_id) {
          console.log('📭 [弹窗] 暂无新邮件');
          resolve(null);
          return;
        }

        const firstId = mailListData.first_id;
        console.log('📧 [弹窗] 找到新邮件，ID:', firstId);

        const mailDetailUrl = `https://tempmail.plus/api/mails/${firstId}?email=${username}${emailExtension}&epin=${epin}`;
        console.log('📄 [弹窗] 请求邮件详情URL:', mailDetailUrl);

        try {
          const mailDetailResponse = await fetch(mailDetailUrl);

          if (!mailDetailResponse.ok) {
            throw new Error(`HTTP ${mailDetailResponse.status}: ${mailDetailResponse.statusText}`);
          }

          const mailDetailData = await mailDetailResponse.json();
          console.log('📄 [弹窗] 邮件详情数据:', mailDetailData);

          if (!mailDetailData.result) {
            console.log('❌ [弹窗] 获取邮件详情失败');
            resolve(null);
            return;
          }

          const mailText = mailDetailData.text || "";
          const mailSubject = mailDetailData.subject || "";

          console.log('📧 [弹窗] 邮件主题:', mailSubject);
          console.log('📄 [弹窗] 邮件内容预览:', mailText.substring(0, 200) + '...');

          const code = extractVerificationCode(mailText);

          // 获取到验证码后，尝试删除邮件
          if (code) {
            console.log('🎉 [弹窗] 成功提取验证码:', code);
            try {
              await deleteEmail(username, emailExtension, firstId, epin);
            } catch (deleteError) {
              console.warn('⚠️ [弹窗] 删除邮件失败，但不影响验证码获取:', deleteError);
            }
          } else {
            console.log('❌ [弹窗] 未在邮件中找到验证码');
            console.log('📄 [弹窗] 完整邮件内容:', mailText);
          }

          resolve(code);
        } catch (error) {
          console.error('❌ [弹窗] 获取邮件详情出错:', error);
          resolve(null);
        }
      })
      .catch(error => {
        console.error('❌ [弹窗] 获取邮件列表失败:', error);
        resolve(null);
      });
  });
}

/**
 * 从邮件文本中提取验证码
 */
function extractVerificationCode(mailText) {
  const codeMatch = mailText.match(/(?<![a-zA-Z@.])\b\d{6}\b/);
  return codeMatch ? codeMatch[0] : null;
}

/**
 * 删除邮件（参考油猴脚本逻辑）
 */
async function deleteEmail(username, emailExtension, firstId, epin) {
  return new Promise((resolve) => {
    const deleteUrl = 'https://tempmail.plus/api/mails/';
    const maxRetries = 5;
    let retryCount = 0;

    function tryDelete() {
      const formData = new URLSearchParams();
      formData.append('email', `${username}${emailExtension}`);
      formData.append('first_id', firstId);
      formData.append('epin', epin);

      console.log('🗑️ [弹窗] 尝试删除邮件，参数:', { username, emailExtension, firstId, epin });

      fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      })
      .then(response => response.json())
      .then(result => {
        console.log('🗑️ [弹窗] 删除邮件响应:', result);

        if (result.result === true) {
          console.log('🗑️ [弹窗] 邮件删除成功');
          resolve(true);
          return;
        }

        // 如果还有重试次数，继续尝试
        if (retryCount < maxRetries - 1) {
          retryCount++;
          console.log(`🗑️ [弹窗] 删除邮件失败，正在重试 (${retryCount}/${maxRetries})...`);
          setTimeout(tryDelete, 500);
        } else {
          console.log('🗑️ [弹窗] 删除邮件失败，已达到最大重试次数');
          resolve(false);
        }
      })
      .catch(error => {
        if (retryCount < maxRetries - 1) {
          retryCount++;
          console.log(`🗑️ [弹窗] 删除邮件出错，正在重试 (${retryCount}/${maxRetries})...`, error);
          setTimeout(tryDelete, 500);
        } else {
          console.error('🗑️ [弹窗] 删除邮件失败:', error);
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
