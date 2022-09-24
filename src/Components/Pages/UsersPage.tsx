import React, { useContext } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, User } from '../../Resources/ResponseTypes';


const UsersPage = () => {
  const ctx = useContext(DataContext);
  function GetUserTotalCommits(user: User): number {
    const resp: Commit[] | Commit = ctx.commitData;
    let n: number = 0;
    for (let i = 0; i < resp.length; i++) {
      if (user.username === resp[i].author_name) {
        n += 1
      }
    }
    return n;
  }
  return (
    <div>
      <h1>Users</h1>
      <p>S
        ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
        velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
        enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
        consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
        vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
        velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
        enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
        consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
        vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>
    </div>

  )
}

export default UsersPage