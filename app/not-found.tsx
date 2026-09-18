import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grain vignette relative flex min-h-[100svh] items-center overflow-hidden bg-void">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(77,124,255,0.22) 0%, transparent 66%)",
        }}
      />
      <div className="blueprint pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <p className="font-mono-ui text-[0.62rem] tracking-[0.22em] text-white/30">
          ERROR 404 — NO ROUTE
        </p>

        <h1 className="display-xl mt-7 text-forge">
          That path doesn&apos;t resolve.
        </h1>

        <p className="lede mx-auto mt-7 text-center">
          The page you were looking for isn&apos;t here. The signal was received,
          the correlation failed, and this is the honest escalation.
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/"
            className="rounded-full bg-paper px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-wide text-void transition-transform duration-500 hover:-translate-y-0.5"
          >
            Back to Nexxovate
          </Link>
          <Link
            href="/#nexaf"
            className="rounded-full border border-white/14 px-7 py-3.5 text-[0.82rem] font-medium text-paper/85 transition-colors duration-400 hover:border-white/30"
          >
            Ask NEXAF
          </Link>
        </div>
      </div>
    </section>
  );
}
