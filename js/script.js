const boxes = document.querySelector(".container .boxes");
const lightBox = document.querySelector(".lightbox");
const sliderThumbs = document.querySelector(".slider-thumbs");
const userNameNode = document.querySelector(".user-name  .full-name");
const userNickNode = document.querySelector(".user-name .nick");
const userAvatar = document.querySelector(".avatar img");
const twitterNode = document.querySelector(".twitter-img a");
const instagramNode = document.querySelector(".instagram-img a");
const unsplashNode = document.querySelector(".unsplash-img a");

const data = getData().then((res) => res);

function getData() {
  return fetch("../data.json").then((data) => data.json());
}

// GALLERY
// make image and put to main container
// add function to open lightbox via onclick = createLightbox()
// createLightBox add image to slider - OPEN LIGHTBOX
// also call thumbs function which creates four thumbs
function makeImgBox(
  src,
  hdSrc,
  likesNum = 100,
  linkToDownload,
  alt,
  id,
  userName,
  userNick,
  avatarSrc,
  twitterSrc,
  instagramSrc,
  unsplashSrc
) {
  const box = document.createElement("div");
  box.dataset.id = id;
  box.classList.add("box-image");
  // open lightbox
  box.onclick = function createLigtbox(e) {
    if (!e.target.parentElement.parentElement.classList.contains("box-image")) {
      e.stopPropagation();
      return;
    }
    lightBox.classList.add("active");
    sliderImg.src = hdSrc;
    userNameNode.textContent = userName;
    userNickNode.textContent = `(${userNick})`;
    userAvatar.src = avatarSrc;
    if (twitterSrc) {
      twitterNode.href = "https://twitter.com/" + twitterSrc;
    }

    if (instagramSrc) {
      instagramNode.href = "https://instagram.com/" + instagramSrc;
    }

    unsplashNode.href = unsplashSrc;
    document.querySelector("body").classList.add("lightbox-open");
    const boxImages = document.querySelectorAll(".box-image");
    let index = 0;
    for (var i = 0; i < boxImages.length; i++) {
      if (boxImages[i] === this) {
        index = i;
      }
    }
    makeThumbs(index);
  };
  // create box-image-info
  // <i class="fas fa-heart"></i>

  const infoBox = document.createElement("div");
  infoBox.classList.add("info-box");

  const iHeartBox = document.createElement("div");
  iHeartBox.classList.add("likes-info");
  const iHeart = document.createElement("i");
  iHeart.classList.add("fas", "fa-heart");
  const heartNums = document.createElement("p");
  heartNums.textContent = likesNum;
  iHeartBox.appendChild(iHeart);
  iHeartBox.appendChild(heartNums);

  const iDownloadBox = document.createElement("a");
  iDownloadBox.href = linkToDownload;
  iDownloadBox.classList.add("download-info");
  const iDownload = document.createElement("i");
  iDownload.classList.add("fa", "fa-download");
  const downloadNums = document.createElement("p");
  downloadNums.textContent = Math.floor(Math.random() * likesNum);
  iDownloadBox.appendChild(iDownload);
  iDownloadBox.appendChild(downloadNums);

  infoBox.appendChild(iHeartBox);
  infoBox.appendChild(iDownloadBox);
  // create img
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("box-image-wrapper");
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "Template Image";
  imgWrapper.appendChild(img);

  box.appendChild(infoBox);
  box.appendChild(imgWrapper);
  boxes.appendChild(box);
}

// make main container full with imgs
// add img location
function makeTemplates() {
  const boxImages = document.querySelectorAll(".box-image");
  const index = boxImages.length;
  for (let i = index; i <= index + 11; i++) {
    // uhvati naredni page
    data.then((res) => {
      if (!res.results[i]) {
        document.querySelector(".loader").style.display = "none";
      }
      makeImgBox(
        res.results[i].urls.regular,
        res.results[i].urls.regular,
        res.results[i].likes,
        res.results[i].links.html,
        res.results[i].alt_description,
        res.results[i].id,
        res.results[i].user.name,
        res.results[i].user.username,
        res.results[i].user.profile_image.medium,
        res.results[i].user.social.twitter_username,
        res.results[i].user.social.instagram_username,
        res.results[i].user.links.html
      );
    });
  }
}

// THUMBS

function moveThumbToGallery(id) {
  fetch(
    `https://api.unsplash.com/photos/${id}/?client_id=Q06pfIFP-Jmi1rQbSttYHMQXI137l6eOwbuHirm0uCg`
  )
    .then((res) => res.json())
    .then((res) => {
      userNameNode.textContent = res.user.name;
      userNickNode.textContent = `(${res.user.username})`;
      userAvatar.src = res.user.profile_image.medium;
      twitterNode.removeAttribute("href");
      if (res.user.social.twitter_username) {
        twitterNode.href =
          "https://twitter.com/" + res.user.social.twitter_username;
      }
      instagramNode.removeAttribute("href");
      if (res.user.social.instagram_username) {
        instagramNode.href =
          "https://instagram.com/" + res.user.social.instagram_username;
      }
      unsplashNode.removeAttribute("href");
      unsplashNode.href = res.user.links.html;
    });
}

