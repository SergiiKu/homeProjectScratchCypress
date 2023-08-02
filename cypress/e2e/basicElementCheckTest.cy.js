/// <reference types="Cypress" />

describe("Disabled Test Isolation", { testIsolation: false }, () => {
  const tabNameSelector = ".react-tabs_react-tabs__tab_3Nn-X"
  const statusSelected = '[aria-selected="true"]'
  const ariaSelected = "aria-selected"
  const codeTabName = "Code"
  const costumesTabName = "Costumes"
  const soundsTabName = "Sounds"
  const tutorialCard = ".card_card-container_3_Sbc"
  const scratchCategoryMenuRow = ".scratchCategoryMenuRow"
  const scratchCategoryIdMotion = ".scratchCategoryId-motion"

  before(() => {
    cy.visit("/projects/editor/?tutorial=getStarted")
  })
  it('Verify "Code" tab selected by dafault', () => {
    cy.get(tabNameSelector)
      .should("have.attr", ariaSelected, "true")
      .contains(codeTabName)
  })
  it("Verify 3 tabs available", () => {
    cy.get(tabNameSelector).should("have.length", 3)
  })
  it('Verify only one tab "selected" ', () => {
    cy.get(tabNameSelector + statusSelected).should("have.length", 1)
  })
  it('Verify "Motion" selected by default at scratch category(left panel)', () => {
    cy.get(scratchCategoryMenuRow + " " + scratchCategoryIdMotion).should("have.class","categorySelected")
  })
  it('Verify the backgroud color for "Motion" at scratch category(left panel)', () => {
    cy.get(scratchCategoryMenuRow + " " + scratchCategoryIdMotion)
      .children(".scratchCategoryItemBubble")
      .should("have.css", "background-color")
      .and("eq", "rgb(76, 151, 255)")
  })
  it('Verify possible to select new tab "Costumes"', () => {
    cy.get(tabNameSelector).contains(costumesTabName).click()
    // verify tab "Costumes" selected
    cy.get(tabNameSelector)
      .eq(1)
      .should("have.attr", ariaSelected, "true")
      .contains(costumesTabName)
    // verify paint aria available for Costumes tab react-tabs_react-tabs__tab-panel_3p4DW
    cy.get(".paint-editor_editor-container_1WLch")
  })
  it('Verify possible to select new tab "Sounds"', () => {
    cy.get(tabNameSelector).contains(soundsTabName).click()
    // verify tab "Sounds" selected
    cy.get(tabNameSelector)
      .eq(2)
      .should("have.attr", ariaSelected, "true")
      .contains(soundsTabName)
    // verify paint aria available for Sounds tab
    cy.get(".sound-editor_editor-container_iUSW-")
  })

  it("Verify tutorial window available at the page", () => {
    cy.get(tutorialCard).should("exist")
  })

  // verify elements at the header
  it("Verify main logo available at the header", () => {
    cy.get(".menu-bar_scratch-logo_2uReV").should("have.attr", "alt", "Scratch")
  })
  it('Verify "Settings" available at the header', () => {
    cy.get(".settings-menu_dropdown-label_3f68c").contains("Settings")
  })
  it('Verify "File" available at the header', () => {
    cy.get(".menu-bar_collapsible-label_o2tym").contains("File")
  })
  it('Verify "Edit" available at the header', () => {
    cy.get(".menu-bar_collapsible-label_o2tym").contains("Edit")
  })
  it('Verify "Tutorials" available at the header', () => {
    cy.get(".menu-bar_tutorials-label_2tFBo").contains("Tutorials")
  })
})
