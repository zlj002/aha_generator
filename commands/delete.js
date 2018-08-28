const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: '输入你想删除的模板名称:',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return '请输入模板名称!'
      } else if (!tplList[val]) {
        return '模板不存在.'
      }
    }
  }
]

module.exports = prompt(question).then(({ name }) => {
  delete tplList[name]

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, '模板删除成功!')
  })
})
