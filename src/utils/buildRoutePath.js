export function buildRoutePath(path) {
  const routeParamatersRegex = /:([a-zA-Z]+)/g; //Regex to Capture the :id
  const pathWithParams = path.replaceAll(
    routeParamatersRegex,
    '(?<$1>[a-z0-9-_]+)',
  ); //Replace the selected part for another Regex

  const pathRegex = new RegExp(`^${pathWithParams}`);
  return pathRegex;
}
