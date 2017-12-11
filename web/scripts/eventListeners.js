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
    
    var ctr1 = 0, ctr2 = 0, ctr3 = 0;
    
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
        //$(".case2_filters").remove();
        //$(".case2_filterAdd").remove();
        var val = $("#case2_action_dropdown").val();
        switch(val) {
            case "SELECT ":
                ctr2 = 0;
                //addFilterDiv(2, val);
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
                ctr2 = 0;
                //addFilterDiv(2, val);
                $(".case2_filters").empty();
                $(".case2_actions").addClass("action_selected");
                $("#case2_updateDiv").removeClass("action_selected");
                break;  
            case "DELETE FROM ":
                ctr2 = 0;
                //addFilterDiv(2, val);
                $(".case2_filters").empty();
                $(".case2_actions").addClass("action_selected");
                $("#case2_deleteDiv").removeClass("action_selected");
                break;
        }
    });
    
    $("#case3_action_dropdown").change(function() {
        //$(".case3_filters").remove();
        //$(".case3_filterAdd").remove();
        var val = $("#case3_action_dropdown").val();
        switch(val) {
            case "INSERT INTO ":
                $(".case3_filters").empty();
                $(".case3_actions").addClass("action_selected");
                $("#case3_insertDiv").removeClass("action_selected");
                break;
            case "UPDATE ":
                ctr3 = 0;
                //addFilterDiv(3, val);
                $(".case3_filters").empty();
                $(".case3_actions").addClass("action_selected");
                $("#case3_updateDiv").removeClass("action_selected");
                break;  
            case "DELETE FROM ":
                ctr3 = 0;
                //addFilterDiv(3, val);
                $(".case3_filters").empty();
                $(".case3_actions").addClass("action_selected");
                $("#case3_deleteDiv").removeClass("action_selected");
                break;
        }
    });
    
    function addFilterDiv(caseNum, actionType) {
        var divCode = "<input type='button' class='case" + caseNum + "_filterAdd name='case" + caseNum + "_filterAdd' value='Add Filtering Option' colName=<%=columnNames%>' op='<%=operators%>'><div class='filter_options case" + caseNum + "_filters'></div>";
        if (actionType === "SELECT ")
            $("#case" + caseNum + "_selectDiv").append(divCode);
        else if (actionType === "UPDATE ")
            $("#case" + caseNum + "_updateDiv").append(divCode);
        else if (actionType === "DELETE FROM ")
            $("#case" + caseNum + "_deleteDiv").append(divCode);
    }
    
    function buttonListener(caseNumber, actionType, counter) {
        counter++;
        var columnNames = $(".case" + caseNumber + "_filterAdd_" + actionType).attr('colName').split(",");
        var operators = $(".case" + caseNumber + "_filterAdd_" + actionType).attr('op').split(",");

        var append = "<select class='case" + caseNumber + "_fields_" + actionType + " case" + caseNumber + "_field" + counter + "' name='case" + caseNumber + "_fields_" + actionType + "'>";
        for(var j=0;j<columnNames.length;j++)
            append += "<option value='" + columnNames[j] + "'>" + columnNames[j] + "</option>";
        append += "</select><select class='case" + caseNumber + "_operator" + counter + " case" + caseNumber + "_operators_" + actionType + "'>";
        for(var i=0;i<operators.length;i++)
            append += "<option value='" + operators[i] + "'>" + operators[i] + "</option>"; 
         append += "</select><input type='text' class='case" + caseNumber + "_filter" + counter + "_text_" + actionType + "'><br><br>";

        //console.log(".case" + caseNumber + "_filters_" + actionType);
        $(".case" + caseNumber + "_filters_" + actionType).append(append);
        return counter;
    }
    
    $(".case1_filterAdd_select").click(function() {
       ctr1 = buttonListener(1, "select", ctr1);
    });
    $(".case2_filterAdd_select").click(function() {
       ctr2 = buttonListener(2, "select", ctr2); 
    });
    $(".case2_filterAdd_update").click(function() {
       ctr2 = buttonListener(2, "update", ctr2); 
    });
    $(".case2_filterAdd_delete").click(function() {
       ctr2 = buttonListener(2, "delete", ctr2); 
    });
    $(".case3_filterAdd_update").click(function() {
       ctr3 = buttonListener(3, "update", ctr3); 
    });
    $(".case3_filterAdd_delete").click(function() {
       ctr3 = buttonListener(3, "delete", ctr3); 
    });
    
    // Filtering Option Listener
    /*$(".case1_filterAdd_select").click(function(){
        ctr1++;
        
        var columnNames = $(".case1_filterAdd_select").attr('colName').split(",");
        var operators = $(".case1_filterAdd_select").attr('op').split(",");
        
        var append1 = "<select class='case1_fields case1_field" + ctr1 + "'>";
        for(var j=0;j<columnNames.length;j++) { 
            append1 += "<option value='"+columnNames[j]+"'>"+columnNames[j]+"</option>"; 
        } 
        append1 += "</select><select class='case1_operator" + ctr1 + "'>";
        for(var i=0;i<operators.length;i++) { 
            append1 += "<option value='"+operators[i]+"'>"+operators[i]+"</option>";
         } 
         append1 += "</select><input type='text' class='case1_filter" + ctr1 + "_text'><br><br>";

        $(".case1_filters_select").append(append1);
    });

    $(".case2_filterAdd").click(function(){
        ctr2++;
        
        var columnNames = $(".case2_filterAdd").attr('colName').split(",");
        var operators = $(".case2_filterAdd").attr('op').split(",");
        
        var append2 = "<select class='case2_fields case2_field" + ctr2 + "'>";
        for(var j=0;j<columnNames.length;j++) { 
            append2 += "<option value='"+columnNames[j]+"'>"+columnNames[j]+"</option>"; 
        } 
        append2 += "</select><select class='case2_operator" + ctr2 + "'>";
        for(var i=0;i<operators.length;i++) { 
            append2 += "<option value='"+operators[i]+"'>"+operators[i]+"</option>";
         } 
         append2 += "</select><input type='text' class='case2_filter" + ctr2 + "_text'><br><br>";

        $(".case2_filters").append(append2);
    });
    
    $(".case3_filterAdd").click(function(){
        ctr3++;
        var columnNames = $(".case3_filterAdd").attr('colName').split(",");
        
        var operators = $(".case3_filterAdd").attr('op').split(",");
        
        var append3 = "<select  class='case3_fields case3_field" + ctr3 + "'>";
        for(var j=0;j<columnNames.length;j++) { 
            append3 += "<option value='"+columnNames[j]+"'>"+columnNames[j]+"</option>"; 
        } 
        append3 += "</select><select class='case3_operator" + ctr3 + "'>";
        for(var i=0;i<operators.length;i++) { 
            append3 += "<option value='"+operators[i]+"'>"+operators[i]+"</option>";
         } 
         append3 += "</select><input type='text' class='case3_filter" + ctr3 + "_text'><br><br>";

        $(".case3_filters").append(append3);
    });*/
    
    // Submit Query
    $("#submitQueryForm").submit(function(e) {
        e.preventDefault();
        
        var dbFields = ["ID", "CountryName", "CountryRegion", "CountryIncome", "SeriesName", "Year", "Data"];
        
        var $allCases = $("input[name=transaction_checkbox]");
        var $runCases = $("input[name=transaction_checkbox]:checked");
        if ($runCases.length == 0) {
            $("#console_textarea").text("You need to check one of the cases before running.");
            return false;
        } 
        else {
            var caseQuery = '';
            var caseNumber;
            $allCases.each(function(index, element) {
                if ($(element).is(":checked")) {
                    caseNumber = index + 1;
                    if($("#abortCB").is(":checked"))
                        $("#abort").val("yes");
                    else $("#abort").val("no");
                    $("#actionType").val($("#case" + caseNumber + "_action_dropdown").val());
                    $("#node").val($("#case" + caseNumber + "_area_dropdown").val());
                    var actionType = $("#case" + caseNumber + "_action_dropdown").val();
                    caseQuery += actionType;
                    switch(actionType) {
                        case "SELECT ":
                            caseQuery += "* ";
                            caseQuery += "FROM " + $("#case" + caseNumber + "_area_dropdown").val();
                            
                            console.log("select[name=case" + caseNumber + "_fields_select]");
                            var $allFilters = $("select[name=case" + caseNumber + "_fields_select]");
                            if ($allFilters.length > 0) {
                                caseQuery += " WHERE ";
                                var multi = false;
                                $allFilters.each(function(ind, el) {
                                    var caseCtr = ind + 1;
                                    console.log($(el).val());
                                    if ($(".case" + caseNumber + "_filter" + caseCtr + "_text_select").val() != "") {
                                        if (multi)
                                            caseQuery += " AND ";
                                        if($(el).val() == "ID" || $(el).val() == "Data")
                                            caseQuery += $(el).val() + " " + $(".case" + caseNumber + "_operators_select").val() + " " + $(".case" + caseNumber + "_filter" + caseCtr + "_text_select").val();
                                        else caseQuery += $(el).val() + " " + $(".case" + caseNumber + "_operators_select").val() + " '" + $(".case" + caseNumber + "_filter" + caseCtr + "_text_select").val() + "'";
                                        multi = true;
                                    }
                                });
                            }
                            else {
                                console.log($allFilters.length);
                            }
                            break;
                        case "INSERT INTO ":
                            caseQuery += $("#case" + caseNumber + "_area_dropdown").val() + " (CountryName, CountryRegion, CountryIncome, SeriesName, Year, Data) VALUES (";
                            for (var k=1;k<dbFields.length;k++) {
                                if(k == dbFields.length-1)
                                    caseQuery += $("#case" + caseNumber + "_insert_" + dbFields[k]).val();
                                else caseQuery += "'" + $("#case" + caseNumber + "_insert_" + dbFields[k]).val() + "'";
                                if (dbFields.length - 1 != k)
                                    caseQuery += ", ";
                            }
                            caseQuery += ")";
                            break;
                        case "UPDATE ":
                            var multiple = false;
                            caseQuery += $("#case" + caseNumber + "_area_dropdown").val() + " SET ";
                            for (var k=1;k<dbFields.length;k++) {
                                if ($("#case" + caseNumber + "_update_" + dbFields[k]).val().length > 0) {
                                    if (multiple)
                                        caseQuery += ", ";
                                    if(dbFields[k] == "Data")
                                        caseQuery += dbFields[k] + " = " + $("#case" + caseNumber + "_update_" + dbFields[k]).val();
                                    else caseQuery += dbFields[k] + " = '" + $("#case" + caseNumber + "_update_" + dbFields[k]).val() + "'";
                                    multiple = true;
                                }
                            }
                            
                            var $allFilters = $("select[name=case" + caseNumber + "_fields_update]");
                            if ($allFilters.length > 0) {
                                caseQuery += " WHERE ";
                                var multi = false;
                                $allFilters.each(function(ind, el) {
                                    var caseCtr = ind + 1;
                                    
                                    if ($(".case" + caseNumber + "_filter" + caseCtr + "_text_update").val() > 0) {
                                        if (multi)
                                            caseQuery += " AND ";
                                        if($(el).val() == "ID")
                                            caseQuery += $(el).val() + " " + $(".case" + caseNumber + "_operators_update").val() + " " + $(".case" + caseNumber + "_filter" + caseCtr + "_text_update").val();
                                        else caseQuery += $(el).val() + " " + $(".case" + caseNumber + "_operators_update").val() + " '" + $(".case" + caseNumber + "_filter" + caseCtr + "_text_update").val() + "'";
                                        multi = true;
                                    }
                                });
                            }
                            break;
                        case "DELETE FROM ":
                            caseQuery += $("#case" + caseNumber + "_area_dropdown").val();
                            
                            var $allFilters = $("select[name=case" + caseNumber + "_fields_delete]");
                            if ($allFilters.length > 0) {
                                caseQuery += " WHERE ";
                                var multi = false;
                                $allFilters.each(function(ind, el) {
                                    var caseCtr = ind + 1;
                                    if ($(".case" + caseNumber + "_filter" + caseCtr + "_text_delete").val() > 0) {
                                        if (multi)
                                            caseQuery += " AND ";
                                        if($(el).val() == "ID")
                                            caseQuery += $(el).val() + " " + $(".case" + caseNumber + "_operators_delete").val() + " " + $(".case" + caseNumber + "_filter" + caseCtr + "_text_delete").val();
                                        else caseQuery += $(el).val() + " " + $(".case" + caseNumber + "_operators_delete").val() + " '" + $(".case" + caseNumber + "_filter" + caseCtr + "_text_delete").val() + "'";
                                        multi = true;
                                    }
                                });
                            }
                            break;
                    }
                    caseNumber++;
                    caseQuery += "; ";
                }
            });
            $("#newQuery").val(caseQuery);
            console.log(caseQuery);
            this.submit();
            
            /*var case1 = $("#trans_chkBox_1").val();
            if ($("#trans_chkBox_1").is(":checked")) {
                var case1Query = '';

                case1Query += $("#case1_action_dropdown").val() + "* ";
                case1Query += "FROM " + $("#case1_area_dropdown").val();
                $("#newQuery").val(case1Query);
                console.log($("#newQuery").val());
                this.submit();
                return true;
            }*/
            //if ($("#"))
        }
    });
});