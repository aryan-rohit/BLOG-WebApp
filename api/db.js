import mysql from "mysql2"

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: "123aryan123",
  database:"blog"
})
db.connect((err) => {
  if (err) return console.error(err.message);

  console.log('Connected to the MySQL server.');
});