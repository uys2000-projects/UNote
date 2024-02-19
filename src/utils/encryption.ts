export const uint8ArrayFromString = function (value: string) {
  const array = JSON.parse(value) as number[];
  return new Uint8Array(array);
};
export const stringFromUint8Array = function (value: Uint8Array) {
  const array: number[] = [];
  value.forEach((v) => array.push(v));
  return JSON.stringify(array);
};
