import { prisma } from "./prisma-instance";
import { v4 as uuidv4 } from "uuid";
import { encryptPassword } from "../src/auth-utils";
async function clearDb() {
  await prisma.liquidAssets.deleteMany({});
  await prisma.monthlyExpenses.deleteMany({});
  await prisma.checklist.deleteMany({});
  await prisma.reviews.deleteMany({});
  await prisma.user.deleteMany({});
}

const generateId = () => uuidv4();
async function seedDatabase() {
  await clearDb();

  const user1 = await prisma.user.create({
    data: {
      id: generateId(),
      username: "Person1",
      passwordHash: await encryptPassword("Person1"),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: generateId(),
      username: "Person2",
      passwordHash: await encryptPassword("Person2"),
    },
  });

  await prisma.liquidAssets.createMany({
    data: [
      {
        id: generateId(),
        value: 1200,
        label: "January",
        color: "#ff0000",
        userId: user1.id,
      },
      {
        id: generateId(),
        value: 1800,
        label: "February",
        color: "#387aff",
        userId: user1.id,
      },
      {
        id: generateId(),
        value: 1500,
        label: "March",
        color: "#00ffff",
        userId: user1.id,
      },
    ],
  });

  await prisma.liquidAssets.createMany({
    data: [
      {
        id: generateId(),
        value: 2400,
        label: "1/21",
        color: "#ff0000",
        userId: user2.id,
      },
      {
        id: generateId(),
        value: 3600,
        label: "1/28",
        color: "#387aff",
        userId: user2.id,
      },
      {
        id: generateId(),
        value: 3000,
        label: "2/5",
        color: "#00ffff",
        userId: user2.id,
      },
    ],
  });

  await prisma.monthlyExpenses.createMany({
    data: [
      {
        id: generateId(),
        value: 1600,
        label: "rent",
        color: "#00ff1e",
        userId: user1.id,
      },
      {
        id: generateId(),
        value: 400,
        label: "food",
        color: "#387aff",
        userId: user1.id,
      },
      {
        id: generateId(),
        value: 200,
        label: "Insurance",
        color: "#00ffff",
        userId: user1.id,
      },
    ],
  });

  await prisma.monthlyExpenses.createMany({
    data: [
      {
        id: generateId(),
        value: 1000,
        label: "rent",
        color: "#00ff1e",
        userId: user2.id,
      },
      {
        id: generateId(),
        value: 500,
        label: "food",
        color: "#387aff",
        userId: user2.id,
      },
      {
        id: generateId(),
        value: 300,
        label: "Insurance",
        color: "#00ffff",
        userId: user2.id,
      },
    ],
  });

  await prisma.reviews.createMany({
    data: [
      { id: generateId(), value: 8.5, comment: "", userId: user1.id },
      {
        id: generateId(),
        value: 9.5,
        comment: "I love this app!",
        userId: user2.id,
      },
    ],
  });

  await prisma.checklist.createMany({
    data: [
      { id: generateId(), name: "House", price: 500000, userId: user1.id },
      { id: generateId(), name: "PC", price: 2000, userId: user1.id },
      { id: generateId(), name: "House", price: 400000, userId: user2.id },
      { id: generateId(), name: "PC", price: 1400, userId: user2.id },
    ],
  });

  return user1;
}

seedDatabase()
  .then(() => {
    console.log("seeded 🌱");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
