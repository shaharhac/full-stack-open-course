import React, { useEffect } from "react";
import UserRow from "./UserRow";
import { useSelector, useDispatch } from "react-redux";
import { initUsers } from "../reducers/usersReducer";
import { Table } from "semantic-ui-react";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  const usersToDisplay = users
    .map(user => {
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        blogsCreated: user.blogs.length
      };
    })
    .sort((userA, userB) => (userA.blogsCreated > userB.blogsCreated ? -1 : 1));

  return (
    <Table basic="very" celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nane</Table.HeaderCell>
          <Table.HeaderCell>Blogs Created</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {usersToDisplay.map(user => (
          <UserRow user={user} />
        ))}
      </Table.Body>
    </Table>
  );
};

export default UserList;
