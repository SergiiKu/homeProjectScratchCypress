/// <reference types="Cypress" />

describe("first run", () => {
  const tutorialPopup = ".card_card-container_3_Sbc"
  const removeButtonTutorialPopp = ".card_remove-button_1F8SI"
  const moveValLeftPanel = '[data-id="motion_movesteps"]'
  const someElementStatusMoved = ".blocklySelected"
  const buttonToAddSprite = '.action-menu_main-button_3ccfy[data-tip="Choose a Sprite"]'

  beforeEach(() => {
    cy.visit("/projects/editor/?tutorial=getStarted")
  })
  
  it('Verify possible to drag and drop "move" element from "Motion" panel', () => {
    // close pop-up with tutorial
    cy.get(removeButtonTutorialPopp).click()
    // verify tutorial pop-up closed
    cy.get(tutorialPopup).should("not.exist")
    //drag and drop "Move" element
    cy.get(moveValLeftPanel)
      .trigger("mousedown", { which: 1 })
      .trigger("mousemove", { clientX: 500, clientY: 200 })
      .trigger("mouseleave")

    // verify "move" element moved to new area and got new status
    cy.get(someElementStatusMoved).contains("move").should("exist")
  })

  it('Verify possible to delete/add "Sprite"', () => {
    cy.get(removeButtonTutorialPopp).click()

    //delete "Sprite"
    cy.get(".delete-button_delete-icon_3b8wH").click()
    // verify Sprite not exist
    cy.get(".sprite-selector_sprite-wrapper_1C5Mq").should("not.exist")
    //add new "Sprite"
    cy.get(buttonToAddSprite).click()
    //wait for "Chose a Sprite" page
    cy.get(".modal_header-item_2zQTd").should("exist")
    // type at search "Crab"
    cy.get(".filter_filter-input_1iiEt").type("Crab")
    //select it from list
    cy.get(".library-item_library-item-name_2qMXu").contains("Crab").click()
    //Veridy new "Sprite" was added
    cy.get(".sprite-selector-item_sprite-name_1PXjh")
      .contains("Crab")
      .should("exist")
  })
  it("Verify pop-up with message when leave editor page(after making some changes)", () => {
    cy.get(removeButtonTutorialPopp).click()
    //rename
    cy.get(".sprite-info_sprite-input_17wjb").type("NewName")
    // click to any element to save changes
    cy.get(moveValLeftPanel).click()
    //verify new name
    cy.get(".sprite-selector-item_sprite-name_1PXjh").contains("Sprite1NewName")
  })
})
