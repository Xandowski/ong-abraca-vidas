
import AnimalCard, { AnimalProps } from '@/components/AnimalCard';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useState } from 'react';

// Dados mockados para exemplo
const ongAnimals: AnimalProps[] = [
  {
    id: 1,
    name: 'Luna',
    type: 'cat',
    breed: 'SRD',
    age: '1 ano',
    gender: 'female',
    size: 'small',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: false,
  },
  {
    id: 2,
    name: 'Max',
    type: 'dog',
    breed: 'Labrador',
    age: '3 anos',
    gender: 'male',
    size: 'large',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: false,
  },
  {
    id: 3,
    name: 'Bella',
    type: 'dog',
    breed: 'SRD',
    age: '2 anos',
    gender: 'female',
    size: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: true,
  },
  {
    id: 4,
    name: 'Oliver',
    type: 'cat',
    breed: 'SRD',
    age: '6 meses',
    gender: 'male',
    size: 'small',
    imageUrl: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: false,
  },
  {
    id: 5,
    name: 'Charlie',
    type: 'dog',
    breed: 'Golden Retriever',
    age: '4 anos',
    gender: 'male',
    size: 'large',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    isAdopted: false,
  },
];

const OngDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'adopted'>('all');
  const [isAddAnimalOpen, setIsAddAnimalOpen] = useState(false);
  
  // Filtrar animais com base nos critérios
  const filteredAnimals = ongAnimals.filter((animal) => {
    // Filtro por termo de busca
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (animal.breed && animal.breed.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filtro por status
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'available' ? !animal.isAdopted :
      animal.isAdopted;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-ong-light">
        {/* Header */}
        <section className="bg-ong-dark text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold">Dashboard da ONG</h1>
                <p className="text-sm text-gray-300 mt-1">Abrigo Amigo dos Animais</p>
              </div>
              
              <Button 
                onClick={() => setIsAddAnimalOpen(true)} 
                className="mt-4 md:mt-0 bg-ong-orange hover:bg-orange-500 flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Cadastrar Animal
              </Button>
            </div>
          </div>
        </section>
        
        {/* Status Overview */}
        <section className="container mx-auto px-4 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
              <div className="bg-ong-teal/10 rounded-full p-3">
                <PawPrint className="h-6 w-6 text-ong-teal" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Animais</p>
                <p className="text-2xl font-semibold">{ongAnimals.length}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
              <div className="bg-amber-100 rounded-full p-3">
                <PawPrint className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Para Adoção</p>
                <p className="text-2xl font-semibold">
                  {ongAnimals.filter(animal => !animal.isAdopted).length}
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
                  {ongAnimals.filter(animal => animal.isAdopted).length}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Listagem de Animais */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <Tabs defaultValue="animals" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="animals">Animais</TabsTrigger>
                <TabsTrigger value="adoption-requests">Pedidos de Adoção</TabsTrigger>
                <TabsTrigger value="profile">Perfil da ONG</TabsTrigger>
              </TabsList>
              
              <TabsContent value="animals">
                {/* Filtros e ações */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
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
                  
                  <div className="flex gap-2">
                    <select
                      className="rounded-md border border-gray-300 px-3 py-2"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as 'all' | 'available' | 'adopted')}
                    >
                      <option value="all">Todos</option>
                      <option value="available">Disponíveis</option>
                      <option value="adopted">Adotados</option>
                    </select>
                    
                    <div className="flex items-center bg-gray-100 rounded-md">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200 rounded-md' : ''}`}
                      >
                        <LayoutGrid size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-gray-200 rounded-md' : ''}`}
                      >
                        <List size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Listagem de animais */}
                {filteredAnimals.length > 0 ? (
                  viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredAnimals.map((animal) => (
                        <div key={animal.id} className="relative">
                          <AnimalCard {...animal} />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                              >
                                <MoreVertical size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Pencil size={14} /> Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                <Trash2 size={14} /> Excluir
                              </DropdownMenuItem>
                              {!animal.isAdopted && (
                                <DropdownMenuItem className="flex items-center gap-2 text-green-600">
                                  <Check size={14} /> Marcar como adotado
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                                      src={animal.imageUrl} 
                                      alt={animal.name} 
                                      className="h-full w-full object-cover" 
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium">{animal.name}</div>
                                    <div className="text-sm text-gray-500">
                                      {animal.type === 'cat' ? 'Gato' : 
                                      animal.type === 'dog' ? 'Cachorro' : 
                                      animal.type === 'bird' ? 'Ave' : 'Outro'}
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
                                  <Button variant="ghost" size="sm" className="text-red-600">
                                    <Trash2 size={14} />
                                  </Button>
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
              </TabsContent>
              
              <TabsContent value="adoption-requests">
                <div className="flex flex-col items-center justify-center py-16">
                  <p className="text-gray-500 mb-4 text-center">
                    Aqui você verá os pedidos de adoção para seus animais.
                  </p>
                  <Button variant="outline" className="mt-2">
                    Ver pedidos de adoção
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="profile">
                <div className="flex flex-col items-center justify-center py-16">
                  <p className="text-gray-500 mb-4 text-center">
                    Aqui você pode editar o perfil da sua ONG.
                  </p>
                  <Button variant="outline" className="mt-2">
                    Editar perfil
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Dialog de Adicionar Animal */}
        <Dialog open={isAddAnimalOpen} onOpenChange={setIsAddAnimalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Animal</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <div className="h-60 bg-gray-100 rounded-md flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <PlusCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Clique para adicionar foto</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300">
                    <PlusCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300">
                    <PlusCircle className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300">
                    <PlusCircle className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Ex: Rex" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option>Cachorro</option>
                        <option>Gato</option>
                        <option>Ave</option>
                        <option>Outro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Raça</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Ex: SRD" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Idade</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Ex: 2 anos" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Sexo</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                        <option>Macho</option>
                        <option>Fêmea</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Porte</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option>Pequeno</option>
                      <option>Médio</option>
                      <option>Grande</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                      placeholder="Descreva o animal, seu temperamento, histórico..." 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" onClick={() => setIsAddAnimalOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-ong-teal hover:bg-teal-600">
                Cadastrar Animal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
};

export default OngDashboard;
