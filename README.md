**To do this challenge, you need a good understanding of HTML, CSS, and JavaScript.**

## The challenge

Your challenge is to build out the app to fetch images from the Unsplash using the [Unsplash API](https://unsplash.com/documentation). The app's design is up to you! The only requirement is that the page should be fully responsive.

You are only allowed to use CSS (preprocessors are allowed) and vanilla JS for this challenge. No third-party libraries are allowed except for the icons. Some suggestions are:

- [Font Awesome](https://fontawesome.com)
- [IcoMoon](https://icomoon.io)
- [Ionicons](https://ionicons.com)

### Expected behaviour

- On first load, show the overlay with loader until all the images are downloaded and ready. Create your own loader using CSS, GIF or SVG file, or use an example from: https://loading.io/
- Upon clicking each image, show a higher resolution image in a lightbox.
- Every image should have a link that points to the Unsplash site (https://unsplash.com/photos/...) and should also have the alt attribute populated from the response from the API.
- Make sure that each image has a default alt text if it's not available from the response.
- Other info to be displayed: likes and downloads count for the photo and photographer's username, avatar, portfolio URL and links to all the available social media.
- As the user approaches the bottom of the page, a new batch of images is loaded. You can choose to show another loader while the images are downloading.
- Allow the user to choose between list view (item occupies full width of the container) and grid view (several items are displayed in a row).

## Deploying your project

- [Vercel](https://vercel.com/)

**Have fun building!** 🚀

// loader na pocetku dok ne pristignu slike  
// na klik veca (ili native, ne mora veca) rezolucije slike, otvara se lightbox (modal + slider), startne slike da budu api/urls/regular or small
// slika da ima href ka unsplashu iz urls propertija u jsonu
// slika da ima alt_description, ako nema alt_descprion default alt
// slika da ima "likes", (downloads ali gde je), detalje iz users propertija (username, avatar, portfolio url, and available social media icons)
// da ima infinite skrol
// da se menja izgled rowova
