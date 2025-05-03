
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Images, Info } from 'lucide-react';
import React, { useState } from 'react';

export interface AnimalProps {
  id: number;
  name: string;
  type: 'cat' | 'dog' | 'bird' | 'other';
  breed?: string;
  age: string;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  imageUrl: string;
  isAdopted: boolean;
  description?: string;
  // Add more photos for the carousel
  additionalImages?: string[];
}

const AnimalCard: React.FC<AnimalProps> = ({
  id,
  name,
  type,
  breed,
  age,
  gender,
  size,
  imageUrl,
  isAdopted,
  description = "Este animal está aguardando um lar amoroso. Entre em contato com a ONG para mais informações sobre o processo de adoção.",
  additionalImages = []
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Combine primary image with additional images for the carousel
  const allImages = [imageUrl, ...additionalImages].filter(Boolean);
  
  // If no additional images provided, use some placeholders for the carousel
  const carouselImages = allImages.length > 1 ? allImages : [
    imageUrl,
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
  ];

  return (
    <>
      <div className="card-animal group">
        <div className="relative overflow-hidden">
          {/* Imagem do animal */}
          <img 
            src={imageUrl} 
            alt={`${name} - ${type}`} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badge para mostrar se está adotado */}
          {isAdopted && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge className="bg-ong-orange text-white text-lg font-semibold px-4 py-1.5">
                Adotado
              </Badge>
            </div>
          )}
          
          {/* Botão de favorito */}
          <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors">
            <Heart size={18} className="text-gray-500 hover:text-red-500 transition-colors" />
          </button>
        </div>
        
        {/* Informações do animal */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-semibold text-lg">{name}</h3>
            <Badge 
              className={
                type === 'cat' ? 'bg-indigo-100 text-indigo-700' :
                type === 'dog' ? 'bg-amber-100 text-amber-700' :
                type === 'bird' ? 'bg-teal-100 text-teal-700' :
                'bg-gray-100 text-gray-700'
              }
            >
              {type === 'cat' ? 'Gato' : 
               type === 'dog' ? 'Cachorro' : 
               type === 'bird' ? 'Ave' : 'Outro'}
            </Badge>
          </div>
          
          <div className="text-gray-500 text-sm space-y-1 mb-4">
            <p>{breed || 'SRD'}</p>
            <p>{age} • {gender === 'male' ? 'Macho' : 'Fêmea'}</p>
            <p>
              Porte: {
                size === 'small' ? 'Pequeno' :
                size === 'medium' ? 'Médio' :
                'Grande'
              }
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-ong-teal text-ong-teal hover:bg-ong-teal hover:text-white transition-colors flex items-center justify-center gap-1"
            disabled={isAdopted}
            onClick={() => setShowDetails(true)}
          >
            <Info size={16} />
            {isAdopted ? 'Ver detalhes' : 'Quero adotar'}
          </Button>
        </div>
      </div>

      {/* Modal de detalhes */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl flex items-center justify-between">
              <span>{name}</span>
              {isAdopted && (
                <Badge className="bg-ong-orange text-white ml-2">
                  Adotado
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {/* Carousel de fotos */}
          <div className="mb-6 relative">
            <Carousel className="w-full">
              <CarouselContent>
                {carouselImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-64 w-full">
                      <img 
                        src={img} 
                        alt={`${name} - imagem ${index + 1}`}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 bg-white/80 border-gray-200" />
              <CarouselNext className="-right-2 bg-white/80 border-gray-200" />
            </Carousel>

            <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
              <Images size={14} />
              {carouselImages.length} fotos
            </div>
          </div>

          {/* Informações detalhadas */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="font-medium">
                  {type === 'cat' ? 'Gato' : 
                   type === 'dog' ? 'Cachorro' : 
                   type === 'bird' ? 'Ave' : 'Outro'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Raça</p>
                <p className="font-medium">{breed || 'SRD'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Idade</p>
                <p className="font-medium">{age}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Sexo</p>
                <p className="font-medium">{gender === 'male' ? 'Macho' : 'Fêmea'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Porte</p>
                <p className="font-medium">
                  {size === 'small' ? 'Pequeno' :
                   size === 'medium' ? 'Médio' : 'Grande'}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">ID</p>
                <p className="font-medium">#{id}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Sobre {name}</h4>
              <p className="text-gray-600">{description}</p>
            </div>

            {!isAdopted && (
              <div className="pt-4 border-t">
                <Button className="w-full bg-ong-teal hover:bg-teal-600">
                  Iniciar processo de adoção
                </Button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  Ao clicar, você será redirecionado para o formulário de interesse
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnimalCard;
