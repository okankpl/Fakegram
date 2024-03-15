let posts = [
  {
    author: "okan.kpl",
    profileimg: "img/okan.jpg",
    image: "img/thailand.jpg",
    description: "  Urlaub Thailand 2017/2018",
    location: "Thailand Koh Phi Phi",
    comments: [],
    likes: 100,
    liked: false,
  },
  {
    author: "Tagesschau",
    profileimg: "img/tagesschau.png",
    image: "img/hamburg.jpg",
    description: "Hamburg",
    location: "Hamburg, Deutschland",
    comments: [],
    likes: 1023,
    liked: false,
  },
  {
    author: "okan.kpl",
    profileimg: "img/okan.jpg",
    image: "img/img2.jpg",
    description: "Urlaub Türkei 2022",
    location: "Türkei Fethiye",
    comments: [],
    likes: 80,
    liked: false,
  }
  
];

let user = [
  {
    author:"ringen_deutschland",
    profileimg:"img/ringen.png",
    follow : "",
    subStatus : true
  },
  {
    author:"Tierwelt",
    profileimg:"img/tiger.png",
    follow : "",
    subStatus: false
  },
  {
    author:"max_mustermann",
    profileimg:"img/user.png",
    follow : "",
    subStatus: true
  }
];





let icons = ["img/like.png",  "img/comment.png", "img/liked.png"];

load();

function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  generateHeader
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    
    content.innerHTML += /*html*/`
        <div class="posts">
          ${generateHeader(post)}
          ${renderLikeCommentSection(post,i)}
  </div>
        `;
    renderComment(i);
  } 
}

function addComment(index) {
  let content = document.getElementById(`inputfield${index}`);
  if (content.value.trim() === '') {
    alert('Bitte gebe etwas in das Kommentarfeld ein');
  }
  else {
    posts[index]["comments"].push(content.value);
    content.value = "";
    render();
    save();
  }
  
}

function like(index) {
  let liked = posts[index]["liked"];

  if (!liked) {
    
    liked = true;
    posts[index]["likes"]++;
  } else {
    
    liked = false;
    posts[index]["likes"]--;
    
  }
  posts[index]["liked"] = liked;
  
  render();
  save();
}

function save() {
  let postsAsText = JSON.stringify(posts);
  localStorage.setItem("posts", postsAsText);

  let userAsText = JSON.stringify(user);
  localStorage.setItem("user", userAsText);
}

function load() {
  let postsAsText = localStorage.getItem("posts");
  let userAsText = localStorage.getItem("user");

  if (postsAsText) {
    posts = JSON.parse(postsAsText);
  }
  if (userAsText) {
    user = JSON.parse(userAsText);
  }
 
}

function renderComment(j) {
  let postscontent = document.getElementById(`postscontent${j}`);
  const post = posts[j];
  for (let j = 0; j < post["comments"].length; j++) {
    const comment = post["comments"][j];
    postscontent.innerHTML += `<div class="margincomment"><p><b>okan.kpl: </b>${comment}</p></div>`;
  }
}

function generateHeader(post,) {
 return `
      
        <div class="post-header">
          <img class="profileimg" src=${post["profileimg"]} alt="">
          <div class="loc-author-container">
          <h3>${post["author"]}</h3>
          ${post["location"]}</div>
        </div>
        
          <img class="post-image" src="${post["image"]}" alt="">
      ` 
}

function renderLikeCommentSection(post,i) {
  return /*html*/`
  <div class="icons">
          <img onclick="like(${i})" src="${post['liked'] ? 'img/liked.png' : 'img/like.png'}" id="likebtn${i}">
        <img src="${icons[1]}" alt="">
      </div>
      <h4>Gefällt ${post["likes"]} Mal</h4>
      <div class="desc-container">
      <h5>${post["author"]}:</h5> <h5 class="desc">${post["description"]}</h5>
      </div>
      <div id="postscontent${i}"></div>
      <div id="line"></div>
      <div id="commentContainer">
        <input placeholder="Kommentar hinzufügen..." type="text" id="inputfield${i}">
        <button onclick="addComment(${i})">Posten</button>
    </div>
  `
}


function renderSuggestedUser() {
let content = document.getElementById('userContainer');
content.innerHTML = '';
for (let k = 0; k < user.length; k++) {
  const users = user[k];

  content.innerHTML += /*html*/`
  <div class="d-flex">
<div class="user-container-left">
            <img src=${users["profileimg"]} alt="">
            <h4>${users["author"]}</h4>
          </div>
          <button id="subBtn${k}" onclick="subBtn(${k})">Abonnieren</button>
          </div>
  `
  subBtn(k);
}



}

function subBtn (index) {
  let sub = user[index]["subStatus"];
  let content = document.getElementById(`subBtn${index}`);

  
  if (!sub)
  {
    content.innerHTML ="Abonniert";
    sub = true;
    
  }

  else {
    content.innerHTML = "Abonnieren";
    sub = false;
    
  }
  user[index]["subStatus"] = sub;

  render();
  save();
}