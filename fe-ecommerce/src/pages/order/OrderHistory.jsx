import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { AiFillDelete } from 'react-icons/ai'
import TablePagination from '@mui/material/TablePagination'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { fetchMyOrderAction } from '../../features/order/orderAction'


const OrderHistory = () => {
    const dispatch = useDispatch();
    const {myOrder} = useSelector((state)=> state.orderInfo)
    const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(10);

      useEffect(()=>{
        dispatch(fetchMyOrderAction())
      }, [dispatch])
    
      const handleChangePage = (event, newPage) => setPage(newPage);
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const visibleRows = myOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
      <div>

 <div className="mt-5">
       <div className="p-4 d-flex justify-content-between align-items-center">
     <h3>Product</h3>
   </div>
   
   <hr />
   <div
         style={{
           width: "85vw",
           height: "80vh",
           padding: 20,
           boxSizing: "border-box",
           display: "flex",
           flexDirection: "column",
         }}
       >
         <div
           style={{
             flexGrow: 1,
             overflowX: "auto",
             overflowY: "auto",
           }}
         >
           <Table sx={{ minWidth: 300 }} aria-label="admin table" stickyHeader>
             <TableHead>
               <TableRow>
                 <TableCell>S/N</TableCell>
                 <TableCell align="right">Title</TableCell>
                 <TableCell align="right">Image</TableCell>
                 <TableCell align="right">Quantity</TableCell>
                 <TableCell align="right">Size</TableCell>
                 <TableCell align="right">Action</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {visibleRows.map((item, index) => (
                 <TableRow key={item._id}>
                   <TableCell component="th" scope="row">
                     {page * rowsPerPage + index + 1}
                   </TableCell>
                   <TableCell align="right">{item.productTitle}</TableCell>
                   <TableCell align="right">
                    <img src={item.thumbnail} className='rounded-circle' width={100} height={100} alt="" />
                   </TableCell>
                   <TableCell align="right">{item.quantity}</TableCell>
                   <TableCell align="right">{item.size}</TableCell>
                   <TableCell align="right"><Button variant='success'>Leave Review</Button></TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
            <TablePagination
           component="div"
           count={myOrder.length}
           page={page}
           onPageChange={handleChangePage}
           rowsPerPage={rowsPerPage}
           onRowsPerPageChange={handleChangeRowsPerPage}
           rowsPerPageOptions={[5, 10, 25]}
           labelRowsPerPage="Rows per page:"
         />
         </div>
   
        
       </div>
       </div>
    </div>
  )
}

export default OrderHistory