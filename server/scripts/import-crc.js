import { readFile, mkdir, writeFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import { Category } from '../src/models.js';
import { categoryInput } from '../src/validation.js';

await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB || 'afrii' });
try {
  const content = JSON.parse(await readFile(new URL('../../client/src/data/crcContent.json', import.meta.url), 'utf8'));
  const category = await Category.findOne({ slug: 'community-resource-centre' });
  if (!category) throw new Error('Community Resource Centre category is missing.');
  const index = category.programs.findIndex(program => program.slug === 'crc');
  if (index < 0) throw new Error('CRC programme is missing.');
  const backups = new URL('../.backups/', import.meta.url);
  await mkdir(backups, { recursive: true });
  await writeFile(new URL('before-crc-' + Date.now() + '.json', backups), JSON.stringify(category.toObject(), null, 2));
  const existing = category.programs[index].toObject();
  category.programs[index] = { ...existing, ...content, published: existing.published };
  category.image = content.image;
  categoryInput.parse(category.toObject());
  await category.save();
  console.log('CRC imported: ' + content.sections.length + ' sections, ' + content.photos.length + ' photos. Existing videos, reports and publishing status preserved.');
} finally {
  await mongoose.disconnect();
}
