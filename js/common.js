var root_path="http://115.29.160.68/"


var req={
  onSuccess:function(){},
  onError:function(){},
  sendRequest:function(data_url,data_string,data_method){
    var current_this=this;
    $.ajax({
      type: data_method,
      url:  root_path+data_url,
      data:data_string,
      dataType: 'json',
      timeout: 10000,
      context: $('body'),
       cache:false,
      success: function(data){
        console.log(data)
        current_this.onSuccess(data);
      },
      error: function(xhr, type){
        console.log("error")      
      }
    })
  }

}
function getNewsList(pg){
  req.sendRequest('Mobile2/News/getNewsList',{page:pg,pagesize:10},'post');
  req.onSuccess=return_getNewsList.bind(this);
}

function return_getNewsList(ret){
  var data=ret.data.data;
  var page=ret.data.page;
  var total_page=page.total_page;
  var current_page=page.current_page;
  if(ret.boolen=="0"){

  }else if(ret.boolen=="1"){
    $("#newsL").html("");
    var newsList=$("<ul></ul>");
    $("#newsL").append(newsList);
    for(var i=0;i<data.length;i++){
      var item=$("<li></li>")
      var content="<a href='detail.html?id="+data[i].id+"'>"+data[i].title+"</a><span>"+data[i].show_time+"</span>";
      item.html(content);
      newsList.append(item);
    }
    
  }
  $(".tcdPageCode").createPage({
          pageCount:total_page,
          current:current_page,
          backFn:function(p){
              $(".tcdPageCode").unbind('click');
              getNewsList(p);
          }
      })


}









