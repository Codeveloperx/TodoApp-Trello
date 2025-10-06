type Propstype = {
  position?: string;
};

const DropZone = (props: Propstype) => {
  const position = props.position == "end" ? "mt-2" : "mb-2";
  return (
    <div
      className={` flex items-center justify-center rounded h-20 w-full animate-pulse
    ${position} bg-blue-200 border-2 border-dashed border-blue-500`}
    >
      <span className="text-blue-600 font-semibold text-sm">Drop here</span>
    </div>
  );
};

// export default DropZone;

// type PropsType = {
//   position?: "start" | "middle" | "end" | "empty";
// };

// const DropZone = ({ position = "middle" }: PropsType) => {
//   const getPositionStyles = () => {
//     switch (position) {
//       case "empty":
//         return "h-20 border-2 border-dashed border-blue-400 bg-blue-50";
//       case "end":
//         return "h-2 bg-blue-400";
//       default:
//         return "h-2 bg-blue-400";
//     }
//   };

//   const getMessage = () => {
//     if (position === "empty") {
//       return <span className="text-blue-600 text-sm">Suelta aquí</span>;
//     }
//     return null;
//   };

//   return (
//     <div
//       className={`
//         w-full
//         rounded
//         transition-all
//         duration-200
//         animate-pulse
//         flex
//         items-center
//         justify-center
//         ${getPositionStyles()}
//       `}
//     >
//       {getMessage()}
//     </div>
//   );
// };

export default DropZone;
