export type Avatar = {
  id: string;
  imageSrc?: string;
  imagePosition?: string;
  imageScale?: number;
  initials: string;
  label: string;
  gradient: string;
  colors: [string, string, string];
  symbol?: string;
};

const gradients = [
  {
    className: "from-cyan-300 via-sky-500 to-indigo-500",
    colors: ["#67e8f9", "#0ea5e9", "#6366f1"] as [string, string, string],
  },
  {
    className: "from-emerald-300 via-teal-500 to-cyan-600",
    colors: ["#6ee7b7", "#14b8a6", "#0891b2"] as [string, string, string],
  },
  {
    className: "from-rose-300 via-fuchsia-500 to-violet-600",
    colors: ["#fda4af", "#d946ef", "#7c3aed"] as [string, string, string],
  },
  {
    className: "from-amber-200 via-orange-500 to-red-500",
    colors: ["#fde68a", "#f97316", "#ef4444"] as [string, string, string],
  },
  {
    className: "from-lime-200 via-emerald-500 to-slate-700",
    colors: ["#d9f99d", "#10b981", "#334155"] as [string, string, string],
  },
  {
    className: "from-violet-300 via-purple-500 to-pink-500",
    colors: ["#c4b5fd", "#a855f7", "#ec4899"] as [string, string, string],
  },
  {
    className: "from-blue-200 via-cyan-500 to-teal-500",
    colors: ["#bfdbfe", "#06b6d4", "#14b8a6"] as [string, string, string],
  },
  {
    className: "from-stone-200 via-zinc-500 to-neutral-800",
    colors: ["#e7e5e4", "#71717a", "#262626"] as [string, string, string],
  },
  {
    className: "from-yellow-200 via-lime-500 to-green-700",
    colors: ["#fef08a", "#84cc16", "#15803d"] as [string, string, string],
  },
  {
    className: "from-red-200 via-rose-500 to-pink-700",
    colors: ["#fecaca", "#f43f5e", "#be185d"] as [string, string, string],
  },
];

const profileAvatars: Avatar[] = [
  {
    id: "avatar-01",
    label: "Real woman",
    imageSrc: "/perfiles/mujer.png",
    initials: "LS",
    gradient: gradients[0].className,
    colors: gradients[0].colors,
  },
  {
    id: "avatar-02",
    label: "Real man",
    imageSrc: "/perfiles/hombre.png",
    initials: "MR",
    gradient: gradients[1].className,
    colors: gradients[1].colors,
  },
  {
    id: "avatar-03",
    label: "Cartoon woman",
    imageSrc: "/perfiles/mujer-cartoon.png",
    imagePosition: "center 48%",
    imageScale: 1.24,
    initials: "CW",
    gradient: gradients[2].className,
    colors: gradients[2].colors,
  },
  {
    id: "avatar-04",
    label: "Cartoon man",
    imageSrc: "/perfiles/hombre-cartoon.png",
    imagePosition: "center 46%",
    imageScale: 1.22,
    initials: "CM",
    gradient: gradients[3].className,
    colors: gradients[3].colors,
  },
];

const expressiveAvatars: Avatar[] = [
  {
    id: "avatar-05",
    label: "Simple smile",
    symbol: "🙂",
    initials: "🙂",
    gradient: gradients[4].className,
    colors: gradients[4].colors,
  },
  {
    id: "avatar-06",
    label: "Sunglasses face",
    symbol: "😎",
    initials: "😎",
    gradient: gradients[5].className,
    colors: gradients[5].colors,
  },
  {
    id: "avatar-07",
    label: "Anonymous user",
    symbol: "👤",
    initials: "👤",
    gradient: gradients[6].className,
    colors: gradients[6].colors,
  },
  {
    id: "avatar-08",
    label: "Spark creator",
    symbol: "✦",
    initials: "✦",
    gradient: gradients[7].className,
    colors: gradients[7].colors,
  },
  {
    id: "avatar-09",
    label: "Chat bubble",
    symbol: "💬",
    initials: "💬",
    gradient: gradients[8].className,
    colors: gradients[8].colors,
  },
  {
    id: "avatar-10",
    label: "Creator camera",
    symbol: "🎥",
    initials: "🎥",
    gradient: gradients[9].className,
    colors: gradients[9].colors,
  },
  {
    id: "avatar-11",
    label: "Idea spark",
    symbol: "⚡",
    initials: "⚡",
    gradient: gradients[0].className,
    colors: gradients[0].colors,
  },
  {
    id: "avatar-12",
    label: "Launch energy",
    symbol: "🚀",
    initials: "🚀",
    gradient: gradients[1].className,
    colors: gradients[1].colors,
  },
];

const letterAvatars: Avatar[] = Array.from({ length: 48 }, (_, index) => {
  const number = index + 13;

  return {
    id: `avatar-${number.toString().padStart(2, "0")}`,
    label: `Avatar ${number}`,
    initials: String.fromCharCode(65 + (index % 26)),
    gradient: gradients[index % gradients.length].className,
    colors: gradients[index % gradients.length].colors,
  };
});

export const avatars: Avatar[] = [
  ...profileAvatars,
  ...expressiveAvatars,
  ...letterAvatars,
];

export function getAvatar(id: string) {
  return avatars.find((avatar) => avatar.id === id) ?? avatars[0];
}
