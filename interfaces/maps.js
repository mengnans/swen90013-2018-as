
type callback = (results: Object, status: number) => void;

declare class Geocoder {
    geocode(obj: Object, callback: callback): void;
}

declare class LatLng {
}

declare class LatLngBounds {
    extend(point: LatLng): LatLngBounds;
}

declare class AutocompleteService {
    getPlacePredictions(obj: Object, callback: callback): void;
}

declare class Places {
    AutocompleteService(): AutocompleteService;
    PlacesServiceStatus: Object;
}

declare class Map {
}

declare class GoogleMaps {
    Geocoder(): Geocoder;
    LatLng(lat: number, lon: number, noWrap: ?boolean): LatLng;
    LatLngBounds(sw?: LatLng, ne?: LatLng): LatLngBounds;
    Map(node: Element, obj: Object): Map;
    places: Places;
}

declare class Google {
    maps: GoogleMaps;
}
