import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is missing')
  }

  const url = new URL(connectionString)
  
  // Explicitly set these to ensure the driver has no excuses
  process.env.PGHOST = url.hostname
  process.env.PGUSER = url.username
  process.env.PGPASSWORD = url.password
  process.env.PGDATABASE = url.pathname.slice(1)
  process.env.PGPORT = url.port || '5432'

  // Pass individual components to Pool to avoid the driver's object-passing bug
  const pool = new Pool({ 
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    port: parseInt(url.port || '5432'),
    ssl: true,
  })
  
  const adapter = new PrismaNeon(pool as any)
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
