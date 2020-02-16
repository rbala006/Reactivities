using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T,string> Password<T>(this IRuleBuilder<T,string> ruleBuilder)
        {
            var options=ruleBuilder
            .NotEmpty()
            .MinimumLength(6).WithMessage("Password must be at least 6 character")
            .Matches("[A-Z]").WithMessage("Pwd must contann 1 UC")
            .Matches("[a-z]").WithMessage("Pwd must contann 1 LC")
            .Matches("[0-9]").WithMessage("Pwd must contann 1 number")
            .Matches("[^a-zA-Z0-9]").WithMessage("Pwd must contann non alphanumeric");

            return options;
        }
    }
}