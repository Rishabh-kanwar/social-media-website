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
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id }">
        <p>
            <big style="font-size: 35px;">
                <i
                style="color: #ffc401da; margin-right: 7px;" class="far fa-clone"></i>${post.content}
        </big>
            <br>
            <small style="color: gray;">
                <i class="far fa-id-badge"></i>
                ${post.user.name}
            </small>

                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post.id}"> <i style="margin-left: 100px;" class="fas fa-trash-alt"></i></a>
                </small>

        </p>
    </li>
    
    <form action="/comments/create" method="POST">
    <input type="text" name="content" placeholder="Type Here to add comment..." required>
    <input type="hidden" name="post" value="<%= post._id %>" >
    <button type="submit"> <i class="far fa-plus-square"> </i></button>
</form>

    `)
    }
    

    createPost();
}