import React from 'react';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './serviceButtons.scss';

function ServiceButtons({ editClickHandler, deleteClickHandler, color, id }) {
   return (
      <div className='buttonsWrapp'
         style={{ color: `${color}` }}>
         <div className='serviceButton' onClick={(e) => {
            editClickHandler(id)
         }}>
            <MdEdit />
         </div>
         <div className='serviceButton mx-2' onClick={(e) => {
            deleteClickHandler(id)
         }}>
            <RiDeleteBin6Line />
         </div>
      </div>
   )
}

export default ServiceButtons