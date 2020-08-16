window.onload = () => {
    fetch('https://serverless.joaquinsoaje.vercel.app/api/meals/')
        .then(response => response.json())
        .then(data => {
            const mealsList = document.getElementById('meals-list')
            const template = data.map(x => '<li>' + x.name + '</li>').join('')
            const submit = document.getElementById('submit')

            mealsList.innerHTML = template
            submit.removeAttribute('disabled')            
        })
}