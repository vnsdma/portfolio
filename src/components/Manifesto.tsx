import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  'I approach software engineering with intentional discipline. Where typical applications suffer from layout shifts, unverified payment callbacks, or sluggish rendering, I build production-grade systems from first principles: Next.js 15 server components, cryptographically authenticated multi-gateway webhooks, resilient state machines, and sub-second responsive interfaces. Velocity without discipline is noise; craft is what endures.';

export const Manifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // The one scroll-driven moment on the page: words resolve as you read.
  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = textRef.current.querySelectorAll('.scrub-word');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      aria-labelledby="manifesto-title"
      className="wrap scroll-mt-20 pb-20 sm:pb-28"
    >
      <div className="card p-8 sm:p-14">
        <div className="max-w-4xl">
          <p className="eyebrow">
            <span className="dot" aria-hidden="true" />
            <span id="manifesto-title">Engineering manifesto</span>
          </p>

          <blockquote className="mt-6">
            <p
              ref={textRef}
              className="font-display text-[1.375rem] font-semibold leading-[1.4] tracking-tight text-head sm:text-3xl sm:leading-[1.35]"
            >
              {STATEMENT.split(' ').map((word, i) => (
                <span key={i} className="scrub-word">
                  {word}{' '}
                </span>
              ))}
            </p>
          </blockquote>

          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-hl" aria-hidden="true" />
            <span className="t-small text-dim">Naufal Faris Fadhil, Fullstack Software Engineer</span>
          </div>
        </div>
      </div>
    </section>
  );
};
