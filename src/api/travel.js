import cloud from './cloud'

class Travel {
  getCategories() {
    return cloud.get('categories')
  }

  addCategory(params) {
    return cloud.add('categories', params)
  }
}

export default new Travel()
