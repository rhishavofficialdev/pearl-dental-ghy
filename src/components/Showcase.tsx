import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { Title, Tile } from './ui'
export function BeforeAfter(){
const [v,setV]=useState(50),[t,setT]=useState('Whitening')
return(<section className="mx-auto max-w-5xl px-5 py-20"><Title>Real Smiles. Real Transformations.</Title>
<div className="flex gap-2 mb-4 overflow-x-auto no-bar">{['Whitening','Aligners','Veneers','Smile Makeover'].map(x=><button key={x} onClick={()=>setT(x)} className={`rounded-full px-5 py-2.5 text-sm font-bold whitespace-nowrap ${t===x?'bg-ink text-pearl':'bg-white border border-sand'}`}>{x}</button>)}</div>
<div className="relative aspect-[16/10] rounded-[32px] overflow-hidden shadow-soft select-none">
<Tile tone="from-mint to-white" label={`${t} after`} className="absolute inset-0 rounded-none"/>
<div className="absolute inset-0" style={{clipPath:`inset(0 ${100-v}% 0 0)`}}><Tile tone="from-sand to-[#d8c9a8]" label={`${t} after`} className="h-full rounded-none [&_img]:sepia [&_img]:brightness-75"/></div>
<div className="absolute inset-y-0 w-0.5 bg-white" style={{left:`${v}%`}}/>
<input aria-label="Before and after slider" type="range" min={0} max={100} value={v} onChange={e=>setV(+e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"/></div>
<p className="mt-3 text-sm text-ink/50">Individual results may vary.</p></section>)}
export function Gallery(){
const [o,setO]=useState<number|null>(null)
const items=['Clinic interior','Reception','Treatment room','Equipment','Dentists','Team','Happy patients','Smile results']
const span=['md:col-span-2 md:row-span-2','','','md:col-span-2','','','md:row-span-2','']
const tones=['from-mint to-sky','from-lav to-white','from-ivory to-sand','from-sky to-lav']
return(<section id="gallery" className="mx-auto max-w-7xl px-5 py-20"><Title>Inside Pearl.</Title>
<div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[9rem] md:auto-rows-[12rem] gap-3">{items.map((l,i)=>
<button key={l} onClick={()=>setO(i)} aria-label={`Open ${l}`} className={`${span[i]} col-span-1 overflow-hidden rounded-[28px] text-left group`}><Tile tone={tones[i%4]} label={l} className="h-full group-hover:scale-105 transition duration-700"/></button>)}</div>
<AnimatePresence>{o!==null&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" onClick={()=>setO(null)} className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur grid place-items-center p-5">
<button aria-label="Close" className="absolute top-5 right-5 text-white"><X size={32}/></button>
<Tile tone={tones[o%4]} label={items[o]} className="w-full max-w-4xl aspect-[4/3] text-lg"/></motion.div>}</AnimatePresence></section>)}
export function Videos(){
const [o,setO]=useState<number|null>(null)
const B='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/'
const files=['ForBiggerBlazes','ForBiggerEscapes','ForBiggerFun','ForBiggerJoyrides','ForBiggerMeltdowns','SubaruOutbackOnStreetAndDirt']
const v=[['Clinic Tour','Clinic'],['Meet the Dentist','Team'],['Treatment Explained','Education'],['Smile Transformation','Results'],['Patient Experience','Stories'],['Behind the Scenes','Studio']]
return(<section id="videos" className="mx-auto max-w-7xl px-5 py-20"><Title>See Dentistry Differently.</Title>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{v.map(([t,c],i)=><button key={t} onClick={()=>setO(i)} className="relative text-left group"><Tile label={`video ${t}`} tone={['from-sky to-white','from-lav to-white','from-mint to-white'][i%3]} className="aspect-video"/>
<span className="absolute inset-0 grid place-items-center"><span className="w-16 h-16 rounded-full bg-white/70 backdrop-blur grid place-items-center group-hover:scale-110 transition"><Play/></span></span>
<span className="absolute left-5 bottom-4 font-bold text-white drop-shadow">{t}<span className="block text-xs font-medium text-ink/50">{c}</span></span></button>)}</div>
<AnimatePresence>{o&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" onClick={()=>setO(null)} className="fixed inset-0 z-[60] bg-ink/90 grid place-items-center p-5 text-white">
<video src={`${B}${files[o]}.mp4`} controls autoPlay playsInline onClick={e=>e.stopPropagation()} className="w-full max-w-4xl rounded-[28px]"/></motion.div>}</AnimatePresence></section>)}
