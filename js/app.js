$(function(){
    // alert('ok');
    setTimeout(function(){
        $("#browse-link").trigger('click');
        $("#clipart-category-custom").prepend("<div class='text-right'><button class=\"btn btn-sm btn-primary\">อัปโหลดจากคอมพิวเตอร์</button></div>");
    },1000);
    $("#artwork--back-link .remove-image").on("click", function () {
        $("#browse-link").trigger('click');
    });
    $(".change-artwork-image .remove-image").on("click", function () {
        $("#browse-link").trigger('click');
    });

    $("#fileImage").on('click', function () {
        let theVal = 'custom';
        $('#clipart-select option').removeAttr('selected').filter('[value=' + theVal + ']').attr('selected', true);
        $('#clipart-select').trigger('change');
    })
    $("#fileImage").on('change', function(){
        var formData = new FormData();
        formData.append('file', $('#fileImage')[0].files[0]);
        let html = '';
        $.ajax({
            url: '/upload.php',
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (data) {
                data = JSON.parse(data);
                html = `
                <li data-clipfile="${data.clipartFile}" class="clip-image-active">
                    <img 
                        src="${data.storagePath}/${data.clipartFile}" 
                        alt="${data.clipartName}" 
                        title="${data.clipartName}" 
                        data-nw="${data.xSize}" 
                        data-nh="${data.ySize}" 
                        data-nr="${data.r}" 
                        data-nrx="${data.rx}" 
                        data-nry="${data.ry}">
                </li>`;
                console.log(html);
                $("#clipart-category-custom ul").append(html);
                $(".clip-image-active").trigger('click');
            }
        });
    });
});