import cloud from './cloud'

class Travel {
  getCategories() {
    return cloud.get('categories')
  }
}

export default new Travel()
