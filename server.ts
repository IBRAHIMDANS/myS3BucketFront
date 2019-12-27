import express from 'express';
import * as path from 'path';

const app: express.Express = express();

// Serve static files....
app.use(express.static(`${__dirname}/dist/myS3BucketFront`));

// Send all requests to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/myS3BucketFront/index.html`));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
