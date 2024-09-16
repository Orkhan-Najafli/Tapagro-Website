export function HeaderConfigs(Authorization?: string | any) {
  return {
    "Accept-Language": "AZE",
    "Content-Type": "application/json",
    Authorization: Authorization,
  };
}

export function parseUrl(
  url: string,
  params: Record<string, any>,
  defaults: Record<string, any> = {}
) {
  return url.replace(/\${(.*?)}/g, (_, key) => {
    if (params[key] !== undefined) {
      return String(params[key]); // Dəyəri `string` olaraq qaytarırıq
    } else if (defaults[key] !== undefined) {
      console.warn(
        `Param '${key}' not provided, using default value: ${defaults[key]}`
      );
      return String(defaults[key]); // Default dəyəri string formatına çeviririk
    } else {
      console.error(`Param '${key}' not provided and no default value found!`);
      return ""; // Dəyər tapılmadıqda boş qaytarırıq
    }
  });
}
