# 向HTML模板文件注入js脚本
## 注意：一定要放在html-webpack-plugin之后执行，否则会被覆盖 

###基本使用 1
```
const HijackingPlugin = require('./hijacking-webpack-plugin');

new HijackingPlugin({
    head: [
        {src: '/static/tinymce/tinymce.min2cs1.js', defer: true},
        {src: '/static/tinymce/tinymce.min2cs2.js', async: true},
        {src: '/static/tinymce/tinymce.min2cs3.js', defer: true},
    ],
    body: [
        {src: '/static/tinymce/tinymce.min2cs1.js', defer: true},
        {src: '/static/tinymce/tinymce.min2cs2.js', async: true},
        {src: '/static/tinymce/tinymce.min2cs3.js', defer: true},
    ]
})
```
### dns http防劫持 2

```
new HijackingPlugin({
    head: [
        {src: '/static/tinymce/tinymce.min2cs1.js', defer: true},
        {src: '/static/tinymce/tinymce.min2cs2.js', async: true},
        {src: '/static/tinymce/tinymce.min2cs3.js', defer: true},
    ],
    body: [
        {src: '/static/tinymce/tinymce.min2cs1.js', defer: true},
        {src: '/static/tinymce/tinymce.min2cs2.js', async: true},
        {src: '/static/tinymce/tinymce.min2cs3.js', defer: true},
    ],
    filterTags: ['script', 'iframe'], //过滤标签
    whiteURLS: [], // 白名单url：'baidu.com' | 'jquery.com'
    isRejectJACK: true // 开启劫持防护
})

```
    注：开启防劫持后，会针对您配的filterTags（过滤标签组）进行移除， 只要动态有元素插入进来，都会监控到并将其remove
    具体业务场景，具体使用

### 兼容性 ie11+ firefox/chrome 18+ safri 6+ android 4.4+ ios6+ ...
后期功能迭代：next -> 自定义插入脚本代码配置, 自定义过滤script标签支持属性, 目前功能会过滤掉除fl2294 script之外的标签，不过也可以结合html-webpack-plugin打包时移除script等
  欢迎大家issue、bug