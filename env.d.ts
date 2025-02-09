interface ImportMetaEnv {
    readonly BASE_URL: string;
    readonly VITE_BACKEND_URL : string;
    // Add other environment variables here...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }