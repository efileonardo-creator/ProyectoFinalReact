export default function Mensaje({
    abierto,
    mensaje,
    titulo = 'Aviso',
    onConfirm,
    onCancel
}) {
    if (!abierto) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">{titulo}</h2>
                <p className="mb-6">{mensaje}</p>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Sí
                    </button>
                </div>
            </div>
        </div>
    );
}