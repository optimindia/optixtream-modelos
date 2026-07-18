import assert from 'node:assert/strict';
import { resolveImageUrl } from '../scripts/image-fallbacks.mjs';

const missingHero = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c2?w=1600&q=80';
const healthyImage = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80';

assert.notEqual(resolveImageUrl(missingHero), missingHero, 'known missing hero image must have an explicit fallback');
assert.equal(resolveImageUrl(healthyImage), healthyImage, 'working images must remain unchanged');

console.log('Image fallback contract passed');
