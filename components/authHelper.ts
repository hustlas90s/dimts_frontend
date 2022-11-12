const isEmailUnique = (email: string) => email !== "qwe@gmail.com"

export const fieldRules = {
    requiredRule : {
        required : "This field is required"
    },
    requiredStringRule : {
        required : "This field is required",
        pattern : {
            value : /^[a-zA-Z\s]*$/,
            message : "Alphabet characters only"
        }
    },
    requiredMobileNumberRule : {
        required : "This field is required",
        pattern : {
            value : /^\d+$/,
            message : "Numeric characters only"
        },
        minLength : {
            value : 11,
            message : "Input takes 11 numeric characters"
        },
        maxLength : {
            value : 11,
            message : "Input takes 11 numeric characters"
        } 
    },
    requiredUniqueEmailRule : {
        required : "This field is required",
        pattern : {
            value : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message : "Please enter a valid email"
        },
        validate : isEmailUnique
    },
    requiredPasswordRule : {
        required : "This field is required",
        minLength : {
            value : 8,
            message : "Input takes at least 8 characters"
        }
    }
}