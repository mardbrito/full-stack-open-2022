describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Marcelo Brito",
      username: "mardbrito",
      password: "binarios",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Blogs");
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mardbrito");
      cy.get("#password").type("binarios");
      cy.get("#login-btn").click();
      cy.contains("Marcelo Brito logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("marcelo");
      cy.get("#password").type("wrong");
      cy.get("#login-btn").click();
      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Marcelo Brito logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("mardbrito");
      cy.get("#password").type("binarios");
      cy.get("#login-btn").click();
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("A blog created by cypress");
      cy.get("#author").type("Cypress");
      cy.get("#url").type("http://test.com");
      cy.get("#create-blog-btn").click();
    });

    describe("and several blogs exist", function () {
      it("user can like a blog twice", function () {
        cy.contains("new blog").click();
        cy.get("#title").type("second blog");
        cy.get("#author").type("Cypress second");
        cy.get("#url").type("http://test.com.org");
        cy.get("#create-blog-btn").click();

        cy.contains("new blog").click();
        cy.get("#title").type("last blog");
        cy.get("#author").type("Cypress last");
        cy.get("#url").type("http://last.test.com.org");
        cy.get("#create-blog-btn").click();

        cy.contains("last blog");
        cy.get("#view-btn").click();
        cy.get("#like-btn").click();
        cy.get("#like-btn").click();

        cy.request("GET", "http://localhost:3003/api/blogs").then(
          (response) => {
            const data = response.body;
            expect(data[0].likes).to.equal(1);
          }
        );
      });

      // it("one of those can be deleted", function () {
      //   cy.contains("second blog").parent().find("button").click();
      //   cy.get("#delete-btn").click();
      //   cy.get("html").should("not.contain", "second blog");
      // });

      it("they are ordered by the number of likes in descending order", async function () {
        cy.contains("last blog").parent().find("button").click();
        cy.get("#like-btn").click().wait(500).click().wait(500);
        cy.contains("last blog").parent().find("button").click();

        cy.contains("second blog").parent().find("button").click();
        cy.get("#like-btn")
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500);

        cy.get(".blog").eq(0).should("contain", "second blog");
        cy.get(".blog").eq(1).should("contain", "last blog");
        cy.get(".blog").eq(2).should("contain", "A blog created by cypress");
      });
    });
  });
});
