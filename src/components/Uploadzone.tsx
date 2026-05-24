"use client";

import { Upload, X } from "lucide-react";
import { useState } from "react";
import imageCompression from 'browser-image-compression';
import { useToast } from "@/hooks/use-toast";

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
    const { toast } = useToast();
    const [isCompressing, setIsCompressing] = useState(false);

    const handleFileSelection = async (selectedFiles: File[]) => {
        setIsCompressing(true);
        const processedFiles: File[] = [];
        
        try {
            for (const file of selectedFiles) {
                const fileSizeMB = file.size / 1024 / 1024;
                
                // Rejeitar imagens muito grandes (> 10MB)
                if (fileSizeMB > 10) {
                    toast({
                        variant: "destructive",
                        title: "Imagem muito grande",
                        description: `${file.name} tem ${fileSizeMB.toFixed(1)}MB. Máximo permitido: 10MB.`,
                    });
                    continue;
                }
                
                // Comprimir imagens entre 1MB e 10MB
                if (fileSizeMB > 1) {
                    try {
                        const options = {
                            maxSizeMB: 0.8,
                            maxWidthOrHeight: 1600,
                            useWebWorker: true,
                            fileType: file.type
                        };
                        
                        const compressed = await imageCompression(file, options);
                        const compressedSizeMB = compressed.size / 1024 / 1024;
                        
                        toast({
                            title: "Imagem comprimida",
                            description: `${file.name}: ${fileSizeMB.toFixed(1)}MB → ${compressedSizeMB.toFixed(1)}MB`,
                        });
                        
                        processedFiles.push(compressed);
                    } catch (error) {
                        console.error('Erro ao comprimir:', error);
                        toast({
                            variant: "destructive",
                            title: "Erro ao comprimir",
                            description: `Não foi possível processar ${file.name}`,
                        });
                    }
                } else {
                    // Aceitar imagens < 1MB sem processamento
                    processedFiles.push(file);
                }
            }
            
            setFiles(processedFiles);
        } finally {
            setIsCompressing(false);
        }
    };

    return (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Carregar imagens</label>
            <div 
                className={`
                border-2 border-dashed rounded-lg p-6
                ${files.length > 0 ? 'border-ong-orange' : 'border-gray-300'}
                hover:border-ong-orange transition-colors
                flex flex-col items-center justify-center
                relative
                `}>
                <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isCompressing || uploading}
                onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files || []);
                    handleFileSelection(selectedFiles);
                }}
                />
                
                {isCompressing && files.length === 0 && (
                <div className="w-full mb-4">
                    <div className="flex items-center justify-center gap-2 text-ong-orange">
                    <div className="animate-spin h-5 w-5 border-2 border-ong-orange border-t-transparent rounded-full"></div>
                    <span className="text-sm font-medium">Comprimindo imagens...</span>
                    </div>
                </div>
                )}
                
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
                    <Upload className={`h-12 w-12 mb-2 ${isCompressing ? 'text-ong-orange animate-pulse' : 'text-gray-400'}`} />
                    <p className="text-sm text-gray-500">
                    {isCompressing ? 'Processando imagens...' : 'Arraste e solte as imagens aqui ou clique para selecionar'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                    Aceita múltiplas imagens • Máximo 10MB por imagem
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                    Imagens acima de 1MB serão comprimidas automaticamente
                    </p>
                </>
                )}
                
                {uploading && (
                <div className="w-full mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-ong-orange transition-all duration-300"
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