module.exports = {
  // 格式化日期
  // getDate() {
  //   // 例：date1--2021/1/21  date2--下午8:11:45
  //   const date1 = new Date().toLocaleDateString()
  //   let date2 = new Date().toLocaleTimeString()
  //   const temp = date2.slice(0, 2) // 上午或下午
  //   const index = date2.indexOf(':') // 第一个:所在位置
  //   if (temp === '上午') {
  //     date2 = date2.replace(temp, '')
  //   } else {
  //     const hour = date2.slice(2, index)
  //     date2 = date2.replace(temp + hour, parseInt(hour) + 12)
  //   }
  //   return date1 + ' ' + date2
  // }
  getDate () {
    const date1 = new Date().toLocaleDateString()
    let date2 = new Date().toTimeString()
    date2 = date2.slice(0, 8)
    return date1 + ' ' + date2
  }
}
