
(function () {
	var util = {
		validMail: function(email){
			return (email.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)) ? true : false;
		},
		ajax: function (method, action, data, callback) {
			util.httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

			util.httpRequest.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					if (typeof callback === 'function') {
						return callback(this);
					}
				}
			};

			util.httpRequest.open(method, action);
			util.httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    		util.httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			util.httpRequest.send(data);
		},
		getFormData: function (formInputs, callback) {
			var formData = new FormData(),
				inputCount = formInputs.length;

			while (inputCount--){
				formData.append(formInputs[inputCount].name, formInputs[inputCount].value);
			}

			return typeof callback === 'function' ? callback(formData) : formData;
		}
	};

	var form = document.getElementById('signup__form'),
		formSubmit = document.getElementById('form-submit'),
		emailField = document.querySelector('.signup__input--email'),
		formFields = [].slice.call(form.querySelectorAll('input'));

	formSubmit.addEventListener('click', function (e) {
		e.preventDefault();

		var email = emailField.value;

		if (util.validMail(email)) {
			util.getFormData(formFields, function (data) {
				util.ajax(form.method, form.action, data, function (res) {
					console.log('res', res);
				});
			});
		} else {
			alert('Please enter a valid email address');
		}
	});
})();











