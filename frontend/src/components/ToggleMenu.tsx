type ToggleMenuProps = {
  active: boolean;
  onClick: () => void;
};

const ToggleMenu = ({ active, onClick }: ToggleMenuProps) => {
  return (
    <button
      onClick={onClick}
      className="
        w-[50px] h-[50px]
        rounded-md
        bg-transparent
        cursor-pointer
        block lg:hidden
      "
    >
      <span
        className={`
          block mx-auto my-1
          w-[20px] h-[2px]
          bg-slate-200
          transition-all duration-300
          ${active ? "translate-y-[6px] -rotate-45" : ""}
        `}
      />
      <span
        className={`
          block mx-auto my-1
          w-[20px] h-[2px]
          bg-slate-200
          transition-all duration-300
          ${active ? "opacity-0" : ""}
        `}
      />
      <span
        className={`
          block mx-auto my-1
          w-[20px] h-[2px]
          bg-slate-200
          transition-all duration-300
          ${active ? "-translate-y-[6px] rotate-45" : ""}
        `}
      />
    </button>
  );
};

export default ToggleMenu;