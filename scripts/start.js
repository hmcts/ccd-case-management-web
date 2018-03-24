const spawn = require('child_process').spawn;

let child;
if (process.env.NODE_ENV) {
  console.log('Nothing to start, files should be served as static assets.');
  child = spawn('tail', ['-f', '/dev/null'], { stdio: 'inherit', shell: true });
} else {
  child = spawn('npm', ['run', 'server'], { stdio: 'inherit', shell: true });
}

child.on('error', function(err) {
  console.error(err);
  process.exit(1);
});
