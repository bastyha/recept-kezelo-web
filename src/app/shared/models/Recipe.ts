export interface Recipe {
    id:string;
    name: string;
    owner:string;
    timeInMinutes: number;
    ingredients: [{
        nameOfIngredient: string;
        amount: number;
        unit: string;
    }]|null;
    steps:[{stepDescription:string}]|null;
    image_id:string;
}