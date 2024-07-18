import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    email: yup.string().email("Email inválido").required("O email é obrigatório!"),
    senha: yup.string().required("A senha é obrigatória!"),
}).required();

function Login() {

    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== '') {
            navigate('/home');
        }
    }, [usuario, navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm<UsuarioLogin>({
        resolver: yupResolver(schema)
    });


    async function login({email, senha}: UsuarioLogin) {
        handleLogin({email, senha})
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
                <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit(login)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="senha" className="block text-gray-700">Senha</label>
                        <input
                            {...register("senha")}
                            type="password"
                            id="senha"
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                        {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha.message}</p>}
                    </div>

                    <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 w-full">
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            "Entrar"
                        )}
                    </button>

                    <p className="text-center text-gray-500">
                        Ainda não tem uma conta? <Link to="/cadastro" className="text-indigo-500 hover:underline">Cadastre-se</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
