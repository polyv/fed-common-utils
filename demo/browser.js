import {
  isMobile,
  isMaxthon,
  supportMSEH264
} from '@/browser';

document.getElementById('is-mobile').innerText = '是否移动端：' + isMobile();
document.getElementById('is-maxthon').innerText = '是否傲游浏览器：' + isMaxthon();
document.getElementById('support-mse-h264').innerText = '是否支持 MSE(H264)：' + supportMSEH264();
