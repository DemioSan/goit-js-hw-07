import { galleryItems } from "./gallery-items.js";

const galleryList = document.querySelector(".gallery");
let lightboxInstance = null;

function createGalleryItem({ preview, original, description }) {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery__item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.href = original;

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery__image");
  galleryImage.src = preview;
  galleryImage.alt = description;
  galleryImage.setAttribute("data-source", original);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
}

const galleryItemsMarkup = galleryItems.map(createGalleryItem);
galleryList.append(...galleryItemsMarkup);

galleryList.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "IMG") {
    return;
  }

  const largeImageUrl = target.dataset.source;
  openModal(largeImageUrl);
}

function openModal(imageUrl) {
  const modalContent = `
    <img src="${imageUrl}" alt="Image">
  `;

  if (lightboxInstance) {
    lightboxInstance.close();
  }

  lightboxInstance = basicLightbox.create(modalContent, {
    onShow: () => {
      document.addEventListener("keydown", onKeyPress);
    },
    onClose: () => {
      document.removeEventListener("keydown", onKeyPress);
    },
  });

  lightboxInstance.show();
}

function onKeyPress(event) {
  if (event.key === "Escape") {
    lightboxInstance.close();
  }
}
