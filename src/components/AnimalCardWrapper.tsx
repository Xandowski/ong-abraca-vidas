import { Animal } from "@/types/database";
import AnimalCard from "./AnimalCard";
import { fetchAnimals } from "@/services/api/animals";
import { CardSkeleton } from "./ui/skeleton";

export default async function AnimalCardWrapper({ limit }: { limit?: number }) {
    const animals = await fetchAnimals({ limit });

    if (!animals || animals.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Nenhum animal disponível no momento.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {animals.map((animal) => (
                <AnimalCard 
                    key={animal.id}
                    id={animal.id}
                    name={animal.name}
                    type={animal.type}
                    breed={animal.breed}
                    age={animal.age}
                    gender={animal.gender}
                    size={animal.size}
                    imageUrl={animal.imageUrl}
                    description={animal.description}
                    isAdopted={animal.isAdopted}
                />
            ))}
        </div>
    )
} 
