import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
import prisma from '../src/prismaClient';

const users = [
  { firstName: 'John', lastName: 'Smith', email: 'john.smith@email.com', username: 'johnsmith', bio: 'Love hiking and photography' },
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', username: 'johndoe', bio: 'Software engineer by day' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@email.com', username: 'janesmith', bio: 'Coffee enthusiast' },
  { firstName: 'Sarah', lastName: 'Connor', email: 'sarah.connor@email.com', username: 'sarahconnor', bio: 'Fitness and wellness' },
  { firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@email.com', username: 'mikejohnson', bio: 'Traveller and foodie' },
  { firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@email.com', username: 'emilydavis', bio: null },
  { firstName: 'Chris', lastName: 'Brown', email: 'chris.brown@email.com', username: 'chrisbrown', bio: 'Music and art lover' },
  { firstName: 'Anna', lastName: 'Wilson', email: 'anna.wilson@email.com', username: 'annawilson', bio: 'Reading and writing' },
  { firstName: 'Tom', lastName: 'Miller', email: 'tom.miller@email.com', username: 'tommiller', bio: null },
  { firstName: 'Lisa', lastName: 'Taylor', email: 'lisa.taylor@email.com', username: 'lisataylor', bio: 'Yoga and meditation' },
]

const main = async () => {
  console.log('Seeding...')

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        // firstName: user.firstName,
        bio: user.bio,
        username: user.username
      },
      create: user
    })
  }

  console.log('Seeding complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })