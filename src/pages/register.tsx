import { RiImageAddFill } from "react-icons/ri";

function Register() {
  return (
    <>
      <form
        action=""
        className="w-full h-full flex flex-col gap-5 items-center"
      >
        <input
          type="text"
          placeholder="Digite o título aqui..."
          className="w-full h-10 px-4"
        />

        <input type="date" name="" id="" className="w-3/6 h-10" />

        <div className="w-full h-20 bg-white flex relative px-4 items-center">
          <input
            type="file"
            accept="image/*"
            className="border-solid border-black h-full w-20 opacity-0 absolute"
          />
          <RiImageAddFill size={80} color="black" />
        </div>

        <textarea
          placeholder="Descreva seu dia aqui..."
          className="px-4"
        ></textarea>

        <button>REGISTRAR</button>
      </form>
    </>
  );
}

export default Register;
