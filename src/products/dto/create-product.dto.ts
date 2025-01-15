export class CreateProductDto {
    name: string;
    description: string;
    price: number;
    isPaid: boolean;
    techKeywords?: string[];
    previewLink: string;
    designerId: number;
}
