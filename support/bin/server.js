/* eslint-disable no-console */
const app = require('../../dist/server').default;

const server = app.listen(process.env.NODE_PORT || 8000, err => {
  if (err) {
    console.log(err);
  } else {
    const address = server.address().address;
    const port = server.address().port;
    console.log(`listening on http://${address}:${port}`);
  }
});
