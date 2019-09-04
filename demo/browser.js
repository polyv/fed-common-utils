import * as browser from '@/browser';

let html = '';
['isMobile', 'isWeixin', 'ieVersion'].forEach((method) => {
  html += '<p>' + method + ': ' + browser[method]() + '</p>';
});
document.getElementById('result').innerHTML = html;
