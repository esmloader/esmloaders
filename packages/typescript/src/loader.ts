import path from 'node:path';
import ts from 'typescript';

export async function load(url, context, nextLoad) {
  if (path.extname(url) === '.ts') {
    const { source } = await nextLoad(url, {
      ...context,
      'format': 'module',
    });
    return {
      'format': 'module',
      'shortCircuit': true,
      'source': ts.transpile(source),
    };
  }
  return nextLoad(url);
}
