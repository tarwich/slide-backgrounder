'use strict';

/**
 * This program requires node.js@>6. It _might_ work on nodejs@>4
 */

// Libraries
const childProcess = require('child_process');
const minimist     = require('minimist');
const path         = require('path');

// Variables
let args       = minimist(process.argv.slice(2));
let parameters = [];

if (!args._[0]) {
  console.error('Missing <SRC> parameter!');
  args.help = true;
}

if (!args._[1]) {
  console.error('Missing <SRC> parameter!');
  args.help = true;
}

// -----[ Help ]--------------------------------------------------
if (args.help) {
  let invocation = process.argv.slice(0, 2).join(' ');
  console.log([
    'Usage: ' + invocation + ' <SRC> [options] <DEST>',
    '',
    'options:',
    '  --blur:   Blur the image - optionally by an amount (default: 24)',
    '  --fade:   Fade the image - optionally by an amount (default: 70)',
    '  --crop:   Crop the image (##x##+##+##) (ie 100x100+100+100)',
    '  --center: Makes the crop operation happen from the center of the image',
    '  --resize: Resize the image <width>x<height>',
  ].join('\n'));
  process.exit(0);
}

// -----[ Source Image ]--------------------------------------------------
parameters.push(path.resolve(args._[0]));
// -----[ Resize ]--------------------------------------------------
if (args.resize) parameters.push('-resize', `${args.resize}^`);
// -----[ Center ]--------------------------------------------------
if (args.center) parameters.push('-gravity', 'center');
// -----[ Crop ]--------------------------------------------------
if (args.crop) parameters.push('-crop', args.crop);
// -----[ Blur ]--------------------------------------------------
if (args.blur === true) args.blur = '24';
if (args.blur) parameters.push('-blur', `0x${args.blur}`);
// -----[ Fade ]--------------------------------------------------
if (args.fade === true) args.fade = '70';
if (args.fade) {
  parameters.push(
    '(', '+clone', '-fill', 'black', '-colorize', args.fade, ')',
    '-compose', 'multiply', '-composite'
  );
}
// -----[ Destination Image ]--------------------------------------------------
parameters.push(path.resolve(args._[1]));

// Run!
console.log('convert', parameters.join(' '));

childProcess.spawnSync('convert', parameters, {
  stdio: ['inherit', 'inherit', 'inherit']
});
