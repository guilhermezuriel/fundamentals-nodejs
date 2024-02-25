export function buildRoutePath(path) {
  const routeParamatersRegex = /:([a-zA-Z]+)/g;
  console.log(Array.from(path.matchAll(routeParamatersRegex)));
}
