import { useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { ImArrowRight2 } from "react-icons/im";
import ImgLogo from "../assets/Cinematic_Kino_happy_lovers_couple_taking_a_photo_in_cinema_pa_0.jpg";

function Home() {
  const [dataFormatada, setDataFormatada] = useState("");
  const [atualizaData, setAtualizaData] = useState(new Date());
  const [imagens, setImagens] = useState(false);

  useEffect(() => {
    atualizarData(atualizaData);
    setImagens(false);
  }, [atualizaData]);

  function atualizarData(data: Date) {
    const dataDia = `${
      data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()
    }`;
    const dataMes = `${
      data.getMonth() < 9 ? `0${data.getMonth() + 1}` : data.getMonth() + 1
    }`;
    const dataAno = data.getFullYear();

    const dataFormada = `${dataDia}/${dataMes}/${dataAno}`;
    setDataFormatada(dataFormada);
  }

  const aumentarData = () => {
    setAtualizaData((prevData) => {
      const novaData = new Date(prevData); // Cria uma nova instância de Date
      novaData.setDate(novaData.getDate() + 1); // Aumenta um dia
      return novaData;
    });
  };

  const diminuirData = () => {
    setAtualizaData((prevData) => {
      const novaData = new Date(prevData); // Cria uma nova instância de Date
      novaData.setDate(novaData.getDate() - 1); // Diminui um dia
      return novaData;
    });
  };

  return (
    <>
      <main className="flex flex-col items-center py-10 h-4/5">
        <h2 className="font-bold text-xl my-2">{dataFormatada}</h2>

        <section className="w-full h-5/6 bg-bgMain  grid grid-cols-2 divide-x-2 divide-gray-500 relative">
          {imagens == true ? (
            <>
              <div className="flex justify-center items-center">
                <img
                  src={ImgLogo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={ImgLogo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={ImgLogo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={ImgLogo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </section>

        <div className="font-bold text-xl my-2 flex justify-between w-full">
          <button
            onClick={() => {
              diminuirData();
            }}
          >
            <ImArrowLeft2 size={35} color="black" />
          </button>{" "}
          <button
            onClick={() => {
              aumentarData();
            }}
          >
            <ImArrowRight2 size={35} color="black" />
          </button>
        </div>
      </main>
    </>
  );
}

export default Home;
