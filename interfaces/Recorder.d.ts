export interface RecordXmlFormat {
  url:string;
  method:string;
  data?:Document | BodyInit | null;
  res: {
    status:number;
    text:string;
  };
}

export interface RecordClickEventFormat {
  
}