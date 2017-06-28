/**
 * Created by Jords on 6/24/2017.
 */
/**
 * Created by Jords on 6/24/2017.
 */
//INDEX
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

    var userId = window.location.href.split("#")[1];
    var albumId = window.location.href.split("#")[2];

    var sca = 0
    var scu = 0
    var scal = 0

    if(userId == 0 && albumId == 0){
        var disp = "<h1>All Photos</h1>"
        $(".photo_container").append(disp);
        postAll(data, sca)
    }else if(albumId == 0){
        var disp = "<h1>"+getUserName(userId, data)['name']+"</h1>"
        $(".photo_container").append(disp);
        postUserPhotos(getUserName(userId, data),getAlbumData(albumId, data), data, scu)
    }else{
        var disp = "<h1>"+getAlbumData(albumId, data)['title']+"</h1>"
        $(".photo_container").append(disp);
        postAlbumPhotos(getAlbumData(albumId, data), data, scal)
    }

    document.addEventListener('scroll', function (event) {
        if (document.body.scrollHeight ==
            document.body.scrollTop +
            window.innerHeight) {
            if(userId == 0 && albumId == 0){
                sca += 15
                postAll(data, sca)
            }else if(albumId == 0){
                scu+=15
                //postUserPhotos(getUserName(userId, data),getAlbumData(albumId, data), data, scu)
            }else{
                scal+=15
                //postAlbumPhotos(getAlbumData(albumId, data), data, scal)
            }

        }
    });

    var modal;

    $('img').click(function(){
        var img = $('.myImg');
        var modal = document.getElementById('myModal'+this.id)
        var modalImg = $("#img" + this.id);
        var captionText = document.getElementById("caption"+this.id);
        modal.style.display = "block";
        var newSrc = getPhoto(this.id, data)['url'];
        modalImg.attr('src', newSrc);
        captionText.innerHTML = getPhoto(this.id, data)['title'];
        //DITO PROBLEMA NG CLOSE HINDI MAKITA UNG SPAN
        var span = document.getElementById("close"+this.id);
        span.onclick = function() {
            modal.style.display = "none";

        }
    });


});

var postUserPhotos = function(userData, albumData, data, sCtr){

    var disp = " "
    var ctr = 0;
    for (var j = 0; j < data.photos.length ; j++) {
        var photoData = data.photos[j]

        if(userData['id'] == findAlbum(photoData, data)['userId']) {
            disp += "<div class = \"gallery\">"
            //disp += "<a target= \"_blank\" href = " + photoData['url'] + "  >"
            disp += "<img class =\"myImg\" id = " + photoData['id'] + " src = " + photoData['thumbnailUrl'] + ">"
            //disp += "</a>"
            disp += "</div>"

            disp += "<div id = \"myModal" + photoData['id'] + "\" class = \"modal\">"
            disp += "<span class = \"close\" id = \"close" + photoData['id'] + "\">&times;</span>"
            disp += "<img  class= \"modal-content\" id =  \"img" + photoData['id'] + "\" >"
            disp += "<div class = \"caption\" id = \"caption" + photoData['id'] + "\"></div>"
            disp += "<a href = \"profile.html#"+userData['id']+"\"class = \"caption\" >User: "+userData['name']+"</a>" //id = \"uploader"+getUserName(findAlbum(photoData, data),data)['id']+"\"
            disp += "<a href = \"photo.html#0#"+findAlbum(photoData, data)['id']+"\" onclick = \" setTimeout(location.reload.bind(location), 10);\" class = \"caption\" >Album: "+findAlbum(photoData, data)['title']+"</a>"
            disp += "</div>"
            ctr++;
        }
    }


    $(".photo_container").append(disp);

    $('img').click(function(){
        var img = $('.myImg');
        var modal = document.getElementById('myModal'+this.id)
        var modalImg = $("#img" + this.id);
        var captionText = document.getElementById("caption"+this.id);
        modal.style.display = "block";
        var newSrc = getPhoto(this.id, data)['url'];
        modalImg.attr('src', newSrc);
        captionText.innerHTML = getPhoto(this.id, data)['title'];
        //DITO PROBLEMA NG CLOSE HINDI MAKITA UNG SPAN
        var span = document.getElementById("close"+this.id);
        span.onclick = function() {
            modal.style.display = "none";
        }
    });
}

var findAlbum = function(photoData, data){

    for(var i = 0; i < data.albums.length; i++){
        albumData = data.albums[i]
        if(albumData['id'] == photoData['albumId'])
            return albumData
    }

}



