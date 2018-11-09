import cloud from './cloud'

class Travel {
  getCategories(ids) {
    let params = {
      ids: ids
    }
    return cloud.callFunction('getCates', params).then(res => {
      return res
    })
  }

  addCategory(cate) {
    return cloud.add('categories', cate)
  }
}

export default new Travel()
