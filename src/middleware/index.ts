// src/middleware.ts
import type { MiddlewareHandler } from 'astro';
import jwt from 'jsonwebtoken';

export const onRequest: MiddlewareHandler = async ({ cookies, redirect, request }, next) => {
  const url = new URL(request.url);
  const token = cookies.get('authToken')?.value;
  const publicPaths = ['/login', '/registro', '/recuperar-contrasena'];

  // 1. Acceso rápido para desarrollo
  if (process.env.NODE_ENV === "development" && token === "dev_token_falso") {
    return next(); // Acceso directo
  }

  // 2. Redirigir si ya está autenticado y trata de acceder a login/registro
  if (token && (url.pathname === '/login' || url.pathname === '/registro')) {
    return redirect('/', 302);
  }

  // 3. Permitir acceso a rutas públicas
  if (publicPaths.includes(url.pathname)) {
    return next();
  }

  // 4. Verificar autenticación para rutas protegidas
  if (!token) {
    return redirect('/login', 302);
  }

  // 5. Validar token JWT en producción
  try {
    jwt.verify(token, 'ola mi chula'); // Secreto real para producción
  } catch (error) {
    cookies.delete('authToken');
    return redirect('/login', 302);
  }

  return next();
};