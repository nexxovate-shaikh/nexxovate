const bcrypt = require("bcryptjs");

const password = "Nexxovate@2026!UltraSecure";
const hash = bcrypt.hashSync(password, 12);

console.log(hash);