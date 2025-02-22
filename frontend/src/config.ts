declare global {
  interface ImportMetaEnv {
    VITE_API_HOST: string;
  }
}
export const { VITE_API_HOST } = import.meta.env;

export const API_HOST = VITE_API_HOST ?? "http://localhost:3000";
