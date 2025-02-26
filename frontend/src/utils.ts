/* eslint-disable @typescript-eslint/no-explicit-any */
export function add(a: number, b: number): number {
  return a + b;
}

export async function fetchData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}
