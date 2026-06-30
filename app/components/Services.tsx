"use client";

import { motion } from "framer-motion";
import SparkleField from "./SparkleField";
import CircuitLines from "./CircuitLines";

const services=[
["Enterprise AI","Autonomous AI agents, copilots and business intelligence."],
["Cloud Engineering","Scalable cloud platforms with enterprise reliability."],
["Cybersecurity","Zero-trust security, governance and threat protection."],
["Automation","End-to-end workflow automation across business systems."],
["Data & Analytics","Real-time dashboards and predictive intelligence."],
["Digital Transformation","Modern platforms for global enterprises."],
];

export default function Services(){
 return(
<section className="relative overflow-hidden bg-[#050508] py-32 text-white">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,.18),transparent_60%)]"/>
<CircuitLines opacity={0.05} pulses={2} />
<SparkleField count={18} />
<div className="mx-auto max-w-7xl px-6">
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
<p className="mb-4 text-sm uppercase tracking-[0.4em] text-violet-300">Enterprise Services</p>
<h2 className="max-w-4xl text-5xl font-black leading-tight lg:text-7xl">
Technology that powers
<span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
the next generation.
</span>
</h2>
</motion.div>

<div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
{services.map(([t,d],i)=>(
<motion.div key={t}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:i*0.08}}
whileHover={{y:-10,rotateX:3,rotateY:-3}}
className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
<div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-violet-600/20 via-transparent to-fuchsia-500/20"/>
<div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-2xl font-bold shadow-[0_0_40px_rgba(168,85,247,.45)]">
0{i+1}
</div>
<h3 className="text-2xl font-bold">{t}</h3>
<p className="mt-4 leading-7 text-zinc-300">{d}</p>
<div className="mt-10 flex items-center justify-between">
<span className="text-violet-300">Explore</span>
<motion.span animate={{x:[0,6,0]}} transition={{duration:1.5,repeat:Infinity}}>→</motion.span>
</div>
</motion.div>
))}
</div>
</div>
</section>
)}
