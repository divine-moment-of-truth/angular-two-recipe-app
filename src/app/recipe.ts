export class Recipe{
    constructor(
        public recipe_id: number,
        public recipe_name: string,
        public recipe_description: string,
        public category_name: string,
        public category_id: number,
        public instruction_one: string,
        public instruction_two: string,
        public instruction_three: string,
        public instruction_four: string,
        public instruction_five: string,
        public instruction_six: string,
        public difficulty_id: number,
        public difficulty_name: string,
        public healthy: string,
        public prep_time: number,
        public vegetarian: string,
        public image_id: number,
        public image_name_path: string
    ){}

}