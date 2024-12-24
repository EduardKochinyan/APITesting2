import { faker } from '@faker-js/faker';
describe('API Testing automation on Gorest', () => {
    let token
    let userId

    const newUser = {
        name: faker.person.firstName(),
        gender: 'male',
        email: faker.internet.email(),
        status: 'active',
    }
    const updatedUser = {
        name: faker.person.firstName(),
        gender: 'female',
        email: faker.internet.email(),
        status: 'active',
    }
    const Token = {
        Authorization: `Bearer ${token}`,
    }
    before(()=>{
        token = Cypress.env('token')
    })

    it('Create a User', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: newUser
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
            expect(response.body.name).to.eq(newUser.name)
            expect(response.body.email).to.eq(newUser.email)
            expect(response.body.gender).to.eq("male")
            expect(response.body.status).to.eq('active')
            userId = response.body.id
        })
    });
    it('Assert the new user', () => {
        cy.request({
            method: "GET",
            url:`https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(userId)
            expect(response.body).to. include(newUser)
        })
    })
    it('Change User Information', () => {
        cy.request({
            method:"PATCH",
            url:`https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: updatedUser,
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(userId)
            expect(response.body.name).to.eq(updatedUser.name)
            expect(response.body.email).to.eq(updatedUser.email)
            expect(response.body.gender).to.eq(updatedUser.gender)
            expect(response.body.status).to.eq(updatedUser.status)
        })
    })
    it('Assert the updated user', () => {
        cy.request({
            method: "GET",
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(userId)
            expect(response.body).to.include(updatedUser)
        })
    })
    it('Delete the User', () => {
        cy.request({
            method:"DELETE",
            url:`https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            expect(response.status).to.eq(204)
        })
        cy.request({
            method:"GET",
            url:`https://gorest.co.in/public/v2/users/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    })
})