export default function () {
    
    const ACTIVE_CLASS = 'active';
    const PATH_TO_PHP = './send.php'
    
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popup-close');
	
    popupClose.addEventListener('click', function() {
        popup.classList.remove(ACTIVE_CLASS);
    })
    
    const form = document.getElementById('form');
    const fakeSelector = form.querySelector('.select-selected');
    const requiredNL = form.querySelectorAll('.required');
    const required = Array.prototype.slice.call(requiredNL);
    const emailInput = form.querySelector('.input--email');

// INPUT MASK
    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
        }
    };
    $(".input--tel").click(function(){
        $(this).setCursorPosition(2);
      }).mask('1-999-999-9999', { placeholder: "X", autoclear: true });
      $(".input--tel").mask('1-999-999-9999', { placeholder: "X", autoclear: true });
// INPUT MASK


    function closePopup() {
        popup.classList.remove(ACTIVE_CLASS);
    }

    function openPopup() {
        popup.classList.add(ACTIVE_CLASS);
        const timer = setTimeout(closePopup,3000);
    }

    function successSend(res) {
        fakeSelector.innerHTML = 'Select Subject';
        form.reset();
        popup.classList.add('success');
        openPopup();
        // console.log('SUCCESS',res)
    }

    function errorSend(res) {
        popup.classList.add('error');
        openPopup();
        console.log('ERROR',res)
    }

    function sendData() {
        const data = $("#form").serialize();
        // console.log(data)
        // let response = await fetch('./tg-send.php', {
		// 	method: "POST",
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: formData,
		// })
        // const result = await response.status;
        $.ajax({
            type: 'POST',
            url: PATH_TO_PHP,
            data: data,
            success: successSend,
            error: errorSend,
          });
    }

    function errorReset() {
        required.forEach(el => {
            el.classList.remove('error');
        })
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        errorReset();
        let isValid = true;
        required.forEach(el => {
            const value = el.value.trim()
            if(value === '') {
                isValid = false;
                el.classList.add('error');
            }
        })
        const isValidMail = ($('#form input.input--email').val().match(/.+?\@.+/g) || []).length === 1;
        if(!isValidMail) {
            emailInput.classList.add('error');
        }
        isValid = isValid && isValidMail;
        // console.log(isValid)
        if(isValid) {
            sendData();
        }
    })
    


}