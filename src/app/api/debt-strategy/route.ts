// /src/app/api/generate-strategy/route.ts

import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
  const body = await req.json();

  const runPythonScript = () => {
    return new Promise((resolve, reject) => {
      const pythonExecutable = process.platform === 'win32' ? 'python' : 'python3';
      const scriptPath = path.join(process.cwd(), 'scripts', 'strategy.py');
      
      const pythonProcess = spawn(pythonExecutable, [scriptPath]);

      let result = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Python Script Error: ${error}`);
          reject(new Error(error || 'The Python script failed.'));
        } else {
          resolve(JSON.parse(result));
        }
      });
      
      pythonProcess.on('error', (spawnError) => {
          console.error('Failed to start Python process:', spawnError);
          reject(spawnError);
      });

      // Send all the data from the frontend to the Python script
      pythonProcess.stdin.write(JSON.stringify(body));
      pythonProcess.stdin.end();
    });
  };

  try {
    const strategyResult = await runPythonScript();
    return NextResponse.json(strategyResult);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}