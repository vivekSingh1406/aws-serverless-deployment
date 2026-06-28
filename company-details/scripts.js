$("#saveCompany").click(function(){

    var file=$("#companyFile")[0].files[0];

    if(file==null){
        alert("Please choose file");
        return;
    }

    var reader=new FileReader();

    reader.onload=function(){

        var base64=reader.result.split(",")[1];

        var request={

            companyName:$("#companyName").val(),

            address:$("#address").val(),

            work:$("#work").val(),

            revenue:$("#revenue").val(),

            fileName:file.name,

            fileType:file.type,

            fileData:base64

        };

        $.ajax({

            url:INSERT_API,

            type:"POST",

            data:JSON.stringify(request),

            contentType:"application/json",

            success:function(){

                $("#message").html("Company Saved Successfully");

                loadCompanies();

                clearForm();

            },

            error:function(){

                alert("Unable to Save");

            }

        });

    };

    reader.readAsDataURL(file);

});


$("#getCompanies").click(function(){

    loadCompanies();

});


function loadCompanies(){

    $.ajax({

        url:GET_API,

        type:"GET",

        success:function(response){

            var companies=response;

            if(typeof(response)=="string"){

                companies=JSON.parse(response);

            }

            $("#companyTable tbody").empty();

            $.each(companies,function(i,data){

                var row="<tr>";

                row+="<td>"+data.companyName+"</td>";

                row+="<td>"+data.address+"</td>";

                row+="<td>"+data.work+"</td>";

                row+="<td>"+data.revenue+"</td>";

                row+="<td><a href='"+data.fileUrl+"' target='_blank'>Open File</a></td>";

                row+="</tr>";

                $("#companyTable tbody").append(row);

            });

        },

        error:function(){

            alert("Unable to fetch data");

        }

    });

}


function clearForm(){

    $("#companyName").val("");

    $("#address").val("");

    $("#work").val("");

    $("#revenue").val("");

    $("#companyFile").val("");

}