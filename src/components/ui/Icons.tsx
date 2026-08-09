import { SVGProps } from "react";

// Kézzel rajzolt, egyszerű ikonkészlet — nincs külső ikon-csomag függőség.
export function IconPaw(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7.2 10.3c1.15 0 2.08-1.15 2.08-2.57S8.35 5.16 7.2 5.16 5.12 6.31 5.12 7.73s.93 2.57 2.08 2.57Zm9.6 0c1.15 0 2.08-1.15 2.08-2.57s-.93-2.57-2.08-2.57-2.08 1.15-2.08 2.57.93 2.57 2.08 2.57ZM3.4 14.9c1 0 1.8-1 1.8-2.24S4.4 10.4 3.4 10.4s-1.8 1.02-1.8 2.26.8 2.24 1.8 2.24Zm17.2 0c1 0 1.8-1 1.8-2.24s-.8-2.26-1.8-2.26-1.8 1.02-1.8 2.26.8 2.24 1.8 2.24ZM12 12.2c-2.68 0-6.1 2.03-6.1 4.86 0 1.5 1.18 2.44 2.7 2.44.98 0 1.6-.32 2.4-.32.42 0 .8.13 1 .13.2 0 .58-.13 1-.13.8 0 1.42.32 2.4.32 1.52 0 2.7-.94 2.7-2.44 0-2.83-3.42-4.86-6.1-4.86Z" />
    </svg>
  );
}

export function IconHeart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M12 20.5S3.5 15.2 3.5 9.3C3.5 6.3 5.9 4 8.7 4c1.7 0 3.2.9 3.3 2.6C12.1 4.9 13.6 4 15.3 4c2.8 0 5.2 2.3 5.2 5.3 0 5.9-8.5 11.2-8.5 11.2Z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 19v-5h4v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M4 16v-3.2a2 2 0 0 1 .4-1.2L6 9h12l1.6 2.6a2 2 0 0 1 .4 1.2V16" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="16" width="18" height="3.4" rx="1" />
      <circle cx="7.5" cy="19.5" r="1.4" />
      <circle cx="16.5" cy="19.5" r="1.4" />
    </svg>
  );
}

export function IconUsers(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.7-3 2.9-4.7 5.5-4.7s4.8 1.7 5.5 4.7" strokeLinecap="round" />
      <circle cx="17" cy="8.5" r="2.3" />
      <path d="M15.8 14.6c2.2.2 4 1.8 4.6 4.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} {...props}>
      <path d="M5 12.5 9.5 17 19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.25-1.5 1.55-1.5H16.6V4.3c-.27-.04-1.2-.1-2.3-.1-2.3 0-3.86 1.4-3.86 3.96v2.2H8v3h2.44V21h3.06Z" />
    </svg>
  );
}

export function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="m5 5 14 14M19 5 5 19" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSyringe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="m18 3 3 3M4 20l3.5-3.5M9 9l6 6M7 15l2.3-2.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4L11 19l-6-6 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m14.5 6.5 3-3M17 9l3-3" strokeLinecap="round" />
    </svg>
  );
}

export function IconCatFace(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M5 4.5 8 10M19 4.5 16 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 9.5a6.2 6.2 0 0 1 12 0v3.8a6 6 0 1 1-12 0Z" strokeLinejoin="round" />
      <path d="M9.3 14.2c.4.5 1 .8 1.7.8v0c.7 0 1.3-.3 1.7-.8" strokeLinecap="round" />
      <circle cx="9.2" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBowl(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M3.5 12h17a1 1 0 0 1 1 1.1c-.4 3.6-3.7 6.4-9.5 6.4s-9.1-2.8-9.5-6.4a1 1 0 0 1 1-1.1Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12V7a4 4 0 1 1 8 0v5" strokeLinecap="round" />
    </svg>
  );
}
