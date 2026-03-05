import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
import prisma from '../src/prismaClient';

console.log('prisma.resource:', prisma.resource);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const categories = ['Electronics', 'Furniture', 'Stationery', 'Tools', 'Clothing', 'Books', 'Sports', 'Kitchen'];
const tags = ['new', 'used', 'refurbished', 'sale', 'featured', 'limited', 'popular', 'clearance'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateBarcode(index: number): string {
  const base = 100000000000 + index * 317;
  return base.toString().padStart(13, '0');
}

const resources = Array.from({ length: 50 }, (_, i) => {
  const index = i + 1;
  const category = randomItem(categories);
  return {
    barcode: generateBarcode(index),
    name: `${category} Item ${index}`,
    category,
    tag: randomItem(tags),
    price: Math.floor(Math.random() * 991) + 10, // 10 to 1000
    description: index % 3 === 0 ? null : `This is a placeholder description for ${category} Item ${index}.`,
  };
});

async function main() {
  console.log('Seeding resources...');

  await prisma.resource.deleteMany();
  console.log('Cleared existing resources.');

  for (const resource of resources) {
    await prisma.resource.create({ data: resource });
  }

  console.log(`Successfully seeded ${resources.length} resources.`);
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
