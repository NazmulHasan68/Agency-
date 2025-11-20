import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
import authanticationRoute from './routers/authentication_route.js'
import serviceRoutes from './routers/service_route.js'
import teamMemberRoutes from './routers/team_member_route.js'
import projectRoutes from './routers/project_route.js'
import partnerRoutes from './routers/partner_route.js'
import achievementRoutes from './routers/achivement_route.js'
import journeyRoutes from './routers/journey_route.js'
import impactsRoutes from './routers/impact_route.js'
import messageRoutes from './routers/message_route.js'
import bookingRoutes from './routers/booking_route.js'
import reviewRoutes from './routers/review_route.js'
import galaryRoutes from './routers/gallary_routes.js'
import { dbconnection } from './database/dbConnection.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
      origin: process.env.FRONTEND,
      credentials: true, 
      methods: 'GET, POST, PUT, DELETE, PATCH' , 
      allowedHeaders: 'Content-Type, Authorization', 
    })
);
app.use('/public', express.static('public'));

//called api 
app.use('/api/auth', authanticationRoute)
app.use("/api/services", serviceRoutes);
app.use("/api/team-members", teamMemberRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/achievements",achievementRoutes)
app.use("/api/journeys",journeyRoutes)
app.use("/api/impacts",impactsRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/booking",bookingRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/gallery",galaryRoutes)


// Routes
app.get('/', (req, res) => {
  res.send('Wmz Agency Backend Running');
});


app.use(express.static(path.join(__dirname, '../public_html')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public_html/index.html'));
});


// Start server
app.listen(port, () => {
    dbconnection()
    console.log(`Server running on http://localhost:${port}`);
});

