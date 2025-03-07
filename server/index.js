const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const ChatRoute = require('./Routes/ChatRoute');
const MessageRoute = require('./Routes/MessageRoute');
const UserRoute = require('./Routes/UserRoute');
const ClientRoute = require('./Routes/ClientRoute');
const InfluencerRoute = require('./Routes/InfluencerRoute');
const PromotionRoute = require('./Routes/PromotionsRoute');
const { notFound, errorHandler } = require('./Middleware/errorMiddleware');

dotenv.config();  // Load environment variables

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: ['http://localhost:3000', 'https://fullstack-marketing-hub.vercel.app'],
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors({ origin: "https://collab-s.vercel.app", credentials: true }));


// Register routes
app.use('/users', UserRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
app.use('/clients', ClientRoute);
app.use('/influencers', InfluencerRoute);
app.use('/promotions', PromotionRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to DB and start the server
connectDB().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Failed to connect to database:', err);
});
