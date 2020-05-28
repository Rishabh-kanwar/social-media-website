{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

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
        return $(`<li id="post-${post._id} style="margin-top: 100px;">
             <img class="post-image" src="${post.pic}" alt="" height="400" width="400">
         <p>
             <big style="font-size: 35px;">
                 <%= post.content %>
         </big>
             <br>
             <small style="color: gray;">
                 <i class="far fa-id-badge"></i>
                 ${post.user.name}
             </small>

                 <small>
                     <a class="delete-post-button" href="/posts/destroy/${post._id}"> <i style="margin-left: 100px;" class="fas fa-trash-alt"></i></a>
                 </small>
                  
         </p>
            
     
             </div>  
            
                 <form action="/comments/create" method="POST">
                     <input type="text" name="content" placeholder="Type Here to add comment..." required>
                     <input type="hidden" name="post" value="${post._id}" >
                     <button type="submit"> <i class="far fa-plus-square"> </i></button>
                 </form>
                
     </li>`)
                }
                         else{

                            return $(`<li id="post-${post._id}" >

                                 <p style="margin-top: 100px;">
                                     <big style="font-size: 35px;">
                                         <i
                                         style="color: #ffc401da; margin-right: 7px;" class="far fa-clone"></i>${post.content}
                                         <span style="font-size: 30px;"><a href=""><i style="color: grey;" class="far fa-thumbs-up"></i></a></span>
                                 </big>
                                     <br>
                                     <small style="color: gray;">
                                         <i class="far fa-id-badge"></i>
                                         ${post.user.name}
                                     </small>
                                    
                                         <small>
                                             <a class="delete-post-button" href="/posts/destroy/${post._id}"> <i style="margin-left: 100px;" class="fas fa-trash-alt"></i></a>
                                         </small>
                                          
                                 </p>
                               
                                 
                                
                                     <form action="/comments/create" method="POST" id="post-${post._id}-comments-form">
                                         <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                         <input type="hidden" name="post" value="${post._id}" >
                                         <button type="submit"> <i class="far fa-plus-square"> </i></button>
                                     </form>

                                     <div class="post-comments-list">
                                        <ul id="post-comments-${post._id}">
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

                    console.log(data);

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





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}
//thori der k liye tum kuch bhi change mt kro
//ho gya na??
//lag to raha haa let me check
//ho gya??
//thanks yaar
//but comments me bhi problem aa rahi thi aese he
//yahi choti choti galtiyan kr rakhi hongi..dekhlo
//okay thanks btw
//rate kr dena pls
//sure