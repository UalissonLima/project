import { useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/ConfigFirebase";
import { Link } from "react-router-dom";
import { useContexto } from "../context/ContextRegister";

interface ImagemProps {
  uid: string;
  previewUrl: string;
  url: string;
}

interface PostProps {
  id: string;
  titulo: string;
  data: string;
  descricao: string;
  imagens: ImagemProps[];
}

function Home() {
  const { recebeData, trocaData, navegaHome } = useContexto();
  const [dataAtual, setDataAtual] = useState(new Date());
  const [postFiltrado, setPostFiltrado] = useState<PostProps[]>([]);

  useEffect(() => {
    getDataAtual();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const formattedDate = formataData(dataAtual);
    getPosts(formattedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAtual]);

  function formataData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const dataFormatada = `${ano}-${mes}-${dia}`;
    recebeData(dataFormatada);
    return dataFormatada;
  }

  async function getPosts(dataFormatada: string) {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const listaPost: PostProps[] = [];
    querySnapshot.forEach((doc) => {
      listaPost.push({
        id: doc.id,
        titulo: doc.data().titulo,
        data: doc.data().data,
        descricao: doc.data().descricao,
        imagens: doc.data().imagens,
      });
    });
    postsFiltrados(dataFormatada, listaPost);
  }

  function getDataAtual() {
    if (trocaData) {
      setDataAtual(trocaData);
      navegaHome(new Date());
    } else {
      const data = new Date();
      setDataAtual(data);
    }
  }

  function adicionarDia() {
    setDataAtual((prevData) => {
      const novaData = new Date(prevData);
      novaData.setDate(novaData.getDate() + 1);
      return novaData;
    });
  }

  function diminuirDia() {
    setDataAtual((prevData) => {
      const novaData = new Date(prevData);
      novaData.setDate(novaData.getDate() - 1);
      return novaData;
    });
  }

  function postsFiltrados(dataFormatada: string, listaPost: PostProps[]) {
    const filtro = listaPost.filter((p) => p.data === dataFormatada);
    setPostFiltrado(filtro);
  }

  return (
    <>
      <main className="flex flex-col items-center h-auto max-h-fit p-4">
        <div className="font-bold text-xl my-2 flex justify-between w-full lg:w-3/6">
          <button onClick={diminuirDia}>
            <ImArrowLeft2 size={35} color="black" />
          </button>
          <h2 className="font-bold text-xl my-2 sm:text-3xl">
            {dataAtual.toLocaleDateString()}
          </h2>
          <button onClick={adicionarDia}>
            <ImArrowRight2 size={35} color="black" />
          </button>
        </div>

        <section className="w-full flex flex-col items-center ">
          {postFiltrado.length > 0 ? (
            postFiltrado.map((post) => (
              <div
                className="w-full max-w-lg h-fit flex flex-col items-center mb-4"
                key={post.id}
              >
                <div
                  className={`w-full grid gap-[2px] bg-bgMain p-1 rounded-lg ${
                    post.imagens.length === 1
                      ? "grid-cols-1"
                      : post.imagens.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-2"
                  }`}
                >
                  {post.imagens.map((imagem, index) => (
                    <div
                      key={imagem.uid}
                      className={`flex justify-center items-center ${
                        post.imagens.length === 3 && index === 2
                          ? "col-span-2" // A terceira imagem ocupa toda a linha
                          : ""
                      }`}
                    >
                      <img
                        src={imagem.url}
                        alt=""
                        className={`w-full object-cover lg:object-cover rounded-lg shadow-lg ${
                          post.imagens.length === 1
                            ? "h-full lg:h-[290px]" // Ocupa todo o espaço
                            : post.imagens.length === 2
                            ? "h-[300px] sm:h-[500px] lg:h-[290px]" // Altura para 2 imagens
                            : post.imagens.length === 3
                            ? index === 2
                              ? "h-[150px] sm:h-[250px] lg:h-[145px]" // Altura para a terceira imagem
                              : "h-[150px] sm:h-[250px] lg:h-[145px]" // Altura para as duas primeiras
                            : post.imagens.length === 4
                            ? "h-[150px] sm:h-[250px] lg:h-[145px]" // Altura para 4 imagens
                            : "h-full"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="font-bold w-full text-center text-lg mt-4 sm:text-3xl">
                  <p>{post.titulo}</p>
                </div>
                <div className="w-full text-wrap text-center mb-4 sm:text-2xl overflow-hidden overflow-wrap">
                  <p>{post.descricao}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-[300px] bg-bgMain grid grid-cols-2 divide-x-2 divide-gray-500 rounded-lg mb-20 relative sm:h-[512px]
             lg:h-[290px] lg:w-3/6">
              <Link
                to="/register"
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
              >
                <button>
                  <RiAddCircleFill size={130} color="black" />
                </button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;
