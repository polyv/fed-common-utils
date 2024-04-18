import {
  isMobile,
  hasMobileFeature,
  isMaxthon,
  supportMSEH264
} from '@/browser';

document.getElementById('is-mobile').innerText = '是否移动端：' + isMobile();
document.getElementById('has-mobile-feature').innerText = '是否有移动端特征：' + hasMobileFeature();
document.getElementById('is-maxthon').innerText = '是否傲游浏览器：' + isMaxthon();
document.getElementById('support-mse-h264').innerText = '是否支持 MSE(H264)：' + supportMSEH264();
