beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

describe('Section 1: Functional tests', () => {

    it('All fields are filled in and corresponding assertions', () => {

        cy.get('#name').type('Mari')
        inputMandatoryValidData()

        cy.contains('label', 'Date of registration').siblings('input[type="date"]').type('2024-07-18')

        cy.get('input[type="radio"]').eq(0).click()

        cy.get('#birthday[type="date"]').type('1996-09-17')

        cy.get('input#myFile').selectFile('cypress/fixtures/Picture.jpg')

        clickSubmitButton()
        cy.get('h1').contains('Submission received')

    })


    it('User can submit form with valid data and only mandatory fields added', () => {

        inputMandatoryValidData()

        clickSubmitButton()
        cy.get('h1').contains('Submission received')

    })


    it('User cannot submit form when mandatory field email is not added', () => {

        inputMandatoryValidData()
        cy.get('[name="email"]').scrollIntoView()
        cy.get('[name="email"]').clear()
        cy.get('input[type="submit"]').should('not.be.enabled');

        cy.get('[ng-show="myForm.email.$error.required"]').should('be.visible')

    })


    it('User cannot submit form when mandatory field city is not added', () => {

        inputMandatoryValidData()
        cy.get('#city').scrollIntoView()
        cy.get('#city').select('')
        cy.get('input[type="submit"]').should('not.be.enabled');

    })




    describe('Section 2: Visual tests', () => {
        it('Check that Cerebrum Hub logo is correct and has correct size', () => {
            cy.log('Will check Cerebrum Hub logo source and size')
            cy.get('img[data-testid="picture"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
            cy.get('img[data-testid="picture"]').invoke('height').should('be.lessThan', 170)
                .and('be.greaterThan', 160)
        })

        it('Check that radio button list is correct', () => {

            cy.get('input[type="radio"]').should('have.length', 4)

            cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily')
            cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly')
            cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly')
            cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never')

            cy.get('input[type="radio"]').eq(0).should('not.be.checked')
            cy.get('input[type="radio"]').eq(1).should('not.be.checked')
            cy.get('input[type="radio"]').eq(2).should('not.be.checked')
            cy.get('input[type="radio"]').eq(3).should('not.be.checked')

            cy.get('input[type="radio"]').eq(0).check().should('be.checked')
            cy.get('input[type="radio"]').eq(1).check().should('be.checked')
            cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        })

        it('Country dropdown is correct', () => {

            cy.get('select#country').children().should('have.length', 4)

            cy.get('select#country').find('option').eq(0).should('have.text', '')
            cy.get('select#country').find('option').eq(1).should('have.text', 'Spain')
            cy.get('select#country').find('option').eq(2).should('have.text', 'Estonia')
            cy.get('select#country').find('option').eq(3).should('have.text', 'Austria')
        })


        it('Spain cities dropdown is correct', () => {

            cy.get('select#country').select('object:3')

            cy.get('#city').children().should('have.length', 5)

            cy.get('#city').find('option').eq(0).should('have.text', '')
            cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
            cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
            cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
            cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

        })


        it('Estonia cities dropdown is correct', () => {

            cy.get('select#country').select('object:4')

            cy.get('#city').children().should('have.length', 4)

            cy.get('#city').find('option').eq(0).should('have.text', '')
            cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
            cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
            cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        })

        it('Austria cities dropdown is correct', () => {

            cy.get('select#country').select('object:5')

            cy.get('#city').children().should('have.length', 4)

            cy.get('#city').find('option').eq(0).should('have.text', '')
            cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
            cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
            cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')

        })

        it('If country is updated, then city choice should be removed', () => {

            cy.get('select#country').select('object:5')
            cy.get('#city').select('string:Salzburg')

            cy.get('select#country').select('object:3')
            cy.get('#city').should('not.have.value', 'string:Salzburg')

        })

        it('Check checkboxes correct behaviour', () => {

            cy.get('input[type="checkbox"][ng-model="checkbox"]').click()
            cy.get('input[type="checkbox"][ng-model="checkbox"]').should('be.checked')

            cy.get('input[type="checkbox"][ng-model="checkbox"]').click()
            cy.get('input[type="checkbox"][ng-model="checkbox"]').should('not.be.checked')

            cy.get('input[type="checkbox"]').eq(1).click()
            cy.get('input[type="checkbox"]').eq(1).should('be.checked')

            cy.get('input[type="checkbox"]').eq(1).click()
            cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')

        })


        it('Check navigation part and link', () => {

            cy.get('button').contains('Accept our cookie policy').should('be.visible')
                .and('have.attr', 'href', 'cookiePolicy.html')
                .click()

            cy.get('#successMessage').should('be.visible').and('have.text', 'This is a demo page, no cookie policies are used for demo')

            cy.go('back')
            cy.log('Back again on registration form 3')

        })


        it('Incorrect email format', () => {

            inputMandatoryValidData()

            cy.get('[name="email"]').scrollIntoView()
            cy.get('[name="email"]').clear()

            cy.get('[name="email"]').type('mari')
            cy.get('input[type="submit"]').should('not.be.enabled');

            cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible').and('have.text', 'Invalid email address.')
        })


    })


    function inputMandatoryValidData() {
        cy.log('All mandatory fileds will be filled')
        cy.get('[name="email"]').type('mari@gmail.com')
        cy.get('select#country').select('object:4')
        cy.get('#city').select('string:Haapsalu')

        cy.get('input[type="checkbox"][ng-model="checkbox"]').click()

    }

    function clickSubmitButton() {

        cy.get('input[type="submit"]').should('be.enabled');
        cy.get('input[type="submit"]').click()

    }


})