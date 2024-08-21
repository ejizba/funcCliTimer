import path = require("path");
import cp = require("child_process");

export async function runFuncVersion(): Promise<string> {
    const start = Date.now();
    const funcPath = path.join(__dirname, '..', '..', '..', 'node_modules', 'azure-functions-core-tools', 'bin', 'func');
    await new Promise((resolve, reject) => {
        let output = '';
        const cmd = cp.spawn(funcPath, ['--version']);
        cmd.stdout.on('data', function (data) {
            output += data.toString();
            console.log(data.toString());
        });
        cmd.stderr.on('data', function (data) {
            console.error(data.toString());
        });
        cmd.on('error', reject);
        cmd.on('close', resolve);
    });
    const timeElapsed = Date.now() - start;
    return `Time elapsed: ${timeElapsed}`;
}