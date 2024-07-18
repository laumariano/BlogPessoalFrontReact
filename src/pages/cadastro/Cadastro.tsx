import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import './Cadastro.css';
import { toastAlerta } from '../../utils/toastAlerta';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    nome: yup.string().required("O nome é obrigatório!"),
    email: yup.string().required("O email é obrigatório!").email("O email deve ser válido"),
    senha: yup.string().required("A senha é obrigatória!").min(8, "A senha deve ter no mínimo 8 caracteres")
}).required();

function Cadastro() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Usuario>({
        resolver: yupResolver(schema)
    });


    const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    });

    useEffect(() => {
        if (usuarioResposta.id !== 0) {
            navigate('/login');
        }
    }, [usuarioResposta]);


    async function cadastrarNovoUsuario(dados: Usuario) {
        try {
            await cadastrarUsuario(`/usuarios/cadastrar`, dados, setUsuarioResposta);
            toastAlerta('Usuário cadastrado com sucesso', 'sucesso');
        } catch (error) {
            toastAlerta('Erro ao cadastrar usuário', 'erro');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-8 w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">Cadastrar</h2>

                <form onSubmit={handleSubmit(cadastrarNovoUsuario)}>
                    <div className="mb-4">
                        <label htmlFor="nome" className="block text-gray-700 font-bold mb-2">Nome Completo</label>
                        <input
                            {...register("nome")}
                            type="text"
                            id="nome"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Digite seu nome completo"
                        />
                        {errors.nome && <p className="text-red-500 text-xs italic">{errors.nome.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Digite seu email"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="senha" className="block text-gray-700 font-bold mb-2">Senha</label>
                        <input
                            {...register("senha")}
                            type="password"
                            id="senha"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Digite sua senha"
                        />
                        {errors.senha && <p className="text-red-500 text-xs italic">{errors.senha.message}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;
