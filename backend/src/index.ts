import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import urlRoutes from './routes/urlRoutes';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // frontend
app.use(json());
app.use('/api/url', urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
