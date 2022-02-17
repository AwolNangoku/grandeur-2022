const app = require("./app");
require("dotenv").config();
const config = require("./config");

const {
  app: { host, port },
} = config(process.env.NODE_ENV);

app.listen(port, () => {
  console.log(`Grandeur listening at http://${host}:${port}`);
});