// make thumb and put to thumb-image on lightbox
function makeThumbBox(src, alt, index, i, id) {
  const thumb = document.createElement("div");
  if (index === i) {
    thumb.classList.add("thumb-image", "active");
  } else {
    thumb.classList.add("thumb-image");
  }
  // dodaje active klasu odgovarajucem thumbu, grayscale mu je sad nula
  // sliderImg preuzima sliku thumb-a (slika treba da bude hd)
  thumb.onclick = function (e) {
    // kreni sa uzimanjem id od thumb slike
    moveThumbToGallery(this.dataset.id);
    const thumbsImgs = document.querySelectorAll(".thumb-image");
    thumbsImgs.forEach((thumb) => thumb.classList.remove("active"));
    this.classList.add("active");
    sliderImg.src = this.childNodes[0].src;
  };
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "Template Image";
  thumb.dataset.id = id;
  thumb.appendChild(img);
  sliderThumbs.appendChild(thumb);
}

// make thum and put in slider thumbs
function makeThumbs(index) {
  const boxImages = document.querySelectorAll("box-image");
  for (let i = index; i < index + 4; i++) {
    if (i >= boxImages.length) {
      data.then((res) => {
        makeThumbBox(
          res.results[i - boxImages.length].urls.regular,
          "Image Template",
          index,
          i,
          res.results[i].id
        );
      });
      continue;
    }
    data.then((res) => {
      makeThumbBox(
        res.results[i].urls.small,
        "Image Template",
        index,
        i,
        res.results[i].id
      );
    });
  }
}

function putElementsAfterScroll() {
  if (
    document.documentElement.scrollTop +
      document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    // const loaderOld = document.querySelectorAll(".loader");
    // loaderOld.forEach((loader) => loader.remove());
    makeTemplates();
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 200);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

const returnScrollFunction = debounce(putElementsAfterScroll, 500);

const sliderImg = document.querySelector(".slider-img img");

const closeLightbox = document.querySelector(".close-btn");
const leftSlide = document.querySelector(".left-slider");
const rightSlide = document.querySelector(".right-slider");

closeLightbox.addEventListener("click", function () {
  lightBox.classList.remove("active");
  twitterNode.removeAttribute("href");
  instagramNode.removeAttribute("href");
  unsplashNode.removeAttribute("href");
  document.querySelector("body").classList.remove("lightbox-open");
  document.querySelectorAll(".thumb-image").forEach((thumb) => thumb.remove());
});

leftSlide.addEventListener("click", function () {
  twitterNode.removeAttribute("href");
  instagramNode.removeAttribute("href");
  unsplashNode.removeAttribute("href");
  const thumbsContainer = document.querySelectorAll(".thumb-image");
  let index;
  thumbsContainer.forEach((thumb, i) => {
    if (thumb.classList.contains("active")) {
      index = i - 1;
      thumb.classList.remove("active");
    }
  });
  if (index < 0) {
    index = thumbsContainer.length - 1;
  }
  sliderImg.src = thumbsContainer[index].childNodes[0].src;
  moveThumbToGallery(thumbsContainer[index].dataset.id);
  thumbsContainer[index].classList.add("active");
});

rightSlide.addEventListener("click", function () {
  twitterNode.removeAttribute("href");
  instagramNode.removeAttribute("href");
  unsplashNode.removeAttribute("href");
  const thumbsContainer = document.querySelectorAll(".thumb-image");
  let index;
  thumbsContainer.forEach((thumb, i) => {
    if (thumb.classList.contains("active")) {
      index = i + 1;
      thumb.classList.remove("active");
    }
  });
  if (index > thumbsContainer.length - 1) {
    index = 0;
  }
  sliderImg.src = thumbsContainer[index].childNodes[0].src;
  moveThumbToGallery(thumbsContainer[index].dataset.id);
  thumbsContainer[index].classList.add("active");
});

const btnGrid = document.querySelector(".btn-grid");
const btnList = document.querySelector(".btn-list");

btnGrid.addEventListener("click", function () {
  boxes.classList.remove("column");
  this.classList.add("active");
  btnList.classList.remove("active");
});
btnList.addEventListener("click", function () {
  boxes.classList.add("column");
  btnGrid.classList.remove("active");
  this.classList.add("active");
});

window.addEventListener("load", function () {
  makeTemplates();

  data.then((res) => console.log(res));
});

window.addEventListener("scroll", returnScrollFunction);

document.querySelector("body").addEventListener("click", function (e) {
  if (
    e.target.classList.contains("active") &&
    e.target.classList.contains("lightbox")
  ) {
    e.target.classList.remove("active");
    twitterNode.removeAttribute("href");
    instagramNode.removeAttribute("href");
    unsplashNode.removeAttribute("href");
    document
      .querySelectorAll(".thumb-image")
      .forEach((thumb) => thumb.remove());

    console.log(this);
    this.classList.remove("lightbox-open");
  }
});
