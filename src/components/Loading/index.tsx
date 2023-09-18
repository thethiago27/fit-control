export function Loading() {
  return (
    <div className="flex flex-col gap-4 bg-zinc-900 rounded-lg border border-transparent transition-colors border-gray-300 p-5">
      <div className="flex-1 w-100%">
        <div className="flex gap-4 text-emerald-500 font-bold">
          <h2>Carregando...</h2>
        </div>
      </div>
    </div>
  )
}
