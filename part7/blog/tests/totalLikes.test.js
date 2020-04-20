const { totalLikes } = require("../utils/list_helper");

describe("totalLikes Function", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    expect(totalLikes(blogs)).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        title: "test",
        author: "test",
        url: "test",
        likes: 5
      }
    ];
    expect(totalLikes(blogs)).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        title: "test",
        author: "test",
        url: "test",
        likes: 5
      },
      {
        title: "test",
        author: "test",
        url: "test",
        likes: 2
      },
      {
        title: "banana",
        author: "test",
        url: "test",
        likes: 8
      }
    ];
    expect(totalLikes(blogs)).toBe(15);
  });
});
