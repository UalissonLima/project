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
  const { recebeData } = useContexto();

  const [dataAtual, setDataAtual] = useState(new Date());
  const [dataFormated, setDataFormated] = useState("");
  const [post, setPost] = useState<PostProps[]>([]);
  const [postFiltrado, setPostFiltrado] = useState<PostProps[]>([]);

  useEffect(() => {
    getDataAtual();
  }, []);

  useEffect(() => {
    getPosts();
    postsFiltrados();
    formataData();
  }, [dataAtual]);

  function formataData() {
    const data = dataAtual;
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const dataFormatada = `${ano}-${mes}-${dia}`;
    setDataFormated(dataFormatada);
    recebeData(dataFormatada);
  }

  async function getPosts() {
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
    setPost(listaPost);
  }

  function getDataAtual() {
    const data = new Date();
    setDataAtual(data);
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

  function postsFiltrados() {
    const filtro = post.filter((p) => p.data === dataFormated);
    setPostFiltrado(filtro);
  }

  return (
    <>
      <main className="flex flex-col items-center h-auto max-h-fit p-4">
        <div className="font-bold text-xl my-2 flex justify-between w-full">
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

        <section className="w-full flex flex-col items-center">
          {postFiltrado.length > 0 ? (
            postFiltrado.map((post) => (
              <div
                className="w-full max-w-lg flex flex-col items-center gap-4 mb-4"
                key={post.id}
              >
                <div
                  className={`w-full grid gap-2 ${
                    post.imagens.length === 1 ? "grid-cols-1" : "grid-cols-2"
                  } h-auto`}
                >
                  {post.imagens.map((imagem, index) => (
                    <div
                      key={imagem.uid}
                      className={`flex justify-center items-center ${
                        post.imagens.length === 3 && index === 2
                          ? "col-span-2"
                          : ""
                      }`}
                    >
                      <img
                        src={imagem.url}
                        alt=""
                        className={`w-full object-cover rounded-lg shadow-lg ${
                          post.imagens.length === 1
                            ? "h-[300px] sm:h-[500px]" // Altura para 1 imagem
                            : post.imagens.length === 2
                            ? "h-[300px] sm:h-[500px]" // Altura para 2 imagens
                            : post.imagens.length === 3
                            ? "h-[150px] sm:h-[250px]" // Altura para 3 imagens
                            : post.imagens.length === 4
                            ? "h-[150px] sm:h-[250px]" // Altura para 4 imagens
                            : "h-full"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="font-bold w-full text-center text-lg mt-4 sm:text-3xl">
                  {post.titulo}
                </div>
                <div className="w-full text-center mb-4 sm:text-2xl">
                  {post.descricao}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-[300px] bg-bgMain grid grid-cols-2 divide-x-2 divide-gray-500 rounded-lg relative sm:h-[500px]">
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
