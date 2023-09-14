import fs from 'node:fs';
import path from 'node:path';

const extensions = [ '.js', '.cjs', '/index.js', '/index.cjs' ];

export function resolve(specifier, context, nextResolve) {
  if (!path.extname(specifier) && context.conditions.includes('import')) {
    for (const extension of extensions) {
      if (fs.existsSync(specifier + extension)) {
        return nextResolve(specifier + extension);
      }
    }
  }
  return nextResolve(specifier);
}
