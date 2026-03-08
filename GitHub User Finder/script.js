const GITHUB_API = "https://api.github.com/users/";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const userProfile = document.getElementById("userProfile");
const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const userLogin = document.getElementById("userLogin");
const userBio = document.getElementById("userBio");
const joinDate = document.getElementById("joinDate");
const profileLink = document.getElementById("profileLink");
const followersCount = document.getElementById("followersCount");
const followingCount = document.getElementById("followingCount");
const reposCount = document.getElementById("reposCount");
const gistsInfo = document.getElementById("gistsInfo");
const gistsCount = document.getElementById("gistsCount");
const locationInfo = document.getElementById("locationInfo");
const locationText = document.getElementById("locationText");
const companyInfo = document.getElementById("companyInfo");
const companyText = document.getElementById("companyText");
const blogInfo = document.getElementById("blogInfo");
const blogLink = document.getElementById("blogLink");
const repositoriesList = document.getElementById("repositoriesList");
const languageColors = {
  "JavaScript": "#f1e05a",
  "Python": "#3572A5",
  "Java": "#b07219",
  "TypeScript": "#2b7489",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "PHP": "#4F5D95",
  "Ruby": "#701516",
  "Go": "#00ADD8",
  "C#": "green",
  "Dart": "#2b7489"
};
searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

async function handleSearch() {
  const username = searchInput.value.trim();
  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }
  showLoading();
  hideError();
  hideProfile();
  try {
    const userData = await fetchUserData(username);
    const reposData = await fetchUserRepos(username);
    displayUserProfile(userData);
    displayRepositories(reposData);
    hideLoading();
    showProfile();
  } catch (error) {
    hideLoading();
    showError();
    console.error("Error:", error);
  }
}

async function fetchUserData(username) {
  const response = await fetch(GITHUB_API + username);
  if (!response.ok) throw new Error("User not found");
  return await response.json();
}

async function fetchUserRepos(username) {
  const response = await fetch(
    GITHUB_API + username + "/repos?sort=updated&per_page=6",
  );
  if (!response.ok) throw new Error("Failed to fetch repositories");
  return await response.json();
}

function displayUserProfile(user) {
  userAvatar.src = user.avatar_url;
  userName.textContent = user.name || user.login;
  userLogin.textContent = "@" + user.login;
  userBio.textContent = user.bio || "No bio available";
  const joined = new Date(user.created_at);
  joinDate.textContent =
    "Joined on " +
    joined.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  profileLink.href = user.html_url;
  followersCount.textContent = formatNumber(user.followers);
  followingCount.textContent = formatNumber(user.following);
  reposCount.textContent = formatNumber(user.public_repos);
  if (user.public_gists > 0) {
    gistsInfo.classList.remove("hidden");
    gistsCount.textContent = user.public_gists;
  } else {
    gistsInfo.classList.add("hidden");
  }
  if (user.location) {
    locationInfo.classList.remove("hidden");
    locationText.textContent = user.location;
  } else {
    locationInfo.classList.add("hidden");
  }
  if (user.company) {
    companyInfo.classList.remove("hidden");
    companyText.textContent = user.company;
  } else {
    companyInfo.classList.add("hidden");
  }
  if (user.blog) {
    blogInfo.classList.remove("hidden");
    blogLink.textContent = user.blog;
    blogLink.href = user.blog.startsWith("http")
      ? user.blog
      : "https://" + user.blog;
  } else {
    blogInfo.classList.add("hidden");
  }
}

function displayRepositories(repos) {
  repositoriesList.innerHTML = "";
  if (repos.length === 0) {
    repositoriesList.innerHTML =
      '<p style="color:#8b949e;">No public repositories</p>';
    return;
  }
  repos.forEach((repo) => repositoriesList.appendChild(createRepoCard(repo)));
}

function createRepoCard(repo) {
  const card = document.createElement("div");
  card.className = "repo-card";
  card.onclick = () => window.open(repo.html_url, "_blank");
  const langColor = languageColors[repo.language] || "#8b949e";
  const timeAgo = getTimeAgo(new Date(repo.updated_at));
  card.innerHTML =
    '<div class="repo-header"><svg class="repo-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/></svg><a href="' +
    repo.html_url +
    '" class="repo-name" target="_blank" onclick="event.stopPropagation()">' +
    repo.name +
    "</a></div>" +
    (repo.description
      ? '<p class="repo-description">' + repo.description + "</p>"
      : "") +
    '<div class="repo-footer">' +
    (repo.language
      ? '<div class="repo-language"><span class="language-color" style="background:' +
        langColor +
        '"></span><span>' +
        repo.language +
        "</span></div>"
      : "") +
    '<div class="repo-stat"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>' +
    formatNumber(repo.stargazers_count) +
    '</div><div class="repo-stat"><svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/></svg>' +
    formatNumber(repo.forks_count) +
    '</div><span class="repo-updated">' +
    timeAgo +
    "</span></div>";
  return card;
}

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "Just now";
}

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError() {
  errorMessage.classList.remove("hidden");
}

function hideError() {
  errorMessage.classList.add("hidden");
}

function showProfile() {
  userProfile.classList.remove("hidden");
}

function hideProfile() {
  userProfile.classList.add("hidden");
}
