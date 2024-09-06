import { useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { ImArrowLeft2 } from "react-icons/im";
import { ImArrowRight2 } from "react-icons/im";
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
  data: Date;
  descricao: string;
  imagens: ImagemProps[];
}

function Home() {
  const { recebeData } = useContexto();

  const [dataAtual, setDataAtual] = useState(new Date());
  const [post, setPost] = useState<PostProps[]>([]);
  const [postFiltrado, setPostFiltrado] = useState<PostProps[]>([]);

  useEffect(() => {
    getDataAtual();
  }, []);

  useEffect(() => {
    getPosts();
    postsFiltrados();
    recebeData(dataAtual.toISOString().split("T")[0]);
  }, [dataAtual]);

  async function getPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const listaPost: PostProps[] = [];
    querySnapshot.forEach((doc) => {
      listaPost.push({
        id: doc.id,
        titulo: doc.data().titulo,
        data: new Date(doc.data().data),
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
    const dataAtualString = dataAtual.toISOString().split("T")[0]; // Formato "YYYY-MM-DD"
    const filtro = post.filter(
      (p) => p.data.toISOString().split("T")[0] === dataAtualString // Compara como strings
    );
    setPostFiltrado(filtro);
  }

  return (
    <>
      <main className="flex flex-col items-center h-4/5 max-h-fit">
        <div className="font-bold text-xl my-2 flex justify-between w-full">
          <button onClick={diminuirDia}>
            <ImArrowLeft2 size={35} color="black" />
          </button>
          <h2 className="font-bold text-xl my-2">
            {dataAtual.toLocaleDateString()}
          </h2>
          <button onClick={adicionarDia}>
            <ImArrowRight2 size={35} color="black" />
          </button>
        </div>

        <section className="w-full h-5/6">
          {postFiltrado.length > 0 ? (
            <>
              {postFiltrado.map((post) => (
                <div className="w-full h-5/6 flex flex-col  items-center gap-4">
                  <div
                    className="w-full h-full bg-bgMain grid divide-x-2 divide-gray-500 relative"
                    style={{
                      gridTemplateColumns: `${
                        post.imagens.length == 1
                          ? `repeat(1, 1fr)`
                          : `repeat(2, 0.5fr)`
                      }`,
                    }}
                  >
                    {post.imagens.map((imagem) => (
                      <div className="flex justify-center items-center w-full h-full">
                        <img
                          src={imagem.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="font-bold">{post.titulo}</div>
                  <div className="w-full text-center">{post.descricao}</div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="w-full h-5/6 bg-bgMain grid grid-cols-2 divide-x-2 divide-gray-500 relative">
                <Link
                  to="/register"
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <button>
                    <RiAddCircleFill size={130} color="black" />
                  </button>
                </Link>
                <div className="flex justify-center items-center"></div>
                <div className="flex justify-center items-center"></div>
                <div className="flex justify-center items-center"></div>
                <div className="flex justify-center items-center"></div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;
