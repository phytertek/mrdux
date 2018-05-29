const { spawn } = require('child_process');
const fs = require('fs');
const compileTs = spawn('tsc');
const cwd = __dirname;
const moveToBuild = () => {
  const move = spawn(`mv`, ['./src/*.js', './']);
  move.stderr.on('data', data => console.error(data.toString()));
  move.on('close', () => console.log('Compile Complete'));
};

compileTs.on('close', () => moveToBuild());
