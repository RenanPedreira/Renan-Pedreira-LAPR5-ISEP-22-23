using DDDSample1.Domain.Users;
using DDDSample1.Domain.Shared;

namespace PrimeService.Tests.TestesUnitarios.Domain.Users
{
    public class PasswordTest
    {
        [Fact]
        public void SuccessfullyCreatePassword()
        {
            Password result = new Password("Password1?");
            Assert.NotNull(result.password);
        }
        
        [Fact]
        public void SuccessfullyCreatePasswordWithWhiteSpaceAsSpecialCharacter()
        {
            var result = new Password("Pass word 1");
            Assert.NotNull(result.password);
        }

        [Fact]
        public void FailToCreatePasswordWithoutMinimumNumberOfChars()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Password("!2345Ss"));
        }
        
        [Fact]
        public void FailToCreateEmptyPassword()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Password(""));
        }
        
        [Fact]
        public void FailToCreateWhiteSpaceOnlyPassword()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Password("     "));
        }
        
        [Fact]
        public void FailToCreateNullPassword()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Password(null));
        }
        
        [Fact]
        public void FailToCreatePasswordWithoutAnUpperCaseLetter()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Password("password1?"));
        }
        
        [Fact]
        public void FailToCreatePasswordWithoutALowerCaseLetter()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new Password("PASSWORD1?"));
        }
        
    }
}