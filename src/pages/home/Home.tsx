import { Link } from 'react-router-dom';
import homeLogo from '../../assets/home.png'; // Substitua pela sua imagem
import ListaPostagens from '../../components/postagens/listaPostagens/ListaPostagens';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import Button from '../../components/Button'; // Componente de botão reutilizável

function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center">
        <div className="container grid grid-cols-2 text-white p-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center animate-pulse">Compartilhe suas ideias</h2>
            <p className="text-lg md:text-xl text-center">
              Conecte-se com pessoas que pensam como você.
            </p>

            <div className="flex gap-4 mt-4">
              <ModalPostagem />
              <Link to="/postagens">
                <Button text="Ver postagens" />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img src={homeLogo} alt="" className="w-2/3 rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
      <ListaPostagens />
    </>
  );
}

export default Home;
