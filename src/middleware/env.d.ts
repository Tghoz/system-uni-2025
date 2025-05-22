import type { MiddlewareLocals } from 'astro';

declare global {
  namespace App {
    interface Locals extends MiddlewareLocals {
      Name?: string; // Define la propiedad que usarás
    }
  }
}