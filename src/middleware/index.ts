// src/middleware.ts
import type { MiddlewareHandler } from 'astro';
import jwt from 'jsonwebtoken';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { cookies, redirect, request, locals } = context;
  const url = new URL(request.url);
  const token = cookies.get('authToken')?.value;
  const publicPaths = ['/login', '/registro', '/recuperar-contrasena'];

  // Acceso rápido para desarrollo
  if (process.env.NODE_ENV === "development" && token === "dev_token_falso") {
    locals.Name = "Usuario de Desarrollo";
    return next();
  }

  // Redirigir si ya está autenticado y trata de acceder a login/registro
  if (token && (url.pathname === '/login' || url.pathname === '/registro')) {
    return redirect('/', 302);
  }

  // Permitir acceso a rutas públicas
  if (publicPaths.includes(url.pathname)) {
    return next();
  }

  // Verificar autenticación para rutas protegidas
  if (!token) {
    return redirect('/login', 302);
  }

  // Validar token JWT
  try {
    const decoded = jwt.verify(token, 'ola mi chula') as { Name: string };
    locals.Name = decoded.Name; // Inyectamos el username en el contexto
    
  } catch (error) {
    cookies.delete('authToken', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    return redirect('/login', 302);
  }

  return next();
};