interface MiniLoadingProps {
  absolute?: boolean;
}

export default function MiniLoading({ absolute = false }: MiniLoadingProps) {
  const containerClass = absolute
    ? "absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-black/40 z-20"
    : "flex flex-col items-center justify-center p-6";

  return (
    <div className={containerClass}>
      <div className="w-5 h-5 border-4 border-gray-300 border-t-gray-700 dark:border-gray-700 dark:border-t-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}
