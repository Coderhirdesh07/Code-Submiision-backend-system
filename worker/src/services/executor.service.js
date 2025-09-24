const fs = require('fs');
const os = require('os');
const path = require('path');
const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

async function runUserCode(language, code) {
  // 1. Create a temp dir
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `${language}-run-`));

  // 2. Map language to filename and command
  let fileName, cmd;
  switch (language) {
    case 'java':
      fileName = 'Main.java';
      cmd = ['sh', '-c', 'javac Main.java && java Main'];
      break;
    case 'python':
      fileName = 'main.py';
      cmd = ['python', 'main.py'];
      break;
    case 'cpp':
      fileName = 'main.cpp';
      cmd = ['sh', '-c', 'g++ main.cpp -o main && ./main'];
      break;
    default:
      throw new Error('Unsupported language');
  }

  // 3. Write user code to file
  const filePath = path.join(tempDir, fileName);
  fs.writeFileSync(filePath, code);

  // 4. Map language to Docker image
  const imageMap = {
    java: 'openjdk:21-slim',
    python: 'python:3.11-slim',
    cpp: 'gcc:13',
  };

  if (!imageMap[language]) throw new Error('No image for language');

  // 5. Create & run container
  const container = await docker.createContainer({
    Image: imageMap[language],
    Cmd: cmd,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    HostConfig: {
      Binds: [`${tempDir}:/app`], // Mount temp dir inside container
      AutoRemove: true,
      Memory: 200 * 1024 * 1024, // 200MB memory limit
      NanoCPUs: 500_000_000, // 0.5 CPU
      NetworkMode: 'none',
      WorkingDir: '/app',
    },
  });

  // 6. Attach to container output streams
  const stream = await container.attach({ stream: true, stdout: true, stderr: true });

  let stdout = '';
  let stderr = '';

  stream.on('data', chunk => {
    // Docker multiplexes stdout/stderr, decode it:
    const output = chunk.toString();
    stdout += output;
  });

  // 7. Start the container
  await container.start();

  // 8. Wait for container to finish
  const status = await container.wait();

  // 9. Cleanup temp dir
  fs.rmSync(tempDir, { recursive: true, force: true });

  return {
    stdout,
    stderr,
    exitCode: status.StatusCode,
  };
}

// Example usage:
(async () => {
  try {
    const code = `
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java!");
  }
}
`;
    const result = await runUserCode('java', code);
    console.log('Output:', result.stdout);
    console.log('Errors:', result.stderr);
    console.log('Exit code:', result.exitCode);
  } catch (err) {
    console.error('Error:', err);
  }
})();
