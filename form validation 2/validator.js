function Validator(formSelector, options = {}) {
    var getParent = function(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    };

    var formRules = {};

    // Quy ước tạo rules
    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function(value) {
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email hợp lệ';
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
            };
        }
    };

    // Lấy ra form element trong DOM theo 'formSelector'
    var formElement = document.querySelector(formSelector);

    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');

        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');

            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Lắng nghe sự kiện blur và input để validate
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // Hàm thực hiện validate
        function handleValidate(e) {
            var rules = formRules[e.target.name];
            var errorMessage;

            rules.some(function(rule) {
                errorMessage = rule(e.target.value);
                return errorMessage;
            });

            // Nếu có lỗi, hiển thị lỗi ra UI
            var formGroup = getParent(e.target, '.form-group');
            if (formGroup) {
                var formMessage = formGroup.querySelector('.form-message');
                if (formMessage) {
                    if (errorMessage) {
                        formGroup.classList.add('invalid');
                        formMessage.innerText = errorMessage;
                    } else {
                        formGroup.classList.remove('invalid');
                        formMessage.innerText = '';
                    }
                }
            }
            return !errorMessage;
        }

        // Hàm xử lý xóa thông báo lỗi khi người dùng nhập lại
        function handleClearError(e) {
            var formGroup = getParent(e.target, '.form-group');
            if (formGroup) {
                formGroup.classList.remove('invalid');
                var formMessage = formGroup.querySelector('.form-message');
                if (formMessage) {
                    formMessage.innerText = ''; // Xóa thông báo lỗi khi người dùng nhập
                }
            }
        }

        // Hàm validate toàn bộ form khi submit
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var inputs = formElement.querySelectorAll('[name][rules]');
            var isValid = true;

            for (var input of inputs) {
                if (!handleValidate({target: input})) {
                    isValid = false;
                }
            }

            // Khi không có lỗi, submit form
            if (isValid) {
                if (options.onSubmit) {
                    if (typeof options.onSubmit === 'function') {

                        var enableInputs = formElement.querySelectorAll('[name]');
                        var formValues = Array.from(enableInputs).reduce(function(values, input) {
                            switch (input.type) {
                                case 'radio':
                                    if (input.checked) {
                                        values[input.name] = input.value;
                                    }
                                    break;
                                case 'checkbox':
                                    if (input.checked) {
                                        if (!Array.isArray(values[input.name])) {
                                            values[input.name] = [];
                                        }
                                        values[input.name].push(input.value);
                                    }
                                    break;
                                case 'file':
                                    values[input.name] = input.files;
                                    break;
                                default:
                                    values[input.name] = input.value;
                            }
                            return values;
                        }, {});

                        options.onSubmit(formValues);
                    }
                } else {
                    formElement.submit();  // Submit form nếu không có `onSubmit`
                }
            }
        };
    }
}
