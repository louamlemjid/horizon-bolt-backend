export class CreateProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    isPaid: boolean;
    techKeywords?: string[];
    previewLink: string;
    boltLink: string;
    userNameOwner: string;
}
