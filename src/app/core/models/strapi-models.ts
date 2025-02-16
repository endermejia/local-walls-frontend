// Rasponse Inter
export interface StrapiResponse<T> {
  data: T;
}

// Zone Interface
export interface Zone {
  id: number;
  documentId: string;
  name: string;
  description: string;
  crags: Crag[]; // Relación con crags
}

// Crag Interface
export interface Crag {
  id: number;
  documentId: string;
  name: string;
  description: string;
  location: string; // Ubicación del crag (latitud/longitud)
  approach: number; // Tiempo de aproximación en minutos
  photos: string[]; // URLs de fotos
  parkings: Parking[]; // Relación con parkings
  topos: Topo[]; // Relación con topos
  zone: number; // Relación con zona (ID de la zona)
}

// Parking Interface
export interface Parking {
  id: number;
  documentId: string;
  name: string;
  location: string; // Ubicación del parking (latitud/longitud)
  capacity: number; // Capacidad del parking
  crag: number; // ID del crag al que pertenece
}

// Topo Interface
export interface Topo {
  id: number;
  documentId: string;
  name: string;
  photo: string; // URL de la imagen del topo
  crag: number; // ID del crag al que pertenece
  topoRoutes: TopoRoute[]; // Relación con rutas en el topo
}

// TopoRoute Interface
export interface TopoRoute {
  id: number;
  documentId: string;
  number: number; // Número de la ruta en el croquis
  route: Route; // Relación con la ruta
  topo: number; // ID del topo al que pertenece
}

// Route Interface
export interface Route {
  id: number;
  documentId: string;
  name: string;
  grade: string; // Grado de la ruta (ej. 6a, 7b)
  topoRoutes: TopoRoute[]; // Relación con los números en los croquis
  height: number; // Altura de la ruta en metros
  url_8anu: string; // URL de la ruta en 8a.nu
  ascents: Ascent[]; // Relación con ascensiones de usuarios
  bolters: Bolter[]; // Relación con equipadores
}

// Bolter Interface
export interface Bolter {
  id: number;
  documentId: string;
  name: string;
  description: string;
  picture: string; // URL de la imagen del equipador
  routes: Route[]; // Rutas equipadas por el equipador
}

// Ascent Interface
export interface Ascent {
  id: number;
  documentId: string;
  grade: string; // Grado registrado en la ascensión
  date: string; // Fecha de la ascensión (formato ISO)
  type: 'redpoint' | 'flash' | 'onsight'; // Tipo de ascensión
  route: number; // ID de la ruta ascendida
  user: number; // ID del usuario que realizó la ascensión
}

// User Interface
export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  ascents: Ascent[]; // Relación con ascensiones realizadas
  likedRoutes: number[]; // IDs de rutas marcadas como favoritas
  likedCrags: number[]; // IDs de crags marcados como favoritos
  likedZones: number[]; // IDs de zonas marcadas como favoritas
}
