export interface companyAllData {
    current_page:number | string; 
    data: CompanyType[]
    from: number ,
    last_page: number
    message : string ;
    next_page_url:string ;
    per_page: number ;
    prev_page_url :string ;
    status: number ;
    success: boolean
    to:number ;
    total: number 
}

export interface CompanyType {
    address: any ;
    branches:[]
    close_day :string ;
    close_hour: string ;
    color:string ;
    contact_image:string ;
    cover: string ;
    cover_basename:string ;
    created_at: string;
    created_by:string
    email:string;
    facebook: string ; 
    icon:string ;
    id: number ;
    image: string ;
    image_basename :string;
    image_baseurl: string ;
    image_webp: string;
    is_featured: number | boolean 
    istagram : string 
    lat:string
    lng: string;
    locales: localsType 
    main_categories:[]
    map: string ;
    mobile:string ;
    open_day: string ;
    open_hour:string;
    phone:string;
    slug:string;
    tiktok: string | null ;
    updated_at: string ;
    updated_by: string ;
    whatsapp:string
}


export interface localsType {
    ar : {        
        company_id: number ;
        created_at:string ;
        description:string ;
        id:number ;
        locale :string ;
        name :string
        updated_at:string
    },
    en : {        
        company_id: number ;
        created_at:string ;
        description:string ;
        id:number ;
        locale :string ;
        name :string
        updated_at:string
    }
}