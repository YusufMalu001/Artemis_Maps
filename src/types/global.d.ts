declare global {
  interface Window {
    google: typeof google;
  }
  
  // Add specific Google Maps types
  interface google {
    maps: {
      Map: any;
      LatLngBounds: any;
      places: {
        SearchBox: any;
      };
      // Add other Google Maps types you're using
    };
  }
}

export {};