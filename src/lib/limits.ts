export class PayloadTooLarge extends Error {}
/** Stop consuming at the byte limit, including chunked payloads. */
export async function readBounded(
  body: ReadableStream<Uint8Array> | null,
  max: number,
) {
  if (!body) return "";
  const reader = body.getReader();
  let total = 0;
  const parts: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > max) {
        await reader.cancel();
        throw new PayloadTooLarge("Payload exceeds limit");
      }
      parts.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    merged.set(part, offset);
    offset += part.length;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(merged);
}
