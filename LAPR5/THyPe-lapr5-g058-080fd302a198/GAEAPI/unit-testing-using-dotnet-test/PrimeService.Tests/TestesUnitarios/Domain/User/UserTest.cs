using DDDSample1.Domain.Users;
using DDDSample1.Domain.Shared;

namespace PrimeService.Tests.TestesUnitarios.Domain.Users
{
    public class UserTest
    {

        private string _nome = "Miguel Chen";
        private string _role = "Administrador";
        private int _telefone = 969222333;
        private string _email = "miguelito12@gmail.com";
        private string _password = "souBunito123"; 
        
        [Fact]
        public void SuccessfullyCreateUser()
        {
            User user = new User(_nome, _role, _telefone, _email, _password);
            Assert.True(user != null);
        }
      
        [Fact]
        public void FailToCreateUserWithoutRole()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new User(_nome, null, _telefone, _email, _password));
        }

        [Fact]
        public void FailToCreateUserWithInvalidTelefone()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new User(_nome, _role, 944, _email, _password));
        }

        [Fact]
        public void FailToCreateUserWithoutEmail()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new User(_nome, _role, _telefone, null, _password));
        }

        [Fact]
        public void FailToCreateUserWithoutPassword()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new User(_nome, _role, _telefone, _email, null));
        }

        [Fact]
        public void FailToCreateUserWithInvalidNome()
        {
            Assert.Throws<BusinessRuleValidationException>(() => new User("", _role, _telefone, _email, _password));
        }

    }
}