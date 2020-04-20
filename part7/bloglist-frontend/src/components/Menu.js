import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Label, Button, Menu as SemanticMenu } from "semantic-ui-react";

const Menu = ({ handleLogout }) => {
  const user = useSelector(state => state.loggedInUser);
  const [active, setActive] = useState("blogs");

  if (!user) {
    return null;
  }

  //      {`${user.username} logged in`}
  //      <button onClick={handleLogout}>logout</button>

  const handleItemClick = (e, { name }) => {
    setActive(name);
  };

  return (
    <SemanticMenu pointing secondary>
      <Link to="/blogs">
        <SemanticMenu.Item
          name="blogs"
          active={active === "blogs"}
          onClick={handleItemClick}
        />
      </Link>
      <Link to="/users">
        <SemanticMenu.Item
          name="users"
          active={active === "users"}
          onClick={handleItemClick}
        />
      </Link>

      <SemanticMenu.Item position="right">
        <Button onClick={handleLogout}>logout</Button>
      </SemanticMenu.Item>
    </SemanticMenu>
  );
};

export default Menu;
