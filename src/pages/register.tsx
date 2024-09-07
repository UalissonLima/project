import { RiImageAddFill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import React, { ChangeEvent, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../services/ConfigFirebase";
import { addDoc, collection } from "firebase/firestore";
import { useContexto } from "../context/ContextRegister";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface ImagemProps {
  uid: string;
  previewUrl: string;
  url: string;
}

function Register() {
  const { dataAtual } = useContexto();
  const navigate = useNavigate();
  const [imagemItem, setImagemItem] = useState<ImagemProps[]>([]);
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState(dataAtual);
  const [descricao, setDescricao] = useState("");
  const [imgConfere, setImgConfere] = useState<string[]>([]);
  const [dataConfere, setDataConfere] = useState<boolean>();

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const imagem = e.target.files[0];

      if (imgConfere.length === 4) {
        toastFailed("O máximo de imagens que podem ser adicionadas são 4!");
        return;
      } else {
        if (imagem.type === "image/jpeg" || imagem.type === "image/png") {
          await handleUpload(imagem);

          // Atualize imgConfere e dataConfere ao mesmo tempo
          setImgConfere((prev) => {
            const updatedImgConfere = [...prev, "IMAGEM"];
            setDataConfere(updatedImgConfere.length > 0); // Atualiza aqui
            return updatedImgConfere;
          });
        } else {
          toastFailed(
            "Formato de imagem não suportado, enviar apenas JPEG e PNG."
          );
        }
      }
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (imagemItem.length === 0) {
      toastFailed("Envie alguma imagem!");
      return;
    }

    const imagemLista = imagemItem.map((imagem) => ({
      uid: imagem.uid,
      url: imagem.url,
    }));

    try {
      await addDoc(collection(db, "posts"), {
        titulo: titulo,
        data: data,
        descricao: descricao,
        imagens: imagemLista,
      });
      setTitulo("");
      setData("");
      setDescricao("");
      setImagemItem([]);
      setImgConfere([]);
      toastSucess("Registrado com sucesso!");
      navigate("/line", { replace: true });
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
    }
  }

  async function handleUpload(imagem: File) {
    const uidImagem = uuidV4();
    const uploadRef = ref(storage, `imagens/${data}/${uidImagem}`);

    try {
      const snapshot = await uploadBytes(uploadRef, imagem);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      const imageObj = {
        uid: uidImagem,
        previewUrl: URL.createObjectURL(imagem),
        url: downloadUrl,
      };
      setImagemItem((imagens) => [...imagens, imageObj]);
    } catch (error) {
      console.error("Erro ao fazer upload da imagem: ", error);
    }
  }

  async function handleDelete(imagemUid: string) {
    const deleteRef = ref(storage, `imagens/${data}/${imagemUid}`);

    try {
      await deleteObject(deleteRef);
      toastSucess("Imagem deletada com sucesso!");

      setImagemItem((prevImages) =>
        prevImages.filter((image) => image.uid !== imagemUid)
      );

      setImgConfere((prev) => {
        const updatedImgConfere = prev.slice(0, -1);
        setDataConfere(updatedImgConfere.length > 0);
        return updatedImgConfere;
      });
    } catch (error) {
      toastFailed("Erro ao deletar imagem: " + error);
    }
  }

  function toastFailed(messagem: string) {
    toast.error(messagem, {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
    });
  }

  function toastSucess(messagem: string) {
    toast.success(messagem, {
      position: "top-center",
      autoClose: 2000,
      closeOnClick: true,
    });
  }

  return (
    <>
      <form
        className="w-full flex flex-col gap-5 items-center sm:gap-10 lg:w-4/6 lg:m-auto lg:gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Digite o título aqui..."
          className="w-full h-10 px-4 rounded-lg sm:h-16 sm:text-xl lg:h-10 "
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-3/6 h-10 px-4 flex justify-center rounded-lg text-center font-bold sm:w-2/5 sm:h-16 sm:text-xl lg:h-10"
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={dataConfere}
        />

        <div className="w-full h-20 bg-white flex relative px-4 items-center gap-1 rounded-lg sm:h-40 lg:h-20">
          <input
            type="file"
            accept="image/*"
            className="border-solid border-black h-full w-24 opacity-0 absolute"
            onChange={handleFile}
            required
          />
          <RiImageAddFill size={80} color="black" />

          <div className="w-full h-full flex justify-center items-center gap-2 py-1">
            {imagemItem.map((imagem) => (
              <div
                className="w-full h-4/5 relative cursor-pointer sm:w-full"
                key={imagem.uid}
              >
                <TiDelete
                  size={40}
                  color="red"
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  onClick={() => handleDelete(imagem.uid)}
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
          className="px-4 py-2 w-full text-center  min-h-40 rounded-lg sm:text-xl"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>

        <button
          className="bg-[#b24098cc] font-bold text-white w-full p-2 rounded-lg sm:text-2xl sm:h-16 lg:h-12 lg:p-4 lg:flex lg:justify-center lg:items-center"
          type="submit"
        >
          REGISTRAR
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default Register;
