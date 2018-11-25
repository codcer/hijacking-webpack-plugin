class HijackingPlugin {
  // 在构造函数中获取传入的配置
  constructor(options = {
    id: 'app', // 自定义插入脚本位置
    head: [],
    body: [],
    isRejectJACK: false,
    filterTags: ['script', 'iframe'],
    whiteURLS: [],
    fn: null
  }){
    this.options = options;
  }

  _genScript (arr, htmlData, targetStr) {
    let tplSRT = '';
    arr.forEach(script => {
      let scriptArrSTR = [
        '<script'
      ];

      for(let attr in script) {
        if(script[attr] && attr !== 'defer' && attr !== 'async') {
          scriptArrSTR.push(`${attr}="${script[attr]}"`);
        }

        if(script[attr] && (attr === 'defer' || attr === 'async')) {
          scriptArrSTR.push(`${attr}`);
        }
      }

      scriptArrSTR.push('></script>');
      let _scriptSTR = scriptArrSTR.join(' ');
      tplSRT += _scriptSTR + '\n';
    });
    htmlData.html = htmlData.html.replace(`</${targetStr}>`, `${tplSRT}</${targetStr}>`);
  }

  // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply (compiler) {
    // console.log(compiler); compiler为webpack配置信息 | 先指定自己编译，根据别人的编译结果操作
    compiler.plugin('compilation', compilation => {
      // console.log(compilation); // 自己插件行为处理
      const { head, body, isRejectJACK, whiteURLS, filterTags } = this.options;

      // html-webpack-plugin编译的入口
      compilation.plugin('html-webpack-plugin-before-html-processing', (htmlData, callback) => {
        if(isRejectJACK) {
          htmlData.html = htmlData.html.replace('<head>', `<head><script fl2294-eddy>
          (function(){var _filterTags="${filterTags}",_whiteURLS="${whiteURLS}";var srcFilterTags=_filterTags&&_filterTags.split(",")||[];var whiteList=_whiteURLS&&_whiteURLS.split(",")||[];var whiteListReg=[];whiteList.forEach(function(wl){var wlReg=new RegExp("/.+?//"+wl+"|//"+wl+"|.+?."+wl+"|^"+wl);whiteListReg.push(wlReg)});var inWhileList=function(addedNode){if(addedNode.src===""&&addedNode.getAttribute("fl2294-eddy")!==null){return true}var isInWhiteList=false;whiteListReg.forEach(function(wlReg){if(wlReg.test(addedNode.src)){isInWhiteList=true}});return isInWhiteList};var mutationHandler=function(records){records.forEach(function(record){Array.prototype.slice.call(record.addedNodes).forEach(function(addedNode){srcFilterTags.forEach(function(tagName){if(addedNode.tagName===tagName.toUpperCase()&&!inWhileList(addedNode)){addedNode.remove()}})})})};var MutationObserver=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,observeMutationSupport=!!MutationObserver;var html=document.getElementsByTagName("html")[0];if(observeMutationSupport){new MutationObserver(mutationHandler).observe(html,{"childList":true,"subtree":true})}})();
          </script>`);
        }

        if(head && head.length) {
          this._genScript(head, htmlData, 'head');
        }
        if(body && body.length) {
          this._genScript(body, htmlData, 'body');
        }
        callback(null, htmlData);
      });
    });
  }
}

export default HijackingPlugin;
