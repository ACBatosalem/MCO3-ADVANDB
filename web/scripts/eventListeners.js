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
                $(".case2_actions").addClass("action_selected");
                $("#case2_selectDiv").removeClass("action_selected");
                break;
            case "INSERT INTO ":
                $(".case2_actions").addClass("action_selected");
                $("#case2_insertDiv").removeClass("action_selected");
                break;
            case "UPDATE ":
                $(".case2_actions").addClass("action_selected");
                $("#case2_updateDiv").removeClass("action_selected");
                break;  
            case "DELETE FROM ":
                $(".case2_actions").addClass("action_selected");
                $("#case2_deleteDiv").removeClass("action_selected");
                break;  
        }
    });
    
    $("#case3_action_dropdown").change(function() {
        var val = $("#case3_action_dropdown").val();
        switch(val) {
            case "INSERT INTO ":
                $(".case3_actions").addClass("action_selected");
                $("#case3_insertDiv").removeClass("action_selected");
                break;
            case "UPDATE ":
                $(".case3_actions").addClass("action_selected");
                $("#case3_updateDiv").removeClass("action_selected");
                break;  
            case "DELETE FROM ":
                $(".case3_actions").addClass("action_selected");
                $("#case3_deleteDiv").removeClass("action_selected");
                break;  
        }
    });
    
    // Filtering Option Listener
    var ctr1 = 0;
    $("#case1_filterAdd").click(function(){
        ctr1++;
        var columnNames = $("#case1_filterAdd").attr('colName').split(",");
        
        var operators = $("#case1_filterAdd").attr('op').split(",");
        
        var append1 = "<select id='case1_filter" + ctr1 + "'>";
        for(var j=0;j<columnNames.length;j++) { 
            append1 += "<option value='"+columnNames[j]+"'>"+columnNames[j]+"</option>"; 
        } 
        append1 += "</select><select id='case1_operator" + ctr1 + "'>";
        for(var i=0;i<operators.length;i++) { 
            append1 += "<option value='"+operators[i]+"'>"+operators[i]+"</option>";
         } 
         append1 += "</select><input type='text' id='case1_filter" + ctr1 + "_text'>";
        console.log(append1);
        $("#case1_filterAdd").after(append1);
    });
});