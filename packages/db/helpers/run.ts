import { exec } from "node:child_process";

export default function run(
  command: string,
  options?: { env?: Record<string, string> }
) {
  return new Promise((resolve, reject) => {
    const env = options?.env ? { ...process.env, ...options.env } : process.env;
    const script = exec(command, { env }, (error, stdout, stderr) => {
      if (error) reject(error);
      if (stderr) console.warn(stderr);
      resolve(stdout);
    });

    if (script.stdin) process.stdin.pipe(script.stdin);

    script.stdout?.on("data", (data) => {
      console.log(data);
    });
  });
}
