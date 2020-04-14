import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  let handleLike;
  let handleRemove;

  beforeEach(() => {
    const blog = {
      title: "testing",
      author: "shahar",
      url: "test.com",
      likes: 3
    };

    handleLike = jest.fn();
    handleRemove = jest.fn();

    component = render(
      <Blog blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
    );
  });

  test("content does not displayed before button clicked", () => {
    const title = component.container.querySelector(".blogTitle");
    expect(title).toBeDefined();

    const content = component.container.querySelector(".blogContent");
    expect(content).toBeNull();
  });

  test("content is displayed after button clicked", () => {
    const button = component.container.querySelector(".ExpandButton");
    fireEvent.click(button);

    const title = component.container.querySelector(".blogTitle");
    expect(title).toBeDefined();

    const content = component.container.querySelector(".blogContent");
    expect(content).toBeDefined();
  });

  test("if like button clicked twice - handler called twice", () => {
    const expandButton = component.container.querySelector(".ExpandButton");
    fireEvent.click(expandButton);

    const LikeButton = component.getByText("like");
    fireEvent.click(LikeButton);
    fireEvent.click(LikeButton);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
