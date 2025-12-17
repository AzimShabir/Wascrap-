import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-slot', '@radix-ui/react-toast'],
          supabase: ['@supabase/supabase-js'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          query: ['@tanstack/react-query'],
          form: ['react-hook-form', '@hookform/resolvers'],
          icons: ['lucide-react'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    assetsInlineLimit: 4096
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
