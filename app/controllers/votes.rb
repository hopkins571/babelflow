post '/questions/:id/votes' do
  @question = Question.find_by(id: params[:id])
  if request.xhr?
    @vote = Vote.create(votable_type: "Question", votable_id: @question.id, voter_id: current_user.id, vote: params[:vote])
    @question.votes.pluck(:vote).sum.to_s
  else
    @vote = Vote.create(votable_type: "Question", votable_id: @question.id, voter_id: current_user.id, vote: params[:vote].to_i)
    redirect "/questions/#{@question.id}"
  end

end