// 数字格式化
function formateNumber(num, length) {
  return ('' + num).length < length
    ? (new Array(length + 1).join('0') + num).slice(-length)
    : '' + num
}

function formateDate(date, formate = 'yyyy-MM-dd HH:mm:ss') {
  var result = formate

  result = result.replace('yyyy', date.getFullYear())
  var fullYear = '' + date.getFullYear()
  result = result.replace('yy', fullYear.substr(fullYear.length - 2, 2))
  result = result.replace('MM', formateNumber(date.getMonth() + 1, 2))
  result = result.replace('dd', formateNumber(date.getDate(), 2))
  result = result.replace('HH', formateNumber(date.getHours(), 2))
  result = result.replace('mm', formateNumber(date.getMinutes(), 2))
  result = result.replace('ss', formateNumber(date.getSeconds(), 2))
  result = result.replace('hhh', formateNumber(date.getMilliseconds(), 3))

  return result
}

function formateTimestamp(time, formate = 'yyyy-MM-dd HH:mm:ss') {
  let date = new Date(time * 1000)
  return formateDate(date, formate)
}

function changeColor(value) {
  return value < 0 ? '#17b03e' : '#eb333b'
}

function changeBgColor(value) {
  return value < 0 ? '#f8fff6' : '#fff8f8'
}

function dateArray2PickerValue(dates) {
  let result = []

  dates.forEach(dateStr => {
    let date = parseInt(dateStr)
    let year = parseInt(date / 10000)
    let month = parseInt((date % 10000) / 100)
    let day = parseInt(date % 100)

    let tempYear = result.pop()
    if (tempYear === undefined || tempYear.label !== year) {
      if (tempYear !== undefined) {
        result.push(tempYear)
      }

      tempYear = {
        label: year,
        value: 0,
        children: [
          {
            label: month,
            value: 0,
            children: [
              {
                label: day,
                value: 0
              }
            ]
          }
        ]
      }
    } else {
      let tempMonth = tempYear.children.pop()
      if (tempMonth.label === month) {
        tempMonth.children.push({
          label: day,
          value: 0
        })
        tempYear.children.push(tempMonth)
      } else {
        tempYear.children.push(tempMonth)
        tempYear.children.push({
          label: month,
          value: 0,
          children: [
            {
              label: day,
              value: 0
            }
          ]
        })
      }
    }

    result.push(tempYear)
  })

  return result
}

function isPhoneAvailable(phone) {
  var reg = /^[1][3,4,5,7,8][0-9]{9}$/
  return reg.test(phone)
}

export default {
  formateNumber,
  formateDate,
  formateTimestamp,
  changeColor,
  changeBgColor,
  dateArray2PickerValue,
  isPhoneAvailable
}
