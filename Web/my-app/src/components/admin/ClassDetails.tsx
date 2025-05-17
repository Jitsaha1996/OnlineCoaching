import React, {useState} from 'react'



const ClassDetails: React.FC = () =>{
      const [students, setStudents] = useState<IClass[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
      const [page, setPage] = useState<number>(0);
      const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    return(
        <div>
        Class Details
        </div>
    )
}

export default ClassDetails;