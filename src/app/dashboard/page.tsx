'use client'

import AnimalCard from '@/components/AnimalCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Uploadzone from '@/components/Uploadzone';
import { useToast } from '@/hooks/use-toast';
import { Animal } from '@/types/database';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Check,
  LayoutGrid,
  List,
  MoreVertical,
  PawPrint,
  Pencil,
  PlusCircle,
  Search,
  Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const OngDashboard = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'adopted'>('all');
  const [isAddAnimalOpen, setIsAddAnimalOpen] = useState(false);
  
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [type, setType] = useState('dog');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('medium');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
 
  const resetForm = () => {
    setName('');
    setType('dog');
    setAge('');
    setGender('male');
    setBreed('');
    setSize('medium');
    setDescription('');
    setImageUrl([]);
    setFiles([]);
    setUploadProgress(0);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          router.push("/login");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking auth:', error);
        router.push("/login");
        return;
      }
    };

    checkAuth();
  }, [router, supabase]);

  const fetchAnimals = useCallback(async () => {
      try {
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .order('created_at', { ascending: false });

          console.log('Fetched animals:', data);
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
    }, [supabase, toast]);


  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    fetchAnimals();
  }, [isAuthenticated, fetchAnimals]);

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
 
  const handleCreateAnimal = async (e: React.FormEvent) => {
    e.preventDefault();
    const urls: string[] = [];

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!name || !type || !gender || !size || !description) {
        toast({
          variant: "destructive",
          title: "Erro no formulário",
          description: "Por favor, preencha todos os campos obrigatórios.",
        });
        return;
      }
      const imageUrls = await uploadImages(files);

      const newAnimal = {
        name,
        type,
        age,
        gender,
        breed: breed || 'SRD',
        size,
        description,
        imageUrl: imageUrls,
        isAdopted: false,
        created_at: new Date().toISOString(),
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('animals')
        .insert([newAnimal])
        .select()
        .single();

      if (error) throw error;

      setAnimals([data, ...animals]);
      setIsAddAnimalOpen(false);
      resetForm();

      toast({
        title: "Animal cadastrado",
        description: "Animal cadastrado com sucesso.",
      });
    } catch (error) {
      console.error('Error creating animal:', error);
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar",
        description: "Não foi possível cadastrar o animal. Tente novamente.",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteAnimal = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este animal? Esta ação não pode ser desfeita.')) {
      return;
    }
    console.log('Deleting animal with ID:', id);
    try {
      const { error } = await supabase
        .from('animals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAnimals(animals.filter(animal => animal.id !== id));

      toast({
        title: "Animal excluído",
        description: "Animal removido com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting animal:', error);
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Não foi possível excluir o animal. Tente novamente.",
      });
    }
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (animal.breed && animal.breed.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'available' ? !animal.isAdopted :
      animal.isAdopted;
    
    return matchesSearch && matchesStatus;
  });
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-ong-light">
        <section className="bg-ong-dark text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">Dashboard da ONG</h1>
                <p className="text-gray-300">Gerencie os animais cadastrados</p>
              </div>
              
              <Button 
                onClick={() => setIsAddAnimalOpen(true)}
                className="mt-4 md:mt-0 bg-ong-teal hover:bg-teal-600"
              >
                <PlusCircle size={16} className="mr-2" />
                Cadastrar Animal
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
              <div className="bg-indigo-100 rounded-full p-3">
                <PlusCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Animais</p>
                <p className="text-2xl font-semibold">{animals.length}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
              <div className="bg-amber-100 rounded-full p-3">
                <PawPrint className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Para Adoção</p>
                <p className="text-2xl font-semibold">
                  {animals.filter(animal => !animal.isAdopted).length}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
              <div className="bg-green-100 rounded-full p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Adotados</p>
                <p className="text-2xl font-semibold">
                  {animals.filter(animal => animal.isAdopted).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 flex-1 bg-gray-100 rounded-md px-3 py-2">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar animal..."
                    className="bg-transparent border-none focus:outline-none w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    className="rounded-md border border-gray-300 px-3 py-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'available' | 'adopted')}
                  >
                    <option value="all">Todos</option>
                    <option value="available">Para adoção</option>
                    <option value="adopted">Adotados</option>
                  </select>
                  
                  <div className="border rounded-md p-1 flex gap-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                    >
                      <LayoutGrid size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                    >
                      <List size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
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
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAnimals.map((animal) => (
                      <div key={animal.id} className="relative group">
                        <AnimalCard 
                          {...animal}
                          imageUrl={animal.imageUrl}
                          isAdopted={animal.isAdopted}
                          isAuthenticated={isAuthenticated}
                          setUploadProgress={setUploadProgress}
                          setUploading={setUploading}
                          onAnimalUpdated={fetchAnimals}
                        />
                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="bg-white/80 hover:bg-white"
                              >
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-red-600"
                                onClick={() => handleDeleteAnimal(animal.id)}
                              >
                                <Trash2 size={14} /> Excluir
                              </DropdownMenuItem>
                              {/* {!animal.isAdopted && (
                                <DropdownMenuItem 
                                  className="flex items-center gap-2 text-green-600"
                                  onClick={() => handleUpdateAnimalStatus(animal.id, true)}
                                >
                                  <Check size={14} /> Marcar como adotado
                                </DropdownMenuItem>
                              )}
                              {animal.isAdopted && (
                                <DropdownMenuItem 
                                  className="flex items-center gap-2 text-amber-600"
                                  onClick={() => handleUpdateAnimalStatus(animal.id, false)}
                                >
                                  <PawPrint size={14} /> Marcar como disponível
                                </DropdownMenuItem>
                              )} */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Animal
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Detalhes
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y">
                        {filteredAnimals.map((animal) => (
                          <tr key={animal.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                                  <img 
                                    src={animal.imageUrl[0]} 
                                    alt={animal.name} 
                                    className="h-full w-full object-cover" 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">{animal.name}</div>
                                  <div className="text-sm text-gray-500">
                                    {animal.type === 'cat' ? 'Gato' : 
                                    animal.type === 'dog' ? 'Cachorro' : 'Outro'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">{animal.breed || 'SRD'}</div>
                              <div className="text-sm text-gray-500">
                                {animal.age} • {animal.gender === 'male' ? 'Macho' : 'Fêmea'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={
                                animal.isAdopted 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-amber-100 text-amber-700'
                              }>
                                {animal.isAdopted ? 'Adotado' : 'Disponível'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  <Pencil size={14} className="mr-1" /> Editar
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600"
                                  onClick={() => handleDeleteAnimal(animal.id)}
                                >
                                  <Trash2 size={14} />
                                </Button>
                                {/* {!animal.isAdopted ? (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-green-600"
                                    onClick={() => handleUpdateAnimalStatus(animal.id, true)}
                                  >
                                    <Check size={14} />
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-amber-600"
                                    onClick={() => handleUpdateAnimalStatus(animal.id, false)}
                                  >
                                    <PawPrint size={14} />
                                  </Button>
                                )} */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                <div className="bg-gray-50 p-8 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-2">Nenhum animal encontrado</h3>
                  <p className="text-gray-500 mb-4">
                    Ajuste os filtros ou cadastre novos animais.
                  </p>
                  <Button onClick={() => setIsAddAnimalOpen(true)}>
                    <PlusCircle size={16} className="mr-2" />
                    Cadastrar animal
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Dialog open={isAddAnimalOpen} onOpenChange={setIsAddAnimalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl flex items-center justify-between">
              {'Cadastrar Novo Animal'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCreateAnimal}>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Informações Básicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Nome do animal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
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
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Sexo</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
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
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Porte</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      required
                    >
                      <option value="small">Pequeno</option>
                      <option value="medium">Médio</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                    <Uploadzone
                      files={files}
                      setFiles={setFiles}
                      uploading={uploading}
                      uploadProgress={uploadProgress}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                      placeholder="Descreva o animal, seu temperamento, histórico..." 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="ghost" onClick={() => {
                setIsAddAnimalOpen(false);
                resetForm();
              }}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-ong-teal hover:bg-teal-600">
                Cadastrar Animal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default OngDashboard;
