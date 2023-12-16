import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'Admin' },
    { name: 'Editor' },
    // Add more roles as needed
  ];

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }

  console.log('Roles seeded successfully');
}

main()
  .catch((error) => {
    console.error('Error seeding roles:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
