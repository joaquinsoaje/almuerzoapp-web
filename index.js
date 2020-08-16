const stringToHtml = (s) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(s, 'text/html')
    return doc.body.firstChild
}

const renderItem = (item) => {
    const element = stringToHtml(`<li data-id="${item._id}"> ${item.name} </li>`)
    element.addEventListener('click', () => {
        addSelectedClass(element)
        const mealIdInput = document.getElementById('meal-id')
        mealIdInput.value = item._id;
    })
    return element
}

const addSelectedClass = (element) => {
    const mealsList = document.getElementById('meals-list')
    Array.from(mealsList.children).forEach(x => x.classList.remove('selected'))
    element.classList.add('selected')
}

window.onload = () => {
    const formOrder = document.getElementById('formOrder')
    formOrder.onsubmit = (e) => {
        e.preventDefault()
        const mealId = document.getElementById('meal-id')
        const mealIdValue = mealId.value
        if (!mealIdValue) {
            alert('No ha seleccionado un plato')
            return
        }

        const order = {
            meal_id: mealIdValue,
            user_id: 'LuegoSeraImplementado'
        }
    }
    fetch('https://serverless.joaquinsoaje.vercel.app/api/meals/')
        .then(response => response.json())
        .then(data => {
            const mealsList = document.getElementById('meals-list')
            const listItems = data.map(renderItem)
            document.getElementById('cargando').remove()
            listItems.forEach(element => {
                mealsList.appendChild(element)
            });
            const submit = document.getElementById('submit')
            submit.removeAttribute('disabled')            
        })
}