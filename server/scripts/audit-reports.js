import mongoose from 'mongoose';
import {Story,Category} from '../src/models.js';
await mongoose.connect(process.env.MONGODB_URI,{dbName:process.env.MONGODB_DB||'afrii'});
const stories=await Story.find().lean();const categories=await Category.find().lean();
const reports=[...stories.flatMap(s=>(s.reports||[]).map(r=>({owner:'Summer '+s.year,...r}))),...categories.flatMap(c=>[...(c.reports||[]).map(r=>({owner:c.slug,...r})),...c.programs.flatMap(p=>(p.reports||[]).map(r=>({owner:p.slug,...r})))])];
for(const r of reports){try{const response=await fetch(r.url.startsWith('/')?'http://localhost:5173'+r.url:r.url,{method:'HEAD',signal:AbortSignal.timeout(10000)});console.log(JSON.stringify({owner:r.owner,title:r.title,url:r.url,status:response.status,type:response.headers.get('content-type'),cloudinaryError:response.headers.get('x-cld-error')}));}catch{console.log(JSON.stringify({owner:r.owner,url:r.url,status:'unreachable'}));}}
console.log('Story years:',stories.map(s=>s.year).join(', '));
await mongoose.disconnect();
