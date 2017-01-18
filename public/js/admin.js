console.log('admin.js loaded')
$(document).ready(function() {
  console.log('jq loaded')
  $('.del').on('click', function(event) {
    var target = $(event.target)
    var id = target.data('id')
    var tr = $('.recipe-id-' + id)
    $.ajax({
      type: 'DELETE',
      url: '/admin/recipes?id=' + id
    })
    .done(function(results) {
      if (results.success === 1 && tr.length > 0) {
        tr.remove()
      }
    })
  })
})
