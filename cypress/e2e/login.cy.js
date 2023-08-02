/// <reference types="Cypress" />

describe("Login tests", () => {
  const removeButtonTutorialPopp = ".card_remove-button_1F8SI"
  const menuBarElement = ".menu-bar_hoverable_c6WFB"
  const userNameSelector = '[name="username"]'
  const passwordSelector = '[name="password"]'
  const userNameVal = "testUser13332"
  const passwordValue = "Lifeis1234"
  const signInAtMainPage = ".login-item"
  const signInAtUsernamForm = ".submit-button"
  const profileNameSelectorMainPage = ".profile-name"
  const profileNameSelectorEditorPage = ".account-nav_profile-name_2oRiV"
  const errorMessage = ".error" //selector for workaround

  before(() => {
    cy.visit("/")
    
  })

  it("Verify possible to Sign in as existing user to the app from main page", () => {
    //click at Sign In button-
    //selector taken from list because class are the same but button name different due the region of user
    // could be fixed when multi language will be supported
    cy.get(signInAtMainPage).click()

    //fill mandatory fields
    cy.get(userNameSelector).type(userNameVal)
    cy.get(passwordSelector).type(passwordValue)

    //confirm
    cy.get(signInAtUsernamForm).click()

    // time to time I catched issue with login, and as I understand Cypress fill the form too fast
    // So I add a workaround

    const errorSelectorAvailable = cy.get(errorMessage)
    if (errorSelectorAvailable) {
      console.log(
        "Error icon due Login process exist. Application click 'Sign in' button in 2 sec "
      )
      cy.wait(2000)
      cy.get(signInAtUsernamForm).click()
    }
    cy.get(profileNameSelectorMainPage).should("contain", userNameVal)
  })

  it("Verify possible to Sign in as existing user to the app from editor page", () => {
    cy.visit("/projects/editor/?tutorial=getStarted")

    cy.get(removeButtonTutorialPopp).click()

    //click at Sign In button-
    //selector taken from list because class are the same but button name different due the region of user
    // could be fixed when multi language will be supported
    cy.get(menuBarElement).eq(5).click()

    //fill mandatory fields
    cy.get(userNameSelector).type(userNameVal)
    cy.get(passwordSelector).type(passwordValue)

    cy.get(signInAtUsernamForm).click()

    // time to time I catched issue with login, and as I understand Cypress fill the form too fast
    // So I add a workaround
    const errorSelectorAvailable = cy.get(errorMessage)
    if (errorSelectorAvailable) {
      console.log(
        "Error icon due Login process exist. Application click 'Sign in' button in 2 sec "
      )
      cy.wait(2000)
      cy.get(signInAtUsernamForm).click()
    }

    cy.get(profileNameSelectorEditorPage).should("contain", userNameVal)
  })
})
