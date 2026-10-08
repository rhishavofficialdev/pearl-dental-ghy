import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
export const Reveal=({children,className='',delay=0}:{children:ReactNode;className?:string;delay?:number})=>(
<motion.div className={className} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,delay,ease:'easeOut'}}>{children}</motion.div>)
export const Btn=({href='#book',children,dark=true,className=''}:{href?:string;children:ReactNode;dark?:boolean;className?:string})=>(
<motion.a href={href} whileHover={{scale:1.04,y:-2}} whileTap={{scale:.97}} className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold min-h-12 ${dark?'bg-ink text-pearl':'bg-white/70 border border-ink/10 backdrop-blur'} ${className}`}>{children}</motion.a>)
export const Counter=({to,suffix='',dec=0}:{to:number;suffix?:string;dec?:number})=>{
const ref=useRef(null),inView=useInView(ref,{once:true}),[v,setV]=useState(0)
useEffect(()=>{if(!inView)return;const c=animate(0,to,{duration:1.8,onUpdate:setV});return()=>c.stop()},[inView,to])
return <span ref={ref}>{v.toLocaleString('en',{minimumFractionDigits:dec,maximumFractionDigits:dec})}{suffix}</span>}
export const Title=({children,sub}:{children:ReactNode;sub?:string})=>(
<Reveal className="mb-10 max-w-2xl"><h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">{children}</h2>{sub&&<p className="mt-4 text-ink/60 text-lg">{sub}</p>}</Reveal>)
// Dental/smile demo photos from Unsplash (free to use). Pass `src` to override, or replace with your own clinic photos.
export const photo=(id:string)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=70`
const P=['1489278353717-f64c6ee8a4d2', '1606811971618-4486d14f3f99', '1677026010083-78ec7f1b84ed', '1667133295315-820bb6481730', '1698749778813-ad5f2814e50f', '1548382131-e0ebb1f0cdea', '1667133295352-ef4c83620e8e', '1562337404-3044c84ac061', '1667133295308-9ef24f71952e', '1567516364473-233c4b6fcfbe', '1663755489920-5e09f66d011a', '1654373535457-383a0a4d00f9', '1611695434369-a8f5d76ceb7b'].map(photo)
const pick=(s:string)=>P[[...s].reduce((a,c)=>a+c.charCodeAt(0),0)%P.length]
export const Tile=({tone='from-mint to-sky',label='',className='',src}:{tone?:string;label?:string;className?:string;src?:string})=>(
<div role="img" aria-label={label||'Photo'} className={`relative overflow-hidden bg-gradient-to-br ${tone} rounded-[28px] ${className}`}>
<img src={src||pick(label||tone)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/></div>)