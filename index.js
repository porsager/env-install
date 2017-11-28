#! /usr/bin/env node

const path = require('path')
    , packageJson = require(path.join(process.cwd(), 'package.json'))
    , childProcess = require('child_process')

const deps = packageJson.envDependencies

Object.keys(deps).map(key => deps[key]).map(insertEnvironmentVariables).forEach(pkg => {
  try {
    childProcess.execSync('npm install --no-save' + pkg, { stdio:[0, 1, 2] })
  } catch (e) { }
})

function insertEnvironmentVariables(pkg) {
  Object.keys(process.env).forEach(key => {
    pkg = pkg.replace('${' + key + '}', process.env[key])
  })

  return pkg
}
