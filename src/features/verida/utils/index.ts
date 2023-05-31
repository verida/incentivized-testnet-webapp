export function truncateDid(did: string) {
  const elements = did.split(":");
  const key = elements[elements.length - 1];
  const truncatedKey =
    key.substring(0, 5) + "..." + key.substring(key.length - 2, key.length);
  return did.replace("did:", "").replace(key, truncatedKey);
}
