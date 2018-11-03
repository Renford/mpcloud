const cates = [
  {
    cateId: 'luying',
    cateName: '露营',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_camping.png',
    equips: [
      '地布',
      '铝箔垫',
      '防潮垫',
      '帐篷',
      '睡袋',
      '帐篷灯',
      '头灯',
      '手电筒',
      '地钉'
    ]
  },
  {
    cateId: 'dengshan',
    cateName: '登山',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_mountain.png',
    equips: [
      '登山鞋',
      '登山包',
      '包罩',
      '登山杖',
      '护膝',
      '魔术头巾',
      '气罐',
      '炉头',
      '套锅',
      '垃圾袋'
    ]
  },
  {
    cateId: 'sheying',
    cateName: '摄影',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_photo.png',
    equips: [
      '相机',
      '无人机',
      '三脚架',
      '摄影包',
      '电池',
      '存储卡',
      '相机防雨罩',
      '强光'
    ]
  },
  {
    cateId: 'tubu',
    cateName: '徒步',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_walk.png',
    equips: [
      '速干衣',
      '速干裤',
      '冲锋衣',
      '袜子',
      '徒步鞋',
      '水杯',
      '背包',
      '水袋',
      '鞋套'
    ]
  },
  {
    cateId: 'qixing',
    cateName: '骑行',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_riding.png',
    equips: [
      '头盔',
      '骑行风镜',
      '骑行手套',
      '骑行服',
      '骑行裤',
      '备用内胎',
      '打气筒',
      '码表',
      '尾灯'
    ]
  },
  {
    cateId: 'youyong',
    cateName: '游泳',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_swimming.png',
    equips: ['泳装', '泳镜', '泳帽', '耳塞', '鼻夹', '浴巾']
  },
  {
    cateId: 'shatan',
    cateName: '沙滩',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_sandy.png',
    equips: ['沙滩泳衣', '沙滩裤', '沙滩巾', '拖鞋']
  },
  {
    cateId: 'huaxue',
    cateName: '滑雪',
    cateType: '1',
    iconUrl:
      'cloud://mycloud-243c6f.8d35-mycloud-243c6f/categories/icon_skiing.png',
    equips: ['雪帽', '雪衣', '雪裤', '防寒手套', '雪套']
  },
  {
    cateId: 'dianzi',
    cateName: '电子',
    cateType: '0',
    equips: [
      '手机',
      '相机',
      '耳机',
      '自拍杆',
      '手机充电器',
      '相机充电器',
      '数据线',
      '手台'
    ]
  },
  {
    cateId: 'xishu',
    cateName: '洗漱',
    cateType: '0',
    equips: [
      '牙刷',
      '牙膏',
      '毛巾',
      '洗发水',
      '沐浴露',
      '洗面奶',
      '面膜',
      '防晒霜',
      '护肤水',
      '剃须刀'
    ]
  },
  {
    cateId: 'yifu',
    cateName: '衣服',
    cateType: '0',
    equips: [
      '帽子',
      '内衣',
      '睡衣',
      '外套',
      '袜子',
      '皮带',
      '短裤',
      '裤子',
      '太阳镜',
      '隐形眼镜',
      '耳塞',
      '眼罩',
      '手套'
    ]
  },
  {
    cateId: 'siwu',
    cateName: '食物',
    cateType: '0',
    equips: [
      '士力架',
      '面包',
      '压缩饼干',
      '馒头',
      '巧克力',
      '牛肉粒',
      '果仁',
      '香蕉',
      '红牛',
      '水'
    ]
  },
  {
    cateId: 'qita',
    cateName: '其他',
    cateType: '0',
    equips: ['钥匙', '钱包', '雨伞', '指南针', '急救包']
  }
]

class CateData {
  async init() {
    const db = wx.cloud.database()

    console.log('====data init 111111')

    for (let i = 0; i < cates.length; i++) {
      const cate = cates[i]
      await db.collection('categories').add({
        data: {
          cateId: cate.cateId,
          cateName: cate.cateName,
          cateType: cate.cateType,
          iconUrl: cate.iconUrl
        }
      })

      console.log('====data init 22222', cate)

      for (let j = 0; j < cate.equips.length; j++) {
        const name = cate.equips[j]
        const res = await db
          .collection('equips')
          .where({
            name: name
          })
          .get()

        console.log('====data init 3333', res)
        if (res.data.length === 0) {
          const res = await db.collection('equips').add({
            data: {
              name: name,
              cateId: cate.cateId,
              cateName: cate.cateName
            }
          })
          console.log('====add equip success', res)
        } else {
          console.log('====exsit', name)
        }
      }
    }

    console.log('====data init 4444')
  }
}

export default new CateData()
