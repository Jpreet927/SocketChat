const express = require("express");
const dotenv = require("dotenv");
const { threads } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const threadRoutes = require("./routes/threadRoutes")
const msgRoutes = require("./routes/msgRoutes")
const { userNotFound, errorHandler } = require("./middleware/error")

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send("API running");
// })

// app.get('/api/threads', (req, res) => {
//     res.send(threads)
// })

// app.get('/api/threads/:id', (req, res) => {
//     console.log(req.params.id);
//     const thread = threads.find((t) => t._id === req.params.id);
//     res.send(thread);
// })

app.use('/api/user', userRoutes);
app.use('/api/threads', threadRoutes);
app.use('/api/messages', msgRoutes);
app.use(userNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`server started on port ${PORT}`));

