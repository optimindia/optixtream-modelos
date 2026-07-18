const explicitFallbacks = new Map([
  [
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c2?w=1600&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80'
  ]
]);

export function resolveImageUrl(url) {
  return explicitFallbacks.get(url) ?? url;
}
