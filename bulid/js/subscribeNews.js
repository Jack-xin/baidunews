$(function(){function e(e){return function(t,s){return t[e]-s[e]}}var t=[];$.ajax({url:"src/sever/getsubscribelist.php",type:"GET",dataTypes:"json",success:function(s){var a=s.sort(e("listindex"));$.each(a,function(e,t){var s=$('<li class="ui-state-default"></li>');s.append(function(){var e=['<a class="name"></a>','<span class="delete"></span>','<span class="handle">移动</span>','<span class="confirm-delete">删除</span>'];return $.each(e,function(e,t){})}),$("#sortable").append(s),$("#sortable li").eq(e).attr("_index",a[e].listindex),$("#sortable li a").eq(e).attr("href",a[e].listsrc),$("#sortable li a").eq(e).html(a[e].listvalue)});var n=$("#sortable li");n.each(function(e){t.push(n.eq(e).attr("_index"))}),$("#lists_num").html(function(){return $("#sortable").children().size()+1})},error:function(e,t,s){console.log(e.status),console.log(e.readyState),console.log(t)}}),$("#sortable").on("touchstart",".delete",function(){var e=$(this).parent().index();$(this).hasClass("rotate")?($(this).removeClass("rotate"),$(".confirm-delete").eq(e).hide()):($(this).addClass("rotate"),$(".confirm-delete").eq(e).show())}),$("#sortable").on("touchend",".confirm-delete",function(){var e=$(this),t=e.parent().find("a").html();$.ajax({url:"src/sever/deletesubscribe.php",type:"POST",data:{del_listvalue:t},success:function(t){e.parent().remove()},error:function(e,t,s){console.log(e.status),console.log(e.readyState),console.log(t)}})});new Sortable($("#sortable")[0],{sort:!0,animation:100,handle:".handle",ghostClass:"ghost"});$(".btn_back a").on("touchend",function(e){e.preventDefault(),window.history.back(),location.reload()}),$(".btn_close a").on("touchend",function(){var e=null,s=[],a={},n=$("#sortable li a");n.each(function(e){s.push(n.eq(e).html())}),e=t;for(var o=0;o<s.length;o++)a[s[o]]=e[o];$.ajax({url:"src/sever/sortSubscribe.php",type:"POST",dataTypes:"json",data:{newListIndex:JSON.stringify(a)},success:function(e){console.log("success")}})})});