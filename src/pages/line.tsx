import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/ConfigFirebase";
import { useContexto } from "../context/ContextRegister";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

interface PostProps {
  id: string;
  titulo: string;
  data: string;
  descricao: string;
}

export default function Line() {
  const navigate = useNavigate();
  const { navegaHome } = useContexto();
  const [posts, setPost] = useState<PostProps[]>([]);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const listaPost: PostProps[] = [];
    querySnapshot.forEach((doc) => {
      listaPost.push({
        id: doc.id,
        titulo: doc.data().titulo,
        data: formataData(doc.data().data),
        descricao: doc.data().descricao,
      });
    });

    // Ordenar os posts pela data em ordem decrescente
    listaPost.sort(
      (a, b) =>
        new Date(b.data.split("/").reverse().join("-")).getTime() -
        new Date(a.data.split("/").reverse().join("-")).getTime()
    );

    setPost(listaPost);
  }

  function formataData(data: string) {
    const date = new Date(data);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  function getNavega(data: string) {
    const [dia, mes, ano] = data.split("/").map(Number);

    // Use o local time para garantir que não haja problemas de fuso horário
    const novaData = new Date(ano, mes - 1, dia); // Cria a nova data corretamente

    if (isNaN(novaData.getTime())) {
      console.error("Data inválida:", novaData);
      return;
    }

    console.log("Navegando para a data:", novaData);
    navegaHome(novaData);
    navigate("/", { replace: true });
  }

  return (
    <div className="w-full flex flex-col lg:w-2/6 lg:m-auto">
      <div
        className="flex justify-center p-4 items-center bg-white font-bold rounded-md text-xl cursor-pointer"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Continuar a linha
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} onClick={() => getNavega(post.data)}>
            <div className="border-x-4 border-solid border-red-700 h-10 w-0 m-auto"></div>
            <h2 className="bg-red-700 text-white p-1 text-lg font-bold text-center w-full rounded-lg overflow-hidden overflow-wrap break-words ">
              {post.titulo}
            </h2>
            <div className="bg-[#FDEBFB] p-1 text-base w-11/12 m-auto text-center overflow-hidden overflow-wrap break-words">
              <p>{post.descricao}</p>
            </div>
            <div className="bg-red-700 text-white p-1 text-base font-bold w-full text-center rounded-lg">
              <p>{post.data}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Nenhum post disponível.</p>
      )}
      <Footer />
    </div>
  );
}
