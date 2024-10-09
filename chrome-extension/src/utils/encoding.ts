export function stringToUtf8Buffer(data: string) {
  const encoder = new TextEncoder();
  return encoder.encode(data);
}

export function utf8BufferToString(buffer: ArrayBuffer) {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

export function arrayBufferToString(buffer: ArrayBuffer) {
  return String.fromCharCode(...new Uint8Array(buffer));
}

export function stringToArrayBuffer(data: string) {
  return Uint8Array.from(data, (c) => c.charCodeAt(0));
}

export function utf8btoa(data: string) {
  return btoa(encodeURIComponent(data));
}

export function utf8atob(data: string) {
  return decodeURIComponent(atob(data));
}
