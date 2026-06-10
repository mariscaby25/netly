export const STORE_NAME = import.meta.env.VITE_STORE_NAME || "GlowHair Store";
export const STORE_PHONE = import.meta.env.VITE_STORE_PHONE || "+233000000000";
export const STORE_WHATSAPP =
  import.meta.env.VITE_STORE_WHATSAPP || "+233000000000";
export const STORE_EMAIL =
  import.meta.env.VITE_STORE_EMAIL || "info@glowhair.com";
export const STORE_ADDRESS =
  import.meta.env.VITE_STORE_ADDRESS || "Accra, Ghana";

export const TEXTURES = [
  "Straight",
  "Body Wave",
  "Loose Wave",
  "Deep Wave",
  "Curly",
  "Kinky Curly",
  "Kinky Straight",
  "Water Wave",
];
export const LENGTHS = [
  '8"',
  '10"',
  '12"',
  '14"',
  '16"',
  '18"',
  '20"',
  '22"',
  '24"',
  '26"',
  '28"',
  '30"',
];
export const COLORS = [
  "Natural Black",
  "Off Black",
  "#1B Natural Black",
  "Dark Brown",
  "Medium Brown",
  "Light Brown",
  "Blonde",
  "Highlighted",
  "Ombre",
  "Custom Color",
];

export function whatsappLink(message = "") {
  const phone = STORE_WHATSAPP.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function callLink() {
  return `tel:${STORE_PHONE}`;
}
