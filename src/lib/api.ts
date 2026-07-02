
export interface Technician {
  id: string;
  name: string;
  serviceType: string;
  rating: number;
  experience: string;
  imageUrl: string;
}

export interface Booking {
  technicianId: string;
  userName: string;
  address: string;
  date: string;
}

export async function fetchTechnicians(serviceType: string): Promise<Technician[]> {
  // Return mock data directly to avoid "Failed to fetch" errors from non-existent local API
  return getMockTechnicians(serviceType);
}

export async function createBooking(booking: Booking) {
  // Simplified for mock behavior as actual booking happens via Firestore in components
  return { 
    status: 'success', 
    message: 'Booking confirmed', 
    technicianName: 'Mock Tech', 
    estimatedArrival: '20 mins' 
  };
}

function getMockTechnicians(type: string): Technician[] {
  const techs = [
    { id: '1', name: 'John Doe', serviceType: type, rating: 4.8, experience: '5 years', imageUrl: 'https://picsum.photos/seed/tech1/400/400' },
    { id: '2', name: 'Sarah Smith', serviceType: type, rating: 4.9, experience: '8 years', imageUrl: 'https://picsum.photos/seed/tech2/400/400' },
    { id: '3', name: 'Mike Johnson', serviceType: type, rating: 4.5, experience: '3 years', imageUrl: 'https://picsum.photos/seed/tech3/400/400' },
  ];
  return techs;
}
