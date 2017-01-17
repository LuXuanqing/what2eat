$(() => {
  $('.del').on('click', (event) => {
    const target = $(event.target)
    const id = target.data('id')
    console.log(id)
    var tr = $('.recipe-id-' + id)
    console.log(tr)
    $.ajax({
      type: 'DELETE',
      url: '/admin/recipes?id=' + id
    })
    .done((results) => {
      if (results.success === 1 && tr.length > 0) {
        tr.remove()
      }
    })
  })
})
