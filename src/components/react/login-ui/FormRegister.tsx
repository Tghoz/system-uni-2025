// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";

// import { MdOutlinePassword } from "react-icons/md";
// import { MdAlternateEmail } from "react-icons/md";
// import { PiUserLight } from "react-icons/pi";
// import { Spinner } from "@nextui-org/react";


import { useForm } from "react-hook-form";
import { useState } from "react";
import { postData } from '../../../api/auth'; // Ajusta la ruta de importación


interface FormData {
	user_name: string;
	email: string;
	password: string;
}

export default function RegisterForm() {

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>({
		mode: "onChange"
	});

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		try {
			const url = 'register'; // Cambiado a endpoint de registro
			const resp = await postData(data, url);

			if (resp?.error) {
				setError(resp.error);
			} else {
				console.log("Registro exitoso:", resp);
				// window.location.href = '/dashboard/test';
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	const onSubmitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		handleSubmit(onSubmit)();
	};


	return (
		<form onSubmit={onSubmitHandler} className="sign-up-form">
			{loading && <div className="absolute flex justify-center items-center h-[110%] w-[60%] backdrop-blur-md bg-white/30 z-10">
				{/* <Spinner color="secondary" size="lg"/> */}
			</div>}
			<h2 className="title">Sign up</h2>
			<div className="input-field">
				<div className="justify-center items-center flex text-2xl text-gray-400">
					{/* <PiUserLight /> */}
				</div>
				<input
					type="text"
					placeholder="Username"
					{...register("user_name", {
						required: "this is required",
					})}
				/>

			</div>
			{errors.user_name && <p className="text-red-500">{errors.user_name.message}</p>}
			<div className="input-field">
				<div className="justify-center items-center flex text-2xl text-gray-400">
					{/* <MdAlternateEmail /> */}
				</div>
				<input type="email" placeholder="Email" {...register("email", {
					required: "this is required",
					pattern: {
						value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
						message: "Invalid email address"
					}
				})} />
			</div>
			{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			<div className="input-field">
				<div className="justify-center items-center flex text-2xl text-gray-400">
					{/* <MdOutlinePassword /> */}
				</div>
				<input {...register("password", {
					required: "this is required",
				})} type="password" placeholder="Password" />
			</div>
			{errors.password && <p className="text-red-500">{errors.password.message}</p>}
			{error && <p className="text-red-500">{error}</p>}
			<input type="submit" className="btn" value="Sign up" />
			<p className="social-text">Or Sign up with social platforms</p>
			<div className="social-media">
				<a href="#" className="social-icon">
					{/* <FcGoogle /> */}
				</a>
				<a href="#" className="social-icon">
					{/* <FaFacebook  className="text-blue-500"/> */}
				</a>
			</div>
		</form>

	)
}
