var $items = $('#firstName, #lastName,#phoneNumber,#address ')
var obj = {}
$items.each(function() {
    obj[this.id] = $(this).val()
})
 
$('body').append('<br><pre>'+JSON.stringify(obj, null, ' '))