"use client"

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
import { useSupabase } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';
import { Animal } from '@/types/database';
import { Heart, Images, Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Uploadzone from './Uploadzone';

export type AnimalProps = Omit<Animal, 'created_at' | 'image_url' | 'is_adopted'> & {
  isAdopted: boolean;
  isAuthenticated?: boolean;
  setUploading?: (uploading: boolean) => void;
  uploading?: boolean;
  uploadProgress?: number;
  setUploadProgress?: (progress: number) => void;
  onAnimalUpdated?: () => void;
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
  isAuthenticated = false,
  setUploading,
  setUploadProgress,
  uploadProgress,
  uploading,
  onAnimalUpdated
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditAnimalOpen, setIsEditAnimalOpen] = useState(false);
  const { supabase } = useSupabase();
  const { toast } = useToast();
  const [nameUpdated, setNameUpdated] = useState(name);
  const [typeUpdated, setTypeUpdated] = useState(type);
  const [genderUpdated, setGenderUpdated] = useState(gender);
  const [sizeUpdated, setSizeUpdated] = useState(size);
  const [descriptionUpdated, setDescriptionUpdated] = useState(description);
  const [ageUpdated, setAgeUpdated] = useState(age);
  const [breedUpdated, setBreedUpdated] = useState(breed);
  const [imageUrlUpdated, setImageUrlUpdated] = useState<string[]>(imageUrl || []);
  const [filesUpdated, setFilesUpdated] = useState<File[]>([]);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [isAdoptedUpdated, setIsAdoptedUpdated] = useState(isAdopted);

  const resetForm = () => {
    setNameUpdated(name);
    setFilesUpdated([]);
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    
    if(files.length === 0) {
      return urls;
    }

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${Date.now()}_${fileName}`;
        console.log('Uploading file:', filePath);
        const { data, error } = await supabase.storage
          .from('animals-images')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('animals-images')
          .getPublicUrl(filePath);

        urls.push(publicUrl);
      }
      
      return urls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const handleDeleteImage = (index: number) => {
    setImageUrlUpdated((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateAnimal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!nameUpdated || !typeUpdated || !genderUpdated || !sizeUpdated || !descriptionUpdated) {
        toast({
          variant: "destructive",
          title: "Erro no formulário",
          description: "Por favor, preencha todos os campos obrigatórios.",
        });
        return;
      }
      const imageUrls = await uploadImages(filesUpdated);
      const allImages = [...imageUrlUpdated, ...imageUrls];
      setImageUrlUpdated(allImages);
      const animal = {
        name: nameUpdated,
        type: typeUpdated,
        breed: breedUpdated,
        age: ageUpdated,
        gender: genderUpdated,
        isAdopted: isAdoptedUpdated,
        description: descriptionUpdated,
        size: sizeUpdated,
        imageUrl: allImages,
      };
      const { error } = await supabase
        .from('animals')
        .update(animal)
        .eq('id', id);
      if (error) throw error;
      toast({
        title: "Status atualizado",
        description: `Animal autalizado com sucesso.`,
      });
      setIsEditAnimalOpen(false);
      if (onAnimalUpdated) {
        onAnimalUpdated();
      }
    } catch (error) {
      console.error('Error updating animal status:', error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar status",
        description: "Não foi possível atualizar o animal. Tente novamente.",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    if (imageUrl && Array.isArray(imageUrl)) {
      setCarouselImages(imageUrl);
    }
  },[imageUrl]);

  return (
    <>
      <div className="card-animal group">
        <div className="relative overflow-hidden">
          { imageUrl && imageUrl.length > 0 && (
          <img 
            src={ imageUrl[0] } 
            alt={`${nameUpdated} - ${typeUpdated}`} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          )}
          
          {isAdopted && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge className="bg-ong-orange text-white text-lg font-semibold px-4 py-1.5">
                Adotado
              </Badge>
            </div>
          )}
          
          
        </div>
        
        {/* Informações do animal */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-heading font-semibold text-lg">{nameUpdated}</h3>
            <Badge 
              className={
                typeUpdated === 'cat' ? 'bg-indigo-100 text-indigo-700' :
                typeUpdated === 'dog' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-700'
              }
            >
              {typeUpdated === 'cat' ? 'Gato' : 
               typeUpdated === 'dog' ? 'Cachorro' : 'Outro'}
            </Badge>
          </div>
          
          <div className="text-gray-500 text-sm space-y-1 mb-4">
            <p>{breedUpdated || 'SRD'}</p>
            <p>{ageUpdated} • {genderUpdated === 'male' ? 'Macho' : 'Fêmea'}</p>
            <p>
              Porte: {
                sizeUpdated === 'small' ? 'Pequeno' :
                sizeUpdated === 'medium' ? 'Médio' :
                'Grande'
              }
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-ong-teal text-ong-teal hover:bg-ong-teal hover:text-white transition-colors flex items-center justify-center gap-1"
            onClick={() => isAuthenticated ? setIsEditAnimalOpen(true) : setShowDetails(true)}
          >
            <Info size={16} />
            {isAuthenticated ? 'Editar' : 'Mais Informações'}
          </Button>
        </div>
      </div>
      
      <Dialog open={isEditAnimalOpen} onOpenChange={setIsEditAnimalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl flex items-center justify-between">
              {'Editar'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateAnimal}>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Informações Básicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Nome do animal"
                      value={nameUpdated}
                      onChange={(e) => setNameUpdated(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={typeUpdated}
                      onChange={(e) => setTypeUpdated(e.target.value as "dog" | "cat" | "other")}
                      required
                    >
                      <option value="dog">Cachorro</option>
                      <option value="cat">Gato</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Idade</label>
                    <input 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Ex: 2 anos"
                      value={ageUpdated}
                      onChange={(e) => setAgeUpdated(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Sexo</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={genderUpdated}
                      onChange={(e) => setGenderUpdated(e.target.value as "male" || "female")}
                      required
                    >
                      <option value="male">Macho</option>
                      <option value="female">Fêmea</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Raça (opcional)</label>
                    <input 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="SRD se não souber"
                      value={breedUpdated}
                      onChange={(e) => setBreedUpdated(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Porte</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={sizeUpdated}
                      onChange={(e) => setSizeUpdated(e.target.value as "small" | "medium" | "large")}
                      required
                    >
                      <option value="small">Pequeno</option>
                      <option value="medium">Médio</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>

                  <div>       
                    <Uploadzone
                      files={filesUpdated}
                      setFiles={setFilesUpdated}
                      uploading={uploading}
                      uploadProgress={uploadProgress}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Imagens</label>
                    {imageUrlUpdated.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-4">
                        {imageUrlUpdated.map((img, idx) => (
                          <section key={idx} className="relative group">
                            <img src={img} alt={`Imagem ${idx + 1}`} className="w-24 h-24 object-cover rounded" />
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                              aria-label="Remover imagem"
                            >
                              <span aria-hidden>×</span>
                            </button>
                          </section>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={isAdoptedUpdated ? 'adopted' : 'available'}
                      onChange={(e) => setIsAdoptedUpdated(e.target.value === 'adopted')}
                      required
                    >
                      <option value="available">Disponível para adoção</option>
                      <option value="adopted">Adotado</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                      placeholder="Descreva o animal, seu temperamento, histórico..." 
                      value={descriptionUpdated}
                      onChange={(e) => setDescriptionUpdated(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="ghost" onClick={() => {
                setIsEditAnimalOpen(false);
                resetForm();
              }}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-ong-teal hover:bg-teal-600">
                Atualizar Animal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
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
                {carouselImages.length > 0 && carouselImages.map((img, index) => (
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

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="font-medium">
                  {type === 'cat' ? 'Gato' : 
                   type === 'dog' ? 'Cachorro' : 'Outro'}
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
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {isAdopted ? 'Adotado' : 'Disponível para adoção'}
                </p>
              </div>
             
            </div>

            <div>
              <h4 className="font-semibold mb-2">Sobre {name}</h4>
              <p className="text-gray-600">{description}</p>
            </div>

            {!isAdopted && (
              <div className="pt-4 border-t">
                <Button 
                  className="w-full bg-ong-teal hover:bg-teal-600"
                  onClick={() => {
                    const message = `Olá! Estou interessado(a) em adotar ${nameUpdated}.`;
                    const whatsappUrl = `https://chat.whatsapp.com/EBqcPrjw7Y7Fo2rBeoUVmd?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  Quero Adotar
                </Button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  Ao clicar, você será redirecionado para o WhatsApp
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
