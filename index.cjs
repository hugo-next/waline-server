const Application = require('@waline/vercel');
const fetch = require('node-fetch');

module.exports = Application({
  region: false,   // 关闭内置解析

  async postSave(comment) {
    try {
      if (comment.ip) {
        const res = await fetch(`http://ip-api.com/json/${comment.ip}?fields=61439`);
        const data = await res.json();
        comment.addr = `${data.regionName || ''} ${data.country || ''} ${data.city || ''}`;
      }
    } catch (e) {
      console.error('IP resolve failed:', e);
    }

    return comment;
  },
});