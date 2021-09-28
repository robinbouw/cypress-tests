const user = Cypress.env('user');

describe('Product review functionality', () => {

    beforeEach(() => {
        cy.intercept('GET', '**/7**', { fixture: 'empty_review.json' }).as('testReview')
        cy.intercept('POST', '**reviews**').as('placeReview')
        cy.fixture('user').as('user')
        cy.visit('/#/product/7', {
            onBeforeLoad(win) {
                // and before the page finishes loading
                // set the user object in local storage
                win.localStorage.setItem('userInfo', JSON.stringify(user))
            },
        })
    })

    it('Should show product with 0 reviews', () => {
        cy.get('.alert').contains('No reviews yet').should('be.visible')
    })

    // it('Should show error message when user already placed a review', () => {
    //     cy.placeReview().wait('@placeReview')
    //     cy.get('.alert').contains('Product already reviewed').should('be.visible')
    // })

    it('Should successfully place a review', () => {
        cy.intercept('**reviews**', {
            statuscode: 200,
            body: 'Review added'
        }).as('successReview')
        cy.placeReview().wait('@successReview').should(req => {
            expect(req.response.body).to.eq('Review added')
        })
    })
})


