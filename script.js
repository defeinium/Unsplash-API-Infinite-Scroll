const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//Unsplash API
//`template string`
const count = 10; 
const apiKey = 'jVUNhC7Df7h2v0d7cK__gf4DvwG8gC-rrI2FarB7J20';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`; //added random, apiKey and ${count};

//Image Loader, check if all images were loaded
function imageLoaded() {
    imagesLoaded ++;
    if (imagesLoaded === totalImages){
        ready = true;
        imagesLoaded = 0;
        count = 10;
    }
}
//Helper function to set attribute on DOM elements
function setAttribute(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements For Links and Photos, Add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    console.log('total images', totalImages);
        //Run function for each object in photosArray
        photosArray.forEach((photo) => {
            // Create <a> anchor element to link to unsplash
            const item = document.createElement('a');
            setAttribute(item, {
                href: photo.links.html,
                target: '_blank',
            });

            //Create <img> image for photo
            const img = document.createElement('img');
            setAttribute(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description,
            });

            // Event listener, check when  each is finished loading
            img.addEventListener ('load', imageLoaded);

            // Put <img> inside <a>, then put both inside imageContainer Element
            item.appendChild(img);
            imageContainer.appendChild(item);
        })
}


//Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();  //to await the reponse of data run though json and return json 
        //console.log(photosArray);
        displayPhotos();
      
    } catch (error) {
        //Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more Photos
//window is the parent of the document, granparent of body (a event handler)
window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        
    }
})  //scroll is the DOM event, check on the HTML DOM event

//On Load
getPhotos();  //make sure running of the function

