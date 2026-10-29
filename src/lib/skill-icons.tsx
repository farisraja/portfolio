import React from "react";
import type { SVGProps } from "react";

// Existing SVGs
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";

// ==========================================
// CUSTOM OFFICIAL BRAND SVG LOGOS
// ==========================================

// 1. Laravel (Official Red Box / L-Hexagon)
export const LaravelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M20.25 6.5L12 2L3.75 6.5V17.5L12 22L20.25 17.5V6.5Z"
      stroke="#FF2D20"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FF2D20"
      fillOpacity="0.1"
    />
    <path
      d="M12 22V12M12 12L3.75 6.5M12 12L20.25 6.5"
      stroke="#FF2D20"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.875 4.25L16.125 8.75V15.25"
      stroke="#FF2D20"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 2. CodeIgniter (Official Flame #EE4623)
export const CodeIgniterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill="#EE4623"
      d="M12 1.5c.3 1.8-.4 3.6-1.5 5-1.3 1.6-3 2.9-3.7 4.9-.8 2.2-.4 4.7.9 6.6 1.4 2 3.8 3.2 6.3 3 2.5-.2 4.8-1.7 5.9-3.9 1.2-2.3 1-5.1-.3-7.2-1-1.6-2.5-2.9-3.3-4.7-.6-1.4-.7-2.9-.3-4.4-.8.7-1.5 1.5-2.1 2.3-1.2 1.6-1.9 3.5-1.5 5.5.4 1.8 1.6 3.4 3.2 4.2 1.4.7 3.1.7 4.4-.1.3-.2.6-.4.9-.7-.3 2.2-1.7 4.1-3.6 5-2 1-4.5.8-6.3-.5-1.8-1.3-2.7-3.5-2.2-5.7.5-2.2 2-4 3.4-5.7 1.1-1.3 1.9-2.8 1.8-4.5 0 .2 0 .1 0 0z"
    />
  </svg>
);

// 3. Vue.js (Official Green/Navy V)
export const VueIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path fill="#42B883" d="M2.5 3h4.6L12 11.5 16.9 3h4.6L12 21 2.5 3z" />
    <path fill="#35495E" d="M6.8 3h3.5L12 6.7 13.7 3h3.5L12 12 6.8 3z" />
  </svg>
);

// 4. Next.js (Dual Mode Responsive Badge)
export const NextjsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10.5" className="fill-neutral-900 dark:fill-white" />
    <path
      d="M15.8 17.2L8.5 7.5H7v9h1.5v-6.8l6.5 8.7c.3-.2.6-.4.8-.7zM14.5 7.5h1.5v5.5h-1.5V7.5z"
      className="fill-white dark:fill-neutral-900"
    />
  </svg>
);

// 5. Tailwind CSS (Official Cyan Waves)
export const TailwindIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill="#38BDF8"
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576z"
    />
  </svg>
);

// 6. Flutter (Official Blue Wing F)
export const FlutterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path fill="#47C5FB" d="M14.314 0L2.3 12l3.715 3.715L18.028 3.715h5.972L14.314 0z" />
    <path fill="#47C5FB" d="M14.286 10.971l-5.6 5.6 3.714 3.715 3.715-3.715 3.714 3.715 3.714-3.715-5.571-5.6h-3.686z" />
    <path fill="#00569E" d="M16.114 16.571l-1.828 1.829 3.714 3.714h5.972l-5.6-5.6h-2.258z" />
  </svg>
);

// 7. Jetpack Compose (Official Android Jetpack / Compose Cube & Helix)
export const JetpackComposeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path fill="#4285F4" d="M3 6.5L12 1.5l9 5v11l-9 5-9-5v-11z" />
    <path fill="#34A853" d="M12 1.5l9 5-9 5-9-5 9-5z" opacity="0.9" />
    <path fill="#000000" fillOpacity="0.15" d="M12 11.5v11l9-5v-11l-9 5z" />
    <circle cx="12" cy="12" r="3.2" fill="#FFFFFF" />
    <path
      d="M10.8 10.8a1.7 1.7 0 012.4 0m-2.4 2.4a1.7 1.7 0 002.4 0"
      stroke="#3DDC84"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// 8. MySQL (Official Dolphin Wave)
