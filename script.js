const questionsList = document.getElementById("questions_list")
document.getElementById("submit_button").addEventListener('click', (event) => {
    const response = []
    questionsList.children.forEach(q => {
        response.push({
            question: q.querySelector("p"),
            answer: q.querySelector("select").value
        })
    })
})

const questions = fetch("localhost:3000", {
    method: "GET"
}).then(res => {
    console.log("res", res)
    Object.keys(res).forEach(q => {
        const innerHTML = `
            <li id=${res[q].id}>
                <p>${res[q].question}</p>
                <select>
                    ${
                        res[q].answers.map(a => `<option>${a}</option>`).join('')
                    }
                <select>
            <li>
        `
    })
})
