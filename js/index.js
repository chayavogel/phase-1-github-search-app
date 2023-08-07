const form = document.getElementById("github_form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const input = event.target.search.value
    console.log(input)
    accessInfo(input);
});

function clearResults() {
    const allUsersResults = document.getElementById("user-list");
    allUsersResults.innerHTML = "";
}

function clearRepo() {
    const repoListDelete = document.querySelector("#repos-list")
    repoListDelete.innerHTML = ""
}

function accessInfo(input) {
fetch(`https://api.github.com/search/users?q=${input}`, {
    method: "GET",
    headers: {
        Accept: "application/vnd.github.v3+json"
    }
})
.then(response => response.json())
.then(function(data) {
    clearResults()
    clearRepo()
    for (const user of data.items) {
        render(user)
    }
})
.catch(error => console.error(error));
}

function render(user) {
    const allUsersResults = document.getElementById("user-list")
    const userResult = document.createElement("li")

    const name = document.createElement("h4")
    name.innerText = user.login
    const profile = document.createElement("img")
    profile.setAttribute("src", user.avatar_url)
    profile.setAttribute("alt", `${user.login}'s profile picture`)
    const link = document.createElement("a")
    link.setAttribute("href", user.html_url);
    link.innerText = "View Account";
    link.setAttribute("target", " blank")

    userResult.append(name, profile, link)
    allUsersResults.append(userResult)
    console.log(user)

    userResult.addEventListener("click", function() {
        fetch(`https://api.github.com/users/${user.login}/repos`, {
            method: "GET",
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(function(data) {
            clearRepo()
            console.log(data)
            for (let i=0; i<data.length; i++) {
                const container = document.getElementById("repos-list")
                const repoList = document.createElement("ul")
                const repo = document.createElement("li")
                repo.innerText = data[i].name
                const link2 = document.createElement("a")
                link2.setAttribute("href", data[i].html_url);
                link2.innerText = "View Repo";
                link2.setAttribute("target", " blank")
                repoList.append(repo, link2)
                container.append(repoList)
            }
        })
        .catch(error => console.error(error));
        })
}
