export interface IClass {
    _id?: string | null; // Optional field, can be null
    className: string;
    classDescription?: string;
    boards: IBoard[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IBoard {
    _id?: string|null;            
    boardName: string;
    boardDescription?: string;   
    subjects:ISubject[]       
}
export interface ISubject {
    _id: string | null; // Optional field, can be null
    subjectName: string;
    subjectDescription?: string;
    subjectCode?: string;
}
