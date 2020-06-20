// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $('.delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf =this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self =this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    console.log(newComment[0]);

                    
                    $(`#post-comments-${postId}`).prepend(newComment);

                    pSelf.deleteComment($('.delete-comment-button',newComment));
                   // enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error);
                }
            });


        });
    }


    newCommentDom(comment){

        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${comment._id}">
        <p>
            ${comment.content}
            <span style="font-size: 18px;">
                
                    <a style="color: rgb(92, 92, 255); position: relative; left: -30px;" href="/likes/toggle/?id=${comment._id}&type=Comment"
                        class="toggle-like-button" data-likes="${comment.likes.length}">
                        <i style=" color: rgb(92, 92, 255);" class="far fa-thumbs-up"></i>
                            ${comment.likes.length}
                    </a>
            <br>
            <small>
                <i style="color: gray;" class="far fa-id-badge"></i>
                ${comment.user.name}
            </small>
          
                <small>
                    <a  class="delete-comment-button" href="/comments/destroy/${comment._id}">
                   <i style=" color: red" class="fas fa-trash-alt"></i>
                   </a>
                </small>
                
        </p>    
    </li>
      `);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
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
}
