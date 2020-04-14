describe("Blogs app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "shahar",
      username: "test",
      password: "12345"
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function() {
    cy.contains("Blogs");
  });

  it("Login form is shown", function() {
    cy.contains("login").click();
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.contains("login").click();

      cy.get("#username").type("test");
      cy.get("#password").type("12345");
      cy.contains("Submit").click();

      cy.contains("Hello test!");
    });

    it("fails with wrong credentials", function() {
      cy.contains("login").click();

      cy.get("#username").type("test");
      cy.get("#password").type("invalid");
      cy.contains("Submit").click();

      cy.contains("invalid username or password");
      cy.get("html").should("not.contain", "hello test");
    });
  });

  describe("When logged in", function() {
    beforeEach(function() {
      const user = {
        username: "test",
        password: "12345"
      };
      cy.login(user);
    });

    it("A blog can be created", function() {
      cy.contains("Create Blog").click();
      cy.get("#title").type("this is a test blog");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.contains("submit").click();
      cy.contains("this is a test blog");
    });

    describe("and a blog exists", function() {
      beforeEach(function() {
        const blog = {
          title: "shahar",
          author: "test author",
          url: "shahar.com"
        };
        cy.createBlog(blog);
      });

      it("Blog can be expanded", function() {
        cy.get(".ExpandButton").click();
        cy.contains("shahar.com");
      });

      it("Blog can be liked", function() {
        cy.get(".ExpandButton").click();
        cy.get(".likesAmmount").as("likes");
        cy.get("@likes").contains("0");

        cy.get(".likeButton").click();
        cy.get("@likes").contains("1");
      });

      it("Blog can be deleted", function() {
        cy.get(".ExpandButton").click();
        cy.get(".removeButton").click();
        cy.get("html").should("not.contain", "shahar");
      });
    });

    describe("and a list of blogs exists", function() {
      let initialBlogs = [];
      beforeEach(function() {
        initialBlogs = [
          {
            title: "third",
            author: "test author",
            url: "shahar.com",
            likes: 1
          },
          {
            title: "first",
            author: "test author",
            url: "shahar.com",
            likes: 3
          },
          {
            title: "second",
            author: "test author",
            url: "shahar.com",
            likes: 2
          }
        ];

        initialBlogs.map(blog => cy.createBlog(blog));
      });

      it("Blogs ordered by likes", function() {
        const expected = ["first", "second", "third"];
        cy.get(".blogTitle").then($titles => {
          const titles = $titles
            .toArray()
            .map(title => title.innerText.split(" ")[0]);

          expect(titles).to.deep.eq(expected);
        });
      });
    });
  });
});

Cypress.Commands.add("login", user => {
  cy.request("POST", "http://localhost:3003/api/login", user).then(response => {
    localStorage.setItem("userConnected", JSON.stringify(response.body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createBlog", blog => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: blog,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("userConnected")).token
      }`
    }
  });

  cy.visit("http://localhost:3000");
});
