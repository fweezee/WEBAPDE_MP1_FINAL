//INDEX
var username_global;
$(document).ready(function () {

//    var data = new Data('assets/data/test'); // must enable cross-origin requests in chrome for testing according to mig
    var data = new Data("https://jsonplaceholder.typicode.com");
    console.log(data.getUserAlbums(1));

    $("#search").on('focus', function () {
        $("#mag").attr("src", "img/mag-focus.png");
    });

    $("#search").on('focusout', function () {
        $("#mag").attr("src", "img/mag.png");
    });

    var top = $("#mainNav").offset().top;
    var sticky = function () {
        var winTop = $(window).scrollTop();

        if (winTop > top) {
            $("#topBar").addClass('sticky');
            $("#mainNav").addClass('stickyNav');
            $("#title h1").addClass('stickyTitle');
            $("#body").addClass("stickyBody");
        } else {
            $("#topBar").removeClass('sticky');
            $("#mainNav").removeClass('stickyNav');
            $("#title h1").removeClass('stickyTitle');
            $("#body").removeClass("stickyBody");
        }
    };

    $(window).scroll(function () {
        sticky();
    });

    var searchData = window.location.href.split("#")[1].toLowerCase();

    searchPost(searchData, data)
    userPost(searchData, data)
    photoPost(searchData, data)
    albumPost(searchData, data)
});

var searchPost = function(searchData, data){
    for(var i = 0; i < data.posts.length; i++){

        var postData = data.posts[i]
        if(postData['title'].toLocaleLowerCase().search(searchData) >= 0){
            var disp = "<a href = \"profile.html# "+postData['userId']+"\">"
                disp +=  "<div class = \"search_box\">"
                disp += ""+ postData['title'] +""
                disp += "</div>"
                disp += "</a>"
            $("#post_search").append(disp)
        }
    }
}

var photoPost = function(searchData, data){
    for(var i = 0; i < data.photos.length; i++){

        var photoData = data.photos[i]
          if(photoData['title'].toLocaleLowerCase().search(searchData) >= 0){
            var disp = "<a href = \"photo.html#0#"+photoData['albumId']+"\">"
            disp +=  "<div class = \"search_box\">"
            disp += ""+ photoData['title'] +""
            disp += "</div>"
            disp += "</a>"
            $("#photo_search").append(disp)
        }
    }
}

var albumPost = function(searchData, data){
    for(var i = 0; i < data.albums.length; i++){

        var albumData = data.albums[i]
        if(albumData['title'].toLocaleLowerCase().search(searchData) >= 0){
            var disp = "<a href = \"photo.html#0#"+albumData['id']+"\">"
            disp +=  "<div class = \"search_box\">"
            disp += ""+ albumData['title'] +""
            disp += "</div>"
            disp += "</a>"
            $("#album_search").append(disp)
        }
    }
}




var userPost = function(searchData, data){

    for(var i = 0; i < data.users.length; i++) {
        var userData = data.users[i]
        console.log(searchData)
        if (userData['name'].toLocaleLowerCase().search(searchData) >= 0) {

            var disp = "<a href = \"profile.html# " + userData['id'] + "\">"
            disp += "<div class = \"search_box\">"
            disp += "Name: " + userData['name'] + ""
            disp += "</div>"
            disp += "</a>"
            $("#users_search").append(disp)
        }


    }

    for(var i = 0; i < data.users.length; i++){

        var userData = data.users[i]
        if(userData['username'].toLocaleLowerCase().search(searchData) >= 0){
            var disp = "<a href = \"profile.html# "+userData['id']+"\">"
            disp +=  "<div class = \"search_box\">"
            disp += "Username: "+ userData['username']+""
            disp += "</div>"
            disp += "</a>"
            $("#users_search").append(disp)
        }


    }
}

var getUserName = function(postData, data){
    console.log("dasf")
    for(var j = 0; j < data.users.length; j++){
        console.log("asdf")
        var userData = data.users[j];
        if(postData['userId'] == userData['id'])
            return userData['username'];
    }
    return "unknown"
}

function setID(val){
    console.log(val)
    localStorage.setItem("id", val)
    window.location.href = "profile.html"
}

function profilePage(){
    var x = document.getElementById(id);
    console.log (x.id);
    var data = new Data("https://jsonplaceholder.typicode.com");

}





