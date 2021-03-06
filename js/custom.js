var widthCM = 0;
var heightCM = 0;
function setupliFinishedCallback(n) {
    upliFinishedCallback = n
}
 
//use
function GetMatchingBodies(n, t, i, r) {

    // let backendUrl = 'http://backend.stamp.local';
    let backendUrl = 'https://backend.safetrayang.com';
    let url = backendUrl+'/product/api2'; 
    let params = {widthCM:widthCM, heightCM:heightCM,type:1};
    $("#showProduct").html('<h1 class="text-center">กำลังโหลดข้อมูล...</h1>');
    $.get(url,params, function(result){
        let html = '<div class="row"><h4>ขั้นตอนที่ 2 เลือกสินค้า</h4>';
        
        for(let res of result){
            // console.log(i)
            //<a onclick='getImages(${res['productId']})' target='_blank' href='${frontEndUrl}/product/detail?id=${res['productId']}' style='text-decoration:none'>
            html += `
                <div class='col-md-3'>
                    <div class='col-md-12 category'>
                    
                        <a onclick='getImages("${res['productId']}")' id='pro${res['productId']}' href='#' style='text-decoration:none'>
                            ${res['image']}
                            <div class='text-center'>
                            <div>${res['productName']}</div>
                            <ul class="fr__pro__prize">
                                <li class="old__prize"><strike>${res['price']}</strike></li>
                                <li>${res['disprice']}</li>
                            </ul>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        }
        // console.log(result.length);
        
        if(result.length < 1){
            html += '<h5 class="text-center">ไม่พบรายการสินค้ากรุณาตรวจสอบอีกครั้งค่ะ</h5>';
        }
        html += '</div>';
        //captureScreen
        $("#isLoading").html('<h1 class="text-center">กำลังโหลดข้อมูล...</h1>');
        $("#showProduct").hide();
        $("#showProduct").html(html);
        setTimeout(function(){
            $("#showProduct").show();
            $("#isLoading").html('');
        },2000);
        
    });
    return false; 
}
//use
function getImages(id){
                let output = []; 
                //let frontEndUrl = 'http://stamp.local';
                 let frontEndUrl = 'https://safetrayang.com';
                for(let i=0; i<=20; i++){
                    if($("#text00-0"+i).attr('data-target-id') == '0'){
                        let textValue = $(`#text00-0${i} #text00-0${i}--input`).val();
                        let fontFamily = $(`#text00-0${i} .small`).val();
                        let fontSize = $(`#text00-0${i} .selectize-input .item`).text();
                        let alignLeft=false,alignCenter=false,alignRight=false,bold=false,italic=false,underline=false;
                        let border1=false,border2=false,border3=false,borderWeight='1 pt';
                        let shapeDropdown = $("#shape-dropdown").val();
                        if(shapeDropdown=='square'){
                             shapeDropdown='สี่เหลี่ยม';
                        }else if(shapeDropdown=='rectangle'){
                             shapeDropdown='สี่เหลี่ยมผืนผ้า';
                        }else if(shapeDropdown=='circle'){
                             shapeDropdown='วงกลม';
                        }else if(shapeDropdown=='oval'){
                             shapeDropdown='วงรี';
                        }

                        if($(".align-left").hasClass('active')){
                        alignLeft = true;
                        }
                        if($(".align-center").hasClass('active')){
                        alignCenter = true;
                        }
                        if($(".align-right").hasClass('active')){
                        alignRight = true;
                        }

                        if($(".bold").hasClass('active')){
                        bold = true;
                        }
                        if($(".italic").hasClass('active')){
                        italic = true;
                        }
                        if($(".underline").hasClass('active')){
                        underline = true;
                        }
                        
                        if($('#border1').is(':checked')) { border1=true; }
                        if($('#border2').is(':checked')) { border2=true; }
                        if($('#border3').is(':checked')) { border3=true; }
                        borderWeight = $("#dropdown-border-weight").val();
                        if(borderWeight == '1.66666'){
                            borderWeight = 'ละเอียด (1 pt)';
                        }else if(borderWeight == '2.66667'){
                            borderWeight = 'บาง (2 pt)';
                        }else if(borderWeight == '5.33333'){
                            borderWeight = 'ปลานกลาง (4 pt)';
                        }else if(borderWeight == '8'){
                            borderWeight = 'หนา (6 pt)';
                        }

                        //image
                        let imgSrc = $("#selected-artwork-image").attr('src');
                        let imgSize = $("#clip-dimensions").text();
                        let imgPosition = '';
                        let userID = $("#userID").val();

                        if($(".align-image-top").hasClass('active')){
                           imgPosition = 'align top';
                        }else if($(".align-image-bottom").hasClass('active')){
                           imgPosition = 'align bottom';
                        }else if($(".align-image-left").hasClass('active')){
                           imgPosition = 'align left';
                        }else if($(".align-image-right").hasClass('active')){
                           imgPosition = 'align right';
                        }else if($(".align-image-center").hasClass('active')){
                           imgPosition = 'align center';
                        }
                        
                        output.push({
                            'userID':userID,
                            'shapeDropdown':shapeDropdown,
                            'textValue':textValue,
                            'fontFamily':fontFamily,
                            'fontSize':fontSize,
                            'alignLeft':alignLeft,
                            'alignCenter':alignCenter,
                            'alignRight':alignRight,
                            'bold':bold,
                            'italic':italic,
                            'underline':underline,
                            'border1':border1,//ไม่มีขอบ
                            'border2':border2,//ขอบหนา
                            'border3':border3,//จุดไข่ปลา
                            'borderWeight':borderWeight,
                            'imgSrc':imgSrc,
                            'imgSize':imgSize,
                            'imgPosition':imgPosition
                        });
                    }
                }
                output = JSON.stringify(output);
                let url = frontEndUrl+'/site/save-detail-stamp?userID='+$("#userID").val();
               //let backendUrl = 'https://backend.safetrayang.com/site/save-detail-stamp?userID='+$("#userID").val();
               $.get(url,{data:output}, function(result){
                   result = parseInt(result);
                   const a = document.createElement("a")
                   a.href = `${frontEndUrl}/product/detail?id=${id}&did=${result}`;
                   a.target = "_blank";
                   a.rel = "noopener";
                   a.click();
                //    window.open(`${frontEndUrl}/product/detail?id=${id}&did=${result}`, '_BLANK');
                    //$("#pro"+id).attr('href',`${frontEndUrl}/product/detail?id=${id}&did=${result}`);
                    //location.href = $("#pro"+id).attr('href');
               });  
               return false;             

}


function GetItemMatchingBodies(n, t, i, r) {
    console.log('GetItemMatchingBodies')
    var u, f;
    if (n.ovProd = n.ovProd == undefined ? null : n.ovProd, n.ovInk = n.ovInk == undefined ? "" : n.ovInk, n.ovSize = n.ovSize == undefined ? null : n.ovSize, u = '{"item": { "itemId": ' + JSON.stringify(n.itemId) + ', "itemIdType": ' + JSON.stringify(n.itemIdType) + ', "ovProd": ' + JSON.stringify(n.ovProd) + ', "ovInk": ' + JSON.stringify(n.ovInk) + ', "ovSize": {"areas": ' + JSON.stringify(n.ovSize) + "} }", u += ',"matchCriteria": [', t != null)
        for (f = 0      ; f < t.length; f++) f != 0 && (u += ","), u += JSON.stringify(t[f]);
    u += "]}";
    showStampBodies(!0);
    setAddToCartState();
    _bdBusy();
    $.ajax({
        type: "POST",
        url: "?/GetItemMatchingBodies",
        data: u,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(n) {
            i(n);
            _bdDone()
        },
        error: function(n, t, i) {
            r(n, t, i);
            _bdDone()
        }
    })
}

function GetWizardURL(n, t, i) {
    console.log('GetWizardURL')
    var r = '{"allowedBodies":' + JSON.stringify(n) + "}";
    $.ajax({
        type: "POST",
        url: dapiRoot + "//GetWizardURL",
        data: r,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: t,
        error: i
    })
}

function GetProductURL(n, t, i) {
    console.log('GetProductURL')
    var r = '{"bvin":' + JSON.stringify(n) + "}";
    $.ajax({
        type: "POST",
        url: dapiRoot + "/GetProductURL",
        data: r,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: t,
        error: i
    })
}

function alertSuccess(n) {
    alert("Success - " + JSON.stringify(n))
}

function alertFail(n, t, i) {
    alert("Fail - " + t + " - " + i)
}
 

//use
function GetClipartFromCategory(n, t, i, r) {
    var u = '{"categoryName": ' + JSON.stringify(n) + ',"hostBase":' + JSON.stringify(t) + "}";
    $.ajax({
        type: "POST",
        url: dapiRoot + "/clipart-form.php",
        data: u,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: i,
        error: r
    })
}
 
 
var upli_oldBeforeUnload, bPostProcess, upliFinishedCallback, upli_curData, afonts, dapiRoot, poppedState, ssv;
 
upli_oldBeforeUnload = null;
bPostProcess = !1;
upli_curData = null;
$(document).ready(function() {}),
    function(n) {
        var s = "0.5.0",
            o = "hasOwnProperty",
            u = /[\.\/]/,
            h = /\s*,\s*/,
            c = "*",
            p = function() {},
            l = function(n, t) {
                return n - t
            },
            t, i, f = {
                n: {}
            },
            a = function() {
                for (var n = 0, t = this.length; n < t; n++)
                    if (typeof this[n] != "undefined") return this[n]
            },
            v = function() {
                for (var n = this.length; --n;)
                    if (typeof this[n] != "undefined") return this[n]
            },
            y = Object.prototype.toString,
            e = String,
            r = Array.isArray || function(n) {
                return n instanceof Array || y.call(n) == "[object Array]"
            };
        eve = function(n, r) {
            var d = f,
                b = i,
                y = Array.prototype.slice.call(arguments, 2),
                s = eve.listeners(n),
                c = 0,
                u, h = [],
                p = {},
                o = [],
                k = t,
                e, w;
            for (o.firstDefined = a, o.lastDefined = v, t = n, i = 0, e = 0, w = s.length; e < w; e++) "zIndex" in s[e] && (h.push(s[e].zIndex), s[e].zIndex < 0 && (p[s[e].zIndex] = s[e]));
            for (h.sort(l); h[c] < 0;)
                if (u = p[h[c++]], o.push(u.apply(r, y)), i) return i = b, o;
            for (e = 0; e < w; e++)
                if (u = s[e], "zIndex" in u)
                    if (u.zIndex == h[c]) {
                        if (o.push(u.apply(r, y)), i) break;
                        do
                            if (c++, u = p[h[c]], u && o.push(u.apply(r, y)), i) break;
                        while (u)
                    } else p[u.zIndex] = u;
            else if (o.push(u.apply(r, y)), i) break;
            return i = b, t = k, o
        };
        eve._events = f;
        eve.listeners = function(n) {
            for (var v = r(n) ? n : n.split(u), t = f, i, y, s, o, w, h, l = [t], a = [], e = 0, p = v.length; e < p; e++) {
                for (h = [], o = 0, w = l.length; o < w; o++)
                    for (t = l[o].n, y = [t[v[e]], t[c]], s = 2; s--;) i = y[s], i && (h.push(i), a = a.concat(i.f || []));
                l = h
            }
            return a
        };
        eve.separator = function(n) {
            n ? (n = e(n).replace(/(?=[\.\^\]\[\-])/g, "\\"), n = "[" + n + "]", u = new RegExp(n)) : u = /[\.\/]/
        };
        eve.on = function(n, t) {
            var o, i, s;
            if (typeof t != "function") return function() {};
            for (o = r(n) ? r(n[0]) ? n : [n] : e(n).split(h), i = 0, s = o.length; i < s; i++)(function(n) {
                for (var s = r(n) ? n : e(n).split(u), i = f, c, o = 0, h = s.length; o < h; o++) i = i.n, i = i.hasOwnProperty(s[o]) && i[s[o]] || (i[s[o]] = {
                    n: {}
                });
                for (i.f = i.f || [], o = 0, h = i.f.length; o < h; o++)
                    if (i.f[o] == t) {
                        c = !0;
                        break
                    }
                c || i.f.push(t)
            })(o[i]);
            return function(n) {
                +n == +n && (t.zIndex = +n)
            }
        };
        eve.f = function(n) {
            var t = [].slice.call(arguments, 1);
            return function() {
                eve.apply(null, [n, null].concat(t).concat([].slice.call(arguments, 0)))
            }
        };
        eve.stop = function() {
            i = 1
        };
        eve.nt = function(n) {
            var i = r(t) ? t.join(".") : t;
            return n ? new RegExp("(?:\\.|\\/|^)" + n + "(?:\\.|\\/|$)").test(i) : i
        };
        eve.nts = function() {
            return r(t) ? t : t.split(u)
        };
        eve.off = eve.unbind = function(n, t) {
            var v, i, l, w, s, y, a, d, p, b, k;
            if (!n) {
                eve._events = f = {
                    n: {}
                };
                return
            }
            if (v = r(n) ? r(n[0]) ? n : [n] : e(n).split(h), v.length > 1) {
                for (s = 0, y = v.length; s < y; s++) eve.off(v[s], t);
                return
            }
            for (v = r(n) ? n : e(n).split(u), p = [f], b = [], s = 0, y = v.length; s < y; s++)
                for (a = 0; a < p.length; a += w.length - 2) {
                    if (w = [a, 1], i = p[a].n, v[s] != c) i[v[s]] && (w.push(i[v[s]]), b.unshift({
                        n: i,
                        name: v[s]
                    }));
                    else
                        for (l in i) i[o](l) && (w.push(i[l]), b.unshift({
                            n: i,
                            name: l
                        }));
                    p.splice.apply(p, w)
                }
            for (s = 0, y = p.length; s < y; s++)
                for (i = p[s]; i.n;) {
                    if (t) {
                        if (i.f) {
                            for (a = 0, d = i.f.length; a < d; a++)
                                if (i.f[a] == t) {
                                    i.f.splice(a, 1);
                                    break
                                }
                            i.f.length || delete i.f
                        }
                        for (l in i.n)
                            if (i.n[o](l) && i.n[l].f) {
                                for (k = i.n[l].f, a = 0, d = k.length; a < d; a++)
                                    if (k[a] == t) {
                                        k.splice(a, 1);
                                        break
                                    }
                                k.length || delete i.n[l].f
                            }
                    } else {
                        delete i.f;
                        for (l in i.n) i.n[o](l) && i.n[l].f && delete i.n[l].f
                    }
                    i = i.n
                }
            n: for (s = 0, y = b.length; s < y; s++) {
                i = b[s];
                for (l in i.n[i.name].f) continue n;
                for (l in i.n[i.name].n) continue n;
                delete i.n[i.name]
            }
        };
        eve.once = function(n, t) {
            var i = function() {
                return eve.off(n, i), t.apply(this, arguments)
            };
            return eve.on(n, i)
        };
        eve.version = s;
        eve.toString = function() {
            return "You are running Eve " + s
        };
        typeof module != "undefined" && module.exports ? module.exports = eve : typeof define == "function" && define.amd ? define("eve", [], function() {
            return eve
        }) : n.eve = eve
    }(this),
    function(n, t) {
        if (typeof define == "function" && define.amd) define(["eve"], function(i) {
            return t(n, i)
        });
        else if (typeof exports != "undefined") {
            var i = require("eve");
            module.exports = t(n, i)
        } else t(n, n.eve)
    }(window || this, function(n, t) {
        var r = function(t) {
                var r = {},
                    e = n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || n.oRequestAnimationFrame || n.msRequestAnimationFrame || function(n) {
                        return setTimeout(n, 16, (new Date).getTime()), !0
                    },
                    f, o = Array.isArray || function(n) {
                        return n instanceof Array || Object.prototype.toString.call(n) == "[object Array]"
                    },
                    s = 0,
                    h = "M" + (+new Date).toString(36),
                    c = function() {
                        return h + (s++).toString(36)
                    },
                    l = function(n, t, i, r) {
                        var u, f, e;
                        if (o(n)) {
                            for (res = [], u = 0, f = n.length; u < f; u++) res[u] = l(n[u], t, i[u], r);
                            return res
                        }
                        return e = (i - n) / (r - t),
                            function(i) {
                                return n + e * (i - t)
                            }
                    },
                    a = Date.now || function() {
                        return +new Date
                    },
                    v = function(n) {
                        var t = this,
                            i;
                        if (n == null) return t.s;
                        i = t.s - n;
                        t.b += t.dur * i;
                        t.B += t.dur * i;
                        t.s = n
                    },
                    y = function(n) {
                        var t = this;
                        if (n == null) return t.spd;
                        t.spd = n
                    },
                    p = function(n) {
                        var t = this;
                        if (n == null) return t.dur;
                        t.s = t.s * n / t.dur;
                        t.dur = n
                    },
                    w = function() {
                        var n = this;
                        delete r[n.id];
                        n.update();
                        t("mina.stop." + n.id, n)
                    },
                    b = function() {
                        var n = this;
                        n.pdif || (delete r[n.id], n.update(), n.pdif = n.get() - n.b)
                    },
                    k = function() {
                        var n = this;
                        n.pdif && (n.b = n.get() - n.pdif, delete n.pdif, r[n.id] = n, u())
                    },
                    d = function() {
                        var n = this,
                            i, t, r;
                        if (o(n.start))
                            for (i = [], t = 0, r = n.start.length; t < r; t++) i[t] = +n.start[t] + (n.end[t] - n.start[t]) * n.easing(n.s);
                        else i = +n.start + (n.end - n.start) * n.easing(n.s);
                        n.set(i)
                    },
                    u = function(n) {
                        var o, s, i, h;
                        if (!n) {
                            f || (f = e(u));
                            return
                        }
                        o = 0;
                        for (s in r) r.hasOwnProperty(s) && (i = r[s], h = i.get(), o++, i.s = (h - i.b) / (i.dur / i.spd), i.s >= 1 && (delete r[s], i.s = 1, o--, function(n) {
                            setTimeout(function() {
                                t("mina.finish." + n.id, n)
                            })
                        }(i)), i.update());
                        f = o ? e(u) : !1
                    },
                    i = function(n, t, f, e, o, s, h) {
                        var a = {
                                id: c(),
                                start: n,
                                end: t,
                                b: f,
                                s: 0,
                                dur: e - f,
                                spd: 1,
                                get: o,
                                set: s,
                                easing: h || i.linear,
                                status: v,
                                speed: y,
                                duration: p,
                                stop: w,
                                pause: b,
                                resume: k,
                                update: d
                            },
                            l, g;
                        r[a.id] = a;
                        l = 0;
                        for (g in r)
                            if (r.hasOwnProperty(g) && (l++, l == 2)) break;
                        return l == 1 && u(), a
                    };
                return i.time = a, i.getById = function(n) {
                    return r[n] || null
                }, i.linear = function(n) {
                    return n
                }, i.easeout = function(n) {
                    return Math.pow(n, 1.7)
                }, i.easein = function(n) {
                    return Math.pow(n, .48)
                }, i.easeinout = function(n) {
                    if (n == 1) return 1;
                    if (n == 0) return 0;
                    var i = .48 - n / 1.04,
                        r = Math.sqrt(.1734 + i * i),
                        u = r - i,
                        e = Math.pow(Math.abs(u), 1 / 3) * (u < 0 ? -1 : 1),
                        f = -r - i,
                        o = Math.pow(Math.abs(f), 1 / 3) * (f < 0 ? -1 : 1),
                        t = e + o + .5;
                    return (1 - t) * 3 * t * t + t * t * t
                }, i.backin = function(n) {
                    if (n == 1) return 1;
                    var t = 1.70158;
                    return n * n * ((t + 1) * n - t)
                }, i.backout = function(n) {
                    if (n == 0) return 0;
                    n = n - 1;
                    var t = 1.70158;
                    return n * n * ((t + 1) * n + t) + 1
                }, i.elastic = function(n) {
                    return n == !!n ? n : Math.pow(2, -10 * n) * Math.sin((n - .075) * 2 * Math.PI / .3) + 1
                }, i.bounce = function(n) {
                    var r = 7.5625,
                        t = 2.75,
                        i;
                    return n < 1 / t ? i = r * n * n : n < 2 / t ? (n -= 1.5 / t, i = r * n * n + .75) : n < 2.5 / t ? (n -= 2.25 / t, i = r * n * n + .9375) : (n -= 2.625 / t, i = r * n * n + .984375), i
                }, n.mina = i, i
            }(typeof t == "undefined" ? function() {} : t),
            i = function(n) {
                function i(n, t) {
                    if (n) {
                        if (n.nodeType) return h(n);
                        if (r(n, "array") && i.set) return i.set.apply(i, n);
                        if (n instanceof v) return n;
                        if (t == null) try {
                            return n = f.doc.querySelector(String(n)), h(n)
                        } catch (u) {
                            return null
                        }
                    }
                    return n = n == null ? "100%" : n, t = t == null ? "100%" : t, new s(n, t)
                }

                function o(n, t) {
                    var i, r;
                    if (t) {
                        if (n == "#text" && (n = f.doc.createTextNode(t.text || t["#text"] || "")), n == "#comment" && (n = f.doc.createComment(t.text || t["#text"] || "")), typeof n == "string" && (n = o(n)), typeof t == "string") return n.nodeType == 1 ? t.substring(0, 6) == "xlink:" ? n.getAttributeNS(st, t.substring(6)) : t.substring(0, 4) == "xml:" ? n.getAttributeNS(d, t.substring(4)) : n.getAttribute(t) : t == "text" ? n.nodeValue : null;
                        if (n.nodeType == 1)
                            for (i in t) t[c](i) && (r = l(t[i]), r ? i.substring(0, 6) == "xlink:" ? n.setAttributeNS(st, i.substring(6), r) : i.substring(0, 4) == "xml:" ? n.setAttributeNS(d, i.substring(4), r) : n.setAttribute(i, r) : n.removeAttribute(i));
                        else "text" in t && (n.nodeValue = t.text)
                    } else n = f.doc.createElementNS(d, n);
                    return n
                }

                function r(n, t) {
                    return (t = l.prototype.toLowerCase.call(t), t == "finite") ? isFinite(n) : t == "array" && (n instanceof Array || Array.isArray && Array.isArray(n)) ? !0 : t == "null" && n === null || t == typeof n && n !== null || t == "object" && n === Object(n) || ni.call(n).slice(8, -1).toLowerCase() == t
                }

                function yt(n) {
                    var i, t;
                    if (typeof n == "function" || Object(n) !== n) return n;
                    i = new n.constructor;
                    for (t in n) n[c](t) && (i[t] = yt(n[t]));
                    return i
                }

                function oi(n, t) {
                    for (var i = 0, r = n.length; i < r; i++)
                        if (n[i] === t) return n.push(n.splice(i, 1)[0])
                }

                function b(n, t, i) {
                    function r() {
                        var o = Array.prototype.slice.call(arguments, 0),
                            u = o.join("␀"),
                            f = r.cache = r.cache || {},
                            e = r.count = r.count || [];
                        return f[c](u) ? (oi(e, u), i ? i(f[u]) : f[u]) : (e.length >= 1e3 && delete f[e.shift()], e.push(u), f[u] = n.apply(t, o), i ? i(f[u]) : f[u])
                    }
                    return r
                }

                function ht(n, t, i, r, f, e) {
                    if (f == null) {
                        var o = n - i,
                            s = t - r;
                        return !o && !s ? 0 : (180 + u.atan2(-s, -o) * 180 / ut + 360) % 360
                    }
                    return ht(n, t, f, e) - ht(i, r, f, e)
                }

                function ct(n) {
                    return n % 360 * ut / 180
                }

                function si(n) {
                    return n * 180 / ut % 360
                }

                function li(n) {
                    var t = [];
                    return n = n.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function(n, i, r) {
                        return r = r.split(/\s*,\s*|\s+/), i == "rotate" && r.length == 1 && r.push(0, 0), i == "scale" && (r.length > 2 ? r = r.slice(0, 2) : r.length == 2 && r.push(0, 0), r.length == 1 && r.push(r[0], 0, 0)), i == "skewX" ? t.push(["m", 1, 0, u.tan(ct(r[0])), 1, 0, 0]) : i == "skewY" ? t.push(["m", 1, u.tan(ct(r[0])), 0, 1, 0, 0]) : t.push([i.charAt(0)].concat(r)), n
                    }), t
                }

                function ai(n, t) {
                    var y = bt(n),
                        u = new i.Matrix,
                        v, p;
                    if (y)
                        for (v = 0, p = y.length; v < p; v++) {
                            var r = y[v],
                                e = r.length,
                                c = l(r[0]).toLowerCase(),
                                a = r[0] != c,
                                o = a ? u.invert() : 0,
                                w, b, s, h, f;
                            c == "t" && e == 2 ? u.translate(r[1], 0) : c == "t" && e == 3 ? a ? (w = o.x(0, 0), b = o.y(0, 0), s = o.x(r[1], r[2]), h = o.y(r[1], r[2]), u.translate(s - w, h - b)) : u.translate(r[1], r[2]) : c == "r" ? e == 2 ? (f = f || t, u.rotate(r[1], f.x + f.width / 2, f.y + f.height / 2)) : e == 4 && (a ? (s = o.x(r[2], r[3]), h = o.y(r[2], r[3]), u.rotate(r[1], s, h)) : u.rotate(r[1], r[2], r[3])) : c == "s" ? e == 2 || e == 3 ? (f = f || t, u.scale(r[1], r[e - 1], f.x + f.width / 2, f.y + f.height / 2)) : e == 4 ? a ? (s = o.x(r[2], r[3]), h = o.y(r[2], r[3]), u.scale(r[1], r[1], s, h)) : u.scale(r[1], r[1], r[2], r[3]) : e == 5 && (a ? (s = o.x(r[3], r[4]), h = o.y(r[3], r[4]), u.scale(r[1], r[2], s, h)) : u.scale(r[1], r[2], r[3], r[4])) : c == "m" && e == 7 && u.add(r[1], r[2], r[3], r[4], r[5], r[6])
                        }
                    return u
                }

                function yi(n) {
                    var r = n.node.ownerSVGElement && h(n.node.ownerSVGElement) || n.node.parentNode && h(n.node.parentNode) || i.select("svg") || i(0, 0),
                        u = r.select("defs"),
                        t = u == null ? !1 : u.node;
                    return t || (t = tt("defs", r.node).node), t
                }

                function kt(n) {
                    return n.node.ownerSVGElement && h(n.node.ownerSVGElement) || i.select("svg")
                }

                function pi(n, t, i) {
                    function u(n) {
                        if (n == null) return k;
                        if (n == +n) return n;
                        o(e, {
                            width: n
                        });
                        try {
                            return e.getBBox().width
                        } catch (t) {
                            return 0
                        }
                    }

                    function f(n) {
                        if (n == null) return k;
                        if (n == +n) return n;
                        o(e, {
                            height: n
                        });
                        try {
                            return e.getBBox().height
                        } catch (t) {
                            return 0
                        }
                    }

                    function r(r, u) {
                        t == null ? h[r] = u(n.attr(r) || 0) : r == t && (h = u(i == null ? n.attr(r) || 0 : i))
                    }
                    var s = kt(n).node,
                        h = {},
                        e = s.querySelector(".svg---mgr");
                    e || (e = o("rect"), o(e, {
                        x: -9e9,
                        y: -9e9,
                        width: 10,
                        height: 10,
                        "class": "svg---mgr",
                        fill: "none"
                    }), s.appendChild(e));
                    switch (n.type) {
                        case "rect":
                            r("rx", u);
                            r("ry", f);
                        case "image":
                            r("width", u);
                            r("height", f);
                        case "text":
                            r("x", u);
                            r("y", f);
                            break;
                        case "circle":
                            r("cx", u);
                            r("cy", f);
                            r("r", u);
                            break;
                        case "ellipse":
                            r("cx", u);
                            r("cy", f);
                            r("rx", u);
                            r("ry", f);
                            break;
                        case "line":
                            r("x1", u);
                            r("x2", u);
                            r("y1", f);
                            r("y2", f);
                            break;
                        case "marker":
                            r("refX", u);
                            r("markerWidth", u);
                            r("refY", f);
                            r("markerHeight", f);
                            break;
                        case "radialGradient":
                            r("fx", u);
                            r("fy", f);
                            break;
                        case "tspan":
                            r("dx", u);
                            r("dy", f);
                            break;
                        default:
                            r(t, u)
                    }
                    return s.removeChild(e), h
                }

                function wi(n) {
                    var u;
                    r(n, "array") || (n = Array.prototype.slice.call(arguments, 0));
                    for (var t = 0, f = 0, i = this.node; this[t];) delete this[t++];
                    for (t = 0; t < n.length; t++) n[t].type == "set" ? n[t].forEach(function(n) {
                        i.appendChild(n.node)
                    }) : i.appendChild(n[t].node);
                    for (u = i.childNodes, t = 0; t < u.length; t++) this[f++] = h(u[t]);
                    return this
                }

                function v(n) {
                    var i, r, t;
                    if (n.snap in a) return a[n.snap];
                    try {
                        i = n.ownerSVGElement
                    } catch (u) {}
                    if (this.node = n, i && (this.paper = new s(i)), this.type = n.tagName || n.nodeName, r = this.id = ot(this), this.anims = {}, this._ = {
                            transform: []
                        }, n.snap = r, a[r] = this, this.type == "g" && (this.add = wi), this.type in {
                            g: 1,
                            mask: 1,
                            pattern: 1,
                            symbol: 1
                        })
                        for (t in s.prototype) s.prototype[c](t) && (this[t] = s.prototype[t])
                }

                function nt(n) {
                    this.node = n
                }

                function tt(n, t) {
                    var i = o(n);
                    return t.appendChild(i), h(i)
                }

                function s(n, t) {
                    var i, r, u, h = s.prototype,
                        l, e;
                    if (n && n.tagName && n.tagName.toLowerCase() == "svg") {
                        if (n.snap in a) return a[n.snap];
                        l = n.ownerDocument;
                        i = new v(n);
                        r = n.getElementsByTagName("desc")[0];
                        u = n.getElementsByTagName("defs")[0];
                        r || (r = o("desc"), r.appendChild(l.createTextNode("Created with Snap")), i.node.appendChild(r));
                        u || (u = o("defs"), i.node.appendChild(u));
                        i.defs = u;
                        for (e in h) h[c](e) && (i[e] = h[e]);
                        i.paper = i.root = i
                    } else i = tt("svg", f.doc.body), o(i.node, {
                        height: t,
                        version: 1.1,
                        width: n,
                        xmlns: d
                    });
                    return i
                }

                function h(n) {
                    return n ? n instanceof v || n instanceof nt ? n : n.tagName && n.tagName.toLowerCase() == "svg" ? new s(n) : n.tagName && n.tagName.toLowerCase() == "object" && n.type == "image/svg+xml" ? new s(n.contentDocument.getElementsByTagName("svg")[0]) : new v(n) : n
                }

                function dt(n, t) {
                    for (var r, u, i = 0, f = n.length; i < f; i++) r = {
                        type: n[i].type,
                        attr: n[i].attr()
                    }, u = n[i].children(), t.push(r), u.length && dt(u, r.childNodes = [])
                }
                var f, bt, vi, at, gt;
                i.version = "0.5.1";
                i.toString = function() {
                    return "Snap v" + this.version
                };
                i._ = {};
                f = {
                    win: n.window,
                    doc: n.window.document
                };
                i._.glob = f;
                var c = "hasOwnProperty",
                    l = String,
                    e = parseFloat,
                    p = parseInt,
                    u = Math,
                    it = u.max,
                    w = u.min,
                    rt = u.abs,
                    bi = u.pow,
                    ut = u.PI,
                    ki = u.round,
                    k = "",
                    ft = " ",
                    ni = Object.prototype.toString,
                    ti = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
                    di = i._.separator = /[,\s]+/,
                    et = /[\s]*,[\s]*/,
                    ii = {
                        hs: 1,
                        rg: 1
                    },
                    ri = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig,
                    ui = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\s]*,?[\s]*)+)/ig,
                    vt = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\s]*,?[\s]*/ig,
                    fi = 0,
                    ei = "S" + (+new Date).toString(36),
                    ot = function(n) {
                        return (n && n.type ? n.type : k) + ei + (fi++).toString(36)
                    },
                    st = "http://www.w3.org/1999/xlink",
                    d = "http://www.w3.org/2000/svg",
                    a = {},
                    gi = i.url = function(n) {
                        return "url('#" + n + "')"
                    };
                i._.$ = o;
                i._.id = ot;
                i.format = function() {
                    var n = /\{([^\}]+)\}/g,
                        t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                        i = function(n, i, r) {
                            var u = r;
                            return i.replace(t, function(n, t, i, r, f) {
                                t = t || r;
                                u && (t in u && (u = u[t]), typeof u == "function" && f && (u = u()))
                            }), u = (u == null || u == r ? n : u) + ""
                        };
                    return function(t, r) {
                        return l(t).replace(n, function(n, t) {
                            return i(n, t, r)
                        })
                    }
                }();
                i._.clone = yt;
                i._.cacher = b;
                i.rad = ct;
                i.deg = si;
                i.sin = function(n) {
                    return u.sin(i.rad(n))
                };
                i.tan = function(n) {
                    return u.tan(i.rad(n))
                };
                i.cos = function(n) {
                    return u.cos(i.rad(n))
                };
                i.asin = function(n) {
                    return i.deg(u.asin(n))
                };
                i.acos = function(n) {
                    return i.deg(u.acos(n))
                };
                i.atan = function(n) {
                    return i.deg(u.atan(n))
                };
                i.atan2 = function(n) {
                    return i.deg(u.atan2(n))
                };
                i.angle = ht;
                i.len = function(n, t, r, u) {
                    return Math.sqrt(i.len2(n, t, r, u))
                };
                i.len2 = function(n, t, i, r) {
                    return (n - i) * (n - i) + (t - r) * (t - r)
                };
                i.closestPoint = function(n, t, i) {
                    function h(n) {
                        var r = n.x - t,
                            u = n.y - i;
                        return r * r + u * u
                    }
                    for (var p, w, l, a, b, k, e = n.node, c = e.getTotalLength(), u = c / e.pathSegList.numberOfItems * .125, o, f, r = Infinity, v, s = 0, y; s <= c; s += u)(y = h(v = e.getPointAtLength(s))) < r && (o = v, f = s, r = y);
                    for (u *= .5; u > .5;)(l = f - u) >= 0 && (b = h(p = e.getPointAtLength(l))) < r ? (o = p, f = l, r = b) : (a = f + u) <= c && (k = h(w = e.getPointAtLength(a))) < r ? (o = w, f = a, r = k) : u *= .5;
                    return {
                        x: o.x,
                        y: o.y,
                        length: f,
                        distance: Math.sqrt(r)
                    }
                };
                i.is = r;
                i.snapTo = function(n, t, i) {
                    var f, u;
                    if (i = r(i, "finite") ? i : 10, r(n, "array")) {
                        for (f = n.length; f--;)
                            if (rt(n[f] - t) <= i) return n[f]
                    } else {
                        if (n = +n, u = t % n, u < i) return t - u;
                        if (u > n - i) return t - u + n
                    }
                    return t
                };
                i.getRGB = b(function(n) {
                    if (!n || !!((n = l(n)).indexOf("-") + 1)) return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: y
                    };
                    if (n == "none") return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        toString: y
                    };
                    if (ii[c](n.toLowerCase().substring(0, 2)) || n.charAt() == "#" || (n = lt(n)), !n) return {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: y
                    };
                    var o, s, h, a, v, t, f = n.match(ti);
                    return f ? (f[2] && (h = p(f[2].substring(5), 16), s = p(f[2].substring(3, 5), 16), o = p(f[2].substring(1, 3), 16)), f[3] && (h = p((v = f[3].charAt(3)) + v, 16), s = p((v = f[3].charAt(2)) + v, 16), o = p((v = f[3].charAt(1)) + v, 16)), f[4] && (t = f[4].split(et), o = e(t[0]), t[0].slice(-1) == "%" && (o *= 2.55), s = e(t[1]), t[1].slice(-1) == "%" && (s *= 2.55), h = e(t[2]), t[2].slice(-1) == "%" && (h *= 2.55), f[1].toLowerCase().slice(0, 4) == "rgba" && (a = e(t[3])), t[3] && t[3].slice(-1) == "%" && (a /= 100)), f[5]) ? (t = f[5].split(et), o = e(t[0]), t[0].slice(-1) == "%" && (o /= 100), s = e(t[1]), t[1].slice(-1) == "%" && (s /= 100), h = e(t[2]), t[2].slice(-1) == "%" && (h /= 100), (t[0].slice(-3) == "deg" || t[0].slice(-1) == "°") && (o /= 360), f[1].toLowerCase().slice(0, 4) == "hsba" && (a = e(t[3])), t[3] && t[3].slice(-1) == "%" && (a /= 100), i.hsb2rgb(o, s, h, a)) : f[6] ? (t = f[6].split(et), o = e(t[0]), t[0].slice(-1) == "%" && (o /= 100), s = e(t[1]), t[1].slice(-1) == "%" && (s /= 100), h = e(t[2]), t[2].slice(-1) == "%" && (h /= 100), (t[0].slice(-3) == "deg" || t[0].slice(-1) == "°") && (o /= 360), f[1].toLowerCase().slice(0, 4) == "hsla" && (a = e(t[3])), t[3] && t[3].slice(-1) == "%" && (a /= 100), i.hsl2rgb(o, s, h, a)) : (o = w(u.round(o), 255), s = w(u.round(s), 255), h = w(u.round(h), 255), a = w(it(a, 0), 1), f = {
                        r: o,
                        g: s,
                        b: h,
                        toString: y
                    }, f.hex = "#" + (16777216 | h | s << 8 | o << 16).toString(16).slice(1), f.opacity = r(a, "finite") ? a : 1, f) : {
                        r: -1,
                        g: -1,
                        b: -1,
                        hex: "none",
                        error: 1,
                        toString: y
                    }
                }, i);
                i.hsb = b(function(n, t, r) {
                    return i.hsb2rgb(n, t, r).hex
                });
                i.hsl = b(function(n, t, r) {
                    return i.hsl2rgb(n, t, r).hex
                });
                i.rgb = b(function(n, t, i, f) {
                    if (r(f, "finite")) {
                        var e = u.round;
                        return "rgba(" + [e(n), e(t), e(i), +f.toFixed(2)] + ")"
                    }
                    return "#" + (16777216 | i | t << 8 | n << 16).toString(16).slice(1)
                });
                var lt = function(n) {
                        var t = f.doc.getElementsByTagName("head")[0] || f.doc.getElementsByTagName("svg")[0],
                            i = "rgb(255, 0, 0)";
                        return lt = b(function(n) {
                            if (n.toLowerCase() == "red") return i;
                            t.style.color = i;
                            t.style.color = n;
                            var r = f.doc.defaultView.getComputedStyle(t, k).getPropertyValue("color");
                            return r == i ? null : r
                        }), lt(n)
                    },
                    hi = function() {
                        return "hsb(" + [this.h, this.s, this.b] + ")"
                    },
                    ci = function() {
                        return "hsl(" + [this.h, this.s, this.l] + ")"
                    },
                    y = function() {
                        return this.opacity == 1 || this.opacity == null ? this.hex : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")"
                    },
                    pt = function(n, t, u) {
                        if (t == null && r(n, "object") && "r" in n && "g" in n && "b" in n && (u = n.b, t = n.g, n = n.r), t == null && r(n, string)) {
                            var f = i.getRGB(n);
                            n = f.r;
                            t = f.g;
                            u = f.b
                        }
                        return (n > 1 || t > 1 || u > 1) && (n /= 255, t /= 255, u /= 255), [n, t, u]
                    },
                    wt = function(n, t, f, e) {
                        n = u.round(n * 255);
                        t = u.round(t * 255);
                        f = u.round(f * 255);
                        var o = {
                            r: n,
                            g: t,
                            b: f,
                            opacity: r(e, "finite") ? e : 1,
                            hex: i.rgb(n, t, f),
                            toString: y
                        };
                        return r(e, "finite") && (o.opacity = e), o
                    };
                i.color = function(n) {
                    var t;
                    return r(n, "object") && "h" in n && "s" in n && "b" in n ? (t = i.hsb2rgb(n), n.r = t.r, n.g = t.g, n.b = t.b, n.opacity = 1, n.hex = t.hex) : r(n, "object") && "h" in n && "s" in n && "l" in n ? (t = i.hsl2rgb(n), n.r = t.r, n.g = t.g, n.b = t.b, n.opacity = 1, n.hex = t.hex) : (r(n, "string") && (n = i.getRGB(n)), r(n, "object") && "r" in n && "g" in n && "b" in n && !("error" in n) ? (t = i.rgb2hsl(n), n.h = t.h, n.s = t.s, n.l = t.l, t = i.rgb2hsb(n), n.v = t.b) : (n = {
                        hex: "none"
                    }, n.r = n.g = n.b = n.h = n.s = n.v = n.l = -1, n.error = 1)), n.toString = y, n
                };
                i.hsb2rgb = function(n, t, i, u) {
                    r(n, "object") && "h" in n && "s" in n && "b" in n && (i = n.b, t = n.s, u = n.o, n = n.h);
                    n *= 360;
                    var o, s, h, e, f;
                    return n = n % 360 / 60, f = i * t, e = f * (1 - rt(n % 2 - 1)), o = s = h = i - f, n = ~~n, o += [f, e, 0, 0, e, f][n], s += [e, f, f, e, 0, 0][n], h += [0, 0, e, f, f, e][n], wt(o, s, h, u)
                };
                i.hsl2rgb = function(n, t, i, u) {
                    r(n, "object") && "h" in n && "s" in n && "l" in n && (i = n.l, t = n.s, n = n.h);
                    (n > 1 || t > 1 || i > 1) && (n /= 360, t /= 100, i /= 100);
                    n *= 360;
                    var o, s, h, e, f;
                    return n = n % 360 / 60, f = 2 * t * (i < .5 ? i : 1 - i), e = f * (1 - rt(n % 2 - 1)), o = s = h = i - f / 2, n = ~~n, o += [f, e, 0, 0, e, f][n], s += [e, f, f, e, 0, 0][n], h += [0, 0, e, f, f, e][n], wt(o, s, h, u)
                };
                i.rgb2hsb = function(n, t, i) {
                    i = pt(n, t, i);
                    n = i[0];
                    t = i[1];
                    i = i[2];
                    var f, e, u, r;
                    return u = it(n, t, i), r = u - w(n, t, i), f = r == 0 ? null : u == n ? (t - i) / r : u == t ? (i - n) / r + 2 : (n - t) / r + 4, f = (f + 360) % 6 / 6, e = r == 0 ? 0 : r / u, {
                        h: f,
                        s: e,
                        b: u,
                        toString: hi
                    }
                };
                i.rgb2hsl = function(n, t, i) {
                    i = pt(n, t, i);
                    n = i[0];
                    t = i[1];
                    i = i[2];
                    var e, s, u, f, o, r;
                    return f = it(n, t, i), o = w(n, t, i), r = f - o, e = r == 0 ? null : f == n ? (t - i) / r : f == t ? (i - n) / r + 2 : (n - t) / r + 4, e = (e + 360) % 6 / 6, u = (f + o) / 2, s = r == 0 ? 0 : u < .5 ? r / (2 * u) : r / (2 - 2 * u), {
                        h: e,
                        s: s,
                        l: u,
                        toString: ci
                    }
                };
                i.parsePathString = function(n) {
                    var u, f, t;
                    return n ? (u = i.path(n), u.arr) ? i.path.clone(u.arr) : (f = {
                        a: 7,
                        c: 6,
                        o: 2,
                        h: 1,
                        l: 2,
                        m: 2,
                        r: 4,
                        q: 4,
                        s: 4,
                        t: 2,
                        v: 1,
                        u: 3,
                        z: 0
                    }, t = [], r(n, "array") && r(n[0], "array") && (t = i.path.clone(n)), t.length || l(n).replace(ri, function(n, i, r) {
                        var u = [],
                            e = i.toLowerCase();
                        if (r.replace(vt, function(n, t) {
                                t && u.push(+t)
                            }), e == "m" && u.length > 2 && (t.push([i].concat(u.splice(0, 2))), e = "l", i = i == "m" ? "l" : "L"), e == "o" && u.length == 1 && t.push([i, u[0]]), e == "r") t.push([i].concat(u));
                        else
                            while (u.length >= f[e])
                                if (t.push([i].concat(u.splice(0, f[e]))), !f[e]) break
                    }), t.toString = i.path.toString, u.arr = i.path.clone(t), t) : null
                };
                bt = i.parseTransformString = function(n) {
                    if (!n) return null;
                    var t = [];
                    return r(n, "array") && r(n[0], "array") && (t = i.path.clone(n)), t.length || l(n).replace(ui, function(n, i, r) {
                        var u = [],
                            f = i.toLowerCase();
                        r.replace(vt, function(n, t) {
                            t && u.push(+t)
                        });
                        t.push([i].concat(u))
                    }), t.toString = i.path.toString, t
                };
                i._.svgTransform2string = li;
                i._.rgTransform = /^[a-z][\s]*-?\.?\d/i;
                i._.transform2matrix = ai;
                i._unit2px = pi;
                vi = f.doc.contains || f.doc.compareDocumentPosition ? function(n, t) {
                    var r = n.nodeType == 9 ? n.documentElement : n,
                        i = t && t.parentNode;
                    return n == i || !!(i && i.nodeType == 1 && (r.contains ? r.contains(i) : n.compareDocumentPosition && n.compareDocumentPosition(i) & 16))
                } : function(n, t) {
                    if (t)
                        while (t)
                            if (t = t.parentNode, t == n) return !0;
                    return !1
                };
                i._.getSomeDefs = yi;
                i._.getSomeSVG = kt;
                i.select = function(n) {
                    return n = l(n).replace(/([^\\]):/g, "$1\\:"), h(f.doc.querySelector(n))
                };
                i.selectAll = function(n) {
                    for (var r = f.doc.querySelectorAll(n), u = (i.set || Array)(), t = 0; t < r.length; t++) u.push(h(r[t]));
                    return u
                };
                setInterval(function() {
                    var t, i, n;
                    for (t in a) a[c](t) && (i = a[t], n = i.node, (i.type != "svg" && !n.ownerSVGElement || i.type == "svg" && (!n.parentNode || "ownerSVGElement" in n.parentNode && !n.ownerSVGElement)) && delete a[t])
                }, 1e4);
                v.prototype.attr = function(n, i) {
                    var f = this,
                        s = f.node,
                        e, h, u, a, l, o;
                    if (!n) {
                        if (s.nodeType != 1) return {
                            text: s.nodeValue
                        };
                        for (e = s.attributes, h = {}, u = 0, a = e.length; u < a; u++) h[e[u].nodeName] = e[u].nodeValue;
                        return h
                    }
                    if (r(n, "string"))
                        if (arguments.length > 1) l = {}, l[n] = i, n = l;
                        else return t("snap.util.getattr." + n, f).firstDefined();
                    for (o in n) n[c](o) && t("snap.util.attr." + o, f, n[o]);
                    return f
                };
                i.parse = function(n) {
                    var t = f.doc.createDocumentFragment(),
                        i = !0,
                        r = f.doc.createElement("div");
                    if (n = l(n), n.match(/^\s*<\s*svg(?:\s|>)/) || (n = "<svg>" + n + "<\/svg>", i = !1), r.innerHTML = n, n = r.getElementsByTagName("svg")[0], n)
                        if (i) t = n;
                        else
                            while (n.firstChild) t.appendChild(n.firstChild);
                    return new nt(t)
                };
                i.fragment = function() {
                    for (var n, u = Array.prototype.slice.call(arguments, 0), t = f.doc.createDocumentFragment(), r = 0, e = u.length; r < e; r++) n = u[r], n.node && n.node.nodeType && t.appendChild(n.node), n.nodeType && t.appendChild(n), typeof n == "string" && t.appendChild(i.parse(n).node);
                    return new nt(t)
                };
                i._.make = tt;
                i._.wrap = h;
                s.prototype.el = function(n, t) {
                    var i = tt(n, this.node);
                    return t && i.attr(t), i
                };
                v.prototype.children = function() {
                    for (var t = [], r = this.node.childNodes, n = 0, u = r.length; n < u; n++) t[n] = i(r[n]);
                    return t
                };
                v.prototype.toJSON = function() {
                    var n = [];
                    return dt([this], n), n[0]
                };
                t.on("snap.util.getattr", function() {
                    var n = t.nt(),
                        i;
                    return n = n.substring(n.lastIndexOf(".") + 1), i = n.replace(/[A-Z]/g, function(n) {
                        return "-" + n.toLowerCase()
                    }), at[c](i) ? this.node.ownerDocument.defaultView.getComputedStyle(this.node, null).getPropertyValue(i) : o(this.node, n)
                });
                at = {
                    "alignment-baseline": 0,
                    "baseline-shift": 0,
                    clip: 0,
                    "clip-path": 0,
                    "clip-rule": 0,
                    color: 0,
                    "color-interpolation": 0,
                    "color-interpolation-filters": 0,
                    "color-profile": 0,
                    "color-rendering": 0,
                    cursor: 0,
                    direction: 0,
                    display: 0,
                    "dominant-baseline": 0,
                    "enable-background": 0,
                    fill: 0,
                    "fill-opacity": 0,
                    "fill-rule": 0,
                    filter: 0,
                    "flood-color": 0,
                    "flood-opacity": 0,
                    font: 0,
                    "font-family": 0,
                    "font-size": 0,
                    "font-size-adjust": 0,
                    "font-stretch": 0,
                    "font-style": 0,
                    "font-variant": 0,
                    "font-weight": 0,
                    "glyph-orientation-horizontal": 0,
                    "glyph-orientation-vertical": 0,
                    "image-rendering": 0,
                    kerning: 0,
                    "letter-spacing": 0,
                    "lighting-color": 0,
                    marker: 0,
                    "marker-end": 0,
                    "marker-mid": 0,
                    "marker-start": 0,
                    mask: 0,
                    opacity: 0,
                    overflow: 0,
                    "pointer-events": 0,
                    "shape-rendering": 0,
                    "stop-color": 0,
                    "stop-opacity": 0,
                    stroke: 0,
                    "stroke-dasharray": 0,
                    "stroke-dashoffset": 0,
                    "stroke-linecap": 0,
                    "stroke-linejoin": 0,
                    "stroke-miterlimit": 0,
                    "stroke-opacity": 0,
                    "stroke-width": 0,
                    "text-anchor": 0,
                    "text-decoration": 0,
                    "text-rendering": 0,
                    "unicode-bidi": 0,
                    visibility: 0,
                    "word-spacing": 0,
                    "writing-mode": 0
                };
                t.on("snap.util.attr", function(n) {
                    var i = t.nt(),
                        r = {},
                        u, f;
                    i = i.substring(i.lastIndexOf(".") + 1);
                    r[i] = n;
                    u = i.replace(/-(\w)/gi, function(n, t) {
                        return t.toUpperCase()
                    });
                    f = i.replace(/[A-Z]/g, function(n) {
                        return "-" + n.toLowerCase()
                    });
                    at[c](f) ? this.node.style[u] = n == null ? k : n : o(this.node, r)
                });
                return function() {}(s.prototype), i.ajax = function(n, i, u, f) {
                    var e = new XMLHttpRequest,
                        o = ot(),
                        h, s;
                    if (e) {
                        if (r(i, "function")) f = u, u = i, i = null;
                        else if (r(i, "object")) {
                            h = [];
                            for (s in i) i.hasOwnProperty(s) && h.push(encodeURIComponent(s) + "=" + encodeURIComponent(i[s]));
                            i = h.join("&")
                        }
                        if (e.open(i ? "POST" : "GET", n, !0), i && (e.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.setRequestHeader("Content-type", "application/x-www-form-urlencoded")), u) {
                            t.once("snap.ajax." + o + ".0", u);
                            t.once("snap.ajax." + o + ".200", u);
                            t.once("snap.ajax." + o + ".304", u)
                        }
                        return (e.onreadystatechange = function() {
                            e.readyState == 4 && t("snap.ajax." + o + "." + e.status, f, e)
                        }, e.readyState == 4) ? e : (e.send(i), e)
                    }
                }, i.load = function(n, t, r) {
                    i.ajax(n, function(n) {
                        var u = i.parse(n.responseText);
                        r ? t.call(r, u) : t(u)
                    })
                }, gt = function(n) {
                    var r = n.getBoundingClientRect(),
                        u = n.ownerDocument,
                        t = u.body,
                        i = u.documentElement,
                        f = i.clientTop || t.clientTop || 0,
                        e = i.clientLeft || t.clientLeft || 0,
                        o = r.top + (g.win.pageYOffset || i.scrollTop || t.scrollTop) - f,
                        s = r.left + (g.win.pageXOffset || i.scrollLeft || t.scrollLeft) - e;
                    return {
                        y: o,
                        x: s
                    }
                }, i.getElementByPoint = function(n, t) {
                    var o = this,
                        s = o.canvas,
                        i = f.doc.elementFromPoint(n, t),
                        e, r, u;
                    return (f.win.opera && i.tagName == "svg" && (e = gt(i), r = i.createSVGRect(), r.x = n - e.x, r.y = t - e.y, r.width = r.height = 1, u = i.getIntersectionList(r, null), u.length && (i = u[u.length - 1])), !i) ? null : h(i)
                }, i.plugin = function(n) {
                    n(i, v, s, f, nt)
                }, f.win.Snap = i, i
            }(n || this);
        return i.plugin(function(i, r, u, f, e) {
            function p(n, t) {
                var u, r;
                if (t == null) {
                    if (u = !0, t = n.type == "linearGradient" || n.type == "radialGradient" ? n.node.getAttribute("gradientTransform") : n.type == "pattern" ? n.node.getAttribute("patternTransform") : n.node.getAttribute("transform"), !t) return new i.Matrix;
                    t = i._.svgTransform2string(t)
                } else t = i._.rgTransform.test(t) ? l(t).replace(/\.{3}|\u2026/g, n._.transform || "") : i._.svgTransform2string(t), v(t, "array") && (t = i.path ? i.path.toString.call(t) : l(t)), n._.transform = t;
                if (r = i._.transform2matrix(t, n.getBBox(1)), u) return r;
                n.matrix = r
            }

            function g(n) {
                function f(n, t) {
                    var r = s(n.node, t);
                    if (r = r && r.match(y), r = r && r[2], r && r.charAt() == "#") r = r.substring(1);
                    else return;
                    r && (u[r] = (u[r] || []).concat(function(r) {
                        var u = {};
                        u[t] = i.url(r);
                        s(n.node, u)
                    }))
                }

                function p(n) {
                    var t = s(n.node, "xlink:href");
                    if (t && t.charAt() == "#") t = t.substring(1);
                    else return;
                    t && (u[t] = (u[t] || []).concat(function(t) {
                        n.attr("xlink:href", "#" + t)
                    }))
                }
                for (var l, o, h, v, a = n.selectAll("*"), t, y = /^\s*url\(("|'|)(.*)\1\)\s*$/, e = [], u = {}, r = 0, c = a.length; r < c; r++) t = a[r], f(t, "fill"), f(t, "stroke"), f(t, "filter"), f(t, "mask"), f(t, "clip-path"), p(t), l = s(t.node, "id"), l && (s(t.node, {
                    id: t.id
                }), e.push({
                    old: l,
                    id: t.id
                }));
                for (r = 0, c = e.length; r < c; r++)
                    if (o = u[e[r].old], o)
                        for (h = 0, v = o.length; h < v; h++) o[h](e[r].id)
            }

            function b(n) {
                return function() {
                    var i = n ? "<" + this.type : "",
                        f = this.node.attributes,
                        r = this.node.childNodes,
                        t, u;
                    if (n)
                        for (t = 0, u = f.length; t < u; t++) i += " " + f[t].name + '="' + f[t].value.replace(/"/g, '\\"') + '"';
                    if (r.length) {
                        for (n && (i += ">"), t = 0, u = r.length; t < u; t++) r[t].nodeType == 3 ? i += r[t].nodeValue : r[t].nodeType == 1 && (i += h(r[t]).toString());
                        n && (i += "<\/" + this.type + ">")
                    } else n && (i += "/>");
                    return i
                }
            }
            var o = r.prototype,
                v = i.is,
                l = String,
                k = i._unit2px,
                s = i._.$,
                a = i._.make,
                y = i._.getSomeDefs,
                d = "hasOwnProperty",
                h = i._.wrap,
                w, c;
            o.getBBox = function(n) {
                var t, u, e, r, f;
                if (this.type == "tspan") return i._.box(this.node.getClientRects().item(0));
                if (!i.Matrix || !i.path) return this.node.getBBox();
                if (t = this, u = new i.Matrix, t.removed) return i._.box();
                while (t.type == "use") n || (u = u.add(t.transform().localMatrix.translate(t.attr("x") || 0, t.attr("y") || 0))), t.original ? t = t.original : (e = t.attr("xlink:href"), t = t.original = t.node.ownerDocument.getElementById(e.substring(e.indexOf("#") + 1)));
                r = t._;
                f = i.path.get[t.type] || i.path.get.deflt;
                try {
                    return n ? (r.bboxwt = f ? i.path.getBBox(t.realPath = f(t)) : i._.box(t.node.getBBox()), i._.box(r.bboxwt)) : (t.realPath = f(t), t.matrix = t.transform().localMatrix, r.bbox = i.path.getBBox(i.path.map(t.realPath, u.add(t.matrix))), i._.box(r.bbox))
                } catch (o) {
                    return i._.box()
                }
            };
            w = function() {
                return this.string
            };
            o.transform = function(n) {
                var c = this._;
                if (n == null) {
                    for (var r = this, u = new i.Matrix(this.node.getCTM()), t = p(this), f = [t], e = new i.Matrix, o, h = t.toTransformString(), a = l(t) == l(this.matrix) ? l(c.transform) : h; r.type != "svg" && (r = r.parent());) f.push(p(r));
                    for (o = f.length; o--;) e.add(f[o]);
                    return {
                        string: a,
                        globalMatrix: u,
                        totalMatrix: e,
                        localMatrix: t,
                        diffMatrix: u.clone().add(t.invert()),
                        global: u.toTransformString(),
                        total: e.toTransformString(),
                        local: h,
                        toString: w
                    }
                }
                return n instanceof i.Matrix ? (this.matrix = n, this._.transform = n.toTransformString()) : p(this, n), this.node && (this.type == "linearGradient" || this.type == "radialGradient" ? s(this.node, {
                    gradientTransform: this.matrix
                }) : this.type == "pattern" ? s(this.node, {
                    patternTransform: this.matrix
                }) : s(this.node, {
                    transform: this.matrix
                })), this
            };
            o.parent = function() {
                return h(this.node.parentNode)
            };
            o.append = o.add = function(n) {
                if (n) {
                    if (n.type == "set") {
                        var t = this;
                        return n.forEach(function(n) {
                            t.add(n)
                        }), this
                    }
                    n = h(n);
                    this.node.appendChild(n.node);
                    n.paper = this.paper
                }
                return this
            };
            o.appendTo = function(n) {
                return n && (n = h(n), n.append(this)), this
            };
            o.prepend = function(n) {
                var r, t, i;
                if (n) {
                    if (n.type == "set") return r = this, n.forEach(function(n) {
                        t ? t.after(n) : r.prepend(n);
                        t = n
                    }), this;
                    n = h(n);
                    i = n.parent();
                    this.node.insertBefore(n.node, this.node.firstChild);
                    this.add && this.add();
                    n.paper = this.paper;
                    this.parent() && this.parent().add();
                    i && i.add()
                }
                return this
            };
            o.prependTo = function(n) {
                return n = h(n), n.prepend(this), this
            };
            o.before = function(n) {
                var t, i;
                return n.type == "set" ? (t = this, n.forEach(function(n) {
                    var i = n.parent();
                    t.node.parentNode.insertBefore(n.node, t.node);
                    i && i.add()
                }), this.parent().add(), this) : (n = h(n), i = n.parent(), this.node.parentNode.insertBefore(n.node, this.node), this.parent() && this.parent().add(), i && i.add(), n.paper = this.paper, this)
            };
            o.after = function(n) {
                n = h(n);
                var t = n.parent();
                return this.node.nextSibling ? this.node.parentNode.insertBefore(n.node, this.node.nextSibling) : this.node.parentNode.appendChild(n.node), this.parent() && this.parent().add(), t && t.add(), n.paper = this.paper, this
            };
            o.insertBefore = function(n) {
                n = h(n);
                var t = this.parent();
                return n.node.parentNode.insertBefore(this.node, n.node), this.paper = n.paper, t && t.add(), n.parent() && n.parent().add(), this
            };
            o.insertAfter = function(n) {
                n = h(n);
                var t = this.parent();
                return n.node.parentNode.insertBefore(this.node, n.node.nextSibling), this.paper = n.paper, t && t.add(), n.parent() && n.parent().add(), this
            };
            o.remove = function() {
                var n = this.parent();
                return this.node.parentNode && this.node.parentNode.removeChild(this.node), delete this.paper, this.removed = !0, n && n.add(), this
            };
            o.select = function(n) {
                return h(this.node.querySelector(n))
            };
            o.selectAll = function(n) {
                for (var r = this.node.querySelectorAll(n), u = (i.set || Array)(), t = 0; t < r.length; t++) u.push(h(r[t]));
                return u
            };
            o.asPX = function(n, t) {
                return t == null && (t = this.attr(n)), +k(this, n, t)
            };
            o.use = function() {
                var n, t = this.node.id;
                return t || (t = this.id, s(this.node, {
                    id: t
                })), n = this.type == "linearGradient" || this.type == "radialGradient" || this.type == "pattern" ? a(this.type, this.node.parentNode) : a("use", this.node.parentNode), s(n.node, {
                    "xlink:href": "#" + t
                }), n.original = this, n
            };
            o.clone = function() {
                var n = h(this.node.cloneNode(!0));
                return s(n.node, "id") && s(n.node, {
                    id: n.id
                }), g(n), n.insertAfter(this), n
            };
            o.toDefs = function() {
                var n = y(this);
                return n.appendChild(this.node), this
            };
            o.pattern = o.toPattern = function(n, t, i, r) {
                var u = a("pattern", y(this));
                return n == null && (n = this.getBBox()), v(n, "object") && "x" in n && (t = n.y, i = n.width, r = n.height, n = n.x), s(u.node, {
                    x: n,
                    y: t,
                    width: i,
                    height: r,
                    patternUnits: "userSpaceOnUse",
                    id: u.id,
                    viewBox: [n, t, i, r].join(" ")
                }), u.node.appendChild(this.node), u
            };
            o.marker = function(n, t, i, r, u, f) {
                var e = a("marker", y(this));
                return n == null && (n = this.getBBox()), v(n, "object") && "x" in n && (t = n.y, i = n.width, r = n.height, u = n.refX || n.cx, f = n.refY || n.cy, n = n.x), s(e.node, {
                    viewBox: [n, t, i, r].join(" "),
                    markerWidth: i,
                    markerHeight: r,
                    orient: "auto",
                    refX: u || 0,
                    refY: f || 0,
                    id: e.id
                }), e.node.appendChild(this.node), e
            };
            c = {};
            o.data = function(n, r) {
                var u = c[this.id] = c[this.id] || {},
                    f;
                if (arguments.length == 0) return t("snap.data.get." + this.id, this, u, null), u;
                if (arguments.length == 1) {
                    if (i.is(n, "object")) {
                        for (f in n) n[d](f) && this.data(f, n[f]);
                        return this
                    }
                    return t("snap.data.get." + this.id, this, u[n], n), u[n]
                }
                return u[n] = r, t("snap.data.set." + this.id, this, r, n), this
            };
            o.removeData = function(n) {
                return n == null ? c[this.id] = {} : c[this.id] && delete c[this.id][n], this
            };
            o.outerSVG = o.toString = b(1);
            o.innerSVG = b();
            o.toDataURL = function() {
                if (n && n.btoa) {
                    var t = this.getBBox(),
                        r = i.format('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="{x} {y} {width} {height}">{contents}<\/svg>', {
                            x: +t.x.toFixed(3),
                            y: +t.y.toFixed(3),
                            width: +t.width.toFixed(3),
                            height: +t.height.toFixed(3),
                            contents: this.outerSVG()
                        });
                    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(r)))
                }
            };
            e.prototype.select = o.select;
            e.prototype.selectAll = o.selectAll
        }), i.plugin(function(n, i) {
            function h(n, t, i) {
                return function(r) {
                    var u = r.slice(n, t);
                    return u.length == 1 && (u = u[0]), i ? i(u) : u
                }
            }
            var f = i.prototype,
                o = n.is,
                s = String,
                e = "hasOwnProperty",
                u = function(n, t, i, u) {
                    typeof i != "function" || i.length || (u = i, i = r.linear);
                    this.attr = n;
                    this.dur = t;
                    i && (this.easing = i);
                    u && (this.callback = u)
                };
            n._.Animation = u;
            n.animation = function(n, t, i, r) {
                return new u(n, t, i, r)
            };
            f.inAnim = function() {
                var n = this,
                    t = [];
                for (var i in n.anims) n.anims[e](i) && function(n) {
                    t.push({
                        anim: new u(n._attrs, n.dur, n.easing, n._callback),
                        mina: n,
                        curStatus: n.status(),
                        status: function(t) {
                            return n.status(t)
                        },
                        stop: function() {
                            n.stop()
                        }
                    })
                }(n.anims[i]);
                return t
            };
            n.animate = function(n, i, u, f, e, o) {
                typeof e != "function" || e.length || (o = e, e = r.linear);
                var s = r.time(),
                    h = r(n, i, s, s + f, r.time, u, e);
                return o && t.once("mina.finish." + h.id, o), h
            };
            f.stop = function() {
                for (var t = this.inAnim(), n = 0, i = t.length; n < i; n++) t[n].stop();
                return this
            };
            f.animate = function(n, i, f, c) {
                var v, tt, g, l;
                typeof f != "function" || f.length || (c = f, f = r.linear);
                n instanceof u && (c = n.callback, f = n.easing, i = n.dur, n = n.attr);
                var y = [],
                    k = [],
                    w = {},
                    p, d, nt, b, a = this;
                for (v in n) n[e](v) && (a.equal ? (b = a.equal(v, s(n[v])), p = b.from, d = b.to, nt = b.f) : (p = +a.attr(v), d = +n[v]), tt = o(p, "array") ? p.length : 1, w[v] = h(y.length, y.length + tt, nt), y = y.concat(p), k = k.concat(d));
                g = r.time();
                l = r(y, k, g, g + i, r.time, function(n) {
                    var i = {};
                    for (var t in w) w[e](t) && (i[t] = w[t](n));
                    a.attr(i)
                }, f);
                a.anims[l.id] = l;
                l._attrs = n;
                l._callback = c;
                t("snap.animcreated." + a.id, l);
                t.once("mina.finish." + l.id, function() {
                    t.off("mina.*." + l.id);
                    delete a.anims[l.id];
                    c && c.call(a)
                });
                t.once("mina.stop." + l.id, function() {
                    t.off("mina.*." + l.id);
                    delete a.anims[l.id]
                });
                return a
            }
        }), i.plugin(function(n) {
            function i(n, t, i, r, f, e) {
                if (t == null && u.call(n) == "[object SVGMatrix]") {
                    this.a = n.a;
                    this.b = n.b;
                    this.c = n.c;
                    this.d = n.d;
                    this.e = n.e;
                    this.f = n.f;
                    return
                }
                n != null ? (this.a = +n, this.b = +t, this.c = +i, this.d = +r, this.e = +f, this.f = +e) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
            }
            var u = Object.prototype.toString,
                f = String,
                t = Math,
                r = "";
            (function(u) {
                function e(n) {
                    return n[0] * n[0] + n[1] * n[1]
                }

                function o(n) {
                    var i = t.sqrt(e(n));
                    n[0] && (n[0] /= i);
                    n[1] && (n[1] /= i)
                }
                u.add = function(n, t, r, u, f, e) {
                    if (n && n instanceof i) return this.add(n.a, n.b, n.c, n.d, n.e, n.f);
                    var o = n * this.a + t * this.c,
                        s = n * this.b + t * this.d;
                    return this.e += f * this.a + e * this.c, this.f += f * this.b + e * this.d, this.c = r * this.a + u * this.c, this.d = r * this.b + u * this.d, this.a = o, this.b = s, this
                };
                i.prototype.multLeft = function(n, t, r, u, f, e) {
                    if (n && n instanceof i) return this.multLeft(n.a, n.b, n.c, n.d, n.e, n.f);
                    var o = n * this.a + r * this.b,
                        s = n * this.c + r * this.d,
                        h = n * this.e + r * this.f + f;
                    return this.b = t * this.a + u * this.b, this.d = t * this.c + u * this.d, this.f = t * this.e + u * this.f + e, this.a = o, this.c = s, this.e = h, this
                };
                u.invert = function() {
                    var n = this,
                        t = n.a * n.d - n.b * n.c;
                    return new i(n.d / t, -n.b / t, -n.c / t, n.a / t, (n.c * n.f - n.d * n.e) / t, (n.b * n.e - n.a * n.f) / t)
                };
                u.clone = function() {
                    return new i(this.a, this.b, this.c, this.d, this.e, this.f)
                };
                u.translate = function(n, t) {
                    return this.e += n * this.a + t * this.c, this.f += n * this.b + t * this.d, this
                };
                u.scale = function(n, t, i, r) {
                    return t == null && (t = n), (i || r) && this.translate(i, r), this.a *= n, this.b *= n, this.c *= t, this.d *= t, (i || r) && this.translate(-i, -r), this
                };
                u.rotate = function(i, r, u) {
                    i = n.rad(i);
                    r = r || 0;
                    u = u || 0;
                    var f = +t.cos(i).toFixed(9),
                        e = +t.sin(i).toFixed(9);
                    return this.add(f, e, -e, f, r, u), this.add(1, 0, 0, 1, -r, -u)
                };
                u.skewX = function(n) {
                    return this.skew(n, 0)
                };
                u.skewY = function(n) {
                    return this.skew(0, n)
                };
                u.skew = function(i, r) {
                    i = i || 0;
                    r = r || 0;
                    i = n.rad(i);
                    r = n.rad(r);
                    var u = t.tan(i).toFixed(9),
                        f = t.tan(r).toFixed(9);
                    return this.add(1, f, u, 1, 0, 0)
                };
                u.x = function(n, t) {
                    return n * this.a + t * this.c + this.e
                };
                u.y = function(n, t) {
                    return n * this.b + t * this.d + this.f
                };
                u.get = function(n) {
                    return +this[f.fromCharCode(97 + n)].toFixed(4)
                };
                u.toString = function() {
                    return "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")"
                };
                u.offset = function() {
                    return [this.e.toFixed(4), this.f.toFixed(4)]
                };
                u.determinant = function() {
                    return this.a * this.d - this.b * this.c
                };
                u.split = function() {
                    var i = {},
                        r, u, f;
                    return i.dx = this.e, i.dy = this.f, r = [
                        [this.a, this.b],
                        [this.c, this.d]
                    ], i.scalex = t.sqrt(e(r[0])), o(r[0]), i.shear = r[0][0] * r[1][0] + r[0][1] * r[1][1], r[1] = [r[1][0] - r[0][0] * i.shear, r[1][1] - r[0][1] * i.shear], i.scaley = t.sqrt(e(r[1])), o(r[1]), i.shear /= i.scaley, this.determinant() < 0 && (i.scalex = -i.scalex), u = r[0][1], f = r[1][1], f < 0 ? (i.rotate = n.deg(t.acos(f)), u < 0 && (i.rotate = 360 - i.rotate)) : i.rotate = n.deg(t.asin(u)), i.isSimple = !+i.shear.toFixed(9) && (i.scalex.toFixed(9) == i.scaley.toFixed(9) || !i.rotate), i.isSuperSimple = !+i.shear.toFixed(9) && i.scalex.toFixed(9) == i.scaley.toFixed(9) && !i.rotate, i.noRotation = !+i.shear.toFixed(9) && !i.rotate, i
                };
                u.toTransformString = function(n) {
                    var t = n || this.split();
                    return +t.shear.toFixed(9) ? "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)] : (t.scalex = +t.scalex.toFixed(4), t.scaley = +t.scaley.toFixed(4), t.rotate = +t.rotate.toFixed(4), (t.dx || t.dy ? "t" + [+t.dx.toFixed(4), +t.dy.toFixed(4)] : r) + (t.rotate ? "r" + [+t.rotate.toFixed(4), 0, 0] : r) + (t.scalex != 1 || t.scaley != 1 ? "s" + [t.scalex, t.scaley, 0, 0] : r))
                }
            })(i.prototype);
            n.Matrix = i;
            n.matrix = function(n, t, r, u, f, e) {
                return new i(n, t, r, u, f, e)
            }
        }), i.plugin(function(n, i, r, u, f) {
            function p(r) {
                return function(u) {
                    var o, a, v;
                    t.stop();
                    u instanceof f && u.node.childNodes.length == 1 && (u.node.firstChild.tagName == "radialGradient" || u.node.firstChild.tagName == "linearGradient" || u.node.firstChild.tagName == "pattern") && (u = u.node.firstChild, s(this).appendChild(u), u = h(u));
                    u instanceof i ? u.type == "radialGradient" || u.type == "linearGradient" || u.type == "pattern" ? (u.node.id || e(u.node, {
                        id: u.id
                    }), o = c(u.node.id)) : o = u.attr(r) : (o = n.color(u), o.error ? (a = n(s(this).ownerSVGElement).gradient(u), a ? (a.node.id || e(a.node, {
                        id: a.id
                    }), o = c(a.node.id)) : o = u) : o = l(o));
                    v = {};
                    v[r] = o;
                    e(this.node, v);
                    this.node.style[r] = g
                }
            }

            function b(n) {
                t.stop();
                n == +n && (n += "px");
                this.node.style.fontSize = n
            }

            function k(n) {
                for (var t, i = [], u = n.childNodes, r = 0, f = u.length; r < f; r++) t = u[r], t.nodeType == 3 && i.push(t.nodeValue), t.tagName == "tspan" && (t.childNodes.length == 1 && t.firstChild.nodeType == 3 ? i.push(t.firstChild.nodeValue) : i.push(k(t)));
                return i
            }

            function d() {
                return t.stop(), this.node.style.fontSize
            }
            var a = n._.make,
                h = n._.wrap,
                o = n.is,
                s = n._.getSomeDefs,
                v = /^url\((['"]?)([^)]+)\1\)$/,
                e = n._.$,
                c = n.url,
                l = String,
                y = n._.separator,
                g = "",
                w;
            n.deurl = function(n) {
                var t = String(n).match(v);
                return t ? t[2] : n
            };
            t.on("snap.util.attr.mask", function(n) {
                if (n instanceof i || n instanceof f) {
                    if (t.stop(), n instanceof f && n.node.childNodes.length == 1 && (n = n.node.firstChild, s(this).appendChild(n), n = h(n)), n.type == "mask") var r = n;
                    else r = a("mask", s(this)), r.node.appendChild(n.node);
                    r.node.id || e(r.node, {
                        id: r.id
                    });
                    e(this.node, {
                        mask: c(r.id)
                    })
                }
            });
            (function(n) {
                t.on("snap.util.attr.clip", n);
                t.on("snap.util.attr.clip-path", n);
                t.on("snap.util.attr.clipPath", n)
            })(function(n) {
                if (n instanceof i || n instanceof f) {
                    t.stop();
                    for (var r, u = n.node; u;) {
                        if (u.nodeName === "clipPath") {
                            r = new i(u);
                            break
                        }
                        if (u.nodeName === "svg") {
                            r = undefined;
                            break
                        }
                        u = u.parentNode
                    }
                    r || (r = a("clipPath", s(this)), r.node.appendChild(n.node), r.node.id || e(r.node, {
                        id: r.id
                    }));
                    e(this.node, {
                        "clip-path": c(r.node.id || r.id)
                    })
                }
            });
            t.on("snap.util.attr.fill", p("fill"));
            t.on("snap.util.attr.stroke", p("stroke"));
            w = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
            t.on("snap.util.grad.parse", function(n) {
                function s(n, i) {
                    for (var u = (i - o) / (n - e), r = e; r < n; r++) t[r].offset = +(+o + u * (r - e)).toFixed(2);
                    e = n;
                    o = i
                }
                var f, u;
                if (n = l(n), f = n.match(w), !f) return null;
                var h = f[1],
                    i = f[2],
                    t = f[3];
                i = i.split(/\s*,\s*/).map(function(n) {
                    return +n == n ? +n : n
                });
                i.length == 1 && i[0] == 0 && (i = []);
                t = t.split("-");
                t = t.map(function(n) {
                    n = n.split(":");
                    var t = {
                        color: n[0]
                    };
                    return n[1] && (t.offset = parseFloat(n[1])), t
                });
                var r = t.length,
                    o = 0,
                    e = 0;
                for (r--, u = 0; u < r; u++) "offset" in t[u] && s(u, t[u].offset);
                return t[r].offset = t[r].offset || 100, s(r, t[r].offset), {
                    type: h,
                    params: i,
                    stops: t
                }
            });
            t.on("snap.util.attr.d", function(i) {
                t.stop();
                o(i, "array") && o(i[0], "array") && (i = n.path.toString.call(i));
                i = l(i);
                i.match(/[ruo]/i) && (i = n.path.toAbsolute(i));
                e(this.node, {
                    d: i
                })
            })(-1);
            t.on("snap.util.attr.#text", function(n) {
                t.stop();
                n = l(n);
                for (var i = u.doc.createTextNode(n); this.node.firstChild;) this.node.removeChild(this.node.firstChild);
                this.node.appendChild(i)
            })(-1);
            t.on("snap.util.attr.path", function(n) {
                t.stop();
                this.attr({
                    d: n
                })
            })(-1);
            t.on("snap.util.attr.class", function(n) {
                t.stop();
                this.node.className.baseVal = n
            })(-1);
            t.on("snap.util.attr.viewBox", function(n) {
                var i;
                i = o(n, "object") && "x" in n ? [n.x, n.y, n.width, n.height].join(" ") : o(n, "array") ? n.join(" ") : n;
                e(this.node, {
                    viewBox: i
                });
                t.stop()
            })(-1);
            t.on("snap.util.attr.transform", function(n) {
                this.transform(n);
                t.stop()
            })(-1);
            t.on("snap.util.attr.r", function(n) {
                this.type == "rect" && (t.stop(), e(this.node, {
                    rx: n,
                    ry: n
                }))
            })(-1);
            t.on("snap.util.attr.textpath", function(n) {
                var u, r, f, l, c;
                if (t.stop(), this.type == "text") {
                    if (!n && this.textPath) {
                        for (r = this.textPath; r.node.firstChild;) this.node.appendChild(r.node.firstChild);
                        r.remove();
                        delete this.textPath;
                        return
                    }
                    if (o(n, "string") ? (l = s(this), c = h(l.parentNode).path(n), l.appendChild(c.node), u = c.id, c.attr({
                            id: u
                        })) : (n = h(n), n instanceof i && (u = n.attr("id"), u || (u = n.id, n.attr({
                            id: u
                        })))), u)
                        if (r = this.textPath, f = this.node, r) r.attr({
                            "xlink:href": "#" + u
                        });
                        else {
                            for (r = e("textPath", {
                                    "xlink:href": "#" + u
                                }); f.firstChild;) r.appendChild(f.firstChild);
                            f.appendChild(r);
                            this.textPath = h(r)
                        }
                }
            })(-1);
            t.on("snap.util.attr.text", function(n) {
                var r;
                if (this.type == "text") {
                    for (var i = this.node, f = function(n) {
                            var t = e("tspan"),
                                i;
                            if (o(n, "array"))
                                for (i = 0; i < n.length; i++) t.appendChild(f(n[i]));
                            else t.appendChild(u.doc.createTextNode(n));
                            return t.normalize && t.normalize(), t
                        }; i.firstChild;) i.removeChild(i.firstChild);
                    for (r = f(n); r.firstChild;) i.appendChild(r.firstChild)
                }
                t.stop()
            })(-1);
            t.on("snap.util.attr.fontSize", b)(-1);
            t.on("snap.util.attr.font-size", b)(-1);
            t.on("snap.util.getattr.transform", function() {
                return t.stop(), this.transform()
            })(-1);
            t.on("snap.util.getattr.textpath", function() {
                    return t.stop(), this.textPath
                })(-1),
                function() {
                    function i(i) {
                        return function() {
                            t.stop();
                            var r = u.doc.defaultView.getComputedStyle(this.node, null).getPropertyValue("marker-" + i);
                            return r == "none" ? r : n(u.doc.getElementById(r.match(v)[1]))
                        }
                    }

                    function r(n) {
                        return function(i) {
                            var r, u;
                            if (t.stop(), r = "marker" + n.charAt(0).toUpperCase() + n.substring(1), i == "" || !i) {
                                this.node.style[r] = "none";
                                return
                            }
                            if (i.type == "marker") {
                                u = i.node.id;
                                u || e(i.node, {
                                    id: i.id
                                });
                                this.node.style[r] = c(u);
                                return
                            }
                        }
                    }
                    t.on("snap.util.getattr.marker-end", i("end"))(-1);
                    t.on("snap.util.getattr.markerEnd", i("end"))(-1);
                    t.on("snap.util.getattr.marker-start", i("start"))(-1);
                    t.on("snap.util.getattr.markerStart", i("start"))(-1);
                    t.on("snap.util.getattr.marker-mid", i("mid"))(-1);
                    t.on("snap.util.getattr.markerMid", i("mid"))(-1);
                    t.on("snap.util.attr.marker-end", r("end"))(-1);
                    t.on("snap.util.attr.markerEnd", r("end"))(-1);
                    t.on("snap.util.attr.marker-start", r("start"))(-1);
                    t.on("snap.util.attr.markerStart", r("start"))(-1);
                    t.on("snap.util.attr.marker-mid", r("mid"))(-1);
                    t.on("snap.util.attr.markerMid", r("mid"))(-1)
                }();
            t.on("snap.util.getattr.r", function() {
                if (this.type == "rect" && e(this.node, "rx") == e(this.node, "ry")) return t.stop(), e(this.node, "rx")
            })(-1);
            t.on("snap.util.getattr.text", function() {
                if (this.type == "text" || this.type == "tspan") {
                    t.stop();
                    var n = k(this.node);
                    return n.length == 1 ? n[0] : n
                }
            })(-1);
            t.on("snap.util.getattr.#text", function() {
                return this.node.textContent
            })(-1);
            t.on("snap.util.getattr.fill", function(i) {
                if (!i) {
                    t.stop();
                    var r = t("snap.util.getattr.fill", this, !0).firstDefined();
                    return n(n.deurl(r)) || r
                }
            })(-1);
            t.on("snap.util.getattr.stroke", function(i) {
                if (!i) {
                    t.stop();
                    var r = t("snap.util.getattr.stroke", this, !0).firstDefined();
                    return n(n.deurl(r)) || r
                }
            })(-1);
            t.on("snap.util.getattr.viewBox", function() {
                t.stop();
                var i = e(this.node, "viewBox");
                if (i) return i = i.split(y), n._.box(+i[0], +i[1], +i[2], +i[3])
            })(-1);
            t.on("snap.util.getattr.points", function() {
                var n = e(this.node, "points");
                if (t.stop(), n) return n.split(y)
            })(-1);
            t.on("snap.util.getattr.path", function() {
                var n = e(this.node, "d");
                return t.stop(), n
            })(-1);
            t.on("snap.util.getattr.class", function() {
                return this.node.className.baseVal
            })(-1);
            t.on("snap.util.getattr.fontSize", d)(-1);
            t.on("snap.util.getattr.font-size", d)(-1)
        }), i.plugin(function(n, t) {
            var i = /\S+/g,
                u = String,
                r = t.prototype;
            r.addClass = function(n) {
                var e = u(n || "").match(i) || [],
                    o = this.node,
                    s = o.className.baseVal,
                    t = s.match(i) || [],
                    h, c, r, f;
                if (e.length) {
                    for (h = 0; r = e[h++];) c = t.indexOf(r), ~c || t.push(r);
                    f = t.join(" ");
                    s != f && (o.className.baseVal = f)
                }
                return this
            };
            r.removeClass = function(n) {
                var c = u(n || "").match(i) || [],
                    e = this.node,
                    o = e.className.baseVal,
                    t = o.match(i) || [],
                    s, r, h, f;
                if (t.length) {
                    for (s = 0; h = c[s++];) r = t.indexOf(h), ~r && t.splice(r, 1);
                    f = t.join(" ");
                    o != f && (e.className.baseVal = f)
                }
                return this
            };
            r.hasClass = function(n) {
                var t = this.node,
                    r = t.className.baseVal,
                    u = r.match(i) || [];
                return !!~u.indexOf(n)
            };
            r.toggleClass = function(n, t) {
                if (t != null) return t ? this.addClass(n) : this.removeClass(n);
                for (var c = (n || "").match(i) || [], o = this.node, s = o.className.baseVal, r = s.match(i) || [], u, f, e, h = 0; f = c[h++];) u = r.indexOf(f), ~u ? r.splice(u, 1) : r.push(f);
                return e = r.join(" "), s != e && (o.className.baseVal = e), this
            }
        }), i.plugin(function() {
            function f(n) {
                return n
            }

            function e(n) {
                return function(t) {
                    return +t.toFixed(3) + n
                }
            }
            var i = {
                    "+": function(n, t) {
                        return n + t
                    },
                    "-": function(n, t) {
                        return n - t
                    },
                    "/": function(n, t) {
                        return n / t
                    },
                    "*": function(n, t) {
                        return n * t
                    }
                },
                n = String,
                r = /[a-z]+$/i,
                u = /^\s*([+\-\/*])\s*=\s*([\d.eE+\-]+)\s*([^\d\s]+)?\s*$/;
            t.on("snap.util.attr", function(f) {
                var e = n(f).match(u);
                if (e) {
                    var h = t.nt(),
                        o = h.substring(h.lastIndexOf(".") + 1),
                        s = this.attr(o),
                        c = {};
                    t.stop();
                    var l = e[3] || "",
                        a = s.match(r),
                        v = i[e[1]];
                    if (a && a == l ? f = v(parseFloat(s), +e[2]) : (s = this.asPX(o), f = v(this.asPX(o), this.asPX(o, e[2] + l))), isNaN(s) || isNaN(f)) return;
                    c[o] = f;
                    this.attr(c)
                }
            })(-10);
            t.on("snap.util.equal", function(o, s) {
                var h = n(this.attr(o) || ""),
                    y = this,
                    c = n(s).match(u);
                if (c) {
                    t.stop();
                    var a = c[3] || "",
                        l = h.match(r),
                        v = i[c[1]];
                    return l && l == a ? {
                        from: parseFloat(h),
                        to: v(parseFloat(h), +c[2]),
                        f: e(l)
                    } : (h = this.asPX(o), {
                        from: h,
                        to: v(h, this.asPX(o, c[2] + a)),
                        f: f
                    })
                }
            })(-10)
        }), i.plugin(function(i, r, u, f) {
            var e = u.prototype,
                o = i.is,
                s;
            e.rect = function(n, t, i, r, u, f) {
                var e;
                return f == null && (f = u), o(n, "object") && n == "[object Object]" ? e = n : n != null && (e = {
                    x: n,
                    y: t,
                    width: i,
                    height: r
                }, u != null && (e.rx = u, e.ry = f)), this.el("rect", e)
            };
            e.circle = function(n, t, i) {
                var r;
                return o(n, "object") && n == "[object Object]" ? r = n : n != null && (r = {
                    cx: n,
                    cy: t,
                    r: i
                }), this.el("circle", r)
            };
            s = function() {
                function n() {
                    this.parentNode.removeChild(this)
                }
                return function(t, i) {
                    var r = f.doc.createElement("img"),
                        u = f.doc.body;
                    r.style.cssText = "position:absolute;left:-9999em;top:-9999em";
                    r.onload = function() {
                        i.call(r);
                        r.onload = r.onerror = null;
                        u.removeChild(r)
                    };
                    r.onerror = n;
                    u.appendChild(r);
                    r.src = t
                }
            }();
            e.image = function(n, t, r, u, f) {
                var h = this.el("image"),
                    e;
                return o(n, "object") && "src" in n ? h.attr(n) : n != null && (e = {
                    "xlink:href": n,
                    preserveAspectRatio: "none"
                }, t != null && r != null && (e.x = t, e.y = r), u != null && f != null ? (e.width = u, e.height = f) : s(n, function() {
                    i._.$(h.node, {
                        width: this.offsetWidth,
                        height: this.offsetHeight
                    })
                }), i._.$(h.node, e)), h
            };
            e.ellipse = function(n, t, i, r) {
                var u;
                return o(n, "object") && n == "[object Object]" ? u = n : n != null && (u = {
                    cx: n,
                    cy: t,
                    rx: i,
                    ry: r
                }), this.el("ellipse", u)
            };
            e.path = function(n) {
                var t;
                return o(n, "object") && !o(n, "array") ? t = n : n && (t = {
                    d: n
                }), this.el("path", t)
            };
            e.group = e.g = function(n) {
                var t = this.el("g");
                return arguments.length == 1 && n && !n.type ? t.attr(n) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)), t
            };
            e.svg = function(n, t, i, r, u, f, e, s) {
                var h = {};
                return o(n, "object") && t == null ? h = n : (n != null && (h.x = n), t != null && (h.y = t), i != null && (h.width = i), r != null && (h.height = r), u != null && f != null && e != null && s != null && (h.viewBox = [u, f, e, s])), this.el("svg", h)
            };
            e.mask = function(n) {
                var t = this.el("mask");
                return arguments.length == 1 && n && !n.type ? t.attr(n) : arguments.length && t.add(Array.prototype.slice.call(arguments, 0)), t
            };
            e.ptrn = function(n, t, i, r, u, f, e, s) {
                if (o(n, "object")) var h = n;
                else h = {
                    patternUnits: "userSpaceOnUse"
                }, n && (h.x = n), t && (h.y = t), i != null && (h.width = i), r != null && (h.height = r), h.viewBox = u != null && f != null && e != null && s != null ? [u, f, e, s] : [n || 0, t || 0, i || 0, r || 0];
                return this.el("pattern", h)
            };
            e.use = function(n) {
                return n != null ? (n instanceof r && (n.attr("id") || n.attr({
                    id: i._.id(n)
                }), n = n.attr("id")), String(n).charAt() == "#" && (n = n.substring(1)), this.el("use", {
                    "xlink:href": "#" + n
                })) : r.prototype.use.call(this)
            };
            e.symbol = function(n, t, i, r) {
                var u = {};
                return n != null && t != null && i != null && r != null && (u.viewBox = [n, t, i, r]), this.el("symbol", u)
            };
            e.text = function(n, t, i) {
                var r = {};
                return o(n, "object") ? r = n : n != null && (r = {
                    x: n,
                    y: t,
                    text: i || ""
                }), this.el("text", r)
            };
            e.line = function(n, t, i, r) {
                var u = {};
                return o(n, "object") ? u = n : n != null && (u = {
                    x1: n,
                    x2: i,
                    y1: t,
                    y2: r
                }), this.el("line", u)
            };
            e.polyline = function(n) {
                arguments.length > 1 && (n = Array.prototype.slice.call(arguments, 0));
                var t = {};
                return o(n, "object") && !o(n, "array") ? t = n : n != null && (t = {
                    points: n
                }), this.el("polyline", t)
            };
            e.polygon = function(n) {
                    arguments.length > 1 && (n = Array.prototype.slice.call(arguments, 0));
                    var t = {};
                    return o(n, "object") && !o(n, "array") ? t = n : n != null && (t = {
                        points: n
                    }), this.el("polygon", t)
                },
                function() {
                    function u() {
                        return this.selectAll("stop")
                    }

                    function f(n, t) {
                        var e = r("stop"),
                            o = {
                                offset: +t + "%"
                            },
                            f, s, u, h;
                        for (n = i.color(n), o["stop-color"] = n.hex, n.opacity < 1 && (o["stop-opacity"] = n.opacity), r(e, o), f = this.stops(), u = 0; u < f.length; u++)
                            if (h = parseFloat(f[u].attr("offset")), h > t) {
                                this.node.insertBefore(e, f[u].node);
                                s = !0;
                                break
                            }
                        return s || this.node.appendChild(e), this
                    }

                    function o() {
                        if (this.type == "linearGradient") {
                            var t = r(this.node, "x1") || 0,
                                f = r(this.node, "x2") || 1,
                                u = r(this.node, "y1") || 0,
                                e = r(this.node, "y2") || 0;
                            return i._.box(t, u, math.abs(f - t), math.abs(e - u))
                        }
                        var o = this.node.cx || .5,
                            s = this.node.cy || .5,
                            n = this.node.r || 0;
                        return i._.box(o - n, s - n, n * 2, n * 2)
                    }

                    function c(n) {
                        var u = n,
                            f = this.stops(),
                            r, e, o;
                        if (typeof n == "string" && (u = t("snap.util.grad.parse", null, "l(0,0,0,1)" + n).firstDefined().stops), i.is(u, "array")) {
                            for (r = 0; r < f.length; r++) u[r] ? (e = i.color(u[r].color), o = {
                                offset: u[r].offset + "%"
                            }, o["stop-color"] = e.hex, e.opacity < 1 && (o["stop-opacity"] = e.opacity), f[r].attr(o)) : f[r].remove();
                            for (r = f.length; r < u.length; r++) this.addStop(u[r].color, u[r].offset);
                            return this
                        }
                    }

                    function l(n, i) {
                        var u = t("snap.util.grad.parse", null, i).firstDefined(),
                            f, o, l, e, c;
                        if (!u) return null;
                        for (u.params.unshift(n), f = u.type.toLowerCase() == "l" ? s.apply(0, u.params) : h.apply(0, u.params), u.type != u.type.toLowerCase() && r(f.node, {
                                gradientUnits: "userSpaceOnUse"
                            }), o = u.stops, l = o.length, e = 0; e < l; e++) c = o[e], f.addStop(c.color, c.offset);
                        return f
                    }

                    function s(n, t, e, s, h) {
                        var l = i._.make("linearGradient", n);
                        return l.stops = u, l.addStop = f, l.getBBox = o, l.setStops = c, t != null && r(l.node, {
                            x1: t,
                            y1: e,
                            x2: s,
                            y2: h
                        }), l
                    }

                    function h(n, t, e, s, h, c) {
                        var l = i._.make("radialGradient", n);
                        return l.stops = u, l.addStop = f, l.getBBox = o, t != null && r(l.node, {
                            cx: t,
                            cy: e,
                            r: s
                        }), h != null && c != null && r(l.node, {
                            fx: h,
                            fy: c
                        }), l
                    }
                    var r = i._.$;
                    e.gradient = function(n) {
                        return l(this.defs, n)
                    };
                    e.gradientLinear = function(n, t, i, r) {
                        return s(this.defs, n, t, i, r)
                    };
                    e.gradientRadial = function(n, t, i, r, u) {
                        return h(this.defs, n, t, i, r, u)
                    };
                    e.toString = function() {
                        var r = this.node.ownerDocument,
                            n = r.createDocumentFragment(),
                            t = r.createElement("div"),
                            u = this.node.cloneNode(!0),
                            f;
                        return n.appendChild(t), t.appendChild(u), i._.$(u, {
                            xmlns: "http://www.w3.org/2000/svg"
                        }), f = t.innerHTML, n.removeChild(n.firstChild), f
                    };
                    e.toDataURL = function() {
                        if (n && n.btoa) return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(this)))
                    };
                    e.clear = function() {
                        for (var n = this.node.firstChild, t; n;) t = n.nextSibling, n.tagName != "defs" ? n.parentNode.removeChild(n) : e.clear.call({
                            node: n
                        }), n = t
                    }
                }()
        }), i.plugin(function(n, t) {
            function c(n) {
                var t = c.ps = c.ps || {};
                return t[n] ? t[n].sleep = 100 : t[n] = {
                    sleep: 100
                }, setTimeout(function() {
                    for (var i in t) t[kt](i) && i != n && (t[i].sleep--, t[i].sleep || delete t[i])
                }), t[n]
            }

            function h(n, t, r, u) {
                return n == null && (n = t = r = u = 0), t == null && (t = n.y, r = n.width, u = n.height, n = n.x), {
                    x: n,
                    y: t,
                    width: r,
                    w: r,
                    height: u,
                    h: u,
                    x2: n + r,
                    y2: t + u,
                    cx: n + r / 2,
                    cy: t + u / 2,
                    r1: i.min(r, u) / 2,
                    r2: i.max(r, u) / 2,
                    r0: i.sqrt(r * r + u * u) / 2,
                    path: k(n, t, r, u),
                    vb: [n, t, r, u].join(" ")
                }
            }

            function a() {
                return this.join(",").replace(dt, "$1")
            }

            function l(n) {
                var t = tt(n);
                return t.toString = a, t
            }

            function it(n, t, i, r, u, f, e, o, s) {
                return s == null ? v(n, t, i, r, u, f, e, o) : w(n, t, i, r, u, f, e, o, ni(n, t, i, r, u, f, e, o, s))
            }

            function rt(i, r) {
                function u(n) {
                    return +(+n).toFixed(3)
                }
                return n._.cacher(function(n, f, e) {
                    var b, k;
                    n instanceof t && (n = n.attr("d"));
                    n = p(n);
                    var h, c, o, v, l = "",
                        y = {},
                        s, a = 0;
                    for (b = 0, k = n.length; b < k; b++) {
                        if (o = n[b], o[0] == "M") h = +o[1], c = +o[2];
                        else {
                            if (v = it(h, c, o[1], o[2], o[3], o[4], o[5], o[6]), a + v > f) {
                                if (r && !y.start) {
                                    if (s = it(h, c, o[1], o[2], o[3], o[4], o[5], o[6], f - a), l += ["C" + u(s.start.x), u(s.start.y), u(s.m.x), u(s.m.y), u(s.x), u(s.y)], e) return l;
                                    y.start = l;
                                    l = ["M" + u(s.x), u(s.y) + "C" + u(s.n.x), u(s.n.y), u(s.end.x), u(s.end.y), u(o[5]), u(o[6])].join();
                                    a += v;
                                    h = +o[5];
                                    c = +o[6];
                                    continue
                                }
                                if (!i && !r) return it(h, c, o[1], o[2], o[3], o[4], o[5], o[6], f - a)
                            }
                            a += v;
                            h = +o[5];
                            c = +o[6]
                        }
                        l += o.shift() + o
                    }
                    return y.end = l, i ? a : r ? y : w(h, c, o[0], o[1], o[2], o[3], o[4], o[5], 1)
                }, null, n._.clone)
            }

            function w(n, t, r, u, e, o, h, c, l) {
                var a = 1 - l,
                    y = s(a, 3),
                    p = s(a, 2),
                    v = l * l,
                    w = v * l,
                    nt = y * n + p * 3 * l * r + a * 3 * l * l * e + w * h,
                    tt = y * t + p * 3 * l * u + a * 3 * l * l * o + w * c,
                    b = n + 2 * l * (r - n) + v * (e - 2 * r + n),
                    k = t + 2 * l * (u - t) + v * (o - 2 * u + t),
                    d = r + 2 * l * (e - r) + v * (h - 2 * e + r),
                    g = u + 2 * l * (o - u) + v * (c - 2 * o + u),
                    it = a * n + l * r,
                    rt = a * t + l * u,
                    ut = a * e + l * h,
                    ft = a * o + l * c,
                    et = 90 - i.atan2(b - d, k - g) * 180 / f;
                return {
                    x: nt,
                    y: tt,
                    m: {
                        x: b,
                        y: k
                    },
                    n: {
                        x: d,
                        y: g
                    },
                    start: {
                        x: it,
                        y: rt
                    },
                    end: {
                        x: ut,
                        y: ft
                    },
                    alpha: et
                }
            }

            function ft(t, i, r, u, f, e, o, s) {
                n.is(t, "array") || (t = [t, i, r, u, f, e, o, s]);
                var c = wt.apply(null, t);
                return h(c.min.x, c.min.y, c.max.x - c.min.x, c.max.y - c.min.y)
            }

            function e(n, t, i) {
                return t >= n.x && t <= n.x + n.width && i >= n.y && i <= n.y + n.height
            }

            function lt(n, t) {
                return n = h(n), t = h(t), e(t, n.x, n.y) || e(t, n.x2, n.y) || e(t, n.x, n.y2) || e(t, n.x2, n.y2) || e(n, t.x, t.y) || e(n, t.x2, t.y) || e(n, t.x, t.y2) || e(n, t.x2, t.y2) || (n.x < t.x2 && n.x > t.x || t.x < n.x2 && t.x > n.x) && (n.y < t.y2 && n.y > t.y || t.y < n.y2 && t.y > n.y)
            }

            function at(n, t, i, r, u) {
                var f = -3 * t + 9 * i - 9 * r + 3 * u,
                    e = n * f + 6 * t - 12 * i + 6 * r;
                return n * e - 3 * t + 3 * i
            }

            function v(n, t, r, u, f, e, o, s, h) {
                var c;
                h == null && (h = 1);
                h = h > 1 ? 1 : h < 0 ? 0 : h;
                var l = h / 2,
                    w = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816],
                    b = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472],
                    a = 0;
                for (c = 0; c < 12; c++) {
                    var v = l * w[c] + l,
                        y = at(v, n, r, f, o),
                        p = at(v, t, u, e, s),
                        k = y * y + p * p;
                    a += b[c] * i.sqrt(k)
                }
                return l * a
            }

            function ni(n, t, i, r, u, f, e, s, h) {
                if (!(h < 0) && !(v(n, t, i, r, u, f, e, s) < h)) {
                    for (var y = 1, a = y / 2, c = y - a, l = v(n, t, i, r, u, f, e, s, c); o(l - h) > .01;) a /= 2, c += (l < h ? 1 : -1) * a, l = v(n, t, i, r, u, f, e, s, c);
                    return c
                }
            }

            function ti(n, t, i, f, e, o, s, h) {
                if (!(r(n, i) < u(e, s)) && !(u(n, i) > r(e, s)) && !(r(t, f) < u(o, h)) && !(u(t, f) > r(o, h))) {
                    var p = (n * f - t * i) * (e - s) - (n - i) * (e * h - o * s),
                        w = (n * f - t * i) * (o - h) - (t - f) * (e * h - o * s),
                        a = (n - i) * (o - h) - (t - f) * (e - s);
                    if (a) {
                        var v = p / a,
                            y = w / a,
                            c = +v.toFixed(2),
                            l = +y.toFixed(2);
                        if (!(c < +u(n, i).toFixed(2)) && !(c > +r(n, i).toFixed(2)) && !(c < +u(e, s).toFixed(2)) && !(c > +r(e, s).toFixed(2)) && !(l < +u(t, f).toFixed(2)) && !(l > +r(t, f).toFixed(2)) && !(l < +u(o, h).toFixed(2)) && !(l > +r(o, h).toFixed(2))) return {
                            x: v,
                            y: y
                        }
                    }
                }
            }

            function et(n, t, i) {
                var rt = ft(n),
                    ut = ft(t),
                    r, s, h, k, d;
                if (!lt(rt, ut)) return i ? 0 : [];
                var et = v.apply(0, n),
                    ot = v.apply(0, t),
                    a = ~~(et / 8),
                    y = ~~(ot / 8),
                    g = [],
                    nt = [],
                    it = {},
                    tt = i ? 0 : [];
                for (r = 0; r < a + 1; r++) s = w.apply(0, n.concat(r / a)), g.push({
                    x: s.x,
                    y: s.y,
                    t: r / a
                });
                for (r = 0; r < y + 1; r++) s = w.apply(0, t.concat(r / y)), nt.push({
                    x: s.x,
                    y: s.y,
                    t: r / y
                });
                for (r = 0; r < a; r++)
                    for (h = 0; h < y; h++) {
                        var f = g[r],
                            c = g[r + 1],
                            e = nt[h],
                            l = nt[h + 1],
                            p = o(c.x - f.x) < .001 ? "y" : "x",
                            b = o(l.x - e.x) < .001 ? "y" : "x",
                            u = ti(f.x, f.y, c.x, c.y, e.x, e.y, l.x, l.y);
                        if (u) {
                            if (it[u.x.toFixed(4)] == u.y.toFixed(4)) continue;
                            it[u.x.toFixed(4)] = u.y.toFixed(4);
                            k = f.t + o((u[p] - f[p]) / (c[p] - f[p])) * (c.t - f.t);
                            d = e.t + o((u[b] - e[b]) / (l[b] - e[b])) * (l.t - e.t);
                            k >= 0 && k <= 1 && d >= 0 && d <= 1 && (i ? tt++ : tt.push({
                                x: u.x,
                                y: u.y,
                                t1: k,
                                t2: d
                            }))
                        }
                    }
                return tt
            }

            function ii(n, t) {
                return ot(n, t)
            }

            function ri(n, t) {
                return ot(n, t, 1)
            }

            function ot(n, t, i) {
                var f, e, o, s, b, k, d, g, h, c, v, y, nt, l, w, tt, a, r, u, it;
                for (n = p(n), t = p(t), v = i ? 0 : [], y = 0, nt = n.length; y < nt; y++)
                    if (l = n[y], l[0] == "M") f = b = l[1], e = k = l[2];
                    else
                        for (l[0] == "C" ? (h = [f, e].concat(l.slice(1)), f = h[6], e = h[7]) : (h = [f, e, f, e, b, k, b, k], f = b, e = k), w = 0, tt = t.length; w < tt; w++)
                            if (a = t[w], a[0] == "M") o = d = a[1], s = g = a[2];
                            else if (a[0] == "C" ? (c = [o, s].concat(a.slice(1)), o = c[6], s = c[7]) : (c = [o, s, o, s, d, g, d, g], o = d, s = g), r = et(h, c, i), i) v += r;
                else {
                    for (u = 0, it = r.length; u < it; u++) r[u].segment1 = y, r[u].segment2 = w, r[u].bez1 = h, r[u].bez2 = c;
                    v = v.concat(r)
                }
                return v
            }

            function ui(n, t, i) {
                var r = vt(n);
                return e(r, t, i) && ot(n, [
                    ["M", t, i],
                    ["H", r.x2 + 10]
                ], 1) % 2 == 1
            }

            function vt(n) {
                var a = c(n),
                    l, v, e;
                if (a.bbox) return tt(a.bbox);
                if (!n) return h();
                n = p(n);
                var o = 0,
                    s = 0,
                    i = [],
                    f = [],
                    t;
                for (l = 0, v = n.length; l < v; l++) t = n[l], t[0] == "M" ? (o = t[1], s = t[2], i.push(o), f.push(s)) : (e = wt(o, s, t[1], t[2], t[3], t[4], t[5], t[6]), i = i.concat(e.min.x, e.max.x), f = f.concat(e.min.y, e.max.y), o = t[5], s = t[6]);
                var y = u.apply(0, i),
                    w = u.apply(0, f),
                    k = r.apply(0, i),
                    d = r.apply(0, f),
                    b = h(y, w, k - y, d - w);
                return a.bbox = tt(b), b
            }

            function k(n, t, i, r, u) {
                if (u) return [
                    ["M", +n + +u, t],
                    ["l", i - u * 2, 0],
                    ["a", u, u, 0, 0, 1, u, u],
                    ["l", 0, r - u * 2],
                    ["a", u, u, 0, 0, 1, -u, u],
                    ["l", u * 2 - i, 0],
                    ["a", u, u, 0, 0, 1, -u, -u],
                    ["l", 0, u * 2 - r],
                    ["a", u, u, 0, 0, 1, u, -u],
                    ["z"]
                ];
                var f = [
                    ["M", n, t],
                    ["l", i, 0],
                    ["l", 0, r],
                    ["l", -i, 0],
                    ["z"]
                ];
                return f.toString = a, f
            }

            function y(n, t, i, r, u) {
                if (u == null && r == null && (r = i), n = +n, t = +t, i = +i, r = +r, u != null) var f = Math.PI / 180,
                    o = n + i * Math.cos(-r * f),
                    s = n + i * Math.cos(-u * f),
                    h = t + i * Math.sin(-r * f),
                    c = t + i * Math.sin(-u * f),
                    e = [
                        ["M", o, h],
                        ["A", i, i, 0, +(u - r > 180), 0, s, c]
                    ];
                else e = [
                    ["M", n, t],
                    ["m", 0, -r],
                    ["a", i, r, 0, 1, 1, 0, 2 * r],
                    ["a", i, r, 0, 1, 1, 0, -2 * r],
                    ["z"]
                ];
                return e.toString = a, e
            }

            function ei(t) {
                var w = c(t),
                    b = String.prototype.toLowerCase,
                    u, d, f, i, s, g, h, nt, v;
                if (w.rel) return l(w.rel);
                n.is(t, "array") && n.is(t && t[0], "array") || (t = n.parsePathString(t));
                var r = [],
                    o = 0,
                    e = 0,
                    y = 0,
                    p = 0,
                    k = 0;
                for (t[0][0] == "M" && (o = t[0][1], e = t[0][2], y = o, p = e, k++, r.push(["M", o, e])), u = k, d = t.length; u < d; u++) {
                    if (f = r[u] = [], i = t[u], i[0] != b.call(i[0])) {
                        f[0] = b.call(i[0]);
                        switch (f[0]) {
                            case "a":
                                f[1] = i[1];
                                f[2] = i[2];
                                f[3] = i[3];
                                f[4] = i[4];
                                f[5] = i[5];
                                f[6] = +(i[6] - o).toFixed(3);
                                f[7] = +(i[7] - e).toFixed(3);
                                break;
                            case "v":
                                f[1] = +(i[1] - e).toFixed(3);
                                break;
                            case "m":
                                y = i[1];
                                p = i[2];
                            default:
                                for (s = 1, g = i.length; s < g; s++) f[s] = +(i[s] - (s % 2 ? o : e)).toFixed(3)
                        }
                    } else
                        for (f = r[u] = [], i[0] == "m" && (y = i[1] + o, p = i[2] + e), h = 0, nt = i.length; h < nt; h++) r[u][h] = i[h];
                    v = r[u].length;
                    switch (r[u][0]) {
                        case "z":
                            o = y;
                            e = p;
                            break;
                        case "h":
                            o += +r[u][v - 1];
                            break;
                        case "v":
                            e += +r[u][v - 1];
                            break;
                        default:
                            o += +r[u][v - 2];
                            e += +r[u][v - 1]
                    }
                }
                return r.toString = a, w.rel = l(r), r
            }

            function st(t) {
                var d = c(t),
                    g, r, i, b, tt, o, s, k, v, it;
                if (d.abs) return l(d.abs);
                if (ht(t, "array") && ht(t && t[0], "array") || (t = n.parsePathString(t)), !t || !t.length) return [
                    ["M", 0, 0]
                ];
                var u = [],
                    f = 0,
                    e = 0,
                    p = 0,
                    w = 0,
                    nt = 0,
                    h;
                for (t[0][0] == "M" && (f = +t[0][1], e = +t[0][2], p = f, w = e, nt++, u[0] = ["M", f, e]), g = t.length == 3 && t[0][0] == "M" && t[1][0].toUpperCase() == "R" && t[2][0].toUpperCase() == "Z", b = nt, tt = t.length; b < tt; b++) {
                    if (u.push(r = []), i = t[b], h = i[0], h != h.toUpperCase()) {
                        r[0] = h.toUpperCase();
                        switch (r[0]) {
                            case "A":
                                r[1] = i[1];
                                r[2] = i[2];
                                r[3] = i[3];
                                r[4] = i[4];
                                r[5] = i[5];
                                r[6] = +i[6] + f;
                                r[7] = +i[7] + e;
                                break;
                            case "V":
                                r[1] = +i[1] + e;
                                break;
                            case "H":
                                r[1] = +i[1] + f;
                                break;
                            case "R":
                                for (o = [f, e].concat(i.slice(1)), s = 2, k = o.length; s < k; s++) o[s] = +o[s] + f, o[++s] = +o[s] + e;
                                u.pop();
                                u = u.concat(bt(o, g));
                                break;
                            case "O":
                                u.pop();
                                o = y(f, e, i[1], i[2]);
                                o.push(o[0]);
                                u = u.concat(o);
                                break;
                            case "U":
                                u.pop();
                                u = u.concat(y(f, e, i[1], i[2], i[3]));
                                r = ["U"].concat(u[u.length - 1].slice(-2));
                                break;
                            case "M":
                                p = +i[1] + f;
                                w = +i[2] + e;
                            default:
                                for (s = 1, k = i.length; s < k; s++) r[s] = +i[s] + (s % 2 ? f : e)
                        }
                    } else if (h == "R") o = [f, e].concat(i.slice(1)), u.pop(), u = u.concat(bt(o, g)), r = ["R"].concat(i.slice(-2));
                    else if (h == "O") u.pop(), o = y(f, e, i[1], i[2]), o.push(o[0]), u = u.concat(o);
                    else if (h == "U") u.pop(), u = u.concat(y(f, e, i[1], i[2], i[3])), r = ["U"].concat(u[u.length - 1].slice(-2));
                    else
                        for (v = 0, it = i.length; v < it; v++) r[v] = i[v];
                    if (h = h.toUpperCase(), h != "O") switch (r[0]) {
                        case "Z":
                            f = +p;
                            e = +w;
                            break;
                        case "H":
                            f = r[1];
                            break;
                        case "V":
                            e = r[1];
                            break;
                        case "M":
                            p = r[r.length - 2];
                            w = r[r.length - 1];
                        default:
                            f = r[r.length - 2];
                            e = r[r.length - 1]
                    }
                }
                return u.toString = a, d.abs = l(u), u
            }

            function g(n, t, i, r) {
                return [n, t, i, r, i, r]
            }

            function yt(n, t, i, r, u, f) {
                var e = 1 / 3,
                    o = 2 / 3;
                return [e * n + o * i, e * t + o * r, e * u + o * i, e * f + o * r, u, f]
            }

            function pt(t, r, u, e, s, h, c, l, a, v) {
                var ct = f * 120 / 180,
                    ut = f / 180 * (+s || 0),
                    w = [],
                    g, ft = n._.cacher(function(n, t, r) {
                        var u = n * i.cos(r) - t * i.sin(r),
                            f = n * i.sin(r) + t * i.cos(r);
                        return {
                            x: u,
                            y: f
                        }
                    }),
                    et, ht, b, dt;
                if (!u || !e) return [t, r, l, a, l, a];
                if (v) p = v[0], y = v[1], it = v[2], rt = v[3];
                else {
                    g = ft(t, r, -ut);
                    t = g.x;
                    r = g.y;
                    g = ft(l, a, -ut);
                    l = g.x;
                    a = g.y;
                    var ei = i.cos(f / 180 * s),
                        oi = i.sin(f / 180 * s),
                        k = (t - l) / 2,
                        d = (r - a) / 2,
                        tt = k * k / (u * u) + d * d / (e * e);
                    tt > 1 && (tt = i.sqrt(tt), u = tt * u, e = tt * e);
                    var ot = u * u,
                        st = e * e,
                        lt = (h == c ? -1 : 1) * i.sqrt(o((ot * st - ot * d * d - st * k * k) / (ot * d * d + st * k * k))),
                        it = lt * u * d / e + (t + l) / 2,
                        rt = lt * -e * k / u + (r + a) / 2,
                        p = i.asin(((r - rt) / e).toFixed(9)),
                        y = i.asin(((a - rt) / e).toFixed(9));
                    p = t < it ? f - p : p;
                    y = l < it ? f - y : y;
                    p < 0 && (p = f * 2 + p);
                    y < 0 && (y = f * 2 + y);
                    c && p > y && (p = p - f * 2);
                    !c && y > p && (y = y - f * 2)
                }
                if (et = y - p, o(et) > ct) {
                    var gt = y,
                        ni = l,
                        ti = a;
                    y = p + ct * (c && y > p ? 1 : -1);
                    l = it + u * i.cos(y);
                    a = rt + e * i.sin(y);
                    w = pt(l, a, u, e, s, 0, c, ni, ti, [y, gt, it, rt])
                }
                et = y - p;
                var ii = i.cos(p),
                    ri = i.sin(p),
                    ui = i.cos(y),
                    fi = i.sin(y),
                    at = i.tan(et / 4),
                    vt = 4 / 3 * u * at,
                    yt = 4 / 3 * e * at,
                    wt = [t, r],
                    nt = [t + vt * ri, r - yt * ii],
                    bt = [l + vt * fi, a - yt * ui],
                    kt = [l, a];
                if (nt[0] = 2 * wt[0] - nt[0], nt[1] = 2 * wt[1] - nt[1], v) return [nt, bt, kt].concat(w);
                for (w = [nt, bt, kt].concat(w).join().split(","), ht = [], b = 0, dt = w.length; b < dt; b++) ht[b] = b % 2 ? ft(w[b - 1], w[b], ut).y : ft(w[b], w[b + 1], ut).x;
                return ht
            }

            function wt(n, t, f, e, s, h, c, l) {
                for (var b, k, v, d = [], y = [
                        [],
                        []
                    ], w, p, g, a, nt, tt, it, rt, ut = 0; ut < 2; ++ut) {
                    if (ut == 0 ? (p = 6 * n - 12 * f + 6 * s, w = -3 * n + 9 * f - 9 * s + 3 * c, g = 3 * f - 3 * n) : (p = 6 * t - 12 * e + 6 * h, w = -3 * t + 9 * e - 9 * h + 3 * l, g = 3 * e - 3 * t), o(w) < 1e-12) {
                        if (o(p) < 1e-12) continue;
                        a = -g / p;
                        0 < a && a < 1 && d.push(a);
                        continue
                    }(it = p * p - 4 * g * w, rt = i.sqrt(it), it < 0) || (nt = (-p + rt) / (2 * w), 0 < nt && nt < 1 && d.push(nt), tt = (-p - rt) / (2 * w), 0 < tt && tt < 1 && d.push(tt))
                }
                for (b = d.length, k = b; b--;) a = d[b], v = 1 - a, y[0][b] = v * v * v * n + 3 * v * v * a * f + 3 * v * a * a * s + a * a * a * c, y[1][b] = v * v * v * t + 3 * v * v * a * e + 3 * v * a * a * h + a * a * a * l;
                return y[0][k] = n, y[1][k] = t, y[0][k + 1] = c, y[1][k + 1] = l, y[0].length = y[1].length = k + 2, {
                    min: {
                        x: u.apply(0, y[0]),
                        y: u.apply(0, y[1])
                    },
                    max: {
                        x: r.apply(0, y[0]),
                        y: r.apply(0, y[1])
                    }
                }
            }

            function p(n, t) {
                var nt = !t && c(n),
                    i, w;
                if (!t && nt.curve) return l(nt.curve);
                var f = st(n),
                    u = t && st(t),
                    e = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    },
                    o = {
                        x: 0,
                        y: 0,
                        bx: 0,
                        by: 0,
                        X: 0,
                        Y: 0,
                        qx: null,
                        qy: null
                    },
                    tt = function(n, t, i) {
                        var r, u;
                        if (!n) return ["C", t.x, t.y, t.x, t.y, t.x, t.y];
                        n[0] in {
                            T: 1,
                            Q: 1
                        } || (t.qx = t.qy = null);
                        switch (n[0]) {
                            case "M":
                                t.X = n[1];
                                t.Y = n[2];
                                break;
                            case "A":
                                n = ["C"].concat(pt.apply(0, [t.x, t.y].concat(n.slice(1))));
                                break;
                            case "S":
                                i == "C" || i == "S" ? (r = t.x * 2 - t.bx, u = t.y * 2 - t.by) : (r = t.x, u = t.y);
                                n = ["C", r, u].concat(n.slice(1));
                                break;
                            case "T":
                                i == "Q" || i == "T" ? (t.qx = t.x * 2 - t.qx, t.qy = t.y * 2 - t.qy) : (t.qx = t.x, t.qy = t.y);
                                n = ["C"].concat(yt(t.x, t.y, t.qx, t.qy, n[1], n[2]));
                                break;
                            case "Q":
                                t.qx = n[1];
                                t.qy = n[2];
                                n = ["C"].concat(yt(t.x, t.y, n[1], n[2], n[3], n[4]));
                                break;
                            case "L":
                                n = ["C"].concat(g(t.x, t.y, n[1], n[2]));
                                break;
                            case "H":
                                n = ["C"].concat(g(t.x, t.y, n[1], t.y));
                                break;
                            case "V":
                                n = ["C"].concat(g(t.x, t.y, t.x, n[1]));
                                break;
                            case "Z":
                                n = ["C"].concat(g(t.x, t.y, t.X, t.Y))
                        }
                        return n
                    },
                    it = function(n, t) {
                        if (n[t].length > 7) {
                            n[t].shift();
                            for (var i = n[t]; i.length;) h[t] = "A", u && (a[t] = "A"), n.splice(t++, 0, ["C"].concat(i.splice(0, 6)));
                            n.splice(t, 1);
                            w = r(f.length, u && u.length || 0)
                        }
                    },
                    rt = function(n, t, i, e, o) {
                        n && t && n[o][0] == "M" && t[o][0] != "M" && (t.splice(o, 0, ["M", e.x, e.y]), i.bx = 0, i.by = 0, i.x = n[o][1], i.y = n[o][2], w = r(f.length, u && u.length || 0))
                    },
                    h = [],
                    a = [],
                    s = "",
                    p = "";
                for (i = 0, w = r(f.length, u && u.length || 0); i < w; i++) {
                    f[i] && (s = f[i][0]);
                    s != "C" && (h[i] = s, i && (p = h[i - 1]));
                    f[i] = tt(f[i], e, p);
                    h[i] != "A" && s == "C" && (h[i] = "C");
                    it(f, i);
                    u && (u[i] && (s = u[i][0]), s != "C" && (a[i] = s, i && (p = a[i - 1])), u[i] = tt(u[i], o, p), a[i] != "A" && s == "C" && (a[i] = "C"), it(u, i));
                    rt(f, u, e, o, i);
                    rt(u, f, o, e, i);
                    var v = f[i],
                        y = u && u[i],
                        k = v.length,
                        d = u && y.length;
                    e.x = v[k - 2];
                    e.y = v[k - 1];
                    e.bx = b(v[k - 4]) || e.x;
                    e.by = b(v[k - 3]) || e.y;
                    o.bx = u && (b(y[d - 4]) || o.x);
                    o.by = u && (b(y[d - 3]) || o.y);
                    o.x = u && y[d - 2];
                    o.y = u && y[d - 1]
                }
                return u || (nt.curve = l(f)), u ? [f, u] : f
            }

            function oi(n, t) {
                if (!t) return n;
                var f, e, u, i, o, s, r;
                for (n = p(n), u = 0, o = n.length; u < o; u++)
                    for (r = n[u], i = 1, s = r.length; i < s; i += 2) f = t.x(r[i], r[i + 1]), e = t.y(r[i], r[i + 1]), r[i] = f, r[i + 1] = e;
                return n
            }

            function bt(n, t) {
                for (var i, f = [], r = 0, u = n.length; u - 2 * !t > r; r += 2) i = [{
                    x: +n[r - 2],
                    y: +n[r - 1]
                }, {
                    x: +n[r],
                    y: +n[r + 1]
                }, {
                    x: +n[r + 2],
                    y: +n[r + 3]
                }, {
                    x: +n[r + 4],
                    y: +n[r + 5]
                }], t ? r ? u - 4 == r ? i[3] = {
                    x: +n[0],
                    y: +n[1]
                } : u - 2 == r && (i[2] = {
                    x: +n[0],
                    y: +n[1]
                }, i[3] = {
                    x: +n[2],
                    y: +n[3]
                }) : i[0] = {
                    x: +n[u - 2],
                    y: +n[u - 1]
                } : u - 4 == r ? i[3] = i[2] : r || (i[0] = {
                    x: +n[r],
                    y: +n[r + 1]
                }), f.push(["C", (-i[0].x + 6 * i[1].x + i[2].x) / 6, (-i[0].y + 6 * i[1].y + i[2].y) / 6, (i[1].x + 6 * i[2].x - i[3].x) / 6, (i[1].y + 6 * i[2].y - i[3].y) / 6, i[2].x, i[2].y]);
                return f
            }
            var nt = t.prototype,
                ht = n.is,
                tt = n._.clone,
                kt = "hasOwnProperty",
                dt = /,?([a-z]),?/gi,
                b = parseFloat,
                i = Math,
                f = i.PI,
                u = i.min,
                r = i.max,
                s = i.pow,
                o = i.abs,
                gt = rt(1),
                ct = rt(),
                ut = rt(0, 1),
                d = n._unit2px,
                fi = {
                    path: function(n) {
                        return n.attr("path")
                    },
                    circle: function(n) {
                        var t = d(n);
                        return y(t.cx, t.cy, t.r)
                    },
                    ellipse: function(n) {
                        var t = d(n);
                        return y(t.cx || 0, t.cy || 0, t.rx, t.ry)
                    },
                    rect: function(n) {
                        var t = d(n);
                        return k(t.x || 0, t.y || 0, t.width, t.height, t.rx, t.ry)
                    },
                    image: function(n) {
                        var t = d(n);
                        return k(t.x || 0, t.y || 0, t.width, t.height)
                    },
                    line: function(n) {
                        return "M" + [n.attr("x1") || 0, n.attr("y1") || 0, n.attr("x2"), n.attr("y2")]
                    },
                    polyline: function(n) {
                        return "M" + n.attr("points")
                    },
                    polygon: function(n) {
                        return "M" + n.attr("points") + "z"
                    },
                    deflt: function(n) {
                        var t = n.node.getBBox();
                        return k(t.x, t.y, t.width, t.height)
                    }
                };
            n.path = c;
            n.path.getTotalLength = gt;
            n.path.getPointAtLength = ct;
            n.path.getSubpath = function(n, t, i) {
                if (this.getTotalLength(n) - i < 1e-6) return ut(n, t).end;
                var r = ut(n, i, 1);
                return t ? ut(r, t).end : r
            };
            nt.getTotalLength = function() {
                if (this.node.getTotalLength) return this.node.getTotalLength()
            };
            nt.getPointAtLength = function(n) {
                return ct(this.attr("d"), n)
            };
            nt.getSubpath = function(t, i) {
                return n.path.getSubpath(this.attr("d"), t, i)
            };
            n._.box = h;
            n.path.findDotsAtSegment = w;
            n.path.bezierBBox = ft;
            n.path.isPointInsideBBox = e;
            n.closest = function(t, i, r, u) {
                for (var f = 100, p = h(t - f / 2, i - f / 2, f, f), s = [], b = r[0].hasOwnProperty("x") ? function(n) {
                        return {
                            x: r[n].x,
                            y: r[n].y
                        }
                    } : function(n) {
                        return {
                            x: r[n],
                            y: u[n]
                        }
                    }, v = 0, o, c, l, y, w, a; f <= 1e6 && !v;) {
                    for (o = 0, c = r.length; o < c; o++)
                        if (l = b(o), e(p, l.x, l.y)) {
                            v++;
                            s.push(l);
                            break
                        }
                    v || (f *= 2, p = h(t - f / 2, i - f / 2, f, f))
                }
                if (f != 1e6) {
                    for (y = Infinity, o = 0, c = s.length; o < c; o++) a = n.len(t, i, s[o].x, s[o].y), y > a && (y = a, s[o].len = a, w = s[o]);
                    return w
                }
            };
            n.path.isBBoxIntersect = lt;
            n.path.intersection = ii;
            n.path.intersectionNumber = ri;
            n.path.isPointInside = ui;
            n.path.getBBox = vt;
            n.path.get = fi;
            n.path.toRelative = ei;
            n.path.toAbsolute = st;
            n.path.toCubic = p;
            n.path.map = oi;
            n.path.toString = a;
            n.path.clone = l
        }), i.plugin(function(n) {
            var f = Math.max,
                e = Math.min,
                u = function(n) {
                    if (this.items = [], this.bindings = {}, this.length = 0, this.type = "set", n)
                        for (var t = 0, i = n.length; t < i; t++) n[t] && (this[this.items.length] = this.items[this.items.length] = n[t], this.length++)
                },
                i = u.prototype;
            i.push = function() {
                for (var n, t, i = 0, r = arguments.length; i < r; i++) n = arguments[i], n && (t = this.items.length, this[t] = this.items[t] = n, this.length++);
                return this
            };
            i.pop = function() {
                return this.length && delete this[this.length--], this.items.pop()
            };
            i.forEach = function(n, t) {
                for (var i = 0, r = this.items.length; i < r; i++)
                    if (n.call(t, this.items[i], i) === !1) return this;
                return this
            };
            i.animate = function(i, u, f, e) {
                var o, h;
                typeof f != "function" || f.length || (e = f, f = r.linear);
                i instanceof n._.Animation && (e = i.callback, f = i.easing, u = f.dur, i = i.attr);
                o = arguments;
                n.is(i, "array") && n.is(o[o.length - 1], "array") && (h = !0);
                var s, c = function() {
                        s ? this.b = s : s = this.b
                    },
                    l = 0,
                    a = this,
                    v = e && function() {
                        ++l == a.length && e.call(this)
                    };
                return this.forEach(function(n, r) {
                    t.once("snap.animcreated." + n.id, c);
                    h ? o[r] && n.animate.apply(n, o[r]) : n.animate(i, u, f, v)
                })
            };
            i.remove = function() {
                while (this.length) this.pop().remove();
                return this
            };
            i.bind = function(n, t, i) {
                var r = {},
                    u;
                return typeof t == "function" ? this.bindings[n] = t : (u = i || n, this.bindings[n] = function(n) {
                    r[u] = n;
                    t.attr(r)
                }), this
            };
            i.attr = function(n) {
                var r = {},
                    t, i, u;
                for (t in n) this.bindings[t] ? this.bindings[t](n[t]) : r[t] = n[t];
                for (i = 0, u = this.items.length; i < u; i++) this.items[i].attr(r);
                return this
            };
            i.clear = function() {
                while (this.length) this.pop()
            };
            i.splice = function(n, t) {
                var r;
                n = n < 0 ? f(this.length + n, 0) : n;
                t = f(0, e(this.length - n, t));
                for (var o = [], h = [], s = [], i = 2; i < arguments.length; i++) s.push(arguments[i]);
                for (i = 0; i < t; i++) h.push(this[n + i]);
                for (; i < this.length - n; i++) o.push(this[n + i]);
                for (r = s.length, i = 0; i < r + o.length; i++) this.items[n + i] = this[n + i] = i < r ? s[i] : o[i - r];
                for (i = this.items.length = this.length -= t - r; this[i];) delete this[i++];
                return new u(h)
            };
            i.exclude = function(n) {
                for (var t = 0, i = this.length; t < i; t++)
                    if (this[t] == n) return this.splice(t, 1), !0;
                return !1
            };
            i.insertAfter = function(n) {
                for (var t = this.items.length; t--;) this.items[t].insertAfter(n);
                return this
            };
            i.getBBox = function() {
                for (var i, n = [], t = [], r = [], u = [], o = this.items.length; o--;) this.items[o].removed || (i = this.items[o].getBBox(), n.push(i.x), t.push(i.y), r.push(i.x + i.width), u.push(i.y + i.height));
                return n = e.apply(0, n), t = e.apply(0, t), r = f.apply(0, r), u = f.apply(0, u), {
                    x: n,
                    y: t,
                    x2: r,
                    y2: u,
                    width: r - n,
                    height: u - t,
                    cx: n + (r - n) / 2,
                    cy: t + (u - t) / 2
                }
            };
            i.clone = function(n) {
                n = new u;
                for (var t = 0, i = this.items.length; t < i; t++) n.push(this.items[t].clone());
                return n
            };
            i.toString = function() {
                return "Snap‘s set"
            };
            i.type = "set";
            n.Set = u;
            n.set = function() {
                var n = new u;
                return arguments.length && n.push.apply(n, Array.prototype.slice.call(arguments, 0)), n
            }
        }), i.plugin(function(n, i) {
            function o(n) {
                var t = n[0];
                switch (t.toLowerCase()) {
                    case "t":
                        return [t, 0, 0];
                    case "m":
                        return [t, 1, 0, 0, 1, 0, 0];
                    case "r":
                        return n.length == 4 ? [t, 0, n[2], n[3]] : [t, 0];
                    case "s":
                        return n.length == 5 ? [t, 1, 1, n[3], n[4]] : n.length == 3 ? [t, 1, 1] : [t, 1]
                }
            }

            function l(t, i, r) {
                t = t || new n.Matrix;
                i = i || new n.Matrix;
                t = n.parseTransformString(t.toTransformString()) || [];
                i = n.parseTransformString(i.toTransformString()) || [];
                for (var y = Math.max(t.length, i.length), l = [], a = [], e = 0, s, v, f, c; e < y; e++) {
                    if (f = t[e] || o(i[e]), c = i[e] || o(f), f[0] != c[0] || f[0].toLowerCase() == "r" && (f[2] != c[2] || f[3] != c[3]) || f[0].toLowerCase() == "s" && (f[3] != c[3] || f[4] != c[4])) {
                        t = n._.transform2matrix(t, r());
                        i = n._.transform2matrix(i, r());
                        l = [
                            ["m", t.a, t.b, t.c, t.d, t.e, t.f]
                        ];
                        a = [
                            ["m", i.a, i.b, i.c, i.d, i.e, i.f]
                        ];
                        break
                    }
                    for (l[e] = [], a[e] = [], s = 0, v = Math.max(f.length, c.length); s < v; s++) s in f && (l[e][s] = f[s]), s in c && (a[e][s] = c[s])
                }
                return {
                    from: u(l),
                    to: u(a),
                    f: h(l)
                }
            }

            function s(n) {
                return n
            }

            function a(n) {
                return function(t) {
                    return +t.toFixed(3) + n
                }
            }

            function v(n) {
                return n.join(" ")
            }

            function y(t) {
                return n.rgb(t[0], t[1], t[2], t[3])
            }

            function h(n) {
                for (var s = 0, i, e, r, u, o = [], t = 0, f = n.length; t < f; t++) {
                    for (r = "[", u = ['"' + n[t][0] + '"'], i = 1, e = n[t].length; i < e; i++) u[i] = "val[" + s++ + "]";
                    r += u + "]";
                    o[t] = r
                }
                return Function("val", "return Snap.path.toString.call([" + o + "])")
            }

            function u(n) {
                for (var i, u, r = [], t = 0, f = n.length; t < f; t++)
                    for (i = 1, u = n[t].length; i < u; i++) r.push(n[t][i]);
                return r
            }

            function c(n) {
                return isFinite(n)
            }

            function p(t, i) {
                return !n.is(t, "array") || !n.is(i, "array") ? !1 : t.toString() == i.toString()
            }
            var f = {},
                e = /[%a-z]+$/i,
                r = String;
            f.stroke = f.fill = "colour";
            i.prototype.equal = function(n, i) {
                return t("snap.util.equal", this, n, i).firstDefined()
            };
            t.on("snap.util.equal", function(t, i) {
                var o, b, w = r(this.attr(t) || ""),
                    g = this,
                    k, d;
                return f[t] == "colour" ? (o = n.color(w), b = n.color(i), {
                    from: [o.r, o.g, o.b, o.opacity],
                    to: [b.r, b.g, b.b, b.opacity],
                    f: y
                }) : t == "viewBox" ? (o = this.attr(t).vb.split(" ").map(Number), b = i.split(" ").map(Number), {
                    from: o,
                    to: b,
                    f: v
                }) : t == "transform" || t == "gradientTransform" || t == "patternTransform" ? (typeof i == "string" && (i = r(i).replace(/\.{3}|\u2026/g, w)), w = this.matrix, i = n._.rgTransform.test(i) ? n._.transform2matrix(i, this.getBBox()) : n._.transform2matrix(n._.svgTransform2string(i), this.getBBox()), l(w, i, function() {
                    return g.getBBox(1)
                })) : t == "d" || t == "path" ? (o = n.path.toCubic(w, i), {
                    from: u(o[0]),
                    to: u(o[1]),
                    f: h(o[0])
                }) : t == "points" ? (o = r(w).split(n._.separator), b = r(i).split(n._.separator), {
                    from: o,
                    to: b,
                    f: function(n) {
                        return n
                    }
                }) : c(w) && c(i) ? {
                    from: parseFloat(w),
                    to: parseFloat(i),
                    f: s
                } : (k = w.match(e), d = r(i).match(e), k && p(k, d) ? {
                    from: parseFloat(w),
                    to: parseFloat(i),
                    f: a(k)
                } : {
                    from: this.asPX(t),
                    to: this.asPX(t, i),
                    f: s
                })
            })
        }), i.plugin(function(n, i, r, u) {
            for (var e, o = i.prototype, p = "hasOwnProperty", h = ("createTouch" in u.doc), v = ["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"], c = {
                    mousedown: "touchstart",
                    mousemove: "touchmove",
                    mouseup: "touchend"
                }, s = function(n, t) {
                    var i = n == "y" ? "scrollTop" : "scrollLeft",
                        r = t && t.node ? t.node.ownerDocument : u.doc;
                    return r[i in r.documentElement ? "documentElement" : "body"][i]
                }, d = function() {
                    this.returnValue = !1
                }, w = function() {
                    return this.originalEvent.preventDefault()
                }, g = function() {
                    this.cancelBubble = !0
                }, b = function() {
                    return this.originalEvent.stopPropagation()
                }, k = function(n, t, i, r) {
                    var u = h && c[t] ? c[t] : t,
                        f = function(u) {
                            var v = s("y", r),
                                y = s("x", r),
                                f, e, o, l, a;
                            if (h && c[p](t))
                                for (f = 0, e = u.targetTouches && u.targetTouches.length; f < e; f++)
                                    if (u.targetTouches[f].target == n || n.contains(u.targetTouches[f].target)) {
                                        o = u;
                                        u = u.targetTouches[f];
                                        u.originalEvent = o;
                                        u.preventDefault = w;
                                        u.stopPropagation = b;
                                        break
                                    }
                            return l = u.clientX + y, a = u.clientY + v, i.call(r, u, l, a)
                        };
                    return t !== u && n.addEventListener(t, f, !1), n.addEventListener(u, f, !1),
                        function() {
                            return t !== u && n.removeEventListener(t, f, !1), n.removeEventListener(u, f, !1), !0
                        }
                }, f = [], l = function(n) {
                    for (var u = n.clientX, e = n.clientY, a = s("y"), v = s("x"), i, l = f.length, o, r; l--;) {
                        if (i = f[l], h) {
                            for (o = n.touches && n.touches.length; o--;)
                                if (r = n.touches[o], r.identifier == i.el._drag.id || i.el.node.contains(r.target)) {
                                    u = r.clientX;
                                    e = r.clientY;
                                    (n.originalEvent ? n.originalEvent : n).preventDefault();
                                    break
                                }
                        } else n.preventDefault();
                        var c = i.el.node,
                            y = c.nextSibling,
                            p = c.parentNode,
                            w = c.style.display;
                        u += v;
                        e += a;
                        t("snap.drag.move." + i.el.id, i.move_scope || i.el, u - i.el._drag.x, e - i.el._drag.y, u, e, n)
                    }
                }, a = function(i) {
                    n.unmousemove(l).unmouseup(a);
                    for (var u = f.length, r; u--;) r = f[u], r.el._drag = {}, t("snap.drag.end." + r.el.id, r.end_scope || r.start_scope || r.move_scope || r.el, i), t.off("snap.drag.*." + r.el.id);
                    f = []
                }, y = v.length; y--;)(function(t) {
                n[t] = o[t] = function(i, r) {
                    if (n.is(i, "function")) this.events = this.events || [], this.events.push({
                        name: t,
                        f: i,
                        unbind: k(this.node || document, t, i, r || this)
                    });
                    else
                        for (var u = 0, f = this.events.length; u < f; u++)
                            if (this.events[u].name == t) try {
                                this.events[u].f.call(this)
                            } catch (e) {}
                            return this
                };
                n["un" + t] = o["un" + t] = function(n) {
                    for (var i = this.events || [], r = i.length; r--;)
                        if (i[r].name == t && (i[r].f == n || !n)) return i[r].unbind(), i.splice(r, 1), i.length || delete this.events, this;
                    return this
                }
            })(v[y]);
            o.hover = function(n, t, i, r) {
                return this.mouseover(n, i).mouseout(t, r || i)
            };
            o.unhover = function(n, t) {
                return this.unmouseover(n).unmouseout(t)
            };
            e = [];
            o.drag = function(i, r, u, o, s, h) {
                function y(e, v, y) {
                    (e.originalEvent || e).preventDefault();
                    c._drag.x = v;
                    c._drag.y = y;
                    c._drag.id = e.identifier;
                    f.length || n.mousemove(l).mouseup(a);
                    f.push({
                        el: c,
                        move_scope: o,
                        start_scope: s,
                        end_scope: h
                    });
                    r && t.on("snap.drag.start." + c.id, r);
                    i && t.on("snap.drag.move." + c.id, i);
                    u && t.on("snap.drag.end." + c.id, u);
                    t("snap.drag.start." + c.id, s || o || c, v, y, e)
                }

                function p(n, i, r) {
                    t("snap.draginit." + c.id, c, n, i, r)
                }
                var c = this,
                    v;
                if (!arguments.length) return c.drag(function(n, t) {
                    this.attr({
                        transform: v + (v ? "T" : "t") + [n, t]
                    })
                }, function() {
                    v = this.transform().local
                });
                t.on("snap.draginit." + c.id, y);
                return c._drag = {}, e.push({
                    el: c,
                    start: y,
                    init: p
                }), c.mousedown(p), c
            };
            o.undrag = function() {
                for (var i = e.length; i--;) e[i].el == this && (this.unmousedown(e[i].init), e.splice(i, 1), t.unbind("snap.drag.*." + this.id), t.unbind("snap.draginit." + this.id));
                return e.length || n.unmousemove(l).unmouseup(a), this
            }
        }), i.plugin(function(n, i, r) {
            var s = i.prototype,
                e = r.prototype,
                o = /^\s*url\((.+)\)/,
                f = String,
                u = n._.$;
            n.filter = {};
            e.filter = function(t) {
                var r = this;
                r.type != "svg" && (r = r.paper);
                var o = n.parse(f(t)),
                    s = n._.id(),
                    h = r.node.offsetWidth,
                    c = r.node.offsetHeight,
                    e = u("filter");
                return u(e, {
                    id: s,
                    filterUnits: "userSpaceOnUse"
                }), e.appendChild(o.node), r.defs.appendChild(e), new i(e)
            };
            t.on("snap.util.getattr.filter", function() {
                var i, r;
                return t.stop(), i = u(this.node, "filter"), i ? (r = f(i).match(o), r && n.select(r[1])) : void 0
            });
            t.on("snap.util.attr.filter", function(r) {
                if (r instanceof i && r.type == "filter") {
                    t.stop();
                    var f = r.node.id;
                    f || (u(r.node, {
                        id: r.id
                    }), f = r.id);
                    u(this.node, {
                        filter: n.url(f)
                    })
                }
                r && r != "none" || (t.stop(), this.node.removeAttribute("filter"))
            });
            n.filter.blur = function(t, i) {
                t == null && (t = 2);
                var r = i == null ? t : [t, i];
                return n.format('<feGaussianBlur stdDeviation="{def}"/>', {
                    def: r
                })
            };
            n.filter.blur.toString = function() {
                return this()
            };
            n.filter.shadow = function(t, i, r, u, f) {
                return f == null && (u == null ? (f = r, r = 4, u = "#000") : (f = u, u = r, r = 4)), r == null && (r = 4), f == null && (f = 1), t == null && (t = 0, i = 2), i == null && (i = t), u = n.color(u), n.format('<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feComponentTransfer><feFuncA type="linear" slope="{opacity}"/><\/feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/><\/feMerge>', {
                    color: u,
                    dx: t,
                    dy: i,
                    blur: r,
                    opacity: f
                })
            };
            n.filter.shadow.toString = function() {
                return this()
            };
            n.filter.grayscale = function(t) {
                return t == null && (t = 1), n.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>', {
                    a: .2126 + .7874 * (1 - t),
                    b: .7152 - .7152 * (1 - t),
                    c: .0722 - .0722 * (1 - t),
                    d: .2126 - .2126 * (1 - t),
                    e: .7152 + .2848 * (1 - t),
                    f: .0722 - .0722 * (1 - t),
                    g: .2126 - .2126 * (1 - t),
                    h: .0722 + .9278 * (1 - t)
                })
            };
            n.filter.grayscale.toString = function() {
                return this()
            };
            n.filter.sepia = function(t) {
                return t == null && (t = 1), n.format('<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>', {
                    a: .393 + .607 * (1 - t),
                    b: .769 - .769 * (1 - t),
                    c: .189 - .189 * (1 - t),
                    d: .349 - .349 * (1 - t),
                    e: .686 + .314 * (1 - t),
                    f: .168 - .168 * (1 - t),
                    g: .272 - .272 * (1 - t),
                    h: .534 - .534 * (1 - t),
                    i: .131 + .869 * (1 - t)
                })
            };
            n.filter.sepia.toString = function() {
                return this()
            };
            n.filter.saturate = function(t) {
                return t == null && (t = 1), n.format('<feColorMatrix type="saturate" values="{amount}"/>', {
                    amount: 1 - t
                })
            };
            n.filter.saturate.toString = function() {
                return this()
            };
            n.filter.hueRotate = function(t) {
                return t = t || 0, n.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
                    angle: t
                })
            };
            n.filter.hueRotate.toString = function() {
                return this()
            };
            n.filter.invert = function(t) {
                return t == null && (t = 1), n.format('<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/><\/feComponentTransfer>', {
                    amount: t,
                    amount2: 1 - t
                })
            };
            n.filter.invert.toString = function() {
                return this()
            };
            n.filter.brightness = function(t) {
                return t == null && (t = 1), n.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/><\/feComponentTransfer>', {
                    amount: t
                })
            };
            n.filter.brightness.toString = function() {
                return this()
            };
            n.filter.contrast = function(t) {
                return t == null && (t = 1), n.format('<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/><\/feComponentTransfer>', {
                    amount: t,
                    amount2: .5 - t / 2
                })
            };
            n.filter.contrast.toString = function() {
                return this()
            }
        }), i.plugin(function(n, t) {
            var i = n._.box,
                r = n.is,
                u = /^[^a-z]*([tbmlrc])/i,
                f = function() {
                    return "T" + this.dx + "," + this.dy
                };
            t.prototype.getAlign = function(n, t) {
                t == null && r(n, "string") && (t = n, n = null);
                n = n || this.paper;
                var o = n.getBBox ? n.getBBox() : i(n),
                    s = this.getBBox(),
                    e = {};
                t = t && t.match(u);
                t = t ? t[1].toLowerCase() : "c";
                switch (t) {
                    case "t":
                        e.dx = 0;
                        e.dy = o.y - s.y;
                        break;
                    case "b":
                        e.dx = 0;
                        e.dy = o.y2 - s.y2;
                        break;
                    case "m":
                        e.dx = 0;
                        e.dy = o.cy - s.cy;
                        break;
                    case "l":
                        e.dx = o.x - s.x;
                        e.dy = 0;
                        break;
                    case "r":
                        e.dx = o.x2 - s.x2;
                        e.dy = 0;
                        break;
                    default:
                        e.dx = o.cx - s.cx;
                        e.dy = 0
                }
                return e.toString = f, e
            };
            t.prototype.align = function(n, t) {
                return this.transform("..." + this.getAlign(n, t))
            }
        }), i.plugin(function(t) {
            function i(n) {
                n = n.split(/(?=#)/);
                var t = new String(n[5]);
                return t[50] = n[0], t[100] = n[1], t[200] = n[2], t[300] = n[3], t[400] = n[4], t[500] = n[5], t[600] = n[6], t[700] = n[7], t[800] = n[8], t[900] = n[9], n[10] && (t.A100 = n[10], t.A200 = n[11], t.A400 = n[12], t.A700 = n[13]), t
            }
            t.mui = {};
            t.flat = {};
            t.mui.red = i("#ffebee#ffcdd2#ef9a9a#e57373#ef5350#f44336#e53935#d32f2f#c62828#b71c1c#ff8a80#ff5252#ff1744#d50000");
            t.mui.pink = i("#FCE4EC#F8BBD0#F48FB1#F06292#EC407A#E91E63#D81B60#C2185B#AD1457#880E4F#FF80AB#FF4081#F50057#C51162");
            t.mui.purple = i("#F3E5F5#E1BEE7#CE93D8#BA68C8#AB47BC#9C27B0#8E24AA#7B1FA2#6A1B9A#4A148C#EA80FC#E040FB#D500F9#AA00FF");
            t.mui.deeppurple = i("#EDE7F6#D1C4E9#B39DDB#9575CD#7E57C2#673AB7#5E35B1#512DA8#4527A0#311B92#B388FF#7C4DFF#651FFF#6200EA");
            t.mui.indigo = i("#E8EAF6#C5CAE9#9FA8DA#7986CB#5C6BC0#3F51B5#3949AB#303F9F#283593#1A237E#8C9EFF#536DFE#3D5AFE#304FFE");
            t.mui.blue = i("#E3F2FD#BBDEFB#90CAF9#64B5F6#64B5F6#2196F3#1E88E5#1976D2#1565C0#0D47A1#82B1FF#448AFF#2979FF#2962FF");
            t.mui.lightblue = i("#E1F5FE#B3E5FC#81D4FA#4FC3F7#29B6F6#03A9F4#039BE5#0288D1#0277BD#01579B#80D8FF#40C4FF#00B0FF#0091EA");
            t.mui.cyan = i("#E0F7FA#B2EBF2#80DEEA#4DD0E1#26C6DA#00BCD4#00ACC1#0097A7#00838F#006064#84FFFF#18FFFF#00E5FF#00B8D4");
            t.mui.teal = i("#E0F2F1#B2DFDB#80CBC4#4DB6AC#26A69A#009688#00897B#00796B#00695C#004D40#A7FFEB#64FFDA#1DE9B6#00BFA5");
            t.mui.green = i("#E8F5E9#C8E6C9#A5D6A7#81C784#66BB6A#4CAF50#43A047#388E3C#2E7D32#1B5E20#B9F6CA#69F0AE#00E676#00C853");
            t.mui.lightgreen = i("#F1F8E9#DCEDC8#C5E1A5#AED581#9CCC65#8BC34A#7CB342#689F38#558B2F#33691E#CCFF90#B2FF59#76FF03#64DD17");
            t.mui.lime = i("#F9FBE7#F0F4C3#E6EE9C#DCE775#D4E157#CDDC39#C0CA33#AFB42B#9E9D24#827717#F4FF81#EEFF41#C6FF00#AEEA00");
            t.mui.yellow = i("#FFFDE7#FFF9C4#FFF59D#FFF176#FFEE58#FFEB3B#FDD835#FBC02D#F9A825#F57F17#FFFF8D#FFFF00#FFEA00#FFD600");
            t.mui.amber = i("#FFF8E1#FFECB3#FFE082#FFD54F#FFCA28#FFC107#FFB300#FFA000#FF8F00#FF6F00#FFE57F#FFD740#FFC400#FFAB00");
            t.mui.orange = i("#FFF3E0#FFE0B2#FFCC80#FFB74D#FFA726#FF9800#FB8C00#F57C00#EF6C00#E65100#FFD180#FFAB40#FF9100#FF6D00");
            t.mui.deeporange = i("#FBE9E7#FFCCBC#FFAB91#FF8A65#FF7043#FF5722#F4511E#E64A19#D84315#BF360C#FF9E80#FF6E40#FF3D00#DD2C00");
            t.mui.brown = i("#EFEBE9#D7CCC8#BCAAA4#A1887F#8D6E63#795548#6D4C41#5D4037#4E342E#3E2723");
            t.mui.grey = i("#FAFAFA#F5F5F5#EEEEEE#E0E0E0#BDBDBD#9E9E9E#757575#616161#424242#212121");
            t.mui.bluegrey = i("#ECEFF1#CFD8DC#B0BEC5#90A4AE#78909C#607D8B#546E7A#455A64#37474F#263238");
            t.flat.turquoise = "#1abc9c";
            t.flat.greensea = "#16a085";
            t.flat.sunflower = "#f1c40f";
            t.flat.orange = "#f39c12";
            t.flat.emerland = "#2ecc71";
            t.flat.nephritis = "#27ae60";
            t.flat.carrot = "#e67e22";
            t.flat.pumpkin = "#d35400";
            t.flat.peterriver = "#3498db";
            t.flat.belizehole = "#2980b9";
            t.flat.alizarin = "#e74c3c";
            t.flat.pomegranate = "#c0392b";
            t.flat.amethyst = "#9b59b6";
            t.flat.wisteria = "#8e44ad";
            t.flat.clouds = "#ecf0f1";
            t.flat.silver = "#bdc3c7";
            t.flat.wetasphalt = "#34495e";
            t.flat.midnightblue = "#2c3e50";
            t.flat.concrete = "#95a5a6";
            t.flat.asbestos = "#7f8c8d";
            t.importMUIColors = function() {
                for (var i in t.mui) t.mui.hasOwnProperty(i) && (n[i] = t.mui[i])
            }
        }), i
    });
$(document).ready(function() {
    "use strict";
    Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(n) {
            var i, u, f, t, r;
            if (this == null) throw new TypeError('"this" is null or not defined');
            if (i = Object(this), u = i.length >>> 0, typeof n != "function") throw new TypeError("predicate must be a function");
            for (f = arguments[1], t = 0; t < u;) {
                if (r = i[t], n.call(f, r, t, i)) return r;
                t++
            }
            return undefined
        }
    });
    typeof Object.assign != "function" && (Object.assign = function(n) {
        var u, i, t, r;
        if (n == null) throw new TypeError("Cannot convert undefined or null to object");
        for (u = Object(n), i = 1; i < arguments.length; i++)
            if (t = arguments[i], t != null)
                for (r in t) Object.prototype.hasOwnProperty.call(t, r) && (u[r] = t[r]);
        return u
    });
    Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(n) {
            var i, r, u, t, f;
            if (this == null) throw new TypeError('"this" is null or not defined');
            if (i = Object(this), r = i.length >>> 0, typeof n != "function") throw new TypeError("predicate must be a function");
            for (u = arguments[1], t = 0; t < r;) {
                if (f = i[t], n.call(u, f, t, i)) return t;
                t++
            }
            return -1
        },
        configurable: !0,
        writable: !0
    })
});
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode,
    _gShowMessage, _gShowError, _procError = function(n, t, i) {
        return n.readyState == 0 && n.status == 0 ? "Unable to connect to the server. Is your internet connection working?" : t + "\n\n" + i
    },
    gShowMessage = function(n, t) {
        _gShowMessage != undefined ? _gShowMessage(n, t) : alert(n + "\n\n" + t)
    },
    gShowError = function(n, t, i, r) {
        _gShowError != undefined ? _gShowError(n, t, i, r) : alert(n + "\n\n" + i + "\n\n" + r)
    },
    rsuParse = function(n) {
        return Snap.parse(n)
    },
    rsuAttr = function(n, t, i) {
        var r = n.node,
            f, o, u, h, s, e;
        if (!t) {
            if (r.nodeType != 1) return {
                text: r.nodeValue
            };
            for (f = r.attributes, o = {}, u = 0, h = f.length; u < h; u++) o[f[u].nodeName] = f[u].nodeValue;
            return o
        }
        if (typeof t == "string" || t instanceof String)
            if (arguments.length > 2) s = {}, s[t] = i, t = s;
            else return r.getAttribute(t);
        for (e in t) t.hasOwnProperty(e) && r.setAttribute(e, String(t[e]))
    },
    hasrsuAttr = function(n, t) {
        return typeof t == "string" || t instanceof String ? n.node.hasAttribute(t) : !1
    },
    rsuRemoveAttr = function(n, t) {
        return typeof t == "string" || t instanceof String ? n.node.removeAttribute(t) : !1
    },
    rsuAttrFind = function(n, t) {
        do {
            var i = rsuAttr(n, t);
            if (i != null) return i
        } while (n.node.id != "gsvgimpression" && (n = n.parent()) != null);
        return null
    },
    rsuLabelEscape = function(n) {
        var i = "",
            r, t;
        if (n == undefined) return n;
        for (r = n.length - 1, t = 0; t <= r; t++)
            if (n[t] == "{") {
                if (t < r && n[t + 1] == "{") {
                    i += "{";
                    t++;
                    continue
                }
                i += "<"
            } else if (n[t] == "}") {
            if (t < r && n[t + 1] == "}") {
                i += "}";
                t++;
                continue
            }
            i += ">"
        } else i += n[t];
        return i
    },
    fixTagNamespaces = function(n) {
        for (var t = undefined, i, r, u, f, e;
            (t = n.indexOf("xmlns:NS")) > 0;) i = n.substr(t + 8, n.substring(t + 8).indexOf("=")), i = Number(i), r = new RegExp("xmlns:NS" + i + '=""', "g"), u = new RegExp("NS" + i + ":", "g"), n = n.replace(r, ""), n = n.replace(u, "");
        while ((t = n.indexOf("xmlns")) > 0) f = n.substring(0, t), t = n.indexOf('"', t), t = n.indexOf('"', t + 1), e = n.substring(t + 1), n = f + e;
        return n.replace(/NS([1-9]|[1-9][0-9]):href/g, "xlink:href")
    },
    removeNamespaces = function(n) {
        for (var u = n.split("<"), f = "", t = 0; t < u.length; t++) {
            var i = u[t],
                r = (t == 0 ? "" : "<") + i.substring(0, i.indexOf(">") + 1),
                e = i.substring(i.indexOf(">") + 1);
            r = fixTagNamespaces(r);
            f += r + e
        }
        return f
    },
    rsuOuterSVG = function(n) {
        var t = n.outerSVG();
        return removeNamespaces(t)
    },
    singleZeroPad = function(n) {
        return (n < 10 ? "0" : "") + n
    };
(function(n, t) {
    typeof define == "function" && define.amd ? define("sifter", t) : typeof exports == "object" ? module.exports = t() : n.Sifter = t()
})(this, function() {
    var n = function(n, t) {
        this.items = n;
        this.settings = t || {
            diacritics: !0
        }
    };
    n.prototype.tokenize = function(n) {
        if (n = o(String(n || "").toLowerCase()), !n || !n.length) return [];
        for (var r, u, h = [], f = n.split(/ +/), i = 0, e = f.length; i < e; i++) {
            if (r = s(f[i]), this.settings.diacritics)
                for (u in t) t.hasOwnProperty(u) && (r = r.replace(new RegExp(u, "g"), t[u]));
            h.push({
                string: f[i],
                regex: new RegExp(r, "i")
            })
        }
        return h
    };
    n.prototype.iterator = function(n, t) {
        var r;
        r = i(n) ? Array.prototype.forEach || function(n) {
            for (var t = 0, i = this.length; t < i; t++) n(this[t], t, this)
        } : function(n) {
            for (var t in this) this.hasOwnProperty(t) && n(this[t], t, this)
        };
        r.apply(n, [t])
    };
    n.prototype.getScoreFunction = function(n, t) {
        var h, f, u, i, o, s, e;
        return (h = this, n = h.prepareSearch(n, t), u = n.tokens, f = n.options.fields, i = u.length, o = n.options.nesting, s = function(n, t) {
            var i, r;
            return n ? (n = String(n || ""), r = n.search(t.regex), r === -1) ? 0 : (i = t.string.length / n.length, r === 0 && (i += .5), i) : 0
        }, e = function() {
            var n = f.length;
            return n ? n === 1 ? function(n, t) {
                return s(r(t, f[0], o), n)
            } : function(t, i) {
                for (var u = 0, e = 0; u < n; u++) e += s(r(i, f[u], o), t);
                return e / n
            } : function() {
                return 0
            }
        }(), !i) ? function() {
            return 0
        } : i === 1 ? function(n) {
            return e(u[0], n)
        } : n.options.conjunction === "and" ? function(n) {
            for (var t, r = 0, f = 0; r < i; r++) {
                if (t = e(u[r], n), t <= 0) return 0;
                f += t
            }
            return f / i
        } : function(n) {
            for (var t = 0, r = 0; t < i; t++) r += e(u[t], n);
            return r / i
        }
    };
    n.prototype.getSortFunction = function(n, t) {
        var i, e, l, a, f, h, y, c, o, v, s;
        if (l = this, n = l.prepareSearch(n, t), s = !n.query && t.sort_empty || t.sort, o = function(n, i) {
                return n === "$score" ? i.score : r(l.items[i.id], n, t.nesting)
            }, f = [], s)
            for (i = 0, e = s.length; i < e; i++)(n.query || s[i].field !== "$score") && f.push(s[i]);
        if (n.query) {
            for (v = !0, i = 0, e = f.length; i < e; i++)
                if (f[i].field === "$score") {
                    v = !1;
                    break
                }
            v && f.unshift({
                field: "$score",
                direction: "desc"
            })
        } else
            for (i = 0, e = f.length; i < e; i++)
                if (f[i].field === "$score") {
                    f.splice(i, 1);
                    break
                } for (c = [], i = 0, e = f.length; i < e; i++) c.push(f[i].direction === "desc" ? -1 : 1);
        return h = f.length, h ? h === 1 ? (a = f[0].field, y = c[0], function(n, t) {
            return y * u(o(a, n), o(a, t))
        }) : function(n, t) {
            for (var r, e, i = 0; i < h; i++)
                if (e = f[i].field, r = c[i] * u(o(e, n), o(e, t)), r) return r;
            return 0
        } : null
    };
    n.prototype.prepareSearch = function(n, t) {
        if (typeof n == "object") return n;
        t = e({}, t);
        var r = t.fields,
            u = t.sort,
            f = t.sort_empty;
        return r && !i(r) && (t.fields = [r]), u && !i(u) && (t.sort = [u]), f && !i(f) && (t.sort_empty = [f]), {
            options: t,
            query: String(n || "").toLowerCase(),
            tokens: this.tokenize(n),
            total: 0,
            items: []
        }
    };
    n.prototype.search = function(n, t) {
        var r = this,
            u, i, f, e;
        return i = this.prepareSearch(n, t), t = i.options, n = i.query, e = t.score || r.getScoreFunction(i), n.length ? r.iterator(r.items, function(n, r) {
            u = e(n);
            (t.filter === !1 || u > 0) && i.items.push({
                score: u,
                id: r
            })
        }) : r.iterator(r.items, function(n, t) {
            i.items.push({
                score: 1,
                id: t
            })
        }), f = r.getSortFunction(i, t), f && i.items.sort(f), i.total = i.items.length, typeof t.limit == "number" && (i.items = i.items.slice(0, t.limit)), i
    };
    var u = function(n, t) {
            return typeof n == "number" && typeof t == "number" ? n > t ? 1 : n < t ? -1 : 0 : (n = f(String(n || "")), t = f(String(t || "")), n > t) ? 1 : t > n ? -1 : 0
        },
        e = function(n) {
            for (var r, t, i = 1, u = arguments.length; i < u; i++)
                if (t = arguments[i], t)
                    for (r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
            return n
        },
        r = function(n, t, i) {
            if (n && t) {
                if (!i) return n[t];
                for (var r = t.split("."); r.length && (n = n[r.shift()]););
                return n
            }
        },
        o = function(n) {
            return (n + "").replace(/^\s+|\s+$|/g, "")
        },
        s = function(n) {
            return (n + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        },
        i = Array.isArray || typeof $ != "undefined" && $.isArray || function(n) {
            return Object.prototype.toString.call(n) === "[object Array]"
        },
        t = {
            a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]",
            b: "[b␢βΒB฿𐌁ᛒ]",
            c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]",
            d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]",
            e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]",
            f: "[fƑƒḞḟ]",
            g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]",
            h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]",
            i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]",
            j: "[jȷĴĵɈɉʝɟʲ]",
            k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]",
            l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]",
            n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]",
            o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]",
            p: "[pṔṕṖṗⱣᵽƤƥᵱ]",
            q: "[qꝖꝗʠɊɋꝘꝙq̃]",
            r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]",
            s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]",
            t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]",
            u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]",
            v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]",
            w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]",
            x: "[xẌẍẊẋχ]",
            y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]",
            z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]"
        },
        f = function() {
            var i, u, n, r, f = "",
                e = {},
                o;
            for (n in t)
                if (t.hasOwnProperty(n))
                    for (r = t[n].substring(2, t[n].length - 1), f += r, i = 0, u = r.length; i < u; i++) e[r.charAt(i)] = n;
            return o = new RegExp("[" + f + "]", "g"),
                function(n) {
                    return n.replace(o, function(n) {
                        return e[n]
                    }).toLowerCase()
                }
        }();
    return n
}),
function(n, t) {
    typeof define == "function" && define.amd ? define("microplugin", t) : typeof exports == "object" ? module.exports = t() : n.MicroPlugin = t()
}(this, function() {
    var n = {},
        t;
    return n.mixin = function(n) {
        n.plugins = {};
        n.prototype.initializePlugins = function(n) {
            var i, e, r, f = this,
                u = [];
            if (f.plugins = {
                    names: [],
                    settings: {},
                    requested: {},
                    loaded: {}
                }, t.isArray(n))
                for (i = 0, e = n.length; i < e; i++) typeof n[i] == "string" ? u.push(n[i]) : (f.plugins.settings[n[i].name] = n[i].options, u.push(n[i].name));
            else if (n)
                for (r in n) n.hasOwnProperty(r) && (f.plugins.settings[r] = n[r], u.push(r));
            while (u.length) f.require(u.shift())
        };
        n.prototype.loadPlugin = function(t) {
            var i = this,
                r = i.plugins,
                u = n.plugins[t];
            if (!n.plugins.hasOwnProperty(t)) throw new Error('Unable to find "' + t + '" plugin');
            r.requested[t] = !0;
            r.loaded[t] = u.fn.apply(i, [i.plugins.settings[t] || {}]);
            r.names.push(t)
        };
        n.prototype.require = function(n) {
            var t = this,
                i = t.plugins;
            if (!t.plugins.loaded.hasOwnProperty(n)) {
                if (i.requested[n]) throw new Error('Plugin has circular dependency ("' + n + '")');
                t.loadPlugin(n)
            }
            return i.loaded[n]
        };
        n.define = function(t, i) {
            n.plugins[t] = {
                name: t,
                fn: i
            }
        }
    }, t = {
        isArray: Array.isArray || function(n) {
            return Object.prototype.toString.call(n) === "[object Array]"
        }
    }, n
}),
function(n, t) {
    typeof define == "function" && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], t) : typeof exports == "object" ? module.exports = t(require("jquery"), require("sifter"), require("microplugin")) : n.Selectize = t(n.jQuery, n.Sifter, n.MicroPlugin)
}(this, function(n, t, i) {
    "use strict";
    var d = function(n, t) {
            if (typeof t != "string" || t.length) {
                var i = typeof t == "string" ? new RegExp(t, "i") : t,
                    r = function(n) {
                        var o = 0,
                            e, s, u, t;
                        if (n.nodeType === 3) {
                            if (e = n.data.search(i), e >= 0 && n.data.length > 0) {
                                s = n.data.match(i);
                                u = document.createElement("span");
                                u.className = "highlight";
                                var f = n.splitText(e),
                                    c = f.splitText(s[0].length),
                                    h = f.cloneNode(!0);
                                u.appendChild(h);
                                f.parentNode.replaceChild(u, f);
                                o = 1
                            }
                        } else if (n.nodeType === 1 && n.childNodes && !/(script|style)/i.test(n.tagName))
                            for (t = 0; t < n.childNodes.length; ++t) t += r(n.childNodes[t]);
                        return o
                    };
                return n.each(function() {
                    r(this)
                })
            }
        },
        f;
    n.fn.removeHighlight = function() {
        return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            var n = this.parentNode;
            n.replaceChild(this.firstChild, this);
            n.normalize()
        }).end()
    };
    f = function() {};
    f.prototype = {
        on: function(n, t) {
            this._events = this._events || {};
            this._events[n] = this._events[n] || [];
            this._events[n].push(t)
        },
        off: function(n, t) {
            var i = arguments.length;
            if (i === 0) return delete this._events;
            if (i === 1) return delete this._events[n];
            (this._events = this._events || {}, n in this._events != !1) && this._events[n].splice(this._events[n].indexOf(t), 1)
        },
        trigger: function(n) {
            if (this._events = this._events || {}, n in this._events != !1)
                for (var t = 0; t < this._events[n].length; t++) this._events[n][t].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    };
    f.mixin = function(n) {
        for (var i = ["on", "off", "trigger"], t = 0; t < i.length; t++) n.prototype[i[t]] = f.prototype[i[t]]
    };
    var e = /Mac/.test(navigator.userAgent),
        g = 65,
        nt = 13,
        tt = 27,
        l = 37,
        it = 38,
        rt = 80,
        y = 39,
        ut = 40,
        ft = 78,
        o = 8,
        a = 46,
        et = 16,
        ot = e ? 91 : 17,
        st = e ? 18 : 17,
        p = 9,
        h = 1,
        ht = 2,
        w = !/android/i.test(window.navigator.userAgent) && !!document.createElement("input").validity,
        b = function(n) {
            return typeof n != "undefined"
        },
        u = function(n) {
            return typeof n == "undefined" || n === null ? null : typeof n == "boolean" ? n ? "1" : "0" : n + ""
        },
        s = function(n) {
            return (n + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        kt = function(n) {
            return (n + "").replace(/\$/g, "$$$$")
        },
        c = {};
    c.before = function(n, t, i) {
        var r = n[t];
        n[t] = function() {
            return i.apply(n, arguments), r.apply(n, arguments)
        }
    };
    c.after = function(n, t, i) {
        var r = n[t];
        n[t] = function() {
            var t = r.apply(n, arguments);
            return i.apply(n, arguments), t
        }
    };
    var ct = function(n) {
            var t = !1;
            return function() {
                t || (t = !0, n.apply(this, arguments))
            }
        },
        lt = function(n, t) {
            var i;
            return function() {
                var r = this,
                    u = arguments;
                window.clearTimeout(i);
                i = window.setTimeout(function() {
                    n.apply(r, u)
                }, t)
            }
        },
        k = function(n, t, i) {
            var u, f = n.trigger,
                r = {};
            n.trigger = function() {
                var i = arguments[0];
                if (t.indexOf(i) !== -1) r[i] = arguments;
                else return f.apply(n, arguments)
            };
            i.apply(n, []);
            n.trigger = f;
            for (u in r) r.hasOwnProperty(u) && f.apply(n, r[u])
        },
        at = function(n, t, i, r) {
            n.on(t, i, function(t) {
                for (var i = t.target; i && i.parentNode !== n[0];) i = i.parentNode;
                return t.currentTarget = i, r.apply(this, [t])
            })
        },
        v = function(n) {
            var t = {},
                i, r;
            return "selectionStart" in n ? (t.start = n.selectionStart, t.length = n.selectionEnd - t.start) : document.selection && (n.focus(), i = document.selection.createRange(), r = document.selection.createRange().text.length, i.moveStart("character", -n.value.length), t.start = i.text.length - r, t.length = r), t
        },
        vt = function(n, t, i) {
            var r, f, u = {};
            if (i)
                for (r = 0, f = i.length; r < f; r++) u[i[r]] = n.css(i[r]);
            else u = n.css();
            t.css(u)
        },
        yt = function(t, i) {
            var r, u;
            return t ? (r = n("<test>").css({
                position: "absolute",
                top: -99999,
                left: -99999,
                width: "auto",
                padding: 0,
                whiteSpace: "pre"
            }).text(t).appendTo("body"), vt(i, r, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]), u = r.width(), r.remove(), u) : 0
        },
        pt = function(n) {
            var t = null,
                i = function(i, r) {
                    var u, f, l, c, h, y, s, e;
                    (i = i || window.event || {}, r = r || {}, i.metaKey || i.altKey) || (r.force || n.data("grow") !== !1) && (u = n.val(), i.type && i.type.toLowerCase() === "keydown" && (f = i.keyCode, l = f >= 97 && f <= 122 || f >= 65 && f <= 90 || f >= 48 && f <= 57 || f === 32, f === a || f === o ? (e = v(n[0]), e.length ? u = u.substring(0, e.start) + u.substring(e.start + e.length) : f === o && e.start ? u = u.substring(0, e.start - 1) + u.substring(e.start + 1) : f === a && typeof e.start != "undefined" && (u = u.substring(0, e.start) + u.substring(e.start + 1))) : l && (y = i.shiftKey, s = String.fromCharCode(i.keyCode), s = y ? s.toUpperCase() : s.toLowerCase(), u += s)), c = n.attr("placeholder"), !u && c && (u = c), h = yt(u, n) + 4, h !== t && (t = h, n.width(h), n.triggerHandler("resize")))
                };
            n.on("keydown keyup update blur", i);
            i()
        },
        wt = function(n) {
            var t = document.createElement("div");
            return t.appendChild(n.cloneNode(!0)), t.innerHTML
        },
        bt = function(n, t) {
            t || (t = {});
            console.error("Selectize: " + n);
            t.explanation && (console.group && console.group(), console.error(t.explanation), console.group && console.groupEnd())
        },
        r = function(i, u) {
            var e, s, c, o, f = this,
                l;
            if (o = i[0], o.selectize = f, l = window.getComputedStyle && window.getComputedStyle(o, null), c = l ? l.getPropertyValue("direction") : o.currentStyle && o.currentStyle.direction, c = c || i.parents("[dir]:first").attr("dir") || "", n.extend(f, {
                    order: 0,
                    settings: u,
                    $input: i,
                    tabIndex: i.attr("tabindex") || "",
                    tagType: o.tagName.toLowerCase() === "select" ? h : ht,
                    rtl: /rtl/i.test(c),
                    eventNS: ".selectize" + ++r.count,
                    highlightedValue: null,
                    isOpen: !1,
                    isDisabled: !1,
                    isRequired: i.is("[required]"),
                    isInvalid: !1,
                    isLocked: !1,
                    isFocused: !1,
                    isInputHidden: !1,
                    isSetup: !1,
                    isShiftDown: !1,
                    isCmdDown: !1,
                    isCtrlDown: !1,
                    ignoreFocus: !1,
                    ignoreBlur: !1,
                    ignoreHover: !1,
                    hasOptions: !1,
                    currentResults: null,
                    lastValue: "",
                    caretPos: 0,
                    loading: 0,
                    loadedSearches: {},
                    $activeOption: null,
                    $activeItems: [],
                    optgroups: {},
                    options: {},
                    userOptions: {},
                    items: [],
                    renderCache: {},
                    onSearchChange: u.loadThrottle === null ? f.onSearchChange : lt(f.onSearchChange, u.loadThrottle)
                }), f.sifter = new t(this.options, {
                    diacritics: u.diacritics
                }), f.settings.options) {
                for (e = 0, s = f.settings.options.length; e < s; e++) f.registerOption(f.settings.options[e]);
                delete f.settings.options
            }
            if (f.settings.optgroups) {
                for (e = 0, s = f.settings.optgroups.length; e < s; e++) f.registerOptionGroup(f.settings.optgroups[e]);
                delete f.settings.optgroups
            }
            f.settings.mode = f.settings.mode || (f.settings.maxItems === 1 ? "single" : "multi");
            typeof f.settings.hideSelected != "boolean" && (f.settings.hideSelected = f.settings.mode === "multi");
            f.initializePlugins(f.settings.plugins);
            f.setupCallbacks();
            f.setupTemplates();
            f.setup()
        };
    return f.mixin(r), typeof i != "undefined" ? i.mixin(r) : bt("Dependency MicroPlugin is missing", {
        explanation: 'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.'
    }), n.extend(r.prototype, {
        setup: function() {
            var t = this,
                r = t.settings,
                f = t.eventNS,
                b = n(window),
                a = n(document),
                i = t.$input,
                s, c, u, o, k, d, v, y, p, l, g;
            v = t.settings.mode;
            y = i.attr("class") || "";
            s = n("<div>").addClass(r.wrapperClass).addClass(y).addClass(v);
            c = n("<div>").addClass(r.inputClass).addClass("items").appendTo(s);
            u = n('<input type="text" autocomplete="off" />').appendTo(c).attr("tabindex", i.is(":disabled") ? "-1" : t.tabIndex);
            d = n(r.dropdownParent || s);
            o = n("<div>").addClass(r.dropdownClass).addClass(v).hide().appendTo(d);
            k = n("<div>").addClass(r.dropdownContentClass).appendTo(o);
            (l = i.attr("id")) && (u.attr("id", l + "-selectized"), n("label[for='" + l + "']").attr("for", l + "-selectized"));
            t.settings.copyClassesToDropdown && o.addClass(y);
            s.css({
                width: i[0].style.width
            });
            t.plugins.names.length && (p = "plugin-" + t.plugins.names.join(" plugin-"), s.addClass(p), o.addClass(p));
            (r.maxItems === null || r.maxItems > 1) && t.tagType === h && i.attr("multiple", "multiple");
            t.settings.placeholder && u.attr("placeholder", r.placeholder);
            !t.settings.splitOn && t.settings.delimiter && (g = t.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), t.settings.splitOn = new RegExp("\\s*" + g + "+\\s*"));
            i.attr("autocorrect") && u.attr("autocorrect", i.attr("autocorrect"));
            i.attr("autocapitalize") && u.attr("autocapitalize", i.attr("autocapitalize"));
            t.$wrapper = s;
            t.$control = c;
            t.$control_input = u;
            t.$dropdown = o;
            t.$dropdown_content = k;
            o.on("mouseenter", "[data-selectable]", function() {
                return t.onOptionHover.apply(t, arguments)
            });
            o.on("mousedown click", "[data-selectable]", function() {
                return t.onOptionSelect.apply(t, arguments)
            });
            at(c, "mousedown", "*:not(input)", function() {
                return t.onItemSelect.apply(t, arguments)
            });
            pt(u);
            c.on({
                mousedown: function() {
                    return t.onMouseDown.apply(t, arguments)
                },
                click: function() {
                    return t.onClick.apply(t, arguments)
                }
            });
            u.on({
                mousedown: function(n) {
                    n.stopPropagation()
                },
                keydown: function() {
                    return t.onKeyDown.apply(t, arguments)
                },
                keyup: function() {
                    return t.onKeyUp.apply(t, arguments)
                },
                keypress: function() {
                    return t.onKeyPress.apply(t, arguments)
                },
                resize: function() {
                    t.positionDropdown.apply(t, [])
                },
                blur: function() {
                    return t.onBlur.apply(t, arguments)
                },
                focus: function() {
                    return t.ignoreBlur = !1, t.onFocus.apply(t, arguments)
                },
                paste: function() {
                    return t.onPaste.apply(t, arguments)
                }
            });
            a.on("keydown" + f, function(n) {
                t.isCmdDown = n[e ? "metaKey" : "ctrlKey"];
                t.isCtrlDown = n[e ? "altKey" : "ctrlKey"];
                t.isShiftDown = n.shiftKey
            });
            a.on("keyup" + f, function(n) {
                n.keyCode === st && (t.isCtrlDown = !1);
                n.keyCode === et && (t.isShiftDown = !1);
                n.keyCode === ot && (t.isCmdDown = !1)
            });
            a.on("mousedown" + f, function(n) {
                if (t.isFocused) {
                    if (n.target === t.$dropdown[0] || n.target.parentNode === t.$dropdown[0]) return !1;
                    t.$control.has(n.target).length || n.target === t.$control[0] || t.blur(n.target)
                }
            });
            b.on(["scroll" + f, "resize" + f].join(" "), function() {
                t.isOpen && t.positionDropdown.apply(t, arguments)
            });
            b.on("mousemove" + f, function() {
                t.ignoreHover = !1
            });
            if (this.revertSettings = {
                    $children: i.children().detach(),
                    tabindex: i.attr("tabindex")
                }, i.attr("tabindex", -1).hide().after(t.$wrapper), n.isArray(r.items) && (t.setValue(r.items), delete r.items), w) i.on("invalid" + f, function(n) {
                n.preventDefault();
                t.isInvalid = !0;
                t.refreshState()
            });
            t.updateOriginalInput();
            t.refreshItems();
            t.refreshState();
            t.updatePlaceholder();
            t.isSetup = !0;
            i.is(":disabled") && t.disable();
            t.on("change", this.onChange);
            if (i.data("selectize", t), i.addClass("selectized"), t.trigger("initialize"), r.preload === !0) t.onSearchChange("")
        },
        setupTemplates: function() {
            var t = this,
                i = t.settings.labelField,
                r = t.settings.optgroupLabelField,
                u = {
                    optgroup: function(n) {
                        return '<div class="optgroup">' + n.html + "<\/div>"
                    },
                    optgroup_header: function(n, t) {
                        return '<div class="optgroup-header">' + t(n[r]) + "<\/div>"
                    },
                    option: function(n, t) {
                        return '<div class="option">' + t(n[i]) + "<\/div>"
                    },
                    item: function(n, t) {
                        return '<div class="item">' + t(n[i]) + "<\/div>"
                    },
                    option_create: function(n, t) {
                        return '<div class="create">Add <strong>' + t(n.input) + "<\/strong>&hellip;<\/div>"
                    }
                };
            t.settings.render = n.extend({}, u, t.settings.render)
        },
        setupCallbacks: function() {
            var n, t, i = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                optgroup_add: "onOptionGroupAdd",
                optgroup_remove: "onOptionGroupRemove",
                optgroup_clear: "onOptionGroupClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType",
                load: "onLoad",
                focus: "onFocus",
                blur: "onBlur"
            };
            for (n in i)
                if (i.hasOwnProperty(n) && (t = this.settings[i[n]], t)) this.on(n, t)
        },
        onClick: function(n) {
            var t = this;
            t.isFocused || (t.focus(), n.preventDefault())
        },
        onMouseDown: function(t) {
            var i = this,
                r = t.isDefaultPrevented(),
                u = n(t.target);
            if (i.isFocused) {
                if (t.target !== i.$control_input[0]) return i.settings.mode === "single" ? i.isOpen ? i.close() : i.open() : r || i.setActiveItem(null), !1
            } else r || window.setTimeout(function() {
                i.focus()
            }, 0)
        },
        onChange: function() {
            this.$input.trigger("change")
        },
        onPaste: function(t) {
            var i = this;
            if (i.isFull() || i.isInputHidden || i.isLocked) {
                t.preventDefault();
                return
            }
            i.settings.splitOn && setTimeout(function() {
                var u = i.$control_input.val(),
                    r, t, f;
                if (u.match(i.settings.splitOn))
                    for (r = n.trim(u).split(i.settings.splitOn), t = 0, f = r.length; t < f; t++) i.createItem(r[t])
            }, 0)
        },
        onKeyPress: function(n) {
            if (this.isLocked) return n && n.preventDefault();
            var t = String.fromCharCode(n.keyCode || n.which);
            if (this.settings.create && this.settings.mode === "multi" && t === this.settings.delimiter) return this.createItem(), n.preventDefault(), !1
        },
        onKeyDown: function(n) {
            var u = n.target === this.$control_input[0],
                t = this,
                i, r;
            if (t.isLocked) {
                n.keyCode !== p && n.preventDefault();
                return
            }
            switch (n.keyCode) {
                case g:
                    if (t.isCmdDown) {
                        t.selectAll();
                        return
                    }
                    break;
                case tt:
                    t.isOpen && (n.preventDefault(), n.stopPropagation(), t.close());
                    return;
                case ft:
                    if (!n.ctrlKey || n.altKey) break;
                case ut:
                    !t.isOpen && t.hasOptions ? t.open() : t.$activeOption && (t.ignoreHover = !0, i = t.getAdjacentOption(t.$activeOption, 1), i.length && t.setActiveOption(i, !0, !0));
                    n.preventDefault();
                    return;
                case rt:
                    if (!n.ctrlKey || n.altKey) break;
                case it:
                    t.$activeOption && (t.ignoreHover = !0, r = t.getAdjacentOption(t.$activeOption, -1), r.length && t.setActiveOption(r, !0, !0));
                    n.preventDefault();
                    return;
                case nt:
                    if (t.isOpen && t.$activeOption) {
                        t.onOptionSelect({
                            currentTarget: t.$activeOption
                        });
                        n.preventDefault()
                    }
                    return;
                case l:
                    t.advanceSelection(-1, n);
                    return;
                case y:
                    t.advanceSelection(1, n);
                    return;
                case p:
                    if (t.settings.selectOnTab && t.isOpen && t.$activeOption) {
                        t.onOptionSelect({
                            currentTarget: t.$activeOption
                        });
                        t.isFull() || n.preventDefault()
                    }
                    t.settings.create && t.createItem() && n.preventDefault();
                    return;
                case o:
                case a:
                    t.deleteSelection(n);
                    return
            }
            if ((t.isFull() || t.isInputHidden) && !(e ? n.metaKey : n.ctrlKey)) {
                n.preventDefault();
                return
            }
        },
        onKeyUp: function(n) {
            var t = this,
                i;
            if (t.isLocked) return n && n.preventDefault();
            if (i = t.$control_input.val() || "", t.lastValue !== i) {
                t.lastValue = i;
                t.onSearchChange(i);
                t.refreshOptions();
                t.trigger("type", i)
            }
        },
        onSearchChange: function(n) {
            var t = this,
                i = t.settings.load;
            i && (t.loadedSearches.hasOwnProperty(n) || (t.loadedSearches[n] = !0, t.load(function(r) {
                i.apply(t, [n, r])
            })))
        },
        onFocus: function(n) {
            var t = this,
                i = t.isFocused;
            if (t.isDisabled) return t.blur(), n && n.preventDefault(), !1;
            if (!t.ignoreFocus) {
                if (t.isFocused = !0, t.settings.preload === "focus") t.onSearchChange("");
                i || t.trigger("focus");
                t.$activeItems.length || (t.showInput(), t.setActiveItem(null), t.refreshOptions(!!t.settings.openOnFocus));
                t.refreshState()
            }
        },
        onBlur: function(n, t) {
            var i = this,
                r;
            if (i.isFocused && (i.isFocused = !1, !i.ignoreFocus)) {
                if (!i.ignoreBlur && document.activeElement === i.$dropdown_content[0]) {
                    i.ignoreBlur = !0;
                    i.onFocus(n);
                    return
                }
                r = function() {
                    i.close();
                    i.setTextboxValue("");
                    i.setActiveItem(null);
                    i.setActiveOption(null);
                    i.setCaret(i.items.length);
                    i.refreshState();
                    t && t.focus && t.focus();
                    i.ignoreFocus = !1;
                    i.trigger("blur")
                };
                i.ignoreFocus = !0;
                i.settings.create && i.settings.createOnBlur ? i.createItem(null, !1, r) : r()
            }
        },
        onOptionHover: function(n) {
            this.ignoreHover || this.setActiveOption(n.currentTarget, !1)
        },
        onOptionSelect: function(t) {
            var r, u, i = this;
            t.preventDefault && (t.preventDefault(), t.stopPropagation());
            u = n(t.currentTarget);
            u.hasClass("create") ? i.createItem(null, function() {
                i.settings.closeAfterSelect && i.close()
            }) : (r = u.attr("data-value"), typeof r != "undefined" && (i.lastQuery = null, i.setTextboxValue(""), i.addItem(r), i.settings.closeAfterSelect ? i.close() : !i.settings.hideSelected && t.type && /mouse/.test(t.type) && i.setActiveOption(i.getOption(r))))
        },
        onItemSelect: function(n) {
            var t = this;
            t.isLocked || t.settings.mode === "multi" && (n.preventDefault(), t.setActiveItem(n.currentTarget, n))
        },
        load: function(n) {
            var t = this,
                i = t.$wrapper.addClass(t.settings.loadingClass);
            t.loading++;
            n.apply(t, [function(n) {
                t.loading = Math.max(t.loading - 1, 0);
                n && n.length && (t.addOption(n), t.refreshOptions(t.isFocused && !t.isInputHidden));
                t.loading || i.removeClass(t.settings.loadingClass);
                t.trigger("load", n)
            }])
        },
        setTextboxValue: function(n) {
            var t = this.$control_input,
                i = t.val() !== n;
            i && (t.val(n).triggerHandler("update"), this.lastValue = n)
        },
        getValue: function() {
            return this.tagType === h && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        },
        setValue: function(n, t) {
            var i = t ? [] : ["change"];
            k(this, i, function() {
                this.clear(t);
                this.addItems(n, t)
            })
        },
        setActiveItem: function(t, i) {
            var r = this,
                e, o, h, u, f, s, c, l;
            if (r.settings.mode !== "single") {
                if (t = n(t), !t.length) {
                    n(r.$activeItems).removeClass("active");
                    r.$activeItems = [];
                    r.isFocused && r.showInput();
                    return
                }
                if (e = i && i.type.toLowerCase(), e === "mousedown" && r.isShiftDown && r.$activeItems.length) {
                    for (l = r.$control.children(".active:last"), u = Array.prototype.indexOf.apply(r.$control[0].childNodes, [l[0]]), f = Array.prototype.indexOf.apply(r.$control[0].childNodes, [t[0]]), u > f && (c = u, u = f, f = c), o = u; o <= f; o++) s = r.$control[0].childNodes[o], r.$activeItems.indexOf(s) === -1 && (n(s).addClass("active"), r.$activeItems.push(s));
                    i.preventDefault()
                } else e === "mousedown" && r.isCtrlDown || e === "keydown" && this.isShiftDown ? t.hasClass("active") ? (h = r.$activeItems.indexOf(t[0]), r.$activeItems.splice(h, 1), t.removeClass("active")) : r.$activeItems.push(t.addClass("active")[0]) : (n(r.$activeItems).removeClass("active"), r.$activeItems = [t.addClass("active")[0]]);
                r.hideInput();
                this.isFocused || r.focus()
            }
        },
        setActiveOption: function(t, i, r) {
            var e, o, f, s, h, u = this;
            (u.$activeOption && u.$activeOption.removeClass("active"), u.$activeOption = null, t = n(t), t.length) && (u.$activeOption = t.addClass("active"), (i || !b(i)) && (e = u.$dropdown_content.height(), o = u.$activeOption.outerHeight(!0), i = u.$dropdown_content.scrollTop() || 0, f = u.$activeOption.offset().top - u.$dropdown_content.offset().top + i, s = f, h = f - e + o, f + o > e + i ? u.$dropdown_content.stop().animate({
                scrollTop: h
            }, r ? u.settings.scrollDuration : 0) : f < i && u.$dropdown_content.stop().animate({
                scrollTop: s
            }, r ? u.settings.scrollDuration : 0)))
        },
        selectAll: function() {
            var n = this;
            n.settings.mode !== "single" && (n.$activeItems = Array.prototype.slice.apply(n.$control.children(":not(input)").addClass("active")), n.$activeItems.length && (n.hideInput(), n.close()), n.focus())
        },
        hideInput: function() {
            var n = this;
            n.setTextboxValue("");
            n.$control_input.css({
                opacity: 0,
                position: "absolute",
                left: n.rtl ? 1e4 : -1e4
            });
            n.isInputHidden = !0
        },
        showInput: function() {
            this.$control_input.css({
                opacity: 1,
                position: "relative",
                left: 0
            });
            this.isInputHidden = !1
        },
        focus: function() {
            var n = this;
            n.isDisabled || (n.ignoreFocus = !0, n.$control_input[0].focus(), window.setTimeout(function() {
                n.ignoreFocus = !1;
                n.onFocus()
            }, 0))
        },
        blur: function(n) {
            this.$control_input[0].blur();
            this.onBlur(null, n)
        },
        getScoreFunction: function(n) {
            return this.sifter.getScoreFunction(n, this.getSearchOptions())
        },
        getSearchOptions: function() {
            var t = this.settings,
                n = t.sortField;
            return typeof n == "string" && (n = [{
                field: n
            }]), {
                fields: t.searchField,
                conjunction: t.searchConjunction,
                sort: n
            }
        },
        search: function(t) {
            var f, r, e, i = this,
                o = i.settings,
                s = this.getSearchOptions();
            if (o.score && (e = i.settings.score.apply(this, [t]), typeof e != "function")) throw new Error('Selectize "score" setting must be a function that returns a function');
            if (t !== i.lastQuery ? (i.lastQuery = t, r = i.sifter.search(t, n.extend(s, {
                    score: e
                })), i.currentResults = r) : r = n.extend(!0, {}, i.currentResults), o.hideSelected)
                for (f = r.items.length - 1; f >= 0; f--) i.items.indexOf(u(r.items[f].id)) !== -1 && r.items.splice(f, 1);
            return r
        },
        refreshOptions: function(t) {
            var f, v, tt, e, s, l, k, it, r, y, p, a, g, h, w, b;
            typeof t == "undefined" && (t = !0);
            var i = this,
                nt = n.trim(i.$control_input.val()),
                o = i.search(nt),
                c = i.$dropdown_content,
                rt = i.$activeOption && u(i.$activeOption.attr("data-value"));
            for (e = o.items.length, typeof i.settings.maxOptions == "number" && (e = Math.min(e, i.settings.maxOptions)), s = {}, l = [], f = 0; f < e; f++)
                for (k = i.options[o.items[f].id], it = i.render("option", k), r = k[i.settings.optgroupField] || "", y = n.isArray(r) ? r : [r], v = 0, tt = y && y.length; v < tt; v++) r = y[v], i.optgroups.hasOwnProperty(r) || (r = ""), s.hasOwnProperty(r) || (s[r] = document.createDocumentFragment(), l.push(r)), s[r].appendChild(it);
            for (this.settings.lockOptgroupOrder && l.sort(function(n, t) {
                    var r = i.optgroups[n].$order || 0,
                        u = i.optgroups[t].$order || 0;
                    return r - u
                }), p = document.createDocumentFragment(), f = 0, e = l.length; f < e; f++) r = l[f], i.optgroups.hasOwnProperty(r) && s[r].childNodes.length ? (a = document.createDocumentFragment(), a.appendChild(i.render("optgroup_header", i.optgroups[r])), a.appendChild(s[r]), p.appendChild(i.render("optgroup", n.extend({}, i.optgroups[r], {
                html: wt(a),
                dom: a
            })))) : p.appendChild(s[r]);
            if (c.html(p), i.settings.highlight && o.query.length && o.tokens.length)
                for (c.removeHighlight(), f = 0, e = o.tokens.length; f < e; f++) d(c, o.tokens[f].regex);
            if (!i.settings.hideSelected)
                for (f = 0, e = i.items.length; f < e; f++) i.getOption(i.items[f]).addClass("selected");
            g = i.canCreate(nt);
            g && (c.prepend(i.render("option_create", {
                input: nt
            })), b = n(c[0].childNodes[0]));
            i.hasOptions = o.items.length > 0 || g;
            i.hasOptions ? (o.items.length > 0 ? (w = rt && i.getOption(rt), w && w.length ? h = w : i.settings.mode === "single" && i.items.length && (h = i.getOption(i.items[0])), h && h.length || (h = b && !i.settings.addPrecedence ? i.getAdjacentOption(b, 1) : c.find("[data-selectable]:first"))) : h = b, i.setActiveOption(h), t && !i.isOpen && i.open()) : (i.setActiveOption(null), t && i.isOpen && i.close())
        },
        addOption: function(t) {
            var r, f, u, i = this;
            if (n.isArray(t)) {
                for (r = 0, f = t.length; r < f; r++) i.addOption(t[r]);
                return
            }(u = i.registerOption(t)) && (i.userOptions[u] = !0, i.lastQuery = null, i.trigger("option_add", u, t))
        },
        registerOption: function(n) {
            var t = u(n[this.settings.valueField]);
            return typeof t == "undefined" || t === null || this.options.hasOwnProperty(t) ? !1 : (n.$order = n.$order || ++this.order, this.options[t] = n, t)
        },
        registerOptionGroup: function(n) {
            var t = u(n[this.settings.optgroupValueField]);
            return t ? (n.$order = n.$order || ++this.order, this.optgroups[t] = n, t) : !1
        },
        addOptionGroup: function(n, t) {
            t[this.settings.optgroupValueField] = n;
            (n = this.registerOptionGroup(t)) && this.trigger("optgroup_add", n, t)
        },
        removeOptionGroup: function(n) {
            this.optgroups.hasOwnProperty(n) && (delete this.optgroups[n], this.renderCache = {}, this.trigger("optgroup_remove", n))
        },
        clearOptionGroups: function() {
            this.optgroups = {};
            this.renderCache = {};
            this.trigger("optgroup_clear")
        },
        updateOption: function(t, i) {
            var r = this,
                s, h, f, c, e, o, l;
            if ((t = u(t), f = u(i[r.settings.valueField]), t !== null) && r.options.hasOwnProperty(t)) {
                if (typeof f != "string") throw new Error("Value must be set in option data");
                l = r.options[t].$order;
                f !== t && (delete r.options[t], c = r.items.indexOf(t), c !== -1 && r.items.splice(c, 1, f));
                i.$order = i.$order || l;
                r.options[f] = i;
                e = r.renderCache.item;
                o = r.renderCache.option;
                e && (delete e[t], delete e[f]);
                o && (delete o[t], delete o[f]);
                r.items.indexOf(f) !== -1 && (s = r.getItem(t), h = n(r.render("item", i)), s.hasClass("active") && h.addClass("active"), s.replaceWith(h));
                r.lastQuery = null;
                r.isOpen && r.refreshOptions(!1)
            }
        },
        removeOption: function(n, t) {
            var i = this,
                r, f;
            n = u(n);
            r = i.renderCache.item;
            f = i.renderCache.option;
            r && delete r[n];
            f && delete f[n];
            delete i.userOptions[n];
            delete i.options[n];
            i.lastQuery = null;
            i.trigger("option_remove", n);
            i.removeItem(n, t)
        },
        clearOptions: function() {
            var n = this;
            n.loadedSearches = {};
            n.userOptions = {};
            n.renderCache = {};
            n.options = n.sifter.items = {};
            n.lastQuery = null;
            n.trigger("option_clear");
            n.clear()
        },
        getOption: function(n) {
            return this.getElementWithValue(n, this.$dropdown_content.find("[data-selectable]"))
        },
        getAdjacentOption: function(t, i) {
            var r = this.$dropdown.find("[data-selectable]"),
                u = r.index(t) + i;
            return u >= 0 && u < r.length ? r.eq(u) : n()
        },
        getElementWithValue: function(t, i) {
            if (t = u(t), typeof t != "undefined" && t !== null)
                for (var r = 0, f = i.length; r < f; r++)
                    if (i[r].getAttribute("data-value") === t) return n(i[r]);
            return n()
        },
        getItem: function(n) {
            return this.getElementWithValue(n, this.$control.children())
        },
        addItems: function(t, i) {
            for (var u = n.isArray(t) ? t : [t], r = 0, f = u.length; r < f; r++) this.isPending = r < f - 1, this.addItem(u[r], i)
        },
        addItem: function(t, i) {
            var r = i ? [] : ["change"];
            k(this, r, function() {
                var e, s, h, r = this,
                    f = r.settings.mode,
                    o, c;
                if (t = u(t), r.items.indexOf(t) !== -1) {
                    f === "single" && r.close();
                    return
                }
                r.options.hasOwnProperty(t) && ((f === "single" && r.clear(i), f === "multi" && r.isFull()) || (e = n(r.render("item", r.options[t])), c = r.isFull(), r.items.splice(r.caretPos, 0, t), r.insertAtCaret(e), r.isPending && (c || !r.isFull()) || r.refreshState(), r.isSetup && (h = r.$dropdown_content.find("[data-selectable]"), r.isPending || (s = r.getOption(t), o = r.getAdjacentOption(s, 1).attr("data-value"), r.refreshOptions(r.isFocused && f !== "single"), o && r.setActiveOption(r.getOption(o))), !h.length || r.isFull() ? r.close() : r.positionDropdown(), r.updatePlaceholder(), r.trigger("item_add", t, e), r.updateOriginalInput({
                    silent: i
                }))))
            })
        },
        removeItem: function(t, i) {
            var r = this,
                f, e, o;
            f = t instanceof n ? t : r.getItem(t);
            t = u(f.attr("data-value"));
            e = r.items.indexOf(t);
            e !== -1 && (f.remove(), f.hasClass("active") && (o = r.$activeItems.indexOf(f[0]), r.$activeItems.splice(o, 1)), r.items.splice(e, 1), r.lastQuery = null, !r.settings.persist && r.userOptions.hasOwnProperty(t) && r.removeOption(t, i), e < r.caretPos && r.setCaret(r.caretPos - 1), r.refreshState(), r.updatePlaceholder(), r.updateOriginalInput({
                silent: i
            }), r.positionDropdown(), r.trigger("item_remove", t, f))
        },
        createItem: function(t, i) {
            var r = this,
                s = r.caretPos,
                f;
            if (t = t || n.trim(r.$control_input.val() || ""), f = arguments[arguments.length - 1], typeof f != "function" && (f = function() {}), typeof i != "boolean" && (i = !0), !r.canCreate(t)) return f(), !1;
            r.lock();
            var h = typeof r.settings.create == "function" ? this.settings.create : function(n) {
                    var t = {};
                    return t[r.settings.labelField] = n, t[r.settings.valueField] = n, t
                },
                e = ct(function(n) {
                    if (r.unlock(), !n || typeof n != "object") return f();
                    var t = u(n[r.settings.valueField]);
                    if (typeof t != "string") return f();
                    r.setTextboxValue("");
                    r.addOption(n);
                    r.setCaret(s);
                    r.addItem(t);
                    r.refreshOptions(i && r.settings.mode !== "single");
                    f(n)
                }),
                o = h.apply(this, [t, e]);
            return typeof o != "undefined" && e(o), !0
        },
        refreshItems: function() {
            this.lastQuery = null;
            this.isSetup && this.addItem(this.items);
            this.refreshState();
            this.updateOriginalInput()
        },
        refreshState: function() {
            this.refreshValidityState();
            this.refreshClasses()
        },
        refreshValidityState: function() {
            if (!this.isRequired) return !1;
            var n = !this.items.length;
            this.isInvalid = n;
            this.$control_input.prop("required", n);
            this.$input.prop("required", !n)
        },
        refreshClasses: function() {
            var t = this,
                i = t.isFull(),
                r = t.isLocked;
            t.$wrapper.toggleClass("rtl", t.rtl);
            t.$control.toggleClass("focus", t.isFocused).toggleClass("disabled", t.isDisabled).toggleClass("required", t.isRequired).toggleClass("invalid", t.isInvalid).toggleClass("locked", r).toggleClass("full", i).toggleClass("not-full", !i).toggleClass("input-active", t.isFocused && !t.isInputHidden).toggleClass("dropdown-active", t.isOpen).toggleClass("has-options", !n.isEmptyObject(t.options)).toggleClass("has-items", t.items.length > 0);
            t.$control_input.data("grow", !i && !r)
        },
        isFull: function() {
            return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems
        },
        updateOriginalInput: function(n) {
            var i, u, r, f, t = this;
            if (n = n || {}, t.tagType === h) {
                for (r = [], i = 0, u = t.items.length; i < u; i++) f = t.options[t.items[i]][t.settings.labelField] || "", r.push('<option value="' + s(t.items[i]) + '" selected="selected">' + s(f) + "<\/option>");
                r.length || this.$input.attr("multiple") || r.push('<option value="" selected="selected"><\/option>');
                t.$input.html(r.join(""))
            } else t.$input.val(t.getValue()), t.$input.attr("value", t.$input.val());
            t.isSetup && (n.silent || t.trigger("change", t.$input.val()))
        },
        updatePlaceholder: function() {
            if (this.settings.placeholder) {
                var n = this.$control_input;
                this.items.length ? n.removeAttr("placeholder") : n.attr("placeholder", this.settings.placeholder);
                n.triggerHandler("update", {
                    force: !0
                })
            }
        },
        open: function() {
            var n = this;
            n.isLocked || n.isOpen || n.settings.mode === "multi" && n.isFull() || (n.focus(), n.isOpen = !0, n.refreshState(), n.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }), n.positionDropdown(), n.$dropdown.css({
                visibility: "visible"
            }), n.trigger("dropdown_open", n.$dropdown))
        },
        close: function() {
            var n = this,
                t = n.isOpen;
            n.settings.mode === "single" && n.items.length && (n.hideInput(), n.$control_input.blur());
            n.isOpen = !1;
            n.$dropdown.hide();
            n.setActiveOption(null);
            n.refreshState();
            t && n.trigger("dropdown_close", n.$dropdown)
        },
        positionDropdown: function() {
            var n = this.$control,
                t = this.settings.dropdownParent === "body" ? n.offset() : n.position();
            t.top += n.outerHeight(!0);
            this.$dropdown.css({
                width: n.outerWidth(),
                top: t.top,
                left: t.left
            })
        },
        clear: function(n) {
            var t = this;
            t.items.length && (t.$control.children(":not(input)").remove(), t.items = [], t.lastQuery = null, t.setCaret(0), t.setActiveItem(null), t.updatePlaceholder(), t.updateOriginalInput({
                silent: n
            }), t.refreshState(), t.showInput(), t.trigger("clear"))
        },
        insertAtCaret: function(t) {
            var i = Math.min(this.caretPos, this.items.length);
            i === 0 ? this.$control.prepend(t) : n(this.$control[0].childNodes[i]).before(t);
            this.setCaret(i + 1)
        },
        deleteSelection: function(t) {
            var f, l, u, e, r, s, h, c, a, i = this;
            if (u = t && t.keyCode === o ? -1 : 1, e = v(i.$control_input[0]), i.$activeOption && !i.settings.hideSelected && (h = i.getAdjacentOption(i.$activeOption, -1).attr("data-value")), r = [], i.$activeItems.length) {
                for (a = i.$control.children(".active:" + (u > 0 ? "last" : "first")), s = i.$control.children(":not(input)").index(a), u > 0 && s++, f = 0, l = i.$activeItems.length; f < l; f++) r.push(n(i.$activeItems[f]).attr("data-value"));
                t && (t.preventDefault(), t.stopPropagation())
            } else(i.isFocused || i.settings.mode === "single") && i.items.length && (u < 0 && e.start === 0 && e.length === 0 ? r.push(i.items[i.caretPos - 1]) : u > 0 && e.start === i.$control_input.val().length && r.push(i.items[i.caretPos]));
            if (!r.length || typeof i.settings.onDelete == "function" && i.settings.onDelete.apply(i, [r]) === !1) return !1;
            for (typeof s != "undefined" && i.setCaret(s); r.length;) i.removeItem(r.pop());
            return i.showInput(), i.positionDropdown(), i.refreshOptions(!0), h && (c = i.getOption(h), c.length && i.setActiveOption(c)), !0
        },
        advanceSelection: function(n, t) {
            var o, r, u, f, s, e, i = this;
            n !== 0 && (i.rtl && (n *= -1), o = n > 0 ? "last" : "first", r = v(i.$control_input[0]), i.isFocused && !i.isInputHidden ? (f = i.$control_input.val().length, s = n < 0 ? r.start === 0 && r.length === 0 : r.start === f, s && !f && i.advanceCaret(n, t)) : (e = i.$control.children(".active:" + o), e.length && (u = i.$control.children(":not(input)").index(e), i.setActiveItem(null), i.setCaret(n > 0 ? u + 1 : u))))
        },
        advanceCaret: function(n, t) {
            var i = this,
                u, r;
            n !== 0 && (u = n > 0 ? "next" : "prev", i.isShiftDown ? (r = i.$control_input[u](), r.length && (i.hideInput(), i.setActiveItem(r), t && t.preventDefault())) : i.setCaret(i.caretPos + n))
        },
        setCaret: function(t) {
            var i = this,
                r, e, u, f;
            if (t = i.settings.mode === "single" ? i.items.length : Math.max(0, Math.min(i.items.length, t)), !i.isPending)
                for (u = i.$control.children(":not(input)"), r = 0, e = u.length; r < e; r++) f = n(u[r]).detach(), r < t ? i.$control_input.before(f) : i.$control.append(f);
            i.caretPos = t
        },
        lock: function() {
            this.close();
            this.isLocked = !0;
            this.refreshState()
        },
        unlock: function() {
            this.isLocked = !1;
            this.refreshState()
        },
        disable: function() {
            var n = this;
            n.$input.prop("disabled", !0);
            n.$control_input.prop("disabled", !0).prop("tabindex", -1);
            n.isDisabled = !0;
            n.lock()
        },
        enable: function() {
            var n = this;
            n.$input.prop("disabled", !1);
            n.$control_input.prop("disabled", !1).prop("tabindex", n.tabIndex);
            n.isDisabled = !1;
            n.unlock()
        },
        destroy: function() {
            var t = this,
                i = t.eventNS,
                r = t.revertSettings;
            t.trigger("destroy");
            t.off();
            t.$wrapper.remove();
            t.$dropdown.remove();
            t.$input.html("").append(r.$children).removeAttr("tabindex").removeClass("selectized").attr({
                tabindex: r.tabindex
            }).show();
            t.$control_input.removeData("grow");
            t.$input.removeData("selectize");
            n(window).off(i);
            n(document).off(i);
            n(document.body).off(i);
            delete t.$input[0].selectize
        },
        render: function(t, i) {
            var f, h, e = "",
                o = !1,
                r = this;
            return ((t === "option" || t === "item") && (f = u(i[r.settings.valueField]), o = !!f), o && (b(r.renderCache[t]) || (r.renderCache[t] = {}), r.renderCache[t].hasOwnProperty(f))) ? r.renderCache[t][f] : (e = n(r.settings.render[t].apply(this, [i, s])), t === "option" || t === "option_create" ? e.attr("data-selectable", "") : t === "optgroup" && (h = i[r.settings.optgroupValueField] || "", e.attr("data-group", h)), (t === "option" || t === "item") && e.attr("data-value", f || ""), o && (r.renderCache[t][f] = e[0]), e[0])
        },
        clearCache: function(n) {
            var t = this;
            typeof n == "undefined" ? t.renderCache = {} : delete t.renderCache[n]
        },
        canCreate: function(n) {
            var i = this,
                t;
            return i.settings.create ? (t = i.settings.createFilter, n.length && (typeof t != "function" || t.apply(i, [n])) && (typeof t != "string" || new RegExp(t).test(n)) && (!(t instanceof RegExp) || t.test(n))) : !1
        }
    }), r.count = 0, r.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {}
    }, n.fn.selectize = function(t) {
        var h = n.fn.selectize.defaults,
            i = n.extend({}, h, t),
            o = i.dataAttr,
            s = i.labelField,
            e = i.valueField,
            f = i.optgroupField,
            c = i.optgroupLabelField,
            l = i.optgroupValueField,
            a = function(t, r) {
                var u, h, f, c, a = t.attr(o),
                    l;
                if (a)
                    for (r.options = JSON.parse(a), u = 0, h = r.options.length; u < h; u++) r.items.push(r.options[u][e]);
                else {
                    if (l = n.trim(t.val() || ""), !i.allowEmptyOption && !l.length) return;
                    for (f = l.split(i.delimiter), u = 0, h = f.length; u < h; u++) c = {}, c[s] = f[u], c[e] = f[u], r.options.push(c);
                    r.items = f
                }
            },
            v = function(t, r) {
                var h, p, y, a, k = r.options,
                    v = {},
                    w = function(n) {
                        var t = o && n.attr(o);
                        return typeof t == "string" && t.length ? JSON.parse(t) : null
                    },
                    b = function(t, o) {
                        var h, l, c;
                        if (t = n(t), h = u(t.val()), h || i.allowEmptyOption) {
                            if (v.hasOwnProperty(h)) {
                                o && (l = v[h][f], l ? n.isArray(l) ? l.push(o) : v[h][f] = [l, o] : v[h][f] = o);
                                return
                            }
                            c = w(t) || {};
                            c[s] = c[s] || t.text();
                            c[e] = c[e] || h;
                            c[f] = c[f] || o;
                            v[h] = c;
                            k.push(c);
                            t.is(":selected") && r.items.push(h)
                        }
                    },
                    d = function(t) {
                        var u, o, i, f, e;
                        for (t = n(t), i = t.attr("label"), i && (f = w(t) || {}, f[c] = i, f[l] = i, r.optgroups.push(f)), e = n("option", t), u = 0, o = e.length; u < o; u++) b(e[u], i)
                    };
                for (r.maxItems = t.attr("multiple") ? null : 1, a = t.children(), h = 0, p = a.length; h < p; h++) y = a[h].tagName.toLowerCase(), y === "optgroup" ? d(a[h]) : y === "option" && b(a[h])
            };
        return this.each(function() {
            var f;
            if (!this.selectize) {
                var o, u = n(this),
                    s = this.tagName.toLowerCase(),
                    e = u.attr("placeholder") || u.attr("data-placeholder");
                e || i.allowEmptyOption || (e = u.children('option[value=""]').text());
                f = {
                    placeholder: e,
                    options: [],
                    optgroups: [],
                    items: []
                };
                s === "select" ? v(u, f) : a(u, f);
                o = new r(u, n.extend(!0, {}, h, f, t))
            }
        })
    }, n.fn.selectize.defaults = r.defaults, n.fn.selectize.support = {
        validity: w
    }, r.define("drag_drop", function() {
        if (!n.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if (this.settings.mode === "multi") {
            var t = this;
            t.lock = function() {
                var n = t.lock;
                return function() {
                    var i = t.$control.data("sortable");
                    return i && i.disable(), n.apply(t, arguments)
                }
            }();
            t.unlock = function() {
                var n = t.unlock;
                return function() {
                    var i = t.$control.data("sortable");
                    return i && i.enable(), n.apply(t, arguments)
                }
            }();
            t.setup = function() {
                var i = t.setup;
                return function() {
                    i.apply(this, arguments);
                    var r = t.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: !0,
                        disabled: t.isLocked,
                        start: function(n, t) {
                            t.placeholder.css("width", t.helper.css("width"));
                            r.css({
                                overflow: "visible"
                            })
                        },
                        stop: function() {
                            r.css({
                                overflow: "hidden"
                            });
                            var u = t.$activeItems ? t.$activeItems.slice() : null,
                                i = [];
                            r.children("[data-value]").each(function() {
                                i.push(n(this).attr("data-value"))
                            });
                            t.setValue(i);
                            t.setActiveItem(u)
                        }
                    })
                }
            }()
        }
    }), r.define("dropdown_header", function(t) {
        var i = this;
        t = n.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function(n) {
                return '<div class="' + n.headerClass + '"><div class="' + n.titleRowClass + '"><span class="' + n.labelClass + '">' + n.title + '<\/span><a href="javascript:void(0)" class="' + n.closeClass + '">&times;<\/a><\/div><\/div>'
            }
        }, t);
        i.setup = function() {
            var r = i.setup;
            return function() {
                r.apply(i, arguments);
                i.$dropdown_header = n(t.html(t));
                i.$dropdown.prepend(i.$dropdown_header)
            }
        }()
    }), r.define("optgroup_columns", function(t) {
        var i = this,
            r, u;
        t = n.extend({
            equalizeWidth: !0,
            equalizeHeight: !0
        }, t);
        this.getAdjacentOption = function(t, i) {
            var r = t.closest("[data-group]").find("[data-selectable]"),
                u = r.index(t) + i;
            return u >= 0 && u < r.length ? r.eq(u) : n()
        };
        this.onKeyDown = function() {
            var n = i.onKeyDown;
            return function(t) {
                var e, u, f, r;
                if (this.isOpen && (t.keyCode === l || t.keyCode === y)) {
                    i.ignoreHover = !0;
                    r = this.$activeOption.closest("[data-group]");
                    e = r.find("[data-selectable]").index(this.$activeOption);
                    r = t.keyCode === l ? r.prev("[data-group]") : r.next("[data-group]");
                    f = r.find("[data-selectable]");
                    u = f.eq(Math.min(f.length - 1, e));
                    u.length && this.setActiveOption(u);
                    return
                }
                return n.apply(this, arguments)
            }
        }();
        r = function() {
            var n, t = r.width,
                i = document;
            return typeof t == "undefined" && (n = i.createElement("div"), n.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"><\/div><\/div>', n = n.firstChild, i.body.appendChild(n), t = r.width = n.offsetWidth - n.clientWidth, i.body.removeChild(n)), t
        };
        u = function() {
            var e, u, o, s, c, h, f;
            if (f = n("[data-group]", i.$dropdown_content), u = f.length, u && i.$dropdown_content.width()) {
                if (t.equalizeHeight) {
                    for (o = 0, e = 0; e < u; e++) o = Math.max(o, f.eq(e).height());
                    f.css({
                        height: o
                    })
                }
                t.equalizeWidth && (h = i.$dropdown_content.innerWidth() - r(), s = Math.round(h / u), f.css({
                    width: s
                }), u > 1 && (c = h - s * (u - 1), f.eq(u - 1).css({
                    width: c
                })))
            }
        };
        (t.equalizeHeight || t.equalizeWidth) && (c.after(this, "positionDropdown", u), c.after(this, "refreshOptions", u))
    }), r.define("remove_button", function(t) {
        t = n.extend({
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: !0
        }, t);
        var i = function(t, i) {
                i.className = "remove-single";
                var r = t,
                    u = '<a href="javascript:void(0)" class="' + i.className + '" tabindex="-1" title="' + s(i.title) + '">' + i.label + "<\/a>",
                    f = function(n, t) {
                        return n + t
                    };
                t.setup = function() {
                    var e = r.setup;
                    return function() {
                        if (i.append) {
                            var o = n(r.$input.context).attr("id"),
                                h = n("#" + o),
                                s = r.settings.render.item;
                            r.settings.render.item = function() {
                                return f(s.apply(t, arguments), u)
                            }
                        }
                        e.apply(t, arguments);
                        t.$control.on("click", "." + i.className, function(n) {
                            (n.preventDefault(), r.isLocked) || r.clear()
                        })
                    }
                }()
            },
            r = function(t, i) {
                var r = t,
                    u = '<a href="javascript:void(0)" class="' + i.className + '" tabindex="-1" title="' + s(i.title) + '">' + i.label + "<\/a>",
                    f = function(n, t) {
                        var i = n.search(/(<\/[^>]+>\s*)$/);
                        return n.substring(0, i) + t + n.substring(i)
                    };
                t.setup = function() {
                    var e = r.setup;
                    return function() {
                        if (i.append) {
                            var o = r.settings.render.item;
                            r.settings.render.item = function() {
                                return f(o.apply(t, arguments), u)
                            }
                        }
                        e.apply(t, arguments);
                        t.$control.on("click", "." + i.className, function(t) {
                            if (t.preventDefault(), !r.isLocked) {
                                var i = n(t.currentTarget).parent();
                                r.setActiveItem(i);
                                r.deleteSelection() && r.setCaret(r.items.length)
                            }
                        })
                    }
                }()
            };
        if (this.settings.mode === "single") {
            i(this, t);
            return
        }
        r(this, t)
    }), r.define("restore_on_backspace", function(n) {
        var t = this;
        n.text = n.text || function(n) {
            return n[this.settings.labelField]
        };
        this.onKeyDown = function() {
            var i = t.onKeyDown;
            return function(t) {
                var r, u;
                if (t.keyCode === o && this.$control_input.val() === "" && !this.$activeItems.length && (r = this.caretPos - 1, r >= 0 && r < this.items.length)) {
                    u = this.options[this.items[r]];
                    this.deleteSelection(t) && (this.setTextboxValue(n.text.apply(this, [u])), this.refreshOptions(!0));
                    t.preventDefault();
                    return
                }
                return i.apply(this, arguments)
            }
        }()
    }), r
}),
function() {
    "use strict";

    function s(n) {
        t.push(n);
        1 == t.length && e()
    }

    function h() {
        for (; t.length;) t[0](), t.shift()
    }

    function n(n) {
        this.a = i;
        this.b = void 0;
        this.f = [];
        var t = this;
        try {
            n(function(n) {
                o(t, n)
            }, function(n) {
                r(t, n)
            })
        } catch (u) {
            r(t, u)
        }
    }

    function c(t) {
        return new n(function(n, i) {
            i(t)
        })
    }

    function u(t) {
        return new n(function(n) {
            n(t)
        })
    }

    function o(n, t) {
        var u, e;
        if (n.a == i) {
            if (t == n) throw new TypeError;
            u = !1;
            try {
                if (e = t && t.then, null != t && "object" == typeof t && "function" == typeof e) {
                    e.call(t, function(t) {
                        u || o(n, t);
                        u = !0
                    }, function(t) {
                        u || r(n, t);
                        u = !0
                    });
                    return
                }
            } catch (s) {
                u || r(n, s);
                return
            }
            n.a = 0;
            n.b = t;
            f(n)
        }
    }

    function r(n, t) {
        if (n.a == i) {
            if (t == n) throw new TypeError;
            n.a = 1;
            n.b = t;
            f(n)
        }
    }

    function f(n) {
        s(function() {
            if (n.a != i)
                for (; n.f.length;) {
                    var t = n.f.shift(),
                        u = t[0],
                        f = t[1],
                        r = t[2],
                        t = t[3];
                    try {
                        0 == n.a ? "function" == typeof u ? r(u.call(void 0, n.b)) : r(n.b) : 1 == n.a && ("function" == typeof f ? r(f.call(void 0, n.b)) : t(n.b))
                    } catch (e) {
                        t(e)
                    }
                }
        })
    }

    function l(t) {
        return new n(function(n, i) {
            function o(i) {
                return function(r) {
                    f[i] = r;
                    e += 1;
                    e == t.length && n(f)
                }
            }
            var e = 0,
                f = [],
                r;
            for (0 == t.length && n(f), r = 0; r < t.length; r += 1) u(t[r]).c(o(r), i)
        })
    }

    function a(t) {
        return new n(function(n, i) {
            for (var r = 0; r < t.length; r += 1) u(t[r]).c(n, i)
        })
    }
    var e, t = [],
        i;
    e = function() {
        setTimeout(h)
    };
    i = 2;
    n.prototype.g = function(n) {
        return this.c(void 0, n)
    };
    n.prototype.c = function(t, i) {
        var r = this;
        return new n(function(n, u) {
            r.f.push([t, i, n, u]);
            f(r)
        })
    };
    window.Promise || (window.Promise = n, window.Promise.resolve = u, window.Promise.reject = c, window.Promise.race = a, window.Promise.all = l, window.Promise.prototype.then = n.prototype.c, window.Promise.prototype["catch"] = n.prototype.g)
}(),
function() {
    function h(n, t) {
        document.addEventListener ? n.addEventListener("scroll", t, !1) : n.attachEvent("scroll", t)
    }

    function l(n) {
        document.body ? n() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function t() {
            document.removeEventListener("DOMContentLoaded", t);
            n()
        }) : document.attachEvent("onreadystatechange", function i() {
            ("interactive" == document.readyState || "complete" == document.readyState) && (document.detachEvent("onreadystatechange", i), n())
        })
    }

    function r(n) {
        this.a = document.createElement("div");
        this.a.setAttribute("aria-hidden", "true");
        this.a.appendChild(document.createTextNode(n));
        this.b = document.createElement("span");
        this.c = document.createElement("span");
        this.h = document.createElement("span");
        this.f = document.createElement("span");
        this.g = -1;
        this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
        this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
        this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
        this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";
        this.b.appendChild(this.h);
        this.c.appendChild(this.f);
        this.a.appendChild(this.b);
        this.a.appendChild(this.c)
    }

    function t(n, t) {
        n.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:" + t + ";"
    }

    function c(n) {
        var t = n.a.offsetWidth,
            i = t + 100;
        return n.f.style.width = i + "px", n.c.scrollLeft = i, n.b.scrollLeft = n.b.scrollWidth + 100, n.g !== t ? (n.g = t, !0) : !1
    }

    function u(n, t) {
        function i() {
            var n = r;
            c(n) && n.a.parentNode && t(n.g)
        }
        var r = n;
        h(n.b, i);
        h(n.c, i);
        c(n)
    }

    function i(n, t) {
        var i = t || {};
        this.family = n;
        this.style = i.style || "normal";
        this.weight = i.weight || "normal";
        this.stretch = i.stretch || "normal"
    }

    function a() {
        if (null === o) {
            var n = document.createElement("div");
            try {
                n.style.font = "condensed 100px sans-serif"
            } catch (t) {}
            o = "" !== n.style.font
        }
        return o
    }

    function n(n, t) {
        return [n.style, n.weight, a() ? n.stretch : "", "100px", t].join(" ")
    }
    var f = null,
        e = null,
        o = null,
        s = null;
    i.prototype.load = function(i, o) {
        var h = this,
            c = i || "BESbswy",
            a = 0,
            v = o || 3e3,
            y = (new Date).getTime();
        return new Promise(function(i, o) {
            var p, w;
            null === s && (s = !!document.fonts);
            (p = s) && (null === e && (e = /OS X.*Version\/10\..*Safari/.test(navigator.userAgent) && /Apple/.test(navigator.vendor)), p = !e);
            p ? (p = new Promise(function(t, i) {
                function r() {
                    (new Date).getTime() - y >= v ? i() : document.fonts.load(n(h, '"' + h.family + '"'), c).then(function(n) {
                        1 <= n.length ? t() : setTimeout(r, 25)
                    }, function() {

                        i()
                    })
                }
                r()
            }), w = new Promise(function(n, t) {
                a = setTimeout(t, v)
            }), Promise.race([w, p]).then(function() {
                clearTimeout(a);
                i(h)
            }, function() {
                o(h)
            })) : l(function() {
                function d() {
                    var n;
                    (n = -1 != s && -1 != l || -1 != s && -1 != p || -1 != l && -1 != p) && ((n = s != l && s != p && l != p) || (null === f && (n = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), f = !!n && (536 > parseInt(n[1], 10) || 536 === parseInt(n[1], 10) && 11 >= parseInt(n[2], 10))), n = f && (s == g && l == g && p == g || s == nt && l == nt && p == nt || s == tt && l == tt && p == tt)), n = !n);
                    n && (e.parentNode && e.parentNode.removeChild(e), clearTimeout(a), i(h))
                }

                function it() {
                    if ((new Date).getTime() - y >= v) e.parentNode && e.parentNode.removeChild(e), o(h);
                    else {
                        var n = document.hidden;
                        (!0 === n || void 0 === n) && (s = w.a.offsetWidth, l = b.a.offsetWidth, p = k.a.offsetWidth, d());
                        a = setTimeout(it, 50)
                    }
                }
                var w = new r(c),
                    b = new r(c),
                    k = new r(c),
                    s = -1,
                    l = -1,
                    p = -1,
                    g = -1,
                    nt = -1,
                    tt = -1,
                    e = document.createElement("div");
                e.dir = "ltr";
                t(w, n(h, "sans-serif"));
                t(b, n(h, "serif"));
                t(k, n(h, "monospace"));
                e.appendChild(w.a);
                e.appendChild(b.a);
                e.appendChild(k.a);
                document.body.appendChild(e);
                g = w.a.offsetWidth;
                nt = b.a.offsetWidth;
                tt = k.a.offsetWidth;
                it();
                u(w, function(n) {
                    s = n;
                    d()
                });
                t(w, n(h, '"' + h.family + '",sans-serif'));
                u(b, function(n) {
                    l = n;
                    d()
                });
                t(b, n(h, '"' + h.family + '",serif'));
                u(k, function(n) {
                    p = n;
                    d()
                });
                t(k, n(h, '"' + h.family + '",monospace'))
            })
        })
    };
    "undefined" != typeof module ? module.exports = i : (window.FontFaceObserver = i, window.FontFaceObserver.prototype.load = i.prototype.load)
}();
"use strict";
var _bdcbusy = 0,
    _bdTmo, _stale = !0,
    _bdBusy = function(n) {
        _bdcbusy == 0 && (_bdTmo = setTimeout(function() {
            _displayBdb(!0, n)
        }, 10));
        _bdcbusy++
    },
    _bdDone = function() {
        clearTimeout(_bdTmo);
        _bdcbusy > 0 && --_bdcbusy == 0 && (_displayBdb(!1), setBodiesStale(!1))
    },
    _displayBdb = function(n, t) {
        n == !0 ? function() {
            $("#bodies-overlay").show();
            $("#bodies-overlay span")[0].innerHTML = t == undefined ? "Configuring Your Stamp Choices" : t
        }() : $("#bodies-overlay").hide()
    },
    _displayBdbMsg = function(n, t) {
        var i = $("#bodies-msg");
        i.html(n == !0 ? t : "All stamps shown are compatible with your stamp design.");
        i.css("color", n == !0 ? "#800000" : "")
    },
    bodyItemInfo = {
        user: null,
        initBodies: 1,
        initialBody: -1,
        fSelIdx: -1,
        fSelColor: ""
    },
    _stripPrice = function(n) {
        var t = undefined;
        return ((t = n.indexOf("+")) != -1 || (t = n.indexOf("(")) != -1) && (n = n.substring(0, t).trim()), n.toLowerCase()
    },
    showStampBodies = function(n) {
        n == !0 ? ($(".stampBodies").show(), $(".viewbtn").removeClass("disabled")) : ($(".stampBodies").hide(), $(".viewbtn").addClass("disabled"), _displayBdb(!1))
    },
    getAndFillMatchingBodies = function(n, t, i, r) {
        n.itemId != undefined ? GetItemMatchingBodies(n, JSON.parse(t), function(n) {
            i(updateBodyDisplay(n))
        }, r) : GetMatchingBodies(n, JSON.parse(t), function(n) {
            i(updateBodyDisplay(n))
        }, r)
    },
    cloneProductDisplay = function(n, t) {
        var r = "#" + n,
            i;
        return $(r).length == 0 ? (i = $("#product00").clone(!0).attr({
            id: n
        }), i.appendTo(t), !0) : !1
    },
    updateBodyDisplay = function(n) {
        console.log('updateBodyDisplay')
        var t = undefined,
            u = 0,
            r = undefined,
            i = n.d.bodies,
            h, e;
        bodyItemInfo.initialBody = n.d.initialBody;
        var o = $(".stampBodies .stamp-body-option.selected"),
            s = o.length == 1 ? $(o[0]).parent().data("prod-bvin") : "",
            f = !1;
        if (s != "" && bodyItemInfo.initialBody == -1)
            for (t = 0; t < i.length; t++) i[t] != null && i[t].bvin == s && (bodyItemInfo.initialBody = t, n.d.initialColor = _stripPrice($(o[0]).find(".recordoptions select").find("option:selected").text()), f = !0);
        for (t = 0; t < i.length; t++) i[t] != null && (h = function() {
            var e, o, h, c;
            if (r = "product" + singleZeroPad(u++), cloneProductDisplay(r, $("#stamp-body-container")), e = "#" + r, $(e).data("prod-idx", t), o = function() {
                    if (bodyItemInfo.fSelIdx == t) {
                        var n = $(e).find(".stamp-body-option");
                        return n.addClass("selected"), h(bodyItemInfo.fSelColor, n), !0
                    }
                    return !1
                }, h = function(n, t) {
                    var r = "",
                        i;
                    n != undefined && n.length > 0 && (i = $(e).find(".recordoptions select option"), i.filter(function() {
                        return _stripPrice($(this).text()) === n
                    }).attr("selected", !0), bodyInkChange($(e).find(".recordoptions select")[0]), r = i.parent().find("option:selected").data("ink-displaycolor"));
                    typeof cbStampBodySelected == "undefined" || f || (f = !0, t.parent().data("prod-displaycolor", r), cbStampBodySelected(t.parent()))
                }, addBodyOption($(e), i[t]) == !1) return o(), "continue";
            t != bodyItemInfo.initialBody && s != i[t].bvin ? o() == !1 && $(e).find(".stamp-body-option").hasClass("selected") && (typeof cbStampBodySelected == "undefined" || f || cbStampBodySelected(null), $(e).find(".stamp-body-option").removeClass("selected")) : (c = $(e).find(".stamp-body-option"), c.addClass("selected"), h(n.d.initialColor, c), setAddToCartState(!0))
        }(), h === "continue");
        for (bodyItemInfo.fSelIdx = -1, bodyItemInfo.fSelColor = "", e = u; e < i.length; e++) r = "#product" + singleZeroPad(e), $(r).find(".stamp-body-option").removeClass("selected"), $(r).hide();
        return $(".stampBodies .stamp-body-option.selected").length == 0 && typeof cbStampBodySelected != "undefined" && cbStampBodySelected(null), $("#bodies-wizard").hide(), u != 0 ? (showStampBodies(!0), _displayBdbMsg(!1)) : n.d.tooBig == !0 ? (showStampBodies(!0), _displayBdbMsg(!0, "This stamp impression is too big for the available stamp bodies.")) : typeof isWizard == "undefined" || isWizard() ? (showStampBodies(!1), _displayBdbMsg(!1)) : (showStampBodies(!0), $("#bodies-wizard").show(), _displayBdbMsg(!0, "")), u
    },
    setBodiesStale = function(n) {
        n == !0 && (bConfirmed = !1);
        n == !0 && $("#bodies-overlay").css("display") == "none" && _displayBdb(typeof dEmpty != "undefined" && dEmpty != !0 ? !0 : !1);
        _stale != n && (_stale = n, setAddToCartState())
    },
    setAddToCartState = function(n) {
        _stale == !1 && (n == !0 || $(".stampBodies .stamp-body-option.selected").length > 0 && (typeof dEmpty == "undefined" || dEmpty == !1)) ? $("#addToCart").removeClass("disabled") : (_stale == !1 && typeof cbStampBodySelected != "undefined" && cbStampBodySelected(null), $("#addToCart").addClass("disabled"))
    },
    bodyInkChange = function(n) {
        console.log('updateBodyDisplay')
        var r, i;
        if (n.value != undefined) {
            $(n).find('option[value="-1"]').remove();
            var t = $(n).parent().parent(),
                u = t.find(".recordoptions select"),
                f = u.find("option:selected"),
                e = t.find(".recordprice .PriceLabel");
            e.text("$" + (Number(u.data("basePrice")) + Number(n.value)).toFixed(2));
            r = t.parent().parent().parent().parent();
            i = f.data("ink-displaycolor");
            i != undefined && (r.data("prod-displaycolor", i), typeof cbInkChange != "undefined" && r.find(".stamp-body-option").hasClass("selected") && cbInkChange(i));
            t.find(".alert").is(":visible") && t.find(".recordselect .product-select").trigger("click");
            t.find(".alert").hide()
        }
    },
    addBodyOption = function(n, t) {
        var i, u, r;
        if (n.show(), n.data("prod-bvin") == t.bvin) return !1;
        n.data("prod-displaycolor", "");
        n.data("prod-bvin", t.bvin);
        n.data("prod-sizetemplate", t.sizeTemplate);
        n.data("prod-bodyinfo", t);
        n.find(".recordimage img").attr({
            src: t.imageUrl,
            alt: t.name
        });
        n.find(".recordname a").text(t.name);
        n.find(".recordprice .ListPriceLabel").text(t.price);
        n.find(".recordprice .PriceLabel").text(t.sitePrice);
        n.find(".recorddesc .DescriptionLabel").html(t.altDesc != null && t.altDesc.length != 0 ? t.altDesc : t.description);
        n.find(".recordshipping .ShipsIn").html(t.shipping);
        i = n.find(".recordoptions select");
        i.empty();
        i.on("change", function() {
            bodyInkChange(this)
        });
        if (i.data("basePrice", t.sitePrice.substring(1)), t.inkColors != undefined && t.inkColors.length > 0) {
            for (t.inkColors.length > 1 && i.append('<option value="-1">Select Ink Color<\/option>'), u = undefined, r = 0; r < t.inkColors.length; r++) u = $("<option value=" + t.inkColors[r].priceOffset + ">" + t.inkColors[r].name + "<\/option>"), u.data("ink-displaycolor", t.inkColors[r].webColors), i.append(u);
            i.parent().show();
            t.inkColors.length == 1 && (i.selectedIndex = 0)
        } else i.parent().hide();
        return !0
    },
    showIfNotTemplate = function(n) {
        typeof isWizard != "undefined" && isWizard() == !1 ? n.show() : n.hide()
    },
    isBodySelected = function() {
        return $(".stampBodies .stamp-body-option.selected").length != 0 ? !0 : !1
    },
    clearBodySelection = function() {
        $("#stamp-body-container").find(".stamp-body-option").hasClass("selected") && (typeof cbStampBodySelected != "undefined" && cbStampBodySelected(null), $("#stamp-body-container").find(".stamp-body-option").removeClass("selected"))
    },
    getSelectedBodyAttributes = function() {
        var n = $(".stampBodies .stamp-body-option.selected"),
            t;
        return n.length == 0 ? {
            productId: "",
            inkColor: ""
        } : (n = n.parent(), t = n.find(".recordoptions select"), {
            productId: n.data("prod-bvin"),
            inkColor: t.find("option:selected").text(),
            inkDColor: n.data("prod-displaycolor")
        })
    },
    addStampBodyToCart = function(n) {
        if (n == undefined) {
            if (n = $(".stampBodies .stamp-body-option.selected"), n.length == 0) return;
            n = n.parent()
        }
        var i = n.find(".recordoptions select"),
            t = $("#cartdiv input[type=number]"),
            r = i.val();
        t = t.val();
        AddToCart(bodyItemInfo.user, typeof cbGetSVG != "undefined" ? cbGetSVG() : null, t, n.data("prod-bvin"), i.find("option:selected").text(), r, bodyItemInfo.templateProductId, bodyItemInfo.itemId, bodyItemInfo.itemIdType, function(n) {
            n.d.resultMessage.length != 0 && (n.d.resultCode != 1 ? gShowMessage("Add To Cart", n.d.resultMessage) : $(location).attr("href", n.d.resultMessage))
        }, function(n, t, i) {
            gShowError("Add to cart failed(1)", n, t, i)
        })
    },
    bConfirmed = !1,
    checkBodyFit = function(n, t, i) {
        if (typeof dEmpty != "undefined" && dEmpty == !0) {
            i !== undefined && i(!1);
            return
        }
        $("#addToCart").addClass("disabled");
        _bdBusy("Please Wait...");
        var u = cbAddToCart(),
            f = !1,
            r = !1;
        u != null && GetMatchingBodies(u.areas, JSON.parse(u.allowedBodies), function(e) {
            var l = undefined,
                p, h, c, b, s, k, o, y;
            if (u.ns == !1)
                for (l = 0; l < e.d.bodies.length; l++)
                    if (e.d.bodies[l] != null && n.data("prod-bvin") == e.d.bodies[l].bvin) {
                        r = !0;
                        break
                    }
            if (r == !1 && (bConfirmed = !1), l = Number(n.data("prod-idx")), p = 1, h = null, typeof getUserSize != "undefined" && (h = getUserSize(matchingGroups[0].group, !0)), typeof getScale != "undefined" && (p = getScale()), $("#stamp-body-container").data("selBody", n), bConfirmed == !1 && e.d.bodies.length > l && e.d.bodies[l] != null)
                if (n.data("rdr-bvin", e.d.bodies[l].bvin), n.data("chk-only", t), n.data("rdr-sizetemplate", e.d.bodies[l].sizeTemplate), $("#design-too-large-modal").length > 0) {
                    if (c = !0, b = u.areas.length == 1 ? !1 : !0, u.ns == !0) c = !1;
                    else
                        for (s = u.areas, k = s.length == 1 ? !1 : !0, o = 0; o < s.length; o++) {
                            if (h = getUserSize(matchingGroups[o].group, !k), y = JSON.parse(n.data("prod-sizetemplate")), h != null) {
                                var d = y.sizes[o].r != undefined && y.sizes[o].r != 0 && h.bd == !0 ? !0 : !1,
                                    a = undefined,
                                    v = undefined,
                                    w = undefined;
                                switch (h.s) {
                                    case "circle":
                                    case "square":
                                        d ? (a = v = h.w / Math.SQRT2, w = h.w / 2) : (a = v = Math.min(h.w, h.h), w = a / 2);
                                        break;
                                    case "oval":
                                        a = h.w / 2;
                                        v = h.h / 2;
                                        w = Math.max(a, v);
                                        break;
                                    default:
                                        a = h.w;
                                        v = h.h;
                                        d && (a /= Math.SQRT2, v /= Math.SQRT2);
                                        w = Math.hypot(a, v)
                                }
                                if (h.s == "circle") {
                                    if (s[o].r * 96 > w) {
                                        c = !1;
                                        break
                                    }
                                } else if (h.s == "oval") {
                                    if (s[o].rx * 96 > a || s[o].ry * 96 > v) {
                                        c = !1;
                                        break
                                    }
                                } else if (s[o].width * 96 > a || s[o].height * 96 > v) {
                                    c = !1;
                                    break
                                }
                            }
                            if (h == null || p != 1 && _scd == !1 && c == !1)
                                if (s[o].gso == undefined) {
                                    if (y.sizes[o].r != undefined && y.sizes[o].r != 0) {
                                        if (s[o].r * 96 > y.sizes[o].r) {
                                            c = !1;
                                            break
                                        }
                                    } else if (s[o].width * 96 > y.sizes[o].width || s[o].height * 96 > y.sizes[o].height) {
                                        c = !1;
                                        break
                                    }
                                } else if (s[o].gso.r != undefined && s[o].gso.r != 0) {
                                if (s[o].r * 96 > s[o].gso.r) {
                                    c = !1;
                                    break
                                }
                            } else if (s[o].width * 96 > s[o].gso.width || s[o].height * 96 > s[o].gso.height) {
                                c = !1;
                                break
                            }
                        }
                    c == !1 ? ($("#design-too-large-modal-size").html($("#dimensions").html()), p == 1 || _scd == !0 ? $(".too-large-reduce-s").show() : $(".too-large-reduce-s").hide(), $(".too-large-expand-s").show(), $("#too-large-gotowizard").hide(), $(".too-large-nostamps-s").hide()) : r == !1 && (p == 1 || _scd == !0 ? $(".too-small-enlarge-s").show() : $(".too-small-enlarge-s").hide(), $("#design-too-small-modal-size").html($("#dimensions").html()));
                    r == !1 ? $(c == !0 ? "#design-too-small-modal" : "#design-too-large-modal").foundation("reveal", "open") : (h != null || b && typeof isWizard != "undefined" && isWizard() == !1) && (p == 1 || _scd == !0) && (n.data("cb-func", i), getUserSize(matchingGroups[0].group) == null ? c == !1 && ($("#design-fill-space-es").foundation("reveal", "open"), r = !1) : c == !1 && ($("#design-fill-space-ds").foundation("reveal", "open"), r = !1))
                } else r == !1 && ($("#cart-confirm-message").text("Your current design will fit properly on the stamp indicated above."), $("#cart-confirm-add").removeClass("disabled"), $("#cart-confirm-towizard").removeClass("disabled"), $("#cart-confirm-modal").foundation("reveal", "open"), $("#confirm-product-container").show(), addBodyOption($("#confirm-product"), e.d.bodies[l]), $("#cart-confirm-add").show(), $("#cart-confirm-wizard").show(), e.d.bodies[l].inkColors != undefined && e.d.bodies[l].inkColors.length > 0 && function() {
                    var t = _stripPrice(n.find(".recordoptions select").find("option:selected").text());
                    $("#confirm-product").find(".recordoptions select option").filter(function() {
                        return _stripPrice($(this).text()) === t
                    }).attr("selected", !0)
                }());
            else r == !1 && ($("#cart-confirm-add").addClass("disabled"), $("#confirm-product-container").hide(), e.d.tooBig == 1 ? $("#design-too-large-modal").length > 0 ? ($("#design-too-large-modal-size").html($("#dimensions").html()), $("#too-large-reduce").parent().show(), $(".too-large-expand-s").hide(), $("#too-large-gotowizard").hide(), $(".too-large-nostamps-s").show(), $("#design-too-large-modal").foundation("reveal", "open")) : ($("#cart-confirm-message").text("We cannot make a stamp this size. Please make the stamp smaller"), $("#cart-confirm-towizard").addClass("disabled"), $("#cart-confirm-modal").foundation("reveal", "open")) : $("#design-too-large-modal").length > 0 ? ($("#design-too-large-modal-size").html($("#dimensions").html()), $("#too-large-reduce").parent().show(), $(".too-large-expand-s").hide(), showIfNotTemplate($("#too-large-gotowizard")), $(".too-large-nostamps-s").hide(), $("#design-too-large-modal").foundation("reveal", "open")) : ($("#cart-confirm-message").text("There is no stamp in this style large enough for your design. Please use the wizard to find an appropriate stamp."), $("#cart-confirm-modal").foundation("reveal", "open")));
            if (r == !0) {
                f = !0;
                _bdDone();
                t == !1 && addStampBodyToCart(n);
                i !== undefined && i(f);
                return
            }
            t || $("#addToCart").removeClass("disabled");
            _bdDone();
            i !== undefined && i(f)
        }, function(n, r, u) {
            gShowError(t == !0 ? "Select Stamp failed(2)" : "Add to cart failed(2)", n, r, u);
            t == !1 && $("#addToCart").removeClass("disabled");
            _bdDone();
            i !== undefined && i(!1)
        })
    },
    _scd = !1,
    setScd = function() {
        _scd = !0
    },
    setfSel = function(n) {
        if (n == null) bodyItemInfo.fSelColor = "", bodyItemInfo.fSelIdx = -1;
        else if (n.length == 1) {
            bodyItemInfo.fSelIdx = n.data("prod-idx");
            var t = n.find(".recordoptions select");
            bodyItemInfo.fSelColor = _stripPrice(t.find("option:selected").text())
        }
    },
    setFixedSize = function(n) {
        var t = cbAddToCart();
        cbSetFixed(t, n);
        bConfirmed = !0
    },
    productRedirect = function() {
        var n = $("#stamp-body-container").data("selBody").data("rdr-bvin");
        GetProductURL(n, function(n) {
            var t, i;
            if (n.d.resultCode == 1) {
                t = "";
                switch (bodyItemInfo.itemIdType) {
                    case 1:
                        t = "LineItemId";
                        break;
                    case 2:
                        t = "ClonedItemId";
                        break;
                    case 3:
                        t = "SavedDesignId";
                        break;
                    default:
                        typeof cbItemSpecial != "undefined" && (t = cbItemSpecial(bodyItemInfo.itemIdType))
                }
                t = t != "" ? n.d.resultMessage + "?" + t + "=" + bodyItemInfo.itemId : n.d.resultMessage;
                i = {
                    tmpl: cbGetSVG(),
                    fSelIdx: bodyItemInfo.fSelIdx,
                    fSelColor: bodyItemInfo.fSelColor,
                    fSelBvin: $("#too-large-reduce").parent().is(":visible") ? bodyItemInfo.fSelBvin : ""
                };
                $("#tmpl-redirect").val(encodeURIComponent(JSON.stringify(i)));
                setfSel(null);
                document.forms[0].action = t;
                document.forms[0].submit()
            }
        }, function(n, t, i) {
            gShowError("Redirect failed", n, t, i)
        })
    },
    checkReduce = function(n) {
        var t = cbDoScale(!0),
            i, r;
        if (_scd = !1, i = t.img == !0 && t.isc == 0 ? "Please check the image in your stamp impression to make sure it is still legible." : "", t.tsc == 0 && t.isc == 0) return t.img == !0 && alert(i), !0;
        if (t.ms != 0) r = t.tsc != 0 && t.isc != 0 ? "text and image" : t.tsc != 0 ? "text" : "image", alert("This stamp impression cannot be reduced beyond the current amount and maintain your " + r + " quality" + (i == "" ? "" : "\n") + i);
        else if (n) alert("This stamp impression already fits your chosen shape and size, please edit or crop");
        else return !0;
        return !1
    },
    checkEnlarge = function() {
        var n = cbDoScale(!0),
            t, i;
        if (_scd = !1, t = n.img == !0 && n.isc == 0 ? "Please check the image in your stamp impression to make sure it is still legible." : "", n.tsc == 0 && n.isc == 0) return n.img == !0 && alert(t), !0;
        if (n.rs != 0) i = n.tsc != 0 && n.isc != 0 ? "text and image" : n.tsc != 0 ? "text" : "image", alert("This stamp impression cannot be enlarged beyond the current amount and maintain your " + i + " quality" + (t == "" ? "" : "\n") + t);
        else if (exp) alert("This stamp impression already fits your chosen shape and size, please edit or reduce to fit your stamp");
        else return !0;
        return !1
    };
$(document).ready(function() {
    $("#fill-add-to-cart-img").attr("src", $("#addToCart img").attr("src"));
    $("#fill-add-to-cart-img").attr("alt", $("#addToCart img").attr("alt"));
    $("#addToCart").on("click", function() {
        if (!$(this).hasClass("disabled")) {
            var n = $(".stampBodies .stamp-body-option.selected");
            if (n.length == 0) {
                setAddToCartState();
                return
            }
            n = n.parent();
            typeof cbAddToCart != "undefined" ? checkBodyFit(n, !1) : addStampBodyToCart(n)
        }
    });
    $("#cart-confirm-add").on("click", function() {
        if (!$(this).hasClass("disabled")) {
            var n = $("#confirm-product");
            n.length != 0 && addStampBodyToCart(n)
        }
    });
    $(".gotowizard").on("click", function() {
        if (!$(this).hasClass("disabled")) {
            var n = cbAddToCart();
            GetWizardURL(n.allowedBodies, function(n) {
                if (n.d.resultCode == 1) {
                    typeof getScale != "undefined" && getScale() != 1 && setFixedSize(5);
                    var t = {
                        tmpl: cbGetSVG(),
                        fSelIdx: -1
                    };
                    $("#tmpl-redirect").val(encodeURIComponent(JSON.stringify(t)));
                    document.forms[0].action = n.d.resultMessage;
                    document.forms[0].submit()
                }
            }, function(n, t, i) {
                gShowError("Redirect failed", n, t, i)
            })
        }
    });
    $(".product-select").on("click", function() {
        if ($(this).hasClass("disabled") != !0) {
            if ($("#stamp-body-container .alert").hide(), $(this).parent().parent().find(".recordoptions option:selected").val() == "-1") {
                $(this).parent().parent().find(".alert").show();
                return
            }
            bConfirmed = !1;
            var n = $($(this).closest(".stamp-body-option")),
                t = function() {
                    $(".stampBodies .stamp-body-option").removeClass("selected");
                    n.addClass("selected");
                    typeof cbStampBodySelected != "undefined" && (cbStampBodySelected(n.parent()), bConfirmed = !0);
                    setAddToCartState()
                };
            typeof cbAddToCart != "undefined" ? checkBodyFit(n.parent(), !0, function(n) {
                n == !0 && t()
            }) : t()
        }
    });
    $("#too-large-reduce").on("click", function() {
        typeof cbDoScale != "undefined" && (checkReduce(!0) == !0 ? (setFixedSize(1), $("#design-too-large-modal").foundation("reveal", "close"), $(".main")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        })) : $(".too-large-reduce-s").hide())
    });
    $("#too-large-edit").on("click", function() {
        $(".main")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    });
    $("#too-large-expand").on("click", function() {
        $(this).hasClass("disabled") || (setFixedSize(4), typeof isWizard != "undefined" && isWizard() || (setfSel($("#stamp-body-container").data("selBody")), productRedirect()), $("#design-too-large-modal").foundation("reveal", "close"), $(".main")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        }))
    });
    $("#too-small-enlarge").on("click", function() {
        typeof cbDoScale != "undefined" && (checkEnlarge(!0) == !0 ? (setFixedSize(2), $("#design-too-small-modal").foundation("reveal", "close"), $(".main")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        }), _scd = !1) : $(".too-small-enlarge-s").hide())
    });
    $("#too-small-edit").on("click", function() {
        $(".main")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    });
    $("#too-small-crop").on("click", function() {
        $(this).hasClass("disabled") || (setFixedSize(3), typeof isWizard() != "undefined" && isWizard() || (setfSel($("#stamp-body-container").data("selBody")), productRedirect()), $("#design-too-small-modal").foundation("reveal", "close"), $(".main")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        }))
    });
    $(".dfs-yes").on("click", function() {
        var i, n, t;
        typeof cbDoScale != "undefined" && (i = $("#stamp-body-container").data("selBody"), n = i.data("cb-func"), n != undefined && n(!0), t = $(this).closest("[id^=design-fill]"), t[0].id.endsWith("s") ? checkReduce(!1) == !0 && setFixedSize(1) : checkEnlarge(!1) == !0 && setFixedSize(2), $("#" + t[0].id).foundation("reveal", "close"), $(".main")[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        }))
    });
    $(".dfs-no").on("click", function() {
        var n, t;
        if (!$(this).hasClass("disabled")) {
            if (n = $("#stamp-body-container").data("selBody"), n.data("chk-only") == !0) {
                $(this).closest("[id^=design-fill]").foundation("reveal", "close");
                $(".main")[0].scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                t = n.data("cb-func");
                t != undefined && t(!0);
                return
            }
            addStampBodyToCart();
            $("#design-fill-space").foundation("reveal", "close")
        }
    });
    $(".MoreDetailsLink").on("click", function() {
        var n = $(this).parent().parent().parent().parent().parent().data("prod-bodyinfo");
        $("#qv-ldesc").html(n.longDescription);
        $("#qv-name").text(n.name);
        $("#qv-shipsin").text(n.shipping);
        $("#qv-mpn").text(n.mpn);
        n.mpn.length == 0 ? $("#qv-mpn").parent().hide() : $("#qv-mpn").parent().show();
        $("#qv-upc").text(n.upc);
        n.upc.length == 0 ? $("#qv-upc").parent().hide() : $("#qv-upc").parent().show();
        n.madeInUsa == !0 ? $("#qv-miu").show() : $("#qv-miu").hide();
        n.co2Neutral == !0 ? $("#qv-co2n").show() : $("#qv-co2n").hide();
        $("#qv-image").attr({
            src: n.imageUrl,
            alt: n.name
        });
        $("#quick-view-modal").foundation("reveal", "open")
    })
});
afonts = [];
$(document).ready(function() {
    for (var t = [], i = 0, n = 0; n < brm.length; n++) brm[n].fn != null && (t[i++] = {
        f: brm[n].ff,
        d: brm[n].fn
    });
    afonts = t.reduce(function(n, t) {
        return n.findIndex(function(n) {
            return n.f == t.f && n.d == t.d
        }) < 0 && n.push(t), n
    }, [])
});
dapiRoot = "";
var s, shape, fixedShape, textGroups = [],
    textGroupLines = [],
    graphicGroups = [],
    graphicGroupElements = [],
    htmlGraphics = [],
    fixedGroups = [],
    fixedGroupElements = [],
    bodyGroups = [],
    matchingGroups = [],
    subGroups = [],
    textGroupEditors = [],
    shapeGroup, impressionGroup, syncGroups = [],
    layoutGroups = [],
    impressionBorder, isAutosize, allowAutoSize, isFixedStamp, fixedWidth, fixedHeight, shapeStrokeWidth, shapeStrokeDasharray, shapeStrokeDashoffset, shapeStrokeLinecap, myCanvas, loginReturn = 0,
    inLoad = 0,
    internalMargin = 4.8,
    borderMargin = 2.88,
    externalMargin = 0,
    lastClipDiv, getTargetId = function(n) {
        return parseInt($(n).attr("data-target-id"))
    },
    showImageTab = function() {
        return ENABLE_IMAGE == 1 ? !0 : !1
    },
    showBorderTab = function() {
        return ENABLE_BORDER != "" ? !0 : !1
    },
    showUserDimensions = function() {
        return showBorderTab()
    },
    hasUserDimensions = function() {
        return rsuAttr(subGroups[0], "rsu:usize") != null ? !0 : !1
    },
    isWizard = function() {
        return si.templateProductId == null && si.initialBody != null ? !1 : !0
    },
    isRoundProduct = function() {
        var n = getGroupSizeOverride("s00");
        return n == undefined || n.r == undefined ? !1 : !0
    },
    changeList = null,
    cueTimeout, impressionBusy = 0,
    _impressionBusy = function() {
        impressionBusy == 0 && (cueTimeout = setTimeout(function() {
            _displayImpressionBusy(!0)
        }, 500));
        impressionBusy++
    },
    _impressionDone = function() {
        clearTimeout(cueTimeout);
        impressionBusy > 0 && --impressionBusy == 0 && setTimeout(function() {
            impressionChanged(undefined, undefined, undefined, undefined, !0);
            _displayImpressionBusy(!1)
        }, 0)
    },
    _displayImpressionBusy = function(n) {
        var i, t, r;
        if (hasGroupSizeOverrides() && !(hasUserDimensions() || isFixedStamp || isWizard()) || bodyGroups.length > 0) n == !0 ? shape.attr({
            fill: "#FF0000",
            "fill-opacity": .34
        }) : shape.attr({
            fill: FILL,
            "fill-opacity": 1
        });
        else
            for (i = 0; i < subGroups.length; i++) t = undefined, bodyGroups.length > 0 && !hasGroupSizeOverrides() ? t = impressionGroup : (r = "sbr" + subGroups[i].node.id, t = $("#" + r)), n == !0 ? t.attr({
                fill: "#FF0000",
                "fill-opacity": .34
            }) : t.attr({
                fill: FILL,
                "fill-opacity": 1
            })
    },
    _grcbusy = 0,
    _grTmo, _grBusy = function() {
        _grcbusy == 0 && (_grTmo = setTimeout(function() {
            _displayGrb(!0)
        }, 500));
        _grcbusy++
    },
    _grDone = function() {
        clearTimeout(_grTmo);
        _grcbusy > 0 && --_grcbusy == 0 && _displayGrb(!1)
    },
    _displayGrb = function(n) {
        n == !0 ? $("#artwork-overlay").show() : $("#artwork-overlay").hide()
    },
    getTextLineContext = function(n) {
        var t = $(n).attr("id");
        return t == undefined ? undefined : {
            selector: "#" + t,
            group: parseInt(t.substr(4, 2)),
            line: parseInt(t.substr(7, 2))
        }
    },
    getSVGTextLineContext = function(n) {
        var t = n.node.id;
        return t == undefined ? undefined : {
            selector: "#" + t,
            group: parseInt(t.substr(7, 2)),
            line: parseInt(t.substr(10, 2))
        }
    },
    _getTextLineContext = function() {},
    getScale = function() {
        var n = rsuAttr(impressionGroup, "rsu:scale");
        return n == undefined ? 1 : Number(n)
    },
    calcFontSize = function(n) {
        return n *= 96, n / 72
    },
    clearScale = function() {
        return rsuRemoveAttr(subGroups[0], "rsu:unsize"), $("#scalereset-btn").hide(), rsuAttr(impressionGroup, "rsu:scale", 1), !0
    },
    resetScale = function(n) {
        var t = getUndoSize(subGroups[0]);
        t != null && hasUserDimensions() && setUserDimensions(t.w, t.h, hasUserDimensions());
        scaleUIDisplay(1 / getScale());
        reScale(1, n);
        clearScale()
    },
    reScale = function(n, t, i) {
        for (var u = {
                ms: n,
                img: 0,
                tsc: 0,
                isc: 0
            }, e = undefined, r = undefined, h = undefined, c = [textGroupLines.length], o = undefined, l = [textGroupLines.length], f, a, r = 0; r < textGroupLines.length; r++)
            for (c[r] = [], l[r] = getValidTextLinesInGroup(r), e = 0; e < l[r].length; e++) {
                h = l[r][e];
                var v = Math.floor(getMinFontSize(h) * 72 / 96),
                    s = Number($(textGroupEditors[r][getSVGTextLineContext(h).line] + " select.text-size").val()),
                    y = Number($(textGroupEditors[r][getSVGTextLineContext(h).line]).data("fsize"));
                y != undefined && Math.floor(y) == s && (s = y);
                s *= 96;
                s /= 72;
                s = (s * n).toFixed(2);
                v *= 96;
                v /= 72;
                i != !0 && v >= s && (o = v / (s / n), o > u.ms && (u.ms = o, u.tsc = -1));
                c[r][e] = s
            }
        if (graphicGroupElements != undefined && graphicGroupElements.length > 0 && graphicGroupElements[0].length > 0 && (u.img = !0, f = updateArtImpressionSize({
                s: n,
                p: 1
            }, !0), f.p = Number(f.p), f.p < 4 ? (o = 4 / (f.p / n), o > u.ms && (u.ms = o, u.isc = -1)) : f.p > 200 ? (o = 200 / (f.p / n), o < u.ms && (u.ms = o, u.isc = 1)) : chkmaxhw(f.w, f.h) && (a = function(t, i) {
                t > i && (o = t / (i / n), o < u.ms && (u.isc = 1, u.ms = o))
            }, a(f.w, 6), a(f.h, 6), a(f.w, 3.75), a(f.h, 3.75))), u.ms == n) {
            for (r = 0; r < textGroupLines.length; r++)
                for (e = 0; e < l[r].length; e++) c[r][e] != undefined && c[r][e] != 0 && (h = l[r][e], h.attr("fontSize", c[r][e]), h.data("dirty", !0));
            setGroupGraphicSize(0, n)
        }
        return rsuAttr(impressionGroup, "rsu:scale", n), n == 1 ? $("#scalereset-btn").hide() : $("#scalereset-btn").show(), t != !0 && n == u.ms && checkShapeAutoSize(!1, 100), u
    },
    formatElementId = function(n, t) {
        return singleZeroPad(n) + "-" + singleZeroPad(t)
    },
    setAllDirty = function(n) {
        for (var i = textGroupLines[n], r = i.length, t = 0; t < r; t++) i[t].data("dirty", !0)
    };
Math.hypot = Math.hypot || function() {
    for (var t = 0, i = arguments.length, n = 0; n < i; n++) {
        if (arguments[n] === Infinity || arguments[n] === -Infinity) return Infinity;
        t += arguments[n] * arguments[n]
    }
    return Math.sqrt(t)
};
var getArtworkPositionSettings = function() {
        var n = {},
            t = $("#position-controls .active");
        if (t.length == 0) n.position = "top";
        else switch (t[0].classList[0]) {
            case "align-image-top":
                n.position = "top";
                break;
            case "align-image-bottom":
                n.position = "bottom";
                break;
            case "align-image-left":
                n.position = "left";
                break;
            case "align-image-right":
                n.position = "right";
                break;
            case "align-image-center":
                n.position = "center"
        }
        return n.percentChoice = getImgPercent(), n
    },
    setImgPercent = function(n, t) {
        t != !0 && $("#image-size-percent").val(n);
        $("#image-size-percent").data("calcval", n)
    },
    getImgPercent = function() {
        return Number($("#image-size-percent").data("calcval"))
    },
    setGroupGraphicSize = function(n, t) {
        var f;
        if ($("#selected-artwork-image").attr("src") != "" && graphicGroupElements[n].length > 0) {
            t = t == undefined ? 1 : t;
            var i = getArtworkPositionSettings(n),
                r = 0,
                u = 0,
                e = 0,
                o = 0,
                s = 0;
            i.sizeChoice !== undefined ? (f = Number(rsuAttr(graphicGroupElements[n][0], "rsu:aspect")), f < 1 ? (r = i.sizeChoice * f, u = i.sizeChoice) : (u = i.sizeChoice / f, r = i.sizeChoice)) : (r = Number(rsuAttr(graphicGroupElements[n][0], "rsu:nwidth")) * t * i.percentChoice / 100, u = Number(rsuAttr(graphicGroupElements[n][0], "rsu:nheight")) * t * i.percentChoice / 100, e = Number(rsuAttr(graphicGroupElements[n][0], "rsu:nr")) * t * i.percentChoice / 100, o = Number(rsuAttr(graphicGroupElements[n][0], "rsu:nrx")) * t * i.percentChoice / 100, s = Number(rsuAttr(graphicGroupElements[n][0], "rsu:nry")) * t * i.percentChoice / 100);
            graphicGroupElements[n][0].attr({
                width: r,
                height: u,
                x: 0,
                y: 0
            });
            rsuAttr(graphicGroups[n], {
                "rsu:width": r,
                "rsu:height": u,
                "rsu:r": e,
                "rsu:rx": o,
                "rsu:ry": s,
                "rsu:align": i.position
            });
            overrideGroupSize(graphicGroups[n])
        }
    },
    getShapeSizes = function(n) {
        n = n == undefined ? shape : n;
        var i = rsuAttr(n, "rsu:shape"),
            t = {};
        switch (i) {
            case "oval":
                t.rx = Number(n.attr("rx"));
                t.ry = Number(n.attr("ry"));
                t.r = Math.max(t.rx, t.ry);
                t.width = t.rx * 2;
                t.height = t.ry * 2;
                break;
            case "circle":
                t.r = Number(n.attr("r"));
                t.rx = t.r;
                t.ry = t.r;
                t.width = t.r * 2;
                t.height = t.r * 2;
                break;
            default:
                t.width = Number(n.attr("width"));
                t.height = Number(n.attr("height"));
                t.rx = t.width * Math.SQRT2;
                t.ry = t.height * Math.SQRT2;
                t.r = Math.max(t.rx, t.ry)
        }
        return t
    },
    getShapeWidth = function(n) {
        n = n == undefined ? shape : n;
        var i = rsuAttr(n, "rsu:shape"),
            t = undefined;
        switch (i) {
            case "oval":
                t = Number(n.attr("rx") * 2);
                break;
            case "circle":
                t = Number(n.attr("r") * 2);
                break;
            default:
                t = Number(n.attr("width"))
        }
        return t
    },
    getShapeHeight = function(n) {
        n = n == undefined ? shape : n;
        var i = rsuAttr(n, "rsu:shape"),
            t = undefined;
        switch (i) {
            case "oval":
                t = Number(n.attr("ry") * 2);
                break;
            case "circle":
                t = Number(n.attr("r") * 2);
                break;
            default:
                t = Number(n.attr("height"))
        }
        return t
    },
    getFontFamily = function(n) {
        var t = n.attr("fontFamily");
        return t != null && t.length > 1 && t[0] != "'" && t[0] != '"' && (t = "'" + t + "'"), t
    },
    getLineMetrics = function(n) {
        for (var c, i, e = getFontFamily(n), o = n.attr("font-size"), s = Number(o.slice(0, -2)), l = e.replace(/['"]/g, ""), h = n.attr("fontWeight"), a = n.attr("fontStyle"), v = h == "700" || h == "bold" ? !0 : !1, y = a == "italic" ? !0 : !1, t = 0; t < brm.length; t++)
            if (brm[t].ff == l && brm[t].a != 0 && brm[t].bd === v && brm[t].it === y) return {
                ascent: brm[t].a * s,
                descent: brm[t].d * s,
                min: brm[t].m
            };
        var u = $("<span>Qfjg3y|Ç<\/span>").css({
                fontFamily: e,
                "font-size": o,
                "font-weight": n.attr("fontWeight"),
                "font-style": n.attr("fontStyle")
            }),
            r = $('<div style="display: inline-block; width: 1px; height: 0px;"><\/div>'),
            f = $("<div><\/div>");
        f.append(u, r);
        c = $("body");
        c.append(f);
        i = {};
        try {
            r.css({
                verticalAlign: "baseline"
            });
            i.ascent = r.offset().top - u.offset().top;
            r.css({
                verticalAlign: "bottom"
            });
            i.height = r.offset().top - u.offset().top;
            i.descent = i.height - i.ascent
        } finally {
            f.remove()
        }
        return i
    },
    showFloatingDimensions = function(n, t) {

        if (n == 0 && t == 0) {
            $("#flrls").hide();
            return
        }
        //n=12;
        let convertToCm = 2.54;//0.3937008;
        var txtN = n*convertToCm;
        var txtT = t*convertToCm;
        //console.log(n);

        $("#flrls").show();
        $("#flrls-htext").text(txtN.toFixed(1) + ' cm.');
        $("#flrls-vtext").text(txtT.toFixed(1) + ' cm.');
        widthCM = txtN.toFixed(1);
        heightCM = txtT.toFixed(1);

        n = Number(n);
        t = Number(t);
        t < .82 ? $("#flrls-vlines").hide() : $("#flrls-vlines").show();
        n < .82 ? $("#flrls-hlines").hide() : $("#flrls-hlines").show();

        //n/=convertToCm;


        $("#flrls-horz").attr("transform", "translate(" + SVG_CENTER_X + "," + (Number(t) * 48 + Number(SVG_CENTER_Y)) + ")");
        $("#flrls-vert").attr("transform", "translate(" + (Number(n) * 48 + Number(SVG_CENTER_X)) + "," + SVG_CENTER_Y + ")")
    },
    updateDimensionsDisplay = function() {
        var n = undefined,
            t = undefined,
            i, r, u;
        if (isFixedStamp != !0 || hasGroupSizeOverrides()) {
            i = undefined;
            r = undefined;
            bodyGroups.length > 0 && !hasGroupSizeOverrides() ? (i = shape, r = rsuAttr(shape, "rsu:shape")) : (u = "sbr" + subGroups[0].node.id, i = $("#" + u), r = rsuAttr(subGroups[0], "rsu:shape"));
            switch (r) {
                case "circle":
                    n = Number(i.attr("r") * 2);
                    t = Number(i.attr("r") * 2);
                    break;
                case "oval":
                    n = Number(i.attr("rx") * 2);
                    t = Number(i.attr("ry") * 2);
                    break;
                default:
                    n = Number(i.attr("width"));
                    t = Number(i.attr("height"))
            }
        } else n = fixedWidth, t = fixedHeight;
        n /= 96;
        t /= 96;
        n = Math.floor(n * 100) / 100;
        t = Math.floor(t * 100) / 100;
        isNaN(n) && (n = 0);
        isNaN(t) && (t = 0);

        //n=12;
        let convertToCm = 2.54;//0.3937008;
        var txtN = n*convertToCm;
        var txtT = t*convertToCm;
        //console.log(n);


        $("#stamp_width").val(txtN.toFixed(1));
        $("#stamp_height").val(txtT.toFixed(1));
        $("#dimensions").html(txtN.toFixed(1) + 'cm.' + txtT.toFixed(1) + 'cm.');

        //console.log(n);
        showFloatingDimensions(n, t)
    },
    getElementFromShortID = function(n) {
        var t = Number(n.slice(-2));
        switch (n.charAt(0)) {
            case "t":
                return textGroups[t];
            case "f":
                return fixedGroups[t];
            case "b":
                return bodyGroups[t];
            case "g":
                return graphicGroups[t];
            case "s":
                return subGroups[t]
        }
        return null
    },
    getShortIdFromGroupId = function(n) {
        var t = n.slice(-2);
        switch (n.substr(0, 6)) {
            case "svgbod":
                return "b" + t;
            case "svgtex":
                return "t" + t;
            case "svgfix":
                return "f" + t;
            case "svggra":
                return "g" + t;
            case "svgsub":
                return "s" + t
        }
    },
    getParentSubGroup = function(n) {
        for (var r, u, f, i, t = 0; t < subGroups.length; t++)
            if (r = rsuAttr(subGroups[t], "rsu:layoutorder"), r != null)
                for (u = r.split(","), f = undefined, i = 0; i < u.length; i++)
                    if (n == u[i]) return subGroups[t];
        return impressionGroup
    },
    getListOfLayoutElements = function(n, t) {
        var u = rsuAttr(n, t),
            f = [],
            r, e, i;
        if (u != null)
            for (r = u.split(","), e = undefined, i = 0; i < r.length; i++) f[i] = getElementFromShortID(r[i]);
        return f
    },
    getListOfLayoutElementsAndIDs = function(n, t) {
        var f = rsuAttr(n, t),
            e = [],
            r, o, i, u;
        if (f != null)
            for (r = f.split(","), o = undefined, i = 0; i < r.length; i++) u = r[i].split(":"), e[i] = {
                group: getElementFromShortID(u[0]),
                id: Number(u[1])
            };
        return e
    },
    setShapeStrokeWidth = function() {
        var n = $("input[name=stamp-border]:checked").val();
        n === "no" ? shapeStrokeWidth = 0 : (shapeStrokeWidth = Number($("#dropdown-border-weight option:selected").val()), isNaN(shapeStrokeWidth) && (shapeStrokeWidth = 0))
    },
    setBorderDropdown = function(n) {
        (n < 1.66666 || isNaN(n)) && (n = 1.66666);
        $("#dropdown-border-weight").val(n)
    },
    setAutosize = function(n, t) {
        isAutosize = allowAutoSize == !0 ? n : !1;
        isAutosize ? ($("#autosize-toggle").html("Disable"), $("#autosize-label").html("(Autosize: On)")) : ($("#autosize-toggle").html("Apply"), $("#autosize-label").html("(Autosize Off)"));
        t != !0 && impressionChanged()
    },
    setUserDimensions = function(n, t, i, r, u, f) {
        setAutosize(i == !0 || isFixedStamp == !0 ? !1 : !0, !0);
        isAutosize == !0 && (resetScale(!0), $("#impression-scale").val(1));
        subGroups[0] != null && (i == !0 ? rsuAttr(subGroups[0], "rsu:usize", n + "," + t) : rsuRemoveAttr(subGroups[0], "rsu:usize"));
        impressionBorder != undefined && rsuAttr(impressionBorder, "rsu:enclose", i == !0 ? "2" : "");
        r != !0 && (i == !0 && clearBodySelection(), setDisplayShapes($("#shape-dropdown option:selected").val()), checkShapeAutoSize(!0, 0, !1, f == !0 || isWizard() ? u == !0 ? 2 : 1 : 0))
    },
    getShapeX = function() {
        var u = rsuAttr(shape, "rsu:shape"),
            n = undefined,
            i = undefined,
            r = undefined,
            t = undefined;
        switch (u) {
            case "oval":
                n = Number(shape.attr("cx"));
                r = Number(shape.attr("rx"));
                t = n - r;
                break;
            case "circle":
                n = Number(shape.attr("cx"));
                i = Number(shape.attr("r"));
                t = n - i;
                break;
            default:
                t = Number(shape.attr("x"))
        }
        return t
    },
    changeLineFont = function(n, t, i) {
        var u = function() {
                if (t != undefined) {
                    i == null && (i = getSVGTextLineContext(n));
                    var u = $(textGroupEditors[i.group][i.line]),
                        f = u.find("select.text-size")[0].selectize,
                        r = $(textGroupEditors[i.group][i.line] + " select.text-size").val();
                    configureFontSizes(i.group, i.line, f, r, r == "" ? !0 : !1)
                }
            },
            r = function() {
                return changeList.length > 0 ? changeList.shift()() : (changeList = null, _impressionDone(), null)
            },
            e = function() {
                n.attr("fontFamily", t);
                u();
                r()
            },
            o = function() {
                t != undefined && n.attr("fontFamily", t);
                u();
                n.data("dirty", !0);
                r()
            },
            f = function() {
                t === undefined && (t = n.attr("fontFamily").replace(/'/g, "").replace(/"/g, ""));
                var i = new FontFaceObserver(t, {
                    weight: n.attr("fontWeight"),
                    style: n.attr("fontStyle")
                });
                return i.load("BESbswy", 8e3).then(o, e)
            };
        changeList == null ? (changeList = [], changeList.push(f), _impressionBusy(), r()) : changeList.push(f)
    },
    setCharacterSpacing = function(n) {
        var o = Number(textGroupLines[n.group][n.line].attr("font-size").slice(0, -2)),
            u = textGroupLines[n.group][n.line].selectAll("tspan")[0],
            i = u.attr("text"),
            f = "0",
            e = i.length,
            s = -o / 8,
            t, r;
        if (e > 1)
            for (t = 0; t < e; t++) r = s, i[t] != "  " ? (i[t] != "_" || i[t + 1] != "_") && (r = .48) : r = 0, f += " " + r;

        u.attr({
            //dx: f
        })
    },
    getWidths = function(n, t) {
        var e = n.selectAll("tspan")[0],
            o = e.attr("text"),
            r = {
                lCells: o.length * t
            },
            i = e.attr("dx"),
            f = 0,
            u;
        if (i != null)
            for (i = i.split(" "), u = 0; u < i.length; u++) f += Number(i[u]);
        return r.lExtra = f, r.width = r.lCells + f, r
    },
    underlineTextElement = function(n, t) {
        var r = undefined,
            u = "u" + n.attr("id"),
            i = $("#" + u);
        if (t == undefined && (r = rsuAttr(n, "rsu:underline"), t = n.selectAll("tspan")[0].attr("text") != "" ? r != null && r == "true" ? !0 : !1 : !1), t == !0) {
            i.length == 0 && (i = textGroups[parseInt(u.substr(8, 2))].rect(0, 0, 0, 0).attr("id", u));
            var f = Number(n.attr("font-size").slice(0, -2)),
                s = getFontFamily(n),
                e = n.attr("fontWeight"),
                h = n.attr("fontStyle"),
                c = Number(n.attr("dy")),
                o = getUnderlineMetrics(s, e == "700" || e == "bold" ? !0 : !1, h == "italic" ? !0 : !1),
                l = o.uo * f,
                a = o.ut * f;
            i.attr({
                x: Number(n.attr("x")),
                width: Number(rsuAttr(n, "rsu:width")),
                y: Number(n.attr("y")) + c - l,
                height: a
            });
            r == undefined && rsuAttr(n, "rsu:underline", "true")
        } else i != null && i.remove()
    },
    getExactTextMeasurement = function(n, t, i) {
        var b = 0,
            nt = 0,
            o = Number(n.attr("font-size").slice(0, -2)),
            ut = n.selectAll("tspan")[0],
            s = ut.attr("text"),
            u, f, e, r;
        if (n.attr("rsu:underline") != "true") {
            for (u = 0; u < s.length && s[u] == " ";) u++;
            for (b = u, u = s.length - 1; u > 0 && s[u] == " ";) u--;
            nt = s.length - 1 - u
        } else s.length > 0 && s.trim() === "" && (t = !1);
        var h = getLineMetrics(n),
            l = myCanvas.getContext("2d"),
            k = o / 2,
            st = o / 2,
            tt = getWidths(n, o),
            d = l.canvas.width = Math.round(tt.width + o * 2),
            g = l.canvas.height = Math.round(o * 2),
            ft = o / 8,
            a = h.ascent + ft,
            c = undefined;
        c = renderTextDom(n, l, h, k, a, d, g, o);
        var v = g,
            y = d,
            p = 0,
            w = 0,
            it = 0,
            rt = d,
            et = g,
            ot = c.oImageData.data;
        for (f = 0; f < et; f++)
            for (e = 0; e < rt; e++) it = ot[(f * rt + e) * 4 + 3], it != 0 && (v > f && (v = f), p < f && (p = f), y > e && (y = e), w < e && (w = e));
        return l.restore(), l = null, r = {}, w == 0 ? (r.ascent = t == !0 ? 0 : h.ascent, r.descent = i == !0 ? 0 : h.descent, r.height = r.ascent + r.descent, r.width = 0, r.xOrigin = 0, r.x = 0, r.x2 = 0, r.y = 0, r.y2 = 0, r.cx = 0, r.cy = 0) : (k += b * c.spaceWidth, r.ascent = t == !0 ? a - v + 2 : Math.max(h.ascent, a - v), r.descent = i == !0 ? Math.max(p - a + 2, c.exactBottomUnderline) : Math.max(h.descent, p - a), r.height = r.ascent + r.descent, r.width = w - y + 2, r.width += (b + nt) * c.spaceWidth, r.width += tt.lExtra, r.width *= c.sizeAdjust, r.xOrigin = k - y + 0, r.x = 0, r.x2 = r.width, r.y = 0, r.y2 = r.height, r.cx = r.width / 2, r.cy = r.height / 2), r
    },
    getUnderlineMetrics = function(n, t, i) {
        n = n.replace(/['"]/g, "");
        for (var r = 0; r < brm.length; r++)
            if (brm[r].ff == n && brm[r].bd === t && brm[r].it === i) return brm[r];
        return {
            uo: -.08,
            ut: .07
        }
    },
    renderTextDom = function(n, t, i, r, u, f, e, o) {
        var s = {},
            k = n.selectAll("tspan")[0],
            h = k.attr("text"),
            a, b;
        h.length == 0 && (h = " ");
        var y = getFontFamily(n),
            l = n.attr("fontWeight"),
            p = n.attr("fontStyle");
        if (t.save(), t.clearRect(0, 0, f, e), t.textBaseline = "alphabetic", t.font = p + " " + l + " " + o + "px " + y, a = t.font.match(/[0-9]*\.?[0-9]+px/), s.sizeAdjust = o / (a.length == 0 ? o : Number(a[0].slice(0, -2))), t.fillStyle = "black", t.kerning = "none", s.spaceWidth = t.measureText(" ").width, s.exactBottomUnderline = -o, t.fillText(h, r, u), rsuAttr(n, "rsu:underline") == "true") {
            var w = getUnderlineMetrics(y, l == "700" || l == "bold" ? !0 : !1, p == "italic" ? !0 : !1),
                c = w.uo * o,
                v = w.ut * o;
            s.exactBottomUnderline = c + v;
            t.beginPath();
            c += -v / 2;
            t.moveTo(r, u - c);
            t.lineTo(r + t.measureText(h).width, u - c);
            t.lineWidth = v;
            t.stroke()
        }
        return b = t.getImageData(0, 0, f, e), t.restore(), s.oImageData = b, s
    },
    highlightAlignment = function(n, t, i) {
        var r = textGroupEditors[n][t];
        switch (i) {
            case "left":
                $(r + " .align-center").removeClass("active");
                $(r + " .align-right").removeClass("active");
                $(r + " .align-left").addClass("active");
                break;
            case "center":
                $(r + " .align-left").removeClass("active");
                $(r + " .align-right").removeClass("active");
                $(r + " .align-center").addClass("active");
                break;
            case "right":
                $(r + " .align-left").removeClass("active");
                $(r + " .align-center").removeClass("active");
                $(r + " .align-right").addClass("active")
        }
    },
    initTextEditorFromSVG = function(n, t) {
        var u = textGroupLines[n][t],
            r = textGroupEditors[n][t],
            o = u.selectAll("tspan")[0],
            f, i, e;
        $(r + ' input[type="text"]').val(o.attr("text"));
        f = u.attr("font-family");
        f.length > 0 && f[0] == '"' && (f = f.substr(1, f.length - 2));
        $(r + " select.text-font").val(f).trigger("change");
        i = u.attr("font-size");
        (i == undefined || i == "") && (i = u.node.getAttribute("font-size"));
        i = Number(i.substr(0, i.length - 2)) / 96 * 72;
        Math.floor(i) != i && ($(r).data("fsize", i), i = Math.floor(i));
        e = $(r).find("select.text-size")[0].selectize;
        e.addOption({
            text: i + " pt",
            value: i
        });
        e.setValue(i);
        $(r + " img").removeClass("active");
        switch (u.attr("fontWeight")) {
            case "700":
            case "bold":
                $(r + " .bold").addClass("active")
        }
        u.attr("fontStyle") == "italic" && $(r + " .italic").addClass("active");
        rsuAttr(u, "rsu:underline") == "true" && $(r + " .underline").addClass("active");
        switch (rsuAttr(u, "rsu:align")) {
            case "left":
                $(r + " .align-left").addClass("active");
                break;
            case "center":
                $(r + " .align-center").addClass("active");
                break;
            case "right":
                $(r + " .align-right").addClass("active")
        }
    },
    addTextToSVG = function(n, t) {
        var f = calcFontSize(START_FONT_SIZE),
            v = "svgtext" + formatElementId(n, t),
            e = "normal",
            o = null,
            s = "normal",
            h = "Arial",
            c = "left",
            l = "center",
            i, r, u, a;
        t !== 0 && (i = t - 1, r = textGroupLines[n], f = r[i].attr("font-size"), h = r[i].attr("fontFamily"), e = r[i].attr("fontWeight"), o = rsuAttr(r[i], "rsu:underline"), s = r[i].attr("fontStyle"), c = r[i].attr("text-anchor"), l = rsuAttr(r[i], "rsu:align"));
        textGroupLines[n][t] = textGroups[n].text(0, 0, [""]).attr({
            fontSize: f,
            fontFamily: h,
            id: v,
            fontWeight: e,
            fontStyle: s,
            "text-anchor": c
        });
        rsuAttr(textGroupLines[n][t], {
            "rsu:underline": o,
            "rsu:align": l
        });
        underlineTextElement(textGroupLines[n][t]);
        textGroupLines[n][t].selectAll("tspan")[0].node.setAttribute("space", "preserve");
        textGroupLines[n][t].attr("y", 0);
        u = rsuAttrFind(textGroups[n], "rsu:allowaddlines");
        u != null && u == "false" ? $("#group" + singleZeroPad(n) + " .remove").removeClass("active") : (a = textGroupLines[n].length, a > 1 && $("#group" + singleZeroPad(n) + " .remove").addClass("active"));
        impressionChanged(!1, 2e3)
    },
    getDisplayFonts = function(n) {
        var r = rsuAttrFind(n, "rsu:allowedfonts"),
            t = rsuAttrFind(n, "rsu:initialfont"),
            i;
        if (t == null && (t = START_FONT), r != null) {
            if (i = function() {
                    var n = r.split(",");
                    return {
                        v: {
                            fs: afonts.filter(function(t) {
                                return n.find(function(n) {
                                    return t.f == n
                                }) != undefined
                            }),
                            df: t
                        }
                    }
                }(), typeof i == "object") return i.v
        } else return {
            fs: afonts,
            df: t
        }
    },
    getMinFontSize = function(n) {
        var t = getLineMetrics(n);
        return t.min
    },
    getSizeString = function(n) {
        return n.match(/"=([^"]*)"/)
    },
    getFontSizes = function(n, t) {
        var o = rsuAttrFind(n, "rsu:fontsizes"),
            s, i, h, f;
        if (t == null && (t = rsuAttrFind(n, "rsu:initialfontsize")), s = n.attr("fontFamily").replace(/['"]+/g, ""), t == null && (t = START_FONT_SIZE), i = {
                ds: t
            }, o != null) {
            for (var e = undefined, r = undefined, u = o.split(";"), r = 0; r < u.length; r++) {
                if (u[r].includes(s)) {
                    e = u[r].match(/=([0-9,\s]*)/)[1];
                    break
                }
                u[r].includes("default") && (e = u[r].match(/=([0-9,\s]*)/)[1])
            }
            i.sz = e != null ? e.split(",") : dfs.slice()
        } else i.sz = dfs.slice();
        for (h = Math.floor(getMinFontSize(n) / 96 * 72), f = i.sz.length - 1; f >= 0; f--) Number(i.sz[f]) < h && i.sz.splice(f, 1);
        return Number(i.sz[0]) > Number(i.ds) && (i.ds = i.sz[0]), i
    },
    selectizeInitParams = {
        create: function(n) {
            var r = getTextLineContext(this.$input.parent().parent()),
                t, i;
            return r == undefined ? {
                text: "18 pt",
                value: "18"
            } : (t = undefined, i = Math.floor(getMinFontSize(textGroupLines[r.group][r.line]) / 96 * 72), t = n == "" ? i : Number(n), t < i && (t = i), {
                text: t + " pt",
                value: t
            })
        },
        createOnBlur: !0,
        persist: !1,
        maxItems: 1,
        createFilter: /^\d+$/,
        onDropdownOpen: function() {
            inLoad = 0
        },
        onChange: function(n) {
            var t, i, u, f, r;
            n != "" && (t = getTextLineContext(this.$input.parent().parent()), t != undefined) && (i = Number(n), i = calcFontSize(i), u = $(textGroupEditors[t.group][t.line]).data("fsize"), f = !0, u != undefined && Math.floor(u) == Number(n) && (i = calcFontSize(u), f = !1), f == !0 && inLoad == 0 && clearScale(), textGroupLines[t.group][t.line] !== undefined && (textGroupLines[t.group][t.line].attr("fontSize", i.toFixed(2)), textGroupLines[t.group][t.line].data("dirty", !0), setCharacterSpacing(t), impressionChanged(!1, 2e3, undefined, undefined, !0)), n && (r = this, r.settings.persist || r.userOptions.hasOwnProperty(n) || $.each(r.userOptions, function(n) {
                r.removeOption(n, !0)
            })))
        }
    },
    addTextEditorGroup = function(n, t) {
        var k = $("#group00"),
            d = $("#text00-00"),
            g = getTextLineContext(d),
            nt = g.line + 1,
            i = $(textGroupEditors[0][0] + " select.text-size").val(),
            r = singleZeroPad(n),
            v = "group" + r,
            e = "#" + v,
            s = "text" + r + "-00",
            y, o, h, u, c, l, p, w, f, b, a;
        $(textGroupEditors[0][0]).find("select.text-size")[0].selectize.destroy();
        y = k.clone(!0).attr({
            id: v
        });
        y.appendTo($("#tabs--text"));
        o = 0;
        do h = $(e + ' div[id^="text"]:last'), o = getTextLineContext(h).line, o > 0 && h.remove(); while (o > 0);
        $(e).find("#text00-00").attr({
            id: s,
            name: s
        });
        u = "tabs--add-textline" + r;
        $(e).find("#tabs--add-textline00").attr({
            id: u,
            name: u
        });
        u = "tabs--groupheader" + r;
        $(e).find("#tabs--groupheader00").attr({
            id: u,
            name: u
        });
        c = $(e).find('input[type="text"]');
        c.val("");
        l = s + "--input";
        c.attr({
            id: l,
            name: l
        });
        p = $(textGroupEditors[0][0] + " select.text-font").val();
        $(textGroupEditors[n][0] + " select.text-font").val(p);
        w = $(textGroupEditors[n][0] + " select.text-size");
        f = w.selectize(t)[0].selectize;
        f.addOption({
            text: i + " pt",
            value: i
        });
        f.setValue(i);
        b = $(textGroupEditors[0][0] + " select.text-size");
        f = b.selectize(t)[0].selectize;
        f.addOption({
            text: i + " pt",
            value: i
        });
        f.setValue(i);
        a = rsuAttrFind(textGroups[n], "rsu:allowaddlines");
        a != null && a == "false" && ($("#tabs--add-textline" + r).hide(), $("#group" + r + " .remove").removeClass("active"))
    },
    configureFontSizes = function(n, t, i, r, u) {
        var o = textGroupLines[n][t],
            f = getFontSizes(o, r),
            e;
        for (i.clearOptions(), e = 0; e < f.sz.length; e++) i.addOption({
            text: f.sz[e] + " pt",
            value: f.sz[e]
        });
        u != !0 && (i.addOption({
            text: f.ds + " pt",
            value: f.ds
        }), i.setValue(f.ds))
    },
    configureTextEditor = function(n, t, i, r, u) {
        var s = textGroupLines[n][t],
            h = getDisplayFonts(s),
            f = $(textGroupEditors[n][t]),
            c = $(f.find("select.text-font")[0]),
            o, e;
        for (c.empty(), o = undefined, o = 0; o < h.fs.length; o++) c.append('<option value="' + h.fs[o].f + '">' + h.fs[o].d + "<\/option>");
        i == undefined && (i = h.df);
        c.val(i);
        changeLineFont(s, i);
        configureFontSizes(n, t, f.find("select.text-size")[0].selectize, r, u);
        e = rsuAttrFind(s, "rsu:maxchars");
        e != null && f.find('input[type="text"]').attr("maxlength", Number(e));
        e = rsuAttrFind(s, "rsu:allowtextposition");
        e != null && e != "true" ? f.find(".align-left, .align-center, .align-right").hide() : f.find(".align-left, .align-center, .align-right").show();
        e = rsuAttrFind(s, "rsu:allowedtextattributes");
        e != null && (e.indexOf("b") == -1 ? f.find(".bold").hide() : f.find(".bold").show(), e.indexOf("i") == -1 ? f.find(".italic").hide() : f.find(".italic").show(), e.indexOf("u") == -1 ? f.find(".underline").hide() : f.find(".underline").show())
    },
    addTextEditor = function(n, t, i) {
        var r = getTextLineContext(t),
            u = r.line + 1,
            f = rsuAttrFind(textGroups[r.group], "rsu:maxlines"),
            a, s, h, v, y, p, w;
        if (f = f == null ? MAX_TEXT_LINES : Number(f), u < f) {
            var e = "text" + formatElementId(r.group, u),
                c = "#" + e,
                l = $(textGroupEditors[r.group][r.line] + " select.text-size").val(),
                o = $(textGroupEditors[r.group][r.line]).find("select.text-size")[0];
            o.selectize.destroy != undefined ? o.selectize.destroy() : o.remove();
            a = t.clone(!0).attr({
                id: e
            });
            textGroupEditors[r.group][u] = c;
            a.appendTo($(n + " .text-editor-holder"));
            s = $(c).find('input[type="text"]');
            s.val("");
            h = e + "--input";
            s.attr({
                id: h,
                name: h
            });
            v = $(textGroupEditors[r.group][r.line] + " select.text-font").val();
            y = $(textGroupEditors[r.group][u] + " select.text-size");
            y.selectize(selectizeInitParams)[0].selectize;
            p = $(textGroupEditors[r.group][r.line] + " select.text-size");
            w = p.selectize(selectizeInitParams)[0].selectize;
            configureFontSizes(r.group, r.line, w, l);
            i == !0 && (addTextToSVG(r.group, u), setAllDirty(r.group));
            configureTextEditor(r.group, u, v, l, i == !0 ? !1 : !0)
        }
    },
    addGraphicToGroup = function(n, t, i) {
        graphicGroupElements[n][t] = graphicGroups[n].image("", 0, 0, 0, 0);
        graphicGroupElements[n][t].attr("preserveAspectRatio", "xMidYMid");
        graphicGroupElements[n][t].attr("filter", "url(#gr-filt)");
        rsuAttr(graphicGroupElements[n][t], "rsu:artworktype", i)
    },
    impressionChanged = function(n, t, i, r, u) {

        inLoad != 2 && (u != !0 && (inLoad = 0), inLoad == 0 && setScd(), setBodiesStale(!0), checkShapeAutoSize(n, t, i, r))
    },
    checkShapeAutoSize = function(n, t, i, r) {
        var u, o, f, e;

        if (!(impressionBusy > 0)) {
            for (u = getFullImpressionSize(), isAutosize === !0 || n == !0 ? updateShapeSize(u.width, u.height, u.rx, u.ry, u.r) : updateImpressionPosition(), o = shapeGroup.selectAll("[id^=sbr]"), f = 0; f < o.length; f++) o[f].remove();
            for (e = 0; e < subGroups.length; e++) bodyGroups.length > 0 && !hasGroupSizeOverrides() ? createImpressionBackground(impressionGroup) : createImpressionBackground(subGroups[e]);
            if (r != -2) {
                if ((autoScale == !0 || i == !0) && cbDoScale(!0), si.bodies != undefined && si.bodies.productId != undefined && si.bodies.productId != "") {
                    checkBodyChange(r);
                    return
                }
                setChangeTimeout(t, r)
            }
        }
    },
    getUserSize = function(n, t) {
        var r = rsuAttr(n, "rsu:usize"),
            i = undefined;
        return r != null && (i = r.split(",")).length == 2 ? {
            w: Number(i[0]),
            h: Number(i[1]),
            s: rsuAttr(n, "rsu:shape")
        } : t == !0 && isFixedStamp ? {
            w: fixedWidth,
            h: fixedHeight,
            s: rsuAttr(n, "rsu:shape"),
            bd: !0
        } : null
    },
    getUndoSize = function(n) {
        var i = rsuAttr(n, "rsu:unsize"),
            t = undefined;
        return i != null && (t = i.split(",")).length == 2 ? {
            w: Number(t[0]),
            h: Number(t[1])
        } : null
    },
    getMinSize = function(n) {
        var i = rsuAttr(n, "rsu:dmsize"),
            t = undefined;
        return i != null && (t = i.split(",")).length == 2 ? {
            w: Number(t[0]),
            h: Number(t[1])
        } : {
            w: 0,
            h: 0
        }
    },
    tChangeTimeout, inChange = 0,
    tBodyChangeTimeout, dEmpty, setChangeTimeout = function(n, t) {
        clearTimeout(tChangeTimeout);
        tChangeTimeout = setTimeout(function() {
            checkEmptyDesign();
            dEmpty == !1 ? checkBodyChange(t) : si.initialBody == null ? showStampBodies(!1) : checkBodyChange(t);
            setAddToCartState()
        }, n == undefined ? 0 : n)
    },
    getGroupImpressionSize = function(n, t) {
        var i = matchingGroups[n].group,
            w = matchingGroups[n].id,
            a = rsuAttr(i, "rsu:shape"),
            s = undefined,
            h = undefined,
            u = undefined,
            f = undefined,
            e = undefined,
            c = undefined,
            p = !1,
            l = t == !0 ? "" : "m",
            r, v, o, y;
        return s = Number(rsuAttr(i, "rsu:" + l + "width")) / 96, h = Number(rsuAttr(i, "rsu:" + l + "height")) / 96, f = Number(rsuAttr(i, "rsu:" + l + "rx")) / 96, e = Number(rsuAttr(i, "rsu:" + l + "ry")) / 96, u = Number(rsuAttr(i, "rsu:" + l + "r")) / 96, c = a == "circle" ? 2 : a == "square" ? 4 : a == "oval" ? 3 : 1, r = null, v = getShortIdFromGroupId(i.attr("id")), v == ENABLE_BORDER && impressionBorder != undefined && shapeStrokeWidth != 0 && (o = shapeStrokeWidth, r = matchingGroups[n].pbrs, p = c == 1 || c == 4 ? r.width + o * 2 > s * 96 ? !0 : r.height + o * 2 > h * 96 ? !0 : !1 : c == 2 ? r.r + o > u * 96 ? !0 : !1 : r.rx + o > f * 96 ? !0 : r.ry + o > e * 96 ? !0 : !1), s = Math.floor(s * 1e3) / 1e3, h = Math.floor(h * 1e3) / 1e3, u = Math.floor(u * 1e3) / 1e3, f = Math.floor(f * 1e3) / 1e3, e = Math.floor(e * 1e3) / 1e3, a == "oval" && (y = getGroupBorderInfo(Number(i.attr("id").slice(-2) + 1)), y != null && y.shapeStrokeWidth != 0 && (u = Math.max(f, e))), {
            id: w,
            width: s,
            height: h,
            r: u,
            rx: f,
            ry: e,
            impressionType: getUserSize(i, !0) == null || t == !1 ? 1 : c,
            ns: p,
            gsn: v,
            pbrs: r
        }
    },
    getImpressionMatchingAreas = function(n) {
        for (var i = [], t = 0; t < matchingGroups.length; t++) i[t] = getGroupImpressionSize(t, n == !0 || isAutosize == !0 ? !1 : !0);
        return i
    },
    checkBodyChange = function checkBodyChange(n) {
        if (!(n < 1) || (si.allowedBodies != null || bodyItemInfo.itemId == undefined) && (isAutosize != !1 || isBodySelected() != !0 && isWizard() != !1) && n != -1) {
            if (inChange == 1) {
                inChange = 2;
                return
            }
            clearTimeout(tBodyChangeTimeout);
            tBodyChangeTimeout = setTimeout(function() {
                var t = !1,
                    i, r, u, f;
                inChange = 1;
                i = function(n) {
                    var i, r, u;
                    if (inChange == 2) {
                        inChange == 0;
                        checkBodyChange();
                        return
                    }
                    if (si.bodies != undefined) {
                        for (i = 0, r = n.d.bodies; i < r.length; i++)
                            if (r[i] != null && r[i].bvin == si.bodies.productId) {
                                n.d.initialBody = i;
                                n.d.initialColor = si.bodies.inkColor.toLowerCase();
                                break
                            }
                        si.bodies = undefined
                    }
                    if (u = updateBodyDisplay(n), t == !0 && (t = !1, u == 0)) {
                        inChange = 0;
                        checkBodyChange();
                        return
                    }
                    inChange = 0
                };
                r = !1;
                bodyItemInfo.itemId == undefined && (bodyItemInfo.itemId = si.itemId, bodyItemInfo.itemIdType = si.itemIdType, bodyItemInfo.templateProductId = si.templateProductId, bodyItemInfo.fSelIdx = si.fSelIdx, bodyItemInfo.fSelColor = si.fSelColor, r = !0);
                si.itemId != null && si.itemId.length > 0 && si.itemIdType != 10 && r == !0 ? (u = {
                    itemId: si.itemId,
                    itemIdType: si.itemIdType != 3 ? 1 : 2,
                    ovProd: si.fSelBvin,
                    ovInk: si.fSelColor,
                    ovSize: si.fSelIdx != -1 ? getImpressionMatchingAreas(!0) : null
                }, si.item = null, t = !0, GetItemMatchingBodies(u, JSON.parse(si.allowedBodies), i, function(n, t, i) {
                    inChange = 0;
                    gShowError("Error retrieving stamp bodies(2)", n, t, i)
                })) : (f = getImpressionMatchingAreas(n == 2 ? !0 : !1), GetMatchingBodies(f, JSON.parse(si.allowedBodies), i, function(n, t, i) {
                    inChange = 0;
                    gShowError("Error retrieving stamp bodies(1)", n, t, i)
                }))
            }, 330)
        }
    },
    getShapeForType = function(n, t, i, r, u, f, e, o, s) {
        var w = hasGroupSizeOverrides(),
            h, c, b;
        e = w && (!(hasUserDimensions() || isFixedStamp || isWizard()) || bodyGroups.length > 0) ? 1 : 0;
        //!hasUserDimensions() && hgo ? 1 : hasUserDimensions() ? .67 : 0;// op == undefined ? 1 : op;
        if (h = undefined, c = undefined, s) h = fixedWidth, c = fixedHeight, w == !1 && (e = 0);
        else switch (n) {
            case "square":
                h = i.attr("width");
                c = i.attr("height");
                break;
            case "rectangle":
                h = i.attr("width");
                c = i.attr("height");
                break;
            case "circle":
                h = i.attr("r") * 2;
                c = i.attr("r") * 2;
                break;
            case "oval":
                h = i.attr("rx") * Math.SQRT2;
                c = i.attr("ry") * Math.SQRT2
        }
        if (i.remove(), h == null || c == null) switch (t) {
            case "circle":
                return r.circle(SVG_CENTER_X, SVG_CENTER_Y, 0).attr({
                    id: u,
                    fill: f,
                    "fill-opacity": e
                });
            case "oval":
                return r.ellipse(SVG_CENTER_X, SVG_CENTER_Y, 0, 0).attr({
                    id: u,
                    fill: f,
                    "fill-opacity": e
                });
            default:
                return r.rect(a, v, 0, 0).attr({
                    id: u,
                    fill: f,
                    "fill-opacity": e
                })
        }
        var l = o == !0 ? Math.min(h, c) : Math.max(h, c),
            y = undefined,
            p = undefined,
            a = undefined,
            v = undefined;
        switch (t) {
            case "square":
                a = SVG_CENTER_X - l / 2;
                v = SVG_CENTER_Y - l / 2;
                i = r.rect(a, v, l, l).attr({
                    id: u,
                    fill: f,
                    "fill-opacity": e
                });
                break;
            case "rectangle":
                y = h;
                p = c;
                a = SVG_CENTER_X - y / 2;
                v = SVG_CENTER_Y - p / 2;
                i = r.rect(a, v, y, p).attr({
                    id: u,
                    fill: f,
                    "fill-opacity": e
                });
                break;
            case "circle":
                b = l / 2;
                i = r.circle(SVG_CENTER_X, SVG_CENTER_Y, b).attr({
                    id: u,
                    fill: f,
                    "fill-opacity": e
                });
                break;
            case "oval":
                i = r.ellipse(SVG_CENTER_X, SVG_CENTER_Y, h / (o == !0 ? 2 : Math.SQRT2), c / (o == !0 ? 2 : Math.SQRT2)).attr({
                    id: u,
                    fill: f,
                    "fill-opacity": e
                })
        }
        return i
    },
    _fecmx = function(n) {
        for (var r = function(t) {
                var r = parseInt(n.substr(1 + t * 2, 2), 16),
                    i = r / 255,
                    u = 1 - i;
                return u + " 0 0 0 " + i
            }, i = '"', t = undefined, t = 0; t < 3; t++) i += r(t), i += "\n";
        return i + '0 0 0 1 0"'
    },
    setGraphicColor = function(n) {
        $("#gr-filt").remove();
        Snap._.getSomeDefs(s).appendChild(rsuParse('<filter id="gr-filt" filterUnits="objectBoundingBox" x="0%" y="0%" width="100%" height="100%"><feColorMatrix id="svgcmatrix" color-interpolation-filters="sRGB" in="SourceGraphic" type="matrix" values=' + _fecmx(n) + " /><\/filter>").node)
    },
    cbInkChange = function(n) {
        n == undefined || n.length == 0 ? n = "#000000" : n[n.length - 1] == ";" && (n = n.slice(0, -1));
        var t = n.split(";");
        STROKE_COLOR = t[0];
        impressionGroup.attr("fill", t[0]);
        impressionBorder != undefined && impressionBorder.attr("stroke", t[0]);
        bodyGroups.length > 0 && bodyGroups[0].attr("fill", t[t.length > 1 ? 1 : 0]);
        setGraphicColor(n)
    },
    setDisplayShapes = function(n) {
        shape = getShapeForType(rsuAttr(shape, "rsu:shape"), getDisplayOverride(n), shape, s, "shape", FILL, .66, !0, !0);
        impressionBorder != undefined && (impressionBorder = getShapeForType(rsuAttr(impressionBorder, "rsu:shape"), n, impressionBorder, impressionBorder.parent(), impressionBorder.attr("id"), "none"), rsuAttr(impressionBorder, "rsu:shape", n), rsuAttr(impressionBorder.parent(), "rsu:shape", n), rsuAttr(impressionBorder, "rsu:enclose", hasUserDimensions() == !0 ? "2" : ""), setBorderType());
        shape.insertBefore(impressionGroup);
        rsuAttr(shape, "rsu:shape", getDisplayOverride(n));
        updateDimensionsDisplay()
    },
    cbStampBodySelected = function(n) {
        if (n == null)
            if (_groupSizeOverrides.sizes.length != 0)
                if (si.templateProductId != null || isAutosize == !0) cbInkChange("#000000;"), groupSizeOverridesFromJSON('{"sizes": []}');
                else return;
        else return;
        else groupSizeOverridesFromJSON(n.data("prod-sizetemplate")), isWizard() || (fixedWidth = _groupSizeOverrides.fWidth, fixedHeight = _groupSizeOverrides.fHeight), cbInkChange(n.data("prod-displaycolor"));
        setDisplayShapes($("#shape-dropdown option:selected").val());
        checkShapeAutoSize(!0, 0, !1, -1)
    },
    cbAllowScale = function() {
        return hasUserDimensions() || isFixedStamp == !0 ? !0 : !1
    },
    cbSetFixed = function(n, t) {
        var r = hasUserDimensions(),
            i, u;
        if ((r == !0 || isFixedStamp) && (i = getUserSize(subGroups[0]), i != null && t < 3 ? getUndoSize(subGroups[0]) == null && (rsuAttr(subGroups[0], "rsu:unsize", i.w + "," + i.h), $("#scalereset-btn").show()) : i = {}, t > 2)) {
            if (isWizard()) {
                u = rsuAttr(subGroups[0], "rsu:shape");
                switch (u) {
                    case "circle":
                        i.w = i.h = n.areas[0].r * 192;
                        break;
                    case "oval":
                        i.w = n.areas[0].width * Math.SQRT2 * 96;
                        i.h = n.areas[0].height * Math.SQRT2 * 96;
                        break;
                    case "square":
                        i.w = i.h = Math.min(i.w, i.h);
                        break;
                    default:
                        i.w = n.areas[0].width * 96;
                        i.h = n.areas[0].height * 96
                }
            } else i.w = n.areas[0].width * 96, i.h = n.areas[0].height * 96;
            if (t >= 4 && n.ns == !0 && r) {
                var f = (shapeStrokeWidth / 2 + borderMargin) * 2,
                    e = n.areas[0].pbrs.width + f,
                    o = n.areas[0].pbrs.height + f;
                i.w = i.w > e ? i.w : e;
                i.h = i.h > o ? i.h : o
            }
            isWizard() || (saveState(!0), $("#shape-dropdown").val("rectangle"));
            setUserDimensions(i.w, i.h, t == 5 ? !0 : r, !1, !0, !0)
        }
    },
    scaleRetryMax = 20,
    scaleAdjustMax = 10,
    autoScale = !1,
    undoSize = null,
    cbDoScale = function(n, t) {
        var f = 0,
            y, p, e, h;
        if (resetScale(!0), t != undefined && t != 0) return f = reScale(t, !0), scaleUIDisplay(t), f;
        if ((hasUserDimensions() == !0 || isFixedStamp) && autoScale == !0 || n == !0) {
            var c = undefined,
                r = undefined,
                u = undefined,
                l = undefined,
                a = undefined,
                it = scaleRetryMax,
                w = scaleAdjustMax,
                i = 0,
                g = 9999;
            do {
                var b = 9999,
                    k = 9999,
                    v = Number(rsuAttr(impressionGroup, "rsu:scale"));
                for (v = v == 0 ? 1 : v, y = 9999, p = 9999, e = 0; e < matchingGroups.length; e++) {
                    var nt = !1,
                        s = matchingGroups[e].pbrs,
                        tt = getShortIdFromGroupId(matchingGroups[e].group.attr("id")),
                        o = rsuAttr(matchingGroups[e].group, "rsu:shape"),
                        d = getUserSize(matchingGroups[e].group);
                    d != null ? (l = d.w, a = d.h) : (h = getGroupSizeOverride(tt), h.r != undefined && h.width == undefined ? (nt = !0, l = a = h.r * 2) : (l = h.width, a = h.height));
                    tt == ENABLE_BORDER && impressionBorder != undefined && shapeStrokeWidth != 0 && (l -= (shapeStrokeWidth + borderMargin) * 2, a -= (shapeStrokeWidth + borderMargin) * 2);
                    r = l;
                    u = a;
                    nt && (o == "square" || o == "rectangle") && (r /= Math.SQRT2, u /= Math.SQRT2);
                    (o == "square" || o == "circle") && (r = u = Math.min(r, u));
                    o == "oval" || o == "circle" ? o == "circle" ? (u /= s.r * 2, r /= s.r * 2) : (r /= s.rx * 2, u /= s.ry * 2) : (r = r / s.width, u = u / s.height);
                    y > r && (y = r);
                    p > u && (p = u)
                }
                c = y < p ? y : p;
                k = c < 1 ? 9999 : c - 1;
                c *= v;
                b = c;
                w > 0 && (reScale(b, !0, !0), $("#impression-scale").val(b), k < g && (g = k, i = v), (i != 0 || it-- <= 0) && w--, checkShapeAutoSize(!0, 300, !0, -2));
                w == 0 && (i == 0 && (i = b), f = reScale(i, !0), f.ms != i && (i = f.ms, reScale(i, !0)), $("#impression-scale").val(i), i == 1 && f.tsc == 0 && f.isc == 0 && (f.ms = 0), checkShapeAutoSize(!0, 300, !0, -2))
            } while (w != 0);
            scaleUIDisplay(i)
        }
        return f
    },
    cbAddToCart = function() {
        var n = {
                areas: getImpressionMatchingAreas(!0),
                allowedBodies: si.allowedBodies
            },
            t = undefined;
        for (n.ns = !1, t = 0; t < n.areas.length; t++) n.areas[t].ns == !0 && (n.ns = !0), n.areas[t].gso = getGroupSizeOverride(n.areas[t].gsn);
        return n
    },
    cbGetSVG = function() {
        return rsuOuterSVG(impressionGroup)
    },
    checkEmptyDesign = function() {
        for (var t = !0, n = undefined, n = 0; n < textGroups.length; n++)
            if (getValidTextLinesInGroup(n).length > 0) {
                t = !1;
                break
            }
        if (t === !0)
            for (n = 0; n < graphicGroups.length; n++)
                if (graphicGroupElements[n].length > 0 && graphicGroupElements[n][0].attr("xlink:href") !== "") {
                    t = !1;
                    break
                }(t == !1 && $("#start-over-btn").removeClass("disabled"), dEmpty !== t) && (dEmpty = t, dEmpty === !0 ? (clearBodySelection(), impressionBorder != undefined && impressionBorder.attr("display", "none"), $("#start-over-btn").addClass("disabled"), $("#proof-btn").addClass("disabled"), $("#proof-btn").removeAttr("data-reveal-id"), $("#save-btn").addClass("disabled"), $("#save-btn").removeAttr("data-reveal-id")) : (impressionBorder != undefined && impressionBorder.attr("display", ""), $("#start-over-btn").removeClass("disabled"), $("#proof-btn").removeClass("disabled"), $("#proof-btn").attr("data-reveal-id", $("#proof-btn").attr("modal-data-reveal-id")), $("#save-btn").removeClass("disabled"), $("#save-btn").attr("data-reveal-id", $("#save-btn").attr("modal-data-reveal-id"))))
    },
    getEllipseCircumference = function() {
        var n = Number(impressionBorder.attr("rx")),
            t = Number(impressionBorder.attr("ry")),
            i = Math.pow(n - t, 2) / Math.pow(n + t, 2);
        return Math.PI * (n + t) * (1 + 3 * i / (10 + Math.sqrt(4 - 3 * i)))
    },
    getCircleCircumference = function() {
        return Number(impressionBorder.attr("r")) * 2 * Math.PI
    },
    getRectCircumference = function() {
        return Number(impressionBorder.attr("width")) * 2 + Number(impressionBorder.attr("height")) * 2
    },
    getBorderCircumference = function(n) {
        var r = undefined,
            f = !1,
            t, i, u;
        switch (n.attr("rsu:shape")) {
            case "oval":
                t = Number(n.attr("rx"));
                i = Number(n.attr("ry"));
                f = i > t ? !0 : !1;
                u = Math.pow(t - i, 2) / Math.pow(t + i, 2);
                r = Math.PI * (t + i) * (1 + 3 * u / (10 + Math.sqrt(4 - 3 * u)));
                break;
            case "circle":
                r = Number(n.attr("r")) * 2 * Math.PI;
                break;
            default:
                return {
                    cir: -1
                }
        }
        return {
            cir: r,
            t: f
        }
    },
    getEvenSpacing = function(n, t, i, r, u) {
        var e = getBorderCircumference(n),
            f, o;
        return e.cir == -1 ? getRectSpacing(n, t, i, r, u) : (f = e.cir / (i + t), f = Math.floor(f + .5), f % 2 != 0 && (f = f < 3 ? 2 : --f), o = e.cir / f - t, {
            da: t + " " + o,
            doff: u != !0 ? e.t == !0 && f % 4 != 0 ? t + o / 2 : t / 2 : 0
        })
    },
    getRectSpacing = function(n, t, i, r, u) {
        var s = function(n, r, u) {
                var f = t + " " + (n / r - t) + " ";
                return u != !0 ? f.repeat(r) : f.repeat(r - 1) + t + " " + i * 2
            },
            e = Number(n.attr("width")),
            f = Number(n.attr("height"));
        if (e == 0 || f == 0) return {
            da: 0,
            doff: 0
        };
        t = Math.min(Math.min(e, f) / 2, t);
        r == !0 && (i = Math.min(i, t));
        var c = Math.floor(e / (i + t) + .5),
            h = Math.floor(f / (i + t) + .5),
            o = s(e, c);
        return o += s(f, h) + o, o += s(f, h, u), {
            da: o,
            doff: u != !0 ? t / 2 : 0
        }
    },
    midDotSpace = 15,
    dotWidth = .0001,
    getDottedArray = function(n) {
        return getEvenSpacing(n, dotWidth, midDotSpace, !1)
    },
    midDashSpace = 16,
    dashWidth = 20,
    getDashArray = function(n) {
        return getEvenSpacing(n, dashWidth, midDashSpace, !0)
    },
    setBorderType = function(n, t, i) {
        n == undefined && (n = impressionBorder);
        t == undefined && (t = $("input[name=stamp-border]:checked").val());
        i == undefined && (i = Number($("#dropdown-border-weight option:selected").val()));
        var u = n.attr("stroke"),
            r = undefined;
        switch (t) {
            case "no":
                shapeStrokeWidth = 0;
                shapeStrokeDasharray = "0";
                shapeStrokeDashoffset = 0;
                shapeStrokeLinecap = "square";
                break;
            case "dashed":
                shapeStrokeWidth = i;
                r = getDashArray(n);
                shapeStrokeDasharray = r.da;
                shapeStrokeDashoffset = r.doff;
                shapeStrokeLinecap = "square";
                break;
            case "solid":
                shapeStrokeWidth = i;
                shapeStrokeDasharray = "0";
                shapeStrokeDashoffset = 0;
                shapeStrokeLinecap = "square";
                break;
            case "dotted":
                shapeStrokeWidth = i;
                r = getDottedArray(n);
                shapeStrokeDasharray = r.da;
                shapeStrokeDashoffset = r.doff;
                shapeStrokeLinecap = "round"
        }
        impressionBorder.attr({
            fill: "none",
            stroke: STROKE_COLOR,
            strokeWidth: shapeStrokeWidth,
            strokeDasharray: shapeStrokeDasharray,
            strokeDashoffset: shapeStrokeDashoffset,
            strokeLinecap: shapeStrokeLinecap,
            "rsu:border": t
        })
    };
$(document).ready(function() {});
var _curTFirst = 0,
    _curTLast = 0,
    getValidTextLinesInGroup = function(n, t) {
        for (var f = textGroupLines[n], o = f.length, u = 0, i = -1, r = 0, e; u < o; u++) f[u].selectAll("tspan")[0].attr("text") != "" && (i == -1 && (i = u), r = u);
        return (t == !0 && (e = function(n, t) {
            while (n < t) underlineTextElement(f[n++])
        }, i != -1 ? (e(0, i), e(r + 1, o)) : e(0, o)), i == -1) ? [] : (r++, (_curTFirst != i || _curTLast != r) && (_curTFirst = i, _curTLast = r, setAllDirty(n)), f.slice(i, r))
    },
    getScaleForGroup = function(n) {
        var t = rsuAttr(impressionGroup, "rsu:scale");
        return t == undefined || n.rsuismt == undefined ? 1 : Number(t)
    },
    translateWithScale = function(n, t, i) {
        var r = n.transform().localMatrix;
        r.e = t;
        r.f = i;
        n.transform(r.toTransformString())
    },
    normalizedToScale = function(n, t, i) {
        var r = n.transform().localMatrix;
        return {
            x: t * r.a,
            y: i * r.d
        }
    },
    setGroupTextSize = function(n) {
        var y = getValidTextLinesInGroup(n),
            p = rsuAttr(textGroups[n], "rsu:dyn") != "no" ? !0 : !1,
            a = y.length,
            o = 0,
            e = 0,
            k = textGroups[n].getBBox(),
            v = [],
            t, r, h, w, b, i, f;
        for (textGroups[n].transform(""), t = undefined, i = 0; i < a; i++) r = y[i], r.data("dirty") ? (t = getExactTextMeasurement(r, i == 0 ? !0 : !1, i === a - 1 ? !0 : !1), rsuAttr(r, {
            "rsu:width": t.width,
            "rsu:height": t.height,
            "rsu:baseline": t.ascent,
            "rsu:xorigin": t.xOrigin
        }), r.attr("dy", ""), t.y += e, t.y2 += e, v[i] = t, r.data("dirty", null), r.data("measurements", t)) : (r.attr({
            dy: 0
        }), t = r.data("measurements"), v[i] = t), o = Math.max(o, t.width), e += t.height, p || (h = r.selectAll("textPath"), h != null && (h = h[0], w = Snap.path.getTotalLength(s.select("#" + r.node.id + "-path")), b = rsuAttr(r, "rsu:align"), h.attr({
            startOffset: (w - t.width) / 2
        })));
        if (p) {
            rsuAttr(textGroups[n], {
                "rsu:width": o,
                "rsu:height": e,
                "rsu:rx": o / Math.SQRT2,
                "rsu:ry": e / Math.SQRT2
            });
            moveText(n);
            var c = o / 2,
                l = e / 2,
                u = 0;
            for (i = 0; i < a; i++) f = v[i], u = Math.max(u, Math.hypot(f.x - c, f.y - l)), u = Math.max(u, Math.hypot(f.x2 - c, f.y - l)), u = Math.max(u, Math.hypot(f.x2 - c, f.y2 - l)), u = Math.max(u, Math.hypot(f.x - c, f.y2 - l));
            rsuAttr(textGroups[n], {
                "rsu:r": u
            })
        }
        overrideGroupSize(textGroups[n])
    },
    setGroupFixedSize = function(n) {
        overrideGroupSize(fixedGroups[n])
    },
    setGroupBodySize = function(n) {
        var t = bodyGroups[n],
            u = rsuAttr(t, "rsu:wzwidth"),
            f = rsuAttr(t, "rsu:wzheight"),
            i, r;
        rsuAttr(t, "rsu:height", f);
        rsuAttr(t, "rsu:width", u);
        overrideGroupSize(t);
        i = t.select("#svgbodyelement00-00");
        i != null && (i.attr("width", Number(rsuAttr(t, "rsu:width"))), i.attr("height", Number(rsuAttr(t, "rsu:height"))));
        r = t.select("#svgbodyelement00-01");
        r != null && r.transform("translate(" + Number(rsuAttr(t, "rsu:odx")) + "," + Number(rsuAttr(t, "rsu:ody")) + ")")
    },
    setTextXPos = function(n, t, i, r) {
        var u = 0;
        switch (rsuAttr(n, "rsu:align")) {
            case "center":
                u = (i - t) / 2;
                break;
            case "right":
                u = i - t
        }
        n.attr("x", u + r)
    },
    moveText = function(n) {
        for (var t, f, r = 0, u = getValidTextLinesInGroup(n, !0), e = u.length, o = Number(rsuAttr(textGroups[n], "rsu:width")), i = 0; i < e; i++) t = u[i], f = Number(rsuAttr(t, "rsu:width")), setTextXPos(t, f, o, Number(rsuAttr(t, "rsu:xorigin"))), t.attr("y", r + Number(rsuAttr(t, "rsu:baseline"))), r += Number(rsuAttr(t, "rsu:height")), underlineTextElement(t)
    },
    updateImpressionPosition = function() {
        var u = rsuAttr(shape, "rsu:shape"),
            n = undefined,
            t = undefined,
            f = undefined,
            e = undefined,
            i = rsuAttr(impressionGroup, "rsu:height"),
            r = rsuAttr(impressionGroup, "rsu:width");
        switch (u) {
            case "oval":
            case "circle":
                n = Number(shape.attr("cx")) - r / 2;
                t = Number(shape.attr("cy")) - i / 2;
                break;
            default:
                n = Number(shape.attr("x")) + Number(shape.attr("width")) / 2 - r / 2;
                t = Number(shape.attr("y")) + Number(shape.attr("height")) / 2 - i / 2
        }
        impressionGroup.transform("translate(" + n + "," + t + ")")
    },
    createImpressionShape = function() {},
    updateShapeSize = function(n, t, i, r, u) {
        _updateShapeSize(shape, rsuAttr(shape, "rsu:shape"), n, t, i, r, u, undefined, undefined, 192, 288);
        updateImpressionPosition();
        updateDimensionsDisplay()
    },
    _updateShapeSize = function(n, t, i, r, u, f, e, o, s, h, c, l) {
        var a = undefined,
            v = undefined,
            b;
        l != !0 && (i = Math.max(i, MIN_STAMP_SIZE_X), r = Math.max(r, MIN_STAMP_SIZE_Y));
        var y = Math.max(i, r),
            p = undefined,
            w = undefined,
            k = function() {};
        switch (t) {
            case "oval":
                a = i;
                v = r;
                u = u == undefined ? a / Math.SQRT2 : u;
                f = f == undefined ? v / Math.SQRT2 : f;
                h != undefined && (u > f ? (u = u > c ? c : u, f = f > h ? h : f) : (u = u > h ? h : u, f = f > c ? c : f));
                n.attr({
                    rx: u,
                    ry: f,
                    cx: o == undefined ? SVG_CENTER_X : o + u,
                    cy: s == undefined ? SVG_CENTER_Y : s + f
                });
                break;
            case "circle":
                b = e == undefined ? u != undefined ? Math.max(u, f) : Math.max(i, r) / 2 : e;
                h != undefined && b > h && (b = h);
                n.attr({
                    r: b,
                    cx: o == undefined ? SVG_CENTER_X : o + e,
                    cy: s == undefined ? SVG_CENTER_Y : s + e
                });
                break;
            case "square":
                h != undefined && y > h * 2 && (y = h * 2);
                p = o == undefined ? SVG_CENTER_X - y / 2 : o;
                w = s == undefined ? SVG_CENTER_Y - y / 2 : s;
                n.attr({
                    width: y,
                    height: y,
                    x: p,
                    y: w
                });
                break;
            case "rectangle":
                a = i;
                v = r;
                h != undefined && (a > v ? (a = a > c * 2 ? c * 2 : a, v = v > h * 2 ? h * 2 : v) : (a = a > h * 2 ? h * 2 : a, v = v > c * 2 ? c * 2 : v));
                p = o == undefined ? SVG_CENTER_X - a / 2 : o;
                w = s == undefined ? SVG_CENTER_Y - v / 2 : s;
                n.attr({
                    width: a,
                    height: v,
                    x: p,
                    y: w
                })
        }
    },
    inverseAlignment = function(n) {
        var t = n.indexOf(",");
        switch (n.slice(0, t == -1 ? undefined : t)) {
            case "left":
                return "right";
            case "right":
                return "left";
            case "top":
                return "bottom";
            case "bottom":
                return "top";
            case "center":
                return "center"
        }
    },
    inverseAlignmentSide = function(n) {
        var t = n.indexOf(",");
        switch (n.slice(0, t == -1 ? undefined : t)) {
            case "left":
                return "r";
            case "right":
                return "l";
            case "top":
                return "b";
            case "bottom":
                return "t";
            case "center":
                return "c"
        }
    },
    alignmentSide = function(n) {
        var t = n.indexOf(",");
        return n.slice(0, t == -1 ? undefined : t).charAt(0)
    },
    getAlignmentElements = function(n) {
        var e = [],
            h = 0,
            r = {},
            t = rsuAttr(n, "rsu:syncsize"),
            o, i, u, f, s;
        if (t != null && (t = t.split(","), t.length > 0 && (r.syncExpand = t[0]), t.length > 1 && (r.internalPosition = t[1])), o = rsuAttr(n, "rsu:align"), o != null && (e[h++] = {
                align: o
            }), i = rsuAttr(n, "rsu:anchor"), i != null)
            for (i = i.split(";"), u = 0; u < i.length; u++) f = i[u].split(","), f.length > 1 && (s = f[1].split(":"), e[h++] = {
                id: s[0],
                side: s[1],
                align: f[0]
            });
        return r.sides = e, r
    },
    minSyncWidth = 0,
    minSyncHeight = 0,
    setMinSizes = function() {
        var t = rsuAttr(impressionGroup, "rsu:minwidthgroup"),
            n = undefined;
        t != null && (n = getElementFromShortID(t), n != null && (minSyncWidth = Number(rsuAttr(n, "rsu:width"))));
        t = rsuAttr(impressionGroup, "rsu:minheightgroup");
        t != null && (n = getElementFromShortID(t), n != null && (minSyncHeight = Number(rsuAttr(n, "rsu:height"))))
    },
    _groupSizeOverrides = {
        sizes: []
    },
    groupSizeOverridesFromJSON = function(n) {
        var t, i;
        for (_groupSizeOverrides = JSON.parse(n), t = 0; t < _groupSizeOverrides.sizes.length; t++) i = _groupSizeOverrides.sizes[t].gsn, i[0] == "m" && (_groupSizeOverrides.sizes[t].gsn = getShortIdFromGroupId(matchingGroups[Number(i.slice(-2))].group.attr("id")))
    },
    getGroupSizeOverrides = function() {
        return _groupSizeOverrides
    },
    setGroupSizeOverrides = function(n) {
        _groupSizeOverrides = n
    },
    hasGroupSizeOverrides = function() {
        return _groupSizeOverrides.sizes.length > 0 ? !0 : !1
    },
    getGroupSizeOverride = function(n) {
        var i = undefined,
            u, r, t;
        for (n == "s00" && (u = getUserSize(subGroups[0]), u != null && (i = {
                width: u.w,
                height: u.h
            })), r = 0; r < _groupSizeOverrides.sizes.length; r++)
            if (_groupSizeOverrides.sizes[r].gsn == n) return t = _groupSizeOverrides.sizes[r], t.r != undefined && t.r != 0 ? {
                r: t.r
            } : i != undefined ? {
                width: Math.max(i.width, t.width),
                height: Math.max(i.height, t.height)
            } : {
                width: t.width,
                height: t.height
            };
        return i
    },
    getDisplayOverride = function(n) {
        return _groupSizeOverrides.display == undefined ? n : _groupSizeOverrides.display
    },
    overrideGroupSize = function(n) {
        var h = getShortIdFromGroupId(rsuAttr(n, "id")),
            i = rsuAttr(n, "rsu:width"),
            r = rsuAttr(n, "rsu:height"),
            u = rsuAttr(n, "rsu:r"),
            o = rsuAttr(n, "rsu:rx"),
            s = rsuAttr(n, "rsu:ry"),
            t = getGroupSizeOverride(h),
            f, e;
        t != undefined ? (f = undefined, e = undefined, t.width != undefined ? (f = (t.width - i) / 2, e = (t.height - r) / 2, i = t.width, r = t.height, o = s = u = i / 2) : (f = (t.r * 2 - i) / 2, e = (t.r * 2 - r) / 2, u = o = s = t.r, i = u * 2, r = u * 2), rsuAttr(n, {
            "rsu:odx": f,
            "rsu:ody": e,
            "rsu:width": i,
            "rsu:height": r,
            "rsu:r": u,
            "rsu:rx": o,
            "rsu:ry": s
        })) : (rsuRemoveAttr(n, "rsu:odx"), rsuRemoveAttr(n, "rsu:ody"))
    },
    getGroupBorderInfo = function(n) {
        var i = null,
            t;
        return n == 0 ? i = {
            impressionBorder: impressionBorder,
            shapeStrokeWidth: shapeStrokeWidth
        } : (n--, t = subGroups[n].select("#svgborder" + singleZeroPad(n)), t != null && (i = {
            impressionBorder: t,
            borderType: rsuAttr(t, "rsu:border"),
            shapeStrokeWidth: shapeStrokeWidth
        })), i
    },
    createImpressionBackground = function(n) {
        var f = getUserSize(n, !0),
            l, d, a;
        if (hasGroupSizeOverrides() != !0 || !(f == null && !isWizard() || bodyGroups.length > 0)) {
            var r = 0,
                u = 0,
                v = n,
                b = undefined;
            do b = v.transform().localMatrix.split(), r += b.dx, u += b.dy, v = v.parent(); while (v.type == "g");
            var y = f != null ? !0 : !1,
                k = isRoundProduct(),
                e = getMinSize(n),
                t = undefined,
                i = undefined,
                p = undefined,
                w = undefined,
                o = undefined,
                h = undefined,
                c = undefined;
            t = Number(rsuAttr(n, "rsu:mwidth"));
            i = Number(rsuAttr(n, "rsu:mheight"));
            f == null && (t < e.w || i < e.h) && (f = {
                w: t < e.w ? e.w : t,
                h: i < e.h ? e.h : i
            });
            f != null ? (p = f.w, w = f.h, r -= (p - t) / 2, u -= (w - i) / 2, t = p, i = w) : (p = Number(rsuAttr(n, "rsu:width")), w = Number(rsuAttr(n, "rsu:height")));
            l = "sbr" + n.node.id;
            d = rsuAttr(n, "rsu:shape");
            switch (d) {
                case "circle":
                    y == !0 ? o = Math.min(t, i) / 2 : (o = Number(rsuAttr(n, "rsu:mr")), o < Math.max(t, i) / 2 && (o = Math.max(t, i) / 2));
                    shapeGroup.prepend(s.circle(r + t / 2, u + i / 2, o).attr({
                        id: l,
                        fill: FILL,
                        stroke: "none"
                    }));
                    break;
                case "oval":
                    y == !0 ? (h = t / 2, c = i / 2) : (h = Number(rsuAttr(n, "rsu:mrx")), h < t / 2 && (h = t / 2), c = Number(rsuAttr(n, "rsu:mry")), c < i / 2 && (c = i / 2));
                    shapeGroup.prepend(s.ellipse(r + t / 2, u + i / 2, h, c).attr({
                        id: l,
                        fill: FILL,
                        stroke: "none"
                    }));
                    break;
                case "square":
                    a = undefined;
                    y == !0 ? (k == !0 && (r += (t - t / Math.SQRT2) / 2, u += (i - i / Math.SQRT2) / 2, i /= Math.SQRT2, t /= Math.SQRT2), a = Math.min(t, i), i > t ? u += (i - t) / 2 : r += (t - i) / 2) : (a = Math.max(t, i), i > t ? r -= (i - t) / 2 : u -= (t - i) / 2);
                    shapeGroup.prepend(s.rect(r, u, a, a).attr({
                        id: l,
                        fill: FILL,
                        stroke: "none"
                    }));
                    break;
                default:
                    y == !0 && k == !0 && (r += (t - t / Math.SQRT2) / 2, u += (i - i / Math.SQRT2) / 2, i /= Math.SQRT2, t /= Math.SQRT2);
                    shapeGroup.prepend(s.rect(r, u, t, i).attr({
                        id: l,
                        fill: FILL,
                        stroke: "none"
                    }))
            }
            updateDimensionsDisplay()
        }
    },
    getFullImpressionSize = function() {
        var n = 0;
        if (layoutGroups[0] == undefined || layoutGroups[0].length == 0) return {};
        for (; n < textGroups.length; n++) setGroupTextSize(n);
        for (n = 0; n < graphicGroups.length; n++) setGroupGraphicSize(n);
        for (n = 0; n < fixedGroups.length; n++) setGroupFixedSize(n);
        for (n = 0; n < bodyGroups.length; n++) setGroupBodySize(n);
        for (setMinSizes(), n = 0; n < subGroups.length; n++) getImpressionSize(subGroups[n], layoutGroups[n + 1], syncGroups[n + 1], getGroupBorderInfo(n + 1)), overrideGroupSize(subGroups[n]);
        return getImpressionSize(impressionGroup, layoutGroups[0], syncGroups[0], null)
    },
    getImpressionSize = function(n, t, i, r) {
        var e = undefined,
            k = rsuAttr(impressionGroup, "rsu:scale"),
            o, c, yt, pt, it, v, rt, ut, nt, s, lt, ft, et, d, y, p, w, b, tt, f, ct;
        e = k == undefined || n.rsuismt == undefined ? 1 : Number(k);
        e = k = 1;
        o = undefined;
        c = undefined;
        i.length != 0 && (o = Math.max.apply(Math, i.map(function(n) {
            return Number(rsuAttr(n, "rsu:width"))
        })), c = Math.max.apply(Math, i.map(function(n) {
            return Number(rsuAttr(n, "rsu:height"))
        })), o = Math.max(o, minSyncWidth), c = Math.max(c, minSyncHeight));
        var u = {
                width: 0,
                height: 0,
                rx: 0,
                ry: 0,
                r: 0
            },
            l = [],
            vt = function(n) {
                var r = t[n],
                    h = undefined,
                    a = undefined,
                    i, y, s;
                hasrsuAttr(r, "rsu:odx") == !0 && (h = Number(rsuAttr(r, "rsu:odx")));
                hasrsuAttr(r, "rsu:ody") == !0 && (a = Number(rsuAttr(r, "rsu:ody")));
                l[n] = {
                    width: Number(rsuAttr(r, "rsu:width")),
                    height: Number(rsuAttr(r, "rsu:height")),
                    id: getShortIdFromGroupId(r.attr("id")),
                    rx: Number(rsuAttr(r, "rsu:rx")),
                    ry: Number(rsuAttr(r, "rsu:ry")),
                    r: Number(rsuAttr(r, "rsu:r")),
                    xt: 0,
                    yt: 0,
                    odx: h,
                    ody: a,
                    bxt: 0,
                    byt: 0,
                    g: r,
                    margin: hasrsuAttr(r, "rsu:mo") ? Number(rsuAttr(r, "rsu:mo")) / k : internalMargin / k
                };
                i = l[n];
                i.alignels = getAlignmentElements(r);
                h == undefined && o == undefined && i.alignels.syncExpand != undefined && i.alignels.syncExpand.substr(0, 4) == "full" && (i.alignels.syncExpand = "best" + i.alignels.syncExpand.substr(4));
                i.alignels.syncExpand != undefined && i.alignels.syncExpand.substr(0, 4) == "full" && (i.odx != undefined ? (i.xGroupMaxOffset = i.odx, i.maxGroupWidth = i.width) : o != undefined && (i.xGroupMaxOffset = Math.max(0, (o - i.width) / 2)), i.ody != undefined ? (i.yGroupMaxOffset = i.ody, i.maxGroupHeight = i.height) : c != undefined && (i.yGroupMaxOffset = Math.max(0, (c - i.height) / 2)));
                y = undefined;
                yt = function() {};
                pt = function() {};
                var f = undefined,
                    e = undefined,
                    p = function(t) {
                        it = function(n) {
                            switch (n) {
                                case "full":
                                    i.height = i.maxGroupHeight != undefined ? i.maxGroupHeight : c;
                                    i.width = i.maxGroupWidth != undefined ? i.maxGroupWidth : o;
                                    i.yt += i.yGroupMaxOffset;
                                    i.xt += i.xGroupMaxOffset;
                                    break;
                                case "fullwidth":
                                    i.width = i.maxGroupWidth != undefined ? i.maxGroupWidth : o;
                                    i.xt += i.xGroupMaxOffset;
                                    break;
                                case "fullheight":
                                    i.height = i.maxGroupHeight != undefined ? i.maxGroupHeight : c;
                                    i.yt += i.yGroupMaxOffset
                            }
                        };
                        f = undefined;
                        e = undefined;
                        var r = undefined,
                            s = i.alignels.sides[t];
                        if (s.id == undefined)
                            if (s.align == null) s.align = n == 0 ? "left" : inverseAlignment(l[n - 1].alignels.align);
                            else {
                                i.alignels.syncExpand != undefined && i.alignels.syncExpand.substr(0, 4) == "full" && it(i.alignels.syncExpand);
                                switch (s.align) {
                                    case "bottom":
                                        i.height < u.height && (i.yt = i.byt = u.height - i.height);
                                        break;
                                    case "right":
                                        i.width < u.width && (i.xt = i.bxt = u.width - i.width);
                                        break;
                                    case "center":
                                        i.height < u.height && (i.yt = i.byt = (u.height - i.height) / 2);
                                        i.width < u.width && (i.xt = i.bxt = (u.width - i.width) / 2)
                                }
                            } else(function() {
                            r = l.find(function(n) {
                                return n.id === s.id
                            });
                            var n = function n(t) {
                                switch (t) {
                                    case "t":
                                        e = r.byt;
                                        break;
                                    case "b":
                                        e = r.byt + r.height;
                                        break;
                                    case "l":
                                        f = r.bxt;
                                        break;
                                    case "r":
                                        f = r.bxt + r.width;
                                        break;
                                    case "c":
                                        f = r.bxt;
                                        e = r.byt;
                                        break;
                                    case "o":
                                        n(inverseAlignmentSide(r.alignels.sides[0].align));
                                        break;
                                    case "a":
                                        n(alignmentSide(r.alignels.sides[0].align))
                                }
                            };
                            n(s.side)
                        })();
                        v = function(n, t) {
                            var u = function() {
                                    i.width <= r.width ? i.xt += (r.width - i.width) / 2 : t == !0 && (r.xt += (i.width - r.width) / 2)
                                },
                                f = function() {
                                    i.height <= r.height ? i.yt += (r.height - i.height) / 2 : t == !0 && (r.yt += (i.height - r.height) / 2)
                                };
                            switch (i.alignels.syncExpand) {
                                case "best":
                                    switch (n) {
                                        case "top":
                                        case "bottom":
                                            u();
                                            break;
                                        case "left":
                                        case "right":
                                            f();
                                            break;
                                        case "center":
                                            u();
                                            t == !0 && i.id.charAt(0) == "t" || f()
                                    }
                                    break;
                                case "width":
                                    u();
                                    break;
                                case "height":
                                    f();
                                    break;
                                case "full":
                                case "fullwidth":
                                case "fullheight":
                                    it(i.alignels.syncExpand)
                            }
                        };
                        rt = function rt(n, t) {
                            var c, s, u;
                            switch (n) {
                                case "top":
                                    t == !0 ? (r.yt += i.height, r.byt += i.height, i.height > 0 && r.height > 0 && (r.byt += i.margin, r.yt += i.margin)) : (i.yt += e, i.byt += e, i.height > 0 && r.height > 0 && (i.byt += i.margin, i.yt += i.margin));
                                    v(n, t);
                                    break;
                                case "bottom":
                                    i.yt += e;
                                    i.byt += e;
                                    i.height > 0 && r.height > 0 && (i.yt += i.margin, i.byt += i.margin);
                                    v(n, t);
                                    break;
                                case "left":
                                    t == !0 ? (r.xt += i.width, r.bxt += i.width, i.width > 0 && r.width > 0 && (r.xt += i.margin, r.bxt += i.margin)) : (i.xt += f, i.bxt += f, i.width > 0 && r.width > 0 && (i.xt += i.margin, i.bxt += i.margin));
                                    v(n, t);
                                    break;
                                case "right":
                                    i.xt += f;
                                    i.bxt += f;
                                    i.width > 0 && r.width > 0 && (i.xt += i.margin, i.bxt += i.margin);
                                    v(n, t);
                                    break;
                                case "center":
                                    if (i.id.charAt(0) == "t") {
                                        var l = Number(i.id.substr(1, 2)),
                                            o = getValidTextLinesInGroup(l),
                                            h = o.length;
                                        if (h > 0 && r.height > 0) {
                                            for (c = Math.floor(h / 2), s = 0, u = 0; u < c; u++) s += Number(rsuAttr(o[u], "rsu:height"));
                                            for (r.yt += s + i.margin, r.byt += s + i.margin, i.dy = r.height + i.margin, u = c; u < h; u++) o[u].attr("dy", i.dy), underlineTextElement(o[u])
                                        }
                                    }
                                    v(n, t);
                                    break;
                                case "opposite":
                                    rt(inverseAlignment(r.alignels.sides[0].align), !0);
                                    return
                            }
                        };
                        r != null && rt(s.align, !1)
                    };
                for (s = 0; s < i.alignels.sides.length; s++) p(s)
            };
        for (f = 0; f < t.length; f++) vt(f);
        for (ut = 0, nt = undefined, f = 0; f < t.length; f++) l[f].width != 0 && (ut++, nt = f);
        for (ut < 2 && nt != undefined ? (s = l[nt], u.width = s.width, u.height = s.height, u.r = s.r, u.rx = s.rx, u.ry = s.ry, s.g.transform("translate(" + s.xt + "," + s.yt + ")")) : (lt = function() {
                var i = 0,
                    f, e, r, n;
                for (u.width = 0, u.height = 0, r = 0; r < t.length; r++) n = l[r], u.width = Math.max(u.width, n.width + n.xt - (n.xGroupMaxOffset == undefined ? 0 : n.xGroupMaxOffset)), u.height = n.id.charAt(0) == "t" ? Math.max(u.height, (n.dy == undefined ? 0 : n.dy) + n.height + n.yt - (n.yGroupMaxOffset == undefined ? 0 : n.yGroupMaxOffset)) : Math.max(u.height, n.height + n.yt - (n.yGroupMaxOffset == undefined ? 0 : n.yGroupMaxOffset));
                for (f = u.width / 2, e = u.height / 2, r = 0; r < t.length; r++) n = l[r], n.g.transform("translate(" + n.xt + "," + n.yt + ")"), i = Math.max(i, Math.hypot(n.xt - f, n.yt - e)), i = Math.max(i, Math.hypot(n.xt + n.width - f, n.yt - e)), i = Math.max(i, Math.hypot(n.xt - f, n.yt + n.height - e)), i = Math.max(i, Math.hypot(n.xt + n.width - f, n.yt + n.height - e));
                u.rx = u.width / Math.SQRT2;
                u.ry = u.height / Math.SQRT2;
                u.r = i
            }, lt()), ft = 0, et = 0, checkEmptyDesign(), d = 0; d < matchingGroups.length; d++)
            if (matchingGroups[d].group == n) {
                matchingGroups[d].pbrs = Object.assign({}, u);
                break
            }
        if (r != null && r.shapeStrokeWidth != 0 && dEmpty == !1) {
            var ot = externalMargin,
                at = Object.assign({}, u),
                st = getUserSize(n),
                g = rsuAttr(r.impressionBorder, "rsu:shape");
            if (rsuAttr(r.impressionBorder, "rsu:enclose") == "2" && st != null) {
                var ht = 0,
                    h = st.w,
                    a = st.h;
                (g == "square" || g == "circle") && (h = a = Math.min(h, a));
                u.width = h;
                u.height = a;
                u.r = g == "circle" ? Math.max(h, a) / 2 : Math.max(h, a) / Math.SQRT2;
                u.rx = h / 2;
                u.ry = a / 2;
                y = (r.shapeStrokeWidth + ht * 2) / 2;
                _updateShapeSize(r.impressionBorder, g, h - y * 2, a - y * 2, h / 2 - y, a / 2 - y, h / 2 - y, r.shapeStrokeWidth / 2 + ht, r.shapeStrokeWidth / 2 + ht, undefined, undefined, !0)
            } else p = r.shapeStrokeWidth / 2 + borderMargin, _updateShapeSize(r.impressionBorder, g, u.width + p * 2, u.height + p * 2, u.rx + p, u.ry + p, u.r + p, r.shapeStrokeWidth / 2 + ot, r.shapeStrokeWidth / 2 + ot, undefined, undefined, !0), w = getShapeSizes(r.impressionBorder), b = r.shapeStrokeWidth + ot * 2, u.width = w.width + b, u.height = w.height + b, u.r = w.r + b / 2, u.rx = w.rx + b / 2, u.ry = w.ry + b / 2;
            for (ft = (u.width - at.width) / 2, et = (u.height - at.height) / 2, setBorderType(r.impressionBorder, r.borderType, r.shapeStrokeWidth), tt = undefined, f = 0; f < t.length; f++) ct = t[f], tt = ct.transform(), translateWithScale(ct, Number(tt.localMatrix.e + ft), Number(tt.localMatrix.f + et))
        }
        return rsuAttr(n, {
            "rsu:mwidth": u.width * e,
            "rsu:mheight": u.height * e,
            "rsu:mrx": u.rx * e,
            "rsu:mry": u.ry * e,
            "rsu:mr": u.r * e
        }), rsuAttr(n, {
            "rsu:width": u.width * e,
            "rsu:height": u.height * e,
            "rsu:rx": u.rx * e,
            "rsu:ry": u.ry * e,
            "rsu:r": u.r * e
        }), u
    },
    getInitialX = function(n) {
        switch (n) {
            case "left":
                return getShapeX();
            case "center":
                return getShapeX() + getShapeWidth() / 2;
            case "right":
                return getShapeX() + getShapeWidth()
        }
    };
poppedState = undefined;
ssv = !1;
window.addEventListener("popstate", function(n) {
    poppedState = n.state != null && n.state != undefined && n.state.si != undefined ? n.state.si : null
}, !1);
window.addEventListener("unload", function() {
    saveState()
}, !1);
var saveState = function(n) {
        ssv == !1 && history.replaceState(getSaveState(), "curdesign");
        n != undefined && (ssv = n)
    },
    updateLoginControls = function() {
        $("#save-btn").text(bvLoggedIn() == !0 ? "Save Design" : "Login To Save")
    },
    borderChanged = function() {
        setShapeStrokeWidth();
        impressionBorder.attr("strokeWidth", shapeStrokeWidth)
    },
    artToPosition = {},
    getSaveState = function() {
        var n = {
            si: si
        };
        return n.si.initialTemplate = rsuOuterSVG(impressionGroup), n.si.page = getPageState(), n.si.bodies = getSelectedBodyAttributes(), n.si.overrides = getGroupSizeOverrides(), n.si.undoSize = undoSize, n.si._fixedWidth = fixedWidth, n.si._fixedHeight = fixedHeight, n
    },
    getPageState = function() {
        var n = {
                tab: "#" + $('[data-section="tabs"] > .active > p a')[0].id,
                shape: $("#shape-dropdown option:selected").val()
            },
            t;
        if (n.tab == "#tabs--image-a" && (n.imgPage = "#" + $("#artwork > section.active")[0].id, t = $('#artwork--options input[name="artwork-links"]:checked'), t.length > 0)) {
            n.imgOpt = "#" + t[0].id;
            n.imgPage == "#artwork--position" && (n.p3 = {
                size: getImgPercent(),
                align: $("#position-controls .active")
            }, n.p3.align = n.p3.align.length > 0 ? String($(n.p3.align)[0].classList[0]) : "align-image-top", n.imgPage = artToPosition.artType == "clip" ? "#artwork--browse" : "#artwork--library", n.imgOpt == "#upload-link" && (n.imgOpt = "#library-link"));
            switch (n.imgPage) {
                case "#artwork--browse":
                    n.p1 = $("#artwork--browse .clip-image-active").data("clipfile");
                    n.p2 = $("#clipart-select option:selected").val();
                    break;
                case "#artwork--library":
                    n.p1 = $("#artwork--library .clip-image-active").data("clipfile")
            }
        }
        return n
    };
$(document).ready(function() {
    "use strict";
    poppedState != undefined ? poppedState != null && (si = poppedState) : history.state != null && history.state != undefined && history.state.si != undefined && (si = history.state.si);
    $(document).foundation();
    var t = function() {
            _gShowMessage = showMessage;
            _gShowError = showError;
            myCanvas = document.createElement("canvas");
            setupliFinishedCallback(_upliFinishedCallback);
            s = Snap("#s");
            typeof si == "undefined" && (si = initsi);
            n()
        },
        n = function() {
            var a, d, ft, w, i, et, ot, u, v, o, g, st, b, p, nt, e, n, t, c, ht, tt, k, yt, r, ct, it, lt, l, y, h, f, rt;
            for (inLoad = 2, updateLoginControls(), i = 0; i < textGroups.length; i++) {
                var ut = textGroupLines[i],
                    at = ut.length,
                    vt = textGroupEditors[i];
                for (a = 0; a < at; a++) ut[a].remove(), (a > 0 || i > 0) && $(vt[a]).remove();
                textGroupEditors[i] = [];
                textGroupLines[i] = [];
                i > 0 && $("#group" + singleZeroPad(i)).remove()
            }
            for (textGroups = [], i = 0; i < graphicGroups.length; i++) {
                for (d = graphicGroupElements[i], ft = d.length, w = 0; w < ft; w++) d[w].remove();
                graphicGroupElements[i] = [];
                graphicGroups[i].remove()
            }
            for (graphicGroups = [], i = 0; i < fixedGroups.length; i++) fixedGroups[i].remove();
            for (fixedGroups = [], i = 0; i < bodyGroups.length; i++) bodyGroups[i].remove();
            bodyGroups = [];
            impressionBorder != undefined && (impressionBorder.remove(), impressionBorder = undefined);
            impressionGroup != undefined && (impressionGroup.remove(), impressionGroup = undefined);
            shape != undefined && shape.remove();
            shapeGroup != undefined && shapeGroup.remove();
            removeImage(!1);
            $(".text-editor .active").removeClass("active");
            $("#border1").attr("checked", !0);
            textGroupLines = [];
            textGroupEditors = [];
            graphicGroups = [];
            graphicGroupElements = [];
            fixedWidth = STARTING_SIZE;
            fixedHeight = STARTING_SIZE;
            shapeStrokeWidth = 0;
            shapeStrokeDasharray = "0";
            shapeStrokeDashoffset = 0;
            shapeStrokeLinecap = "square";
            showImageTab() ? $("#tabs--image").parent().show() : $("#tabs--image").parent().hide();
            showBorderTab() ? ($("#tabs--border").parent().show(), $("#shape-dropdown").show(), $(".regularstamp").show()) : ($("#tabs--border").parent().hide(), $("#shape-dropdown").hide(), $(".regularstamp").hide());
            showUserDimensions() || $("#edit-dimensions-button").hide();
            et = SVG_CENTER_X - fixedWidth / 2;
            ot = SVG_CENTER_Y - fixedHeight / 2;
            $("#aspnetForm")[0].reset();
            u = "rectangle";
            si.page != undefined && ($(si.page.tab).click(), si.page.imgPage != undefined && ($(si.page.imgPage).click(), si.page.imgOpt != undefined && $(si.page.imgOpt).prop("checked", !0)), si.page.shape != undefined && (u = si.page.shape), setGroupSizeOverrides(si.overrides));
            $("#stamp-name").show(si.p1 != undefined && si.p1.length > 0 ? !0 : !1);
            $("#stamp-name-label").text(si.p1);
            $("#new-stamp-name").text(si.p1);
            setGraphicColor("#000000");
            shapeGroup = s.g().attr({
                id: "gsvgshape"
            });
            switch (u) {
                case "circle":
                    shape = shapeGroup.circle(SVG_CENTER_X, SVG_CENTER_Y, Math.max(fixedWidth, fixedHeight) / 2).attr({
                        id: "shape",
                        fill: FILL,
                        stroke: "none"
                    });
                    break;
                case "oval":
                    shape = shapeGroup.ellipse(SVG_CENTER_X, SVG_CENTER_Y, fixedWidth / Math.SQRT2, fixedHeight / Math.SQRT2).attr({
                        id: "shape",
                        fill: FILL,
                        stroke: "none"
                    });
                    break;
                default:
                    shape = shapeGroup.rect(et, ot, fixedWidth, fixedHeight).attr({
                        id: "shape",
                        fill: FILL,
                        stroke: "none"
                    })
            }
            if (isWizard() || rsuAttr(shape, "rsu:shape", isWizard() ? u : "rectangle"), v = undefined, o = 1, si.initialTemplate != undefined && si.initialTemplate != null && si.initialTemplate.length > 0) {
                if (v = rsuParse(si.initialTemplate), impressionGroup = v.select("#gsvgimpression"), impressionGroup != null)
                    for (o = rsuAttr(impressionGroup, "rsu:scale"), o == null && (o = 1), shapeGroup.append(impressionGroup), g = shapeGroup.selectAll("textPath"), st = function(n) {
                            var t = g[n].node,
                                i = function() {
                                    for (var i = t.childNodes.length, n = i - 1; n > -1; n--) t.childNodes[n].nodeType == 3 && t.removeChild(t.childNodes[n])
                                };
                            i();
                            t = t.parentNode;
                            i()
                        }, b = 0; b < g.length; b++) st(b);
                else impressionGroup = undefined;
                impressionGroup != undefined && ENABLE_BORDER != "" && (o != undefined ? ($("#impression-scale").val(Number(o)), reScale(Number(o), !0)) : reScale(1, !0), h = ENABLE_BORDER, f = impressionGroup.select("#svgsubgroup" + h.slice(-2)), impressionBorder = f.select("#svgborder" + h.slice(-2)), impressionBorder != null ? (e = rsuAttr(impressionBorder, "rsu:shape"), u = e, rsuAttr(f, "rsu:shape", e), $("#shape-dropdown").val(e), p = [rsuAttr(impressionBorder, "rsu:border")], p.length == 1 && p[0] == null && (p = ["no"]), $("input[name=stamp-border]").val(p), nt = impressionBorder.attr("stroke-width"), setBorderDropdown(nt.substr(0, nt.length - 2)), borderChanged(), isWizard() && _updateShapeSize(shape, e, Number(rsuAttr(impressionGroup, "rsu:width")), Number(rsuAttr(impressionGroup, "rsu:height")), Number(rsuAttr(impressionGroup, "rsu:rx")), Number(rsuAttr(impressionGroup, "rsu:ry")), Number(rsuAttr(impressionGroup, "rsu:r")))) : f.length > 0 && (e = rsuAttr(f, "rsu:shape"), $("#shape-dropdown").val(e != null ? u = e : "rectangle")));
                impressionBorder == null && (impressionBorder = undefined)
            }
            if (impressionGroup == undefined && (impressionGroup = shapeGroup.g().attr({
                    id: "gsvgimpression",
                    xmlns: "http://www.w3.org/2000/svg"
                }), rsuAttr(impressionGroup, "rsu:shape", "rectangle")), n = 0, t = undefined, v != undefined) {
                c = undefined;
                do c = "#svgsubgroup" + singleZeroPad(n), t = impressionGroup.select(c), t != null && (subGroups[n++] = t); while (t != null);
                isWizard() && (setDisplayShapes(u), rsuAttr(shape, "rsu:shape", u));
                n = 0;
                do c = "#svgfixedgroup" + singleZeroPad(n), t = impressionGroup.select(c), t != null && (fixedGroups[n++] = t); while (t != null);
                do c = "#svgbodygroup" + singleZeroPad(n), t = impressionGroup.select(c), t != null && (bodyGroups[n++] = t); while (t != null)
            }
            n = 0;
            do k = "svgtextgroup" + singleZeroPad(n), t = null, v != undefined && (t = getParentSubGroup("t" + singleZeroPad(n)).select("#" + k)), textGroupLines[n] = [], textGroupEditors[n] = ["#text" + singleZeroPad(n) + "-00"], ht = function() {
                addTextToSVG(n, 0);
                textGroupLines[n][0].attr("x", SVG_CENTER_X - MIN_STAMP_SIZE_X / 2);
                textGroupLines[n][0].attr("text-anchor", "left");
                highlightAlignment(n, 0, "center");
                rsuAttr(textGroupLines[n][0], "rsu:align", "center");
                changeLineFont(textGroupLines[n][0], $("#text" + singleZeroPad(n) + "-00 .text-font").val())
            }, t != null && function() {
                var i, r, u;
                textGroups[n] = t;
                n > 0 && addTextEditorGroup(n, selectizeInitParams);
                tt = $("#text" + singleZeroPad(n) + "-00 select.text-size").selectize(selectizeInitParams)[0].selectize;
                tt.addOption({
                    text: START_FONT_SIZE + " pt",
                    value: START_FONT_SIZE
                });
                tt.setValue(START_FONT_SIZE);
                i = 0;
                r = t.selectAll("text[id^=svgtext" + singleZeroPad(n) + "-]");
                r.forEach(function(t) {
                    i = Number(t.node.id.substr(t.node.id.length - 2, 2));
                    t.data("dirty", !0);
                    textGroupLines[n][i] = t;
                    i > 0 ? addTextEditor("#group" + singleZeroPad(n), $("#group" + singleZeroPad(n) + ' div[id^="text"]:last'), !1) : configureTextEditor(n, i, undefined, undefined, !0);
                    initTextEditorFromSVG(n, i, selectizeInitParams);
                    setCharacterSpacing({
                        group: n,
                        line: i
                    })
                });
                r.length == 0 && (ht(), configureTextEditor(n, 0));
                r.length > 1 && $("#group" + singleZeroPad(n) + " .remove").addClass("active");
                u = rsuLabelEscape(rsuAttr(t, "rsu:label"));
                u != null && $("#tabs--groupheader" + singleZeroPad(n)).html(u);
                n++
            }(); while (t != null);
            n = 0;
            do k = "svggraphicgroup" + singleZeroPad(n), t = null, v != undefined && (t = getParentSubGroup("g" + singleZeroPad(n)).select("#" + k)), graphicGroupElements[n] = [], t == null ? si.page != undefined && si.page.imgPage != undefined && si.page.imgPage != "#artwork--options" && $(si.page.imgOpt).trigger("click", [si.page.p1, si.page.p2, si.page.p3]) : (graphicGroups[n] = t, yt = 0, r = t.select("image"), r != null && (_impressionBusy(), htmlGraphics[n] = new Image, htmlGraphics[n].crossOrigin = "", $(htmlGraphics[n]).bind("load error abort", function() {
                _impressionDone()
            }), htmlGraphics[n].src = r.attr("xlink:href"), graphicGroupElements[n][0] = r, r.attr("filter", "url(#gr-filt)"), $("#artwork--options").removeClass("active"), $("#artwork--upload").removeClass("active"), $("#artwork--browse").removeClass("active"), $("#artwork--library").removeClass("active"), $("#artwork--position").addClass("active"), $("#image-size-percent").show(), $("#image-size-choice").hide(), ct = r.attr("xlink:href"), it = rsuAttr(r, "rsu:artworktype"), artToPosition.vectorImageSelected = it == "clip" ? !0 : !1, artToPosition.clip = r, artToPosition.artType = it, artToPosition.nw = Number(rsuAttr(r, "rsu:nwidth")), artToPosition.nh = Number(rsuAttr(r, "rsu:nheight")), artToPosition.nr = Number(rsuAttr(r, "rsu:nr")), artToPosition.nrx = Number(rsuAttr(r, "rsu:nrx")), artToPosition.nry = Number(rsuAttr(r, "rsu:nry")), $("#selected-artwork-image").attr("src", ct), setImgPercent((Number(r.attr("width")) / artToPosition.nw * 100).toFixed(2)), updateArtImpressionSize(), lt = "align-image-" + rsuAttr(t, "rsu:align"), $("#position-controls ." + lt).addClass("active")), n++); while (t != null);
            for (matchingGroups = getListOfLayoutElementsAndIDs(impressionGroup, "rsu:impressiongroups"), matchingGroups.forEach(function(n) {
                    n.group.rsuismt = !0
                }), syncGroups[0] = getListOfLayoutElements(impressionGroup, "rsu:syncgroups"), layoutGroups[0] = getListOfLayoutElements(impressionGroup, "rsu:layoutorder"), l = 0; l < subGroups.length; l++) syncGroups[l + 1] = getListOfLayoutElements(subGroups[l], "rsu:syncgroups"), layoutGroups[l + 1] = getListOfLayoutElements(subGroups[l], "rsu:layoutorder");
            layoutGroups[0].length == 0 && (layoutGroups[0].concat(textGroups), layoutGroups[0].concat(graphicGroups));
            allowAutoSize = !0;
            setAutosize(!0, !0);
            si.bodies != undefined && si.bodies.inkDColor != undefined && cbInkChange(si.bodies.inkDColor);
            y = null;
            subGroups.length > 0 && (y = getUserSize(subGroups[0]), y != null && $("#has_user_dimensions").attr("checked", !0));
            showStampBodies(!1);
            impressionBorder == undefined && (h = ENABLE_BORDER, h.length > 0 && (f = getElementFromShortID(h), impressionBorder = f.rect().attr({
                id: "svgborder" + h.slice(-2)
            }), rsuAttr(impressionBorder, "rsu:shape", u), rsuAttr(f, "rsu:shape", u)));
            isWizard() ? isFixedStamp = !1 : (isFixedStamp = !0, si._fixedWidth != undefined ? (fixedWidth = si._fixedWidth, fixedHeight = si._fixedHeight) : (fixedWidth = si.width * 96, fixedHeight = si.height * 96), groupSizeOverridesFromJSON(si.initialBody.sizeTemplate), (si.page == undefined || si.page.shape == undefined) && u == "rectangle" ? $("#shape-dropdown").val(getDisplayOverride("rectangle")) : $("#shape-dropdown").val(u), setDisplayShapes($("#shape-dropdown option:selected").val()), hasUserDimensions() || ($("#has_user_dimensions").attr("checked", !1), updateShapeSize(fixedWidth, fixedHeight)), setAutosize(!1, !0), si.allowedBodies == null && (allowAutoSize = !1, addBodyOption($("#product00"), si.initialBody), showStampBodies(!0)));
            setAutosize(isAutosize);
            checkEmptyDesign();
            (hasUserDimensions() == !0 || isFixedStamp) && getUndoSize(subGroups[0]) != null && $("#scalereset-btn").show();
            $("#start-over-btn").addClass("disabled");
            rt = rsuAttrFind(textGroups[0], "rsu:allowaddlines");
            rt != null && rt == "false" && ($("#tabs--add-textline00").hide(), $("#group00 .remove").removeClass("active"));
            y != null && setUserDimensions(y.w, y.h, !0, !0);
            updateDimensionsDisplay();
            inLoad = 1
        };

    $("#text00-00--input").on("input", function() {
        var n = getTextLineContext($(this).parent().parent()),
            t = $(this).val();
        textGroupLines[n.group][n.line].selectAll("tspan")[0].attr({
            "#text": t
        });


        setCharacterSpacing(n);
        textGroupLines[n.group][n.line].data("dirty", !0);
        impressionChanged(!1, 2e3)
    });
    $("#text00-00--input").keydown(function(n) {
        if (n.keyCode === 13) return n.preventDefault(), !1
    });
    $("#text00-00 .bold").on("click", function() {
        var i = getTextLineContext($(this).parent().parent().parent()),
            n = textGroupLines[i.group][i.line],
            t = n.attr("fontWeight");
        $(this).toggleClass("active");
        t === "400" ? n.attr({
            fontWeight: "700"
        }) : t === "700" ? n.attr({
            fontWeight: "400"
        }) : t === "normal" ? n.attr({
            fontWeight: "700"
        }) : t === "bold" && n.attr({
            fontWeight: "400"
        });
        changeLineFont(n)
    });

    $("#text00-00 .italic").on("click", function() {
        var t = getTextLineContext($(this).parent().parent().parent()),
            n = textGroupLines[t.group][t.line],
            i = n.attr("fontStyle");
        $(this).toggleClass("active");
        i === "normal" ? n.attr({
            fontStyle: "italic"
        }) : n.attr({
            fontStyle: "normal"
        });
        changeLineFont(n)
    });
    $("#text00-00 .underline").on("click", function() {
        var t = getTextLineContext($(this).parent().parent().parent()),
            n = textGroupLines[t.group][t.line],
            i = rsuAttr(n, "rsu:underline");
        $(this).toggleClass("active");
        i == "true" ? rsuAttr(n, "rsu:underline", "false") : rsuAttr(n, "rsu:underline", "true");
        changeLineFont(n)
    });
    $("#text00-00 .remove").on("click", function() {
        var s = $(this).parent().parent(),
            n = getTextLineContext(s),
            h = n.selector,
            i = $.inArray(h, textGroupEditors[n.group]),
            u, t, r, f, e, o;
        for (underlineTextElement(textGroupLines[n.group][i], !1), textGroupLines[n.group][i].remove(), $(textGroupEditors[n.group][i]).remove(), textGroupLines[n.group].splice(i, 1), textGroupEditors[n.group].splice(i, 1), u = textGroupLines[n.group].length, textGroupLines[n.group][i == u ? u - 1 : i].data("dirty", !0), t = i; t < u; t++) r = formatElementId(n.group, t), textGroupLines[n.group][t].attr("id", "svgtext" + r), f = $("#usvgtext" + formatElementId(n.group, t + 1)), f.length > 0 && (f.attr("id", "usvgtext" + r), underlineTextElement(textGroupLines[n.group][t])), e = $("#group" + singleZeroPad(n.group) + " .text-editor:nth-child(" + (t + 1) + ")"), e.attr("id", "text" + r), textGroupEditors[n.group][t] = "#text" + r;
        setAllDirty(n.group);
        impressionChanged();
        o = textGroupLines[n.group].length;
        o <= 1 && $("#group" + singleZeroPad(n.group) + " .remove").removeClass("active")
    });

    $("#text00-00 .align-left").on("click", function() {
        var n = getTextLineContext($(this).parent().parent().parent()),
            t = textGroupLines[n.group][n.line];
        highlightAlignment(n.group, n.line, "left");
        rsuAttr(t, "rsu:align", "left");
        setTextXPos(t, Number(rsuAttr(t, "rsu:width")), Number(rsuAttr(textGroups[n.group], "rsu:width")), Number(rsuAttr(t, "rsu:xorigin")));
        underlineTextElement(t)
    });
    $("#text00-00 .align-center").on("click", function() {
        var n = getTextLineContext($(this).parent().parent().parent()),
            t = textGroupLines[n.group][n.line];
        highlightAlignment(n.group, n.line, "center");
        rsuAttr(t, "rsu:align", "center");
        setTextXPos(t, Number(rsuAttr(t, "rsu:width")), Number(rsuAttr(textGroups[n.group], "rsu:width")), Number(rsuAttr(t, "rsu:xorigin")));
        underlineTextElement(t)
    });
    $("#text00-00 .align-right").on("click", function() {
        var n = getTextLineContext($(this).parent().parent().parent()),
            t = textGroupLines[n.group][n.line];
        highlightAlignment(n.group, n.line, "right");
        t.attr("rsu:align", "right");
        setTextXPos(t, Number(t.attr("rsu:width")), Number(textGroups[n.group].attr("rsu:width")), Number(t.attr("rsu:xorigin")));
        underlineTextElement(t)
    });
    $("#text00-00 .text-font").change(function() {
        var n = getTextLineContext($(this).parent().parent()),
            t = textGroupLines[n.group][n.line],
            i = $(this).val();
        inLoad == 1 && (inLoad = 0);
        changeLineFont(t, i)
    });
    $(".cancel-button").click(function() {
        $(this).closest(".reveal-modal").foundation("reveal", "close")
    });
    $("#has_user_dimensions").change(function() {
        var n = $(this).is(":checked");
        $("#stamp_width").prop("disabled", !n);
        $("#stamp_height").prop("disabled", !n)
    });
    $(".tabs--add-textline").on("click", function() {
        var n = "#" + $(this).parent().parent().attr("id"),
            t = $('div[id^="text"]:last', $(this).parent().parent());
        addTextEditor(n, t, !0)
    });
    $("#shape-dropdown").change(function() {
        setDisplayShapes($("#shape-dropdown option:selected").val());
        impressionChanged()
    });
    $("#dropdown-border-weight").change(function() {
        borderChanged();
        impressionChanged()
    });
    $("#position-controls img").on("click", function() {
        if ($(this).hasClass("disabled")) return event.preventDefault(), !1;
        $(this).parent().parent().find("img").removeClass("active");
        $(this).addClass("active");
        impressionChanged(!1, 250)
    });
    $(".change-artwork-image .remove-image").on("click", function() {
        removeImage(!0)
    });
    $("#d-image-tab").on("click", function() {
        setupArtworkPositionOptions()
    });
    $("#upload-link").on("click", function() {
        $("#artwork--back-link").addClass("active");
        $("#artwork--options").removeClass("active");
        $("#artwork--upload").addClass("active");
        $("#artwork--browse").removeClass("active");
        $("#artwork--library").removeClass("active");
        $("#artwork--position").removeClass("active")
    });
    $("#browse-link").on("click", function(n, t, i, r) {
        $("#artwork--back-link").addClass("active");
        $("#artwork--options").removeClass("active");
        $("#artwork--upload").removeClass("active");
        $("#artwork--browse").addClass("active");
        $("#artwork--library").removeClass("active");
        $("#artwork--position").removeClass("active");
        $("#gallery-position-link").addClass("disabled");
        $("#clipart-select > option").length == 1 && (_grBusy(), GetClipartCategories(function(n) {
            for (var f = $("#clipart-select"), e = f.find("option").attr("class"), u = 0; u < n.d.length; u++) f.append($('<option class="' + e + '" />').val(n.d[u].categoryName.replace(/ /g, "_")).text(n.d[u].categoryName));
            i != undefined && (f.val(i), selectClipartGallery(i, t, r));
            _grDone()
        }, function(n, t, i) {
            gShowError("Error retrieving clipart", n, t, i);
            _grDone()
        }))
    });
    $("#library-link").on("click", function(n, t, i, r) {
        $("#artwork--back-link").addClass("active");
        $("#artwork--options").removeClass("active");
        $("#artwork--upload").removeClass("active");
        $("#artwork--browse").removeClass("active");
        $("#artwork--library").addClass("active");
        $("#artwork--position").removeClass("active");
        $("#library-position-link").addClass("disabled");
        updateLibraryImages(!1, {
            clip: t,
            doPos: r
        })
    });
    $("#scalefit-btn").on("click", function() {
        cbDoScale(!0)
    });
    $("#scalereset-btn").on("click", function() {
        resetScale();
        impressionChanged();
        $("#impression-scale").val(1)
    });
    $("#impression-scale").on("input", function() {
        if ($(this).hasClass("disabled") != !0) {
            var n = Number($("#impression-scale").val());
            reScale(n)
        }
    });
    $("#impression-auto-scale").on("change", function() {
        $(this).is(":checked") ? ($("#impression-scale").addClass("disabled"), autoScale = !0) : ($("#impression-scale").removeClass("disabled"), autoScale = !1);
        checkShapeAutoSize(!1, 100)
    });
    $("#image-size-choice").change(function() {
        impressionChanged(!1, 2e3)
    });
    $("#image-size-percent").on("input blur keydown", function(n) {
        imgSizeEvent(n, "p")
    });
    $("#image-size-width").on("input blur keydown", function(n) {
        imgSizeEvent(n, "w")
    });
    $("#image-size-height").on("input blur keydown", function(n) {
        imgSizeEvent(n, "h")
    });
    $("#gallery-position-link").on("click", function(n, t) {
        if (!$(this).hasClass("disabled")) {
            $("#artwork--back-link").removeClass("active");
            $("#artwork--options").removeClass("active");
            $("#artwork--upload").removeClass("active");
            $("#artwork--browse").removeClass("active");
            $("#artwork--library").removeClass("active");
            $("#artwork--position").addClass("active");
            $("#image-size-percent").show();
            $("#image-size-choice").hide();
            t != undefined ? (setImgPercent(t.size), $("#position-controls ." + t.align).addClass("active")) : $("#position-controls .active").length == 0 && $("#position-controls .align-image-top").addClass("active");
            var i = $("#artwork--browse .clip-image-active > img"),
                r = i.attr("src");
                console.warn(r);
            artToPosition.vectorImageSelected = !0;
            artToPosition.clip = i;
            artToPosition.artType = "clip";
            setArtSizeInfo();
            $("#selected-artwork-image").attr("src", r)
        }
    });
    $("#library-position-link").on("click", function(n, t) {
        if (!$(this).hasClass("disabled")) {
            $("#artwork--back-link").removeClass("active");
            $("#artwork--options").removeClass("active");
            $("#artwork--upload").removeClass("active");
            $("#artwork--browse").removeClass("active");
            $("#artwork--library").removeClass("active");
            $("#artwork--position").addClass("active");
            $("#image-size-percent").show();
            $("#image-size-choice").hide();
            t != undefined ? (setImgPercent(t.size), $("#position-controls ." + t.align).addClass("active")) : $("#position-controls .active").length == 0 && $("#position-controls .align-image-top").addClass("active");
            var i = $("#artwork--library .clip-image-active > img"),
                r = i.attr("src");
            artToPosition.vectorImageSelected = !1;
            artToPosition.clip = i;
            artToPosition.artType = "user";
            setArtSizeInfo();
            $("#selected-artwork-image").attr("src", r)
        }
    });
    $("#apply-image-link").on("click", function() {
        setGraphicInfo()
    });
    $("#clipart-select").change(function() {
        var n = $("#clipart-select option:selected").val();
         

        n != undefined && selectClipartGallery(n)
    });
    $("#artwork--back-link").on("click", function() {
        if ($("#artwork--position").hasClass("active")) {
            $("#artwork--position").removeClass("active");
            switch ($("input[name='artwork-links']:checked").val()) {
                case "upload":
                    $("#artwork--upload").addClass("active");
                    break;
                case "browse":
                    $("#artwork--browse").addClass("active");
                    break;
                case "library":
                    $("#artwork--library").addClass("active")
            }
        } else $(this).removeClass("active"), $("#artwork--options").addClass("active"), $("#artwork--upload").removeClass("active"), $("#artwork--browse").removeClass("active"), $("#artwork--position").removeClass("active"), $("#artwork--library").removeClass("active")
    });
    $("input[name=stamp-border]").change(function() {
        setBorderType();
        impressionChanged(!0)
    });
    $("#save-btn").on("click", function() {
        if ($(this).hasClass("disabled") != !0) {
            if (bvLoggedIn() == 0) {
                loginReturn = 1;
                $(".startlogin").trigger("click");
                return
            }
            $("#save-modal").foundation("reveal", "open")
        }
    });
    $("#save-button").on("click", function() {
        if ($(this).hasClass("disabled") != !0) {
            var n = $("#new-stamp-name").val(),
                t = getSelectedBodyAttributes();
            SaveUserDesign(si.user, n, si.templateProductId, rsuOuterSVG(impressionGroup), t.productId, t.inkColor, function(t) {
                if (t.d.resultCode == 4) {
                    bvLoggedIn(0);
                    loginReturn = 1;
                    setTimeout(function() {
                        $(".startlogin").trigger("click")
                    }, 1);
                    return
                }
                $("#stamp-name").show(n.length > 0 ? !0 : !1);
                $("#stamp-name-label").text(n);
                si.p1 = n;
                showMessage("Save Design", t.d.resultCode == 0 ? n + " saved" : n + " " + t.d.resultMessage)
            }, function(n, t, i) {
                gShowError("Error saving design", n, t, i)
            })
        }
    });
    $("#resize-apply-button").on("click", function() {
        var n = Number($("#stamp_width").val()),
            t = Number($("#stamp_height").val()),
            i;
        if (n < .25 || t < .25) {
            alert("The minimum dimension allowed is .25 inches");
            return
        }
        if (impressionChanged(), chkmaxhw(n, t)) {
            alert("The maximum allowed shortest dimension is 3.75 inches, and the maximum allowed largest dimension is 6 inches");
            return
        }
        i = getScale();
        i != 1 && (scaleUIDisplay(1 / i), reScale(1, !0), clearScale());
        n *= 96;
        t *= 96;
        setUserDimensions(n, t, $("#has_user_dimensions").is(":checked"), !1, !1, !0);
        $("#stamp_width").prop("disabled", !0);
        $("#stamp_height").prop("disabled", !0);
        $("#resize-modal").foundation("reveal", "close")
    });
    $("#start-over-btn").on("click", function() {
        $(this).hasClass("disabled") != !0 && (history.replaceState(null, "curdesign"), si = initsi, n())
    });
    $("#proof-btn").on("click", function() {
        if ($(this).hasClass("disabled") != !0) {
            var i = undefined,
                t = !0,
                n = Math.floor(Math.random() * Math.floor(3e4));
            window.open("/StampProof.aspx?id=" + n, "_blank");
            GetProof(n, rsuOuterSVG(impressionGroup), function() {}, function(n, i, r) {
                t = !1;
                gShowError("Error creating proof", n, i, r)
            })
        }
    });
    $("#autosize-toggle").on("click", function() {
        allowAutoSize != !1 && (setAutosize(!isAutosize), $(".reveal-modal").foundation("reveal", "close"))
    });
    $("#edit-dimensions-button").on("click", function() {
        $("#stamp_width").prop("disabled", !$("#has_user_dimensions").is(":checked"));
        $("#stamp_height").prop("disabled", !$("#has_user_dimensions").is(":checked"));
        $("#resize-modal").foundation("reveal", "open")
    });
    $("#image-size-percent,#image-size-width,#image-size-height").keydown(function(n) {
        n.keyCode === 13 && (n.preventDefault(), imgSizeEvent(n, n.target.id == "image-size-percent" ? "p" : n.target.id == "image-size-width" ? "w" : "h"), $("#apply-image-link").click())
    });
    setTimeout(function() {
        t();
        setLoginTimeout(1)
    }, 1)
});
var _upliFinishedCallback = function(n) {
        n.resultMessage.length != 0 && showMessage("upload", n.resultMessage);
        n.addedImage != undefined && n.addedImage.length != 0 && updateLibraryImages(n.forceReload == "1" ? !0 : !1, {
            addedImage: n.addedImage,
            addedImageName: n.addedImageName,
            nw: n.nw,
            nh: n.nh,
            nr: n.nr,
            nrx: n.nrx,
            nry: n.nry,
            active: !0,
            loadComplete: function() {
                $("#library-position-link").removeClass("disabled");
                $("#library-position-link").trigger("click")
            }
        })
    },
    scaleUIDisplay = function(n) {
        var e, r;
        n == undefined && (n = getScale());
        for (var u = undefined, i = undefined, f = undefined, i = 0; i < textGroupLines.length; i++)
            for (e = getValidTextLinesInGroup(i), u = 0; u < e.length; u++) {
                f = e[u];
                var o = $(textGroupEditors[i][getSVGTextLineContext(f).line] + " select.text-size")[0].selectize,
                    s = Number($(textGroupEditors[i][getSVGTextLineContext(f).line]).data("fsize")),
                    t = Number(o.getValue());
                s != undefined && Math.floor(s) == Number(t) ? t = s * n : t *= n;
                $(textGroupEditors[i][getSVGTextLineContext(f).line]).data("fsize", t);
                t = Math.floor(t + .01);
                o.addOption({
                    text: t + " pt",
                    value: t
                });
                o.setValue(t)
            }
        graphicGroupElements != undefined && graphicGroupElements.length > 0 && graphicGroupElements[0].length > 0 && (r = undefined, r = Number($("#image-size-width").val()) * n, $("#image-size-width").val(r.toFixed(2)), r = Number($("#image-size-height").val()) * n, $("#image-size-height").val(r.toFixed(2)), r = Number($("#image-size-percent").val()) * n, setImgPercent(r.toFixed(2)))
    },
    setupArtworkPositionOptions = function() {
        var n = getValidTextLinesInGroup(0).length;
        n == 0 ? ($("#position-controls img").addClass("disabled"), $("#position-controls a").addClass("disabled")) : ($("#position-controls img").removeClass("disabled"), $("#position-controls a").removeClass("disabled"));
        n == 1 && ($("#position-controls .align-image-center").addClass("disabled"), $("#position-controls .a-align-image-center").addClass("disabled"))
    },
    showError = function(n, t, i, r) {
        showMessage(n, _procError(t, i, r))
    },
    showMessage = function(n, t) {
        $("#msg-modal-title").html(n);
        $("#msg-modal-msg").html(t);
        $("#msg-modal").foundation("reveal", "open")
    },
    removeImage = function(n) {
        graphicGroupElements[0] != undefined && graphicGroupElements[0].length != 0 && (graphicGroupElements[0][0].remove(), graphicGroupElements[0].splice(0, 1), rsuAttr(graphicGroups[0], "rsu:width", 0), rsuAttr(graphicGroups[0], "rsu:height", 0));
        $("#selected-artwork-image").attr("src", "");
        $("#artwork--browse li").removeClass("clip-image-active");
        $("#artwork--library li").removeClass("clip-image-active");
        $("#artwork--back-link").removeClass("active");
        $("#artwork--options").addClass("active");
        $("#artwork--upload").removeClass("active");
        $("#artwork--browse").removeClass("active");
        $("#artwork--position").removeClass("active");
        $("#artwork--library").removeClass("active");
        n == !0 && (impressionChanged(), inLoad == 0 && clearScale())
    },
    setArtSizeInfo = function() {
        var t = undefined,
            i = undefined,
            f = undefined,
            e = undefined,
            o = undefined,
            r = artToPosition.clip,
            n;
        r.data("nw") != null ? (i = r.data("nw"), t = r.data("nh"), f = r.data("nr"), e = r.data("nrx"), o = r.data("nry")) : (i = r[0].naturalWidth, t = r[0].naturalHeight, f = Math.hypot(i, t), e = i * Math.SQRT2, o = t * Math.SQRT2);
        var s = 0,
            u = 360 - s,
            h = 576 - s;
        artToPosition.artType != "user" ? (n = 0, i < t ? (n = (SVG_HEIGHT - s) / t, i * n > u && (n *= u / (i * n))) : (n = (SVG_WIDTH - s) / i, t * n > u && (n *= u / (t * n))), i *= n, t *= n, f *= n, e *= n, o *= n, setImgPercent(10)) : function() {
            var r = 1,
                n = function(n, t) {
                    r > t / n && (r = t / n)
                };
            i < t ? (n(t, h), n(i, u)) : (n(i, h), n(t, u));
            setImgPercent(Math.floor(r * 1e4) / 100)
        }();
        artToPosition.nw = i;
        artToPosition.nh = t;
        artToPosition.nr = f;
        artToPosition.nrx = e;
        artToPosition.nry = o;
        updateArtImpressionSize()
    },
    _szst = {
        pd: 0,
        wd: 0,
        hd: 0,
        pk: 0,
        wk: 0,
        hk: 0
    },
    imgSizeEvent = function(n, t) {
        var i = function() {
            var n = updateArtImpressionSize(_defineProperty({}, t, 1));
            n.noChange != !0 && inLoad == 0 && clearScale();
            impressionChanged(!1, 2e3)
        };
        switch (n.type) {
            case "blur":
                _szst[t + "d"] == 1 && (_szst[t + "d"] = 0, i());
                _szst[t + "d"] = 0;
                break;
            case "input":
                _szst[t + "k"] == 0 ? i() : _szst[t + "k"] = 0;
                _szst[t + "d"] = 1;
                break;
            case "keydown":
                n.keyCode == 13 ? (_szst[t + "d"] = 0, i()) : _szst[t + "k"] = 1
        }
    },
    chkmaxhw = function(n, t) {
        return (n > 3.75 || t > 3.75) && (n > 6 || t > 6) || n > 3.75 && t > 3.75 ? !0 : !1
    },
    _imsz = {
        p: 10,
        w: .25,
        h: .25
    },
    updateArtImpressionSize = function(n, t) {
        var r = {},
            i = undefined,
            o, e, u, f;
        //n=12;
        let convertToCm = 2.54;//0.3937008;
        
        var txtN = u*convertToCm;
        var txtT = f*convertToCm;
        //console.log(n);

        //$("#flrls").show();
        //$("#flrls-htext").text(txtN.toFixed(1) + ' cm.');
        //$("#flrls-vtext").text(txtT.toFixed(1) + ' cm.');
        widthCM = txtN.toFixed(1);
        heightCM = txtT.toFixed(1);    
        return n != null && n.p == undefined && (o = artToPosition.nw / artToPosition.nh, n.w !== undefined ? (i = Number($("#image-size-width").val()), $("#image-size-width").val(i = i.toFixed(2)), i = i * 96 / artToPosition.nw, $("#image-size-height").val(Math.floor(artToPosition.nh * i / 96 * 100) / 100)) : (i = Number($("#image-size-height").val()), $("#image-size-height").val(i = i.toFixed(2)), i = i * 96 / artToPosition.nh, $("#image-size-width").val(Math.floor(artToPosition.nw * i / 96 * 100) / 100)), $("#image-size-percent").val((i * 100).toFixed(2))), e = t == !0 ? n.s != undefined ? n.s : getScale() : 1, i = Number($("#image-size-percent").val()), i *= e, setImgPercent(i = i.toFixed(2), t), r.p = i, i /= 100, r.h = artToPosition.nh * i / 96, r.w = artToPosition.nw * i / 96, u = Math.floor(r.w * 100) / 100, f = Math.floor(r.h * 100) / 100, t != !0 && (n == null || n.p == 1) && ($("#image-size-width").val(u), $("#image-size-height").val(f)), t != !0 && (r.p >= 4 && r.p <= 200 && !chkmaxhw(r.w, r.h) ? _imsz = r : ($("#image-size-height").val(Math.floor(_imsz.h * 100) / 100), $("#image-size-width").val(Math.floor(_imsz.w * 100) / 100), $("#image-size-percent").val(_imsz.p), alert("The image size you requested is either too large or too small")), 
            $("#clip-dimensions").html(u * convertToCm.toFixed(1) + ' CM. x ' + f * convertToCm.toFixed(1) + ' CM.')), r
    },
    setGraphicInfo = function() {
        var u = artToPosition.clip.attr("src"),
            n, t, i, r;


        u != undefined && (n = u.split("/"), t = undefined, artToPosition.clip.parent().data("clipfile") != null ? (t = artToPosition.clip.parent().data("clipfile"), n = artToPosition.clip.parent().parent().data("lUrl") + t) : n = artToPosition.clip.parent().parent().data("lUrl") + n[n.length - 1], _impressionBusy(), graphicGroupElements[0].length == 0 && addGraphicToGroup(0, 0, artToPosition.artType), i = artToPosition.nw, r = artToPosition.nh, rsuAttr(graphicGroupElements[0][0], {
            "rsu:src": t,
            "rsu:aspect": i / r,
            "rsu:nwidth": i,
            "rsu:nheight": r,
            "rsu:nr": artToPosition.nr,
            "rsu:nrx": artToPosition.nrx,
            "rsu:nry": artToPosition.nry
        }), updateArtImpressionSize(), graphicGroupElements[0][0].node.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), graphicGroupElements[0][0].node.setAttributeNS("http://www.w3.org/1999/xlink", "href", n), htmlGraphics[0] = new Image, htmlGraphics[0].crossOrigin = "", $(htmlGraphics[0]).bind("load error abort", function() {
            _impressionDone()
        }),console.log(htmlGraphics[0]), htmlGraphics[0].src = n, impressionChanged())
    },
    clipSelected = function(n, t) {
        var i = n.target.children.length == 0 ? n.target.parentElement : n.target;
        $(i).is("div") || $(i).is("ul") || ($(i).parent().parent().parent().find("li").removeClass("clip-image-active"), $(i).addClass("clip-image-active"), $(t).removeClass("disabled"))
    },
    selectClipartGallery = function(n, t, i) {
        var u = "clipart-category-" + n,
            r = "#" + u.replace(/\&/g, "\\&"),
            f = function() {
                lastClipDiv != undefined && $(lastClipDiv).hide();
                n != "none" ? ($(r).show(), lastClipDiv = r) : lastClipDiv = undefined
            };
        $(r).length != 0 || n == "none" ? f(n) : (_grBusy(), GetClipartFromCategory(n.replace(/_/g, " "), document.location.hostname, function(n) {
            console.log(n);
            var l = n.d.clipartPreviewImageURL,
                a = $("#none").attr("class"),
                v = $("#none ul").attr("class"),
                y = $("#none li").attr("class") === undefined ? "" : ' class="' + $("#none li").attr("class") + '"',
                p = $("#none img").attr("class") === undefined ? "" : ' class="' + $("#none img").attr("class") + '"',
                c, o, s, e, h;

            console.log('<div id="' + u + '" class="' + a + '"><\/div>');
            $("#artwork--browse .clipart-gallery").append('<div id="' + u + '" class="' + a + '"><\/div>');
            c = $(r);
            c.append('<ul class="' + v + '"><\/ul>');
            o = c.children();
            o.data("lUrl", n.d.clipartLayoutImageURL);
            o.on("click", function(n) {
                clipSelected(n, "#gallery-position-link")
            });
            for (s = 0; s < n.d.clipartNames.length; s++) e = n.d.clipartNames[s], o.append("<li" + y + ' data-clipfile="' + e.clipartFile + '"><img' + p + ' src="' + l + e.clipartFile + '" alt="' + e.clipartName + '" title="' + e.clipartName + '" data-nw="' + e.xSize + '" data-nh="' + e.ySize + '" data-nr="' + e.r + '" data-nrx="' + e.rx + '" data-nry="' + e.ry + '" /><\/li>');
            f();
            t != undefined && (h = $('#artwork--browse [data-clipfile="' + t + '"]'), h.length > 0 && ($(h[0]).addClass("clip-image-active"), $("#gallery-position-link").removeClass("disabled"), i != undefined && ($(h[0]).click(), $("#gallery-position-link").trigger("click", [i]))));
            _grDone()
        }, function(n, t, i) {
            gShowError("Error retrieving clipart thumbnails", n, t, i);
            _grDone()
        }))
    },
    tLoginTimeout, inLogin = 0,
    setLoginTimeout = function(n) {
        clearTimeout(tLoginTimeout);
        tLoginTimeout = setTimeout(function() {
            lgi == !0 && bvLoggedIn() == 0 && (loginReturn = 3, $(".startlogin").trigger("click"))
        }, n == undefined ? 1e4 : 1)
    },
    updateLibraryImages = function(n, t) {
        var i = $("#user-library ul"),
            r;
        i.children("li").length > 0 && n == !1 && t.addedImage == undefined || (n && i.empty(), r = function(n) {
            t.active == !0 && i.find("li").removeClass("clip-image-active");
            var r = i.find("li img[src$='" + t.addedImage + "']");
            r.length > 0 ? t.active == !0 && r.parent().addClass("clip-image-active") : i.append('<li class="clip-image' + (t.active == !0 ? " clip-image-active" : "") + '" data-clipfile="' + t.addedImage + '"><img src="' + n + t.addedImage + '" alt="' + t.addedImageName + '" title="' + t.addedImageName + '" data-nw="' + t.nw + '" data-nh="' + t.nh + '" data-nr="' + t.nr + '" data-nrx="' + t.nrx + '" data-nry="' + t.nry + '"/><\/li>');
            t.loadComplete != undefined && t.loadComplete()
        }, i.children("li").length == 0 || n == !0 ? (_grBusy(), GetUserLibraryImages("session", document.location.hostname, function(n) {
            var o = n.d.clipartPreviewImageURL,
                f, u, e;
            i.data("pUrl", o);
            i.data("lUrl", n.d.clipartLayoutImageURL);
            i.on("click", function(n) {
                clipSelected(n, "#library-position-link")
            });
            for (f = 0; f < n.d.clipartNames.length; f++) u = n.d.clipartNames[f], i.append('<li class="clip-image" data-clipfile="' + u.clipartFile + '"><img src="' + o + u.clipartFile + '" alt="' + u.clipartName + '" title="' + u.clipartName + '" data-nw="' + u.xSize + '" data-nh="' + u.ySize + '" data-nr="' + u.r + '" data-nrx="' + u.rx + '" data-nry="' + u.ry + '" /><\/li>');
            t.addedImage != undefined && r(o);
            t.clip != undefined && (e = $('#artwork--library [data-clipfile="' + t.clip + '"]'), e.length > 0 && ($(e[0]).addClass("clip-image-active"), $("#library-position-link").removeClass("disabled"), t.doPos != undefined && ($(e[0]).click(), $("#library-position-link").trigger("click", [t.doPos]))));
            _grDone()
        }, function(n, t, i) {
            gShowError("Error retrieving user art", n, t, i);
            _grDone()
        })) : t.addedImage != undefined && (r(i.data("pUrl")), t.loadComplete != undefined && t.loadComplete()))
    };
//# sourceMappingURL=stampdesigner.min.js.map