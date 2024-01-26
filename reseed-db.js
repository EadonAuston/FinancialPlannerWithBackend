import { writeFileSync } from "fs";

const generateId = () => Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);

const users = [
  { id: generateId(), username: "Person1", password: "Person1" },
  { id: generateId(), username: "Person2", password: "Person2" },
];

const liquidAssets = [
  { id: generateId(), value: "1200", label: "January", color: "#ff0000", userId: users[0].id },
  { id: generateId(), value: "1800", label: "February", color: "#387aff", userId: users[0].id },
  { id: generateId(), value: "1500", label: "March", color: "#00ffff", userId: users[0].id },
  { id: generateId(), value: "2400", label: "1/21", color: "#ff0000", userId: users[1].id },
  { id: generateId(), value: "3600", label: "1/28", color: "#387aff", userId: users[1].id },
  { id: generateId(), value: "3000", label: "2/5", color: "#00ffff", userId: users[1].id },
];

const monthlyExpenses = [
  { id: generateId(), value: "1600", label: "rent", color: "#00ff1e", userId: users[0].id },
  { id: generateId(), value: "400", label: "food", color: "#387aff", userId: users[0].id },
  { id: generateId(), value: "200", label: "Insurance", color: "#00ffff", userId: users[0].id },
  { id: generateId(), value: "1000", label: "rent", color: "#00ff1e", userId: users[1].id },
  { id: generateId(), value: "500", label: "food", color: "#387aff", userId: users[1].id },
  { id: generateId(), value: "300", label: "Insurance", color: "#00ffff", userId: users[1].id },

];

const reviews = [
  { id: generateId(), value: "8.5", comment: "", userId: users[0].id },
  { id: generateId(), value: "9.5", comment: "I love this app!", userId: users[1].id },
];

const checklist = [
  { id: generateId(), name: "House", price: "500000", userId: users[0].id },
  { id: generateId(), name: "PC", price: "2000", userId: users[0].id },
  { id: generateId(), name: "House", price: "400000", userId: users[1].id },
  { id: generateId(), name: "PC", price: "1400", userId: users[1].id },
];

const db = {
  users,
  "Liquid Assets": liquidAssets,
  "Monthly Expenses": monthlyExpenses,
  reviews,
  checklist,
};

writeFileSync("db.json", JSON.stringify(db, null, 2), { encoding: "utf-8" });