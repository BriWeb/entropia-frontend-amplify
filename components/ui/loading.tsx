export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-700 dark:border-gray-700 dark:border-t-gray-300 rounded-full animate-spin"></div>
      <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        Cargando...
      </p>
    </div>
  );
}

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column" as const,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "1.5rem",
//   },
//   spinner: {
//     width: "40px",
//     height: "40px",
//     border: "5px solid #ccc",
//     borderTop: "5px solid #333",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//   },
//   text: {
//     marginTop: "1rem",
//     fontSize: "1rem",
//     color: "#555",
//   },
// };

// Animación CSS global para el spinner
// const styleSheet = `
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }
// `;

// if (typeof window !== "undefined") {
//   const styleTag = document.createElement("style");
//   styleTag.innerHTML = styleSheet;
//   document.head.appendChild(styleTag);
// }
