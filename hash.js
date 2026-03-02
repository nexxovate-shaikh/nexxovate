const bcrypt = require("bcryptjs");

(async () => {
  const password = "admin123";   // use simple password for test
  const hash = await bcrypt.hash(password, 10);

  console.log("PASSWORD:", password);
  console.log("HASH:", hash);

  const match = await bcrypt.compare(password, hash);
  console.log("MATCH TEST:", match);
})();