$(document).ready(function() {
    // Hide Most Options
    $(".select_action").addClass("action_selected");
    $(".insert_action").addClass("action_selected");
    $(".update_action").addClass("action_selected");
    $(".delete_action").addClass("action_selected");
    
    // Default Three Options
    $("#case1_selectDiv").removeClass("action_selected");
    $("#case2_selectDiv").removeClass("action_selected");
    $("#case3_insertDiv").removeClass("action_selected");
    
    // Listen to change
    /*for (var i=1;i<4;i++) {
        var identifier = "#case" + i + "_action_dropdown";
        $(identifier).change(function() {
            var val = $(identifier).val();
            switch(val) {
                case "SELECT ":
                    var classIdentifier = ".case" + i + "_actions";
                    $(classIdentifier).removeClass('action_selected');
                    $("#case" + i + "_selectDiv").addClass('action_selected');
                break;
                case "INSERT INTO ":
                    var classIdentifier = ".case" + i + "_actions";
                    $(classIdentifier).removeClass('action_selected');
                    $("#case" + i + "_insertDiv").addClass('action_selected');
                break;
                case "UPDATE ":
                    var classIdentifier = ".case" + i + "_actions";
                    $(classIdentifier).removeClass('action_selected');
                    $("#case" + i + "_updateDiv").addClass('action_selected');
                break;
                case "DELETE FROM ":
                    var classIdentifier = ".case" + i + "_actions";
                    $(classIdentifier).removeClass('action_selected');
                    $("#case" + i + "_deleteDiv").addClass('action_selected');
                break;
            }
        });
    }*/
    
    $("#case1_action_dropdown").change(function() {
        var val = $("#case1_action_dropdown").val();
        switch(val) {
            case "SELECT ":
                $("#case1_selectDiv").removeClass("action_selected");
                break;
        }
    });
    
    $("#case2_action_dropdown").change(function() {
        var val = $("#case2_action_dropdown").val();
        switch(val) {
            case "SELECT ":
                $(".case2_filters").empty();
                $(".case2_actions").addClass("action_selected");
                $("#case2_selectDiv").removeClass("action_selected");
                break;
            case "INSERT INTO ":
                $(".case2_filters").empty();
                $(".case2_actions").addClass("action_selected");
                $("#case2_insertDiv").removeClass("action_selected");
                break;
            case "UPDATE ":
                $(".case2_filters").empty();
                $(".case2_actions").addClass("action_selected");
                $("#case2_updateDiv").removeClass("action_selected");
                break;  
            case "DELETE FROM ":
                $(".case2_filters").empty();
                $(".case2_actions").addClass("action_selected");
                $("#case2_deleteDiv").removeClass("action_selected");
                break;
        }
    });
    
    $("#case3_action_dropdown").change(function() {
        var val = $("#case3_action_dropdown").val();
        switch(val) {
            case "INSERT INTO ":
                $(".case3_filters").empty();
                $(".case3_actions").addClass("action_selected");
                $("#case3_insertDiv").removeClass("action_selected");
                break;
            case "UPDATE ":
                $(".case3_filters").empty();
                $(".case3_actions").addClass("action_selected");
                $("#case3_updateDiv").removeClass("action_selected");
                break;  
            case "DELETE FROM ":
                $(".case3_filters").empty();
                $(".case3_actions").addClass("action_selected");
                $("#case3_deleteDiv").removeClass("action_selected");
                break;
        }
    });
    
    // Filtering Option Listener
    var ctr1 = 0;
    $(".case1_filterAdd").click(function(){
        ctr1++;
        
        var columnNames = $(".case1_filterAdd").attr('colName').split(",");
        var operators = $(".case1_filterAdd").attr('op').split(",");
        
        var append1 = "<select id='case1_filter" + ctr1 + "'>";
        for(var j=0;j<columnNames.length;j++) { 
            append1 += "<option value='"+columnNames[j]+"'>"+columnNames[j]+"</option>"; 
        } 
        append1 += "</select><select id='case1_operator" + ctr1 + "'>";
        for(var i=0;i<operators.length;i++) { 
            append1 += "<option value='"+operators[i]+"'>"+operators[i]+"</option>";
         } 
         append1 += "</select><input type='text' id='case1_filter" + ctr1 + "_text'><br><br>";

        $(".case1_filters").append(append1);
    });
    
    var ctr2 = 0;
    $(".case2_filterAdd").click(function(){
        ctr2++;
        
        var columnNames = $(".case2_filterAdd").attr('colName').split(",");
        var operators = $(".case2_filterAdd").attr('op').split(",");
        
        var append2 = "<select id='case2_filter" + ctr2 + "'>";
        for(var j=0;j<columnNames.length;j++) { 
            append2 += "<option value='"+columnNames[j]+"'>"+columnNames[j]+"</option>"; 
        } 
        append2 += "</select><select id='case2_operator" + ctr2 + "'>";
        for(var i=0;i<operators.length;i++) { 
            append2 += "<option value='"+operators[i]+"'>"+operators[i]+"</option>";
         } 
         append2 += "</select><input type='text' id='case2_filter" + ctr2 + "_text'><br><br>";

        $(".case2_filters").append(append2);
    });
    
    var ctr3 = 0;
    $(".case3_filterAdd").click(function(){
        ctr3++;
        var columnNames = $(".case3_filterAdd").attr('colName').split(",");
        
        var operators = $(".case3_filterAdd").attr('op').split(",");
        
        var append3 = "<select id='case3_filter" + ctr3 + "'>";
        for(var j=0;j<columnNames.length;j++) { 
            append3 += "<option value='"+columnNames[j]+"'>"+columnNames[j]+"</option>"; 
        } 
        append3 += "</select><select id='case3_operator" + ctr3 + "'>";
        for(var i=0;i<operators.length;i++) { 
            append3 += "<option value='"+operators[i]+"'>"+operators[i]+"</option>";
         } 
         append3 += "</select><input type='text' id='case3_filter" + ctr3 + "_text'><br><br>";

        $(".case3_filters").append(append3);
    });
    
    // Submit Query
    $("#submitQueryForm").submit(function(e) {
        e.preventDefault();
        
        var $runCases = $("input[name=transaction_checkbox]:checked");
        if ($runCases.length == 0) {
            $("#console_textarea").text("You need to check one of the cases before running.");
            return false;
        } 
        else {
            var case1 = $("#trans_chkBox_1").val();
            if ($("#trans_chkBox_1").is(":checked")) {
                var case1Query = '';

                case1Query += $("#case1_action_dropdown").val() + "* ";
                case1Query += "FROM " + $("#case1_area_dropdown").val();
            
                $.ajax({
                    type        : 'POST',
                    url         : 'submitQuery',
                    data        : {newQuery: case1Query},
                    dataType    : 'text',
                    success     : function(data) {
                                    //console.log(data);
                                    $("#console_textarea").text();
                                    $("#console_textarea").text(data);
                                  }
                });
                return true;
            }
        }
    });
});