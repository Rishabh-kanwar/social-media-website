{
    let createsearch = function(){
        let newsearchForm = $('#new-search-form');

        newsearchForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/search',
                data: newsearchForm.serialize(),
               
                success: function(data){
                    $('#search-container>ul').empty();
                    for(u of data.data.result)
                    {
                    console.log('hello',u);
                    let newitem = newsearchDom(u);
                    $('#search-container>ul').prepend(newitem);
                    }
                  
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    let newsearchDom = function(u){
        if(u.avatar){
        return $(`<p>
        <li id="search-list">
                    <img src="${u.avatar}" alt="" width="25" height="25"> 
                    <span><a href="/users/profile/${u._id}"> ${u.name} </a>  </span>
                    </li>
                    </p>`)
        }
        else{
            return $(`
            </p>
            <li id="search-list">
            <a href="/users/profile/${u._id}"> <i style="margin-right: 3px; font-size:20px" class="fas fa-user-friends"></i>${u.name}</a>
                    </li>
                    </p>          
                    
        `)
        }
        
    
    }
    createsearch();
}