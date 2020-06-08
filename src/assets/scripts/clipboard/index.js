import * as Clipboard from 'clipboard';
export default (function () {
    window.addEventListener('load', () => {
        var clipboard = new Clipboard('.btn');
    });
  }());