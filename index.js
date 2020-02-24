const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');
// config variables
const config = require('./config');
const PORT = config.PORT;

if (
  process.env.NODE_ENV !== 'PRODUCTION' ||
  process.env.NODE_ENV !== 'production'
) {
  app.use(logger('dev'));
}

// Read in your data
const dataPath = path.resolve(`${__dirname}/db/data.json`);
let data = JSON.parse(fs.readFileSync(dataPath));

// middleware for data
// 4. define your middleware: request handling
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// 4. define your middleware: result handling
app.use(bodyParser.json());
// middleware for static file server
// 4. Get the path to your public directory
const publicURL = path.resolve(`${__dirname}/public`);
// 5. Define the folder which will host your static files
app.use(express.static(publicURL));

// Views
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// API endpoints

// '/api/v1/trees'
/**
 * GET
 */
app.get('/api/v1/trees', async (req, res, next) => {
  try {
    console.log('ehllo')
    res.json(data);
  } catch (error) {
    res.json({ error: JSON.stringify(error) });
  }
});

/**
 * POST
 */
app.post('/api/v1/trees', async (req, res, next) => {
  try {
    const newPost = {
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
      empty: Boolean(req.body.empty),
      id: uniqid()
    };

    data.push(newPost);

    await writeFile(dataPath, data);
    res.json(newPost);
  } catch (error) {
    res.json({ error: JSON.stringify(error) });
  }
});

// '/api/v1/trees:id'
/**
 * GET:id
 */
app.get('/api/v1/trees/:id', async (req, res, next) => {
  try {
    const selected = data.find(item => item.id === Number(req.params.id));
    res.json(selected);
  } catch (error) {
    res.json({ error: JSON.stringify(error) });
  }
});

/**
 * PUT
 */
app.put('/api/v1/trees/:id', async (req, res, next) => {
  try {
    const selectedId = req.params.id;
    const updatedPost = {
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
      empty: Boolean(req.body.empty),
      id: selectedId
    };

    const updatedData = data.map(item => {
      if (item.id === Number(selectedId)) {
        return updatedPost;
      }
      return item;
    });

    // set data to the updateData
    data = updatedData.slice();
    // write to the file
    await writeFile(dataPath, data);
    res.json(updatedPost);
  } catch (error) {
    res.json({ error: JSON.stringify(error) });
  }
});

/**
 * DELETE
 */
app.delete('/api/v1/trees/:id', async (req, res, next) => {
  try {
    data = data.filter(item => item.id === Number(req.params.id));
  await writeFile(dataPath, data);
  res.json({"message":"successfully removed item"});
  } catch (error) {
    res.json({ error: JSON.stringify(error) });
  }
});

// controller
function writeFile(dataPath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataPath, JSON.stringify(data), err => {
      if (err) {
        return console.error(err);
      }
      resolve(data);
    });
  });
}

// Run the server
app.listen(PORT, () => {
  console.log(`the app is running at: http://localhost:${PORT}`);
});
