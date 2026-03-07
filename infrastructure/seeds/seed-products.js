import { faker } from '@faker-js/faker'

const BASE_URL = 'http://localhost:3030/api/products'
const COUNT = 100

function generateProduct() {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 100, max: 50000 }),
        currency: 'RUB',
    }
}

async function createProduct(product) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`Failed (${response.status}): ${text}`)
    }

    return response.json()
}

async function seed() {
    console.log(`Seeding ${COUNT} products...`)

    for (let i = 1; i <= COUNT; i++) {
        const product = generateProduct()

        try {
            const result = await createProduct(product)
            console.log(`✔ ${i + 1} - ${result.name}`)
        } catch (err) {
            console.error(`✖ Error for product ${i}:`, err.message)
        }
    }

    console.log('Done.')
}

seed()