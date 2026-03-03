import { faker } from '@faker-js/faker'

const BASE_URL = 'http://localhost:3030/api/products'
const COUNT = 100

function generateProduct(i) {
    return {
        product_id: String(i),
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 100, max: 5000 }),
        currency: 'RUB',
        stock: faker.number.int({ min: 0, max: 1000 })
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
        const product = generateProduct(i)

        try {
            const result = await createProduct(product)
            console.log(`✔ ${result.product_id} - ${result.name}`)
        } catch (err) {
            console.error(`✖ Error for product ${i}:`, err.message)
        }
    }

    console.log('Done.')
}

seed()