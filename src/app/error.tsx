"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="content">
      <h1>No pudimos cargar esta vista</h1>
      <p>Intenta nuevamente. No se realizó ninguna acción automáticamente.</p>
      <button onClick={reset}>Reintentar</button>
    </main>
  );
}
