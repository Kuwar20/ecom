import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})