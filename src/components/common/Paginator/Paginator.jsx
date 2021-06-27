import React from "react";
import styles from "../../Users/Users.module.css";

const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return <div>
    {pages.map(p => {
      return <button className={currentPage === p && styles.selectedPage} onClick={(e) => { onPageChanged(p) }}>{p}</button>
    })}
  </div>
}

export default Paginator