export const MySqlIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill="#00758F"
      d="M12.5 3.2c-2.3 0-4.4.8-6.1 2.2-.4.4-.7.7-1 .8-.5.2-1.3.1-1.9-.3-.5-.3-.9-.3-1.2.2-.4.7.1 1.6.8 1.9.9.4 1.8.3 2.6-.2.4-.3.9-.7 1.4-1.1 1.4-1.1 3.2-1.8 5-1.8 4.2 0 7.7 3.2 8.1 7.4.1.9-.1 1.8-.5 2.6-.4.8-1.1 1.4-1.9 1.7-.5.2-1 .3-1.6.2-.8-.1-1.5-.5-2-1.1-.6-.7-.8-1.6-.7-2.5.1-.9.6-1.7 1.3-2.2.6-.4 1.3-.6 2.1-.5.3 0 .7.1 1 .2.3.1.6 0 .7-.3.1-.3 0-.6-.3-.7-.4-.2-.9-.3-1.4-.3-.9-.1-1.8.1-2.6.6-.9.6-1.5 1.5-1.7 2.6-.2 1.1.1 2.2.8 3.1.7.9 1.6 1.4 2.7 1.6.8.1 1.5 0 2.2-.3 1.1-.4 2-1.2 2.6-2.3.6-1.1.8-2.3.7-3.5-.6-5.3-4.8-9.3-10-9.3z"
    />
    <path
      fill="#F29111"
      d="M15.4 12.8c-.3-.2-.7-.3-1.1-.3-.6 0-1.1.2-1.5.6-.4.4-.6.9-.5 1.5.1.5.4 1 .8 1.3.4.3.9.4 1.4.3.4-.1.8-.3 1.1-.6.3-.3.5-.7.5-1.2 0-.6-.3-1.2-.7-1.6zm-.4 2.1c-.2.2-.4.3-.7.3-.3 0-.6-.1-.8-.3-.2-.2-.3-.4-.3-.7 0-.3.1-.6.3-.8.2-.2.5-.3.8-.3.3 0 .5.1.7.3.2.2.3.4.3.7 0 .3-.1.6-.3.8z"
    />
  </svg>
);

// 9. Room Database (Android SQLite / Architecture Component)
export const RoomDatabaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <ellipse cx="12" cy="5" rx="8" ry="3" fill="#3DDC84" />
    <path
      fill="#2E7D32"
      d="M4 5v5c0 1.66 3.58 3 8 3s8-1.34 8-3V5c0 1.66-3.58 3-8 3S4 6.66 4 5z"
    />
    <path
      fill="#1B5E20"
      d="M4 10v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5c0 1.66-3.58 3-8 3s-8-1.34-8-3z"
    />
    <path
      fill="#0D3B10"
      d="M4 15v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4c0 1.66-3.58 3-8 3s-8-1.34-8-3z"
    />
    <path
      fill="#FFFFFF"
      d="M10 4.2h4c.4 0 .7.3.7.7s-.3.7-.7.7h-4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7z"
    />
  </svg>
);

// 10. REST API (Networking HTTP Connectors)
export const RestApiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="20" height="15" x="2" y="4.5" rx="3.5" fill="#0284C7" />
    <path
      d="M6 10l-2 2 2 2M10 10l2 2-2 2M14 14.5h4"
      stroke="#FFFFFF"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="9.5" r="1.25" fill="#38BDF8" />
  </svg>
);

// 11. WebSockets (Bi-directional Real-Time Lightning / Signal Socket)
export const WebSocketsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="#E03C11" />
    <path
      fill="#FFFFFF"
      d="M13 3.5L6.5 13h4.5l-1 7.5L17.5 11h-4.5l1-7.5z"
    />
  </svg>
);

