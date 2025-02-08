import type { google } from "@react-google-maps/api"

declare global {
  interface Window {
    google: typeof google
  }
}

