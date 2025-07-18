// 后台脚本，用于管理扩展的生命周期
chrome.runtime.onInstalled.addListener(() => {
  console.log('Augment续杯扩展已安装');
});

// 监听来自内容脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'log') {
    console.log('来自内容脚本的消息:', request.data);
    return true;
  }

  if (request.action === 'getMailList') {
    getMailList(request.data)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // 保持消息通道开放
  }

  if (request.action === 'getMailDetail') {
    getMailDetail(request.data)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (request.action === 'deleteEmail') {
    deleteEmail(request.data)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});

// 获取邮件列表
async function getMailList({ username, emailExtension, epin }) {
  const mailListUrl = `https://tempmail.plus/api/mails?email=${username}${emailExtension}&limit=20&epin=${epin}`;

  try {
    const response = await fetch(mailListUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('获取邮件列表失败:', error);
    throw error;
  }
}

// 获取邮件详情
async function getMailDetail({ username, emailExtension, epin, firstId }) {
  const mailDetailUrl = `https://tempmail.plus/api/mails/${firstId}?email=${username}${emailExtension}&epin=${epin}`;

  try {
    const response = await fetch(mailDetailUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('获取邮件详情失败:', error);
    throw error;
  }
}

// 删除邮件
async function deleteEmail({ username, emailExtension, epin, firstId }) {
  const deleteUrl = 'https://tempmail.plus/api/mails/';
  const formData = new URLSearchParams();
  formData.append('email', `${username}${emailExtension}`);
  formData.append('first_id', firstId);
  formData.append('epin', epin);

  try {
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('删除邮件失败:', error);
    throw error;
  }
}