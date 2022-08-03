$(function(){
    var username = $('#username').text();
    var imgurl = $('#imgurl').text();
    var current_owner = $('#current_owner').text();


    $('#btn-buy').click(function(){
        var text = "Buy this NFT";
        if (current_owner == 'none'){
            text += "?";
        } else {
            text += " from " + current_owner + "?";
        }

        var answer = window.confirm(text);
        if (answer) {
            //some code

            var json_data = {
                username: username,
                imgurl: imgurl,
                current_owner: current_owner
            }
            console.log(json_data);
            $.ajax({
                type: "POST",
                url: "/api-buy-nft",
                data: JSON.stringify(json_data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                complete: function(data){
                    console.log(data);
                    // window.location.replace("/nft-collections");
                    window.location.href = "/nft-collections";

                },
                failure: function(errMsg) {alert(errMsg);}
            });
        }
        else {
            //some code
        }
    })
});