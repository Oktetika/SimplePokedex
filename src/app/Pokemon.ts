export class Pokemon {
    id: number;
    name: string;
    sprite: string;
    height: any;
    weight: any;
    active: boolean;
    constructor(id: number, name: string, sprite: string, height: any, weight: any) {
        this.id = id;
        this.name = name;
        this.sprite = sprite;
        this.height = height;
        this.weight = weight;
    }
}
