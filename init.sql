-- PostgreSQL-compatible initialization script for Abraça Vidas
-- Enables UUID generation and creates required tables, triggers and sample data

-- Create extension as superuser
SET ROLE postgres;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
RESET ROLE;

-- Table: animals
CREATE TABLE IF NOT EXISTS animals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    age INTEGER,
    size VARCHAR(50),
    gender VARCHAR(20),
    description TEXT,
    imageUrl TEXT,
    isAdopted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on animals
DROP TRIGGER IF EXISTS update_animals_updated_at ON animals;
CREATE TRIGGER update_animals_updated_at
    BEFORE UPDATE ON animals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data (id will be generated automatically)
INSERT INTO animals (name, type, breed, age, size, gender, description, imageUrl, isAdopted)
VALUES
    ('Max', 'dog', 'Vira-lata', 2, 'medium', 'male', 'Um cachorro muito dócil e brincalhão', 'https://example.com/max.jpg', false),
    ('Luna', 'cat', 'Siamês', 1, 'small', 'female', 'Uma gatinha muito carinhosa', 'https://example.com/luna.jpg', false),
    ('Thor', 'dog', 'Pastor Alemão', 3, 'large', 'male', 'Um cachorro muito protetor e leal', 'https://example.com/thor.jpg', false),
    ('Nina', 'cat', 'Persa', 2, 'small', 'female', 'Uma gatinha calma e dengosa', 'https://example.com/nina.jpg', false)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security for sensitive tables
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;

-- Public policy to allow selects on animals (adjust for production)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE polname = 'animals_public_view' AND polrelid = 'animals'::regclass
    ) THEN
        EXECUTE 'CREATE POLICY animals_public_view ON animals FOR SELECT TO PUBLIC USING (true)';
    END IF;
END$$;

-- Note: policies that reference 'authenticated' and auth.uid() depend on Supabase's role setup.
-- Keep them commented or adjust according to your Supabase/Postgres auth setup.

