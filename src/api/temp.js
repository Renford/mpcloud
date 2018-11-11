import cloud from './cloud'
import config from './config'

class Temp {
  addTemp(temp) {
    let params = {
      type: 1,
      temp: temp
    }
    return cloud.callFunction('temps', params)
  }

  delTemp(tempId) {
    let params = {
      type: 2,
      tempId: tempId
    }
    return cloud.callFunction('temps', params)
  }

  updateTemp(temp) {
    let params = {
      type: 3,
      temp: temp
    }
    return cloud.callFunction('temps', params)
  }

  getTemps(ids) {
    let params = {
      type: 4,
      ids: ids,
      count: config.pageSize
    }
    return cloud.callFunction('temps', params)
  }
}

export default new Temp()
