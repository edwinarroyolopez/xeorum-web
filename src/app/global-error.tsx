'use client';

import { Button } from '../modules/design-system';

export default function GlobalError({ error, reset }: Readonly<{ error: Error; reset: () => void }>) {
  return (
    <html lang="en">
      <body>
        <main className="error-shell">
          <h1>XEØRUM</h1>
          <p>Something went wrong.</p>
          <Button type="button" onClick={reset}>
            Retry
          </Button>
          <pre>{error.message}</pre>
        </main>
      </body>
    </html>
  );
}
