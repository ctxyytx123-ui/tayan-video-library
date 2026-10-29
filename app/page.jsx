import fs from 'node:fs';
import path from 'node:path';
import LibraryRuntime from './runtime';

export default function LibraryPage() {
  const content = fs.readFileSync(path.join(process.cwd(), 'source/prepared.html'), 'utf8');
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
  return <>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <LibraryRuntime basePath={basePath} />
  </>;
}
