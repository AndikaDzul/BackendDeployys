// api/index.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi Database dengan penanganan error
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI as string);
};

app.get('/api/test', async (req, res) => {
  try {
    await connectDB();
    res.json({ message: "Backend Connected & Database Live!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// WAJIB: Export sebagai default
export default app;