// 12. PHP (Official Purple Capsule)
export const PhpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <ellipse cx="12" cy="12" rx="11" ry="6.5" fill="#777BB4" />
    <path
      fill="#FFFFFF"
      d="M6.5 13.8h1.2c.8 0 1.4-.4 1.4-1.2 0-.8-.6-1.2-1.4-1.2H6.5v2.4zm-1.2 2.2V9.2h2.4c1.5 0 2.6.8 2.6 2.3 0 1.4-1 2.3-2.6 2.3H6.5v2.2H5.3zm6.2 0V9.2h1.2v2.7h2.2V9.2h1.2v6.8h-1.2v-2.9h-2.2v2.9h-1.2zm7.2-2.2h1.2c.8 0 1.4-.4 1.4-1.2 0-.8-.6-1.2-1.4-1.2h-1.2v2.4zm-1.2 2.2V9.2h2.4c1.5 0 2.6.8 2.6 2.3 0 1.4-1 2.3-2.6 2.3h-1.2v2.2h-1.2z"
    />
  </svg>
);

// 13. JavaScript (Official Yellow Shield)
export const JavaScriptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="22" height="22" x="1" y="1" rx="3" fill="#F7DF1E" />
    <path
      fill="#000000"
      d="M7.5 17.5c.8.5 1.8.8 2.8.8 1.4 0 2.3-.7 2.3-1.8 0-1.1-.8-1.5-2.2-2.1-1.8-.7-3-1.7-3-3.6 0-1.9 1.5-3.3 3.8-3.3 1 0 1.9.2 2.6.6l-.6 1.7c-.6-.4-1.3-.6-2-.6-1.2 0-1.9.6-1.9 1.5 0 1 .8 1.4 2.2 2 1.9.8 3 1.8 3 3.8 0 2.1-1.6 3.5-4.2 3.5-1.2 0-2.3-.3-3.1-.8l.5-1.7zm9.8-9.4h2v8.5c0 1.8-.9 2.9-2.7 2.9-.8 0-1.6-.2-2.2-.6l.5-1.6c.5.3 1 .5 1.6.5.9 0 1.4-.5 1.4-1.5V8.1h-.6z"
    />
  </svg>
);

// 14. Git (Official Orange Diamond)
export const GitIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill="#F05032"
      d="M21.6 10.9L13.1 2.4c-.8-.8-2.1-.8-2.8 0L8.7 4c-.3.3-.5.7-.5 1.1 0 .4.2.8.5 1.1l1.7 1.7v5.3c-.5.3-.9.7-1.1 1.2-.5 0-.9-.1-1.4-.4L6.4 12.5c.3-.3.4-.6.4-1 0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5c.2 0 .4 0 .6-.1l1.6 1.6c.6.6 1.4.9 2.2.9.2 0 .4 0 .6-.1.3.6.8 1.1 1.5 1.3v1.8c-.4.2-.7.6-.7 1.1 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.5-.3-.9-.7-1.1v-1.8c.7-.2 1.2-.7 1.5-1.3.5-.9.4-2.1-.3-2.9V9.5l2.2 2.2c.8.8 2.1.8 2.8 0l3.4-3.4c.8-.8.8-2.1 0-2.9z"
    />
  </svg>
);

// 15. Vite (Lightning Bolt)
export const ViteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill="#646CFF"
      d="M21.5 3.5l-9 17L3 3.5h4.5l5 9.5 5-9.5h4z"
    />
    <path
      fill="#FFD62E"
      d="M13.5 1.5L6.5 12h4.5l-1.5 8.5 7.5-10.5h-4.5l1-8.5z"
    />
  </svg>
);

// 16. Supabase (Emerald Lightning Bolt)
export const SupabaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill="#3ECF8E"
      d="M13.5 1.5L2 15.5h8.5L9 22.5l11.5-14H12l1.5-7z"
    />
  </svg>
);

// 17. SCORM (LMS Standard Package Icon)
export const ScormIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="3" fill="#2563EB" />
    <path
      d="M7 8h10M7 12h7M7 16h5"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// 18. Bootstrap (Official Purple B)
