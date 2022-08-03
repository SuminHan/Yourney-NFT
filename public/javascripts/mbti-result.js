$(function(){
    $('#range1').on('change', function(){
        var cur = this.value;
        $('#num-label1').html(cur + '%');
    });

    $('#range2').on('change', function(){
        var cur = this.value;
        $('#num-label2').html(cur + '%');
    });

    $('#range3').on('change', function(){
        var cur = this.value;
        $('#num-label3').html(cur + '%');
    });

    $('#range4').on('change', function(){
        var cur = this.value;
        $('#num-label4').html(cur + '%');
    });

    var tcur = $('#range1').val();  $('#num-label1').html(tcur + '%');
    var tcur = $('#range2').val();  $('#num-label2').html(tcur + '%');
    var tcur = $('#range3').val();  $('#num-label3').html(tcur + '%');
    var tcur = $('#range4').val();  $('#num-label4').html(tcur + '%');
    

    // $('#range1').on('change', function(){
    //     var cur = this.value;
    //     // $('#num-label1').html(cur*10 + '%');
    // });

    
    // $('#num-label2').html('OH...');
    // $('#num-label3').html('WOW!');
    // $('#num-label4').html('AMAZING!!!');

});