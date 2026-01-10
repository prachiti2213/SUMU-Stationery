const PencilImage = () => {
  return (
    <div
      className="
        relative
        w-[300px] h-[700px]
        flex items-center
        animate-pencil-float
        transition-transform duration-700 ease-out
        hover:-rotate-2
      "
    >
      {/* Pencil image */}
      <img
        src="/pencil.png"
        alt="SUMU Pencil"
        className="
          w-full
          rotate-[-12deg]
          drop-shadow-[20px_30px_35px_rgba(0,0,0,0.35)]
          transition-all duration-700 ease-out
          hover:drop-shadow-[26px_36px_45px_rgba(0,0,0,0.45)]
          select-none
          pointer-events-none
        "
      />

      {/* Ground shadow */}
      <div
        className="
          absolute
          bottom-6 left-1/2
          -translate-x-1/2
          w-24 h-7
          bg-black/30
          blur-xl
          rounded-full
          transition-all duration-700 ease-out
          group-hover:w-28
        "
      />
    </div>
  );
};

export default PencilImage;
