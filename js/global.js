const showCase = document.querySelector('#show_case')
const cep = document.querySelector("#cep")
const invoiceContainer = document.querySelector(".invoice_container")
const invoiceProducts = document.querySelector("#invoice_products")
const totalPriceLabel = document.querySelector('#total_price')
const regionLabel = document.querySelector("#region_label")

const products = [
    {
        id: 1,
        name: 'Combo Super Burguer I',
        description: 'Hambúrguer de Carne Bovina, Queijo Cheddar, Onion Rings e Salada',
        price: 9.90,
        image: 'img/img1.png'
    },
    {
        id: 2,
        name: 'Combo Super Burguer II',
        description: 'Hambúrguer de Carne Bovina, Queijo Cheddar, Onion Rings e Salada',
        price: 19.90,
        image: 'img/img2.png'
    },
    {
        id: 3,
        name: 'Combo Super Burguer III',
        description: 'Hambúrguer de Carne Bovina, Queijo Cheddar, Onion Rings e Salada',
        price: 29.90,
        image: 'img/img3.png'
    },
    {
        id: 4,
        name: 'Combo Super Burguer IV',
        description: 'Hambúrguer de Carne Bovina, Queijo Cheddar, Onion Rings e Salada',
        price: 39.90,
        image: 'img/img4.png'
    },
    {
        id: 5,
        name: 'Combo Super Burguer V',
        description: 'Hambúrguer de Carne Bovina, Queijo Cheddar, Onion Rings e Salada',
        price: 49.90,
        image: 'img/img5.png'
    },
]

const cepShippingTable = [
    {
        price: 15,
        region: "Grande São Paulo"
    },
    {
        price: 18,
        region: "Interior de São Paulo"
    },
    {
        price: 20,
        region: "Rio de Janeiro e Espírito Santo"
    },
    {
        price: 13,
        region: "Minas Gerais"
    },
    {
        price: 5,
        region: "Bahia e Sergipe"
    },
    {
        price: 12,
        region: "Pernambuco, Alagoas, Paraíba e Rio Grande do Norte"
    },
    {
        price: 19,
        region: "Ceará, Piauí, Maranhão, Pará, Amazonas, Acre, Amapá e Roraima"
    },
    {
        price: 14,
        region: "Distrito Federal, Goiás, Tocantins, Mato Grosso, Mato Grosso do Sul e Rondônia"
    },
    {
        price: 22,
        region: "Paraná e Santa Catarina"
    },
    {
        price: 25,
        region: "Rio Grande do Sul"
    },
]

const selectedProducts = []

const plus_list = document.querySelectorAll(".plus")
plus_list.forEach(element => {
    element.addEventListener("click", () => {
        let selectedItemIndex = parseInt(element.nextElementSibling.dataset.id)
        let elementIndex = selectedProducts.indexOf(selectedProducts.find(element => element.id === selectedItemIndex + 1))
        element.nextElementSibling.value++

        if(elementIndex == -1) {
            selectedProducts.push({ ...products[selectedItemIndex], amount: 1 })
        } else {
            selectedProducts[elementIndex].amount++
        }

        showTotalPrice()
    })
});

const minus_list = document.querySelectorAll(".minus")
minus_list.forEach(element => {
    element.addEventListener("click", () => {
        let selectedItemIndex = parseInt(element.previousElementSibling.dataset.id)
        let elementIndex = selectedProducts.indexOf(selectedProducts.find(element => element.id === selectedItemIndex + 1))
        
        if(elementIndex > -1) {
            element.previousElementSibling.value--

            if(selectedProducts[elementIndex].amount === 1) {
                selectedProducts.splice(elementIndex, 1)
            } else {
                selectedProducts[elementIndex].amount--
            }
        }

        showTotalPrice()
    })
});

cep.addEventListener('keyup', (event) => {
    showTotalPrice()
})

cep.addEventListener('blur', (event) => {
    showTotalPrice()
})

function showTotalPrice() {
    let cepInicialDigit = null
    let totalPrice = 0
    let invoiceProductAccumulator = ""
    let shipping = 0
    let selectedRegion = null

    if(cep.value != "" || parseInt(cep.value.charAt(0)) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        cepInicialDigit = parseInt(cep.value.charAt(0))
        selectedRegion = cepShippingTable[cepInicialDigit]
        shipping = selectedRegion.price
        regionLabel.innerHTML = `Obs.: Para a região <strong>${selectedRegion.region}</strong> o valor do frete é: ${formatPriceToBR(selectedRegion.price)}`
    }

    selectedProducts.forEach(element => {
        invoiceProductAccumulator += `
            <tr>
                <td>${element.name}</td>
                <td>${element.amount}</td>
                <td>${formatPriceToBR(element.price)}</td>
                <td>${formatPriceToBR(element.price * element.amount)}</td>
            </tr>
        `

        totalPrice += element.price * element.amount
    })

    invoiceProducts.innerHTML = invoiceProductAccumulator
    totalPriceLabel.innerText = formatPriceToBR(totalPrice + shipping)

    if(selectedProducts.length > 0) {
        invoiceContainer.classList.remove("hide")
    } else {
        invoiceContainer.classList.add("hide")
    }
}

function formatPriceToBR(value) {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

