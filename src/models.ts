export interface Iproducts {
    id: number | string,
    name: string,
    price: number,
    images: string,
    details: string,
    categoryId: number
    quantity: number
}


export interface ICategories {
    id: number | string,
    name: string,
}


export interface IUser {
    id?: string | number,
    firstname?: string,
    lastname?: string,
    email: string,
    password: string,
    accessToken?: string
    role?: string,
}

export interface ICart {
    id: number;
    products: (Iproducts
        // & { quantity: number }
    )[];
    // user: IUser;
}
