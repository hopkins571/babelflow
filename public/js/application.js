$(document).ready(function() {
  addQuestionHandler();
  handleQuestionVote();
  handleAnswerVote();
  handleCommentVote();
  // handleLoggingOut();
  addCommentToQuestions();
  addCommentToAnswers();
});


var addQuestionHandler = function() {
  $("#question-post-form").on("submit", function(event) {
    event.preventDefault();
    var form = $("#question-post-form");
    var listToAppend = $("#question-list");
    var data = form.serializeArray();
    $.ajax({
      url: '/questions',
      type: 'POST',
      data: data
    })
    .done(function(response) {
      listToAppend.append(response);
    })
    .fail(function() {
      alert("Post failed. Did you supply a title and body?");
    });
  });
};

function handleQuestionVote(){
  $(".question-votes").on("submit", "form.vote", function(event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var vote_value = $(this).children('button').attr('value');
    var $form = $(this)
    $.ajax({
      url: url,
      type: "POST",
      data: {vote: vote_value}
    })
    .done(function(response) {
      var new_value = "<i>Vote score: " + response + "</i>";
      $form.siblings('.votecount').html(new_value);
    });
  });
};

function handleAnswerVote(){
  $(".answer-votes").on("submit", "form.vote", function(event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var vote_value = $(this).children('button').attr('value');
    var $form = $(this)
    $.ajax({
      url: url,
      type: "POST",
      data: {vote: vote_value}
    })
    .done(function(response) {
      var new_value = "<i>Vote score: </i>" + response;
      $form.siblings('.votecount').html(new_value);
    });
  });
};

function handleCommentVote(){
  $("div.show-answer").on("submit", "form.comment-vote", function(event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var vote_value = $(this).children('button').attr('value');
    var $form = $(this)
    $.ajax({
      url: url,
      type: "POST",
      data: {vote: vote_value}
    })
    .done(function(response) {
      var new_value = response;
      $form.siblings(".commentcount").text(new_value);
    });
  });
};

  // handleLoggingOut();


// function handleLoggingOut() {
//   $('.logout').on('click', function(event) {
//   event.preventDefault();
//  var logoutUrl = $(this).attr('action');
//   var request = $.ajax({
//     method: "DELETE",
//     url: logoutUrl
//   })
//   request.done(function() {
//     $(".logged_in_nav").remove();
//     $(".not_logged_in_nav").add();
    //also tried show/hide. same results.
    //also need to account for what to do about logging out on a page other than the main page...like, hiding the comment/answer buttons etc
//   })
//  });
// };

var addCommentToQuestions = function() {
  $("form#Question.new-comment-form").on("submit", function(event) {
    event.preventDefault();
    var form = $("form#Question.new-comment-form");
    var listToAppend = $("#question-comment-list");
    var data = form.serializeArray();
    $.ajax({
      url: '/comments',
      type: 'POST',
      data: data
    })
    .done(function(response) {
      listToAppend.append(response);
    })
    .fail(function() {
      alert("Comment failed. Did you enter a blank value?");
    });
    form.trigger('reset');
  });
};

var addCommentToAnswers = function() {
  $("form#Answer.new-comment-form").on("submit", function(event) {
    event.preventDefault();
    var form = $(this);
    var listToAppend = form.closest(".answer-votes").find(".answer-comment-list");
    console.log(listToAppend);
    var data = form.serializeArray();
    $.ajax({
      url: '/comments',
      type: 'POST',
      data: data
    })
    .done(function(response) {
      listToAppend.append(response);
    })
    .fail(function() {
      alert("Comment failed. Did you enter a blank value?");
    });
    form.trigger('reset');
  });
};
