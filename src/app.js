const child_process = require('child_process');
const REBOOT_INTERVAL = 5000;

function spawn(mainModule) {
    const child = child_process.spawn('node', [ mainModule ]);

    child.on('exit', function (code) {
        if (code !== 0) {
            console.error(`[System Error!]: ${code}, reboot after ${REBOOT_INTERVAL} ms`);
            setTimeout(() => {
              spawn(mainModule);
            }, REBOOT_INTERVAL);
        }
    });

    child.stdout.on('data', function (data) {
      console.log(data.toString());
    })

    child.stderr.on('error', function (err) {
      console.error(err.toString());
    })
}

spawn('./src/server/index.js');
