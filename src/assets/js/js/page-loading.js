function pageLoading(){
  const elPageLoadingWrap = document.querySelector('.page-loading-wrap');
  const elPageWrap = document.querySelector('.page-wrap');
  elPageLoadingWrap.classList.add('page-loading-wrap-off');
  elPageWrap.classList.add('page-wrap-open');
}
window.addEventListener('load', pageLoading);