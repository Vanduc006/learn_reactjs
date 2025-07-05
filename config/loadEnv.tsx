import 'dotenv/config';
import { useState } from 'react';

interface Env {
  // DEVMODE: string,
  SERVICE_URL : string,
  QDRANT_API_KEY: string;
  QDRANT_URL: string;
  QDRANT_PORT : number;
  GEMINI_API_KEY: string;
  S3_BUCKET_NAME: string;
  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
}

const loadEnv = () => {
  const [serviceURL,setServiceURL] = useState<string>('')
  if (process.env.DEVMODE == "local") {
    setServiceURL('https://localhost:3000')
  }
  if (process.env.DEVMODE == 'vps') {
    setServiceURL('https://api.imasis.id.vn')
  }
  return (
    {
    SERVICE_URL : serviceURL || '',
    QDRANT_API_KEY: process.env.QDRANT_API_KEY || '',
    QDRANT_URL: process.env.QDRANT_URL || '',
    QDRANT_PORT: Number(process.env.QDRANT_PORT),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
    }
  )
}

export default loadEnv;
