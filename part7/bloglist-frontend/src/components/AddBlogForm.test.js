import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddBlogForm from "./AddBlogForm";

describe("<AddBlogForm />", () => {
  let component;
  let handleBlogCreation;

  beforeEach(() => {
    handleBlogCreation = jest.fn();

    component = render(<AddBlogForm handleBlogCreation={handleBlogCreation} />);
  });

  test("handler called with right parameters", () => {
    const blog = {
      title: "testing",
      author: "shahar",
      url: "test.com"
    };

    const title = component.container.querySelector("#title");
    fireEvent.change(title, { target: { value: blog.title } });

    const author = component.container.querySelector("#author");
    fireEvent.change(author, { target: { value: blog.author } });

    const url = component.container.querySelector("#url");
    fireEvent.change(url, { target: { value: blog.url } });

    const form = component.container.querySelector("#form");
    fireEvent.submit(form);

    expect(handleBlogCreation.mock.calls).toHaveLength(1);

    const params = handleBlogCreation.mock.calls[0][1];
    expect(params.title).toBe(blog.title);
    expect(params.author).toBe(blog.author);
    expect(params.url).toBe(blog.url);
  });
});
