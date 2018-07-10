const ourSponsors = [
 {name:"Google",amt:"$50 million",date:"7/24/2018"},
 {name:"Apple",amt:"$20 million",date:"7/24/2018"},
 {name:"Facebook",amt:"$40 million",date:"7/24/2018"}
]



const moreJSON =
[
2018,
2.1415926,
"hello world",
true,
false,
null,
undefined,
['uno', 'dos', 'tres']
]

Template.sponsors.helpers({
	sponsorData: ourSponsors,
  randomstuff: moreJSON
})
