"use client";

import { motion } from "framer-motion";
import SparkleField from "./SparkleField";
import CircuitLines from "./CircuitLines";

const platforms=[
{
title:"Nexyra AI",
tag:"Autonomous Intelligence",
desc:"Enterprise AI workforce with memory, reasoning and autonomous execution."
},
{
title:"Vision Analytics",
tag:"Predictive Intelligence",
desc:"Real-time dashboards, forecasting and AI-powered operational insights."
},
{
title:"Automation OS",
tag:"Workflow Engine",
desc:"Connects enterprise systems to automate complex business processes."
},
];

export default function AIPlatforms(){
return(
<section className="relative overflow-hidden bg-gradient-to-b from-[#050508] to-[#090914] py-36 text-white">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,.18),transparent_65%)]"/>
<CircuitLines opacity={0.06} pulses={2} />
<SparkleField count={16} />
<div className="mx-auto max-w-7xl px-6">
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
<p className="uppercase tracking-[0.4em] text-violet-300 text-sm">AI Platform</p>
<h2 className="mt-5 text-5xl lg:text-7xl font-black leading-none">
Meet the
<span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
Nexxovate AI Ecosystem
</span>
</h2>
</motion.div>

<div className="mt-20 grid gap-8 lg:grid-cols-3">
{platforms.map((p,i)=>(
<motion.div
key={p.title}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:i*0.12}}
whileHover={{y:-12,rotateX:4}}
className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl">

<div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-600/20 blur-[80px] transition group-hover:scale-125"/>

<div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-700 via-fuchsia-600 to-amber-300 text-3xl shadow-[0_0_50px_rgba(168,85,247,.5)]">
✦
</div>

<span className="text-xs uppercase tracking-[0.35em] text-violet-300">
{p.tag}
</span>

<h3 className="mt-4 text-3xl font-bold">{p.title}</h3>

<p className="mt-5 leading-8 text-zinc-300">
{p.desc}
</p>

<div className="mt-10 space-y-3">
{["Neural Engine","Live Intelligence","Enterprise Ready"].map(item=>(
<div key={item} className="flex items-center gap-3">
<span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
<span className="text-sm text-zinc-300">{item}</span>
</div>
))}
</div>

<motion.div
className="mt-10 h-1 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300"
animate={{scaleX:[0.3,1,0.3]}}
transition={{duration:3+i,repeat:Infinity}}
style={{transformOrigin:"left"}}
/>

</motion.div>
))}
</div>
</div>
</section>
)}
