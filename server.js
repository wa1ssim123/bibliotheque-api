const express = require("express");
const sequelize = require("./config/db");

const Role = require("./models/Role");
const User = require("./models/User");
const Author = require("./models/Author");
const Category = require("./models/Category");
const Book = require("./models/Book");
const Loan = require("./models/Loan");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const authorRoutes = require("./routes/authorRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const loanRoutes = require("./routes/loanRoutes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
  res.send("Serveur fonctionne !");
});

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Author, { foreignKey: "authorId" });

Category.hasMany(Book, { foreignKey: "categoryId" });
Book.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Loan, { foreignKey: "userId" });
Loan.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Loan, { foreignKey: "bookId" });
Loan.belongsTo(Book, { foreignKey: "bookId" });

sequelize.sync()
  .then(async () => {
    console.log("Connexion MySQL réussie ✅");

    await Role.findOrCreate({ where: { name: "admin" } });
    await Role.findOrCreate({ where: { name: "user" } });

    console.log("Rôles OK ✅");

    app.listen(5000, () => {
      console.log("Serveur lancé sur http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("Erreur ❌", err);
  });