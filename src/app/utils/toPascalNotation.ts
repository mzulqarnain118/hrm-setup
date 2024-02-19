export function toPascalCase(value: string) {
  return value === 'aoi'
    ? value.toLocaleUpperCase()
    : `${value}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
          new RegExp(/\s+(.)(\w*)/, 'g'),
          ($1, $2, $3) => `${$2.toUpperCase() + $3}`
        )
        .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}
export function toPascalCase(value: string) {
