const { createProxyMiddleware } = require('http-proxy-middleware')

// restream parsed body before proxying
var restream = function (proxyRes, req, res, options) {
  proxyRes.headers['Access-Control-Allow-Origin'] = '*'
  proxyRes.headers['Access-Control-Allow-Headers'] = '*'
  proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
}

const apiProxy = createProxyMiddleware({
  target: 'https://kaifa.baidu.com/',
  changeOrigin: true,
  pathRewrite: { '^/api/proxy': '/rest/v1/search' },
  secure: false,
  onProxyRes: restream,
})


export default function handler (req, res) {
    console.log("get proxy")
  apiProxy(req, res, (result) => {
    console.log('result:', result)
    if (result instanceof Error) {
      throw result
    }
    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    )
  })
}
