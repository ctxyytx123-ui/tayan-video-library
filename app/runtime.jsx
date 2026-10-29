'use client';

import Script from 'next/script';

export default function LibraryRuntime({ basePath }) {
  return <Script src={`${basePath}/library-runtime.js`} strategy="afterInteractive" />;
}
