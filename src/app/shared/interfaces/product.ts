import { Brand } from './brand';
import { Category } from './category';
import { CustomFields } from './custom-fields';

export interface ProductFeature {
    name: string;
    value: string;
}

export interface ProductFeaturesSection {
    name: string;
    features: ProductFeature[];
}



export interface ProductAttributeValue {
    name: string;
    slug: string;
    customFields: CustomFields;
}

export interface ProductAttribute {
    name: string;
    slug: string;
    featured: boolean;
    values: ProductAttributeValue[];
    customFields: CustomFields;
}

export interface Product {
    id: number;
    slug: string;
    name: string;
    price: number;
    compareAtPrice: number | null;
    images: string[];
    badges: string[];
    rating: number;
    reviews: number;
    availability: string;
    brand: Brand | null;
    categories: Category[];
    attributes: ProductAttribute[];
    customFields: CustomFields;
}

/* todo change */
export interface Product1 {
    ProductId: number;
    ReferenceId: number;
    QuantityPerBox: number;
    Price: number;
    Label: string;
    DefaultPhotoPath: string;
    badges: string[];
    MinQuantity: number;
    NumberOfComment: number;
    Code: string;
    ParentId: number;
    Comments: any[];
    Quantity?: number;
}

export interface ProductDetail1 {

    Color: string;
    DefaultPhotoPath: string;
    Description: string;
    HasBought: boolean;
    ImagesPath: [];
    IsFavorite: boolean;
    Label: string;
    MainCategoryId: number;
    Material: string;
    MinQuantity: number;
    Price: number;
    ProductId: number;
    QuantityPerBox: number;
    ReferenceCode: string;
    ReferenceId: number;
    SecondCategoryId: number;
    Size: string;
    Comments: any[]
}
