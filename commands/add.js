const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: '请输入模板名称:',
    validate (val) {
      if (tplList[val]) {
        return '模板已存在!'
      } else if (val === '') {
        return '请填写模板名称!'
      } else {
        return true
      }
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '请输入模板git地址:',
    validate (val) {
      if (val !== '') {
        return true
      }
      return '请输入模板git地址!'
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: '请输入模板的分支:',
    default: 'master'
  }
]

module.exports = prompt(question).then(({ name, place, branch }) => {
  tplList[name] = {}
  tplList[name]['owner/name'] = place
  tplList[name]['branch'] = branch

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, '模板添加成功!')
  })
})
