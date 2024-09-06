import { RiImageAddFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import React, { ChangeEvent, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../services/ConfigFirebase";
import { addDoc, collection } from "firebase/firestore";

interface ImagemProps {
  uid: string;
  previewUrl: string;
  url: string;
}

interface ConteudoProps {
  titulo: string;
  data: string;
  descricao: string;
  imagens: ImagemProps[];
}

function Register() {
  const [imagemItem, setImagemItem] = useState<ImagemProps[]>([]);
  const [conteudo, setConteudo] = useState<ConteudoProps[]>([]);
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const imagem = e.target.files[0];

      if (imagem.type == "image/jpeg" || imagem.type == "image/png")
        await handleUpload(imagem);
    }
  }

  async function handleUpload(imagem: File) {
    const uidImagem = uuidV4();

    const uploadRef = ref(storage, `imagens/${"05-10-2022"}/${uidImagem}`);

    uploadBytes(uploadRef, imagem).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadlUrl) => {
        const imageObj = {
          uid: uidImagem,
          previewUrl: URL.createObjectURL(imagem),
          url: downloadlUrl,
        };
        setImagemItem((imagens) => [...imagens, imageObj]);
      });
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (imagemItem.length === 0) {
      alert("Envie alguma imagem!");
      return;
    }

    const imagemLista = imagemItem.map((imagem) => {
      return {
        uid: imagem.uid,
        url: imagem.url,
      };
    });

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      data: data,
      descricao: descricao,
      imagens: imagemLista,
    })
      .then(() => {
        setTitulo("");
        setData("");
        setDescricao("");
        setImagemItem([]);
      })
      .catch((error) => {
        console.error("Erro ao adicionar documento: ", error.code);
      });
  }

  return (
    <>
      <form
        action=""
        className="w-full flex flex-col gap-5 items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          placeholder="Digite o título aqui..."
          className="w-full h-10 px-4 rounded-lg"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-3/6 h-10 px-4 flex justify-center rounded-lg"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <div className="w-full h-20 bg-white flex relative px-4 items-center gap-1 rounded-lg">
          <input
            type="file"
            accept="image/*"
            className="border-solid border-black h-full w-20 opacity-0 absolute"
            onChange={handleFile}
            required
          />
          <RiImageAddFill size={80} color="black" />

          <div className="w-full h-full flex justify-center items-center gap-1 py-1">
            {imagemItem.map((imagem) => (
              <div className="w-12 h-4/5 relative" key={imagem.uid}>
                <TiDelete
                  size={40}
                  color="red"
                  className="absolute  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <img
                  src={imagem.previewUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Descreva seu dia aqui..."
          className="px-4 w-full min-h-40 rounded-lg"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>

        <button
          className="bg-fuchsia-700 font-bold text-white w-full p-2 rounded-lg"
          type="submit"
        >
          REGISTRAR
        </button>
      </form>
    </>
  );
}

export default Register;
