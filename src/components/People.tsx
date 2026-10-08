import { Star } from 'lucide-react'
import { dentists, reviews, faqs } from '../data'
import { Title, Tile, Reveal } from './ui'
import { useState } from 'react'
export function Team(){return(<section id="team" className="mx-auto max-w-7xl px-5 py-20"><Title>Meet the People Behind the Smiles.</Title>
<div className="grid md:grid-cols-3 gap-5">{dentists.map((d,i)=><Reveal key={i} delay={i*.1}><article className="group rounded-[32px] bg-white border border-sand p-4 hover:shadow-soft transition">
<div className="overflow-hidden rounded-[24px]"><Tile tone="from-lav to-mint" label="Portrait" className="aspect-[4/5] group-hover:scale-105 transition duration-700"/></div>
<h3 className="mt-4 text-xl font-bold">{d.n} <span className="text-sm font-medium text-ink/50">{d.q}</span></h3><p className="text-sm font-semibold">{d.s} · {d.e}</p><p className="mt-2 text-sm text-ink/60">{d.b}</p></article></Reveal>)}</div></section>)}
export function Testimonials(){return(<section id="reviews" className="py-20 bg-ivory"><div className="mx-auto max-w-7xl px-5">
<Title sub="Based on 500+ patient reviews (demo figures until real reviews are added)">Loved by Our Patients.</Title>
<p className="-mt-6 mb-8 text-3xl font-extrabold">4.9 <span className="text-amber-500">★★★★★</span></p></div>
<div className="flex overflow-x-auto snap-x no-bar gap-4 px-5 lg:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]">{reviews.map(r=><figure key={r.n} className="snap-center shrink-0 w-[85%] sm:w-96 rounded-[32px] bg-white p-7 shadow-soft">
<div className="flex text-amber-500">{[...Array(5)].map((_,i)=><Star key={i} size={16} fill="currentColor"/>)}</div><blockquote className="mt-4">“{r.r}”</blockquote>
<figcaption className="mt-5 text-sm font-bold">{r.n}<span className="block font-medium text-ink/50">{r.t} · Demo review</span></figcaption></figure>)}</div></section>)}
export function Social(){return(<section className="mx-auto max-w-7xl px-5 py-20"><Title>Follow the Pearl Smile.</Title>
<div className="grid grid-cols-3 md:grid-cols-6 gap-2">{[...Array(6)].map((_,i)=><Tile key={i} tone={['from-mint to-sky','from-lav to-white','from-ivory to-sand'][i%3]} className="aspect-square rounded-2xl hover:scale-95 hover:rotate-1 transition"/>)}</div>
<p className="mt-5 font-bold">@pearldentalclinic <a href="#" className="ml-3 rounded-full bg-ink text-pearl px-5 py-2 text-sm">Follow Us</a></p></section>)}
export function FAQ(){const [o,setO]=useState<number|null>(0);return(<section className="mx-auto max-w-3xl px-5 py-20"><Title>Questions, answered.</Title>
{faqs.map(([q,a],i)=><div key={q} className="border-b border-sand"><button aria-expanded={o===i} onClick={()=>setO(o===i?null:i)} className="w-full flex justify-between py-5 text-left font-bold">{q}<span>{o===i?'−':'+'}</span></button>
<div className={`grid transition-all duration-300 ${o===i?'grid-rows-[1fr] pb-5':'grid-rows-[0fr]'}`}><p className="overflow-hidden text-ink/60">{a}</p></div></div>)}</section>)}
