$('#displayRecipe').hide()
$('#getRecipe').on('click', function(event) {
  $.get('/randomRecipe', function(data, textStatus) {
    if (textStatus === 'success') {
      $('#name').text(data.name)
      $('#content').html(data.content)
      $('#displayer').show()
      $('#getRecipe').text("换一个")
    }
  })
})
