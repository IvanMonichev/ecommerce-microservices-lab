import { faker } from '@faker-js/faker'

const USERS_URL = 'http://localhost:3010/api/users?limit=100'
const ORDERS_URL = 'http://localhost:3020/api/orders'
const PRODUCTS_URL = 'http://localhost:3030/api/products?limit=100'

const COUNT = 50

async function fetchJson(url) {
    const response = await fetch(url)

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`GET ${url} failed (${response.status}): ${text}`)
    }

    return response.json()
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function pickRandomItems(products) {
    const itemsCount = faker.number.int({ min: 1, max: 5 })
    const usedIds = new Set()
    const items = []

    while (items.length < itemsCount && usedIds.size < products.length) {
        const product = pickRandom(products)
        const productId = product.id ?? product._id ?? product.product_id

        if (!productId || usedIds.has(productId)) {
            continue
        }

        usedIds.add(productId)

        items.push({
            productId: String(productId),
            quantity: faker.number.int({ min: 1, max: 3 })
        })
    }

    return items
}

function generateOrder(users, products) {
    const user = pickRandom(users)
    const userId = user.id ?? user._id

    if (!userId) {
        throw new Error('User has no id/_id')
    }

    return {
        userId: String(userId),
        currency: 'RUB',
        items: pickRandomItems(products)
    }
}

async function createOrder(order) {
    const response = await fetch(ORDERS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`Failed (${response.status}): ${text}`)
    }

    return response.json()
}

async function seedOrders() {
    console.log('Loading users and products...')

    const users = await fetchJson(USERS_URL)
    const productsResponse = await fetchJson(PRODUCTS_URL)

    const products = Array.isArray(productsResponse)
        ? productsResponse
        : productsResponse.data ?? productsResponse.items ?? []

    if (!Array.isArray(users) || users.length === 0) {
        throw new Error('Users list is empty')
    }

    if (!Array.isArray(products) || products.length === 0) {
        throw new Error('Products list is empty')
    }

    console.log(`Loaded ${users.length} users`)
    console.log(`Loaded ${products.length} products`)
    console.log(`Seeding ${COUNT} orders...`)

    for (let i = 1; i <= COUNT; i++) {
        try {
            const order = generateOrder(users, products)
            const result = await createOrder(order)

            console.log(
                `✔ Order ${i}: ${result.id ?? result._id ?? 'created'} for user ${order.userId}`
            )
        } catch (err) {
            console.error(`✖ Error for order ${i}:`, err.message)
        }
    }

    console.log('Done.')
}

seedOrders().catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
})