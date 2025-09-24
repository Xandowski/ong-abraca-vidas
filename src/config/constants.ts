export const APP_CONFIG = {
  name: 'Abraça Vidas',
  description: 'Conectamos animais que precisam de um lar com pessoas que têm amor para dar. Adote, não compre.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  contactEmail: 'contato@abracavidas.org',
  social: {
    instagram: 'https://instagram.com/abracavidas',
    facebook: 'https://facebook.com/abracavidas',
  },
  features: {
    adoptionEnabled: true,
    donationEnabled: true,
  },
  imageConfig: {
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    dimensions: {
      width: 800,
      height: 600,
    },
  },
};
