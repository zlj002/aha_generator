const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
let tplList = require(`${__dirname}/../templates`)
const lodash = require('lodash')
const glob = require('glob')

const question = [
  {
    type: 'input',
    name: 'name',
    message: '想用什么模板生成项目，输入模板名称吧:',
    validate(val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return '模板名称是必须的!'
      } else if (!tplList[val]) {
        return '模板名称不存在.'
      }
    }
  },
  {
    type: 'input',
    name: 'project',
    message: '即将生成你的项目，先给你的项目起个好听的名字吧:',
    validate(val) {
      if (val !== '') {
        return true
      }
      return '项目名是必须的!'
    }
  },
  {
    type: 'input',
    name: 'place',
    message: '你想把项目放到哪个路径下？:',
    default: './'
  }
] 
module.exports = prompt(question).then(({ name, project, place }) => {
  var targetDir = glob.sync(`+(${project})`)
  if (targetDir != '') {
    console.error(`项目${targetDir} 已存在，请检查后再操作!`)
    process.exit(1);
  }

  const gitPlace = tplList[name]['owner/name']
  const gitBranch = tplList[name]['branch']
  const spinner = ora('正在安装...')
  spinner.start()
//   let addr = `${gitPlace}#${gitBranch}`+`${place}/${project}`
//   console.log(addr)
  download(`${gitPlace}#${gitBranch}`, `${place}/${project}`, { clone: true }, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('项目安装成功开始工作吧!'))
  })
})
