import React from "react";
import styles from "./Users.module.css";
import * as axios from "axios"; //импортируй всё что есть в ахиос
import userPhoto from "../../assets/images/user.png"
//обязательно extends реакт компонент
class Users extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then(response => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(response => {
        this.props.setUsers(response.data.items)
      })
  }

  render() { // пропсы сюда не приходят прокидывание параметров проходит автоматически

    let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

    let pages = []


    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
    // pages.forEach(element => console.log(element));

    return <div>
      <div>
        {pages.map(p => {
          return <button className={this.props.currentPage === p && styles.selectedPage} onClick={(e) => { this.onPageChanged(p) }}>{p}</button>
        })}
      </div>
      {this.props.users.map((u) => (// props становится свойством этого обьекта (класса Users)
        <div key={Users.id}>
          <span>
            <div>
              <img src={u.photos.small !== null ? u.photos.small : userPhoto} alt="" className={styles.usersPhoto} />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    this.props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    this.props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{'u.location.country'}</div>
              <div>{'u.location.city'}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  }
}

export default Users