var postAlbumPhotos = function(albumData, data, sCtr){

    var disp = " "

    var ctr = 0;
    for (var j = 0; j < data.photos.length; j++) {
        var photoData = data.photos[j]
        if(albumData['id'] == photoData['albumId']) {
            disp += "<div class = \"gallery\">"
            //disp += "<a target= \"_blank\" href = " + photoData['url'] + "  >"
            disp += "<img class =\"myImg\" id = " + photoData['id'] + " src = " + photoData['thumbnailUrl'] + ">"
            //disp += "</a>"
            disp += "</div>"
            disp += "<div id = \"myModal" + photoData['id'] + "\" class = \"modal\">"
            disp += "<span class = \"close\" id = \"close" + photoData['id'] + "\">&times;</span>"
            disp += "<img  class= \"modal-content\" id =  \"img" + photoData['id'] + "\" >"
            disp += "<div class = \"caption\" id = \"caption" + photoData['id'] + "\"></div>"
            disp += "<a href = \"profile.html#"+getUserName(albumData['userId'], data)['id']+"\"class = \"caption\" >User: "+getUserName(albumData['userId'], data)['name']+"</a>" //id = \"uploader"+getUserName(findAlbum(photoData, data),data)['id']+"\"
            disp += "<a href = \"photo.html#0#"+albumData['id']+"\" onclick = \" setTimeout(location.reload.bind(location), 10);\" class = \"caption\" >Album: "+albumData['title']+"</a>"
            disp += "</div>"
            ctr++;
        }

    }


    $(".photo_container").append(disp);

    $('img').click(function(){
        var img = $('.myImg');
        var modal = document.getElementById('myModal'+this.id)
        var modalImg = $("#img" + this.id);
        var captionText = document.getElementById("caption"+this.id);
        modal.style.display = "block";
        var newSrc = getPhoto(this.id, data)['url'];
        modalImg.attr('src', newSrc);
        captionText.innerHTML = getPhoto(this.id, data)['title'];
        //DITO PROBLEMA NG CLOSE HINDI MAKITA UNG SPAN
        var span = document.getElementById("close"+this.id);
        span.onclick = function() {
            modal.style.display = "none";
        }
    });
}

var postAll = function(data, sCtr){

    // Get the modal
    var disp = " "
    var ctr = 0;
        for (var j = sCtr; j < data.photos.length && j < sCtr + 15 ; j++) {
            var photoData = data.photos[j]
                disp += "<div class = \"gallery\">"
                //disp += "<a target= \"_blank\" href = " + photoData['url'] + "  >"
                disp += "<img class =\"myImg\" id = "+photoData['id']+" src = " + photoData['thumbnailUrl'] + ">"
                //disp += "</a>"
                disp += "</div>"

                disp += "<div id = \"myModal"+photoData['id']+"\" class = \"modal\">"
                disp += "<span class = \"close\" id = \"close"+photoData['id']+"\">&times;</span>"
                disp += "<img  class= \"modal-content\" id =  \"img"+photoData['id']+"\" >"
                disp += "<div class = \"caption\" id = \"caption"+photoData['id']+"\"></div>"
                disp += "<a href = \"profile.html#"+getUserName(getAlbumData(photoData['albumId'], data)['userId'], data)['id']+"\"class = \"caption\" >User: "+ getUserName(getAlbumData(photoData['albumId'], data)['userId'], data)['name']+"</a>" //id = \"uploader"+getUserName(findAlbum(photoData, data),data)['id']+"\"
                disp += "<a href = \"photo.html#0#"+getAlbumData(photoData['albumId'], data)['id']+"\" onclick = \" setTimeout(location.reload.bind(location), 10);\"class = \"caption\" >Album: "+getAlbumData(photoData['albumId'], data)['title']+"</a>"
                disp += "</div>"
                ctr++;
        }


        $(".photo_container").append(disp);

    $('img').click(function(){
        var img = $('.myImg');
        var modal = document.getElementById('myModal'+this.id)
        var modalImg = $("#img" + this.id);
        var captionText = document.getElementById("caption"+this.id);
        modal.style.display = "block";
        var newSrc = getPhoto(this.id, data)['url'];
        modalImg.attr('src', newSrc);
        captionText.innerHTML = getPhoto(this.id, data)['title'];
        //DITO PROBLEMA NG CLOSE HINDI MAKITA UNG SPAN
        var span = document.getElementById("close"+this.id);
        span.onclick = function() {
            modal.style.display = "none";
        }
    });

}

var getUserName = function(ID, data){
    for(var j = 0; j < data.users.length; j++){
        var userData = data.users[j];
        if(ID == userData['id'])
            return userData;

    }
    return "unknown"
}

var getAlbumData = function(id, data){
    for(var i = 0;  i < data.albums.length; i++){
        var albumData = data.albums[i]
        if(id == albumData['id'])
            return albumData
    }
}

var getPhoto = function(id, data){
    for(var i = 0; i < data.photos.length; i++) {
        var photoData = data.photos[i]
        if(photoData['id'] == id){
            return photoData
        }
    }
}

