export interface CareersDataType {
    success : Boolean;
    message : string ;
    data : ResponseData[]
}

export interface ResponseData {
    id : number ;
    company_id :number ;
    from_date : string ;
    to_date : string ;
    telephone : string ;
    salary :number ;
    image_baseurl : string;
    image : string ;
    image_basename: string ;
    image_webp : string ;
    created_at : string ;
    updated_at : string ;
    locales : localesType
}

export interface localesType {
    en :{    
        id: number ,
    name: string,
    description: string,
    position: string ,
    benefit: string,
    created_at: string,
    updated_at:string},
    ar : {
        id: number ,
    name: string,
    description: string,
    position: string,
    benefit: string,
    created_at: string,
    updated_at: string
    }
}
