export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
} 

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPEND = "SUSPEND",
}

export enum NodeEnv {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PICKED = "PICKED",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  CARD = "CARD",
  BANK = "BANK",
}

export const PUBLIC_NAVBAR_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "All Gear", href: "/gear" },
] as const;

export const defaultImage =
  "https://praise.com.sg/wp-content/uploads/2024/08/gallery-33.png";

export enum TokenNames {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}
