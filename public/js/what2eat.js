$('#getRecipe').on('click', function(event) {
  $.get('/randomRecipe', function(data, textStatus) {
    console.log(data)
    console.log(textStatus)
  })
})
