export function buildRoutePath(path) {
  const routeParamatersRegex = /:([a-zA-Z]+)/g; //Regex to Capture the :id
  const pathWithParams = path.replaceAll(routeParamatersRegex, '([a-z0-9-_]+)');

  const pathRegex = new RegExp(`^${pathWithParams}`);
  return pathRegex;
}
