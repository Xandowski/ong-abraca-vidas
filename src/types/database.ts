export interface Animal {
  id: number
  created_at: string
  name: string
  type: 'cat' | 'dog' | 'other'
  breed?: string
  age: number
  ageMonth?: number | null
  gender: 'male' | 'female'
  size: 'small' | 'medium' | 'large'
  imageUrl?: string[];
  isAdopted: boolean
  description?: string
}

export type Database = {
  public: {
    Tables: {
      animals: {
        Row: Animal
        Insert: Omit<Animal, 'id' | 'created_at'>
        Update: Partial<Omit<Animal, 'id' | 'created_at'>>
      }
    }
  }
}