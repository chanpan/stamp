<!DOCTYPE html>
<html>

<head id="ctl00_Head1">

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta id="ctl00_MetaKeywords" name="Keywords" />
    <meta id="ctl00_MetaDescription" name="Description"
        content="See, design, &amp; buy custom rubber stamps, including pre-inked address stampers and date stamps - plus more. Most ship in 1 day!" />

    <link href="./css/normalize.css" rel="stylesheet">
    <link href="./css/foundation.min.css" rel="stylesheet">
    <link href="./css/responsive-tables.css" rel="stylesheet">
    <link href="./css/webicons.css" rel="stylesheet">
    <link href="./css/styles.css" rel="stylesheet">
    <link href="./css/designer.css" rel="stylesheet">
    <link href="./css/UploadImage.css" rel="stylesheet">
    <!-- Latest compiled and minified CSS -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->

    <script src="./jquery.min.js"></script>
    <script src="./bootstrap/js/bootstrap.min.js"></script>
    <script src="./js/custom.modernizr.js"></script>

    <script src="./js/responsive-tables.js"></script>
    <script src="./js/foundation.min.js"></script>
    <script src="./js/foundation.dropdown.js"></script>
    <script src="./js/foundation.topbar.js"></script>
    <script src="./js/custom.js"></script>
    <script src="./js/html2canvas.min.js"></script>

    <!-- Latest compiled and minified CSS -->
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->
    <!-- Optional theme -->

    <!-- Latest compiled and minified JavaScript -->


    <script>
    $(document).ready(function() {
        $(document).foundation();
    });
    </script>
    <script type="text/javascript">
    var upli_id = '5902';
    var upli_btn_idle_text = 'Browse...';

    function upli_updatecontrol() {
        setTimeout(function() {
            __doPostBack('ctl00_MainContentHolder_caUploadUpdatePanel', upli_id);
        }, 10);
    }
    </script>



