import React from "react";
import { Link } from "react-router-dom";
import { Header, Image, Table } from "semantic-ui-react";

const UserRow = ({ user }) => (
  <Table.Row>
    <Table.Cell>
      <Header as="h4">
        <Header.Content>
          <Link to={`/users/${user.id}`}>
            {user.name}
            <Header.Subheader>{user.username}</Header.Subheader>
          </Link>
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>{user.blogsCreated}</Table.Cell>
  </Table.Row>
);

export default UserRow;
