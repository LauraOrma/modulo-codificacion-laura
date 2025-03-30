const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/
const regexPhone = /(\+34|0034|34)?[ -]*([67])[ -]*([0-9][ -]*){8}/

const validarCampos = (target) => {
  let error = false;
  const errorSpan = $(target).siblings('.contact__errorMsg');

  switch (target.id) {
    case 'name':
      if (target.value === '') {
        error = true;
        $(target).css('border-color', 'red');
        $(target).css('box-shadow', '2px 2px 5px red');
        errorSpan.text('Debes introducri tu nombre y apellidos de forma obligatoria');
      } else {
        $(target).css('border-color', '#202d24');
        errorSpan.text('');
      }
      break;

    case 'email':
      if (regexEmail.test(target.value)) {
        error = false;
        $(target).css('border-color', '#202d24');
        errorSpan.text('');
      } else {
        error = true;
        $(target).css('border-color', 'red');
        $(target).css('box-shadow', '2px 2px 5px red');
        errorSpan.text('El correo elecrónico que has introducido no es válido');
      }
      break;

    case 'phone':
      if (regexPhone.test(target.value)) {
        error = false;
        $(target).css('border-color', '#202d24');
        errorSpan.text('');
      } else {
        error = true;
        $(target).css('border-color', 'red');
        $(target).css('box-shadow', '2px 2px 5px red');
        errorSpan.text('El teléfono que has introducido no es válido');
      }
      break;
  }

  return error;
};

const validarFormulario = () => {
  let error = false
  $('.form-control').map(elemento => {
    if (!error) {
      error = validarCampos(elemento)
    }
  })
  return error
}

jQuery(function () {
  'use strict'
  // FOCUS
  $('.form-control').on('focus', function () {
    $(this).prev('label').addClass('is-focused')
    $(this).css('border-color', '#202d24')
  })

  // BLUR
  $('.form-control').on('blur', (e) => validarCampos(e.target))
  $('#formulario').on('submit', (e) => {
    e.preventDefault()
    let errorValidacion = validarFormulario()
    //todo: Mostrar mensaje cuando no hay ningun check seleccionado al enviar el formulario
    if (!errorValidacion && $('#legal')[0].checked) {
      console.log('Enviando...')
      alert('Enviado sin recargar')
      // document.getElementById('form').submit()
    } else {
      document.getElementById('errorMessageCheck').textContent = 'Debes aceptar los términos legales para enviar el formulario'
    }
  })

})
