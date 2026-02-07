let feed = document.getElementById("feed");
let nameInput = document.getElementById("nameInput");
let statusInput = document.getElementById("statusInput");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// tampilkan post lama
posts.forEach(p => tambahPost(p.name, p.text));

function postStatus() {
  let name = nameInput.value.trim();
  let text = statusInput.value.trim();

  if (name === "" || text === "") {
    alert("Nama dan status tidak boleh kosong!");
    return;
  }

  let data = { name, text };
  posts.unshift(data);
  localStorage.setItem("posts", JSON.stringify(posts));

  tambahPost(name, text);
  statusInput.value = "";
}

function tambahPost(name, text) {
  let div = document.createElement("div");
  div.className = "post";

  let nama = document.createElement("strong");
  nama.innerText = name;

  let isi = document.createElement("p");
  isi.innerText = text;

  let btn = document.createElement("button");
  btn.innerText = "Hapus";
  btn.onclick = function () {
    hapusPost(name, text);
    div.remove();
  };

  div.appendChild(nama);
  div.appendChild(isi);
  div.appendChild(btn);

  feed.prepend(div);
}

function hapusPost(name, text) {
  posts = posts.filter(p => !(p.name === name && p.text === text));
  localStorage.setItem("posts", JSON.stringify(posts));
}

// tekan ENTER untuk post
statusInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    postStatus();
  }
});
