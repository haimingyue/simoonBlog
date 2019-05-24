const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取path 
  const url = req.url;
  req.path = url.split('?')[0]
  // 解析query
  req.query = querystring.parse(url.split('?')[1])


  // 用于处理postData， 用promise来解析
  const getPostData = (req) => {
    
    const promise = new Promise((resolve, reject) => {
      if (req.method !== 'POST') {
        resolve({})
        return
      }
      if (req.headers['content-type'] !== 'application/json') {
        resolve({})
        return
      }
  
      let postData = '';
      req.on('data', chunk => {
        postData += chunk.toString();
      })
      req.on('end', () => {
        console.log('end')
        if(!postData) {
          resolve({})
          return
        }
        // 返回
        resolve(
          JSON.parse(postData)
        )
      })
    })
    return promise;
  }
  
  // 处理postData 

  getPostData(req).then(postData => {
    console.log('postData', postData)
    // 如果符合postdata的条件，postData就有值，否则就没有值
    req.body = postData

    // 处理blog 路由
    const blogDate = handleBlogRouter(req, res);
    if(blogDate) {
      res.end(
        JSON.stringify(blogDate)
      )
      return;
    }

    const userDate = handleUserRouter(req, res);
    if(userDate) {
      res.end(
        JSON.stringify(userDate)
      )
      return;
    }

    res.writeHead('404', {'Content-type': 'text/plan'})
    res.write('404 Not Found\n')
    res.end()
  })
  
}

module.exports = serverHandle