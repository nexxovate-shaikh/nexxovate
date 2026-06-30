"use client";

import { motion } from "framer-motion";
import SparkleField from "./SparkleField";
import CircuitLines from "./CircuitLines";

const testimonials=[
{
name:"Global Manufacturing Client",
role:"CTO",
quote:"Nexxovate transformed our operations with enterprise AI and automation. Delivery quality exceeded expectations."
},
{
name:"Financial Services Partner",
role:"Director of Technology",
quote:"From cloud modernization to AI assistants, the implementation was seamless and highly scalable."
},
{
name:"Healthcare Enterprise",
role:"Head of Innovation",
quote:"Their AI platform reduced manual effort dramatically while improving security and compliance."
},
];

export default function Testimonials(){
return(
<section className="relative overflow-hidden bg-[#050508] py-36 text-white">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,.18),transparent_55%)]"/>
<CircuitLines opacity={0.05} pulses={1} />
<SparkleField count={14} />
<div className="mx-auto max-w-7xl px-6">
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
<p className="text-sm uppercase tracking-[0.4em] text-violet-300">Testimonials</p>
<h2 className="mt-4 text-5xl lg:text-7xl font-black">
Trusted by Enterprise Leaders
</h2>
</motion.div>

<div className="mt-20 grid gap-8 lg:grid-cols-3">
{testimonials.map((t,i)=>(
<motion.div
key={i}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:i*0.1}}
whileHover={{y:-10}}
className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

<div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-[90px]"/>

<div className="mb-8 text-6xl font-black text-violet-400">"</div>

<p className="relative text-lg leading-8 text-zinc-200">
{t.quote}
</p>

<div className="mt-10 h-px w-full bg-gradient-to-r from-violet-500/60 to-transparent"/>

<div className="mt-8">
<h3 className="text-xl font-bold">{t.name}</h3>
<p className="mt-1 text-zinc-400">{t.role}</p>
</div>

<motion.div
className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300"
animate={{width:["15%","100%","35%"]}}
transition={{duration:4+i,repeat:Infinity}}
/>

</motion.div>
))}
</div>
</div>
</section>
)}
