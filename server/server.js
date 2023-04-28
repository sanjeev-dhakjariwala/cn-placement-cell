const app = require("./app");
const colors = require("colors");
require("dotenv").config();

const PORT = process.env.PORT || 4001;


app.listen(PORT, () => {
  console.log(colors.blue(`APP IS LSITENING ON PORT ${PORT}`));
});
