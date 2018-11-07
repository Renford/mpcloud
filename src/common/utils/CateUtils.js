const CategoriesKey = 'CategoriesKey'

class CateUtils {
  cates = []
  _baseCateIds = []
  _sortCateIds = []

  // 保存缓存
  saveCates(cates) {
    this.cates = cates
    wx.setStorage({
      key: CategoriesKey,
      data: cates
    })
  }

  // 加载缓存
  loadStorage() {
    const that = this
    wx.getStorage({
      key: CategoriesKey,
      success: res => {
        that.cates = res.data
      }
    })
  }

  // 基础装备类型Id
  getBaseCateIds() {
    if (this._baseCateIds.length === 0) {
      this._baseCateIds = this.cates
        .filter(cate => {
          return cate.cateType !== '1'
        })
        .map(cate => {
          return cate.cateId
        })
    }

    return this._baseCateIds
  }

  // 有序装备类型Id
  getSortCateIds() {
    if (this._sortCateIds.length === 0) {
      this._sortCateIds = this.cates.map(cate => {
        return cate.cateId
      })
    }
    return this._sortCateIds
  }

  // Equips数组 ——> 有序Cate数组
  getSortCatesFromEquips(equips) {
    if (equips === undefined || equips.length === 0) {
      return []
    }

    const obj = {}
    equips.forEach(equip => {
      if (obj[equip.cateId] === undefined) {
        obj[equip.cateId] = [equip]
      } else {
        obj[equip.cateId] = [...obj[equip.cateId], equip]
      }
    })

    return this.getSortCateIds()
      .filter(cateId => {
        return obj[cateId] !== undefined
      })
      .map(cateId => {
        return {
          cateId: cateId,
          cateName: obj[cateId][0].cateName,
          equips: obj[cateId]
        }
      })
  }
}

export default new CateUtils()
