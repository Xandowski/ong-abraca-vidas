import { Upload, X } from "lucide-react";

const Uploadzone = ({
    files,
    setFiles,
    uploading,
    uploadProgress
}: {
    files: File[];
    setFiles: (files: File[]) => void;
    uploading: boolean;
    uploadProgress: number;
}) => {
    return (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Imagens</label>
            <div 
                className={`
                border-2 border-dashed rounded-lg p-6
                ${files.length > 0 ? 'border-teal-500' : 'border-gray-300'}
                hover:border-teal-500 transition-colors
                flex flex-col items-center justify-center
                relative
                `}>
                <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files || []);
                    setFiles(selectedFiles);
                }}
                />
                
                {files.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {files.map((file, index) => (
                    <div key={index} className="relative group">
                        <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setFiles(files.filter((_, i) => i !== index));
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1
                                    opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                        <X size={14} />
                        </button>
                    </div>
                    ))}
                </div>
                ) : (
                <>
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                    Arraste e solte as imagens aqui ou clique para selecionar
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                    Aceita múltiplas imagens
                    </p>
                </>
                )}
                
                {uploading && (
                <div className="w-full mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-teal-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                    />
                    </div>
                </div>
                )}
            </div>
            </div>
    )
}

export default Uploadzone;