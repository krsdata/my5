
function get_match(id) {
    var id = id;   
    $.ajax({
        type : 'post',       
        url: SITE_URL+'/notification/get_contest_by_matchid',
        data : { id : id },
        success : function(data) {
            $('#contest_id').html(data);
        }
    });
};


function get_players() {
    var id = $('#team_id').val();   

    $.ajax({
        type : 'post',       
        url: SITE_URL+'/players/get_players_by_teamid',
        data : { id : id },
        success : function(data) {
        	$('#player_hide').hide();
            $('#player_show').html(data);
        }
    });
};


$(function() {
    $("#ReferralUpdate").validate(
    {
        rules: {  Rreferral: "required" },
        messages: {
            Rreferral: "Please enter your Referral code"
        },
        submitHandler: function(form) {
            var RuserId = $('#RuserId').val();   
            var Rreferral = $('#Rreferral').val();   
            $.ajax({
                type : 'post',       
                url: SITE_URL+'/user/UpdateReferral',
                data : { RuserId : RuserId,Rreferral:Rreferral },
                success : function(data) {
                    if(data == "Success")
                    {
                        $("#NewReferral"+RuserId).html(Rreferral);
                        $('#ReferralClose').trigger('click');
                        alertify.success("Referral Code Update successfully");
                    } 
                    else if(data == "Exist")
                    {
                        $("#errorReferral").text("Referral Code alredy Exist").css({"color":"red"});
                        alertify.error("Referral Code alredy Exist");
                    } 
                    else
                    {
                        alertify.error("Please try again Some error occured");
                    }   
                    
                }
            });
        }
    });
});

$(".referral_codeModel").click(function () {
    var email = $(this).attr('data-email');
    var user_id = $(this).attr('data-id');
    var referral = $("#NewReferral"+user_id).html(); //$(this).attr('data-code');
    $("#RUserEmail").html(email);
    $("#Rreferral").val(referral);
    $("#RuserId").val(user_id);
});

function ReferralExist()
{
    var RuserId = $('#RuserId').val();   
    var Rreferral = $('#Rreferral').val();   
     $.ajax({
        type : 'post',       
        url: SITE_URL+'/user/ReferralExist',
        data : { RuserId : RuserId,Rreferral:Rreferral },
        success : function(data) {
            if(data == "Success")
            {
                $("#errorReferral").text("Referral Code alredy Exist").css({"color":"red","display":"block"});
            } 
            else if(data == "No")
            {
                $("#errorReferral").css({"display":"none"});
            }
        }
    });
};