"use client";

import { useEffect, useState } from "react";

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export default function AIStats() {
  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "AI Workflows Automated",
    },
    {
      number: 120,
      suffix: "+",
      label: "Enterprise Projects Delivered",
    },
    {
      number: 40,
      suffix: "%",
      label: "Operational Cost Reduction",
    },
    {
      number: 24,
      suffix: "/7",
      label: "AI Systems Monitoring",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {stats.map((item, index) => (
            <div key={index} className="space-y-3">

              <h3 className="text-4xl md:text-5xl font-bold">
                <Counter value={item.number} />
                {item.suffix}
              </h3>

              <p className="text-sm md:text-base text-purple-200">
                {item.label}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}