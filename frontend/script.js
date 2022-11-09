console.log("script.js loaded")

// Put HTML elements into variables
let searchUserInput = document.getElementById("searchUserInput")
let loadingMessageP = document.getElementById("loadingMessage")
let usersGridContainer = document.getElementById("usersGridContainer")


// Get json data onload
let getUsersDatabase = async () => {
    loadingMessageP.innerText = "Loading..."
    const usersData = await (await fetch("https://api.github.com/users")).json()
    await generateUsersGrid(usersData)
    loadingMessageP.innerText = ""
} // * WORKS


// Generating users grid
const generateUsersGrid = (usersArr) => {
    for (const user of usersArr) {
        let userCard = generateCard(user)
        usersGridContainer.appendChild(userCard)
    }
} // * WORKS


// Generating User Card
const generateCard = (userObj) => {
    let userCard = document.createElement("div")
    userCard.setAttribute("id", `card${userObj.id}`)
    userCard.setAttribute("class", "userCard")

    let userImg = document.createElement("img")
    userImg.setAttribute("src", userObj.avatar_url)
    userImg.setAttribute("alt", `${userObj.login}'s profile picture`)
    userCard.appendChild(userImg)

    let userNameP = document.createElement("p")
    userNameP.setAttribute("class", "userName")
    userNameP.innerHTML = userObj.login
    userCard.appendChild(userNameP)

    let infoButton = document.createElement("button")
    infoButton.setAttribute("class", "infoButton")
    infoButton.innerText = "Show more"
    infoButton.addEventListener("click", moreInfoFunction)
    userCard.appendChild(infoButton)

    let userType = document.createElement("p")
    userType.setAttribute("class", "userType")
    userType.innerText = `Rank: ${userObj.type}`
    userCard.appendChild(userType)

    let userAdmin = document.createElement("p")
    userAdmin.setAttribute("class", "userAdmin")
    userAdmin.innerText = `Admin: ${userObj.site_admin}`
    userCard.appendChild(userAdmin)

    return userCard
} // * WORKS

getUsersDatabase()


// Show more function
const moreInfoFunction = (event) => {
    const parentElement = event.target.parentElement
    const infoButton = document.querySelector(`#${parentElement.id} .infoButton`)
    const userTypeP = document.querySelector(`#${parentElement.id} .userType`)
    const userAdmin = document.querySelector(`#${parentElement.id} .userAdmin`)
    if (event.target.innerText === "Show more") {
        userTypeP.style.display = "block"
        userAdmin.style.display = "block"
        infoButton.innerText = "Show less"
    }
    else {
        userTypeP.style.display = "none"
        userAdmin.style.display = "none"
        infoButton.innerText = "Show more"
    }
} // *WORKS

// Search input
const userFilterFunction = (event) => {
    console.log(searchUserInput)
    console.log(event.target.value)
}

// Register Event Listeners
searchUserInput.addEventListener("change", userFilterFunction)