import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { packages } from '../data'
import { Title, Btn } from './ui'
function PackageCard({p}:{p:typeof packages[number]}){return(
<motion.article whileHover={{y:-8}} className={`rounded-[32px] p-7 flex flex-col ${p.tone} border border-white shadow-soft`}>
<h3 className="text-2xl font-extrabold">{p.name}</h3>
<ul className="mt-6 space-y-3 flex-1 text-sm font-medium">{p.items.map(i=><li key={i} className="flex gap-2">{i}</li>)}</ul>
<Btn className="mt-8">{p.cta}</Btn></motion.article>)}
export default function Packages(){return(
<section id="packages" className="mx-auto max-w-7xl px-5 py-20"><Title sub="Ask us about current pricing when you book.">Smile Packages Made Simple.</Title>
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{packages.map(p=><PackageCard key={p.name} p={p}/>)}</div></section>)}
