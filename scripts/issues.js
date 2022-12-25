$(document).ready(function(){
    loadDocumentsList();


    //Show entities in the text
    $('.show-people').click(function() {
        if ($("input.show-people").is(':checked')) {
            $('.person').addClass("person-bkg");
        }else {
            $('.person').removeClass("person-bkg");
        }
    });

    $('.show-places').click(function() {
        if ($("input.show-places").is(':checked')) {
            $('.place').addClass("places-bkg");
        }else {
            $('.place').removeClass("places-bkg");
        }
    });

    $('.show-organizations').click(function() {
        if ($("input.show-organizations").is(':checked')) {
            $('.organization').addClass("organizations-bkg");
        }else {
            $('.organization').removeClass("organizations-bkg");
        }
    });

    $('.show-events').click(function() {
        if ($("input.show-events").is(':checked')) {
            $('.event').addClass("events-bkg");
        }else {
            $('.event').removeClass("events-bkg");
        }
    });

    $('.show-concepts').click(function() {
        if ($("input.show-concepts").is(':checked')) {
            $('.concept').addClass("concepts-bkg");
        }else {
            $('.concept').removeClass("concepts-bkg");
        }
    });

    $('.show-keywords').click(function() {
        if ($("input.show-keyword").is(':checked')) {
            $('.keyword').addClass("keyword-bkg");
        }else {
            $('.keyword').removeClass("keyword-bkg");
        }
    });



    //Show metadata in tab divs

    $(".info-nav-i").click(function(){
        if ($(".info-nav-i").hasClass("active-nav-i")) {
            console.log("already active")
        } else {
            $(".tab-content").removeClass("active-tc");
            $(".info-tc").addClass("active-tc");
            $(".nav-i").removeClass("active-nav-i");
            $(".info-nav-i").addClass("active-nav-i");
        }
    });

    $(".people-nav-i").click(function(){
        if ($(".people-nav-i").hasClass("active-nav-i")) {
            console.log("already active")
        } else {
            $(".tab-content").removeClass("active-tc");
            $(".people-tc").addClass("active-tc");
            $(".nav-i").removeClass("active-nav-i");
            $(".people-nav-i").addClass("active-nav-i");
        }
    });

    $(".places-nav-i").click(function(){
        if ($(".places-nav-i").hasClass("active-nav-i")) {
            console.log("already active")
        } else {
            $(".tab-content").removeClass("active-tc");
            $(".places-tc").addClass("active-tc");
            $(".nav-i").removeClass("active-nav-i");
            $(".places-nav-i").addClass("active-nav-i");
        }
    });

    $(".orgs-nav-i").click(function(){
        if ($(".orgs-nav-i").hasClass("active-nav-i")) {
            console.log("already active")
        } else {
            $(".tab-content").removeClass("active-tc");
            $(".orgs-tc").addClass("active-tc");
            $(".nav-i").removeClass("active-nav-i");
            $(".orgs-nav-i").addClass("active-nav-i");
        }
    });

    $(".events-nav-i").click(function(){
        if ($(".events-nav-i").hasClass("active-nav-i")) {
            console.log("already active")
        } else {
            $(".tab-content").removeClass("active-tc");
            $(".events-tc").addClass("active-tc");
            $(".nav-i").removeClass("active-nav-i");
            $(".events-nav-i").addClass("active-nav-i");
        }
    });

    $(".concepts-nav-i").click(function(){
        if ($(".concepts-nav-i").hasClass("active-nav-i")) {
            console.log("already active")
        } else {
            $(".tab-content").removeClass("active-tc");
            $(".concepts-tc").addClass("active-tc");
            $(".nav-i").removeClass("active-nav-i");
            $(".concepts-nav-i").addClass("active-nav-i");
        }
    });

    $(".keywords-nav-i").click(function(){
        if ($(".keywords-nav-i").hasClass("active-nav-i")) {
            console.log("already active")
        } else {
            $(".tab-content").removeClass("active-tc");
            $(".keywords-tc").addClass("active-tc");
            $(".nav-i").removeClass("active-nav-i");
            $(".keywords-nav-i").addClass("active-nav-i");
        }
    });



});




function loadDocumentsList(){
    $.ajax({
        cache: false,
        method: "GET",
        url: "https://raw.githubusercontent.com/tommasobattisti/thePPPPconspiracy/main/fileList.json",
        success: function(listObj){
            let parsedJson = JSON.parse(listObj)
            if (parsedJson.length == 0){
                alert("No document to show")
            } else {
                console.log(parsedJson)
                parsedJson.forEach(obj => {
                    $(".docs-list-a").append('<li><a href="#" onclick="loadDoc(\''+obj.url+'\', \''+obj.label+'\', \'a\'); return false">'+obj.label+'</a></li>'); // or: '<li class="doc-list-item" onclick="loadDoc('+obj.url+')">'+obj.label+'</li>'
                    $(".docs-list-b").append('<li><a href="#" onclick="loadDoc(\''+obj.url+'\', \''+obj.label+'\', \'b\'); return false">'+obj.label+'</a></li>')
                    // The 'return false' is needed to prevent the default action of the link (which is to go to the url) and to prevent the page from reloading when the link is clicked (which is the default action of the link)
                });
            }
        },
        error: function(){
            alert("No document to show")
        }
    });
}



function loadDoc(file, label, div) { //RIVEDERE!!!!!!!
    if(div == "a"){
        loadInA(file, label)
    }else{
        loadInB(file, label)
    }
}


