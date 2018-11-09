const successResult = res => {
  console.log('===result sucess:', res)

  let result = formateResult(0, '')
  if (res.errMsg === 'collection.get:ok') {
    result = formateResult(0, '', res.data)
  } else if (res.errMsg === 'collection.add:ok') {
    result = formateResult(0, '', res._id)
  } else if (res.errMsg === 'document.set:ok') {
    result = formateResult(0, '', res.stats)
  } else if (res.errMsg === 'document.remove:ok') {
    result = formateResult(0, '', res.stats)
  } else {
    result = formateResult(1, '=== data base operate error ===')
  }

  return result
}

const errorResult = error => {
  console.log('===result error:', error)

  return formateResult(1, error.message)
}

const formateResult = (code, msg, data) => {
  console.log('===result code msg data:', code, msg, data)

  if (data !== undefined) {
    return {
      code: code,
      msg: msg,
      detail: data
    }
  } else {
    return {
      code: code,
      msg: msg
    }
  }
}

module.exports = {
  successResult: successResult,
  errorResult: errorResult,
  formateResult: formateResult
}
