"use client";

import { motion } from "framer-motion";
import SparkleField from "./SparkleField";
import CircuitLines from "./CircuitLines";

const items=[
{title:"Global AI Contact Center",size:"lg",desc:"Reduced response times with enterprise AI agents."},
{title:"Autonomous Finance",size:"sm",desc:"Invoice processing with intelligent automation."},
{title:"Healthcare Intelligence",size:"sm",desc:"Predictive analytics for clinical operations."},
{title:"Smart Manufacturing",size:"lg",desc:"AI vision and predictive maintenance platform."},
];

export default function CaseStudies(){
return(
<section className="relative bg-[#04040A] py-36 text-white overflow-hidden">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,.15),transparent_45%)]"/>
<CircuitLines opacity={0.05} pulses={2} />
<SparkleField count={16} />
<div className="mx-auto max-w-7xl px-6">
<motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
<p className="text-sm uppercase tracking-[0.4em] text-violet-300">Case Studies</p>
<h2 className="mt-4 text-5xl lg:text-7xl font-black">Enterprise Success Stories</h2>
</motion.div>

<div className="mt-20 grid auto-rows-[260px] gap-6 md:grid-cols-2">
{items.map((c,i)=>(
<motion.div
key={c.title}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:i*0.08}}
whileHover={{scale:1.02}}
className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl ${c.size==="lg"?"md:row-span-2":""}`}>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,.25),transparent_60%)] group-hover:scale-110 transition duration-700"/>
<div className="absolute inset-0 opacity-20 bg-[linear-gradient(135deg,transparent,rgba(255,255,255,.08),transparent)]"/>
<div className="relative flex h-full flex-col justify-end p-8">
<div className="mb-4 inline-flex w-fit rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs tracking-[0.3em] text-violet-300">LIVE PROJECT</div>
<h3 className="text-3xl font-bold">{c.title}</h3>
<p className="mt-4 max-w-md text-zinc-300">{c.desc}</p>
<div className="mt-8 flex items-center gap-2 text-amber-300">
<span>View Details</span>
<motion.span animate={{x:[0,6,0]}} transition={{duration:1.4,repeat:Infinity}}>→</motion.span>
</div>
</div>
</motion.div>
))}
</div>
</div>
</section>
)}
