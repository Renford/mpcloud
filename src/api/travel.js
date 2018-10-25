import cloud from './cloud'

class Travel {
  getCategories() {
    return cloud.get('categories')
  }

  addCategory(params) {
    return cloud.add('categories', params)
  }

  getEquips(type) {
    return cloud.get('equipments', { type: type })
  }

  addEquip(equip) {
    return cloud.add('equipments', equip)
  }
}

export default new Travel()
