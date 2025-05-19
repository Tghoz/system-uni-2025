import { useForm } from "react-hook-form";
import { useState } from 'react';
import { UserIcon, PassIcon, GoogleIcon, FacebookIcon } from "../../../icons/AuthIcons";
import { postData } from '../../../api/auth'; // Ajusta la ruta de importación



interface LoginFormData {
  email: string;
  password: string;
}

export default function FormLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange"
  });

  const onSubmitHandler = async (data: LoginFormData) => {
    const url = 'login'; // Cambia la URL según tu API
    setLoading(true);
    setError(null);
    console.log("[DEBUG] Modo desarrollo:", import.meta.env.VITE_DEV_AUTH_ENABLED); // Debe ser "true"
    console.log("[DEBUG] Usuario ingresado:", data.email); // Debe ser "admin"
    console.log("[DEBUG] Contraseña ingresada:", data.password); // Debe ser "admin"


    try {


      if (process.env.NODE_ENV === "development" && data.email === "admin@admin.com" && data.password === "admin") {
        document.cookie = "authToken=dev_token_falso; Path=/; Max-Age=3600";
        window.location.href = '/';
        return; // ¡Evita el fetch!
      }

      const response = await postData(data, url);

      if (response && response.error) {
        setError(response.error)
      } else {
        window.location.href = '/';
        console.log("resp ==>", response)
      }

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="sign-in-form">
      {loading && (
        <div className="absolute flex justify-center items-center h-[100%] w-[60%] backdrop-blur-md bg-white/30 z-10">

        </div>
      )}

      <h2 className="title">Sign in</h2>

      <div className="input-field">
        <div className="justify-center items-center flex text-2xl text-gray-400">
          <UserIcon h={20} w={20} />
        </div>
        <input
          {...register("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Correo electrónico inválido"
            }
          })}
          type="email"
          placeholder="Email"
          disabled={loading}
          autoComplete="email"
        />
      </div>
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

      <div className="input-field">
        <div className="justify-center items-center flex text-2xl text-gray-400">
          <PassIcon h={20} w={20} />
        </div>
        <input
          {...register("password", {
            required: "Este campo es requerido",
            minLength: {
              value: 2,
              message: "La contraseña debe tener al menos 6 caracteres"
            }
          })}
          type="password"
          placeholder="Password"
          disabled={loading}
          autoComplete="current-password"
        />
      </div>
      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

      {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}

      <input
        type="submit"
        value={loading ? "Cargando..." : "Login"}
        className="btn solid"
        disabled={loading}
      />

      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon" aria-label="Login with Google">
          <GoogleIcon h={20} w={20} />
        </a>
        <a href="#" className="social-icon" aria-label="Login with Facebook">
          <FacebookIcon h={20} w={20} />
        </a>
      </div>
    </form>
  );
}