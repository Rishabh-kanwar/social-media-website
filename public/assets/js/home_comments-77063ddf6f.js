class PostComments{constructor(e){this.postId=e,this.postContainer=$("#post-"+e),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(".delete-comment-button",this.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.newCommentForm.submit((function(n){n.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(n){let o=t.newCommentDom(n.data.comment);console.log(o[0]),$("#post-comments-"+e).prepend(o),t.deleteComment($(".delete-comment-button",o)),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e)}})}))}newCommentDom(e){return $(`<li id="comment-${e._id}">\n        <p>\n            ${e.content}\n            <span style="font-size: 18px;">\n                \n                    <a style="color: rgb(92, 92, 255); position: relative; left: -30px;" href="/likes/toggle/?id=${e._id}&type=Comment"\n                        class="toggle-like-button" data-likes="${e.likes.length}">\n                        <i style=" color: rgb(92, 92, 255);" class="far fa-thumbs-up"></i>\n                            ${e.likes.length}\n                    </a>\n            <br>\n            <small>\n                <i style="color: gray;" class="far fa-id-badge"></i>\n                ${e.user.name}\n            </small>\n          \n                <small>\n                    <a  class="delete-comment-button" href="/comments/destroy/${e._id}">\n                   <i style=" color: red" class="fas fa-trash-alt"></i>\n                   </a>\n                </small>\n                \n        </p>    \n    </li>\n      `)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$("#comment-"+e.data.comment_id).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}