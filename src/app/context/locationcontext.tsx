// app/context/LocationContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextType {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("0"); // "0" means "All Location"
  const [searchQuery, setSearchQuery] = useState<string>(""); // Global search query
  
  return (
    <LocationContext.Provider value={{ 
      selectedLocation, 
      setSelectedLocation,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </LocationContext.Provider>
  );
};