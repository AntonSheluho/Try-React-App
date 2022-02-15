import React from 'react'
import { getPageArray } from '../../../utils/pages'

export default function Pagination({totalPages, page, changePage}) {

    let pagesArray = getPageArray(totalPages)

  return (
    <div className='page__wrapper'>
            {pagesArray.map(but => 
                <span 
                  onClick={() => changePage(but)}
                  className={page === but ? ' page page__current' : 'page'} 
                  key={but}
                >
                    {but}
                </span>
            )}
          </div>
  )
}