function loadInA(file, label){
    console.log(String(label.toLowerCase()))
    console.log(String($(".article-title").attr("data-label")).toLowerCase())
    console.log(String(label.toLowerCase()) == String($(".article-title").attr("data-label")).toLowerCase())
    if (label.toLowerCase() == String($(".article-title").attr("data-label")).toLowerCase()) {
        console.log("Already loaded")
    } else {
        $.ajax({
            method: 'GET',
            url: file,
            success: function(d) {
                let article = $('.article-container').html(d)
                $('.article-container').replaceWith(article)

                addInfo();
                addMetadata();
            },
            error: function() {
                alert('Could not load file '+ file)
            }
        });
        $(".show").prop( "checked", false );
        
    }
    

}

function loadInB(file, label){
        $.ajax({
            method: 'GET',
            url: file,
            success: function(d) {
                let article = $('.article-comparison-container').html(d)
                $('.article-comparison-container').replaceWith(article)
            },
            error: function() {
                alert('Could not load file '+ file)
            }
        });
}




//Modality change

function changeMode(mode) {
    if (mode == 'single' && $(".active-mode").hasClass('comparison-mode-btn')) {
        changeToSingleMode()
    } else if (mode == 'comparison' && $(".active-mode").hasClass('single-mode-btn')) {
        changeToComparisonMode()
    } else {
        console.log("Mode already active")
    }
}




let myMediaQuery = window.matchMedia('(max-width: 1080px)'); //media query to check whether the window is smaller than 1080px

//initial check to see whether the media query is satisfied when the page is loaded but no resizing has occurred
widthChangeCallback(myMediaQuery);

function widthChangeCallback(myMediaQuery) { //callback function to execute when media query is triggered
  if(myMediaQuery.matches) {
    changeMode("single");
   }
}

myMediaQuery.addEventListener('change', widthChangeCallback); //add listener to media query to execute callback function when media query is triggered




function changeToSingleMode() {
    $('.comparison-mode-btn').removeClass('active-mode');
    $(".single-mode-btn").addClass('active-mode');
    $(".metadata-container").css({"visibility": "visible", "width": "28%"});
    $(".article-comparison-container").css({"display": "none"});
    $(".article-container").css("width", "70%");
    $(".modal-btn-container").css({"visibility": "hidden", "width": "0"});
    $(".double-doc-selector").css({"visibility": "hidden", "height": "0"});
}


function changeToComparisonMode() {
    $('.single-mode-btn').removeClass('active-mode');
    $(".comparison-mode-btn").addClass('active-mode');
    $(".metadata-container").css({"visibility": "hidden", "width": "0"});
    $(".article-comparison-container").css({"display": "block", "width": "50%"});
    $(".article-container").css("width", "50%");
    $(".modal-btn-container").css({"visibility": "visible", "width": "100%"});
    $(".double-doc-selector").css({"visibility": "visible", "height": "auto"});
}







//Add info and metadata to the metadata container

function addInfo() {
    let infoDl = $(".info-dl");
    infoDl.empty();   //empty the dl element before adding new info
    
    infoDl.append("<dt>Title</dt><dd class='title-dd'>"+$('.article-title').text()+"</dd>"); //add title to the dl element

    infoDl.append("<dt>Author</dt>"); //add author to the dl element
    for (let i = 0; i < $('.author-info').length; i++) {
        infoDl.append("<dd class='author-dd'>"+$('.author-info')[i].innerText+"</dd>");
    };

    infoDl.append("<dt>Publication date</dt><dd class='pub-date-dd'>"+$('.publication-date').text()+"</dd>"); //add publication date to the dl element

}


function addMetadata() {
    let peopleUl = $(".people-ul")
    peopleUl.empty()

    let placesUl = $(".places-ul")
    placesUl.empty()

    let orgsUl = $(".orgs-ul")
    orgsUl.empty()

    let eventsUl = $(".events-ul")
    eventsUl.empty()

    let conceptsUl = $(".concepts-ul")
    conceptsUl.empty()

    let keywordsUl = $(".keywords-ul")
    keywordsUl.empty()

    for (const mention of $(".mention")){
        let entityLink = "<li><a class='entity-link' href='#"+mention.id+"' onclick='animateBkg(\"#"+mention.id+"\")'>"+mention.innerText+"</a></li>"
        if (mention.classList.contains("person")) {
            peopleUl.append(entityLink)
        } else if (mention.classList.contains("place")) {
            placesUl.append(entityLink)
        } else if (mention.classList.contains("organization")) {
            orgsUl.append(entityLink)
        } else if (mention.classList.contains("event")) {
            eventsUl.append(entityLink)
        } else if (mention.classList.contains("concept")) {
            conceptsUl.append(entityLink)
        } else if (mention.classList.contains("keyword")) {
            keywordsUl.append(entityLink)
        }
        }
    
}


//Animate background of entity link when clicked
function animateBkg(id) {
    let counter = 0;
    const maxIterations = 1;

    const highlight = setInterval(function() {                  //set interval to repeat the animation every 900ms
                        $(id).addClass("animation-bkg")         //add the animation class to the entity link
                        setTimeout(function() {                 //remove the animation class after 450ms
                            $(id).removeClass("animation-bkg")  //remove the animation class
                        }, 450);
                        if (counter >= maxIterations) {         //stop the interval after 1 iteration (it will be highleted two times)
                            clearInterval(highlight);
                        }
                        counter++;
                        }, 900);
}

