export function range(length: number, start = 0) {
  return Array.from({ length }, (_, i) => i + start);
}

export function easyAsync(cmd: string) {
  return Utils.execAsync(["bash", "-c", `${cmd} &`]);
}
