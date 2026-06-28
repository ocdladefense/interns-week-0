// Class declaration for Location object with properties: name, lat, lng
export class Location {
    id;
    name;
    lat;
    lng;

    // Full Constructor
    constructor(name, lat, lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

    setId(string){
        this.id = string;
    }
}