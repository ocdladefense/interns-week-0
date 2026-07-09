// Class declaration for Location object with properties: name, lat, lng
export class Location {
    id;
    name;
    lat;
    lng;
    stateCode;

    // Full Constructor
    constructor(name, lat, lng, stateCode) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.stateCode = stateCode;
    }

    setId(string){
        this.id = string;
    }
}