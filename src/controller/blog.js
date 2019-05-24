const getList = (author, keyword) => {
  // 先返回假数据（格式是正确的）

  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1546610491112,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1546610491112,
      author: 'zhanglisesan'
    }
  ]
}


const getDetail = (id) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1546610491112,
      author: 'zhangsan'
    }
  ]
}

const newBlog = (blogData = {}) => {
  console.log('new Blog',  blogData)
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  console.log(id, blogData)

  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}