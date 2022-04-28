window.addEventListener('scroll', function(){
    if(window.pageYOffset){
        document.querySelector('nav').classList.add('offsetNav');
    }else{
        document.querySelector('nav').classList.remove('offsetNav');
    };
});

const getImages = async() => {
    //Récupération des données
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=pklszhc1aO1M5pFtqg4IzqP4bbt1Bn8dqXLNU03h');
    //Attente de la réponse et sa conversion en json
    const allImages = await response.json();
    

    const mainContent = document.querySelector('main');
    let imageHD = allImages.hdurl;
    let imageSD = allImages.url;
    let author;
    if(allImages.copyright === undefined){
        author = 'Unknown author';
    }else{
        author = allImages.copyright;
    }

    mainContent.innerHTML = 
    `<section id="content-presentation">
        <div class="image-day">
            <img src="${imageSD}" alt="${allImages.title}">
        </div>
        <div class="image-main-info">
            <h1>${allImages.title}</h1>
            <p class="date">${allImages.date}</p>
            <details class="image-details">
                <summary>What am I seeing ?</summary>
                <p class="image-explanation">${allImages.explanation}</p>
                <p class="author">${author}</p>
            </details>                    
        </div>
    </section>
    <div class="zommed-background">
        <img src="${imageSD}" alt="${allImages.title}">
    </div>`;

    const zoommedBackground = document.querySelector(".zommed-background");
    const image = document.querySelector(".image-day");

    image.addEventListener('click', function() {
        zoommedBackground.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
    
    zoommedBackground.addEventListener('click', function(){
        this.style.display = "none";
        document.body.style.overflow = "auto";
    });
};

getImages();