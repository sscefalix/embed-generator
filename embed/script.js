const embed = document.getElementById("embed")
const embedFields = {}
const code = {}
const controllers = document.querySelectorAll(".controller")
const showCodeBtn = document.getElementById("showCode")
const color = document.getElementById("color")
const modal = document.getElementById("jsonResponse")
const jsonCode = document.getElementById("jsonCode")

embed.querySelectorAll("div").forEach((element) => embedFields[element.className] = element)

controllers.forEach((controller) => {
    const input = controller.querySelector(".input")
    if (input.getAttribute("type") === "color") return
    const currentField = embedFields[input.id]

    input.oninput = (event) => {
        currentField.innerText = input.value

        if(currentField.innerText.length > 0) {
            currentField.style.display = "block"
            code[input.id] = input.value
        } else {
            delete code[input.id]
            currentField.style.display = "none"
        }

        if(input.value.length > input.getAttribute("maxlength")) input.value = input.value.slice(0, -1)
        controller.setAttribute("data-length", input.value.length + '/' + input.getAttribute("maxlength"))
    }
})

color.oninput = (event) => {
    code["color"] = color.value
    embed.style.borderColor = color.value
}

showCodeBtn.onclick = (event) => {
    event.preventDefault()

    jsonCode.innerHTML = JSON.stringify(code, null, 4)

    modal.showModal()
}
