function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => {
    const dataUsername = 'data-username="' + r.owner.login + '"'
    const dataRepoName = 'data-repository="' + r.name + '"'
    return (`
      <li> 
      <h2>${r.name}</h2>
      <a href="${r.html_url}">${r.html_url}</a>
      <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a>
       <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
      </li>`
       )}).join('') + "</ul>";
        
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories(){
  const req = new XMLHttpRequest()
  let username = document.getElementById('username').value
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}
