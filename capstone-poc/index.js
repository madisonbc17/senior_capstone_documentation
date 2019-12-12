const express = require('express');
const { exec:spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const app = express();
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);
let porter = {};
const porterDir = path.resolve(os.homedir(),'.porter/claims')

fs.watch(porterDir, async (event, file) => {
  bundleName = path.basename(file,'.json');
  const fullFile = path.resolve(porterDir,file)
  if(fs.existsSync(fullFile)) {
    contents = await readFile(fullFile)
    porter[bundleName] = JSON.parse(contents.toString())
  }
  else {
    delete porter[bundleName]
  }
})
app.use(express.static('public'));
app.get('/api', (req,res) => {
  res.json(porter)
})

// Routes to run porter commands in background. Used in v1 of the demo
// app.post('/api/:name/install', (req,res,next) => {
//   spawn(`porter install ${req.params.name} --tag deislabs/porter-hello-bundle:latest`)
//   res.sendStatus(200);
// })
// app.post('/api/:name/upgrade', (req,res,next) => {
//   spawn(`porter upgrade ${req.params.name}`)
//   res.sendStatus(200);
// })
// app.post('/api/:name/remove', (req,res,next) => {
//   spawn(`porter uninstall ${req.params.name}`)
//   res.sendStatus(200);
// })


app.listen(5000)