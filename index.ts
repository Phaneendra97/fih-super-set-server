import express from 'express';
import path from 'path';
import userProfileRoutes from './routes/userProfile';
import userGameDataRoutes from './routes/userGame';
import authRoutes from './routes/authRoutes';
import cors from 'cors'; // Importing cors
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs');

app.use(express.json()); // For parsing JSON request bodies

// Enable CORS for all origins with specific methods and headers
app.use(cors({
  allowedHeaders: 'Content-Type,Authorization'
}));

// Routes
app.use(authRoutes);
app.use('/', userProfileRoutes);
app.use('/', userGameDataRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({ msg: 'Hello world' });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
