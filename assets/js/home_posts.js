{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        let plain_form =document.querySelector('#new-post-form')

        newPostForm.submit(function(e){
            e.preventDefault();

           formData=new FormData(plain_form);

            $.ajax({
                type: 'post',
                url: '/posts/create',
                
                dataType: 'json',
                contentType: false,
                processData: false,
                data: formData,
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    $('#post-data').val("");
                    $('#post-pic-choose').val("");
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));
                      
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        console.log(post);
        if(post.pic)
        {
        return $(`<li id="post-${post._id}" style="margin-top: 100px;">
                <img class="post-image" src="${post.pic}" style=" box-shadow: 4px 4px 7px 7px gray; alt="" height="350" width="350">
                <p>
                <!-- <i style="color: #ffc401da; margin-right: 7px;" class="far fa-clone"><span style="width: 50%; height: auto;"></i> -->
                <big style="font-size: 30px;">
                    ${post.content}</span>
                </big> 
                <br>
                <small style="color: gray;">
                    <i class="far fa-id-badge"></i>
                    ${post.user.name}
                </small>
                
                    
                    
            </p>
            
        
                <form action="/comments/create" method="POST" id="post-${post._id}-comments-form" >
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}" >
                    <button type="submit"> <i class="far fa-comment"></i></button>
                </form>
        
                <span style="position: relative; bottom: 20px;">
                
                <a class="delete-post-button" href="/posts/destroy/${post._id}"> <i class="fas fa-trash-alt"></i></a>

                    <a style="margin-left: 10px;"  href="/likes/toggle/?id=${post._id}&type=Post"
                        class="toggle-like-button" data-likes="${post.likes.length}">
                        
                        <i style=" color: rgb(92, 92, 255);" class="far fa-thumbs-up"></i> ${post.likes.length}
                    </a>
            
                
                    
            
            
    
                <div class="post-comments-list">
                    <ul  id="post-comments-${post._id}" >
                        
                    </ul>
    
                </div>
            
            
                    </li>`)
                }
                         else
                         {

                            return $(`<li id="post-${post._id}" style="margin-top: 80px;">
      
                            <p>
                                <!-- <i style="color: #ffc401da; margin-right: 7px;" class="far fa-clone"><span style="width: 50%; height: auto;"></i> -->
                                <big style="font-size: 30px;">
                                   ${post.content}</span>
                                </big> 
                                <br>
                                <small style="color: gray;">
                                    <i class="far fa-id-badge"></i>
                                    ${post.user.name}
                                </small>
                               
                                   
                                     
                            </p>
                           
                          
                                <form action="/comments/create" method="POST" id="post-${post._id}-comments-form" >
                                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                    <input type="hidden" name="post" value="${post._id}" >
                                    <button type="submit"> <i class="far fa-comment"></i></button>
                                </form>
                        
                                <span style="position: relative; bottom: 20px;">
                               
                                <a class="delete-post-button" href="/posts/destroy/${post._id}"> <i class="fas fa-trash-alt"></i></a>

                                    <a style="margin-left: 10px;"  href="/likes/toggle/?id=${post._id}&type=Post"
                                        class="toggle-like-button" data-likes="${post.likes.length}">
                                        
                                        <i style=" color: rgb(92, 92, 255);" class="far fa-thumbs-up"></i> ${post.likes.length}
                                    </a>
                              
                                
                                    
                            
                            
                    
                                <div class="post-comments-list">
                                    <ul  id="post-comments-${post._id}" >
                                       
                                    </ul>
                    
                                </div>
                            
                            
                    </li>`)


                         

    }


}


  
    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        
        $(deleteLink).click(function(e){
            e.preventDefault();
                console.log(deleteLink);
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),

                success: function(data){


                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }


//   loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
      let convertPostsToAjax = function(){
          
        $('#posts-list-container>ul>li').each(function(){ 
            let self = $(this);
            let deleteButton = $('.delete-post-button', self);
            deletePost($('.delete-post-button', self));

            // get the post's id by splitting the id attribute
            let postId =self.prop('id').split("-")[1];
            console.log(postId,'hello');
            new PostComments(postId);
        });
    }
    createPost();
    convertPostsToAjax();


    
}