export const BootstrapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="22" height="22" x="1" y="1" rx="5" fill="#7952B3" />
    <path
      fill="#FFFFFF"
      d="M8 6h4.5c1.7 0 2.8.9 2.8 2.2 0 1-.6 1.7-1.5 2 1.2.3 1.9 1.1 1.9 2.3 0 1.5-1.2 2.5-3.1 2.5H8V6zm2.3 3.6h2.1c.7 0 1.1-.3 1.1-.9 0-.5-.4-.8-1.1-.8h-2.1v1.7zm0 3.8h2.3c.8 0 1.2-.4 1.2-.9 0-.6-.4-.9-1.2-.9h-2.3v1.8z"
    />
  </svg>
);

// 19. Blade (Laravel Blade Template / Sharp Eye)
export const BladeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="#F05340" />
    <path
      d="M6 12s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z"
      fill="#FFFFFF"
    />
    <circle cx="12" cy="12" r="2.2" fill="#F05340" />
  </svg>
);

// 20. Default / Fallback Code Icon for any unlisted skill
export const DefaultSkillIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primary"
    {...props}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

// 21. Laravel Sanctum (Shield Key / API Token Auth)
export const SanctumIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2L4 5.5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11v-6L12 2z"
      fill="#FF2D20"
      fillOpacity="0.12"
      stroke="#FF2D20"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10.5" r="2.25" stroke="#FF2D20" strokeWidth="1.75" />
    <path
      d="M12 12.75V17m-1.5-1.5h3"
      stroke="#FF2D20"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
);

// ==========================================
// CENTRAL ICON REGISTRY MAP
// ==========================================

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  // Web Frameworks & Libraries
  laravel: LaravelIcon,
  codeigniter: CodeIgniterIcon,
  codeigniter3: CodeIgniterIcon,
  "codeigniter 3": CodeIgniterIcon,
  ci3: CodeIgniterIcon,
  vue: VueIcon,
  vuejs: VueIcon,
  "vue.js": VueIcon,
  nextjs: NextjsIcon,
  "next.js": NextjsIcon,
  react: ReactLight,
  reactjs: ReactLight,
  "react.js": ReactLight,
  tailwind: TailwindIcon,
  tailwindcss: TailwindIcon,
  "tailwind css": TailwindIcon,
  bootstrap: BootstrapIcon,
  vite: ViteIcon,
  blade: BladeIcon,

  // Mobile
  flutter: FlutterIcon,
  jetpackcompose: JetpackComposeIcon,
  "jetpack compose": JetpackComposeIcon,
  compose: JetpackComposeIcon,
  android: JetpackComposeIcon,

  // Languages
  python: Python,
  typescript: Typescript,
  ts: Typescript,
  javascript: JavaScriptIcon,
  js: JavaScriptIcon,
  php: PhpIcon,
  go: Golang,
  golang: Golang,
  java: Java,
  "c++": Csharp,
  cpp: Csharp,
  csharp: Csharp,

  // Databases & Backend
  mysql: MySqlIcon,
  roomdatabase: RoomDatabaseIcon,
  "room database": RoomDatabaseIcon,
  room: RoomDatabaseIcon,
  postgres: Postgresql,
  postgresql: Postgresql,
  supabase: SupabaseIcon,

  // Protocols, Architecture & Tools
  restapi: RestApiIcon,
  "rest api": RestApiIcon,
  rest: RestApiIcon,
  api: RestApiIcon,
  websockets: WebSocketsIcon,
  websocket: WebSocketsIcon,
  scorm: ScormIcon,
  "scorm rte": ScormIcon,
  sanctum: SanctumIcon,
  "laravel sanctum": SanctumIcon,
  git: GitIcon,
  github: GitIcon,
  docker: Docker,
  kubernetes: Kubernetes,
  nodejs: Nodejs,
  "node.js": Nodejs,
};

/**
 * Mendapatkan komponen Icon SVG berdasarkan key atau nama keahlian.
 * Mendukung pencarian case-insensitive dan normalisasi string (misal: "CodeIgniter 3" -> "codeigniter3").
 */
export function getSkillIcon(
  keyOrName?: string | null
): React.ComponentType<{ className?: string }> {
  if (!keyOrName) return DefaultSkillIcon;
  const raw = keyOrName.toLowerCase().trim();
  const stripped = raw.replace(/[^a-z0-9]/g, "");

  return ICON_MAP[raw] || ICON_MAP[stripped] || DefaultSkillIcon;
}
