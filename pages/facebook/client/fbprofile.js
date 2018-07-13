Template.fbprofile.helpers({
  user(){
    var theProfile = Profiles.findOne({owner:Meteor.userId()});
    if (!theProfile){
      var k = Profiles.find().count();
      Profiles.insert({name:"anonymous"+k,owner:Meteor.userId()});
    } else {
    return theProfile
    }
   },


})

Template.fbinfo.events({
  "click #js-submit"(event,instance){
    name = instance.$('#js-name').val();
    console.log('just read '+name);
    age = instance.$('#js-age').val();
    console.log('just read '+age);
    pic = instance.$('#js-pic').val();
    console.log('just read '+pic);

    if (pic == ""){
      pic = "https://lh3.googleusercontent.com/wgzB4WeTo6I_gk2SNEOcLGWmPMdHCiribDjYnaFOSyiP_a4UtOXf-EAHnz9yaFflq05cthdaEAG2prU2kwyv2XB5rl8qqcIZeJbIuFQ9dsoEnwksdplde87YtXmUZ98i8PWmnn2pFnsJm5ZThPxiTnO53HRa_LMsSTvup_j9mweutjrVlVo8uedlarjY2R2q5liTiAa589if0nNJmV8DcvbCzub3WB1xQiKRGSJLTsdS8cr5iz-kOXL_d8PqhDNEYzTsvNANCf0pkEJuD-lPJ7pdmLgmJyuOTnbuje3g-EWpEFhxZQFQbiiTVbx6cAIPcVxyqcxZ5GR0pQiWqp7QkkrwazBIZuR7GHya69zW9zCQizPEVGW7cltPlRoXqBU4paAtHF4te6pAjXO9wJCsgLL31FUhRDloy3TKA2omBlCQXp8sjc3RrUMFzqIvfDSs6LToN46Qfifuy8-fzCp1E-_tcjo5TaFeBfkC0yC5Bfpvveckot7jYorZH9uX7AKcrcyql6ochG8oPbO-1Iwhoe7WcMA3eSbcYsTi8d1dZ8Lh8HVrVQBZriAyoGrbqH6qRwQMfgd3NNA=w1920-h855"
    }
    else if(pic == "https://vignette.wikia.nocookie.net/trollpasta/images/a/a4/Cursed_spiderman.jpg/revision/latest?cb=20180526232940"){
      pic = "https://media0.giphy.com/media/A4R8sdUG7G9TG/giphy.gif"
    }
    else{
      console.log('pic is good!')
    }
    console.log('just read '+pic);
    this.user.name = name;
    this.user.age = age;
    this.user.pic = pic;
    this.user.playing = true;
    Profiles.update(this.user._id,this.user);
  }
})
