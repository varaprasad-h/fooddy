import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import superadminRouter from "./routes/superadmin.routes.js"
import itemRouter from "./routes/item.routes.js"
import shopRouter from "./routes/shop.routes.js"
import orderRouter from "./routes/order.routes.js"
import categoryRouter from "./routes/category.routes.js"
import ratingRouter from "./routes/rating.routes.js"
import http from "http"
import { Server } from "socket.io"
import { socketHandler } from "./socket.js"
import cron from "node-cron"
import { autoRegenerateOtps } from "./controllers/order.controllers.js"

const app=express()
const server=http.createServer(app)

// Allow common Vite dev ports and make 5180 explicit
const envAllowed = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL).split(",").map(s => s.trim()).filter(Boolean)
const defaultAllowed = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5180",
  "http://98.91.188.66",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:5180",
  "https://foody-six-jet.vercel.app",
  "https://foody-oqvg.onrender.com",
]
const allowedOrigins = envAllowed.length ? envAllowed : defaultAllowed
const io=new Server(server,{
   cors:{
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      const ok = allowedOrigins.includes(origin) || /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) || (()=>{ try { return new URL(origin).hostname.endsWith('.vercel.app') } catch { return false } })()
      if (ok) return callback(null, true)
      return callback(new Error('Not allowed by Socket.IO CORS'))
    },
    credentials:true,
    methods:['POST','GET']
}
})

app.set("io",io)

// Middleware to attach socket.io to request object
app.use((req, res, next) => {
    req.io = io
    next()
})

const port=process.env.PORT || 5000
const isLocalDev = (o) => {
  try {
    return /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(o)
  } catch {
    return false
  }
}

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    const ok = allowedOrigins.includes(origin) || isLocalDev(origin) || (()=>{ try { return new URL(origin).hostname.endsWith('.vercel.app') } catch { return false } })()
    if (ok) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  optionsSuccessStatus: 204
}
app.use(cors(corsOptions))
// Handle preflight without using bare '*' path (Express 5 uses path-to-regexp)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    const origin = req.headers.origin
    try {
      const ok = !origin || allowedOrigins.includes(origin) || isLocalDev(origin) || new URL(origin).hostname.endsWith('.vercel.app')
      if (ok) {
        if (origin) {
          res.header('Access-Control-Allow-Origin', origin)
          res.header('Vary', 'Origin')
        }
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || 'Content-Type, Authorization')
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'] || 'GET,POST,PUT,DELETE,OPTIONS')
        return res.sendStatus(204)
      }
    } catch {}
  }
  next()
})
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/superadmin",superadminRouter)
app.use("/api/shop",shopRouter)
app.use("/api/item",itemRouter)
app.use("/api/order",orderRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/rating",ratingRouter)

socketHandler(io)

// Schedule OTP regeneration every 2 hours
cron.schedule('0 */2 * * *', () => {
    console.log('Running automatic OTP regeneration...')
    autoRegenerateOtps()
})

server.listen(port,()=>{
    connectDb()
    console.log(`server started at ${port}`)
})

