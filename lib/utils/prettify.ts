/*
 * Takes bytes and returns a string with the correct unit
 * @param {number} bytes
 * @returns {string}
 */
export function prettifyBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
}

/*
 * Takes a number and returns a formatted number of thousands with "k" postfix if number is greater than 1000
 */
export function prettifyNumberToThousands(num: number): string {
  if (num > 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}
