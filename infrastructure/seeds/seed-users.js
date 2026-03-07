import { faker } from '@faker-js/faker'

const BASE_URL = 'http://localhost:3010/api/users'
const COUNT = 30

function generateUser(i) {
    return {
        email: faker.internet.email(),
        name: faker.person.fullName()
    }
}

async function createUser(user) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`Failed (${response.status}): ${text}`)
    }

    return response.json()
}

async function seedUsers() {
    console.log(`Seeding ${COUNT} users...`)

    const createdUsers = []

    for (let i = 1; i <= COUNT; i++) {
        const user = generateUser(i)

        try {
            const result = await createUser(user)
            createdUsers.push(result)
            console.log(`✔ ${result.id ?? result._id} - ${result.email}`)
        } catch (err) {
            console.error(`✖ Error for user ${i}:`, err.message)
        }
    }

    console.log(`Done. Created ${createdUsers.length} users.`)
}

seedUsers()