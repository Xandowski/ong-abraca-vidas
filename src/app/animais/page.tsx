'use client';

import AnimalCard from '@/components/AnimalCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/hooks/useSupabase';
import { useToast } from '@/hooks/use-toast';
import { Animal } from '@/types/database';
import { Filter, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Animals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animalType, setAnimalType] = useState('all');
  const [animalSize, setAnimalSize] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [includeAdopted, setIncludeAdopted] = useState(false);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { supabase } = useSupabase();
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }
        setAnimals(data || []);
      } catch (error) {
        console.error('Error fetching animals:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar animais",
          description: "Não foi possível carregar a lista de animais. Tente novamente mais tarde.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimals();
  }, [supabase, toast]);

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (animal.breed && animal.breed.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = animalType === 'all' || animal.type === animalType;
    
    const matchesSize = animalSize === 'all' || animal.size === animalSize;
    
    const matchesAdoptionStatus = includeAdopted || !animal.isAdopted;
    
    return matchesSearch && matchesType && matchesSize && matchesAdoptionStatus;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setAnimalType('all');
    setAnimalSize('all');
    setIncludeAdopted(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-ong-light">
        <section className="bg-orange-400 text-white py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Animais para adoção</h1>
            <p className="mt-2">Encontre o companheiro perfeito para você</p>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 flex-1 bg-gray-100 rounded-md px-3 py-2">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Busque por nome ou raça..."
                  className="bg-transparent border-none focus:outline-none w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t animate-fade-in">
                <div className="flex flex-wrap gap-4">
                  <div className="w-full sm:w-auto">
                    <label className="text-sm font-medium block mb-1">Tipo</label>
                    <select
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={animalType}
                      onChange={(e) => setAnimalType(e.target.value)}
                    >
                      <option value="all">Todos</option>
                      <option value="dog">Cachorros</option>
                      <option value="cat">Gatos</option>
                      <option value="bird">Aves</option>
                      <option value="other">Outros</option>
                    </select>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <label className="text-sm font-medium block mb-1">Tamanho</label>
                    <select
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={animalSize}
                      onChange={(e) => setAnimalSize(e.target.value)}
                    >
                      <option value="all">Todos</option>
                      <option value="small">Pequeno</option>
                      <option value="medium">Médio</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                  
                  <div className="w-full sm:w-auto flex items-end">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeAdopted}
                        onChange={(e) => setIncludeAdopted(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span>Incluir animais adotados</span>
                    </label>
                  </div>
                  
                  <div className="w-full sm:w-auto flex items-end ml-auto">
                    <Button variant="ghost" onClick={resetFilters} className="text-ong-primary">
                      Limpar filtros
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {(searchTerm || animalType !== 'all' || animalSize !== 'all' || includeAdopted) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-500">Filtros ativos:</span>
                
                {searchTerm && (
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1 px-3">
                    Busca: {searchTerm}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchTerm('')}
                    />
                  </Badge>
                )}
                
                {animalType !== 'all' && (
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1 px-3">
                    Tipo: {
                      animalType === 'dog' ? 'Cachorro' : 
                      animalType === 'cat' ? 'Gato' : 
                      animalType === 'bird' ? 'Ave' : 'Outro'
                    }
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setAnimalType('all')}
                    />
                  </Badge>
                )}
                
                {animalSize !== 'all' && (
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1 px-3">
                    Tamanho: {
                      animalSize === 'small' ? 'Pequeno' :
                      animalSize === 'medium' ? 'Médio' :
                      'Grande'
                    }
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setAnimalSize('all')}
                    />
                  </Badge>
                )}
                
                {includeAdopted && (
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1 px-3">
                    Incluir adotados
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setIncludeAdopted(false)}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </section>
        
        <section className="container mx-auto px-4 pb-16">
          <div className="mb-6">
            <h2 className="text-lg font-medium">
              {filteredAnimals.length} animais encontrados
            </h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg" />
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAnimals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAnimals.map((animal) => (
                <AnimalCard 
                  key={animal.id} 
                  {...animal} 
                  imageUrl={animal.imageUrl}
                  isAdopted={animal.isAdopted}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-medium mb-2">Nenhum animal encontrado</h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar os seus filtros para ver mais resultados.
              </p>
              <Button onClick={resetFilters}>
                Limpar todos os filtros
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Animals;
