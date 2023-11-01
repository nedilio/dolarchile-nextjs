import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <p className="text-6xl font-bold text-purple-400">404</p>
      <p className="text-2xl text-slate-400">
        Lo sentimos, la página que buscas no existe
      </p>
      <a
        href="/"
        className="text-purple-500 underline mt-4 hover:text-purple-600 transition-colors duration-300 ease-in-out cursor-pointer"
      >
        Regresar a la página principal
      </a>
    </div>
  );
};

export default NotFound;