<body style='padding:20px;'>
    <!-- <img src="" id='ShowImage' /> -->
    <form name="aspnetForm" method="post" id="aspnetForm">
        <script type="text/javascript">
        //init ค่าเริ่มต้งตรงการ สีเหลี่ยมสีขาว
        var _bvLoggedIn = 0;

        function bvLoggedIn(_lis) {
            return _lis == undefined ? _bvLoggedIn : _bvLoggedIn = _lis;
        };
        </script>
        <div id="stamp-designer">
            <h1>ออกแบบตรายางที่กำหนดเอง</h1>
            <div class="row" id='captureScreen'>
                <div class="large-6 columns">
                    <div class="hideforlowres">
                        <h4>ขั้นตอนที่ 1 ออกแบบแสตมป์ของคุณ</h4>
                        <p class="regularstamp" style="font-weight:normal;display:none">หมายเหตุ:
                            การออกแบบแสตมป์ต้องไม่เกิน 12.5x12.5 cm.</p>
                    </div>
                    <!-- Tabs -->
                    <div class="section-container tabs clearfix" data-section="tabs" data-options="deep_linking: true">
                        <section class="active">
                            <p class="title" data-section-title>
                                <a id="tabs--text-a" href="javascript:void(0);">
                                    <img src="./images/designer/icon-text.svg" class="hideforlowres" />
                                    <span>ข้อความ</span>
                                </a>
                            </p>
                            <div id="tabs--text" class="content" data-section-content>
                                <h3>เพิ่มข้อความในตราประทับของคุณ</h3>
                                <div id="group00" data-textgroup-id="0">
                                    <div id="tabs--groupheader00"></div>
                                    <div class="text-editor-holder">
                                        <div id="text00-00" class="row text-editor tight" data-target-id="0">
                                            <div class="large-5 columns">
                                                <input type="text" id="text00-00--input"
                                                    placeholder="ป้อนข้อความที่นี่ ...">
                                            </div>
                                            <div class="small-6 large-4 columns">
                                                <select class="text-font small">
                                                    <option value="THSarabunNew" class="font-addington-times">
                                                        THSarabunNew</option>
                                                    <option value="Articulat CF v2">Articulat</option>
                                                    <option value="Greycliff CF">Greycliff</option>
                                                    <option value="Engravers Gothic FS">Engravers Gothic</option>
                                                    <option value="Florence Script FS">Florence Script</option>
                                                    <option value="Addington CF">Addington Times</option>
                                                    <option value="Loveletter Script">Love Letters</option>
                                                    <option value="Jenna">Jenna</option>
                                                    <option value="Zakia">Zakia</option>

                                                </select>
                                            </div>
                                            <div class="small-6 large-3 columns">
                                                <select class="text-size small" style="width:75px;">
                                                    <option value="7">7 pt</option>
                                                    <option value="8">8 pt</option>
                                                    <option value="9">9 pt</option>
                                                    <option value="10">10 pt</option>
                                                    <option value="11">11 pt</option>
                                                    <option value="12">12 pt</option>
                                                    <option value="14">14 pt</option>
                                                    <option value="14">16 pt</option>
                                                    <option value="18">18 pt</option>
                                                    <option value="24">24 pt</option>
                                                    <option value="36">36 pt</option>
                                                    <option value="48">48 pt</option>
                                                    <option value="60">60 pt</option>
                                                    <option value="72">72 pt</option>
                                                    <option value="96">96 pt</option>
                                                </select>
                                            </div>
                                            <div class="large-12 columns tabs--text-icons" style="padding-bottom:10px;">
                                                <!--
                                            <input type="number" class="text-size" name="text-size" value="7" min="7" max="100" maxlength="3" size="3" /> pt
                                            -->

                                                <!--
                                            </div>
                                            <div class="tabs--text-icons large-5 columns">
                                            -->
                                                <a href="javascript:void(0);"><img
                                                        src="./images/designer/icon-left-align.svg" class="align-left"
                                                        alt="align left" /></a>
                                                <a href="javascript:void(0);"><img
                                                        src="./images/designer/icon-center-align.svg"
                                                        class="align-center" alt="align center" /></a>
                                                <a href="javascript:void(0);"><img
                                                        src="./images/designer/icon-right-align.svg" class="align-right"
                                                        alt="align right" /></a>
                                                <a href="javascript:void(0);"><img src="./images/designer/icon-bold.svg"
                                                        class="bold" alt="bold" /></a>
                                                <a href="javascript:void(0);"><img
                                                        src="./images/designer/icon-italic.png" class="italic"
                                                        alt="italic" /></a>
                                                <a href="javascript:void(0);"><img
                                                        src="./images/designer/icon-underline.png" class="underline"
                                                        alt="underline" /></a>
                                                <a href="javascript:void(0);" class="remove"><img
                                                        src="./images/designer/icon-close.svg" alt="remove" /></a>
                                            </div>


                                        </div>
                                    </div>
                                    <p style="margin-bottom:2em;">
                                        <a id="tabs--add-textline00" class="tabs--add-textline"
                                            href="javascript:void(0);">
                                            <img src="./images/designer/icon-plus.svg"
                                                alt="plus" />เพิ่มข้อความอีกหนึ่งบรรทัด

                                        </a>
                                    </p>

                                </div>
                                <!--
                            <p>
                                <a id="tabs--add-textline" href="javascript:void(0);">
                                    <img src="../../images/designer/icon-plus.svg" alt="plus">Add another line of text
                                </a>
                            </p>
                            -->
                            </div>
                        </section>



                        <section class="hidden">
                            <p class="title" data-section-title>
                                <a id="tabs--image-a" href="javascript:void(0);" id="d-image-tab">
                                    <img src="./images/designer/icon-image.svg" class="hideforlowres" />
                                    <span>รูปภาพ</span>
                                </a>
                            </p>
                            <div id="tabs--image" style="width:100%; height:100%; position:relative" class="content"
                                data-section-content>


                                <div id="artwork-overlay" class="wait" style="display:none;">
                                    <div>
                                        <span>
                                            Please wait...
                                        </span>
                                        <img src="./images/system/ajax-loader.gif" alt="processing" />
                                    </div>
                                </div>

                                <div id="artwork" class="clearfix">
                                    <a id="artwork--back-link" href="javascript:void(0);">&laquo; ย้อนกลับ</a>

                                    <section id="artwork--options" class="options active">
                                        <h3>เพิ่มอาร์ตเวิร์กในตราประทับของคุณ</h3>

                                        <label>
                                            <input type="radio" id="upload-link" name="artwork-links" value="upload">
                                            อัพโหลดภาพ
                                        </label>
                                        <label>
                                            <input type="radio" id="browse-link" name="artwork-links" value="browse">
                                            เรียกดูภาพตัดปะ
                                        </label>

                                    </section>



                                    <section id="artwork--upload">
                                        <h3>อัพโหลดภาพ</h3>

                                        <p>รูปแบบที่ยอมรับ: JPG, GIF, PNG<br />
                                            ความละเอียดที่ต้องการ: 300 หรือ 600 พิกเซล / นิ้ว </p>

                                        <div id="ctl00_MainContentHolder_caUploadUpdatePanel">

                                            <div id="UploadImageControl">





                                                <div id="ctl00_MainContentHolder_UploadImage1_UploadImagePanel">







                                                    <!-- The fileinput-button span is used to style the file input field as button -->
                                                    <span id="upli_btn" class="button success fileinput-button">

                                                        <i class="fa fa-file" aria-hidden="true"></i>
                                                        <span id="upli_btn_text">Browse...</span>
                                                        <!-- The file input field used as target for the file upload widget -->
                                                        <input id="fileupload" onclick="upli_allowed()" type="file"
                                                            name="files[]">
                                                    </span>
                                                    <br>
                                                    <br>
                                                    <div id="upli_container" class="progress">
                                                        <div class="progress-bar progress-bar-danger" role="progressbar"
                                                            aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                            style="">
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                    <br>
                                                    <!-- <font color="red"></font> -->

                                                </div>

                                            </div>

                                        </div>
                                    </section>

                                    <section id="artwork--browse">
                                        <h3>Browse Clipart</h3>

                                        <div class="row">
                                            <div class="large-6 columns">
                                                <select class="text-font small" id="clipart-select">
                                                    <option value="none">Select a gallery</option>
                                                    <option class="undefined" value="Animals">Animals</option>
                                                    <option class="undefined" value="Arrows">Arrows</option>
                                                    <option class="undefined" value="Basic_Recycling">Basic Recycling
                                                    </option>
                                                    <option class="undefined" value="Beach_&amp;_Summer">Beach &amp;
                                                        Summer</option>
                                                    <option class="undefined" value="Books">Books</option>
                                                    <option class="undefined" value="Business_&amp;_Occupations">
                                                        Business &amp; Occupations</option>
                                                    <option class="undefined" value="Christmas">Christmas</option>
                                                    <option class="undefined" value="Emojis">Emojis</option>
                                                    <option class="undefined" value="Flags_&amp;_Patriotic">Flags &amp;
                                                        Patriotic</option>
                                                    <option class="undefined" value="Flowers_&amp;_Plants">Flowers &amp;
                                                        Plants</option>
                                                    <option class="undefined" value="Food_&amp;_Drink">Food &amp; Drink
                                                    </option>
                                                    <option class="undefined" value="Hearts">Hearts</option>
                                                    <option class="undefined" value="Holiday">Holiday</option>
                                                    <option class="undefined" value="Kids">Kids</option>
                                                    <option class="undefined" value="Misc">Misc</option>
                                                    <option class="undefined" value="Music">Music</option>
                                                    <option class="undefined" value="Nautical">Nautical</option>
                                                    <option class="undefined" value="Real_Estate">Real Estate</option>
                                                    <option class="undefined" value="Recycling_Ecology">Recycling
                                                        Ecology</option>
                                                    <option class="undefined" value="Religious">Religious</option>
                                                    <option class="undefined" value="School_Teacher">School Teacher
                                                    </option>
                                                    <option class="undefined" value="Social_Media">Social Media</option>
                                                    <option class="undefined" value="Sports">Sports</option>
                                                    <option class="undefined" value="Stars">Stars</option>
                                                    <option class="undefined" value="Travel">Travel</option>
                                                    <option class="undefined" value="Trees_Leaves">Trees Leaves</option>
                                                    <option class="undefined" value="Wedding">Wedding</option>
                                                </select>
                                            </div>
                                            <div class="large-6 columns text-right">
                                                <a href="javascript:void(0);" class="button small clean"
                                                    id="gallery-position-link">Next: Position &amp; Scale</a>
                                            </div>
                                        </div>

                                        <div class="clipart-gallery">
                                            <div id="none" class="clipart-container" style="">
                                                <ul class="clipart-list">

                                                </ul>
                                            </div>
                                        </div>

                                    </section>

                                    <section id="artwork--library">

                                        <div class="row">
                                            <div class="large-6 columns">
                                                <h3>Browse My Images</h3>
                                            </div>
                                            <div class="large-6 columns text-right">
                                                <a href="javascript:void(0);" class="button small clean"
                                                    id="library-position-link">Next: Position &amp; Scale</a>
                                            </div>
                                        </div>

                                        <div class="clipart-gallery library-gallery">
                                            <div id="user-library" class="clipart-container">
                                                <ul class="clipart-list">

                                                </ul>
                                            </div>
                                        </div>


                                    </section>

                                    <section id="artwork--position">
                                        <h3>Resize &amp; Position Image</h3>
                                        <div class="row">
                                            <div class="large-3 columns selected-artwork-image">
                                                <img id="selected-artwork-image" src="" />
                                                <span id="clip-dimensions"></span>
                                            </div>

                                            <div class="large-9 columns change-artwork-image">
                                                <a href="javascript:void(0);" class="remove-image">
                                                    <img src="./images/designer/icon-close.svg" alt="remove" /> Remove
                                                </a>
                                            </div>
                                        </div>
                                        <hr />

                                        <div class="row">
                                            <div class="large-3 columns">
                                                <label class="inline">Image Size</label>
                                            </div>
                                            <div class="large-9 columns artwork-size-input">

                                                <div class="row">

                                                    <div class="large-4 columns">
                                                        <div class="row collapse">
                                                            <div class="small-3 columns">
                                                                <label class="prefix">W</label>
                                                            </div>
                                                            <div class="small-9 columns">
                                                                <input type="number" required id="image-size-width"
                                                                    name="image-size-width" value=".25" step=".01">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="large-4 columns">
                                                        <div class="row collapse">
                                                            <div class="small-3 columns">
                                                                <label class="prefix">H</label>
                                                            </div>
                                                            <div class="small-9 columns">
                                                                <input type="number" required id="image-size-height"
                                                                    name="image-size-height" value=".25" step=".01">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="large-4 columns">
                                                        <div class="row collapse">
                                                            <div class="small-3 columns">
                                                                <span class="prefix">%</span>
                                                            </div>
                                                            <div class="small-9 columns">




                                                                <input type="number" required id="image-size-percent"
                                                                    name="image-size-percent" value="10" step=".01">


                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="large-12 columns">
                                                        <span
                                                            style="font-weight:normal;font-size:13px;display:block;margin-bottom:10px;">The
                                                            proportions of your image will be maintained.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="large-3 columns">
                                                <label class="inline">Image Position</label>
                                            </div>
                                            <div id="position-controls"
                                                class="large-9 columns tabs--image-icons clearfix">
                                                <a href="javascript:void(0);" title="align top">
                                                    <img src="./images/designer/icon-image-align-top.svg"
                                                        class="align-image-top" alt="align top" />
                                                </a>
                                                <a href="javascript:void(0);" title="align bottom">
                                                    <img src="./images/designer/icon-image-align-bottom.svg"
                                                        class="align-image-bottom" alt="align bottom" />
                                                </a>
                                                <a href="javascript:void(0);" title="align left">
                                                    <img src="./images/designer/icon-image-align-left.svg"
                                                        class="align-image-left" alt="align left" />
                                                </a>
                                                <a href="javascript:void(0);" title="align right">
                                                    <img src="./images/designer/icon-image-align-right.svg"
                                                        class="align-image-right" alt="align right" />
                                                </a>
                                                <a href="javascript:void(0);" title="align center"
                                                    class="a-align-image-center">
                                                    <img src="./images/designer/icon-image-align-middle.svg"
                                                        class="align-image-center" alt="align center" />
                                                </a>
                                            </div>
                                        </div>

                                        <hr />
                                        <a href="javascript:void(0);" class="button clean"
                                            id="apply-image-link">Apply</a>
                                    </section>
                                </div>
                            </div>
                        </section>
                        <section class="hidden">
                            <p class="title" data-section-title>
                                <a id="tabs--border-a" href="javascript:void(0);">
                                    <img src="./images/designer/icon-border.svg" class="hideforlowres" />
                                    <span>ขอบ</span>
                                </a>
                            </p>
                            <div id="tabs--border" class="content" data-section-content>
                                <h3>เพิ่มเส้นขอบให้แสตมป์ของคุณ</h3>
                                <div id="border-styles" class="options clearfix">

                                    <label for="border1">
                                        <input id="border1" type="radio" name="stamp-border" value="no" checked>ไม่มีขอบ
                                    </label>



                                    <label for="border3">
                                        <input id="border3" type="radio" name="stamp-border" value="solid"> ขอบหนา
                                        <div class="border-solid"></div>
                                    </label>

                                    <label for="border4">
                                        <input id="border4" type="radio" name="stamp-border" value="dotted"> จุดไข่ปลา
                                        <div class="border-dotted"></div>
                                    </label>



                                </div>

                                <div class="row">
                                    <div class="large-2 columns">
                                        <label for="dropdown-border-weight" class="inline">น้ำหนัก</label>
                                    </div>
                                    <div class="large-10 columns">
                                        <select id="dropdown-border-weight">
                                            <option value="1.66666">ละเอียด (1 pt)</option>
                                            <option value="2.66667">บาง (2 pt)</option>
                                            <option value="5.33333">ปลานกลาง (4 pt)</option>
                                            <option value="8">หนา (6 pt)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="large-6 columns">
                    <div id="rulers">
                        <div id="svg-holder">
                            <div id="svg-sizer">
                                <svg id="s" preserveAspectRatio="xMidYMid" text-rendering="geometricPrecision"
                                    shape-rendering="geometricPrecision" image-rendering="geometricPrecision"
                                    viewBox="0 0 576 576"></svg>
                                <svg id="flrls" preserveAspectRatio="xMidYMid" text-rendering="geometricPrecision"
                                    viewBox="0 0 576 576">
                                    <defs>
                                        <marker id="flrls-s" orient="auto" refX="0" refY="0" style="overflow:visible">
                                            <polygon points="0 0, 4 4, 1.7 0, 4 -4, 0 0" />
                                        </marker>
                                        <marker id="flrls-e" orient="auto" refX="0" refY="0" style="overflow:visible">
                                            <polygon points="0 0, 4 4, 1.7 0, 4 -4, 0 0" transform="rotate(180)" />
                                        </marker>
                                    </defs>
                                    <g id="flrls-horz" transform="translate(288,0)">
                                        <g transform="scale(1.1) translate(0, 2)">
                                            <text text-anchor="middle" x="0" y="11.175" id="flrls-htext"
                                                style="font-size: 13.333px; font-family: THSarabunNew; font-weight: 400; font-style: normal;">.25"</text>
                                            <g id="flrls-hlines">
                                                <line x1="-45" y1="7.7" x2="-20" y2="7.7" stroke="#000"
                                                    stroke-width="1.4" marker-start="url(#flrls-s)" />
                                                <line x1="20" y1="7.7" x2="45" y2="7.7" stroke="#000" stroke-width="1.4"
                                                    marker-end="url(#flrls-e)" />
                                            </g>
                                        </g>
                                    </g>
                                    <g id="flrls-vert" transform="translate(288,288)">
                                        <g transform="scale(1.1) translate(2, 0)">
                                            <text transform="rotate(90) translate(0,-13.333)" x="0" text-anchor="middle"
                                                y="11.175" id="flrls-vtext"
                                                style="font-size: 13.333px; font-family: THSarabunNew; font-weight: 400; font-style: normal;">.22"</text>
                                            <g id="flrls-vlines">
                                                <line x1="7.7" y1="-45" x2="7.7" y2="-20" stroke="#000"
                                                    stroke-width="1.4" marker-start="url(#flrls-s)" />
                                                <line x1="7.7" y1="20" x2="7.7" y2="45" stroke="#000" stroke-width="1.4"
                                                    marker-end="url(#flrls-e)" />
                                            </g>

                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div id="footer-menu">
                        <div id="top-row">
                            <div id="dimensions-col">
                                <div id="dimensions-holder">
                                    <a href="javascript:void(0);" id="edit-dimensions-button">
                                        <img src="./images/designer/pencil.svg" alt="Edit">
                                    </a>
                                    <span id="dimensions">0.36" W x 0.36" H</span>

                                    <span id="autosize-label">(Autosize Off)</span>

                                </div>
                            </div>
                            <div id="shape-col">
                                <select id="shape-dropdown" name="shape-dropdown">
                                    <option value="square">Square</option>
                                    <option value="rectangle" selected="">Rectangle</option>
                                    <option value="circle">Circle</option>
                                    <option value="oval">Oval</option>
                                </select>
                            </div>
                        </div>

                        <div id="bottom-row">
                            <div class="row">
                                <div id="stamp-name" class="large-12 columns"><span id="stamp-name-label"></span></div>
                            </div>

                            <div class="row">
                                <div class="small-4 columns">
                                    <a href="javascript:void(0);" id="start-over-btn" class="small button clean">Start
                                        Over</a>
                                    <a href="javascript:void(0);" id="scalereset-btn" class="small button clean"
                                        style="position: relative; bottom: 0px; display: none;">Undo</a>
                                </div>
                                <div class="small-8 columns">

                                    <a href="javascript:void(0);" id="save-btn" class="small button clean">Login To
                                        Save</a>
                                    <a href="javascript:void(0);" id="proof-btn" class="small button clean">Proof</a>
                                </div>
                            </div>
                        </div>
                        <div id="ProductRow" style="font-size: 7pt">

                        </div>
                    </div>


                </div>
                <div id="step2"></div>

            </div>

        </div>
        <script type="text/javascript">
        const SVG_WIDTH = 576;
        const SVG_HEIGHT = 576;
        const SVG_CENTER_X = SVG_WIDTH / 2;
        const SVG_CENTER_Y = SVG_HEIGHT / 2;
        STROKE_COLOR = 'black';
        const FILL = 'white';
        //const MIN_STAMP_SIZE = 24;
        //const MAX_STAMP_SIZE = 576;
        const MAX_TEXT_LINES = 23;
        const STARTING_SIZE = 24; // 24
        const START_FONT = "THSarabunNew";
        const START_FONT_SIZE = 14; // Starting font size
        //const PADDING = START_FONT_SIZE / 4;
        const PADDING = 0; //TEST
        const MIN_STAMP_SIZE_X = 24; // TEST
        const MIN_STAMP_SIZE_Y = 24;

        const ENABLE_IMAGE = 1;
        const ENABLE_BORDER = 's00';
        var si;
        var initsi = {
            "p1": null,
            "width": 0,
            "height": 0,
            "fSelIdx": -1,
            "fSelColor": "",
            "fSelBvin": null,
            "user": null,
            "initialTemplate": "\u003cg id=\"gsvgimpression\" xml:space=\"default\" rsu:impressiongroups=\"s00:1\" rsu:layoutorder=\"s00\"\u003e\u003cg id=\"svgsubgroup00\" xml:space=\"default\" rsu:syncgroups=\"t00,g00\" rsu:align=\"top\" rsu:syncsize=\"full,center\" rsu:layoutorder=\"g00,t00\" rsu:dmsize=\"24,24\"\u003e\u003cg id=\"svgtextgroup00\" xml:space=\"default\" rsu:syncsize=\"best,center\" rsu:anchor=\"opposite,g00:o\"\u003e\u003c/g\u003e\u003cg id=\"svggraphicgroup00\" xml:space=\"default\" rsu:align=\"top\"\u003e\u003c/g\u003e\u003c/g\u003e\u003c/g\u003e",
            "allowedBodies": "[\"Maxlight,Rectangle,,,MAXLIGHT_XL_305|MAXLIGHT_XL_325,Premium - 50,000+ impressions\",\"Trodat,Rectangle,,,,Standard - 7,000+ impressions\", \"TheStampMaker.com,Rectangle,,,,Economy - for use with a stamp pad\"]",
            "initialBody": null,
            "templateProductId": "26980e28-cb46-4b7c-ac66-3675316e0750",
            "itemId": null,
            "itemIdType": 0
        };
        var brm = [

            {
                "ff": "THSarabunNew",
                "fn": "THSarabunNew",
                "bd": false,
                "it": false,
                "uo": -0.075,
                "ut": 0.05,
                "a": 1.025,
                "d": 0.175,
                "m": 10.666667
            },
            {
                "ff": "JKJING-StarNew",
                "fn": "JKJING-StarNew",
                "bd": false,
                "it": false,
                "uo": -0.177,
                "ut": 0.065,
                "a": 0.8,
                "d": 0.2,
                "m": 10.666667
            },
            {
                "ff": "THCharmonman",
                "fn": "THCharmonman",
                "bd": false,
                "it": false,
                "uo": -0.075,
                "ut": 0.05,
                "a": 0.98,
                "d": 0.22,
                "m": 9.333334
            },
            {
                "ff": "THKrub",
                "fn": "THKrub",
                "bd": false,
                "it": false,
                "uo": -0.075,
                "ut": 0.05,
                "a": 0.98,
                "d": 0.22,
                "m": 9.333334
            },
            {
                "ff": "THSrisakdi",
                "fn": "THSrisakdi",
                "bd": false,
                "it": false,
                "uo": -0.075,
                "ut": 0.05,
                "a": 0.98,
                "d": 0.22,
                "m": 9.333334
            },
            {
                "ff": "THNiramitAS",
                "fn": "THNiramitAS",
                "bd": false,
                "it": false,
                "uo": -0.075,
                "ut": 0.05,
                "a": 0.98,
                "d": 0.22,
                "m": 9.333334
            },
            {
                "ff": "THMaliGrade6",
                "fn": "THMaliGrade6",
                "bd": false,
                "it": false,
                "uo": -0.075,
                "ut": 0.05,
                "a": 0.98,
                "d": 0.22,
                "m": 9.333334
            },

            //{"ff":"Addington CF","fn":null,"bd":true,"it":false,"uo":-0.075,"ut":0.05,"a":1.025,"d":0.175,"m":10.666667},
            // {"ff":"Addington CF","fn":null,"bd":true,"it":true,"uo":-0.075,"ut":0.05,"a":1.025,"d":0.175,"m":10.666667},
            // {"ff":"Addington CF","fn":"Addington Times","bd":false,"it":false,"uo":-0.075,"ut":0.05,"a":1.025,"d":0.175,"m":10.666667},
            // {"ff":"Addington CF","fn":null,"bd":false,"it":true,"uo":-0.075,"ut":0.05,"a":1.025,"d":0.175,"m":10.666667},
            // {"ff":"Articulat CF v2","fn":null,"bd":true,"it":false,"uo":-0.075,"ut":0.05,"a":0.98,"d":0.22,"m":9.333334},
            // {"ff":"Articulat CF v2","fn":null,"bd":true,"it":true,"uo":-0.075,"ut":0.05,"a":0.98,"d":0.22,"m":9.333334},
            // {"ff":"Articulat CF v2","fn":"Articulat","bd":false,"it":false,"uo":-0.075,"ut":0.05,"a":0.98,"d":0.22,"m":9.333334},
            // {"ff":"Articulat CF v2","fn":null,"bd":false,"it":true,"uo":-0.075,"ut":0.05,"a":0.98,"d":0.22,"m":9.333334},
            // {"ff":"Engravers Gothic FS","fn":null,"bd":true,"it":false,"uo":-0.177,"ut":0.065,"a":0.8,"d":0.2,"m":10.666667},
            // {"ff":"Engravers Gothic FS","fn":null,"bd":true,"it":true,"uo":-0.177,"ut":0.065,"a":0.8,"d":0.2,"m":10.666667},
            // {"ff":"Engravers Gothic FS","fn":"Engravers Gothic","bd":false,"it":false,"uo":-0.191,"ut":0.05,"a":0.8,"d":0.2,"m":10.666667},
            // {"ff":"Engravers Gothic FS","fn":null,"bd":false,"it":true,"uo":-0.191,"ut":0.05,"a":0.8,"d":0.2,"m":10.666667},
            // {"ff":"Greycliff CF","fn":null,"bd":true,"it":false,"uo":-0.075,"ut":0.05,"a":0.94,"d":0.306,"m":10.666667},
            // {"ff":"Greycliff CF","fn":null,"bd":true,"it":true,"uo":-0.075,"ut":0.05,"a":0.94,"d":0.25,"m":10.666667},
            // {"ff":"Greycliff CF","fn":"Greycliff","bd":false,"it":false,"uo":-0.075,"ut":0.05,"a":0.938,"d":0.264,"m":10.666667},
            // {"ff":"Greycliff CF","fn":null,"bd":false,"it":true,"uo":-0.075,"ut":0.05,"a":0.938,"d":0.211,"m":10.666667},
            // {"ff":"Florence Script FS","fn":null,"bd":true,"it":false,"uo":-0.095,"ut":0.05,"a":0.913,"d":0.303,"m":10.666667},
            // {"ff":"Florence Script FS","fn":null,"bd":true,"it":true,"uo":-0.095,"ut":0.05,"a":0.913,"d":0.302,"m":10.666667},
            // {"ff":"Florence Script FS","fn":null,"bd":false,"it":true,"uo":-0.095,"ut":0.05,"a":0.898,"d":0.29,"m":10.666667},
            // {"ff":"Florence Script FS","fn":"Florence Script","bd":false,"it":false,"uo":-0.095,"ut":0.05,"a":0.898,"d":0.29,"m":10.666667},
            // {"ff":"Sherina","fn":"Sherina","bd":false,"it":false,"uo":-0.075,"ut":0.05,"a":1.136,"d":0.531,"m":13.333334},
            // {"ff":"Sherina","fn":null,"bd":true,"it":false,"uo":-0.06,"ut":0.065,"a":1.136,"d":0.531,"m":13.333334},
            // {"ff":"Sherina","fn":null,"bd":false,"it":true,"uo":-0.075,"ut":0.05,"a":1.136,"d":0.531,"m":13.333334},
            // {"ff":"Sherina","fn":null,"bd":true,"it":true,"uo":-0.06,"ut":0.065,"a":1.136,"d":0.531,"m":13.333334},
            // {"ff":"Loveletter Script","fn":"Love Letters","bd":false,"it":false,"uo":-0.075,"ut":0.05,"a":1.035,"d":0,"m":18.6666679},
            // {"ff":"Loveletter Script","fn":null,"bd":true,"it":false,"uo":-0.06,"ut":0.065,"a":1.039,"d":0.004,"m":18.6666679},
            // {"ff":"Loveletter Script","fn":null,"bd":false,"it":true,"uo":-0.075,"ut":0.05,"a":1.035,"d":0,"m":18.6666679},
            // {"ff":"Loveletter Script","fn":null,"bd":true,"it":true,"uo":-0.06,"ut":0.065,"a":1.039,"d":0.004,"m":18.6666679},
            // {"ff":"Jenna","fn":"Jenna","bd":false,"it":false,"uo":-0.075,"ut":0.05,"a":0.845,"d":0.395,"m":12},
            // {"ff":"Jenna","fn":null,"bd":true,"it":false,"uo":-0.06,"ut":0.065,"a":0.845,"d":0.395,"m":12},
            // {"ff":"Jenna","fn":null,"bd":false,"it":true,"uo":-0.075,"ut":0.05,"a":0.845,"d":0.395,"m":12},
            // {"ff":"Jenna","fn":null,"bd":true,"it":true,"uo":-0.06,"ut":0.065,"a":0.845,"d":0.395,"m":12}
        ];
        var lgi = false;
        var dfs = [7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 60,
            72, 96
        ];
        </script>
    </form>


    <div class="row">
        <div class="col-md-12">
            <h4>ขั้นตอนที่ 2 เลือกสินค้า</h4>
            <div id="showProduct"></div>
        </div>
    </div>
    <style>
    body {
        background: rgb(245, 245, 245);

    }

    .fr__pro__prize {
        display: flex;
        justify-content: center;
        margin-top: 6px;
    }

    ul,
    ol {
        list-style: none;
    }

    .fr__pro__prize li.old__prize {
        color: #888888;
    }

    .fr__pro__prize li {
        color: #313131;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        margin: 0 5px;
    }

    .category {
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 0.0625rem 0.125rem 0 rgba(0, 0, 0, .1);
        text-align: center;
        height: 350px;
    }

    .category a .img {
        padding: 10px;
    }

    .col-md-3 {
        width: 25%;
        float: left;
        /* margin: 0 auto; */
    }

    .row {
        margin-left: -15px;
        margin-right: -15px;
    }

    .col-xs-1,
    .col-sm-1,
    .col-md-1,
    .col-lg-1,
    .col-xs-2,
    .col-sm-2,
    .col-md-2,
    .col-lg-2,
    .col-xs-3,
    .col-sm-3,
    .col-md-3,
    .col-lg-3,
    .col-xs-4,
    .col-sm-4,
    .col-md-4,
    .col-lg-4,
    .col-xs-5,
    .col-sm-5,
    .col-md-5,
    .col-lg-5,
    .col-xs-6,
    .col-sm-6,
    .col-md-6,
    .col-lg-6,
    .col-xs-7,
    .col-sm-7,
    .col-md-7,
    .col-lg-7,
    .col-xs-8,
    .col-sm-8,
    .col-md-8,
    .col-lg-8,
    .col-xs-9,
    .col-sm-9,
    .col-md-9,
    .col-lg-9,
    .col-xs-10,
    .col-sm-10,
    .col-md-10,
    .col-lg-10,
    .col-xs-11,
    .col-sm-11,
    .col-md-11,
    .col-lg-11,
    .col-xs-12,
    .col-sm-12,
    .col-md-12,
    .col-lg-12 {
        position: relative;
        min-height: 1px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .col-xs-1,
    .col-xs-2,
    .col-xs-3,
    .col-xs-4,
    .col-xs-5,
    .col-xs-6,
    .col-xs-7,
    .col-xs-8,
    .col-xs-9,
    .col-xs-10,
    .col-xs-11,
    .col-xs-12 {
        float: left;
    }

    .col-xs-12 {
        width: 100%;
    }

    .col-xs-11 {
        width: 91.66666667%;
    }

    .col-xs-10 {
        width: 83.33333333%;
    }

    .col-xs-9 {
        width: 75%;
    }

    .col-xs-8 {
        width: 66.66666667%;
    }

    .col-xs-7 {
        width: 58.33333333%;
    }

    .col-xs-6 {
        width: 50%;
    }

    .col-xs-5 {
        width: 41.66666667%;
    }

    .col-xs-4 {
        width: 33.33333333%;
    }

    .col-xs-3 {
        width: 25%;
    }

    .col-xs-2 {
        width: 16.66666667%;
    }

    .col-xs-1 {
        width: 8.33333333%;
    }

    .col-xs-pull-12 {
        right: 100%;
    }

    .col-xs-pull-11 {
        right: 91.66666667%;
    }

    .col-xs-pull-10 {
        right: 83.33333333%;
    }

    .col-xs-pull-9 {
        right: 75%;
    }

    .col-xs-pull-8 {
        right: 66.66666667%;
    }

    .col-xs-pull-7 {
        right: 58.33333333%;
    }

    .col-xs-pull-6 {
        right: 50%;
    }

    .col-xs-pull-5 {
        right: 41.66666667%;
    }

    .col-xs-pull-4 {
        right: 33.33333333%;
    }

    .col-xs-pull-3 {
        right: 25%;
    }

    .col-xs-pull-2 {
        right: 16.66666667%;
    }

    .col-xs-pull-1 {
        right: 8.33333333%;
    }

    .col-xs-pull-0 {
        right: auto;
    }

    .col-xs-push-12 {
        left: 100%;
    }

    .col-xs-push-11 {
        left: 91.66666667%;
    }

    .col-xs-push-10 {
        left: 83.33333333%;
    }

    .col-xs-push-9 {
        left: 75%;
    }

    .col-xs-push-8 {
        left: 66.66666667%;
    }

    .col-xs-push-7 {
        left: 58.33333333%;
    }

    .col-xs-push-6 {
        left: 50%;
    }

    .col-xs-push-5 {
        left: 41.66666667%;
    }

    .col-xs-push-4 {
        left: 33.33333333%;
    }

    .col-xs-push-3 {
        left: 25%;
    }

    .col-xs-push-2 {
        left: 16.66666667%;
    }

    .col-xs-push-1 {
        left: 8.33333333%;
    }

    .col-xs-push-0 {
        left: auto;
    }

    .col-xs-offset-12 {
        margin-left: 100%;
    }

    .col-xs-offset-11 {
        margin-left: 91.66666667%;
    }

    .col-xs-offset-10 {
        margin-left: 83.33333333%;
    }

    .col-xs-offset-9 {
        margin-left: 75%;
    }

    .col-xs-offset-8 {
        margin-left: 66.66666667%;
    }

    .col-xs-offset-7 {
        margin-left: 58.33333333%;
    }

    .col-xs-offset-6 {
        margin-left: 50%;
    }

    .col-xs-offset-5 {
        margin-left: 41.66666667%;
    }

    .col-xs-offset-4 {
        margin-left: 33.33333333%;
    }

    .col-xs-offset-3 {
        margin-left: 25%;
    }

    .col-xs-offset-2 {
        margin-left: 16.66666667%;
    }

    .col-xs-offset-1 {
        margin-left: 8.33333333%;
    }

    .col-xs-offset-0 {
        margin-left: 0%;
    }

    @media (min-width: 768px) {

        .col-sm-1,
        .col-sm-2,
        .col-sm-3,
        .col-sm-4,
        .col-sm-5,
        .col-sm-6,
        .col-sm-7,
        .col-sm-8,
        .col-sm-9,
        .col-sm-10,
        .col-sm-11,
        .col-sm-12 {
            float: left;
        }

        .col-sm-12 {
            width: 100%;
        }

        .col-sm-11 {
            width: 91.66666667%;
        }

        .col-sm-10 {
            width: 83.33333333%;
        }

        .col-sm-9 {
            width: 75%;
        }

        .col-sm-8 {
            width: 66.66666667%;
        }

        .col-sm-7 {
            width: 58.33333333%;
        }

        .col-sm-6 {
            width: 50%;
        }

        .col-sm-5 {
            width: 41.66666667%;
        }

        .col-sm-4 {
            width: 33.33333333%;
        }

        .col-sm-3 {
            width: 25%;
        }

        .col-sm-2 {
            width: 16.66666667%;
        }

        .col-sm-1 {
            width: 8.33333333%;
        }

        .col-sm-pull-12 {
            right: 100%;
        }

        .col-sm-pull-11 {
            right: 91.66666667%;
        }

        .col-sm-pull-10 {
            right: 83.33333333%;
        }

        .col-sm-pull-9 {
            right: 75%;
        }

        .col-sm-pull-8 {
            right: 66.66666667%;
        }

        .col-sm-pull-7 {
            right: 58.33333333%;
        }

        .col-sm-pull-6 {
            right: 50%;
        }

        .col-sm-pull-5 {
            right: 41.66666667%;
        }

        .col-sm-pull-4 {
            right: 33.33333333%;
        }

        .col-sm-pull-3 {
            right: 25%;
        }

        .col-sm-pull-2 {
            right: 16.66666667%;
        }

        .col-sm-pull-1 {
            right: 8.33333333%;
        }

        .col-sm-pull-0 {
            right: auto;
        }

        .col-sm-push-12 {
            left: 100%;
        }

        .col-sm-push-11 {
            left: 91.66666667%;
        }

        .col-sm-push-10 {
            left: 83.33333333%;
        }

        .col-sm-push-9 {
            left: 75%;
        }

        .col-sm-push-8 {
            left: 66.66666667%;
        }

        .col-sm-push-7 {
            left: 58.33333333%;
        }

        .col-sm-push-6 {
            left: 50%;
        }

        .col-sm-push-5 {
            left: 41.66666667%;
        }

        .col-sm-push-4 {
            left: 33.33333333%;
        }

        .col-sm-push-3 {
            left: 25%;
        }

        .col-sm-push-2 {
            left: 16.66666667%;
        }

        .col-sm-push-1 {
            left: 8.33333333%;
        }

        .col-sm-push-0 {
            left: auto;
        }

        .col-sm-offset-12 {
            margin-left: 100%;
        }

        .col-sm-offset-11 {
            margin-left: 91.66666667%;
        }

        .col-sm-offset-10 {
            margin-left: 83.33333333%;
        }

        .col-sm-offset-9 {
            margin-left: 75%;
        }

        .col-sm-offset-8 {
            margin-left: 66.66666667%;
        }

        .col-sm-offset-7 {
            margin-left: 58.33333333%;
        }

        .col-sm-offset-6 {
            margin-left: 50%;
        }

        .col-sm-offset-5 {
            margin-left: 41.66666667%;
        }

        .col-sm-offset-4 {
            margin-left: 33.33333333%;
        }

        .col-sm-offset-3 {
            margin-left: 25%;
        }

        .col-sm-offset-2 {
            margin-left: 16.66666667%;
        }

        .col-sm-offset-1 {
            margin-left: 8.33333333%;
        }

        .col-sm-offset-0 {
            margin-left: 0%;
        }
    }

    @media (min-width: 992px) {

        .col-md-1,
        .col-md-2,
        .col-md-3,
        .col-md-4,
        .col-md-5,
        .col-md-6,
        .col-md-7,
        .col-md-8,
        .col-md-9,
        .col-md-10,
        .col-md-11,
        .col-md-12 {
            float: left;
        }

        .col-md-12 {
            width: 100%;
        }

        .col-md-11 {
            width: 91.66666667%;
        }

        .col-md-10 {
            width: 83.33333333%;
        }

        .col-md-9 {
            width: 75%;
        }

        .col-md-8 {
            width: 66.66666667%;
        }

        .col-md-7 {
            width: 58.33333333%;
        }

        .col-md-6 {
            width: 50%;
        }

        .col-md-5 {
            width: 41.66666667%;
        }

        .col-md-4 {
            width: 33.33333333%;
        }

        .col-md-3 {
            width: 25%;
        }

        .col-md-2 {
            width: 16.66666667%;
        }

        .col-md-1 {
            width: 8.33333333%;
        }

        .col-md-pull-12 {
            right: 100%;
        }

        .col-md-pull-11 {
            right: 91.66666667%;
        }

        .col-md-pull-10 {
            right: 83.33333333%;
        }

        .col-md-pull-9 {
            right: 75%;
        }

        .col-md-pull-8 {
            right: 66.66666667%;
        }

        .col-md-pull-7 {
            right: 58.33333333%;
        }

        .col-md-pull-6 {
            right: 50%;
        }

        .col-md-pull-5 {
            right: 41.66666667%;
        }

        .col-md-pull-4 {
            right: 33.33333333%;
        }

        .col-md-pull-3 {
            right: 25%;
        }

        .col-md-pull-2 {
            right: 16.66666667%;
        }

        .col-md-pull-1 {
            right: 8.33333333%;
        }

        .col-md-pull-0 {
            right: auto;
        }

        .col-md-push-12 {
            left: 100%;
        }

        .col-md-push-11 {
            left: 91.66666667%;
        }

        .col-md-push-10 {
            left: 83.33333333%;
        }

        .col-md-push-9 {
            left: 75%;
        }

        .col-md-push-8 {
            left: 66.66666667%;
        }

        .col-md-push-7 {
            left: 58.33333333%;
        }

        .col-md-push-6 {
            left: 50%;
        }

        .col-md-push-5 {
            left: 41.66666667%;
        }

        .col-md-push-4 {
            left: 33.33333333%;
        }

        .col-md-push-3 {
            left: 25%;
        }

        .col-md-push-2 {
            left: 16.66666667%;
        }

        .col-md-push-1 {
            left: 8.33333333%;
        }

        .col-md-push-0 {
            left: auto;
        }

        .col-md-offset-12 {
            margin-left: 100%;
        }

        .col-md-offset-11 {
            margin-left: 91.66666667%;
        }

        .col-md-offset-10 {
            margin-left: 83.33333333%;
        }

        .col-md-offset-9 {
            margin-left: 75%;
        }

        .col-md-offset-8 {
            margin-left: 66.66666667%;
        }

        .col-md-offset-7 {
            margin-left: 58.33333333%;
        }

        .col-md-offset-6 {
            margin-left: 50%;
        }

        .col-md-offset-5 {
            margin-left: 41.66666667%;
        }

        .col-md-offset-4 {
            margin-left: 33.33333333%;
        }

        .col-md-offset-3 {
            margin-left: 25%;
        }

        .col-md-offset-2 {
            margin-left: 16.66666667%;
        }

        .col-md-offset-1 {
            margin-left: 8.33333333%;
        }

        .col-md-offset-0 {
            margin-left: 0%;
        }
    }

    @media (min-width: 1200px) {

        .col-lg-1,
        .col-lg-2,
        .col-lg-3,
        .col-lg-4,
        .col-lg-5,
        .col-lg-6,
        .col-lg-7,
        .col-lg-8,
        .col-lg-9,
        .col-lg-10,
        .col-lg-11,
        .col-lg-12 {
            float: left;
        }

        .col-lg-12 {
            width: 100%;
        }

        .col-lg-11 {
            width: 91.66666667%;
        }

        .col-lg-10 {
            width: 83.33333333%;
        }

        .col-lg-9 {
            width: 75%;
        }

        .col-lg-8 {
            width: 66.66666667%;
        }

        .col-lg-7 {
            width: 58.33333333%;
        }

        .col-lg-6 {
            width: 50%;
        }

        .col-lg-5 {
            width: 41.66666667%;
        }

        .col-lg-4 {
            width: 33.33333333%;
        }

        .col-lg-3 {
            width: 25%;
        }

        .col-lg-2 {
            width: 16.66666667%;
        }

        .col-lg-1 {
            width: 8.33333333%;
        }

        .col-lg-pull-12 {
            right: 100%;
        }

        .col-lg-pull-11 {
            right: 91.66666667%;
        }

        .col-lg-pull-10 {
            right: 83.33333333%;
        }

        .col-lg-pull-9 {
            right: 75%;
        }

        .col-lg-pull-8 {
            right: 66.66666667%;
        }

        .col-lg-pull-7 {
            right: 58.33333333%;
        }

        .col-lg-pull-6 {
            right: 50%;
        }

        .col-lg-pull-5 {
            right: 41.66666667%;
        }

        .col-lg-pull-4 {
            right: 33.33333333%;
        }

        .col-lg-pull-3 {
            right: 25%;
        }

        .col-lg-pull-2 {
            right: 16.66666667%;
        }

        .col-lg-pull-1 {
            right: 8.33333333%;
        }

        .col-lg-pull-0 {
            right: auto;
        }

        .col-lg-push-12 {
            left: 100%;
        }

        .col-lg-push-11 {
            left: 91.66666667%;
        }

        .col-lg-push-10 {
            left: 83.33333333%;
        }

        .col-lg-push-9 {
            left: 75%;
        }

        .col-lg-push-8 {
            left: 66.66666667%;
        }

        .col-lg-push-7 {
            left: 58.33333333%;
        }

        .col-lg-push-6 {
            left: 50%;
        }

        .col-lg-push-5 {
            left: 41.66666667%;
        }

        .col-lg-push-4 {
            left: 33.33333333%;
        }

        .col-lg-push-3 {
            left: 25%;
        }

        .col-lg-push-2 {
            left: 16.66666667%;
        }

        .col-lg-push-1 {
            left: 8.33333333%;
        }

        .col-lg-push-0 {
            left: auto;
        }

        .col-lg-offset-12 {
            margin-left: 100%;
        }

        .col-lg-offset-11 {
            margin-left: 91.66666667%;
        }

        .col-lg-offset-10 {
            margin-left: 83.33333333%;
        }

        .col-lg-offset-9 {
            margin-left: 75%;
        }

        .col-lg-offset-8 {
            margin-left: 66.66666667%;
        }

        .col-lg-offset-7 {
            margin-left: 58.33333333%;
        }

        .col-lg-offset-6 {
            margin-left: 50%;
        }

        .col-lg-offset-5 {
            margin-left: 41.66666667%;
        }

        .col-lg-offset-4 {
            margin-left: 33.33333333%;
        }

        .col-lg-offset-3 {
            margin-left: 25%;
        }

        .col-lg-offset-2 {
            margin-left: 16.66666667%;
        }

        .col-lg-offset-1 {
            margin-left: 8.33333333%;
        }

        .col-lg-offset-0 {
            margin-left: 0%;
        }
    }
    </style>


</body>

</html>