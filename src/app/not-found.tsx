import Link from "next/link";
export default function NotFound() {
  return (
    <main className="content">
      <h1>Esta ruta no existe</h1>
      <Link href="/overview">Volver al panorama</Link>
    </main>
  );
}
